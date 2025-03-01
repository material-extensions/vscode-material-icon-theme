<!-- markdownlint-disable heading-start-left first-line-h1 -->

<!-- markdownlint-capture -->
<!-- markdownlint-disable no-inline-html heading-increment -->
<br>

<div align="center">
  <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/main/logo.png" alt="logo" width="200">

  # Material Icon Theme <br><br>

  #### Get the Material Design icons as NPM Module

  [![Version](https://img.shields.io/visual-studio-marketplace/v/PKief.material-icon-theme?style=for-the-badge&colorA=252526&colorB=43A047&label=VERSION)](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)&nbsp;
  [![Rating](https://img.shields.io/visual-studio-marketplace/r/PKief.material-icon-theme?style=for-the-badge&colorA=252526&colorB=43A047&label=Rating)](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)&nbsp;
  [![Installs](https://img.shields.io/visual-studio-marketplace/i/PKief.material-icon-theme?style=for-the-badge&colorA=252526&colorB=43A047&label=Installs)](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)&nbsp;
  [![Downloads](https://img.shields.io/visual-studio-marketplace/d/PKief.material-icon-theme?style=for-the-badge&colorA=252526&colorB=43A047&label=Downloads)](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)
</div>
<!-- markdownlint-restore -->

<!-- markdownlint-capture -->
<!-- markdownlint-disable no-inline-html -->
## File icons

<details><summary>🏞️ <b>Show all available file icons</b></summary><br/><img src="https://raw.githubusercontent.com/material-extensions/vscode-material-icon-theme/main/images/fileIcons.png" alt="file icons"></details>

## Folder icons

<details><summary>🏞️ <b>Show all available folder icons</b></summary><br/><img src="https://raw.githubusercontent.com/material-extensions/vscode-material-icon-theme/main/images/folderIcons.png" alt="folder icons"></details>
<!-- markdownlint-restore -->

## Description

This npm module provides all Icons from the VS Code Material Icon Theme as npm module. The icons are available as SVG files and can be used in any web project.

## Installation

Install the npm module:

```bash
npm install material-icon-theme
```

## Usage

All the SVG files can be found in the "node_modules/material-icon-theme/icons" folder. To get to know the mapping between the file and folder names and the icons, the `generateManifest` has to be used.

```javascript
import { generateManifest } from 'material-icon-theme';
```

The `generateManifest` function returns a JSON object with the mapping between the file and folder names and the icons. The JSON object can be used to display the icons in a web project.

This manifest follows the official VS Code extension API guidelines. More information how this manifest is structured and how it can be used can be found [in the VS Code documentation](https://code.visualstudio.com/api/extension-guides/file-icon-theme#icon-definitions).

The type definition for the manifest can be found in the `material-icon-theme` module:

```typescript
import { Manifest } from 'material-icon-theme';
```

### Configure the icons

While generating the manifest, there can be some configuration options passed to the `generateManifest` function. The configuration options are the same as in the VS Code Material Icon Theme extension. The configuration options can be found in the `material-icon-theme` module:

```typescript
import { type ManifestConfig, type IconAssociations, type IconPackValue, generateManifest } from 'material-icon-theme';

const config: ManifestConfig = {
  activeIconPack: 'angular';
  hidesExplorerArrows: true;
  folders: {
    theme: 'classic';
    associations: {};
  };
  files: {
    associations: {};
  };
  languages: {
    associations: {};
  };
};

const manifest = generateManifest(config);
```

Not all configuration options have to be passed. The `generateManifest` function uses the default configuration options if they are not passed.

## Icon packs

The Material Icon Theme provides different icon packs. The icon pack can be changed by setting the `activeIconPack` in the configuration options. To get a list of all available icon packs, the `getIconPacks` function can be used:

```typescript
import { availableIconPacks, type IconPackValue } from 'material-icon-theme';

const iconPacks: Array<IconPackValue> = availableIconPacks;

console.log('Available icon packs:', iconPacks);
```
