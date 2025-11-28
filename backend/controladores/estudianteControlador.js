const db = require("../configuracion/baseDeDatos");

const ingresarSala = async (req, res) => {
  const { codigoSala } = req.body;
  try {
    // 1. Buscar la sala
    const [salas] = await db.query(
      "SELECT * FROM salas WHERE codigo_sala = ?",
      [codigoSala]
    );

    if (salas.length === 0) {
      return res.json({
        success: false,
        message: "Sala no encontrada. Revisa el código.",
      });
    }
    const sala = salas[0];

    // 2. Buscar tareas de esa sala
    const [tareas] = await db.query("SELECT * FROM tareas WHERE sala_id = ?", [
      sala.id,
    ]);

    if (tareas.length === 0) {
      return res.json({
        success: false,
        message: "Esta sala no tiene tareas activas.",
      });
    }

    // 3. Procesar tareas y enviar el TIPO
    const tareasProcesadas = tareas.map((t) => {
      let preguntas = [];
      try {
        preguntas =
          typeof t.preguntas_json === "string"
            ? JSON.parse(t.preguntas_json)
            : t.preguntas_json;
      } catch (e) {
        preguntas = [];
      }

      return {
        id: t.id,
        questions: preguntas,
        timeLimit: t.tiempo_limite,
        style: { theme: t.tema_estilo, primaryColor: t.color_primario },
        submissionDeadline: t.fecha_limite,
        // --- ESTO FALTABA ---
        tipo: t.tipo, // 'juego' o 'tarea'
      };
    });

    const datosSala = {
      id: sala.id,
      roomCode: sala.codigo_sala,
      schoolName: sala.nombre_escuela,
      grade: sala.grado,
      tasks: tareasProcesadas,
    };

    res.json({ success: true, room: datosSala });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error del servidor" });
  }
};

const esNombreParecido = (nombreInput, nombreReal) => {
  const input = nombreInput
    .toLowerCase()
    .trim()
    .split(" ")
    .filter((x) => x);
  const real = nombreReal.toLowerCase().trim().split(" ");

  if (input.length === 1) return real.some((p) => p.startsWith(input[0]));

  let coincidencias = 0;
  input.forEach((parteInput) => {
    if (real.some((palabraReal) => palabraReal.startsWith(parteInput)))
      coincidencias++;
  });

  return coincidencias >= Math.min(input.length, 2);
};

const enviarResultados = async (req, res) => {
  const { tareaId, nombre, avatar, puntaje, respuestas } = req.body;
  try {
    const respuestasString = JSON.stringify(respuestas);

    await db.query(
      "INSERT INTO resultados (tarea_id, nombre_estudiante, avatar_estudiante, puntaje, respuestas_json) VALUES (?, ?, ?, ?, ?)",
      [tareaId, nombre, avatar, puntaje, respuestasString]
    );

    const [tareaRows] = await db.query(
      "SELECT sala_id FROM tareas WHERE id = ?",
      [tareaId]
    );
    if (tareaRows.length > 0) {
      const salaId = tareaRows[0].sala_id;
      const [listaOficial] = await db.query(
        "SELECT * FROM lista_alumnos WHERE sala_id = ?",
        [salaId]
      );

      const alumnoEncontrado = listaOficial.find((alumno) =>
        esNombreParecido(nombre, alumno.nombre_completo)
      );

      if (alumnoEncontrado) {
        await db.query(
          "UPDATE lista_alumnos SET presente = TRUE WHERE id = ?",
          [alumnoEncontrado.id]
        );
        console.log(
          `✅ Asistencia marcada: ${alumnoEncontrado.nombre_completo}`
        );
      }
    }

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error guardando notas" });
  }
};

module.exports = { ingresarSala, enviarResultados };
