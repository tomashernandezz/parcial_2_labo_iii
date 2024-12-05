const express = require("express");
const app = express();
require('dotenv').config();
const bodyParser = require("body-parser");
const ejs = require('ejs')
const path = require('path')
const PORT = process.env.PORT || 3000;
const LogMiddleware = require("./middlewares/CrearLog")

//Config EJS

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

const sequelize = require("./db/sequelize");

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(LogMiddleware)

//Rutas

const rutaObras = require('./routes/obras.routes')
app.use("/obras", rutaObras)

const rutaLogs = require('./routes/logs.routes');
app.use("/logs", rutaLogs);












//Fin de rutas

/*app.get('/', (req,res) => {
    res.send("Servidor levantado correctamente")
})*/

app.get('/' , (req,res) => {
    res.render("index")
})


app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})