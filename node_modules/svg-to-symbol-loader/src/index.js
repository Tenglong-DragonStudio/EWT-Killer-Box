const convertSVGToSymbol = require('./convertSVGToSymbol')

module.exports = function (SVGContent) {
  this.cacheable && this.cacheable()

  const done = this.async()

  convertSVGToSymbol(
    this.resourcePath,
    SVGContent,
    this.query || {}
  ).then(
    data => done(null, `module.exports = ${JSON.stringify(data)}`),
    err => done(err)
  )
}
