const db = require("../configuracion/baseDeDatos");


const obtenerDatosMaestro = async (req, res) => {
  const { maestroId } = req.params;
  try {
    const [salas] = await db.query("SELECT * FROM salas WHERE maestro_id = ?", [
      maestroId,
    ]);

    const salasCompletas = await Promise.all(
      salas.map(async (sala) => {
        const [tareas] = await db.query(
          "SELECT * FROM tareas WHERE sala_id = ?",
          [sala.id]
        );

        const tareasFormateadas = await Promise.all(
          tareas.map(async (tarea) => {
            const [resultados] = await db.query(
              "SELECT * FROM resultados WHERE tarea_id = ?",
              [tarea.id]
            );

            let preguntasParseadas = [];
            try {
              preguntasParseadas =
                typeof tarea.preguntas_json === "string"
                  ? JSON.parse(tarea.preguntas_json)
                  : tarea.preguntas_json;
              if (!preguntasParseadas) preguntasParseadas = [];
            } catch (e) {
              preguntasParseadas = [];
            }

            return {
              id: tarea.id,
              tipo: tarea.tipo, // <--- ¡IMPORTANTE! ENVIAMOS EL TIPO AL FRONTEND
              questions: preguntasParseadas,
              timeLimit: tarea.tiempo_limite,
              style: {
                theme: tarea.tema_estilo,
                primaryColor: tarea.color_primario,
              },
              submissionDeadline: tarea.fecha_limite,
              studentProgress: resultados.map((r) => {
                let respAlumno = [];
                try {
                  respAlumno =
                    typeof r.respuestas_json === "string"
                      ? JSON.parse(r.respuestas_json)
                      : r.respuestas_json;
                } catch (e) {
                  respAlumno = [];
                }
                return {
                  studentId: r.id,
                  studentName: r.nombre_estudiante,
                  studentAvatar: r.avatar_estudiante,
                  score: r.puntaje,
                  answers: respAlumno,
                  timeCompleted: r.fecha_entrega,
                };
              }),
            };
          })
        );

        return {
          id: sala.id,
          teacherId: sala.maestro_id,
          schoolName: sala.nombre_escuela,
          grade: sala.grado,
          roomCode: sala.codigo_sala,
          tasks: tareasFormateadas,
        };
      })
    );

    res.json(salasCompletas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al cargar datos" });
  }
};

const crearSala = async (req, res) => {
  const { maestroId, schoolName, grade, roomCode } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO salas (codigo_sala, nombre_escuela, grado, maestro_id) VALUES (?, ?, ?, ?)",
      [roomCode, schoolName, grade, maestroId]
    );
    res.json({ success: true, salaId: result.insertId });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

const crearTarea = async (req, res) => {

  const { salaId, questions, timeLimit, style, submissionDeadline, tipo } =
    req.body;
  try {
    const preguntasString = JSON.stringify(questions);
  
    const tipoFinal = tipo || "tarea";

    const [result] = await db.query(
      "INSERT INTO tareas (sala_id, preguntas_json, tiempo_limite, tema_estilo, color_primario, fecha_limite, tipo) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        salaId,
        preguntasString,
        timeLimit,
        style.theme,
        style.primaryColor,
        submissionDeadline,
        tipoFinal,
      ]
    );
    
    // Obtener todas las tareas actualizadas de la sala
    const [tareas] = await db.query(
      "SELECT * FROM tareas WHERE sala_id = ?",
      [salaId]
    );
    
    const tareasFormateadas = tareas.map(tarea => {
      let preguntasParseadas = [];
      try {
        preguntasParseadas = typeof tarea.preguntas_json === "string"
          ? JSON.parse(tarea.preguntas_json)
          : tarea.preguntas_json;
        if (!preguntasParseadas) preguntasParseadas = [];
      } catch (e) {
        preguntasParseadas = [];
      }
      
      return {
        id: tarea.id,
        tipo: tarea.tipo,
        questions: preguntasParseadas,
        timeLimit: tarea.tiempo_limite,
        style: {
          theme: tarea.tema_estilo,
          primaryColor: tarea.color_primario,
        },
        submissionDeadline: tarea.fecha_limite,
        studentProgress: []
      };
    });
    
    res.json({ success: true, tareaId: result.insertId, tasks: tareasFormateadas });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error creando actividad" });
  }
};

const actualizarTarea = async (req, res) => {
  const { tareaId, questions, timeLimit, style, submissionDeadline } = req.body;
  try {
    const preguntasString = JSON.stringify(questions);
    await db.query(
      `UPDATE tareas SET preguntas_json = ?, tiempo_limite = ?, tema_estilo = ?, color_primario = ?, fecha_limite = ? WHERE id = ?`,
      [
        preguntasString,
        timeLimit,
        style.theme,
        style.primaryColor,
        submissionDeadline,
        tareaId,
      ]
    );
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

const eliminarTarea = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM tareas WHERE id = ?", [id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

const eliminarSala = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM salas WHERE id = ?", [id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

const agregarAlumnoLista = async (req, res) => {
  const { salaId, nombreCompleto } = req.body;
  try {
    await db.query(
      "INSERT INTO lista_alumnos (sala_id, nombre_completo) VALUES (?, ?)",
      [salaId, nombreCompleto]
    );
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

const obtenerListaAsistencia = async (req, res) => {
  const { salaId } = req.params;
  try {
    const [lista] = await db.query(
      "SELECT * FROM lista_alumnos WHERE sala_id = ?",
      [salaId]
    );
    res.json(lista);
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

const eliminarAlumnoLista = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM lista_alumnos WHERE id = ?", [id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

module.exports = {
  obtenerDatosMaestro,
  crearSala,
  crearTarea,
  actualizarTarea,
  eliminarTarea,
  eliminarSala,
  agregarAlumnoLista,
  obtenerListaAsistencia,
  eliminarAlumnoLista,
};
