const express = require("express");
const cors = require("cors");
const http = require("http"); // Módulo HTTP nativo de Node.js
const {Server} = require("socket.io"); // esto es para websockets
require("dotenv").config();

const apiRutas = require("./rutas/apiRutas");

const app = express();
const PUERTO = process.env.PORT || 4000;

// Configurar orígenes permitidos para CORS
const allowedOrigins = [
    "http://localhost:3000", 
    "http://localhost:5173",
    "http://72.60.151.201",
    "http://72.60.151.201:5173",
    "http://72.60.151.201:4000",
    "http://72.60.151.201:8000"
];

if (process.env.FRONTEND_URL) {
    allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api", apiRutas);


const server = http.createServer(app);

//************* Configuracion de websockets ********************* */

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

//************ Enventos que escucha el servidor de websockets **************/

// Almacenar salas activas y participantes
const salasActivas = new Map(); // { tareaId: { maestro: socketId, estudiantes: [{socketId, nombre}] } }
const maestrosConectados = new Map(); // { maestroId: socketId }
const estudiantesPorSala = new Map(); // { salaId: [{socketId, nombre}] }

io.on("connection", (socket) => {

  // ==================== MAESTRO ====================
  
  // Maestro se conecta al sistema
  socket.on("maestro:conectar", (data) => {
    const { maestroId } = data;
    maestrosConectados.set(maestroId, socket.id);
  });

  // Maestro crea una nueva sala
  socket.on("maestro:salaCreada", (data) => {
    const { maestroId, salaId } = data;
    const socketId = maestrosConectados.get(maestroId);
    if (socketId) {
      io.to(socketId).emit("sala:nueva", { salaId });
    }
  });

  // Maestro crea una nueva tarea o juego
  socket.on("maestro:tareaCreada", (data) => {
    const { salaId, tareaId, tasks } = data;
    
    // Notificar a todos los estudiantes de esa sala
    io.emit("sala:tareaAgregada", { salaId, tareaId, tasks });
  });

  // Maestro agrega alumno a lista
  socket.on("maestro:alumnoAgregado", (data) => {
    const { salaId, nombreCompleto } = data;
    
    // Notificar a estudiantes de esa sala
    io.emit("sala:estudianteAgregado", { salaId, nombreCompleto });
  });

  // Maestro se une a una sala de juego en vivo
  socket.on("maestro:unirse", (data) => {
    const { tareaId } = data;
    socket.join(`juego-${tareaId}`);
    
    if (!salasActivas.has(tareaId)) {
      salasActivas.set(tareaId, { 
        maestro: socket.id, 
        estudiantes: [],
        estado: 'esperando',
        indiceActual: -1,
        respuestas: {},
        puntajes: {}
      });
    } else {
      const sala = salasActivas.get(tareaId);
      sala.maestro = socket.id;
      // Si el maestro vuelve a unirse, resetear la sala para poder jugar de nuevo
      if (sala.estado !== 'jugando') {
        sala.estado = 'esperando';
        sala.indiceActual = -1;
        sala.respuestas = {};
        sala.puntajes = {};
      }
    }
    
  });

  // Maestro inicia el juego en vivo
  socket.on("maestro:iniciarJuego", (data) => {
    const { tareaId, indice } = data;
    
    
    // Resetear y guardar estado del juego
    if (salasActivas.has(tareaId)) {
      const sala = salasActivas.get(tareaId);
      sala.estado = 'jugando';
      sala.indiceActual = indice;
      sala.respuestas = {};
      
      // Inicializar puntajes para todos los estudiantes conectados si no existen
      if (!sala.puntajes) {
        sala.puntajes = {};
      }
      sala.estudiantes.forEach(est => {
        if (!sala.puntajes[est.nombre]) {
          sala.puntajes[est.nombre] = 0;
        }
      });
      
      // Resetear estado de estudiantes conectados
      sala.estudiantes.forEach(est => {
        est.respondio = false;
        est.correcta = undefined;
      });
      
    }
    
    io.to(`juego-${tareaId}`).emit("juego:iniciar", { tareaId, indice });
  });

  // Maestro pasa a la siguiente pregunta
  socket.on("maestro:siguientePregunta", (data) => {
    const { tareaId, indice, totalPreguntas } = data;
    const sala = salasActivas.get(tareaId);
    
    if (sala && sala.maestro === socket.id) {
      
      // Si llegamos al final, enviar resultados finales
      if (indice >= totalPreguntas) {
        
        // Crear ranking incluyendo a TODOS los estudiantes conectados
        const ranking = sala.estudiantes.map(est => ({
          nombre: est.nombre,
          puntaje: sala.puntajes?.[est.nombre] || 0
        })).sort((a, b) => b.puntaje - a.puntaje);
        
        
        // Enviar resultados a todos
        io.to(`juego-${tareaId}`).emit("juego:finalizado", { 
          ranking,
          totalPreguntas 
        });
        
        // Resetear sala para permitir reutilización
        sala.estado = 'esperando';
        sala.indiceActual = -1;
        sala.respuestas = {};
        sala.puntajes = {};
        
      } else {
        // Avanzar a siguiente pregunta
        sala.indiceActual = indice;
        io.to(`juego-${tareaId}`).emit("juego:siguientePregunta", { tareaId, indice });
      }
    }
  });

  // Maestro termina el juego
  socket.on("maestro:terminarJuego", (data) => {
    const { tareaId } = data;
    io.to(`juego-${tareaId}`).emit("juego:terminar", { tareaId });
  });

  // Maestro sale del juego
  socket.on("maestro:salir", (data) => {
    const { tareaId } = data;
    socket.leave(`juego-${tareaId}`);
  });

  // ==================== ESTUDIANTE ====================

  // Estudiante se une a una sala general
  socket.on("estudiante:unirseASala", (data) => {
    const { salaId, nombreAlumno } = data;
    socket.join(`sala-${salaId}`);
    
    if (!estudiantesPorSala.has(salaId)) {
      estudiantesPorSala.set(salaId, []);
    }
    estudiantesPorSala.get(salaId).push({ socketId: socket.id, nombre: nombreAlumno });
    
  });

  // Estudiante sale de una sala general
  socket.on("estudiante:salirDeSala", (data) => {
    const { salaId, nombreAlumno } = data;
    socket.leave(`sala-${salaId}`);
    
    const estudiantes = estudiantesPorSala.get(salaId);
    if (estudiantes) {
      const filtrados = estudiantes.filter(e => e.socketId !== socket.id);
      estudiantesPorSala.set(salaId, filtrados);
    }
    
   
  });

  // Estudiante se une a un juego en vivo
  socket.on("estudiante:unirse", (data) => {
    const { tareaId, nombreAlumno } = data;
    socket.join(`juego-${tareaId}`);
    
    if (!salasActivas.has(tareaId)) {
      salasActivas.set(tareaId, { maestro: null, estudiantes: [], estado: 'lobby', indiceActual: 0 });
    }
    
    const sala = salasActivas.get(tareaId);
    sala.estudiantes.push({ socketId: socket.id, nombre: nombreAlumno });
    
    
    
    // Si el juego ya está en curso, sincronizar al estudiante
    if (sala.estado === 'jugando') {
      socket.emit("juego:iniciar", { tareaId, indice: sala.indiceActual });
    }
    
    // Notificar al maestro sobre nuevo estudiante
    if (sala.maestro) {
      io.to(sala.maestro).emit("estudiante:conectado", { nombreAlumno, total: sala.estudiantes.length });
    }
  });

  // Estudiante envía una respuesta en juego en vivo
  socket.on("estudiante:responder", (data) => {
    const { tareaId, nombreAlumno, indice, respuesta, correcta } = data;
    
    const sala = salasActivas.get(tareaId);
    if (sala) {
      // Inicializar estructuras si no existen
      if (!sala.respuestas) sala.respuestas = {};
      if (!sala.respuestas[indice]) sala.respuestas[indice] = [];
      if (!sala.puntajes) sala.puntajes = {};
      if (!sala.puntajes[nombreAlumno]) sala.puntajes[nombreAlumno] = 0;
      
      // Guardar respuesta
      sala.respuestas[indice].push({
        nombreAlumno,
        respuesta,
        correcta,
        timestamp: Date.now()
      });
      
      // Actualizar puntaje del estudiante
      if (correcta) {
        sala.puntajes[nombreAlumno]++;
      }
      
      // Calcular estadísticas
      const totalRespuestas = sala.respuestas[indice].length;
      const correctas = sala.respuestas[indice].filter(r => r.correcta).length;
      const incorrectas = totalRespuestas - correctas;
      
      // Notificar al maestro sobre la respuesta
      if (sala.maestro) {
        io.to(sala.maestro).emit("respuesta:recibida", {
          nombreAlumno,
          correcta,
          totalRespuestas,
          correctas,
          incorrectas,
          totalEstudiantes: sala.estudiantes.length
        });
      }
    }
  });

  // Estudiante entrega una tarea para casa
  socket.on("estudiante:entregaTarea", (data) => {
    const { tareaId, nombreAlumno, puntaje } = data;
    
    // Notificar a todos los maestros conectados sobre la nueva entrega
    io.emit("tarea:nuevaEntrega", { tareaId, nombreAlumno, puntaje });
  });

  // Estudiante sale de juego en vivo
  socket.on("estudiante:salir", (data) => {
    const { tareaId, nombreAlumno } = data;
    socket.leave(`juego-${tareaId}`);
    
    const sala = salasActivas.get(tareaId);
    if (sala) {
      sala.estudiantes = sala.estudiantes.filter(e => e.socketId !== socket.id);
    }
  });

  // ==================== DESCONEXIÓN ====================

  socket.on("disconnect", () => {
    
    // Limpiar maestro
    for (const [maestroId, socketId] of maestrosConectados.entries()) {
      if (socketId === socket.id) {
        maestrosConectados.delete(maestroId);
      }
    }
    
    // Limpiar estudiante de juegos en vivo
    salasActivas.forEach((sala, tareaId) => {
      const estudianteIndex = sala.estudiantes.findIndex(e => e.socketId === socket.id);
      if (estudianteIndex !== -1) {
        const estudiante = sala.estudiantes[estudianteIndex];
        sala.estudiantes.splice(estudianteIndex, 1);
      }
    });
    
    // Limpiar estudiante de salas generales
    estudiantesPorSala.forEach((estudiantes, salaId) => {
      const filtrados = estudiantes.filter(e => e.socketId !== socket.id);
      if (filtrados.length !== estudiantes.length) {
        estudiantesPorSala.set(salaId, filtrados);
      }
    });
  });
});
//****************************************************************** */

server.listen(PUERTO, () => {
  console.log(`Servidor Backend corriendo en http://localhost:${PUERTO}`);
  console.log(`CORS habilitado para React`);
});
