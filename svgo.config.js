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
    'removeScriptElement',
    'removeStyleElement',
    'reusePaths',
    'sortAttrs',
  ],
};
