const html = require('choo/html')
const raw = require('choo/html/raw')
module.exports = (state, emit) => {
  return html`
    <div id="rango">
      <noscript>No script</noscript>
      ${capa(state, emit)}
      ${produto(state, emit)}
      ${reforco(state, emit)}
      ${passoapasso(state, emit)}
      ${perguntas(state, emit)}
      ${contato(state, emit)}
      ${contatoFlutuante(state, emit)}
    </div>
  `
}

function capa() {
  function menu() {
    function scrollTo(event) {
      event.preventDefault()
      if (!event.target || !event.target.href) return false
      let element = document.querySelector(event.target.href.split('/').pop())
      if (!element) return false
      element.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
        inline: 'center'
      });
      return false
    }
    return html`
    <ul id="menu">
      <li class="logo">
        <img src="logo.png" alt="Rango da Matilha: Alimentação Natural para Pets" />
      </li>
      <li class="link">
        <a href="http://bit.ly/RangoZap" target="_blank" rel="noopener noreferer">Orçamento</a>
      </li>
      <li class="link">
        <a href="#passos" onclick=${scrollTo}>Como funciona</a>
      </li>
      <li class="link">
        <a href="#perguntas" onclick=${scrollTo}>Dúvidas</a>
      </li>
      <li class="link">
        <a href="http://bit.ly/RangoZap" target="_blank" rel="noopener noreferer">Whatsapp</a>
        <a href="http://bit.ly/RangoZap" target="_blank" rel="noopener noreferer">
          <img class="icone" src="3_WHATS.svg" alt="Whatsapp" />
        </a>
      </li>
      <li class="selo">
        <img src="selo_MAPA.png" alt="Selo do MAPA" />
      </li>
    </ul>
    `
  }
  function vitrine() {
    return html`
      <div id="vitrine">
        <div class="texto">
          <p>
            ISSO MESMO,<br>
            COMIDA DE VERDADE.<br>
            <em>
            PERSONALIZADA &<br>
            BALANCEADA<br>
            </em>
            PARA O <strong>SEU CACHORRO</strong><br>
          </p>
        </div>
        <div class="imagem">
          <img src="foto_rango_recortada.png" alt="Foto do rango: Proteínas, Carboidratos, Vísceras, Vegetais e Suplementos" />
        </div>
      </div>
    `
  }
  return html`
    <div id="capa">
      <h1 style="display:none">Rango da Matilha: Alimentação Natural para Pets</h1>
      ${menu()}
      ${vitrine()}
    </div>
  `
}

function produto() {
  const items = require('./content/product.json')
  function item(imagem, titulo, texto) {
    return html`
    <div class="item revelar">
      <img class="icone" src=${imagem} alt=${titulo} />
      <h3>${titulo}</h3>
      <p>${texto}</p>
    </div>
    `
  }
  return html`
    <div id="produto" class="revelar">
      ${items.map((i) => item(i.imagem, i.titulo, i.texto))}
    </div>
  `
}

function reforco() {
  return html`
  <div id="reforco" class="revelar">
    <img src="foto_cachorro_redondo.png" alt="Beagle"/>
    <p>
      SEU CACHORRO É <em>ÚNICO</em>.<br>
      E NÓS TEMOS UMA RECEITA ADEQUADA PARA ELE.
    </p>
    <p>
      <span class="pink">+ DE 40 RECEITAS TESTADAS E APROVADAS</span> <br>
      <span class="orange">VOCÊ RECEBE UMA RECEITA A CADA ENTREGA</span>
    </p>
  </div>
  `
}

function passoapasso() {
  const items = require('./content/passo-a-passo.json')
  function item(n, imagem, texto, alt) {
    return html`
      <div class="item revelar">
        <span class="numero">${n}</span>
        <img class="icone" src=${imagem} alt=${alt} />
        <p>${raw(texto)}</p>
      </div>
    `
  }
  return html`
    <div id="passos" class="revelar">
      <h2><img src="como_funciona.svg" alt="Como Funciona?" /></h2>
      ${items.map((i, n) => item(n, i.imagem, i.texto))}
    </div>
  `
}

function perguntas() {
  const items = require('./content/perguntas.json')
  function item(imagem, texto, alt) {
    return html`
      <div class="item revelar">
        <img src=${imagem} alt=${alt} />
        <p><span>R:</span>${texto}</p>
      </div>
    `
  }
  return html`
    <div id="perguntas" class="revelar">
      <h2><img src="principais_duvidas.svg" alt="Principais dúvidas" /></h2>
      ${items.map((i) => item(i.imagem, i.texto))}
    </div>
  `
}

function contato() {
  return html`
    <div id="contato" class="revelar">
      <a class="link" href="https://bit.ly/OrcamentoSiteRango" target="_blank" rel="noopener noreferer">
        Solicite um Orçamento
      </a>
    </div>
  `
}

function contatoFlutuante() {
  return html`
    <div id="flutuante">
      <a class="link" href="http://bit.ly/RangoZap" target="_blank" rel="noopener noreferer">
        <img src="3_WHATS.svg" />
      </a>
    </div>
  `
}
