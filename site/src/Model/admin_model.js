
let admin= [{Senha: "1234"}];

const loginAdmin = (senha) => admin.find(a => a.Senha === senha);


module.exports = {
 loginAdmin
};