const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');

const ObraDeArte = sequelize.define('ObraDeArte', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  anioDeCreacion: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.ENUM('pintura', 'escultura'),
    allowNull: false,
  },
  imagen: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
}, {
  tableName: 'obras_de_arte',
  timestamps: true,
  createdAt: 'creadoEn',
  updatedAt: 'modificadoEn',
});

module.exports = ObraDeArte;
