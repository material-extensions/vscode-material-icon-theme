/**
 * @typedef {import('svgo').Config} SVGOConfig
 * @typedef {import('svgo').PluginConfig} PluginConfig
 */

module.exports = /** @type {SVGOConfig} */ {
  multipass: true,
  precision: 2,
  /** @type {PluginConfig[]} */
  plugins: [
    {
      name: 'preset-default',
    },
    'convertStyleToAttrs',
    'removeDimensions',
    'removeOffCanvasPaths',
    'removeScriptElement',
    'removeStyleElement',
    'reusePaths',
    'sortAttrs',
  ],
};
