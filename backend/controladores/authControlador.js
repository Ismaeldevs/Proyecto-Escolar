const db = require("../configuracion/baseDeDatos");

const registrarMaestro = async (req, res) => {


  const { nombre, email, password } = req.body;

  try {

    const [existe] = await db.query("SELECT * FROM maestros WHERE email = ?", [
      email,
    ]);

    if (existe.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: "El correo ya está registrado." });
    }


    const [result] = await db.query(
      "INSERT INTO maestros (nombre, email, password) VALUES (?, ?, ?)",
      [nombre, email, password]
    );


    const nuevoMaestro = { id: result.insertId, name: nombre, email };
    res.json({
      success: true,
      message: "Registro exitoso",
      maestro: nuevoMaestro,
    });
  } catch (error) {
   
    console.error("❌ ERROR GRAVE EN LA BASE DE DATOS:", error);
    res.status(500).json({
      success: false,
      message: "Error en el servidor: " + error.message,
    });
  }
};

const ingresarMaestro = async (req, res) => {

  const { email, password } = req.body;
  try {
    const [usuarios] = await db.query(
      "SELECT * FROM maestros WHERE email = ? AND password = ?",
      [email, password]
    );
    if (usuarios.length > 0) {
      res.json({
        success: true,
        maestro: {
          id: usuarios[0].id,
          name: usuarios[0].nombre,
          email: usuarios[0].email,
        },
      });
    } else {
      res
        .status(401)
        .json({ success: false, message: "Credenciales incorrectas" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Error en el servidor" });
  }
};

module.exports = { registrarMaestro, ingresarMaestro };
