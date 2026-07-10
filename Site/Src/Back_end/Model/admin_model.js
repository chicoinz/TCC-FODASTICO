
const { DataTypes } = require('sequelize');
const sequelize = require('../Data_Base/connection');
const cripto = require('bcrypt');

const Admin = sequelize.define('admin', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
    select: false
  }

}, {
  tableName: 'admins',
  timestamps: false,
});


// exportar para uso em controllers
module.exports = Admin;


