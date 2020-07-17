const choo = require('choo')
const html = require('choo/html')
const home = require('./view.js')

const app = choo()
app.route('/', home)
app.route('/rango-da-matilha', home)
app.mount('#rango')

const isInViewport = function (elem) {
    var bounding = elem.getBoundingClientRect();
    return bounding.top <= (window.innerHeight || document.documentElement.clientHeight)
};
const scan = function() {
  const articles = document.querySelectorAll('.reveal')
  for (let i = 0; i < articles.length; i++) {
    let article = articles.item(i)
    article.setAttribute('data-visible', isInViewport(article))
  }
}

window.onload = function() {
  const articles = document.querySelectorAll('.reveal')
  // Hide all articles
  for (let i = 0; i < articles.length; i++) {
    articles[i].setAttribute('data-visible', false)
  }
  scan()
  window.addEventListener('scroll', scan)
  window.addEventListener('resize', scan)
}
