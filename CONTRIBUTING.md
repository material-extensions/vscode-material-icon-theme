<h1>Contributing</h1>

<!-- TOC -->

- [Create issues](#create-issues)
- [Add new icons](#add-new-icons)
  - [Icon color](#icon-color)
  - [Free software to create/edit SVG icons](#free-software-to-createedit-svg-icons)
  - [Use icons from here](#use-icons-from-here)
- [Add translations](#add-translations)
- [Update API](#update-api)

<!-- /TOC -->

## Create issues

You need an icon for a specific file ending? No problem, just follow these guidelines:

- describe the file ending (e.g. '.xml') and the language (e.g. XML)
- show an example image of the icon or link to official website

## Add new icons

1. Create icon as SVG
2. Copy icon to `icons`-folder
3. Edit the icon configuration files under `src/icons` folder:
   - fileIcons.ts
   - folderIcons.ts
   - languageIcons.ts

### Icon color

Choose your icon colors from the [material design colors](https://material.io/design/color/the-color-system.html#tools-for-picking-colors). Alternatively, the [Material Color Converter](https://pkief.github.io/material-color-converter/) allows you to pick the correct color by matching a custom color code with the colors of the Material Design color palette.

### Free software to create/edit SVG icons

- [Inkscape](https://inkscape.org/en/) is a free, open source SVG editor
- There are tools available to convert PNG/JPG images to SVG - [Autotracer.org](https://autotracer.org) and [Vectorizer.io](https://vectorizer.io) are two examples.
- It's important to produce fully _vectorized_ graphic (don't include a base64 image string in the svg file).

### Use icons from here

- [Material Design Icons](https://materialdesignicons.com/)
  - download them as SVG and edit the icons e.g. with Inkscape
- you can use any other source **as long as the icons are free to use!** This icon theme is absolutely non-commercial, but you should always check the license of your sources!

### Test your icons before submitting
- Preview your own custom icons locally before submitting a Pull Request. See [Custom icon associations](README.md#custom-icon-associations) in README.md for instructions.


## Add translations

- Create or edit the translations in the `src/i18n` directory.
- Create or edit the `package.nls.*.json` files in the root folder

## Update API

1. Install node dependencies with `npm install`
2. Open project with VS Code
3. Press `F5` or run `Launch Extension` in the debug window
4. Run tests with `Launch Tests`

