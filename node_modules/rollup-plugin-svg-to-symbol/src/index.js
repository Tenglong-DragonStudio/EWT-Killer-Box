const path = require('path')
const convertSVGToSymbol = require('svg-to-symbol-loader/src/convertSVGToSymbol')
const { createFilter } = require('rollup-pluginutils')

module.exports = function (options = {}) {
  const filter = createFilter(options.include, options.exclude)
  return {
    name: 'svg-to-symbol',
    transform(SVGContent, filePath) {
      if (!filter(filePath) || path.extname(filePath) !== '.svg') {
        return null
      }
      return convertSVGToSymbol(filePath, SVGContent, options).then(
        data => ({
          code: `export default ${JSON.stringify(data)}`,
          map: { mappings: '' }
        }),
        this.error
      )
    }
  }
}
