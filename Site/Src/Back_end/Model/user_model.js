const { DataTypes } = require('sequelize');
const sequelize = require('../Data_Base/connection');
const cripto = require('bcrypt');

const Usuario = sequelize.define('usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false

  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
    select: false
  }
}, {
  tableName: 'usuarios',
  timestamps: false
});

const getTodosusuarios = () => Usuario.findAll({ raw: true });

const criarusuario =  async (params) => {
  const senha_cripto = await cripto.hash(params.senha, 8);
  params.senha = senha_cripto;
  return Usuario.create(params);
};

const getusuariosId = (id) => Usuario.findOne({ where: { id: id }, raw: true });



const editarUsuario = async (id, params) => {
  const senha_cripto = await cripto.hash(params.senha, 8);
  params.senha = senha_cripto;
  return Usuario.update(params, { where: { id: id }, raw: true });
};

const deletarUsuario = (id) => {
    return Usuario.destroy({ where: { id: id }, raw: true });
};



module.exports = {
  Usuario,
  getTodosusuarios,
  criarusuario,
  getusuariosId,
  editarUsuario,
  deletarUsuario,
};