const html = require('choo/html')
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
        <a class="pink" href="#orcamento" onclick=${scrollTo}>Orçamento</a>
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
          <img class="icon" src="3_WHATS.svg" alt="Whatsapp" />
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
          <img src="foto_rango.png" alt="Foto do rango: Proteínas, Carboidratos, Vísceras, Vegetais e Suplementos" />
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
    <div class="item">
      <img class="icon" src=${imagem} alt=${titulo} />
      <h3>${titulo}</h3>
      <p>${texto}</p>
    </div>
    `
  }
  return html`
    <div id="produto">
      ${items.map((i) => item(i.imagem, i.titulo, i.texto))}
    </div>
  `
}

function reforco() {
  return html`
  <div id="reforco">
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
  function item(imagem, texto, alt) {
    return html`
      <div class="item">
        <img class="icon" src=${imagem} alt=${alt} />
        <p>${texto}</p>
      </div>
    `
  }
  return html`
    <div id="passos">
      ${items.map((i) => item(i.imagem, i.texto))}
    </div>
  `
}

function perguntas() {
  const items = require('./content/perguntas.json')
  function item(imagem, texto, alt) {
    return html`
      <div class="item">
        <img src=${imagem} alt=${alt} />
        <p><span>R:</span>${texto}</p>
      </div>
    `
  }
  return html`
    <div id="perguntas">
      ${items.map((i) => item(i.imagem, i.texto))}
    </div>
  `
}

function contato() {}
