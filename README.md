<h1 align="center">
  <br>
    <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/main/logo.png" alt="logo" width="200">
  <br><br>
  Material Icon Theme
  <br>
  <br>
</h1>

<h4 align="center">Get the Material Design icons into your VS Code.</h4>

<p align="center">
    <a href="https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme"><img src="https://img.shields.io/visual-studio-marketplace/v/PKief.material-icon-theme?style=for-the-badge&colorA=252526&colorB=43A047&label=VERSION" alt="Version"></a>&nbsp;
    <a href="https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme"><img src="https://img.shields.io/visual-studio-marketplace/r/PKief.material-icon-theme?style=for-the-badge&colorA=252526&colorB=43A047&label=Rating" alt="Rating"></a>&nbsp;
    <a href="https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme"><img src="https://img.shields.io/visual-studio-marketplace/i/PKief.material-icon-theme?style=for-the-badge&colorA=252526&colorB=43A047&label=Installs" alt="Installs"></a>&nbsp;
    <a href="https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme"><img src="https://img.shields.io/visual-studio-marketplace/d/PKief.material-icon-theme?style=for-the-badge&colorA=252526&colorB=43A047&label=Downloads" alt="Downloads"></a>
</p>

### File icons

<img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/main/images/fileIcons.png" alt="file icons">

### Folder icons

<img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/main/images/folderIcons.png" alt="folder icons">

#### Customize file & folder color

You can change the color of the default file and folder icons using the command palette:

<img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/main/images/set-folder-color.gif" alt="custom folder colors">

or via user settings:

```json
"material-icon-theme.folders.color": "#ef5350",
"material-icon-theme.files.color": "#42a5f5",
```

#### Folder themes

You can change the design of the folder icons using the command palette:

<img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/main/images/set-folder-theme.gif" alt="folder themes">

or via user settings:

```json
"material-icon-theme.folders.theme": "specific"
```

## Custom icon opacity

You can set a custom opacity for the icons:

```json
"material-icon-theme.opacity": 0.5
```

## Custom icon saturation

If colors do not make you happy you can change the icons to have less saturation making them look grayish or completely grayscale by setting saturation to 0:

```json
"material-icon-theme.saturation": 0.5
```

You can also achieve no saturation (i.e., grayscale) by setting **Toggle Grayscale** to ON.

## Custom icon associations

You can customize the icon associations directly in the user settings.

### File associations

With the `*.[extension]` pattern you can define custom file icon associations. For example you could define an icon for `*.sample` and every file that ends with `.sample` will have the defined icon. However, not all files with the same file extension always have the same icon. For some specific file names there is a special icon. In order to overwrite all the specific file icons as well, two asterisks must be set instead of one, i.e. `**.[extension]`.

If there's no leading `*` it will be automatically configured as filename and not as file extension.

```json
"material-icon-theme.files.associations": {
    "*.ts": "typescript",
    "**.json": "json",
    "fileName.ts": "angular"
}
```

#### Custom SVG icons

It's possible to add custom icons by adding a path to an SVG file which is located relative to the extension's dist folder. However, the restriction applies that the directory in which the custom icons are located must be within the `extensions` directory of the `.vscode` folder in the user directory.

For example a custom SVG file called `sample.svg` can be placed in an `icons` folder inside of VS Code's `extensions` folder:

```
.vscode
 ┗ extensions
   ┗ icons
     ┗ sample.svg
```

In the settings.json (User Settings only!) the icon can be associated to a file name or file extension like this:

```json
"material-icon-theme.files.associations": {
    "fileName.ts": "../../icons/sample"
}
```

_Note: The custom file name must be configured in the settings without the file ending `.svg` as shown in the example above._

### Folder associations

The following configuration can customize the folder icons. It is also possible to overwrite existing associations and create nice combinations. For example you could change the folder theme to "classic" and define icons only for the folder names you like.

```json
"material-icon-theme.folders.associations": {
    "customFolderName": "src",
    "sample": "dist"
}
```

#### Custom SVG folder icons

Similar to the files, it is also possible to reference your own SVG icons for folder icons. Here it's important to provide two SVG files: one for the folder if it's closed and another one for the opened state. These two files - let's call them "folder-sample.svg" and "folder-sample-open.svg" - have to be placed into a directory which is relative to the extensions dist folder. This directory has to be somewhere inside of the `.vscode/extensions` folder.

In our example we place them into an `icons` folder inside of the `.vscode/extensions` folder:

```
.vscode
 ┗ extensions
   ┗ icons
     ┣ folder-sample.svg
     ┗ folder-sample-open.svg
```

In the settings.json (User Settings only!) the folder icons can be associated to a folder name (e.g. "src") like this:

```json
"material-icon-theme.folders.associations": {
    "src": "../../../../icons/folder-sample"
}
```

### Language associations

With the following configuration you can customize the language icons. It is also possible to overwrite existing associations.

```json
"material-icon-theme.languages.associations": {
    "languageId": "iconName",
    "json": "json"
}
```

You can see the available icon names in the overview above. See "[Known language identifiers](https://code.visualstudio.com/docs/languages/identifiers#_known-language-identifiers)" in the VS Code documentation for a list of permitted values for `languageId`.

## Commands

Press `Ctrl-Shift-P` to open the command palette and type `Material Icons`.

<img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/main/images/commandPalette.png" alt="commands">

<p></p>

| Command                           | Description                                                                         |
| --------------------------------- | ----------------------------------------------------------------------------------- |
| **Activate Icon Theme**           | Activate the icon theme.                                                            |
| **Change File Color**             | Change the color of the file icons.                                                 |
| **Change Folder Color**           | Change the color of the folder icons.                                               |
| **Change Folder Theme**           | Change the design of the folder icons.                                              |
| **Change Opacity**                | Change the opacity of the icons.                                                    |
| **Change Saturation**             | Change the saturation value of the icons.                                           |
| **Configure Icon Packs**          | Selects an icon pack that enables additional icons (e.g. for Angular, React, Ngrx). |
| **Toggle Explorer Arrows**        | Show or hide the arrows next to the folder icons.                                   |
| **Restore Default Configuration** | Reset to the default configuration.                                                 |
| **Toggle Grayscale**              | Set icon saturation to `0` (grayscale), or `1` (color).                             |

## Icon sources

- [Material Design Icons](https://materialdesignicons.com/)

## Contributors

<a href="https://github.com/PKief/vscode-material-icon-theme/graphs/contributors">
    <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/main/images/contributors.png" alt="Contributors">
</a>

**Would you like to contribute?**

Take a look at the [contribution guidelines](https://github.com/PKief/vscode-material-icon-theme/blob/main/CONTRIBUTING.md) and open a [new issue](https://github.com/PKief/vscode-material-icon-theme/issues) or [pull request](https://github.com/PKief/vscode-material-icon-theme/pulls) on GitHub.

## Related extensions

- [Material Icons for GitHub](https://github.com/Claudiohbsantos/github-material-icons-extension)
