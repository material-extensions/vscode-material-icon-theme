# Contributing

## Create issues
You need an icon for a specific file ending? No problem, just follow these guidelines:
- [create an issue](https://github.com/PKief/vscode-material-icon-theme/issues/new)
- describe the file ending (e.g. '.xml') and the language (e.g. XML)

## Add new icons
1. Create icon as SVG
2. Copy icon to `icons`-folder
3. Edit `src/material-icons.json`

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

## Update API
1. Install node dependencies with `npm install`
2. Open project with VS Code
3. Press `F5` or run `Launch Extension` in the debug window
4. Run tests with `Launch Tests`

### Add translations
- create a new JSON-file in the `src/i18n` directory with the translations according to the existing translation
- edit the existing translation files
- `npm run copy:json` after editing to copy the edited jsons to the `out`-folder

It'd be great if you can improve the project!