<h1>How to contribute</h1>

<!-- TOC -->

- [Create issues](#create-issues)
- [Add new icons](#add-new-icons)
  - [Icon color](#icon-color)
  - [Free software to create/edit SVG icons](#free-software-to-createedit-svg-icons)
  - [Use icons from here](#use-icons-from-here)
- [Add translations](#add-translations)
- [Update API](#update-api)

<!-- /TOC -->

## Icon Requests

A new icon for a file name, file extension or folder name is needed? Please create an issue and follow the rules below:

- Describe if a file and/or folder icon is needed
- List the file names/ending and folder names
- Mention some graphic ideas (how can the icon look like)
- Show an example image of the icon or provide a link to the related website

## Add new icons

It is always welcome to add new icons to the extension. The following describes the things that need to be considered and the guidelines to follow:

### Icon creation

Your creativity is needed when creating icons. However, there are a few things you should take into account so that the icon can be included in the extension.

#### Checklist

1. [ ] Create icon as SVG ([how to](#create-icon-as-svg)) or use existing SVG ([how to](#use-existing-svg))
2. [ ] Icon color fits to Material Design ([how to](#material-design-colors))
3. [ ] SVG has some space around the icon ([how to](#spacing))
4. [ ] Provide separate icons for color themes if necessary ([how to](#icons-for-color-themes))
5. [ ] Unique assignment to file and folder names ([how to](#icon-assignments))
6. [ ] Folder icons need to have an opened and closed state (i.e. two SVGs)

### Integration

1. Create icon as SVG
2. Copy icon to `icons`-folder
3. Edit the icon configuration files under `src/icons` folder:
   - [fileIcons.ts](src/icons/fileIcons.ts)
   - [folderIcons.ts](src/icons/folderIcons.ts)
   - [languageIcons.ts](src/icons/languageIcons.ts)

## How tos

<h3 id="create-icon-as-svg">Free software to create/edit SVG icons</h3>

- [Inkscape](https://inkscape.org/en/) is a free, open source SVG editor
- There are tools available to convert PNG/JPG images to SVG - [Autotracer.org](https://autotracer.org) and [Vectorizer.io](https://vectorizer.io) are two examples.
- It's important to produce fully _vectorized_ graphic (don't include a base64 image string in the svg).

<h3 id="use-existing-svg">Use existing SVGs</h3>

Of course, there is also the possibility to add existing SVGs. Mostly, however, the color has to be adjusted or the styling has to be changed, so that the other points from the above checklist are also fulfilled.

<h4>Known sources</h4>

- [Material Design Icons](https://materialdesignicons.com/)

<h3 id="material-design-colors">Use Material Design colors</h3>

An important success factor of this icon extension is the fact that all colors fit together harmoniously. This is due to the fact that all icons exist only from colors of the [Material Design color palette](https://material.io/design/color/the-color-system.html#tools-for-picking-colors). This creates nice contrasts and the icons are easily recognizable.

Now it often happens that many programming languages already have icons with their own colors. To find the matching color from the Material Design color palette based on a known color, there is the [Material Color Converter](https://pkief.github.io/material-color-converter/). With its help any color can be converted into a Material Design color.

| ✅                                                                | ❌                                                                    |
| ----------------------------------------------------------------- | --------------------------------------------------------------------- |
| <img src="./images/how-tos/svg-with-spacing.png" width="200px" /> | <img src="./images/how-tos/svg-with-wrong-color.png" width="200px" /> |

<h3 id="material-design-colors">Icon spacing</h3>

All icons have a small distance to the edge. This way they don't seem so pressed together and have a little more air. It is not defined how much margin you have to leave them, because this is always a bit different. Just make sure that there is a space to the outside.

| ✅                                                                | ❌                                                                   |
| ----------------------------------------------------------------- | -------------------------------------------------------------------- |
| <img src="./images/how-tos/svg-with-spacing.png" width="200px" /> | <img src="./images/how-tos/svg-without-spacing.png" width="200px" /> |

<h3 id="icons-for-color-themes">Icons for color themes</h3>

VS Code can be customized so that the background color is either light or dark. This must also be considered for the icons, because a dark icon on a dark background does not provide the necessary contrast it needs to be recognizable.

Preferably, the icon has a color that looks good on both backgrounds. If this is ever not possible because it would otherwise no longer match the icon's branding, different icons can be provided for the respective color scheme.

This separation is possible by using the `light` attribute in the icon configuration:

```ts
{ name: 'name-of-the-icon', fileNames: ['sample.txt'], light: true },
```

If the `light` attribute is set to `true`, it is necessary to provide two icon files:

- name-of-the-icon.svg
- name-of-the-icon_light.svg

The icon with the ending '\_light' will be automatically chosen when VS Code is using a light background color. So the icon should then look a bit darker to have a good contrast on the lighter background.

| ✅                                                                    | ❌                                                                       |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| <img src="./images/how-tos/svg-with-light-color.png" width="200px" /> | <img src="./images/how-tos/svg-with-too-dark-color.png" width="200px" /> |

<h3 id="icon-assignments">Unique assignment to file and folder names</h3>

It is very important that icons are only assigned to the file and folder names that really apply to them. This means that you should be careful which files and folders you assign icons to. There are many people with different projects all over the world and not everyone expects that e.g. a file name will have a special framework based icon even though the framework is not used at all by this one user. Of course, it can never be avoided with 100% certainty that some icons are displayed even though they do not fit the context of the current VS Code workspace. Therefore, caution is still required here.

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
