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
- minimize icons from `src/icons` with `npm install` and `npm run minimize` (output folder for minimized icons: `fileicons/icons`)
- follow the name conventions in the `icons/material-icons.json`-file:

```json
"iconDefinitions": {
    "_file_xml": {
        "iconPath": "./icons/xml.svg"
    },
}

"fileExtensions": {
    "xml": "_file_xml"
}
```
- Currently all icons can be used with **'light'** and **'highContrast'** color themes. If you want to add a new icon, try to check the compatibility to these color themes. If you want to create different icons for the 'light' and 'highContrast' color themes you can also do this:

Example from the [docs](https://code.visualstudio.com/Docs/customization/themes#_file-association):
```json
"light": {
    "folderExpanded": "_folder_open_light",
    "folder": "_folder_light",
    "file": "_file_light",
    "fileExtensions": {
        "ini": "_ini_file_light",
    }
},
"highContrast": {
    "folderExpanded": "_folder_open_highContrast",
    "folder": "_folder_highContrast",
    "file": "_file_highContrast",
    "fileExtensions": {
        "ini": "_ini_file_highContrast",
    }
}
```

- The theme does not support different folder icons by now ([look at my explanation here](https://github.com/PKief/vscode-extension-material-icon-theme/pull/4)). But you can make any suggestions you'd like to have and they'll be checked.
- Please check the created icon with your VSCode. Copy your source files of the theme into your extension folder (e.g. /Users/\<username>/.vscode/extensions/PKief.material-icon-theme-x.x.x). Restart your VSCode and create some example files.

### Free software to create/edit SVG icons
- [Inkscape](https://inkscape.org/en/)

### Use icons from here
- [Material Design Icons](https://materialdesignicons.com/)
    - download them as SVG and edit the icons e.g. with Inkscape
- you can use any other source **as long as the icons are free to use!**. This icon theme is absolutely non-commercial, but you should always check the license of your sources! 