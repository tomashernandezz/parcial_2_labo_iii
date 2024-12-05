module.exports = (req, res, next) => {
    const { id } = req.params;
    const { nombre, tipo, anioDeCreacion } = req.body;

    if (!Number.isInteger(Number(id)) || id <= 0) {
        return res.status(400).json({ error: "El id debe ser un número entero positivo." });
    }

    if (typeof nombre !== "string" || nombre.trim() === "") {
        return res.status(400).json({ error: "El nombre debe ser un string no vacío." });
    }

    if (!["pintura", "escultura"].includes(tipo)) {
        return res.status(400).json({ error: "El tipo debe ser 'pintura' o 'escultura'." });
    }

    if (!Number.isInteger(Number(anioDeCreacion)) || anioDeCreacion < 0) {
        return res.status(400).json({ error: "El año de creación debe ser un número entero positivo." });
    }

    next();
};
