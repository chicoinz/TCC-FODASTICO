const modeloUser = require('../Model/user_model');
const modeloProduto = require('../Model/product_model');
const cripto = require('bcrypt');

const perfilUsuario = async (req, res) => {
    const { email, senha } = req.body;
    const usuario = await Promise.resolve(modeloUser.Usuario.findOne({ where: { email: email }, raw: true }));

    if (!usuario){
        req.flash('error', 'Email incorreto! tente novamente.');
        return loginUsuario(req, res);
    }

    const senha_correta = await cripto.compare(senha, usuario.senha);
    if (!senha_correta){
        req.flash('error', 'Senha incorreta! tente novamente.');
        return loginUsuario(req, res);
    }

    req.session.user = {tipo_conta: 'usuario', id: usuario.id, nome: usuario.nome, email: usuario.email};
    return paginaUsuario(req, res);
};

const loginUsuario = (req, res) => {
    res.render('Logins/usuario', { messages: req.flash() });
};

const paginaUsuario = async (req, res) => {
    const produtosDisponiveis = await modeloProduto.getProdutosDisponiveis();
    res.render('Perfil/usuario', { nome: req.session.user.nome, messages: req.flash(), produtos: produtosDisponiveis });
};



const getUserById = async (req, res) => {
    const id = Number(req.params.id);
    const user = await modeloUser.getusuariosId(id);
    if (user) {
        res.json(user);
    }
    else {
        res.status(404).json({ mensagem: 'user não encontrado' });
    }
};

const postUser = async (req, res) => {
    const { nome, email, senha } = req.body;
    const novouser = await Promise.resolve(modeloUser.criarusuario(req.body));
    if (novouser){
        req.flash('success', 'user criado com sucesso!');
        return perfilUsuario(req, res);
    }
    else {
        req.flash('error', 'user falhou ao ser criado!');
        return perfilUsuario(req, res);
    }
};

const deleteUser = async (req, res) => {
    const id = Number(req.params.id);
    const user = await modeloUser.getusuariosId(id); 
    if (user) {
        await modeloUser.deletarusuario(id);
        req.flash('success', 'user deletado com sucesso');
        return perfilUsuario(req, res);
    } else {
        req.flash('error', 'user não encontrado');
        return perfilUsuario(req, res);
    }
};

const putUser = async (req, res) => {
    const { id } = req.body;
    const user = await Promise.resolve(modeloUser.getusuariosId(id));
    if (user) {
        await Promise.resolve(modeloUser.editarUsuario(req.body.id, req.body));
        req.flash('success', 'user atualizado com sucesso');
        return paginaUsuario(req, res);
    } else {
        req.flash('error', 'user não encontrado');
        return paginaUsuario(req, res);
    }
};

const logoutUsuario = (req, res) => {
    req.session.destroy();
    res.redirect('/inicial.html');
}



module.exports = {
    perfilUsuario,
    loginUsuario,
    paginaUsuario,
    getUserById,
    postUser,
    deleteUser,
    putUser,
    logoutUsuario
}