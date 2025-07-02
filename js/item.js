
const urlParams = new URLSearchParams(window.location.search);
const produtoNome = urlParams.get('produto');


const produtos = {
  "Big Monster": {
    nome: "Big Monster",
    descricao: "Pão brioche tostado, hamburguer de 180g, queijo cheddar cremoso, alface, tomate, ketchup e bacon crocante.",
    preco: 31.00,
    img: "img/burguer00.png"
  },
  "Smash Duplo": {
    nome: "Smash Duplo",
    descricao: "Pão brioche tostado, 2 hamburgueres de 90g, queijo cheddar cremoso, e cream cheese.",
    preco: 26.00,
    img: "img/smash.png"
  },
  "Chicken burger": {
    nome: "Chicken burger",
    descricao: "Pão brioche tostado, 2 hamburgueres de filé de frango de 90g, queijo mussarela, ketchup, alface e cream cheese.",
    preco: 29.00,
    img: "img/frango.png"
  },
  "Clássico": {
    nome: "Clássico",
    descricao: "Pão brioche tostado, hamburguer de 180g, queijo cheddar cremoso, alface e tomate.",
    preco: 24.00,
    img: "img/burguer1.png"
  }
};


const itemPrincipal = document.querySelector('.item-principal');
const formAdicionais = document.getElementById('form-adicionais');
const campoObservacoes = document.getElementById('campo-observacoes');
const btnAdicionar = document.getElementById('btn-proximo');

if (!produtoNome || !produtos[produtoNome]) {
  itemPrincipal.innerHTML = '<p>Produto não encontrado!</p>';
} else {
 
  const produto = produtos[produtoNome];
  itemPrincipal.innerHTML = `
    <img src="${produto.img}" alt="${produto.nome}" />
    <div class="info">
      <h2>${produto.nome}</h2>
      <p>${produto.descricao}</p>
      <h3>R$ ${produto.preco.toFixed(2)}</h3>
    </div>
  `;
}


btnAdicionar.addEventListener('click', () => {
  
  const adicionaisSelecionados = Array.from(formAdicionais.elements['adicional'])
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.value);

  
  const observacoes = campoObservacoes.value.trim();

  
  const pedido = {
    nome: produtoNome,
    preco: produtos[produtoNome].preco,
    adicionais: adicionaisSelecionados,
    observacoes: observacoes,
    quantidade: 1
  };


  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

 
  const pedidoExistenteIndex = carrinho.findIndex(item => 
    item.nome === pedido.nome &&
    JSON.stringify(item.adicionais) === JSON.stringify(pedido.adicionais) &&
    item.observacoes === pedido.observacoes
  );

  if (pedidoExistenteIndex >= 0) {
 
    carrinho[pedidoExistenteIndex].quantidade += 1;
  } else {
   
    carrinho.push(pedido);
  }

  localStorage.setItem('carrinho', JSON.stringify(carrinho));

  
  alert("Item adicionado ao carrinho!");

  
  window.location.href = "index.html";
});
