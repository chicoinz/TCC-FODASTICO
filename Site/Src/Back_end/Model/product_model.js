

const { DataTypes } = require('sequelize');
const sequelize = require('../Data_Base/connection');

const Produto = sequelize.define('produto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  modelo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'produtos',
  timestamps: false
});

const getTodosProdutos = async () => Produto.findAll({ raw: true });

const getProdutoId = async (id) => Produto.findOne({ where: { id: id }, raw: true });

const criarProduto = async (params) => Produto.create(params);    

const getModelosdeProduto = async () => Produto.findAll({
  attributes: ['modelo'],
  group: ['modelo'],
  raw: true
});

const getProdutoPorModelo = async (modelo) => Produto.findAll({ where: { modelo: modelo }, raw: true });

const getProdutoPorEstado = async (estado) => Produto.findAll({ where: { estado: estado }, raw: true });

const getProdutosDisponiveis = async () => Produto.findAll({ where: { estado: 'disponível' }, raw: true });

module.exports = {
 Produto,
 getTodosProdutos,
 getProdutoId,
 criarProduto,
 getProdutoPorModelo,
 getModelosdeProduto,
 getProdutoPorEstado,
 getProdutosDisponiveis
};