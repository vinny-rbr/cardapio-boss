const bebidas = [
  {
    nome: "Caipirinha",
    tipo: "alcool",
    ingredientes: ["Meia dose de suco de limão", "3 colheres de açúcar", "1 dose de cachaça", "Gelo", "Rodelas de limão"]
  },
  {
    nome: "Caipirinha Gourmet",
    tipo: "alcool",
    ingredientes: ["Meia dose de suco de limão", "1 colher de açúcar", "Meia dose de gengibre", "1 dose de cachaça", "Gelo", "Rodelas de limão"]
  },
  {
    nome: "Caipirosca",
    tipo: "alcool",
    ingredientes: ["Meia dose de suco de limão", "3 colheres de açúcar", "1 dose de vodka", "Gelo", "Rodelas de limão"]
  },
  {
    nome: "Sensação",
    tipo: "alcool",
    ingredientes: ["Meia dose de xarope frutas vermelhas", "Meia dose de suco de limão", "1 dose de vodka", "Gelo"]
  },
  {
    nome: "Savana",
    tipo: "alcool",
    ingredientes: ["2 doses de licor de maracujá", "10 ml suco de limão (menos de meia dose)", "Gelo", "Finaliza com espuma"]
  },
  {
    nome: "Gin Tropical/Red",
    tipo: "alcool",
    ingredientes: ["Gelo no copo", "1 dose de gin", "3 doses de energético", "1 fatia de laranja (decoração)"]
  },
  {
    nome: "Gin Tônica",
    tipo: "alcool",
    ingredientes: ["Gelo no copo", "1 dose de gin", "3 doses de tônica", "Rodela de siciliano ou laranja", "Especiarias em cima"]
  },
  {
    nome: "Sem Álcool de Limão",
    tipo: "sem",
    ingredientes: ["Meia dose de suco de limão", "3 colheres de açúcar", "Hortelã", "2 doses de suco", "Gelo"]
  },
  {
    nome: "Sem Álcool de Xarope de Frutas Vermelhas",
    tipo: "sem",
    ingredientes: ["Meia dose de xarope de frutas vermelhas", "Meia dose de suco de limão", "1 dose de soda", "Gelo"]
  }
];

const cardapio = document.getElementById("cardapio");
const pesquisa = document.getElementById("pesquisa");
const contagem = document.getElementById("contagem");
let filtroAtual = "todos";

function normalizar(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function bebidasFiltradas() {
  const termo = normalizar(pesquisa.value.trim());

  return bebidas.filter((bebida) => {
    const combinaFiltro = filtroAtual === "todos" || bebida.tipo === filtroAtual;
    const combinaBusca =
      !termo ||
      normalizar(bebida.nome).includes(termo) ||
      bebida.ingredientes.some((ingrediente) => normalizar(ingrediente).includes(termo));
    return combinaFiltro && combinaBusca;
  });
}

function mostrar(lista) {
  contagem.textContent = `${lista.length} ${lista.length === 1 ? "drink" : "drinks"} no cardápio`;

  if (!lista.length) {
    cardapio.innerHTML = `
      <div class="vazio">
        <div class="vazio-ornamento">❖</div>
        <div class="vazio-titulo">Nada por aqui</div>
        <div class="vazio-dica">Tente outro nome ou ingrediente.</div>
      </div>
    `;
    return;
  }

  cardapio.innerHTML = lista.map((bebida) => {
    const semAlcool = bebida.tipo === "sem";
    const rotulo = semAlcool ? "ZERO" : "ÁLCOOL";
    const classeRotulo = semAlcool ? "rotulo sem" : "rotulo";

    return `
      <article class="item">
        <div class="item-topo">
          <span class="nome">${bebida.nome}</span>
          <span class="leader"></span>
          <span class="${classeRotulo}">${rotulo}<span class="ponto"></span></span>
        </div>
        <p class="ingredientes">${bebida.ingredientes.join(", ")}</p>
      </article>
    `;
  }).join("");
}

function atualizarCardapio() {
  mostrar(bebidasFiltradas());
}

function filtrar(tipo, botao) {
  filtroAtual = tipo;
  document.querySelectorAll(".filtros button").forEach((item) => item.classList.remove("ativo"));
  botao.classList.add("ativo");
  atualizarCardapio();
}

pesquisa.addEventListener("input", atualizarCardapio);
atualizarCardapio();
