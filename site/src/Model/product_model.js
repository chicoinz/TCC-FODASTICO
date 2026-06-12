
let produto = [{ id:1 , nome: "Vaccum_basic",  modelo: "Basico", estado:"Armazem"}
]

const getTodosProdutos = () => produto;

const getProdutoId = (id) => produto.find(a => a.id === id);

const criarProduto = (nome, modelo, estado) =>  {
 const newProduto = {
 id: produto.length > 0 ? Math.max(...produto.map(a => a.id)) + 1 : 1, 
 nome: nome,
 modelo: modelo,
 estado: estado
 };
 produto.push(newProduto);
 return newProduto;
};

const getModelosdeProduto = (modelo) => [new Set(... produto.map(p => p.modelo === modelo))];

const getProdutoPorModelo = (modelo) => produto.filter(p => p.modelo ===  modelo);

const getProdutoPorEstado = (estado) => produto.filter(p => p.estado ===  estado);

module.exports = {
 getTodosProdutos,
 getProdutoId,
 criarProduto,
 getProdutoPorModelo,
 getModelosdeProduto,
 getProdutoPorEstado
};