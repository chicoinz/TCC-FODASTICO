const modeloProduto = require('../Model/product_model');


const getAllProducts = (req, res) => {
    const produtos = modeloProduto.getTodosProdutos();
    res.json(produtos);
};


const getProductId = (req, res) => {
    const id = Number(req.params.id);
    const produto = modeloProduto.getProdutoId(id);
    if (produto) {
        res.json(produto);
    }
    else {
        res.status(404).json({ mensagem: 'produto não encontrado' });
    }
};

const postProduct = (req, res) => {
    const { nome, modelo, estado } = req.body;
    const novoProduto = modeloProduto.criarProduto(nome, modelo, estado);
    if (novoProduto){
        res.json({ mensagem: 'produto criado com sucesso'});
    }
    else {
        res.json({ mensagem: 'produto falhou ao ser criado!'});
    };
};

const getModelsofProduct = (req, res) => {
    const modelo = req.params.modelo;
    const modelos_de_produto = modeloProduto.getModelosdeProduto(modelo);
    res.json(modelos_de_produto);
};

const getProductsbyModel = (req, res) => {
    const modelo = req.params.modelo;
    const produtos = modeloProduto.getProdutoPorModelo(modelo);
    res.json(produtos);
};

const getProductsbyState = (req, res) => {
    const { estado } = req.body;
    const produtos = modeloProduto.getProdutoPorEstado(estado);
    res.json(produtos);
}

module.exports = {
    getAllProducts,
    getProductId,
    getModelsofProduct,
    getProductsbyModel,
    getProductsbyState,
    postProduct
}