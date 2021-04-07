const API_KEY = "XXX";

function exibeNoticia() {
  let divTela = document.querySelector(".box-noticia");
  let texto = "";

  let dados = JSON.parse(this.responseText);

  for (i = 0; i < dados.articles.length; i++) {
    let noticia = dados.articles[i];
    let data = new Date(noticia.publishedAt);

    texto += `<div class="card  mb-3" style="max-width: 900px;">
    <div class="row no-gutters card-body">
      <div class="col-md-4">
        <a href ="${noticia.url}" target="_blank"> <img
          src="${noticia.urlToImage}"
          class="card-img"
          alt="..."
        /></a>
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <a href ="${noticia.url}" target="_blank" ><h5 class="card-title">${
      noticia.title
    }</h5></a>
          <p class="card-text">
            <small class="creditos"
              >${data.toLocaleDateString()} - ${noticia.source.name} - ${
      noticia.author
    }</small
            >
          </p>
          <p class="card-text">
            ${noticia.description}</p>
          
        </div>
      </div>
    </div>
  </div>`;
  }
  divTela.innerHTML = texto;
}

let executaPesquisa = () => {
  let query = document.getElementById("txtPesquisa").value;

  let xhr = new XMLHttpRequest();
  xhr.onload = exibeNoticia;
  xhr.open(
    "GET",
    `https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`
  );
  xhr.send();
  criaSalvarPesquisa(query);
  document.getElementById("btnSalvar").addEventListener("click", salvaPesquisa);
};

let criaSalvarPesquisa = (query) => {
  let tela = document.querySelector(".pesquisaFeita");
  let texto = "";
  texto = ` <nav class="navbar navbar-light bg-light navbar-pesquisa">
  <a class="titulo-nav navbar-brand">Pesquisa: <strong>${query}</strong></a>
  
  <button type="button" class="btn-salvar btn btn-warning btn-primary" data-toggle="modal" data-target="#exampleModal">
      Salvar
  </button>

  
  <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
          <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Pesquisas Salvas</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                  </button>
              </div>
              <div class="modal-body">
                  <div class="input-group mb-3">
                      <div class="input-group-prepend">
                          <span class="input-group-text" id="inputGroup-sizing-default">Título do
                              menu</span>
                      </div>
                      <input id="txtTitulo" type="text" class="form-control hsimp-level">
                  </div>
                  <div class="input-group mb-3">
                      <div class="input-group-prepend">
                          <span class="input-group-text" id="inputGroup-sizing-default">Texto de Pesquisa</span>
                      </div>
                      <input id="txtDescricao" type="text" class="form-control hsimp-level">
                  </div>
              </div>
              <div class="modal-footer">
                  <button type="button" class="btn" 
                      data-dismiss="modal">Cancelar</button>
                  <button id="btnSalvar" type="button" class="btn btn-primary" data-dismiss="modal">Salvar</button>
              </div>
          </div>
      </div>
  </div>
</nav>`;

  tela.innerHTML = texto;
};

var PesquisasSalvas = { pesquisas: [] };

let salvaPesquisa = () => {
  console.log(PesquisasSalvas);
  let titulo = document.getElementById("txtTitulo").value;
  let texto = document.getElementById("txtDescricao").value;
  let textoTela = "";
  let tela = document.querySelector(".aparecePesquisa");

  if (titulo == "" || texto == "") {
    alert("Campos em branco");
  } else {
    textoTela = `<a class = "botoesPesquisas" id = "${titulo}" href = "#" onclick = "executaPesquisaSalva(this);">${titulo} </a><br>`;
    tela.innerHTML += textoTela;

    let novaPesquisa = { titulo: titulo, texto: texto };

    PesquisasSalvas.pesquisas.push(novaPesquisa);
    localStorage.setItem("Pesquisas", JSON.stringify(PesquisasSalvas));
    let botoesPesquisa = document.querySelectorAll(".botoesPesquisas");
  }
};

let executaPesquisaSalva = (e) => {
  let id = e.getAttribute("id");
  let query = "";
  let acabou = false;

  for (i = 0; i < PesquisasSalvas.pesquisas.length && !acabou; i++) {
    if (PesquisasSalvas.pesquisas[i].titulo == id) {
      query = PesquisasSalvas.pesquisas[i].texto;
      acabou = true;
    }
  }
  console.log(query);

  let xhr = new XMLHttpRequest();
  xhr.onload = exibeNoticia;
  console.log(query);
  xhr.open(
    "GET",
    `https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`
  );
  xhr.send();
};

onload = () => {
  principal();
};

document
  .getElementById("btnPesquisa")
  .addEventListener("click", executaPesquisa);

let principal = () => {
  let xhr = new XMLHttpRequest();
  xhr.onload = exibeNoticia;
  xhr.open(
    "GET",
    `https://newsapi.org/v2/top-headlines?country=br&apiKey=${API_KEY}`
  );
  xhr.send();
};

fonte = (fonte) => {
  let xhr = new XMLHttpRequest();
  xhr.onload = exibeNoticia;
  xhr.open(
    "GET",
    `https://newsapi.org/v2/top-headlines?sources=${fonte}&apiKey=${API_KEY}`
  );
  xhr.send();
};

let bbc = document.getElementsByClassName("btn-bbc");

for (i = 0; i < bbc.length; i++) {
  bbc[i].addEventListener("click", () => fonte("bbc-news"));
}
let cnn = document.getElementsByClassName("btn-cnn");

for (i = 0; i < cnn.length; i++) {
  cnn[i].addEventListener("click", () => fonte("CNN"));
}

let google = document.getElementsByClassName("btn-google");

for (i = 0; i < google.length; i++) {
  google[i].addEventListener("click", () => fonte("google-news-br"));
}

let globo = document.getElementsByClassName("btn-globo");

for (i = 0; i < globo.length; i++) {
  globo[i].addEventListener("click", () => fonte("Globo"));
}

let home = document.getElementsByClassName("home");

for (i = 0; i < home.length; i++) {
  home[i].addEventListener("click", principal);
}
