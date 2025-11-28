const db = require("../configuracion/baseDeDatos");

const actualizarEstadoJuego = async (req, res) => {
  const { tareaId, estado, indice } = req.body;
  try {
    await db.query(
      "UPDATE tareas SET live_estado = ?, live_indice = ? WHERE id = ?",
      [estado, indice, tareaId]
    );
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
};


const obtenerEstadoJuego = async (req, res) => {
  const { tareaId } = req.params;
  try {
    const [rows] = await db.query(
      "SELECT live_estado, live_indice FROM tareas WHERE id = ?",
      [tareaId]
    );
    if (rows.length > 0) {
      res.json({
        success: true,
        estado: rows[0].live_estado,
        indice: rows[0].live_indice,
      });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

module.exports = { actualizarEstadoJuego, obtenerEstadoJuego };
