<!-- markdownlint-disable -->

<p align="center">
  <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/main/logo.png" alt="logo" width="120">
</p>

<h1 align="center">Material Icon Theme</h1>

<p align="center"><em>Material Design icons for Visual Studio Code</em></p>

<p align="center">
  <a href="https://www.npmjs.com/package/material-icon-theme"><img src="https://img.shields.io/npm/v/material-icon-theme?style=for-the-badge&colorA=263238&colorB=43A047&label=VERSION" alt="NPM Version"></a>
  <a href="https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme"><img src="https://img.shields.io/badge/Rating-4.9%2F5-43A047?style=for-the-badge&colorA=263238&colorB=43A047" alt="Rating"></a>
  <a href="https://www.npmjs.com/package/material-icon-theme"><img src="https://img.shields.io/npm/dm/material-icon-theme?style=for-the-badge&colorA=263238&colorB=43A047&label=Downloads" alt="Monthly Downloads"></a>
</p>

<br />


<p align="center">Enjoying Material Icon Theme? Support the project by starring it or becoming a sponsor!</p>

<p align="center">
  <a href="https://github.com/sponsors/material-extensions"><img src="https://img.shields.io/badge/Sponsor-GitHub-blue?logo=github-sponsors&style=for-the-badge&colorA=263238&colorB=EC407A" alt="Sponsor on GitHub"></a>
  <a href="https://github.com/material-extensions/vscode-material-icon-theme"><img src="https://img.shields.io/github/stars/material-extensions/vscode-material-icon-theme?style=for-the-badge&label=Star%20on%20GitHub&colorA=263238&colorB=1976D2" alt="Star on GitHub"></a>
</p>

<br />

### File icons

<details><summary>🏞️ <b>Show all available file icons</b></summary><br/><img src="https://raw.githubusercontent.com/material-extensions/vscode-material-icon-theme/main/images/fileIcons.png" alt="file icons"></details>

### Folder icons

<details><summary>🏞️ <b>Show all available folder icons</b></summary><br/><img src="https://raw.githubusercontent.com/material-extensions/vscode-material-icon-theme/main/images/folderIcons.png" alt="folder icons"></details>

<br /><br />
<!-- markdownlint-restore -->

## Description

This npm module provides all icons from the [VS Code Material Icon Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme) as an npm package. The icons are available as SVG files and can be used in any web project.

## Installation

Install the npm module:

```bash
npm install material-icon-theme
```

## Usage

All SVG files can be found in the `node_modules/material-icon-theme/icons` folder. To get the mapping between file/folder names and icons, use the `generateManifest` function:

```javascript
import { generateManifest } from 'material-icon-theme';
```

The `generateManifest` function returns a JSON object with the mapping between file/folder names and icons. This object can be used to display icons in web projects.

This manifest follows the official VS Code extension API guidelines. More information about the manifest structure and usage can be found [in the VS Code documentation](https://code.visualstudio.com/api/extension-guides/file-icon-theme#icon-definitions).

The type definition for the manifest can be found in the `material-icon-theme` module:

```typescript
import { Manifest } from 'material-icon-theme';
```

### Configure the icons

When generating the manifest, you can pass configuration options to the `generateManifest` function. These options are the same as those used in the VS Code Material Icon Theme extension:

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

Not all configuration options are required. The `generateManifest` function uses default values for any options not provided.

## Icon packs

The Material Icon Theme provides different icon packs. The icon pack can be changed by setting the `activeIconPack` in the configuration options. To get a list of all available icon packs, the `getIconPacks` function can be used:

```typescript
import { availableIconPacks, type IconPackValue } from 'material-icon-theme';

const iconPacks: Array<IconPackValue> = availableIconPacks;

console.log('Available icon packs:', iconPacks);
```

## Icon sources

- [Material Design Icons](https://pictogrammers.com/library/mdi/)
- [Material Symbols](https://fonts.google.com/icons)

## Contributors

Thank you to all our amazing contributors!
Your support helps make Material Icon Theme better for everyone.

[![Contributors](https://raw.githubusercontent.com/material-extensions/vscode-material-icon-theme/main/images/contributors.png)](https://github.com/material-extensions/vscode-material-icon-theme/graphs/contributors)

## Contributing

We welcome contributions of all kinds! Whether you want to add new icons, improve documentation, fix bugs, or help with translations, your input is appreciated.

**How to get involved:**

- 📖 **Read the [Contribution Guidelines](https://github.com/material-extensions/vscode-material-icon-theme/blob/main/CONTRIBUTING.md)**
  Learn about our coding standards, icon design tips, and workflow.

- 🐛 **Report Issues**
  Found a bug or have an icon request? [Open an issue](https://github.com/material-extensions/vscode-material-icon-theme/issues).

- 💡 **Submit Pull Requests**
  Ready to contribute code or icons? [Create a pull request](https://github.com/material-extensions/vscode-material-icon-theme/pulls).

- 🌍 **Help with Translations**
  Improve or add translations by editing the files in `src/i18n` and `package.nls.*.json`.

<!-- markdownlint-disable -->
<br />


---

<p align="center">
  <a href="https://github.com/sponsors/material-extensions"><img src="https://img.shields.io/badge/Sponsor-GitHub-blue?logo=github-sponsors&style=for-the-badge&colorA=263238&colorB=EC407A" alt="Sponsor on GitHub"></a>
  <a href="https://github.com/material-extensions/vscode-material-icon-theme"><img src="https://img.shields.io/github/stars/material-extensions/vscode-material-icon-theme?style=for-the-badge&label=Star%20on%20GitHub&colorA=263238&colorB=1976D2" alt="Star on GitHub"></a>
</p>
<p align="center">
  <em>Enjoying Material Icon Theme? Support the project by starring it or becoming a sponsor!</em>
</p>

<!-- markdownlint-restore -->
