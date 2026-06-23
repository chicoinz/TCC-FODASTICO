const admin = require('../Model/admin_model');
const userModel = require('../Model/user_model');
const productModel = require('../Model/product_model');

const perfilAdmin = async (req, res) => {
    const { senha } = req.body || {};

    const adminRow = await admin.loginAdmin();
    const adminKey = adminRow ? String(adminRow.senha): null;

    const [userList, productList] = await Promise.all([
        await Promise.resolve(userModel.getTodosusuarios()),
        await Promise.resolve(productModel.getTodosProdutos())
    ]);

    if (senha && senha === adminKey) {

        req.session.user = { tipo_conta: 'admin', adminSenha: adminKey};

        res.render("Perfil/admin", { 
            usuarios: userList,
             produtos: productList 
        });
    }
    else {
        req.flash('error', 'Senha incorreta. Acesso negado.');
        return loginAdmin(req, res);
    }
};

const loginAdmin = (req, res) => {
    res.render('Logins/admin', { messages: req.flash() });
};

const logoutAdmin = (req, res) => {
    req.session.destroy (err => {
        res.redirect('/inicial.html')
    }   );
};

module.exports = {
    logoutAdmin,
    loginAdmin,
    perfilAdmin
};