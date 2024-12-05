const Log = require("../entity/Log.entity");

const LogMiddleware = async (req, res, next) => {
    try {
        await Log.create({
            ruta: req.path,
            metodo: req.method,
        });

        console.log(`Log creado: Ruta - ${req.path}, Método - ${req.method}`);
    } catch (error) {
        console.error("Error al crear el log:", error.message);
    }

    next();
};

module.exports = LogMiddleware;