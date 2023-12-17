# rollup-plugin-svg-to-symbol [![Travis](https://travis-ci.org/fjc0k/rollup-plugin-svg-to-symbol.svg?branch=master)](https://travis-ci.org/fjc0k/rollup-plugin-svg-to-symbol)

A rollup plugin JUST to transform SVG files to symobl strings, then you can freely handle them.

Webpack version: [fjc0k/svg-to-symbol-loader](https://github.com/fjc0k/svg-to-symbol-loader)

## Install

```bash
# Yarn
yarn add rollup-plugin-svg-to-symbol -D

# npm
npm i rollup-plugin-svg-to-symbol -D
```

## Usage

```js
// rollup.config.js
const svgToSymbol = require('rollup-plugin-svg-to-symbol')

module.exports = {
  plugins: [
    svgToSymbol()
  ]
}
```

```js
// sprite.js
import add from './svg/add.svg'
import close from './svg/close.svg'

export default [
  '<svg><defs>',
  add,
  close,
  '</defs></svg>'
].join('')
```

The default export just likes:

```html
<svg>
  <defs>
    <symbol id="add">.....</symbol>
    <symbol id="close">.....</symbol>
  </defs>
</svg>
```

## Options

- __extractId__
  - Type: `({ name }) => id`
  - Default: `({ filePath, name }) => name`
  - Desc: Use the function to custom symbol id. The `name` is the SVG filename without the extension. e.g.

```js
// rollup.config.js
svgToSymbol({
  extractId({ name }) {
    return `icon-${name}`
  }
})
```

```js
import add from './svg/add.svg'
// the add likes:
// <symbol id="icon-add">...</symbol>
```

- __svgo__
  - Type: `Object`
  - Default: [See here](https://github.com/fjc0k/svg-to-symbol-loader/blob/master/src/defaultSVGOPlugins.js)
  - Desc: The [svgo](https://github.com/svg/svgo) plugins.
