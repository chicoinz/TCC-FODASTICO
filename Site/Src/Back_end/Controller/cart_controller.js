const cartModelo = require('../Model/cart_model');
const paginaUsuario = require('./user_controller').paginaUsuario;   

const addToCart = async (req, res) => {
    const { usuarioId, produtoId, quantidade, data } = req.body;
    const novoItem = await cartModelo.adicionarAoCarrinho({ usuarioId, produtoId, quantidade, data });
    console.log('Item adicionado ao carrinho:', novoItem);
    if (novoItem === null) {
        console.error('Erro ao adicionar item ao carrinho');
        return res.status(500).json({ mensagem: 'Erro ao adicionar item ao carrinho' });
    }
    else {
        req.flash('success', 'Item adicionado ao carrinho com sucesso!');
        return paginaUsuario(req, res);
    }
};

const listItemsInCart = async (req, res) => {
    const usuarioId = req.session.user.id;
    const itensCarrinho = await cartModelo.getCarrinhoPorUsuario(usuarioId);
    console.log('Itens no carrinho:', itensCarrinho);
}

const getCart = async (req, res) => {
    const usuarioId = req.session.user.id;
    const itensCarrinho = await cartModelo.getCarrinhoPorUsuario(usuarioId);
    console.log('Itens no carrinho:', itensCarrinho);
    return res.render('Carrinho/carrinho', { itens: itensCarrinho, emailUsuario: req.session.user.email,
        senhaUsuario: req.session.user.senha,
        nome: req.session.user.nome 
    });
};

const putCart = async (req, res) => {
    const { id, quantidade } = req.body;
    const item = await cartModelo.getCarrinhoPorUsuario(id);
    if (item) {
        await cartModelo.editarCarrinho(id, req.body);
        await cartModelo.atualizarQuantidadeDoCarrinho(id, quantidade);
        return res.render('Avisos/Carrinho/editarCarrinho', { item: item, 
            emailUsuario: req.session.user.email,
            senhaUsuario: req.session.user.senha,
            nome: req.session.user.nome,
            mensagem: 'Item atualizado com sucesso!'
 });
    } else {
        return res.status(404).json({ mensagem: 'Item não encontrado' });
    }
};

const removeFromCart = async (req, res) => {
    const { id } = req.body;
    const item = await cartModelo.getCarrinhoPorUsuario(req.session.user.id); //id do usuario logado
    if (item) {
        await cartModelo.deletarItemDoCarrinho(id); //id do item do carrinho
        return res.render('Avisos/Carrinho/removerCarrinho', { item: item,
            emailUsuario: req.session.user.email,
            senhaUsuario: req.session.user.senha,
            nome: req.session.user.nome,
            mensagem: 'Item removido com sucesso!'
        });
    } else {
        return res.status(404).json({ mensagem: 'Item não encontrado' });
    }
};

module.exports = {
    addToCart,
    listItemsInCart,
    getCart,
    putCart,
    removeFromCart
};

