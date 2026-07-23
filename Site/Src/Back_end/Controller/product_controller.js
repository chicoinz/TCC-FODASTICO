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

const postProduct = async (req, res) => {
    if (req.file) {
       req.body.imagem = '/img/produtos/' + req.file.filename; //faz a img que o adm colocar ficar salva na pasta de produtos, pra incluir o autor é mto trampo
    } 

    const novoProduto = await Promise.resolve(modeloProduto.criarProduto(req.body));

    if(!req.body.imagem){
        delete req.body.imagem; // Remove a propriedade "imagem" do objeto req.body se não houver arquivo enviado
    }

    if (novoProduto){
        req.flash('success', 'produto criado com sucesso!');
        return res.redirect('Perfil/admin', { messages: req.flash() });
    }
    else {
        req.flash('error', 'produto falhou ao ser criado!');
        return res.redirect('Perfil/admin', { messages: req.flash() });
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