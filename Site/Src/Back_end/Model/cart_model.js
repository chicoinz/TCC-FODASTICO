const { DataTypes } = require('sequelize');
const sequelize = require('../Data_Base/connection');

const Usuario = require('./user_model').Usuario;
const Produto = require('./product_model').Produto;

const Carrinho = sequelize.define('carrinho', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'id'
        }
    },
    produtoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Produto,
            key: 'id'
        }
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    data: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
}, {
    tableName: 'carrinhos',
    timestamps: false
})

const getCarrinhoPorUsuario = (usuarioId) => Carrinho.findAll({ where: { usuarioId: usuarioId }, raw: true });

const adicionarAoCarrinho = (id, params) => Carrinho.update(params, { where: { id: id }, raw: true }).then(([rowsUpdated]) => {
    if (rowsUpdated === 0) {
        return Carrinho.create(params);
    }
}); // Atualiza o item do carrinho se existir, caso contrário, cria um novo item

const deletarItemDoCarrinho = (id) => Carrinho.destroy({ where: { id: id }, raw: true });

const atualizarQuantidadeDoCarrinho = (id, quantidade) => Carrinho.update({ quantidade: quantidade }, { where: { id: id }, raw: true });

const deletarCarrinhoPorUsuario = (usuarioId) => Carrinho.destroy({ where: { usuarioId: usuarioId }, raw: true });

const editarCarrinho = (id, params) => Carrinho.update(params, { where: { id: id }, raw: true });

module.exports = {
    Carrinho,
    getCarrinhoPorUsuario,
    adicionarAoCarrinho,
    deletarItemDoCarrinho,
    atualizarQuantidadeDoCarrinho,
    deletarCarrinhoPorUsuario,
    editarCarrinho
};