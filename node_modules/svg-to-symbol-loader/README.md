# svg-to-symbol-loader [![Travis](https://travis-ci.org/fjc0k/svg-to-symbol-loader.svg?branch=master)](https://travis-ci.org/fjc0k/svg-to-symbol-loader)

A webpack loader JUST to transform SVG files to symobl strings, then you can freely handle them.

__JUST SUPPORT WEBPACK 4.__

Rollup version: [fjc0k/rollup-plugin-svg-to-symbol](https://github.com/fjc0k/rollup-plugin-svg-to-symbol)

## Install

```bash
# Yarn
yarn add svg-to-symbol-loader -D

# npm
npm i svg-to-symbol-loader -D
```

## Usage

```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: 'svg-to-symbol-loader'
      }
    ]
  }
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
// webpack.config.js
{
  extractId({ name }) {
    return `icon-${name}`
  }
}
```

```js
import add from './svg/add.svg'
// the add likes:
// <symbol id="icon-add">...</symbol>
```

- __svgo__
  - Type: `Object`
  - Default: [See here](./src/defaultSVGOPlugins.js)
  - Desc: The [svgo](https://github.com/svg/svgo) plugins.
