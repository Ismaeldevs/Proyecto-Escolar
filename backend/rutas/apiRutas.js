
const express = require("express");
const router = express.Router();

const {
  registrarMaestro,
  ingresarMaestro,
} = require("../controladores/authControlador");
const {
  obtenerDatosMaestro,
  crearSala,
  crearTarea,
  actualizarTarea,
  eliminarTarea,
  eliminarSala,
  agregarAlumnoLista,
  obtenerListaAsistencia,
  eliminarAlumnoLista,
} = require("../controladores/maestroControlador");
const {
  ingresarSala,
  enviarResultados,
} = require("../controladores/estudianteControlador");

const {
  actualizarEstadoJuego,
  obtenerEstadoJuego,
} = require("../controladores/juegoControlador");


router.post("/registro", registrarMaestro);
router.post("/login", ingresarMaestro);


router.get("/datos-maestro/:maestroId", obtenerDatosMaestro);
router.post("/crear-sala", crearSala);
router.post("/crear-tarea", crearTarea);
router.put("/actualizar-tarea", actualizarTarea);
router.delete("/eliminar-tarea/:id", eliminarTarea);
router.delete("/eliminar-sala/:id", eliminarSala);


router.post("/agregar-alumno-lista", agregarAlumnoLista);
router.get("/lista-asistencia/:salaId", obtenerListaAsistencia);
router.delete("/eliminar-alumno-lista/:id", eliminarAlumnoLista);


router.post("/estudiante/ingresar", ingresarSala);
router.post("/estudiante/enviar", enviarResultados);


router.post("/juego/actualizar", actualizarEstadoJuego);
router.get("/juego/estado/:tareaId", obtenerEstadoJuego);

module.exports = router;
