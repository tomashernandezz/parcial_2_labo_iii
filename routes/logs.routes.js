const express = require("express");
const router = express.Router();
const LogMiddleware = require("../middlewares/CrearLog");
const Logs = require("../entity/Log.entity")

router.get("/", async (req,res) => {
    try
    {
        const resultado = await Logs.findAll();
        
        res.render("logs", {logs : resultado})
    }
    catch(e)
    {
        res.status(500).send("Error al conseguir los Logs")
    }

})

module.exports = router;