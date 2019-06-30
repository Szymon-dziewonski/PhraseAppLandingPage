const posthtml         = require('posthtml')
const minifyClassnames = require('posthtml-minify-classnames')
const extractCss       = require('extract-css')
const fs               = require('fs')

const cssPath   = './dist/styles.css'
const indexPath = './dist/index.html'
const index     = fs.readFileSync(indexPath)

posthtml()
  .use(minifyClassnames({
    filter: /^((.js-)|(#code-example-tabs)|(#code-example-tab-)|(.material-icons)|(.col-))/
  }))
  .process(index)
  .then(result => new Promise(resolve =>
    extractCss(
      result.html,
      {
        url                 : './',
        applyStyleTags      : true,
        removeStyleTags     : true,
        applyLinkTags       : false,
        removeLinkTags      : false,
        preserveMediaQueries: false
      },
      (err, html, css) => resolve({err, html, css})
    )
  ))
  .then(({html, css}) => {
    fs.writeFileSync(cssPath, css)
    fs.writeFileSync(indexPath, html)
  })