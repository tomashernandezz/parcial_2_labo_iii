const express = require("express");
const router = express.Router();
const ObraDeArte = require("../entity/ObraDeArte.entity");
const multer = require('multer');
const pathM = require('path');
const { error } = require("console");
const validarDatosObra = require("../middlewares/validarDatosObra")
const validarDatosPUT = require("../middlewares/validarDatosPUT")
const validarID = require("../middlewares/validarID");
const LogMiddleware = require("../middlewares/CrearLog");

router.use(LogMiddleware)


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/uploads/');
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + pathM.extname(file.originalname);
    cb(null, fileName);
  }
});
const upload = multer({ storage: storage });

router.get("/subirObra", (req,res)=> {
    res.render("subirObra")
});

router.post("/", upload.single("img"),validarDatosObra, async (req, res) => {
    const { nombre, tipo, anioDeCreacion, activo } = req.body;

    try {
        const nuevaObra = await ObraDeArte.create({
            nombre,
            tipo,
            anioDeCreacion: parseInt(anioDeCreacion, 10),
            imagen: `images/uploads/${req.file.filename}`,
            activo: activo === "true",
        });

        res.status(201).json({ message: "Obra creada exitosamente.", obra: nuevaObra });
    } catch (error) {
        console.error("Error al crear la obra:", error.message);
        res.status(500).json({ error: "Error al crear la obra." });
    }
});

router.get("/", async (req,res) => {
    try{
        const resultado = await ObraDeArte.findAll()

        const resultadoConImagen = resultado.map(obra => {
            return{
                ...obra.toJSON(),
                imagen: `http://localhost:3000/${obra.imagen}`
            }
        })
        res.render("obras", {obras: resultadoConImagen})
    }catch(e){
    }
})

router.put("/:id", validarDatosPUT, async (req, res) => {
    const { id } = req.params;
    const { nombre, tipo, anioDeCreacion, activo } = req.body;

    try {
        const obra = await ObraDeArte.findByPk(id);

        if (!obra) {
            return res.status(404).json({ error: "Obra no encontrada." });
        }

        obra.nombre = nombre;
        obra.tipo = tipo;
        obra.anioDeCreacion = parseInt(anioDeCreacion, 10);
        obra.activo = activo === "true";

        await obra.save();

        res.status(200).json({ message: "Obra actualizada exitosamente.", obra });
    } catch (error) {
        console.error("Error al actualizar la obra:", error.message);
        res.status(500).json({ error: "Error al actualizar la obra." });
    }
});

router.delete("/:id", validarID, async (req, res) => {
    const { id } = req.params;

    try {
        const obra = await ObraDeArte.findByPk(id);

        if (!obra) {
            return res.status(404).json({ error: "Obra no encontrada." });
        }

        obra.activo = false;
        await obra.save();

        res.status(200).json({ message: "Obra desactivada exitosamente." });
    } catch (error) {
        console.error("Error al desactivar la obra:", error.message);
        res.status(500).json({ error: "Error al procesar la solicitud." });
    }
});

router.patch("/:id",validarID, async (req, res) => {
    const { id } = req.params;

    try {
        const obra = await ObraDeArte.findByPk(id);

        if (!obra) {
            return res.status(404).send("Obra no encontrada.");
        }

        obra.activo = true;
        await obra.save();

        res.status(200).send({ message: "Obra reactivada exitosamente.", obra });
    } catch (error) {
        console.error("Error al reactivar la obra:", error);
        res.status(500).send("Error al procesar la solicitud.");
    }
});



module.exports = router;