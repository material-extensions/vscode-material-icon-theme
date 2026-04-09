/** @type {import('svgo').Config} */
module.exports = {
  multipass: true,
  precision: 2,
  plugins: [
    {
      name: 'preset-default',
    },
    'convertStyleToAttrs',
    'removeDimensions',
    'removeOffCanvasPaths',
    'removeScripts',
    'removeStyleElement',
    'removeViewBox',
    'removeTitle',
    'reusePaths',
    'sortAttrs',
  ],
};
