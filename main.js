/*
 * Adapted from https://gomakethings.com/how-to-test-if-an-element-is-in-the-viewport-with-vanilla-javascript/
 */
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
  scan()
  window.addEventListener('scroll', scan)
  window.addEventListener('resize', scan)
}
