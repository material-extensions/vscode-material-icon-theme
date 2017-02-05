# Contributing

## Request for icons
You need an icon for a specific file ending? No problem, just follow these guidelines:
- [create an issue](https://github.com/PKief/vscode-extension-material-icon-theme/issues/new)
- describe the file ending (e.g. '.xml') and the language (e.g. XML)

## Add new icons
You have to install the node dependencies with `npm install`.

1. Create icon as SVG
2. Copy icon to `src/icons`
3. Edit `src/material-icons.json`
4. `npm start`

### Icon color
Choose your icon colors from the [material design colors](https://material.google.com/style/color.html#color-color-palette).

### Check icon
Please check the created icon with your VSCode. Copy your source files of the theme into your extension folder (e.g. `/Users/\<username>/.vscode/extensions/PKief.material-icon-theme-x.x.x`). Restart your VSCode and create some example files.

### Free software to create/edit SVG icons
- [Inkscape](https://inkscape.org/en/)

### Use icons from here
- [Material Design Icons](https://materialdesignicons.com/)
    - download them as SVG and edit the icons e.g. with Inkscape
- you can use any other source **as long as the icons are free to use!**. This icon theme is absolutely non-commercial, but you should always check the license of your sources! 