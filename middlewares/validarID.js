module.exports = (req, res, next) => {
    const { id } = req.params;

    if (!Number.isInteger(Number(id)) || id <= 0) {
        return res.status(400).json({ error: "El id debe ser un número entero positivo." });
    }

    next();
};