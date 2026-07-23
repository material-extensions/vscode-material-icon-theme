/** @type {import('svgo').Config} */
export default {
  multipass: true,
  precision: 2,
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          cleanupIds: {
            preserve: ['folder', 'motive'],
          },
        },
      },
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
