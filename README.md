# Material Icon Theme

[![Version](https://vsmarketplacebadge.apphb.com/version-short/pkief.material-icon-theme.svg)](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)
[![Rating](https://vsmarketplacebadge.apphb.com/rating-short/pkief.material-icon-theme.svg)](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)
[![Installs](https://vsmarketplacebadge.apphb.com/installs-short/PKief.material-icon-theme.svg)](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)
[![Downloads](https://vsmarketplacebadge.apphb.com/downloads-short/PKief.material-icon-theme.svg)](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)
[![Build Status](https://travis-ci.com/PKief/vscode-material-icon-theme.svg?branch=master)](https://travis-ci.com/PKief/vscode-material-icon-theme)

The Material Icon Theme provides lots of icons based on Material Design for Visual Studio Code.

### File icons

<img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/images/fileIcons.png" alt="file icons" width="100%">

### Folder icons

<img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/images/folderIcons.png" alt="folder icons" width="100%">

#### Customize folder color

You can change the color of the default folder icon using the command palette:

<img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/images/set-folder-color.gif" alt="custom folder colors" width="80%">

or via user settings:

```json
"material-icon-theme.folders.color": "#ef5350",
```

#### Folder themes

You can change the design of the folder icons using the command palette:

<img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/images/set-folder-theme.gif" alt="folder themes" width="80%">

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

## Custom icon associations

You can customize the icon associations directly in the user settings.

### File associations

With the `*.[extension]` pattern you can define custom file icon associations. For example you could define an icon for `*.sample` and every file that ends with `.sample` will have the defined icon.  Use `**.[extension]` with two asterisks to apply the file association also for the filenames ending with that file extension. 

If there's no leading `*` it will be automatically configured as filename and not as file extension.

```json
"material-icon-theme.files.associations": {
    "*.ts": "typescript",
    "fileName.ts": "angular"
}
```

### Folder associations

The following configuration can customize the folder icons. It is also possible to overwrite existing associations and create nice combinations. For example you could change the folder theme to "classic" and define icons only for the folder names you like.

```json
"material-icon-theme.folders.associations": {
    "customFolderName": "src",
    "sample": "dist"
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

Available language ids: 

https://code.visualstudio.com/docs/languages/identifiers#_known-language-identifiers

You can see the available icon names in the overview above.

## One-click activation

After installation or update you can click on the 'Activate'-button to activate the icon theme, if you haven't already. The icons will be visible immediately.

<img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/images/oneclickactivation.png" alt="activation" width="60%">

## Commands

Press `Ctrl-Shift-P` to open the command palette and type `Material Icons`.

<img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/images/commandPalette.png" alt="commands" width="80%">

| Command                             | Description                                                                             |
| ----------------------------------- | --------------------------------------------------------------------------------------- |
| **Activate Icon Theme**             | Activate the icon theme.                                                                |
| **Change Folder Color**             | Change the color of the folder icons.                                                   |
| **Change Folder Theme**             | Change the design of the folder icons.                                                  |
| **Change Opacity**                  | Change the opacity of the icons.                                                        |
| **Change Saturation**               | Change the saturation value of the icons.                                               |
| **Configure Icon Packs**            | Select an icon pack that enables additional icons (e.g. for Angular, React, Ngrx).      |
| **Hide Folder Arrows**              | Hides the arrows next to the folder icons.                                              |
| **Restore Default Configuration**   | Reset the default configurations of the icon theme.                                     |
| **Toggle Grayscale**                | Sets the saturation of the icons to zero, so that they are grayscale.                   |

## Icon sources

* [Material Design Icons](https://materialdesignicons.com/)
* official icons

## Contributors

[//]: #contributors (start)
<a href="https://github.com/PKief" title="PKief"><img src="https://avatars2.githubusercontent.com/u/12248527?v=4" width="40px" height="40px" alt="PKief"/></a>&nbsp;<a href="https://github.com/AdrieanKhisbe" title="AdrieanKhisbe"><img src="https://avatars1.githubusercontent.com/u/2601132?v=4" width="40px" height="40px" alt="AdrieanKhisbe"/></a>&nbsp;<a href="https://github.com/dudeofawesome" title="dudeofawesome"><img src="https://avatars0.githubusercontent.com/u/1683595?v=4" width="40px" height="40px" alt="dudeofawesome"/></a>&nbsp;<a href="https://github.com/wopian" title="wopian"><img src="https://avatars0.githubusercontent.com/u/3440094?v=4" width="40px" height="40px" alt="wopian"/></a>&nbsp;<a href="https://github.com/Bakosa666" title="Bakosa666"><img src="https://avatars3.githubusercontent.com/u/38684615?v=4" width="40px" height="40px" alt="Bakosa666"/></a>&nbsp;<a href="https://github.com/LukasPolak" title="LukasPolak"><img src="https://avatars3.githubusercontent.com/u/17145302?v=4" width="40px" height="40px" alt="LukasPolak"/></a>&nbsp;<a href="https://github.com/lffg" title="lffg"><img src="https://avatars1.githubusercontent.com/u/23662020?v=4" width="40px" height="40px" alt="lffg"/></a>&nbsp;<a href="https://github.com/chrsmutti" title="chrsmutti"><img src="https://avatars1.githubusercontent.com/u/34144667?v=4" width="40px" height="40px" alt="chrsmutti"/></a>&nbsp;<a href="https://github.com/diego3g" title="diego3g"><img src="https://avatars2.githubusercontent.com/u/2254731?v=4" width="40px" height="40px" alt="diego3g"/></a>&nbsp;<a href="https://github.com/felipe-fg" title="felipe-fg"><img src="https://avatars2.githubusercontent.com/u/32036831?v=4" width="40px" height="40px" alt="felipe-fg"/></a>&nbsp;<a href="https://github.com/omento" title="omento"><img src="https://avatars3.githubusercontent.com/u/14795448?v=4" width="40px" height="40px" alt="omento"/></a>&nbsp;<a href="https://github.com/jBugman" title="jBugman"><img src="https://avatars1.githubusercontent.com/u/891785?v=4" width="40px" height="40px" alt="jBugman"/></a>&nbsp;<a href="https://github.com/iFaxity" title="iFaxity"><img src="https://avatars3.githubusercontent.com/u/9090703?v=4" width="40px" height="40px" alt="iFaxity"/></a>&nbsp;<a href="https://github.com/melMass" title="melMass"><img src="https://avatars3.githubusercontent.com/u/7041726?v=4" width="40px" height="40px" alt="melMass"/></a>&nbsp;<a href="https://github.com/Mrgove10" title="Mrgove10"><img src="https://avatars0.githubusercontent.com/u/25491408?v=4" width="40px" height="40px" alt="Mrgove10"/></a>&nbsp;<a href="https://github.com/cezarsa" title="cezarsa"><img src="https://avatars1.githubusercontent.com/u/11041?v=4" width="40px" height="40px" alt="cezarsa"/></a>&nbsp;<a href="https://github.com/KristophUK" title="KristophUK"><img src="https://avatars2.githubusercontent.com/u/6653181?v=4" width="40px" height="40px" alt="KristophUK"/></a>&nbsp;<a href="https://github.com/jediyozh" title="jediyozh"><img src="https://avatars2.githubusercontent.com/u/31045769?v=4" width="40px" height="40px" alt="jediyozh"/></a>&nbsp;<a href="https://github.com/fahmiirsyadk" title="fahmiirsyadk"><img src="https://avatars0.githubusercontent.com/u/17546686?v=4" width="40px" height="40px" alt="fahmiirsyadk"/></a>&nbsp;<a href="https://github.com/iDaN5x" title="iDaN5x"><img src="https://avatars3.githubusercontent.com/u/3427523?v=4" width="40px" height="40px" alt="iDaN5x"/></a>&nbsp;<a href="https://github.com/jtiala" title="jtiala"><img src="https://avatars2.githubusercontent.com/u/1576782?v=4" width="40px" height="40px" alt="jtiala"/></a>&nbsp;<a href="https://github.com/mvochoa" title="mvochoa"><img src="https://avatars2.githubusercontent.com/u/7919838?v=4" width="40px" height="40px" alt="mvochoa"/></a>&nbsp;<a href="https://github.com/martin-sweeny" title="martin-sweeny"><img src="https://avatars1.githubusercontent.com/u/3329959?v=4" width="40px" height="40px" alt="martin-sweeny"/></a>&nbsp;<a href="https://github.com/teototaro" title="teototaro"><img src="https://avatars3.githubusercontent.com/u/6552833?v=4" width="40px" height="40px" alt="teototaro"/></a>&nbsp;<a href="https://github.com/niksudan" title="niksudan"><img src="https://avatars1.githubusercontent.com/u/6004491?v=4" width="40px" height="40px" alt="niksudan"/></a>&nbsp;<a href="https://github.com/yuric18" title="yuric18"><img src="https://avatars3.githubusercontent.com/u/18277197?v=4" width="40px" height="40px" alt="yuric18"/></a>&nbsp;<a href="https://github.com/denisbalyko" title="denisbalyko"><img src="https://avatars0.githubusercontent.com/u/638190?v=4" width="40px" height="40px" alt="denisbalyko"/></a>&nbsp;<a href="https://github.com/dotiful" title="dotiful"><img src="https://avatars1.githubusercontent.com/u/25269527?v=4" width="40px" height="40px" alt="dotiful"/></a>&nbsp;<a href="https://github.com/ycrepeau" title="ycrepeau"><img src="https://avatars2.githubusercontent.com/u/6821466?v=4" width="40px" height="40px" alt="ycrepeau"/></a>&nbsp;<a href="https://github.com/aashutoshrathi" title="aashutoshrathi"><img src="https://avatars2.githubusercontent.com/u/21199234?v=4" width="40px" height="40px" alt="aashutoshrathi"/></a>&nbsp;<a href="https://github.com/dabrowski-adam" title="dabrowski-adam"><img src="https://avatars0.githubusercontent.com/u/6993966?v=4" width="40px" height="40px" alt="dabrowski-adam"/></a>&nbsp;<a href="https://github.com/alefesouza" title="alefesouza"><img src="https://avatars2.githubusercontent.com/u/1693223?v=4" width="40px" height="40px" alt="alefesouza"/></a>&nbsp;<a href="https://github.com/baraalex" title="baraalex"><img src="https://avatars2.githubusercontent.com/u/6618800?v=4" width="40px" height="40px" alt="baraalex"/></a>&nbsp;<a href="https://github.com/AlexaraWu" title="AlexaraWu"><img src="https://avatars0.githubusercontent.com/u/15205102?v=4" width="40px" height="40px" alt="AlexaraWu"/></a>&nbsp;<a href="https://github.com/tothandras" title="tothandras"><img src="https://avatars0.githubusercontent.com/u/4157749?v=4" width="40px" height="40px" alt="tothandras"/></a>&nbsp;<a href="https://github.com/arpadbarta" title="arpadbarta"><img src="https://avatars3.githubusercontent.com/u/6329203?v=4" width="40px" height="40px" alt="arpadbarta"/></a>&nbsp;<a href="https://github.com/frederick036" title="frederick036"><img src="https://avatars2.githubusercontent.com/u/1129770?v=4" width="40px" height="40px" alt="frederick036"/></a>&nbsp;<a href="https://github.com/bernardop" title="bernardop"><img src="https://avatars1.githubusercontent.com/u/28455?v=4" width="40px" height="40px" alt="bernardop"/></a>&nbsp;<a href="https://github.com/bcanseco" title="bcanseco"><img src="https://avatars3.githubusercontent.com/u/18430599?v=4" width="40px" height="40px" alt="bcanseco"/></a>&nbsp;<a href="https://github.com/bradlc" title="bradlc"><img src="https://avatars0.githubusercontent.com/u/2615508?v=4" width="40px" height="40px" alt="bradlc"/></a>&nbsp;<a href="https://github.com/brennongs" title="brennongs"><img src="https://avatars3.githubusercontent.com/u/24623425?v=4" width="40px" height="40px" alt="brennongs"/></a>&nbsp;<a href="https://github.com/Logerfo" title="Logerfo"><img src="https://avatars2.githubusercontent.com/u/19306384?v=4" width="40px" height="40px" alt="Logerfo"/></a>&nbsp;<a href="https://github.com/TheCloudSaver" title="TheCloudSaver"><img src="https://avatars3.githubusercontent.com/u/39653530?v=4" width="40px" height="40px" alt="TheCloudSaver"/></a>&nbsp;<a href="https://github.com/danielbankhead" title="danielbankhead"><img src="https://avatars3.githubusercontent.com/u/10792787?v=4" width="40px" height="40px" alt="danielbankhead"/></a>&nbsp;<a href="https://github.com/oodavid" title="oodavid"><img src="https://avatars3.githubusercontent.com/u/46879?v=4" width="40px" height="40px" alt="oodavid"/></a>&nbsp;<a href="https://github.com/erikphansen" title="erikphansen"><img src="https://avatars1.githubusercontent.com/u/20728956?v=4" width="40px" height="40px" alt="erikphansen"/></a>&nbsp;<a href="https://github.com/EtienneBourque" title="EtienneBourque"><img src="https://avatars1.githubusercontent.com/u/50217898?v=4" width="40px" height="40px" alt="EtienneBourque"/></a>&nbsp;<a href="https://github.com/etiennetalbot" title="etiennetalbot"><img src="https://avatars3.githubusercontent.com/u/2954511?v=4" width="40px" height="40px" alt="etiennetalbot"/></a>&nbsp;<a href="https://github.com/ExE-Boss" title="ExE-Boss"><img src="https://avatars0.githubusercontent.com/u/3889017?v=4" width="40px" height="40px" alt="ExE-Boss"/></a>&nbsp;<a href="https://github.com/nibushibu" title="nibushibu"><img src="https://avatars0.githubusercontent.com/u/399949?v=4" width="40px" height="40px" alt="nibushibu"/></a>&nbsp;<a href="https://github.com/justalemon" title="justalemon"><img src="https://avatars1.githubusercontent.com/u/11861253?v=4" width="40px" height="40px" alt="justalemon"/></a>&nbsp;<a href="https://github.com/JakubKoralewski" title="JakubKoralewski"><img src="https://avatars0.githubusercontent.com/u/43069023?v=4" width="40px" height="40px" alt="JakubKoralewski"/></a>&nbsp;<a href="https://github.com/jerriclynsjohn" title="jerriclynsjohn"><img src="https://avatars3.githubusercontent.com/u/3236669?v=4" width="40px" height="40px" alt="jerriclynsjohn"/></a>&nbsp;<a href="https://github.com/wersimmon" title="wersimmon"><img src="https://avatars1.githubusercontent.com/u/185822?v=4" width="40px" height="40px" alt="wersimmon"/></a>&nbsp;<a href="https://github.com/JotaroS" title="JotaroS"><img src="https://avatars2.githubusercontent.com/u/9479730?v=4" width="40px" height="40px" alt="JotaroS"/></a>&nbsp;<a href="https://github.com/RunningCoderLee" title="RunningCoderLee"><img src="https://avatars3.githubusercontent.com/u/13218863?v=4" width="40px" height="40px" alt="RunningCoderLee"/></a>&nbsp;<a href="https://github.com/Krzysztof-Cieslak" title="Krzysztof-Cieslak"><img src="https://avatars1.githubusercontent.com/u/5427083?v=4" width="40px" height="40px" alt="Krzysztof-Cieslak"/></a>&nbsp;<a href="https://github.com/kkemple" title="kkemple"><img src="https://avatars3.githubusercontent.com/u/3629876?v=4" width="40px" height="40px" alt="kkemple"/></a>&nbsp;<a href="https://github.com/leohxj" title="leohxj"><img src="https://avatars3.githubusercontent.com/u/1506900?v=4" width="40px" height="40px" alt="leohxj"/></a>&nbsp;<a href="https://github.com/mjbvz" title="mjbvz"><img src="https://avatars2.githubusercontent.com/u/12821956?v=4" width="40px" height="40px" alt="mjbvz"/></a>&nbsp;<a href="https://github.com/MeirionHughes" title="MeirionHughes"><img src="https://avatars2.githubusercontent.com/u/3584509?v=4" width="40px" height="40px" alt="MeirionHughes"/></a>&nbsp;<a href="https://github.com/melkarm" title="melkarm"><img src="https://avatars2.githubusercontent.com/u/32730892?v=4" width="40px" height="40px" alt="melkarm"/></a>&nbsp;<a href="https://github.com/epitaphmike" title="epitaphmike"><img src="https://avatars1.githubusercontent.com/u/677832?v=4" width="40px" height="40px" alt="epitaphmike"/></a>&nbsp;<a href="https://github.com/olehreznichenko" title="olehreznichenko"><img src="https://avatars0.githubusercontent.com/u/11960153?v=4" width="40px" height="40px" alt="olehreznichenko"/></a>&nbsp;<a href="https://github.com/TheDutchCoder" title="TheDutchCoder"><img src="https://avatars2.githubusercontent.com/u/1668207?v=4" width="40px" height="40px" alt="TheDutchCoder"/></a>&nbsp;<a href="https://github.com/RenanMsV" title="RenanMsV"><img src="https://avatars3.githubusercontent.com/u/21311691?v=4" width="40px" height="40px" alt="RenanMsV"/></a>&nbsp;<a href="https://github.com/rhysforyou" title="rhysforyou"><img src="https://avatars0.githubusercontent.com/u/320910?v=4" width="40px" height="40px" alt="rhysforyou"/></a>&nbsp;<a href="https://github.com/rfgamaral" title="rfgamaral"><img src="https://avatars1.githubusercontent.com/u/96476?v=4" width="40px" height="40px" alt="rfgamaral"/></a>&nbsp;<a href="https://github.com/kukiric" title="kukiric"><img src="https://avatars2.githubusercontent.com/u/6194377?v=4" width="40px" height="40px" alt="kukiric"/></a>&nbsp;<a href="https://github.com/richardmillen94" title="richardmillen94"><img src="https://avatars2.githubusercontent.com/u/22445885?v=4" width="40px" height="40px" alt="richardmillen94"/></a>&nbsp;<a href="https://github.com/richiksc" title="richiksc"><img src="https://avatars1.githubusercontent.com/u/8939680?v=4" width="40px" height="40px" alt="richiksc"/></a>&nbsp;<a href="https://github.com/Faultless" title="Faultless"><img src="https://avatars1.githubusercontent.com/u/7265811?v=4" width="40px" height="40px" alt="Faultless"/></a>&nbsp;<a href="https://github.com/sbekrin" title="sbekrin"><img src="https://avatars0.githubusercontent.com/u/9248479?v=4" width="40px" height="40px" alt="sbekrin"/></a>&nbsp;<a href="https://github.com/leggsimon" title="leggsimon"><img src="https://avatars2.githubusercontent.com/u/11544418?v=4" width="40px" height="40px" alt="leggsimon"/></a>&nbsp;<a href="https://github.com/ffrinds" title="ffrinds"><img src="https://avatars3.githubusercontent.com/u/26288489?v=4" width="40px" height="40px" alt="ffrinds"/></a>&nbsp;<a href="https://github.com/ThomasGeek" title="ThomasGeek"><img src="https://avatars1.githubusercontent.com/u/10091122?v=4" width="40px" height="40px" alt="ThomasGeek"/></a>&nbsp;<a href="https://github.com/timsneath" title="timsneath"><img src="https://avatars3.githubusercontent.com/u/2319867?v=4" width="40px" height="40px" alt="timsneath"/></a>&nbsp;<a href="https://github.com/titouancreach" title="titouancreach"><img src="https://avatars1.githubusercontent.com/u/3995719?v=4" width="40px" height="40px" alt="titouancreach"/></a>&nbsp;<a href="https://github.com/Happycoil" title="Happycoil"><img src="https://avatars2.githubusercontent.com/u/12999248?v=4" width="40px" height="40px" alt="Happycoil"/></a>&nbsp;<a href="https://github.com/william-lohan" title="william-lohan"><img src="https://avatars3.githubusercontent.com/u/8146733?v=4" width="40px" height="40px" alt="william-lohan"/></a>&nbsp;<a href="https://github.com/dmay" title="dmay"><img src="https://avatars0.githubusercontent.com/u/1068398?v=4" width="40px" height="40px" alt="dmay"/></a>&nbsp;<a href="https://github.com/eyal0803" title="eyal0803"><img src="https://avatars1.githubusercontent.com/u/5116133?v=4" width="40px" height="40px" alt="eyal0803"/></a>&nbsp;<a href="https://github.com/mintapp" title="mintapp"><img src="https://avatars0.githubusercontent.com/u/37894041?v=4" width="40px" height="40px" alt="mintapp"/></a>&nbsp;<a href="https://github.com/natemoo-re" title="natemoo-re"><img src="https://avatars0.githubusercontent.com/u/7118177?v=4" width="40px" height="40px" alt="natemoo-re"/></a>&nbsp;<a href="https://github.com/suazithustra" title="suazithustra"><img src="https://avatars3.githubusercontent.com/u/33040041?v=4" width="40px" height="40px" alt="suazithustra"/></a>&nbsp;<a href="https://github.com/khrystuk" title="khrystuk"><img src="https://avatars2.githubusercontent.com/u/22624868?v=4" width="40px" height="40px" alt="khrystuk"/></a>

[//]: #contributors (end)

**Would you like to contribute?**

Take a look at the [contribution guidelines](https://github.com/PKief/vscode-material-icon-theme/blob/master/CONTRIBUTING.md) and open a [new issue](https://github.com/PKief/vscode-material-icon-theme/issues) or [pull request](https://github.com/PKief/vscode-material-icon-theme/pulls) on GitHub.
