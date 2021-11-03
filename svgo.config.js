const { extendDefaultPlugins } = require('svgo');

module.exports = {
  precision: 2,
  plugins: extendDefaultPlugins([
    'removeDimensions',
    'removeOffCanvasPaths',
    'removeStyleElement',
    'removeScriptElement',
    'reusePaths',
  ])
}