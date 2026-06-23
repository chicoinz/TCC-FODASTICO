
let usuarios = [{ id:1 , nome: "Mateus", Senha:"1234"}];

const getTodosusuarios = () => usuarios;

const getusuariosId = (id) => usuarios.find(a => a.id === id);

const criarusuario = (nome, senha) =>  {
 const newusuario = {
 id: usuarios.length > 0 ? Math.max(...usuarios.map(a => a.id)) + 1 : 1, 
 nome: nome,
 Senha: senha,
 };
 usuarios.push(newusuario);
 return newusuario;
};


module.exports = {
 getTodosusuarios,
 getusuariosId,
 criarusuario
};