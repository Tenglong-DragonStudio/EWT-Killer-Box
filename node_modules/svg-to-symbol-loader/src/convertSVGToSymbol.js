const path = require('path')
const cheerio = require('cheerio')
const SVGO = require('svgo')
const defaultSVGOPlugins = require('./defaultSVGOPlugins')

const pluginsMap = new Map()
function parseSVGOPlugins(plugins) {
  if (!pluginsMap.has(plugins)) {
    if (plugins && typeof plugins === 'object') {
      pluginsMap.set(
        plugins,
        Object.keys(plugins).reduce((SVGOPlugins, name) => {
          const plugin = {}
          plugin[name] = plugins[name]
          SVGOPlugins.push(plugin)
          return SVGOPlugins
        }, [])
      )
    } else {
      pluginsMap.set(
        plugins,
        plugins
      )
    }
  }
  return pluginsMap.get(plugins)
}

const svgoMaps = new Map()
function createSvgo(plugins) {
  if (!svgoMaps.has(plugins)) {
    svgoMaps.set(plugins, new SVGO({
      plugins: parseSVGOPlugins(plugins)
    }))
  }
  return svgoMaps.get(plugins)
}

function loadXml(xml) {
  return cheerio.load(xml, { xmlMode: true })
}

function createSymbol(id, svg) {
  const $ = loadXml(svg)
  const viewBox = $('svg').attr('viewBox')
  const contents = $('svg').contents()

  $('svg').replaceWith('<symbol/>')
  $('symbol').attr('id', id)
  if (viewBox) {
    $('symbol').attr('viewBox', viewBox)
  }
  $('symbol').append(contents)

  return $.html()
}

module.exports = function (filePath, svgContent, {
  extractId = ({ name }) => name,
  svgo: SVGOPlugins = defaultSVGOPlugins
} = {}) {
  return new Promise((resolve, reject) => {
    const svgo = createSvgo(SVGOPlugins)
    svgo.optimize(svgContent).then(
      ({ data }) => {
        const { name } = path.parse(filePath)
        const id = extractId({ filePath, name })
        resolve(createSymbol(id, data))
      },
      reject
    )
  })
}
