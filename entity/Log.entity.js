const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");

const Log = sequelize.define(
    "Log",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        ruta: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        metodo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: "logs",
        timestamps: true,
        createdAt: "creadoEn", 
        updatedAt: false,
    }
  
);

module.exports = Log;
