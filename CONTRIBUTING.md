# Contributing

## Request for icons
You need an icon for a specific file ending? No problem, just follow these guidelines:
- create an issue
- describe the file ending (e.g. '.xml') and the language (e.g. XML)

## Add new icons
Please follow these steps if you want to add new icons to the theme:
- check if an existing icon can be used for the file ending (search for icons in the `src/icons`-folder)
- pick the [material design colors](https://material.google.com/style/color.html#color-color-palette)
- all icons must be SVGs
- add the icons to the `src/icons`-folder
- `npm install` and `npm start` does the rest

### Folder icons
- The theme does not support different folder icons by now ([look at my explanation here](https://github.com/PKief/vscode-extension-material-icon-theme/pull/4)). But you can make any suggestions you'd like to have and they'll be checked.

---

Please check the created icon with your VSCode. Copy your source files of the theme into your extension folder (e.g. /Users/\<username>/.vscode/extensions/PKief.material-icon-theme-x.x.x). Restart your VSCode and create some example files.

### Free software to create/edit SVG icons
- [Inkscape](https://inkscape.org/en/)

### Use icons from here
- [Material Design Icons](https://materialdesignicons.com/)
    - download them as SVG and edit the icons e.g. with Inkscape
- you can use any other source **as long as the icons are free to use!**. This icon theme is absolutely non-commercial, but you should always check the license of your sources! 