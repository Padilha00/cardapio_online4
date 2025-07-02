const header = document.querySelector("header");

window.addEventListener("scroll", function () {
    header.classList.toggle("sticky", window.scrollY > 80);
});

let menu = document.querySelector('#menu-icon');
let navlist = document.querySelector('.navlist'); 

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navlist.classList.toggle('open');
};

window.onscroll = () => {
    menu.classList.remove('bx-x');
    navlist.classList.remove('open'); 
};

const sr = ScrollReveal({
    origin: 'top',
    distance: '85px',
    duration: 2500,
    reset: true
});

sr.reveal('.home-text', { delay: 300 });
sr.reveal('.home-img', { delay: 400 });
sr.reveal('.container', { delay: 400 });
sr.reveal('.about-img');
sr.reveal('.middle-text');
sr.reveal('.shop-content', { delay: 400 });


function Finalizar() {
  const nome = document.getElementById("Nome").value.trim();
  const telefone = document.getElementById("telefone").value.trim();

  if (nome === "" || telefone === "") {
    alert("Preencha todos os campos antes de finalizar.");
    return;
  }

  const hoje = new Date();
  const dataAtual = hoje.getDate().toString().padStart(2, "0") +
    (hoje.getMonth() + 1).toString().padStart(2, "0") +
    hoje.getFullYear();

  let ultimaData = localStorage.getItem("dataUltimaComanda");
  let ultimoNumero = localStorage.getItem("ultimoNumeroComanda");

  if (ultimaData === dataAtual) {
    ultimoNumero = parseInt(ultimoNumero) + 1;
  } else {
    ultimoNumero = 1;
  }

  localStorage.setItem("dataUltimaComanda", dataAtual);
  localStorage.setItem("ultimoNumeroComanda", ultimoNumero);

  const numeroPedido = dataAtual + ultimoNumero.toString().padStart(2, "0");
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  const pedidoFinal = {
    numero_pedido: numeroPedido,
    nome_cliente: nome,
    telefone_cliente: telefone,
    itens: carrinho
  };

fetch("http://localhost/cardapio_online4/projeto2/finalizar_pedido.php", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(pedidoFinal)
})
    .then(response => response.json())
    .then(data => {
      if (data.status === "sucesso") {
        alert(`Pedido finalizado!\nNúmero do pedido: ${data.numero_pedido}`);
        localStorage.removeItem("carrinho");
        window.location.href = "index.html";
      } else {
        alert("Erro: " + (data.erro || "Falha ao finalizar pedido."));
      }
    })
    .catch(error => {
      console.error("Erro:", error);
      alert("Erro ao conectar com o servidor.");
    });
}
