<!-- markdownlint-disable heading-start-left first-line-h1 -->

<!-- markdownlint-capture -->
<!-- markdownlint-disable no-inline-html heading-increment -->
<br>

<div align="center">
  <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/main/logo.png" alt="logo" width="200">

  # Material Icon Theme <br><br>

  #### Get the Material Design icons into your VS Code

  [![Version](https://img.shields.io/visual-studio-marketplace/v/PKief.material-icon-theme?style=for-the-badge&colorA=252526&colorB=43A047&label=VERSION)](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)&nbsp;
  [![Rating](https://img.shields.io/visual-studio-marketplace/r/PKief.material-icon-theme?style=for-the-badge&colorA=252526&colorB=43A047&label=Rating)](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)&nbsp;
  [![Installs](https://img.shields.io/visual-studio-marketplace/i/PKief.material-icon-theme?style=for-the-badge&colorA=252526&colorB=43A047&label=Installs)](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)&nbsp;
  [![Downloads](https://img.shields.io/visual-studio-marketplace/d/PKief.material-icon-theme?style=for-the-badge&colorA=252526&colorB=43A047&label=Downloads)](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)
</div>
<!-- markdownlint-restore -->

### File icons

![file icons](https://raw.githubusercontent.com/material-extensions/vscode-material-icon-theme/main/images/fileIcons.png)

### Folder icons

![folder icons](https://raw.githubusercontent.com/material-extensions/vscode-material-icon-theme/main/images/folderIcons.png)

#### Customize file & folder color

You can change the color of the default file and folder icons using the command palette:

![custom folder colors](https://raw.githubusercontent.com/material-extensions/vscode-material-icon-theme/main/images/set-folder-color.gif)

or via user settings:

```json
"material-icon-theme.folders.color": "#ef5350",
"material-icon-theme.files.color": "#42a5f5",
```

#### Folder themes

You can change the design of the folder icons using the command palette:

![folder themes](https://raw.githubusercontent.com/material-extensions/vscode-material-icon-theme/main/images/set-folder-theme.gif)

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

```text
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

#### Custom file icon clones

It's also possible to clone existing file icons and change their colors to create new icons that can be associated with file names or file extensions. The following example shows how to clone the `rust` icon:

```json
"material-icon-theme.files.customClones": [
  {
    "name": "rust-mod",
    "base": "rust",
    "color": "blue-400",
    "fileNames": ["mod.rs"]
  },
  {
    "name": "rust-lib",
    "base": "rust",
    "color": "light-green-300",
    "lightColor": "light-green-600",
    "fileNames": ["lib.rs"]
  }
]
```

This will create two new icons called `rust-mod` and `rust-lib` that are associated with the file names `mod.rs` and `lib.rs` respectively. The `base` property defines the icon that should be cloned (in this case the `rust` icon). The `color` property defines the color of the new icon. The `lightColor` property is optional and defines the color of the icon when Visual Studio Code is running with a light color theme. The `fileNames` property defines the file names that should be associated with the new icon. There's also a `fileExtensions` property, which can be used to associate the new icon with file extensions (`"fileExtensions": ["ext", "ext2"]`).

![cloned file icons](https://raw.githubusercontent.com/material-extensions/vscode-material-icon-theme/main/images/how-tos/cloned-file-icons-example.png)

- Although you can use any `#RRGGBB` color for the `color` and `lightColor` properties, if you want to stick with colors from the material palette, you can check the full list of allowed aliases [here](https://github.com/material-extensions/vscode-material-icon-theme/blob/main/src/core/generator/clones/utils/color/materialPalette.ts).
- You can check the full list of available icons to be used as the `base` [here](https://github.com/material-extensions/vscode-material-icon-theme/blob/main/src/core/icons/fileIcons.ts).

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

```text
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

#### Custom folder icon clones

It's also possible to clone existing folder icons and change their colors to create new icons that can be associated with folder names. The following example shows how to clone the `admin` folder icon:

```json
"material-icon-theme.folders.customClones": [
  {
    "name": "users-admin",
    "base": "admin",
    "color": "light-green-500",
    "lightColor": "light-green-700",
    "folderNames": ["users"],
    "rootFolderNames": ["users"]
  },
  {
    "name": "roles-admin",
    "base": "admin",
    "color": "purple-400",
    "folderNames": ["roles"],
    "rootFolderNames": ["users"]
  }
]
```

This will create two new icons called `users-admin` and `roles-admin` that are associated with the folder names `users` and `roles` respectively. The `base` property defines the icon that should be cloned (in this case the `admin` folder icon). The `color` property defines the color of the new icon. The `lightColor` property is optional and defines the color of the icon when Visual Studio Code is running with a light color theme. The `folderNames` property defines the folder names that should be associated with the new icon. The `rootFolderNames` property defines the root folder names that should be associated with the new icon.

![cloned folder icons](https://raw.githubusercontent.com/material-extensions/vscode-material-icon-theme/main/images/how-tos/cloned-folder-icons-example.png)

- Although you can use any `#RRGGBB` color for the `color` and `lightColor` properties, if you want to stick with colors from the material palette, you can check the full list of allowed aliases [here](https://github.com/material-extensions/vscode-material-icon-theme/blob/main/src/core/generator/clones/utils/color/materialPalette.ts).
- You can check the full list of available icon to be used as the `base` [here](https://github.com/material-extensions/vscode-material-icon-theme/blob/main/src/core/icons/folderIcons.ts).

### Language associations

With the following configuration you can customize the language icons. It is also possible to overwrite existing associations.

```json
"material-icon-theme.languages.associations": {
  "languageId": "iconName",
  "json": "json"
}
```

You can see the available icon names in the overview above. See "[Known language identifiers](https://code.visualstudio.com/docs/languages/identifiers#_known-language-identifiers)" in the VS Code documentation for a list of permitted values for `languageId`.

#### Custom language icon clones

It's also possible to clone existing language icons and change their colors to create new icons that can be associated with language ids. The following example shows how to clone the `autohotkey` language icon:

```json
"material-icon-theme.languages.customClones": [
  {
    "name": "ahk-clone",
    "base": "autohotkey",
    "color": "blue-400",
    "lightColor": "grey-600",
    "ids": ["ahk2"]
  }
]
```

This will create a new icon called `ahk-clone` which is associated with the language id `ahk2` respectively. The `base` property defines the icon that should be cloned (in this case the `autohotkey` language icon). The `color` property defines the color of the new icon. The `lightColor` property is optional and defines the color of the icon when Visual Studio Code is running with a light color theme. The `ids` property defines the language ids that should be associated with the new icon.

![cloned language icons](https://raw.githubusercontent.com/material-extensions/vscode-material-icon-theme/main/images/how-tos/cloned-language-icons-example.png)

- Although you can use any `#RRGGBB` color for the `color` and `lightColor` properties, if you want to stick with colors from the material palette, you can check the full list of allowed aliases [here](https://github.com/material-extensions/vscode-material-icon-theme/blob/main/src/core/generator/clones/utils/color/materialPalette.ts).
- You can check the full list of available icons to be used as the `base` [here](https://github.com/material-extensions/vscode-material-icon-theme/blob/main/src/core/icons/fileIcons.ts).

## Commands

Press `Ctrl-Shift-P` to open the command palette and type `Material Icons`.

![commands](https://raw.githubusercontent.com/material-extensions/vscode-material-icon-theme/main/images/commandPalette.png)

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

- [Material Design Icons](https://pictogrammers.com/library/mdi/)
- [Material Symbols](https://fonts.google.com/icons)

## Contributors

[![Contributors](https://raw.githubusercontent.com/material-extensions/vscode-material-icon-theme/main/images/contributors.png)](https://github.com/material-extensions/vscode-material-icon-theme/graphs/contributors)

**Would you like to contribute?**

Take a look at the [contribution guidelines](https://github.com/material-extensions/vscode-material-icon-theme/blob/main/CONTRIBUTING.md) and open a [new issue](https://github.com/material-extensions/vscode-material-icon-theme/issues) or [pull request](https://github.com/material-extensions/vscode-material-icon-theme/pulls) on GitHub.

## Related extensions

- [Material Icons for GitHub](https://github.com/material-extensions/material-icons-browser-extension)
- [Material Product Icons](https://github.com/material-extensions/vscode-material-product-icons)
