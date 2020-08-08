const fs = require('fs')
const path = require('path')
const ncp = require('ncp')
const rimraf = require('rimraf')
const browserify = require('browserify')

const choo = require('choo')
const html = require('choo/html')
const home = require('./src/view.js')

const copy = (from, to) => {
  return new Promise((resolve, reject) => {
    ncp(
      from, to,
      (error) => {
        if (error) return reject(error)
        resolve()
      }
    )
  })
}

const remove = (where) => {
  return new Promise((resolve, reject) => {
    rimraf(
      where, [],
      (error) => {
        if (error) return reject(error)
        resolve()
      }
    )
  })
}

const bundleJs = () => {
  return new Promise((resolve, reject) => {
    const b = browserify({
      entries: [
        path.resolve('./', 'src', 'main.js')
      ],
      debug: false
    })
    const distFile = path.resolve('./', 'src', 'dist.js')
    fs.writeFileSync(distFile, '// dist file')
    b.bundle((err, buff) => {
      if (err) return reject(err)
      fs.writeFileSync(distFile, buff)
      resolve()
    })
  })
}

const htmlTemplate = function(content) {
  let cssFile = path.resolve('./', 'src', 'main.css')
  let jsFile = path.resolve('./', 'src', 'dist.js')
  const styleString = fs.readFileSync(cssFile).toString()
  const javascriptString = fs.readFileSync(jsFile).toString()
  return `
  <!DOCTYPE html>
  <html lang="pt-br" dir="ltr">
  <head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, user-scalable=no" />

  <meta name="description" content="Alimentação natural para pets">
  <meta name="keywords" content="Alimentação, Natural, Pets, Animais de estimação">
  <meta name="author" content="Rango da Matilha">

  <meta property="og:type" content="website">
  <meta property="og:title" content="Rango da Matilha">
  <meta property="og:description" content="Alimentação natural para pets.">
  <meta property="og:image" content="http://www.rangodamatilha.com.br/foto_rango_share.png">
  <meta property="og:card" content="http://www.rangodamatilha.com.br/foto_rango_share.png">
  <meta property="og:url" content="http://www.rangodamatilha.com.br">

  <link rel="icon" type="image/png" href="http://www.rangodamatilha.com.br/logo_icon.png">
  <title>Rango da Matilha</title>
  <style>${styleString}</style>
  </head>
  <body>
  ${content}
  <script type="text/javascript">${javascriptString}</script>
  <!-- Global site tag (gtag.js) - Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=UA-174218020-1"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'UA-174218020-1');
  </script>
  </body>
  </html>
  `
}

const app = choo()
app.route('/', home)

async function build() {
  const distFolder = path.resolve('./', 'dist')
  const staticFolder = path.resolve('./', 'static')
  const indexFile = path.resolve('./', 'dist', 'index.html')

  console.log('removing dist folder')
  await remove(distFolder)
  console.log('remaking dist folder')
  fs.mkdirSync(distFolder, { recursive: true })

  console.log('copying static files to dist')
  await copy(staticFolder, distFolder)

  console.log('bundling js')
  await bundleJs()

  console.log('writing index file')
  const htmlString = htmlTemplate(app.toString('/', { count: 0 }))
  fs.writeFileSync(indexFile, htmlString)
}

build()
.then(() => {
  console.log('done')
  console.log(`deploy with: `)
  console.log(`aws s3 sync ./dist/ s3://www.rangodamatilha.com.br/ --exclude '.*' --acl public-read`)
})
.catch((e) => console.log(e))
