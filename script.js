const bebidas = [
  {
    nome: "Caipirinha",
    tipo: "alcool",
    ingredientes: ["3 pedaços de limão", "3 colheres de açúcar", "1 dose de cachaça", "Gelo"]
  },
  {
    nome: "Caipirinha Gourmet",
    tipo: "alcool",
    ingredientes: ["3 pedaços de limão", "1 colher de açúcar", "Meia dose de gengibre", "1 dose de cachaça", "Gelo"]
  },
  {
    nome: "Caipirosca",
    tipo: "alcool",
    ingredientes: ["3 pedaços de limão ou fruta escolhida", "Açúcar", "1 dose de vodka", "Gelo"]
  },
  {
    nome: "Mojito",
    tipo: "alcool",
    ingredientes: ["3 pedaços de limão", "3 colheres de açúcar", "Hortelã", "Rum/Vodka", "Meia dose de soda", "Gelo"]
  },
  {
    nome: "Sensação",
    tipo: "alcool",
    ingredientes: ["Meia dose de xarope frutas vermelhas", "Meia dose de suco de limão", "1 dose de vodka", "Gelo"]
  },
  {
    nome: "Savana",
    tipo: "alcool",
    ingredientes: ["2 doses de licor de maracujá", "10ml suco de limão", "Gelo", "Espuma"]
  },
  {
    nome: "Tucuju",
    tipo: "alcool",
    ingredientes: ["1 dose licor de gengibre", "Meia dose de suco de limão", "1 dose de soda", "Gelo"]
  },
  {
    nome: "Gin Tropical/Red",
    tipo: "alcool",
    ingredientes: ["1 dose de gin", "3 doses energético", "Laranja", "Gelo"]
  },
  {
    nome: "Gin Tônica",
    tipo: "alcool",
    ingredientes: ["1 dose de gin", "3 doses tônica", "Limão siciliano", "Especiarias", "Gelo"]
  },
  {
    nome: "Sem Álcool",
    tipo: "sem",
    ingredientes: ["Limão ou tangerina", "Açúcar", "Hortelã", "2 doses de suco", "Gelo"]
  },
  {
    nome: "Sem Álcool de Xarope",
    tipo: "sem",
    ingredientes: ["Xarope frutas vermelhas", "Suco de limão", "Soda", "Gelo"]
  }
];

const cardapio = document.getElementById("cardapio");
const pesquisa = document.getElementById("pesquisa");
let filtroAtual = "todos";

function normalizar(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function bebidasFiltradas() {
  const termo = normalizar(pesquisa.value.trim());

  return bebidas.filter((bebida) => {
    const combinaFiltro = filtroAtual === "todos" || bebida.tipo === filtroAtual;
    const combinaBusca = normalizar(bebida.nome).includes(termo);
    return combinaFiltro && combinaBusca;
  });
}

function mostrar(lista) {
  if (!lista.length) {
    cardapio.innerHTML = '<p class="vazio">Nenhuma bebida encontrada.</p>';
    return;
  }

  cardapio.innerHTML = lista.map((bebida) => {
    const rotulo = bebida.tipo === "alcool" ? "Com álcool" : "Sem álcool";

    return `
      <article class="card ${bebida.tipo}">
        <div class="card-cabecalho">
          <h2>${bebida.nome}</h2>
          <span class="tag">${rotulo}</span>
        </div>
        <ul>
          ${bebida.ingredientes.map((ingrediente) => `<li>${ingrediente}</li>`).join("")}
        </ul>
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
mostrar(bebidas);
