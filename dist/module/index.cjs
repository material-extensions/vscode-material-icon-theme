"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/module/index.ts
var module_exports = {};
__export(module_exports, {
  availableIconPacks: () => availableIconPacks,
  generateManifest: () => generateManifest
});
module.exports = __toCommonJS(module_exports);

// src/core/helpers/object.ts
var merge = (...objects) => {
  return objects.reduce((acc, obj) => {
    Object.keys(obj != null ? obj : {}).forEach((key) => {
      const accValue = acc[key];
      const objValue = obj == null ? void 0 : obj[key];
      if ((accValue === void 0 || accValue === null) && objValue !== void 0 && objValue !== null) {
        acc[key] = objValue;
      } else if ((objValue === void 0 || objValue === null) && accValue !== void 0 && accValue !== null) {
      } else if (Array.isArray(objValue) && Array.isArray(accValue)) {
        acc[key] = [
          ...new Set(accValue.concat(objValue))
        ];
      } else if (typeof objValue === "object" && objValue !== null && typeof accValue === "object" && accValue !== null) {
        acc[key] = merge(
          accValue,
          objValue
        );
      } else {
        acc[key] = objValue;
      }
    });
    return acc;
  }, {});
};

// src/core/generator/config/defaultConfig.ts
var getDefaultConfig = () => ({
  folders: {
    theme: "specific",
    color: "#90a4ae",
    associations: {},
    customClones: []
  },
  activeIconPack: "angular",
  hidesExplorerArrows: false,
  opacity: 1,
  saturation: 1,
  files: {
    color: "#90a4ae",
    associations: {},
    customClones: []
  },
  languages: { associations: {} },
  enableLogging: false,
  logLevel: "info"
});
var padWithDefaultConfig = (config) => {
  const withDefaultConfig = merge(getDefaultConfig(), config != null ? config : {});
  return withDefaultConfig;
};

// src/core/logging/logger.ts
var import_node_events = require("events");

// src/core/generator/constants.ts
var extensionName = "material-icon-theme";
var logEventKey = `${extensionName}-log-event`;
var iconFolderPath = "./../icons/";
var openedFolder = "-open";
var lightColorFileEnding = "_light";
var highContrastColorFileEnding = "_highContrast";
var cloneIconExtension = ".clone.svg";
var wildcardPattern = new RegExp(/^\*{1,2}\./);

// src/core/logging/logger.ts
var loggerEmitter = new import_node_events.EventEmitter({
  captureRejections: true
});
var createLogger = () => {
  const emitLogEvent = (level, message) => {
    const timestamp = (/* @__PURE__ */ new Date()).toISOString();
    const logEvent = {
      level,
      message: `[${level.toUpperCase()}] ${timestamp} - ${message}`
    };
    loggerEmitter.emit(logEventKey, logEvent);
  };
  return {
    info: (message) => emitLogEvent("info", message),
    error: (message) => emitLogEvent("error", message),
    debug: (message) => emitLogEvent("debug", message)
  };
};
var logger = createLogger();

// src/core/helpers/configHash.ts
var getFileConfigHash = (config) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
  try {
    const defaults = getDefaultConfig();
    let fileConfigString = "";
    if (config.saturation !== defaults.saturation || config.opacity !== defaults.opacity || ((_a = config.folders) == null ? void 0 : _a.color) !== defaults.folders.color || ((_b = config.files) == null ? void 0 : _b.color) !== defaults.files.color || ((_e = (_d = (_c = config.files) == null ? void 0 : _c.customClones) == null ? void 0 : _d.length) != null ? _e : 0) > 0 || ((_h = (_g = (_f = config.folders) == null ? void 0 : _f.customClones) == null ? void 0 : _g.length) != null ? _h : 0) > 0) {
      fileConfigString += `~${getHash(
        JSON.stringify({
          saturation: config.saturation,
          opacity: config.opacity,
          foldersColor: (_i = config.folders) == null ? void 0 : _i.color,
          filesColor: (_j = config.files) == null ? void 0 : _j.color,
          fileClones: (_k = config.files) == null ? void 0 : _k.customClones,
          folderClones: (_l = config.folders) == null ? void 0 : _l.customClones
        })
      )}`;
    }
    return fileConfigString;
  } catch (error) {
    logger.error(error);
    return "";
  }
};
var getHash = (value) => {
  let hash = 0;
  let chr = 0;
  if (value.length === 0) return hash;
  for (let i = 0; i < value.length; i++) {
    chr = value.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return hash;
};

// src/core/generator/fileGenerator.ts
var loadFileIconDefinitions = (fileIcons2, config, manifest) => {
  var _a;
  const enabledIcons = disableIconsByPack(fileIcons2, config.activeIconPack);
  const customIcons = getCustomIcons((_a = config.files) == null ? void 0 : _a.associations);
  const allFileIcons = [...enabledIcons, ...customIcons];
  allFileIcons.forEach((icon) => {
    var _a2;
    if (icon.disabled) return;
    const isClone = icon.clone !== void 0;
    manifest = setIconDefinition(manifest, config, icon.name, isClone);
    if (icon.light) {
      manifest = setIconDefinition(
        manifest,
        config,
        icon.name,
        isClone,
        lightColorFileEnding
      );
    }
    if (icon.highContrast) {
      manifest = setIconDefinition(
        manifest,
        config,
        icon.name,
        isClone,
        highContrastColorFileEnding
      );
    }
    if (icon.fileExtensions) {
      manifest = mapSpecificFileIcons(
        icon,
        "fileExtensions" /* FileExtensions */,
        manifest
      );
    }
    if (icon.fileNames) {
      manifest = mapSpecificFileIcons(
        icon,
        "fileNames" /* FileNames */,
        manifest,
        (_a2 = config.files) == null ? void 0 : _a2.associations
      );
    }
  });
  manifest = setIconDefinition(
    manifest,
    config,
    fileIcons2.defaultIcon.name,
    false
  );
  manifest.file = fileIcons2.defaultIcon.name;
  if (fileIcons2.defaultIcon.light && manifest.light) {
    manifest = setIconDefinition(
      manifest,
      config,
      fileIcons2.defaultIcon.name,
      false,
      lightColorFileEnding
    );
    if (manifest.light) {
      manifest.light.file = fileIcons2.defaultIcon.name + lightColorFileEnding;
    }
  }
  if (fileIcons2.defaultIcon.highContrast) {
    manifest = setIconDefinition(
      manifest,
      config,
      fileIcons2.defaultIcon.name,
      false,
      highContrastColorFileEnding
    );
    if (manifest.highContrast) {
      manifest.highContrast.file = fileIcons2.defaultIcon.name + highContrastColorFileEnding;
    }
  }
  return manifest;
};
var mapSpecificFileIcons = (icon, mappingType, manifest, customFileAssociation = {}) => {
  const iconMappingType = icon[mappingType];
  if (iconMappingType === void 0) {
    return manifest;
  }
  iconMappingType.forEach((name) => {
    var _a, _b;
    const shouldOverwriteFileNames = Object.keys(customFileAssociation).some(
      (key) => {
        if (!/^\*{2}\./.test(key)) return false;
        const fileExtension = key.replace(wildcardPattern, ".");
        return name.toLowerCase().indexOf(fileExtension.toLowerCase()) !== -1;
      }
    );
    const configMappingType = manifest[mappingType];
    const configLightMappingType = (_a = manifest.light) == null ? void 0 : _a[mappingType];
    const configHighContrastMappingType = (_b = manifest.highContrast) == null ? void 0 : _b[mappingType];
    if (shouldOverwriteFileNames || !configMappingType || !configLightMappingType || !configHighContrastMappingType)
      return;
    configMappingType[name] = icon.name;
    if (icon.light) {
      configLightMappingType[name] = `${icon.name}${lightColorFileEnding}`;
    }
    if (icon.highContrast) {
      configHighContrastMappingType[name] = `${icon.name}${highContrastColorFileEnding}`;
    }
  });
  return manifest;
};
var disableIconsByPack = (fileIcons2, activeIconPack) => {
  return fileIcons2.icons.filter((icon) => {
    return !icon.enabledFor ? true : icon.enabledFor.some((p) => p === activeIconPack);
  });
};
var setIconDefinition = (manifest, config, iconName, isClone, appendix = "") => {
  var _a;
  const ext = isClone ? cloneIconExtension : ".svg";
  const key = `${iconName}${appendix}`;
  (_a = manifest.iconDefinitions) != null ? _a : manifest.iconDefinitions = {};
  if (!manifest.iconDefinitions[key]) {
    const fileConfigHash = getFileConfigHash(config);
    manifest.iconDefinitions[key] = {
      iconPath: `${iconFolderPath}${iconName}${appendix}${fileConfigHash}${ext}`
    };
  }
  return manifest;
};
var getCustomIcons = (fileAssociations) => {
  if (!fileAssociations) return [];
  const icons = Object.keys(fileAssociations).map((fa) => {
    const icon = {
      name: fileAssociations[fa].toLowerCase()
    };
    if (wildcardPattern.test(fa)) {
      icon.fileExtensions = [fa.toLowerCase().replace(wildcardPattern, "")];
    } else {
      icon.fileNames = [fa.toLowerCase()];
    }
    return icon;
  });
  return icons;
};

// src/core/generator/folderGenerator.ts
var loadFolderIconDefinitions = (folderIcons2, config, manifest) => {
  var _a, _b, _c;
  manifest.hidesExplorerArrows = config.hidesExplorerArrows;
  const activeTheme = getEnabledFolderTheme(folderIcons2, (_a = config.folders) == null ? void 0 : _a.theme);
  if (!activeTheme) {
    return manifest;
  }
  const enabledIcons = disableIconsByPack2(activeTheme, config.activeIconPack);
  const customIcons = getCustomIcons2((_b = config.folders) == null ? void 0 : _b.associations);
  const allIcons = [...enabledIcons, ...customIcons];
  if (((_c = config.folders) == null ? void 0 : _c.theme) === "none") {
    return manifest;
  }
  allIcons.forEach((icon) => {
    if (icon.disabled) return;
    const folderNames = extendFolderNames(icon.folderNames);
    manifest = setIconDefinitions(manifest, config, icon);
    manifest = merge(manifest, setFolderNames(icon.name, folderNames));
    manifest.light = icon.light ? merge(
      manifest.light,
      setFolderNames(icon.name, folderNames, lightColorFileEnding)
    ) : manifest.light;
    manifest.highContrast = icon.highContrast ? merge(
      manifest.highContrast,
      setFolderNames(icon.name, folderNames, highContrastColorFileEnding)
    ) : manifest.highContrast;
  });
  manifest = setDefaultFolderIcons(activeTheme, manifest, config);
  return manifest;
};
var setDefaultFolderIcons = (theme, manifest, config) => {
  const hasFolderIcons = !!theme.defaultIcon.name && theme.defaultIcon.name.length > 0;
  if (hasFolderIcons) {
    manifest = setIconDefinitions(manifest, config, theme.defaultIcon);
  }
  manifest = merge(
    manifest,
    createDefaultIconConfigObject(hasFolderIcons, theme, "")
  );
  manifest.light = theme.defaultIcon.light ? merge(
    manifest.light,
    createDefaultIconConfigObject(
      hasFolderIcons,
      theme,
      lightColorFileEnding
    )
  ) : manifest.light;
  manifest.highContrast = theme.defaultIcon.highContrast ? merge(
    manifest.highContrast,
    createDefaultIconConfigObject(
      hasFolderIcons,
      theme,
      highContrastColorFileEnding
    )
  ) : manifest.highContrast;
  manifest = merge(
    manifest,
    createRootIconConfigObject(hasFolderIcons, theme, "")
  );
  if (theme.rootFolder) {
    manifest = setIconDefinitions(manifest, config, theme.rootFolder);
    manifest.light = theme.rootFolder.light ? merge(
      manifest.light,
      createRootIconConfigObject(
        hasFolderIcons,
        theme,
        lightColorFileEnding
      )
    ) : manifest.light;
    manifest.highContrast = theme.rootFolder.highContrast ? merge(
      manifest.highContrast,
      createRootIconConfigObject(
        hasFolderIcons,
        theme,
        highContrastColorFileEnding
      )
    ) : manifest.highContrast;
  }
  return manifest;
};
var getEnabledFolderTheme = (themes, enabledTheme) => {
  return themes.find((theme) => theme.name === enabledTheme);
};
var disableIconsByPack2 = (folderIcons2, activatedIconPack) => {
  if (!(folderIcons2 == null ? void 0 : folderIcons2.icons) || folderIcons2.icons.length === 0) {
    return [];
  }
  return folderIcons2.icons.filter((icon) => {
    return !icon.enabledFor ? true : icon.enabledFor.some((p) => p === activatedIconPack);
  });
};
var setIconDefinitions = (manifest, config, icon) => {
  const isClone = icon.clone !== void 0;
  manifest = createIconDefinitions(manifest, config, icon.name, "", isClone);
  if (icon.light) {
    manifest = merge(
      manifest,
      createIconDefinitions(
        manifest,
        config,
        icon.name,
        lightColorFileEnding,
        isClone
      )
    );
  }
  if (icon.highContrast) {
    manifest = merge(
      manifest,
      createIconDefinitions(
        manifest,
        config,
        icon.name,
        highContrastColorFileEnding,
        isClone
      )
    );
  }
  return manifest;
};
var createIconDefinitions = (manifest, config, iconName, appendix = "", isClone = false) => {
  const fileConfigHash = getFileConfigHash(config);
  const configIconDefinitions = manifest.iconDefinitions;
  const ext = isClone ? cloneIconExtension : ".svg";
  const key = `${iconName}${appendix}`;
  const openedKey = `${iconName}${openedFolder}${appendix}`;
  if (configIconDefinitions) {
    if (!configIconDefinitions[key]) {
      configIconDefinitions[key] = {
        iconPath: `${iconFolderPath}${key}${fileConfigHash}${ext}`
      };
    }
    if (!configIconDefinitions[`${openedKey}`]) {
      configIconDefinitions[`${openedKey}`] = {
        iconPath: `${iconFolderPath}${openedKey}${fileConfigHash}${ext}`
      };
    }
  }
  return manifest;
};
var extendFolderNames = (folderNames) => {
  const names = [];
  const styles = [
    ["", ""],
    [".", ""],
    ["_", ""],
    ["__", "__"]
  ];
  folderNames.forEach((name) => {
    styles.forEach((style) => {
      names.push(`${style[0]}${name}${style[1]}`);
    });
  });
  return names;
};
var setFolderNames = (iconName, folderNames, appendix = "") => {
  const obj = {
    folderNames: {},
    folderNamesExpanded: {}
  };
  folderNames.forEach((name) => {
    if (obj.folderNames) {
      obj.folderNames[name] = iconName + appendix;
    }
    if (obj.folderNamesExpanded) {
      obj.folderNamesExpanded[name] = `${iconName}${openedFolder}${appendix}`;
    }
  });
  return obj;
};
var createDefaultIconConfigObject = (hasFolderIcons, theme, appendix = "") => {
  const obj = {
    folder: "",
    folderExpanded: ""
  };
  obj.folder = hasFolderIcons ? theme.defaultIcon.name + appendix : "";
  obj.folderExpanded = hasFolderIcons ? `${theme.defaultIcon.name}${openedFolder}${appendix}` : "";
  return obj;
};
var createRootIconConfigObject = (hasFolderIcons, theme, appendix = "") => {
  const obj = {
    rootFolder: "",
    rootFolderExpanded: ""
  };
  obj.rootFolder = hasFolderIcons ? theme.rootFolder ? theme.rootFolder.name + appendix : theme.defaultIcon.name + appendix : "";
  obj.rootFolderExpanded = hasFolderIcons ? theme.rootFolder ? `${theme.rootFolder.name}${openedFolder}${appendix}` : `${theme.defaultIcon.name}${openedFolder}${appendix}` : "";
  return obj;
};
var getCustomIcons2 = (folderAssociations) => {
  if (!folderAssociations) return [];
  const icons = Object.keys(folderAssociations).map((fa) => ({
    // use default folder if icon name is empty
    name: folderAssociations[fa].length > 0 ? "folder-" + folderAssociations[fa].toLowerCase() : "folder",
    folderNames: [fa.toLowerCase()]
  }));
  return icons;
};

// src/core/models/manifest.ts
var createEmptyManifest = () => ({
  iconDefinitions: {},
  folderNames: {},
  folderNamesExpanded: {},
  fileExtensions: {},
  fileNames: {},
  languageIds: {},
  light: {
    fileExtensions: {},
    fileNames: {}
  },
  highContrast: {
    fileExtensions: {},
    fileNames: {}
  }
});

// src/core/models/icons/iconPack.ts
var IconPack = /* @__PURE__ */ ((IconPack2) => {
  IconPack2["Angular"] = "angular";
  IconPack2["Nest"] = "nest";
  IconPack2["Ngrx"] = "angular_ngrx";
  IconPack2["React"] = "react";
  IconPack2["Redux"] = "react_redux";
  IconPack2["Qwik"] = "qwik";
  IconPack2["Vue"] = "vue";
  IconPack2["Vuex"] = "vue_vuex";
  return IconPack2;
})(IconPack || {});

// src/core/patterns/patterns.ts
var mapPatterns = (patterns) => {
  return Object.entries(patterns).flatMap(([fileName, pattern]) => {
    switch (pattern) {
      case "ecmascript" /* Ecmascript */:
        return [
          `${fileName}.js`,
          `${fileName}.mjs`,
          `${fileName}.cjs`,
          `${fileName}.ts`,
          `${fileName}.mts`,
          `${fileName}.cts`
        ];
      case "configuration" /* Configuration */:
        return [
          `${fileName}.json`,
          `${fileName}.jsonc`,
          `${fileName}.json5`,
          `${fileName}.yaml`,
          `${fileName}.yml`,
          `${fileName}.toml`
        ];
      case "nodeEcosystem" /* NodeEcosystem */:
        return [
          `${fileName}.js`,
          `${fileName}.mjs`,
          `${fileName}.cjs`,
          `${fileName}.ts`,
          `${fileName}.mts`,
          `${fileName}.cts`,
          `${fileName}.json`,
          `${fileName}.jsonc`,
          `${fileName}.json5`,
          `${fileName}.yaml`,
          `${fileName}.yml`,
          `${fileName}.toml`
        ];
      case "cosmiconfig" /* Cosmiconfig */:
        return [
          `.${fileName}rc`,
          `.${fileName}rc.json`,
          `.${fileName}rc.jsonc`,
          `.${fileName}rc.json5`,
          `.${fileName}rc.yaml`,
          `.${fileName}rc.yml`,
          `.${fileName}rc.toml`,
          `.${fileName}rc.js`,
          `.${fileName}rc.mjs`,
          `.${fileName}rc.cjs`,
          `.${fileName}rc.ts`,
          `.${fileName}rc.mts`,
          `.${fileName}rc.cts`,
          `.config/${fileName}rc`,
          `.config/${fileName}rc.json`,
          `.config/${fileName}rc.jsonc`,
          `.config/${fileName}rc.json5`,
          `.config/${fileName}rc.yaml`,
          `.config/${fileName}rc.yml`,
          `.config/${fileName}rc.toml`,
          `.config/${fileName}rc.js`,
          `.config/${fileName}rc.mjs`,
          `.config/${fileName}rc.cjs`,
          `.config/${fileName}rc.ts`,
          `.config/${fileName}rc.mts`,
          `.config/${fileName}rc.cts`,
          `${fileName}.config.json`,
          `${fileName}.config.jsonc`,
          `${fileName}.config.json5`,
          `${fileName}.config.yaml`,
          `${fileName}.config.yml`,
          `${fileName}.config.toml`,
          `${fileName}.config.js`,
          `${fileName}.config.mjs`,
          `${fileName}.config.cjs`,
          `${fileName}.config.ts`,
          `${fileName}.config.mts`,
          `${fileName}.config.cts`
        ];
      default:
        const exhaustiveCheck = pattern;
        throw new Error(`Unhandled pattern: ${exhaustiveCheck}`);
    }
  });
};
var parseByPattern = (rawFileIcons) => {
  return rawFileIcons.map(({ patterns, fileNames = [], ...rest }) => ({
    ...rest,
    fileNames: patterns ? [...mapPatterns(patterns), ...fileNames] : fileNames
  }));
};

// src/core/icons/fileIcons.ts
var fileIcons = {
  defaultIcon: { name: "file" },
  icons: parseByPattern([
    { name: "html", fileExtensions: ["htm", "xhtml", "html_vm", "asp"] },
    {
      name: "pug",
      fileExtensions: ["jade", "pug"],
      fileNames: [".pug-lintrc", ".pug-lintrc.js", ".pug-lintrc.json"]
    },
    {
      name: "markdown",
      fileExtensions: ["md", "markdown", "rst"]
    },
    { name: "blink", fileExtensions: ["blink"], light: true },
    { name: "css", fileExtensions: ["css"] },
    { name: "sass", fileExtensions: ["scss", "sass"] },
    { name: "less", fileExtensions: ["less"] },
    {
      name: "json",
      fileExtensions: [
        "json",
        "jsonc",
        "tsbuildinfo",
        "json5",
        "jsonl",
        "ndjson"
      ],
      fileNames: [
        ".jscsrc",
        ".jshintrc",
        "composer.lock",
        ".jsbeautifyrc",
        ".esformatter",
        "cdp.pid",
        ".lintstagedrc",
        ".whitesource"
      ]
    },
    {
      name: "hjson",
      fileExtensions: ["hjson"]
    },
    {
      name: "jinja",
      fileExtensions: ["jinja", "jinja2", "j2", "jinja-html"],
      light: true
    },
    { name: "proto", fileExtensions: ["proto"] },
    {
      name: "playwright",
      fileNames: [
        "playwright.config.js",
        "playwright.config.mjs",
        "playwright.config.ts",
        "playwright.config.base.js",
        "playwright.config.base.mjs",
        "playwright.config.base.ts",
        "playwright-ct.config.js",
        "playwright-ct.config.mjs",
        "playwright-ct.config.ts"
      ]
    },
    {
      name: "sublime",
      fileExtensions: ["sublime-project", "sublime-workspace"]
    },
    { name: "twine", fileExtensions: ["tw", "twee"] },
    {
      name: "yaml",
      fileExtensions: ["yml.dist", "yaml.dist", "YAML-tmLanguage"]
    },
    {
      name: "xml",
      fileExtensions: [
        "xml",
        "plist",
        "xsd",
        "dtd",
        "xsl",
        "xslt",
        "resx",
        "iml",
        "xquery",
        "tmLanguage",
        "manifest",
        "project",
        "xml.dist",
        "xml.dist.sample",
        "dmn",
        "jrxml"
      ],
      fileNames: [".htaccess"]
    },
    {
      name: "image",
      fileExtensions: [
        "png",
        "jpeg",
        "jpg",
        "gif",
        "ico",
        "tif",
        "tiff",
        "psd",
        "psb",
        "ami",
        "apx",
        "avif",
        "bmp",
        "bpg",
        "brk",
        "cur",
        "dds",
        "dng",
        "exr",
        "fpx",
        "gbr",
        "img",
        "jbig2",
        "jb2",
        "jng",
        "jxr",
        "pgf",
        "pic",
        "raw",
        "webp",
        "eps",
        "afphoto",
        "ase",
        "aseprite",
        "clip",
        "cpt",
        "heif",
        "heic",
        "kra",
        "mdp",
        "ora",
        "pdn",
        "reb",
        "sai",
        "tga",
        "xcf",
        "jfif",
        "ppm",
        "pbm",
        "pgm",
        "pnm",
        "icns"
      ]
    },
    { name: "javascript", fileExtensions: ["esx", "mjs"] },
    { name: "react", fileExtensions: ["jsx"] },
    { name: "react_ts", fileExtensions: ["tsx"] },
    {
      name: "routing",
      fileExtensions: [
        "routing.ts",
        "routing.tsx",
        "routing.js",
        "routing.jsx",
        "routes.ts",
        "routes.tsx",
        "routes.js",
        "routes.jsx"
      ],
      fileNames: [
        "router.js",
        "router.jsx",
        "router.ts",
        "router.tsx",
        "routes.js",
        "routes.jsx",
        "routes.ts",
        "routes.tsx"
      ],
      enabledFor: [
        "angular" /* Angular */,
        "angular_ngrx" /* Ngrx */,
        "react" /* React */,
        "react_redux" /* Redux */,
        "vue" /* Vue */,
        "vue_vuex" /* Vuex */
      ]
    },
    {
      name: "redux-action",
      fileExtensions: ["action.js", "actions.js", "action.ts", "actions.ts"],
      fileNames: ["action.js", "actions.js", "action.ts", "actions.ts"],
      enabledFor: ["react_redux" /* Redux */]
    },
    {
      name: "redux-reducer",
      fileExtensions: [
        "reducer.js",
        "reducers.js",
        "reducer.ts",
        "reducers.ts"
      ],
      fileNames: ["reducer.js", "reducers.js", "reducer.ts", "reducers.ts"],
      enabledFor: ["react_redux" /* Redux */]
    },
    {
      name: "redux-selector",
      fileExtensions: [
        "selector.js",
        "selectors.js",
        "selector.ts",
        "selectors.ts"
      ],
      fileNames: ["selector.js", "selectors.js", "selector.ts", "selectors.ts"],
      enabledFor: ["react_redux" /* Redux */]
    },
    {
      name: "redux-store",
      fileExtensions: ["store.js", "store.ts"],
      fileNames: ["store.js", "store.ts"],
      enabledFor: ["react_redux" /* Redux */]
    },
    {
      name: "settings",
      fileExtensions: [
        "ini",
        "dlc",
        "config",
        "conf",
        "properties",
        "prop",
        "settings",
        "option",
        "props",
        "toml",
        "prefs",
        "sln.dotsettings",
        "sln.dotsettings.user",
        "cfg",
        "cnf"
      ],
      fileNames: [
        ".jshintignore",
        ".buildignore",
        ".mrconfig",
        ".yardopts",
        "manifest.mf",
        ".clang-format",
        ".clang-tidy",
        ".conf"
      ]
    },
    {
      name: "typescript-def",
      fileExtensions: ["d.ts", "d.cts", "d.mts"]
    },
    { name: "markojs", fileExtensions: ["marko"] },
    {
      name: "astro",
      fileExtensions: ["astro"]
    },
    {
      name: "astro-config",
      fileNames: [
        "astro.config.js",
        "astro.config.mjs",
        "astro.config.cjs",
        "astro.config.ts",
        "astro.config.cts",
        "astro.config.mts"
      ]
    },
    { name: "pdf", fileExtensions: ["pdf"] },
    {
      name: "table",
      fileExtensions: ["xlsx", "xlsm", "xls", "csv", "tsv", "psv", "ods"]
    },
    {
      name: "vscode",
      fileExtensions: [
        "vscodeignore",
        "vsixmanifest",
        "vsix",
        "code-workplace",
        "code-workspace",
        "code-profile",
        "code-snippets"
      ]
    },
    {
      name: "visualstudio",
      fileExtensions: [
        "csproj",
        "ruleset",
        "sln",
        "slnx",
        "suo",
        "vb",
        "vbs",
        "vcxitems",
        "vcxitems.filters",
        "vcxproj",
        "vcxproj.filters"
      ]
    },
    {
      name: "database",
      fileExtensions: [
        "pdb",
        "sql",
        "pks",
        "pkb",
        "accdb",
        "mdb",
        "sqlite",
        "sqlite3",
        "pgsql",
        "postgres",
        "plpgsql",
        "psql",
        "db",
        "db3",
        "dblite",
        "dblite3",
        "debugsymbols"
      ]
    },
    { name: "kusto", fileExtensions: ["kql"] },
    { name: "csharp", fileExtensions: ["cs", "csx", "csharp"] },
    { name: "qsharp", fileExtensions: ["qs"] },
    {
      name: "zip",
      fileExtensions: [
        "zip",
        "tar",
        "gz",
        "xz",
        "lzma",
        "lz4",
        "br",
        "bz2",
        "bzip2",
        "gzip",
        "brotli",
        "7z",
        "rar",
        "tz",
        "txz",
        "tgz",
        "zst"
      ]
    },
    { name: "vala", fileExtensions: ["vala"] },
    { name: "zig", fileExtensions: ["zig", "zon"] },
    { name: "exe", fileExtensions: ["exe", "msi"] },
    { name: "hex", fileExtensions: ["dat", "bin", "hex"] },
    { name: "java", fileExtensions: ["java", "jsp"] },
    { name: "jar", fileExtensions: ["jar"] },
    { name: "javaclass", fileExtensions: ["class"] },
    { name: "c", fileExtensions: ["c", "i", "mi"] },
    { name: "h", fileExtensions: ["h"] },
    {
      name: "cpp",
      fileExtensions: ["cc", "cpp", "cxx", "c++", "cp", "mii", "ii"]
    },
    {
      name: "hpp",
      fileExtensions: ["hh", "hpp", "hxx", "h++", "hp", "tcc", "inl"]
    },
    { name: "rc", fileExtensions: ["rc"] },
    { name: "go", fileExtensions: ["go"] },
    {
      name: "go-mod",
      fileNames: ["go.mod", "go.sum", "go.work", "go.work.sum"]
    },
    { name: "python", fileExtensions: ["py"] },
    {
      name: "python-misc",
      fileExtensions: ["pyc", "whl"],
      fileNames: [
        "requirements.txt",
        "pipfile",
        ".python-version",
        "manifest.in",
        "pylintrc",
        ".pylintrc",
        "pyproject.toml",
        "py.typed"
      ]
    },
    { name: "url", fileExtensions: ["url"] },
    {
      name: "console",
      fileExtensions: [
        "sh",
        "ksh",
        "csh",
        "tcsh",
        "zsh",
        "bash",
        "bat",
        "cmd",
        "awk",
        "fish",
        "exp",
        "nu"
      ],
      fileNames: ["commit-msg", "pre-commit", "pre-push", "post-merge"]
    },
    {
      name: "powershell",
      fileExtensions: ["ps1", "psm1", "psd1", "ps1xml", "psc1", "pssc"]
    },
    {
      name: "gradle",
      fileExtensions: ["gradle"],
      fileNames: ["gradle.properties", "gradlew", "gradle-wrapper.properties"]
    },
    { name: "word", fileExtensions: ["doc", "docx", "rtf", "odt"] },
    {
      name: "certificate",
      fileExtensions: ["cer", "cert", "crt"],
      fileNames: [
        "copying",
        "copying.md",
        "copying.rst",
        "copying.txt",
        "copyright",
        "copyright.md",
        "copyright.rst",
        "copyright.txt",
        "license",
        "license-agpl",
        "license-apache",
        "license-bsd",
        "license-mit",
        "license-gpl",
        "license-lgpl",
        "license.md",
        "license.rst",
        "license.txt",
        "licence",
        "licence-agpl",
        "licence-apache",
        "licence-bsd",
        "licence-mit",
        "licence-gpl",
        "licence-lgpl",
        "licence.md",
        "licence.rst",
        "licence.txt"
      ]
    },
    {
      name: "key",
      fileExtensions: [
        "pub",
        "key",
        "pem",
        "asc",
        "gpg",
        "passwd",
        "shasum",
        "sha256",
        "sha256sum",
        "sha256sums"
      ],
      fileNames: [".htpasswd", "sha256sums", ".secrets"]
    },
    {
      name: "font",
      fileExtensions: [
        "woff",
        "woff2",
        "ttf",
        "eot",
        "suit",
        "otf",
        "bmap",
        "fnt",
        "odttf",
        "ttc",
        "font",
        "fonts",
        "sui",
        "ntf",
        "mrf"
      ]
    },
    { name: "lib", fileExtensions: ["lib", "bib", "a"] },
    { name: "dll", fileExtensions: ["dll", "ilk", "so"] },
    {
      name: "ruby",
      fileExtensions: ["rb", "erb", "rbs"],
      fileNames: [".ruby-version"]
    },
    { name: "gemfile", fileNames: ["gemfile"] },
    {
      name: "rubocop",
      fileNames: [".rubocop.yml", ".rubocop-todo.yml", ".rubocop_todo.yml"],
      light: true
    },
    { name: "rspec", fileNames: [".rspec"] },
    { name: "fsharp", fileExtensions: ["fs", "fsx", "fsi", "fsproj"] },
    { name: "swift", fileExtensions: ["swift"] },
    { name: "arduino", fileExtensions: ["ino"] },
    {
      name: "docker",
      fileExtensions: [
        "dockerignore",
        "dockerfile",
        "docker-compose.yml",
        "docker-compose.yaml",
        "containerignore",
        "containerfile",
        "compose.yaml",
        "compose.yml"
      ],
      fileNames: [
        "dockerfile",
        "dockerfile.prod",
        "dockerfile.production",
        "dockerfile.alpha",
        "dockerfile.beta",
        "dockerfile.stage",
        "dockerfile.staging",
        "dockerfile.dev",
        "dockerfile.development",
        "dockerfile.local",
        "dockerfile.test",
        "dockerfile.testing",
        "dockerfile.ci",
        "dockerfile.web",
        "dockerfile.worker",
        "docker-compose.yml",
        "docker-compose.override.yml",
        "docker-compose.prod.yml",
        "docker-compose.production.yml",
        "docker-compose.alpha.yml",
        "docker-compose.beta.yml",
        "docker-compose.stage.yml",
        "docker-compose.staging.yml",
        "docker-compose.dev.yml",
        "docker-compose.development.yml",
        "docker-compose.local.yml",
        "docker-compose.test.yml",
        "docker-compose.testing.yml",
        "docker-compose.ci.yml",
        "docker-compose.web.yml",
        "docker-compose.worker.yml",
        "docker-compose.yaml",
        "docker-compose.override.yaml",
        "docker-compose.prod.yaml",
        "docker-compose.production.yaml",
        "docker-compose.alpha.yaml",
        "docker-compose.beta.yaml",
        "docker-compose.stage.yaml",
        "docker-compose.staging.yaml",
        "docker-compose.dev.yaml",
        "docker-compose.development.yaml",
        "docker-compose.local.yaml",
        "docker-compose.test.yaml",
        "docker-compose.testing.yaml",
        "docker-compose.ci.yaml",
        "docker-compose.web.yaml",
        "docker-compose.worker.yaml",
        "containerfile",
        "containerfile.prod",
        "containerfile.production",
        "containerfile.alpha",
        "containerfile.beta",
        "containerfile.stage",
        "containerfile.staging",
        "containerfile.dev",
        "containerfile.development",
        "containerfile.local",
        "containerfile.test",
        "containerfile.testing",
        "containerfile.ci",
        "containerfile.web",
        "containerfile.worker",
        "compose.yaml",
        "compose.override.yaml",
        "compose.prod.yaml",
        "compose.production.yaml",
        "compose.alpha.yaml",
        "compose.beta.yaml",
        "compose.stage.yaml",
        "compose.staging.yaml",
        "compose.dev.yaml",
        "compose.development.yaml",
        "compose.local.yaml",
        "compose.test.yaml",
        "compose.testing.yaml",
        "compose.ci.yaml",
        "compose.web.yaml",
        "compose.worker.yaml",
        "compose.yml",
        "compose.override.yml",
        "compose.prod.yml",
        "compose.production.yml",
        "compose.alpha.yml",
        "compose.beta.yml",
        "compose.stage.yml",
        "compose.staging.yml",
        "compose.dev.yml",
        "compose.development.yml",
        "compose.local.yml",
        "compose.test.yml",
        "compose.testing.yml",
        "compose.ci.yml",
        "compose.web.yml",
        "compose.worker.yml"
      ]
    },
    { name: "tex", fileExtensions: ["tex", "sty", "dtx", "ltx"] },
    {
      name: "powerpoint",
      fileExtensions: [
        "pptx",
        "ppt",
        "pptm",
        "potx",
        "potm",
        "ppsx",
        "ppsm",
        "pps",
        "ppam",
        "ppa",
        "odp"
      ]
    },
    {
      name: "video",
      fileExtensions: [
        "webm",
        "mkv",
        "flv",
        "vob",
        "ogv",
        "ogg",
        "gifv",
        "avi",
        "mov",
        "qt",
        "wmv",
        "yuv",
        "rm",
        "rmvb",
        "mp4",
        "m4v",
        "mpg",
        "mp2",
        "mpeg",
        "mpe",
        "mpv",
        "m2v"
      ]
    },
    { name: "virtual", fileExtensions: ["vdi", "vbox", "vbox-prev"] },
    { name: "vedic", fileExtensions: ["ved", "veda", "vedic"] },
    { name: "email", fileExtensions: ["ics"], fileNames: [".mailmap"] },
    {
      name: "audio",
      fileExtensions: ["mp3", "flac", "m4a", "wma", "aiff", "wav"]
    },
    { name: "coffee", fileExtensions: ["coffee", "cson", "iced"] },
    { name: "document", fileExtensions: ["txt"] },
    {
      name: "graphql",
      fileExtensions: ["graphql", "gql"],
      fileNames: [".graphqlconfig"],
      patterns: {
        graphql: "ecmascript" /* Ecmascript */
      }
    },
    { name: "rust", fileExtensions: ["rs", "ron"] },
    { name: "raml", fileExtensions: ["raml"] },
    { name: "xaml", fileExtensions: ["xaml"] },
    { name: "haskell", fileExtensions: ["hs"] },
    { name: "kotlin", fileExtensions: ["kt", "kts"] },
    {
      name: "mist",
      fileExtensions: ["mist.js", "mist.ts", "mist.jsx", "mist.tsx"],
      clone: {
        base: "liquid",
        color: "blue-500"
      }
    },
    { name: "otne", fileExtensions: ["otne"] },
    {
      name: "git",
      fileExtensions: ["patch"],
      fileNames: [
        ".git",
        ".gitignore",
        ".gitmessage",
        ".gitignore-global",
        ".gitignore_global",
        ".gitattributes",
        ".gitattributes-global",
        ".gitattributes_global",
        ".gitconfig",
        ".gitmodules",
        ".gitkeep",
        ".keep",
        ".gitpreserve",
        ".gitinclude",
        ".git-blame-ignore",
        ".git-blame-ignore-revs",
        ".git-for-windows-updater",
        "git-history"
      ]
    },
    { name: "lua", fileExtensions: ["lua"], fileNames: [".luacheckrc"] },
    { name: "clojure", fileExtensions: ["clj", "cljs", "cljc"] },
    { name: "groovy", fileExtensions: ["groovy"] },
    { name: "r", fileExtensions: ["r", "rmd"], fileNames: [".Rhistory"] },
    { name: "dart", fileExtensions: ["dart"], fileNames: [".pubignore"] },
    { name: "dart_generated", fileExtensions: ["freezed.dart", "g.dart"] },
    { name: "actionscript", fileExtensions: ["as"] },
    { name: "mxml", fileExtensions: ["mxml"] },
    { name: "autohotkey", fileExtensions: ["ahk"] },
    { name: "flash", fileExtensions: ["swf"] },
    { name: "swc", fileExtensions: ["swc"] },
    {
      name: "cmake",
      fileExtensions: ["cmake"],
      fileNames: ["cmakelists.txt", "cmakecache.txt"]
    },
    {
      name: "assembly",
      fileExtensions: [
        "asm",
        "a51",
        "inc",
        "nasm",
        "s",
        "ms",
        "agc",
        "ags",
        "aea",
        "argus",
        "mitigus",
        "binsource"
      ]
    },
    { name: "vue", fileExtensions: ["vue"] },
    { name: "semgrep", fileNames: ["semgrep.yml", ".semgrepignore"] },
    {
      name: "vue-config",
      fileNames: [
        "vue.config.js",
        "vue.config.ts",
        "vetur.config.js",
        "vetur.config.ts",
        "volar.config.js"
      ]
    },
    {
      name: "vuex-store",
      fileExtensions: ["store.js", "store.ts"],
      fileNames: ["store.js", "store.ts"],
      enabledFor: ["vue_vuex" /* Vuex */]
    },
    {
      name: "nuxt",
      fileNames: ["nuxt.config.js", "nuxt.config.ts", ".nuxtignore", ".nuxtrc"]
    },
    {
      name: "harmonix",
      fileNames: ["harmonix.config.js", "harmonix.config.ts"]
    },
    { name: "ocaml", fileExtensions: ["ml", "mli", "cmx"] },
    { name: "odin", fileExtensions: ["odin"] },
    {
      name: "javascript-map",
      fileExtensions: ["js.map", "mjs.map", "cjs.map"]
    },
    { name: "css-map", fileExtensions: ["css.map"] },
    {
      name: "lock",
      fileExtensions: ["lock"],
      fileNames: ["security.md", "security.txt", "security"]
    },
    { name: "handlebars", fileExtensions: ["hbs", "mustache"] },
    { name: "perl", fileExtensions: ["pm", "raku"] },
    { name: "haxe", fileExtensions: ["hx"] },
    {
      name: "test-ts",
      fileExtensions: [
        "spec.ts",
        "spec.cts",
        "spec.mts",
        "cy.ts",
        "e2e-spec.ts",
        "e2e-spec.cts",
        "e2e-spec.mts",
        "test.ts",
        "test.cts",
        "test.mts",
        "ts.snap",
        "spec-d.ts",
        "test-d.ts"
      ]
    },
    {
      name: "test-jsx",
      fileExtensions: [
        "spec.tsx",
        "test.tsx",
        "tsx.snap",
        "spec.jsx",
        "test.jsx",
        "jsx.snap",
        "cy.jsx",
        "cy.tsx",
        "spec-d.tsx",
        "test-d.tsx"
      ]
    },
    {
      name: "test-js",
      fileExtensions: [
        "spec.js",
        "spec.cjs",
        "spec.mjs",
        "e2e-spec.js",
        "e2e-spec.cjs",
        "e2e-spec.mjs",
        "test.js",
        "test.cjs",
        "test.mjs",
        "js.snap",
        "cy.js"
      ]
    },
    {
      name: "angular",
      fileExtensions: ["module.ts", "module.js", "ng-template"],
      fileNames: [
        "angular-cli.json",
        ".angular-cli.json",
        "angular.json",
        "ng-package.json"
      ],
      enabledFor: ["angular" /* Angular */, "angular_ngrx" /* Ngrx */]
    },
    {
      name: "angular-component",
      clone: {
        base: "angular",
        color: "blue-700"
      },
      fileExtensions: ["component.ts", "component.js"],
      enabledFor: ["angular" /* Angular */, "angular_ngrx" /* Ngrx */]
    },
    {
      name: "angular-guard",
      clone: {
        base: "angular",
        color: "green-600"
      },
      fileExtensions: ["guard.ts", "guard.js"],
      enabledFor: ["angular" /* Angular */, "angular_ngrx" /* Ngrx */]
    },
    {
      name: "angular-service",
      clone: {
        base: "angular",
        color: "amber-400"
      },
      fileExtensions: ["service.ts", "service.js"],
      enabledFor: ["angular" /* Angular */, "angular_ngrx" /* Ngrx */]
    },
    {
      name: "angular-pipe",
      clone: {
        base: "angular",
        color: "teal-600"
      },
      fileExtensions: ["pipe.ts", "pipe.js", "filter.js"],
      enabledFor: ["angular" /* Angular */, "angular_ngrx" /* Ngrx */]
    },
    {
      name: "angular-directive",
      clone: {
        base: "angular",
        color: "purple-400"
      },
      fileExtensions: ["directive.ts", "directive.js"],
      enabledFor: ["angular" /* Angular */, "angular_ngrx" /* Ngrx */]
    },
    {
      name: "angular-resolver",
      clone: {
        base: "angular",
        color: "green-600"
      },
      fileExtensions: ["resolver.ts", "resolver.js"],
      enabledFor: ["angular" /* Angular */, "angular_ngrx" /* Ngrx */]
    },
    { name: "puppet", fileExtensions: ["pp"] },
    { name: "elixir", fileExtensions: ["ex", "exs", "eex", "leex", "heex"] },
    { name: "livescript", fileExtensions: ["ls"] },
    { name: "erlang", fileExtensions: ["erl"] },
    { name: "twig", fileExtensions: ["twig"] },
    { name: "julia", fileExtensions: ["jl"] },
    { name: "elm", fileExtensions: ["elm"] },
    { name: "purescript", fileExtensions: ["pure", "purs"] },
    { name: "smarty", fileExtensions: ["tpl"] },
    { name: "stylus", fileExtensions: ["styl"] },
    { name: "reason", fileExtensions: ["re", "rei"] },
    { name: "bucklescript", fileExtensions: ["cmj"] },
    { name: "merlin", fileExtensions: ["merlin"] },
    { name: "verilog", fileExtensions: ["vhd", "sv", "svh"] },
    { name: "mathematica", fileExtensions: ["nb"] },
    { name: "wolframlanguage", fileExtensions: ["wl", "wls"] },
    { name: "nunjucks", fileExtensions: ["njk", "nunjucks"] },
    { name: "robot", fileExtensions: ["robot"] },
    { name: "solidity", fileExtensions: ["sol"] },
    { name: "autoit", fileExtensions: ["au3"] },
    { name: "haml", fileExtensions: ["haml"] },
    { name: "yang", fileExtensions: ["yang"] },
    {
      name: "mjml",
      fileExtensions: ["mjml"],
      fileNames: [".mjmlconfig"]
    },
    {
      name: "vercel",
      fileNames: ["vercel.json", ".vercelignore", "now.json", ".nowignore"],
      light: true
    },
    {
      name: "liara",
      fileNames: ["liara.json", ".liaraignore"]
    },
    {
      name: "verdaccio",
      fileNames: ["verdaccio.yml"]
    },
    {
      name: "payload",
      fileNames: [
        "payload.config.js",
        "payload.config.mjs",
        "payload.config.ts",
        "payload.config.mts"
      ],
      light: true
    },
    {
      name: "next",
      fileNames: [
        "next.config.js",
        "next.config.mjs",
        "next.config.ts",
        "next.config.mts"
      ],
      light: true
    },
    {
      name: "remark",
      fileNames: [
        ".remarkrc",
        ".remarkrc.cjs",
        ".remarkrc.js",
        ".remarkrc.json",
        ".remarkrc.mjs",
        ".remarkrc.yaml",
        ".remarkrc.yml",
        ".remarkignore"
      ]
    },
    {
      name: "remix",
      fileNames: ["remix.config.js", "remix.config.ts"],
      light: true
    },
    {
      name: "terraform",
      fileExtensions: ["tf", "tf.json", "tfvars", "tfstate", "tfbackend"]
    },
    {
      name: "laravel",
      fileExtensions: ["blade.php", "inky.php"],
      fileNames: ["artisan"]
    },
    { name: "applescript", fileExtensions: ["applescript", "ipa"] },
    { name: "cake", fileExtensions: ["cake"] },
    { name: "cucumber", fileExtensions: ["feature", "features"] },
    { name: "nim", fileExtensions: ["nim", "nimble"] },
    { name: "apiblueprint", fileExtensions: ["apib", "apiblueprint"] },
    { name: "riot", fileExtensions: ["riot", "tag"] },
    { name: "vfl", fileExtensions: ["vfl"], fileNames: [".vfl"] },
    { name: "kl", fileExtensions: ["kl"], fileNames: [".kl"] },
    {
      name: "postcss",
      fileExtensions: ["pcss", "sss"],
      patterns: {
        postcss: "cosmiconfig" /* Cosmiconfig */
      }
    },
    {
      name: "posthtml",
      patterns: {
        posthtml: "cosmiconfig" /* Cosmiconfig */
      }
    },
    {
      name: "todo",
      fileExtensions: ["todo"],
      fileNames: ["todo.md", "todos.md"]
    },
    { name: "coldfusion", fileExtensions: ["cfml", "cfc", "lucee", "cfm"] },
    {
      name: "cabal",
      fileExtensions: ["cabal"],
      fileNames: [
        "cabal.project",
        "cabal.project.freeze",
        "cabal.project.local"
      ]
    },
    { name: "nix", fileExtensions: ["nix"] },
    { name: "slim", fileExtensions: ["slim"] },
    { name: "http", fileExtensions: ["http", "rest"], fileNames: ["CNAME"] },
    { name: "restql", fileExtensions: ["rql", "restql"] },
    { name: "kivy", fileExtensions: ["kv"] },
    {
      name: "graphcool",
      fileExtensions: ["graphcool"],
      fileNames: ["project.graphcool"]
    },
    { name: "sbt", fileExtensions: ["sbt"] },
    {
      name: "webpack",
      fileNames: ["webpack.config.coffee"],
      patterns: {
        "webpack.base": "ecmascript" /* Ecmascript */,
        "webpack.client": "ecmascript" /* Ecmascript */,
        "webpack.common": "ecmascript" /* Ecmascript */,
        "webpack.config.babel": "ecmascript" /* Ecmascript */,
        "webpack.config.base.babel": "ecmascript" /* Ecmascript */,
        "webpack.config.base": "ecmascript" /* Ecmascript */,
        "webpack.config.client": "ecmascript" /* Ecmascript */,
        "webpack.config.common.babel": "ecmascript" /* Ecmascript */,
        "webpack.config.common": "ecmascript" /* Ecmascript */,
        "webpack.config.dev.babel": "ecmascript" /* Ecmascript */,
        "webpack.config.dev": "ecmascript" /* Ecmascript */,
        "webpack.config.main": "ecmascript" /* Ecmascript */,
        "webpack.config.prod.babel": "ecmascript" /* Ecmascript */,
        "webpack.config.prod": "ecmascript" /* Ecmascript */,
        "webpack.config.production.babel": "ecmascript" /* Ecmascript */,
        "webpack.config.production": "ecmascript" /* Ecmascript */,
        "webpack.config.renderer": "ecmascript" /* Ecmascript */,
        "webpack.config.server": "ecmascript" /* Ecmascript */,
        "webpack.config.staging.babel": "ecmascript" /* Ecmascript */,
        "webpack.config.staging": "ecmascript" /* Ecmascript */,
        "webpack.config.test": "ecmascript" /* Ecmascript */,
        "webpack.config.vendor.production": "ecmascript" /* Ecmascript */,
        "webpack.config.vendor": "ecmascript" /* Ecmascript */,
        "webpack.config": "ecmascript" /* Ecmascript */,
        "webpack.dev": "ecmascript" /* Ecmascript */,
        "webpack.development": "ecmascript" /* Ecmascript */,
        "webpack.dist": "ecmascript" /* Ecmascript */,
        "webpack.mix": "ecmascript" /* Ecmascript */,
        "webpack.prod.config": "ecmascript" /* Ecmascript */,
        "webpack.prod": "ecmascript" /* Ecmascript */,
        "webpack.production": "ecmascript" /* Ecmascript */,
        "webpack.server": "ecmascript" /* Ecmascript */,
        "webpack.test": "ecmascript" /* Ecmascript */,
        webpack: "ecmascript" /* Ecmascript */,
        webpackfile: "ecmascript" /* Ecmascript */
      }
    },
    { name: "ionic", fileNames: ["ionic.config.json", ".io-config.json"] },
    {
      name: "gulp",
      fileNames: [
        "gulpfile.js",
        "gulpfile.mjs",
        "gulpfile.ts",
        "gulpfile.cts",
        "gulpfile.mts",
        "gulpfile.babel.js"
      ]
    },
    {
      name: "nodejs",
      fileNames: [
        "package.json",
        "package-lock.json",
        ".nvmrc",
        ".esmrc",
        ".node-version"
      ]
    },
    { name: "npm", fileNames: [".npmignore", ".npmrc"] },
    {
      name: "yarn",
      fileNames: [
        ".yarnrc",
        "yarn.lock",
        ".yarnclean",
        ".yarn-integrity",
        "yarn-error.log",
        ".yarnrc.yml",
        ".yarnrc.yaml"
      ]
    },
    {
      name: "android",
      fileNames: ["androidmanifest.xml"],
      fileExtensions: ["apk", "smali", "dex"]
    },
    {
      name: "tune",
      fileExtensions: ["env"],
      fileNames: [
        ".env.defaults",
        ".env.example",
        ".env.sample",
        ".env.template",
        ".env.schema",
        ".env.local",
        ".env.dev",
        ".env.development",
        ".env.alpha",
        ".env.e2e",
        ".env.qa",
        ".env.dist",
        ".env.prod",
        ".env.production",
        ".env.stage",
        ".env.staging",
        ".env.preview",
        ".env.test",
        ".env.testing",
        ".env.development.local",
        ".env.qa.local",
        ".env.production.local",
        ".env.staging.local",
        ".env.test.local",
        ".env.uat",
        ".vars"
      ]
    },
    {
      name: "turborepo",
      light: true,
      fileNames: ["turbo.json"]
    },
    {
      name: "babel",
      fileNames: ["babel-transform.js"],
      patterns: {
        babel: "cosmiconfig" /* Cosmiconfig */,
        "babel-plugin-macros": "cosmiconfig" /* Cosmiconfig */
      }
    },
    {
      name: "blitz",
      fileNames: [
        "blitz.config.js",
        "blitz.config.ts",
        ".blitz.config.compiled.js"
      ]
    },
    {
      name: "contributing",
      fileNames: [
        "contributing.md",
        "contributing.rst",
        "contributing.txt",
        "contributing"
      ]
    },
    {
      name: "readme",
      fileNames: ["readme.md", "readme.rst", "readme.txt", "readme"]
    },
    {
      name: "changelog",
      fileNames: [
        "changelog",
        "changelog.md",
        "changelog.rst",
        "changelog.txt",
        "changes",
        "changes.md",
        "changes.rst",
        "changes.txt"
      ]
    },
    {
      name: "architecture",
      fileNames: [
        "architecture.md",
        "architecture.rst",
        "architecture.txt",
        "architecture"
      ]
    },
    {
      name: "credits",
      fileNames: ["credits.md", "credits.rst", "credits.txt", "credits"]
    },
    {
      name: "authors",
      fileNames: [
        "authors.md",
        "authors.rst",
        "authors.txt",
        "authors",
        "contributors.md",
        "contributors.rst",
        "contributors.txt",
        "contributors"
      ]
    },
    { name: "flow", fileNames: [".flowconfig"] },
    { name: "favicon", fileNames: ["favicon.ico"] },
    {
      name: "karma",
      fileNames: [
        "karma.conf.js",
        "karma.conf.ts",
        "karma.conf.coffee",
        "karma.config.js",
        "karma.config.ts",
        "karma-main.js",
        "karma-main.ts"
      ]
    },
    { name: "bithound", fileNames: [".bithoundrc"] },
    {
      name: "svgo",
      fileNames: ["svgo.config.js", "svgo.config.cjs", "svgo.config.mjs"]
    },
    { name: "appveyor", fileNames: [".appveyor.yml", "appveyor.yml"] },
    { name: "travis", fileNames: [".travis.yml"] },
    {
      name: "codecov",
      fileNames: [
        ".codecov.yml",
        "codecov.yml",
        ".codecov.yaml",
        "codecov.yaml"
      ]
    },
    {
      name: "sonarcloud",
      fileNames: [
        "sonar-project.properties",
        ".sonarcloud.properties",
        "sonarcloud.yaml"
      ]
    },
    {
      name: "protractor",
      fileNames: [
        "protractor.conf.js",
        "protractor.conf.ts",
        "protractor.conf.coffee",
        "protractor.config.js",
        "protractor.config.ts"
      ]
    },
    { name: "fusebox", fileNames: ["fuse.js"] },
    { name: "heroku", fileNames: ["procfile", "procfile.windows"] },
    { name: "editorconfig", fileNames: [".editorconfig"] },
    { name: "gitlab", fileExtensions: ["gitlab-ci.yml"] },
    { name: "bower", fileNames: [".bowerrc", "bower.json"] },
    {
      name: "eslint",
      fileNames: [
        ".eslintrc-md.js",
        ".eslintrc-jsdoc.js",
        ".eslintrc.base.json",
        ".eslintignore",
        ".eslintcache"
      ],
      patterns: {
        eslint: "cosmiconfig" /* Cosmiconfig */
      }
    },
    {
      name: "conduct",
      fileNames: [
        "code_of_conduct.md",
        "code_of_conduct.txt",
        "code_of_conduct"
      ]
    },
    { name: "watchman", fileNames: [".watchmanconfig"] },
    { name: "aurelia", fileNames: ["aurelia.json"] },
    {
      name: "auto",
      fileNames: [
        ".autorc",
        "auto.config.js",
        "auto.config.ts",
        "auto-config.json",
        "auto-config.yaml",
        "auto-config.yml",
        "auto-config.ts",
        "auto-config.js"
      ],
      light: true
    },
    {
      name: "mocha",
      fileNames: [
        "mocha.opts",
        ".mocharc.yml",
        ".mocharc.yaml",
        ".mocharc.js",
        ".mocharc.json",
        ".mocharc.jsonc"
      ]
    },
    {
      name: "jenkins",
      fileNames: ["jenkinsfile"],
      fileExtensions: ["jenkinsfile", "jenkins"]
    },
    {
      name: "firebase",
      fileNames: [
        "firebase.json",
        ".firebaserc",
        "firestore.rules",
        "firestore.indexes.json"
      ]
    },
    {
      name: "figma",
      fileExtensions: ["fig"]
    },
    {
      name: "rollup",
      fileNames: [
        "rollup.config.js",
        "rollup.config.mjs",
        "rollup.config.ts",
        "rollup-config.js",
        "rollup-config.mjs",
        "rollup-config.ts",
        "rollup.config.common.js",
        "rollup.config.common.mjs",
        "rollup.config.common.ts",
        "rollup.config.base.js",
        "rollup.config.base.mjs",
        "rollup.config.base.ts",
        "rollup.config.prod.js",
        "rollup.config.prod.mjs",
        "rollup.config.prod.ts",
        "rollup.config.dev.js",
        "rollup.config.dev.mjs",
        "rollup.config.dev.ts",
        "rollup.config.prod.vendor.js",
        "rollup.config.prod.vendor.mjs",
        "rollup.config.prod.vendor.ts"
      ]
    },
    { name: "hack", fileNames: [".hhconfig"] },
    { name: "huff", fileExtensions: ["huff"], light: true },
    { name: "hardhat", fileNames: ["hardhat.config.js", "hardhat.config.ts"] },
    {
      name: "stylelint",
      light: true,
      fileNames: [".stylelintignore", ".stylelintcache"],
      patterns: {
        stylelint: "cosmiconfig" /* Cosmiconfig */
      }
    },
    { name: "code-climate", fileNames: [".codeclimate.yml"], light: true },
    {
      name: "prettier",
      fileNames: [".prettierignore"],
      patterns: {
        prettier: "cosmiconfig" /* Cosmiconfig */
      }
    },
    {
      name: "renovate",
      fileNames: [
        ".renovaterc",
        ".renovaterc.json",
        "renovate-config.json",
        "renovate.json",
        "renovate.json5"
      ]
    },
    { name: "apollo", fileNames: ["apollo.config.js"] },
    { name: "nodemon", fileNames: ["nodemon.json", "nodemon-debug.json"] },
    {
      name: "ngrx-reducer",
      fileExtensions: ["reducer.ts", "rootReducer.ts"],
      enabledFor: ["angular_ngrx" /* Ngrx */]
    },
    {
      name: "ngrx-state",
      fileExtensions: ["state.ts"],
      enabledFor: ["angular_ngrx" /* Ngrx */]
    },
    {
      name: "ngrx-actions",
      fileExtensions: ["actions.ts"],
      enabledFor: ["angular_ngrx" /* Ngrx */]
    },
    {
      name: "ngrx-effects",
      fileExtensions: ["effects.ts"],
      enabledFor: ["angular_ngrx" /* Ngrx */]
    },
    {
      name: "ngrx-entity",
      fileNames: [".entity"],
      enabledFor: ["angular_ngrx" /* Ngrx */]
    },
    {
      name: "ngrx-selectors",
      fileExtensions: ["selectors.ts"],
      enabledFor: ["angular_ngrx" /* Ngrx */]
    },
    { name: "webhint", fileNames: [".hintrc"] },
    {
      name: "browserlist",
      fileNames: ["browserslist", ".browserslistrc"],
      light: true
    },
    { name: "crystal", fileExtensions: ["cr", "ecr"], light: true },
    { name: "snyk", fileNames: [".snyk"] },
    {
      name: "drone",
      fileExtensions: ["drone.yml"],
      fileNames: [".drone.yml"],
      light: true
    },
    { name: "cuda", fileExtensions: ["cu", "cuh"] },
    { name: "log", fileExtensions: ["log"] },
    { name: "dotjs", fileExtensions: ["def", "dot", "jst"] },
    { name: "ejs", fileExtensions: ["ejs"] },
    { name: "sequelize", fileNames: [".sequelizerc"] },
    {
      name: "gatsby",
      fileNames: [
        "gatsby-config.js",
        "gatsby-config.mjs",
        "gatsby-config.ts",
        "gatsby-node.js",
        "gatsby-node.mjs",
        "gatsby-node.ts",
        "gatsby-browser.js",
        "gatsby-browser.tsx",
        "gatsby-ssr.js",
        "gatsby-ssr.tsx"
      ]
    },
    {
      name: "wakatime",
      fileNames: [".wakatime-project"],
      fileExtensions: [".wakatime-project"],
      light: true
    },
    { name: "circleci", fileNames: ["circle.yml"], light: true },
    { name: "cloudfoundry", fileNames: [".cfignore"] },
    {
      name: "grunt",
      fileNames: [
        "gruntfile.js",
        "gruntfile.ts",
        "gruntfile.cjs",
        "gruntfile.cts",
        "gruntfile.coffee",
        "gruntfile.babel.js",
        "gruntfile.babel.ts",
        "gruntfile.babel.coffee"
      ]
    },
    {
      name: "jest",
      fileNames: [
        "jest.config.js",
        "jest.config.cjs",
        "jest.config.mjs",
        "jest.config.ts",
        "jest.config.cts",
        "jest.config.mts",
        "jest.config.json",
        "jest.e2e.config.js",
        "jest.e2e.config.cjs",
        "jest.e2e.config.mjs",
        "jest.e2e.config.ts",
        "jest.e2e.config.cts",
        "jest.e2e.config.mts",
        "jest.e2e.config.json",
        "jest.e2e.json",
        "jest-unit.config.js",
        "jest-e2e.config.js",
        "jest-e2e.config.cjs",
        "jest-e2e.config.mjs",
        "jest-e2e.config.ts",
        "jest-e2e.config.cts",
        "jest-e2e.config.mts",
        "jest-e2e.config.json",
        "jest-e2e.json",
        "jest-github-actions-reporter.js",
        "jest.setup.js",
        "jest.setup.ts",
        "jest.json",
        ".jestrc",
        ".jestrc.js",
        ".jestrc.json",
        "jest.teardown.js",
        "jest-preset.json",
        "jest-preset.js",
        "jest-preset.cjs",
        "jest-preset.mjs",
        "jest.preset.js",
        "jest.preset.mjs",
        "jest.preset.cjs",
        "jest.preset.json"
      ]
    },
    { name: "processing", fileExtensions: ["pde"] },
    {
      name: "storybook",
      fileExtensions: [
        "stories.js",
        "stories.jsx",
        "stories.mdx",
        "story.js",
        "story.jsx",
        "stories.ts",
        "stories.tsx",
        "story.ts",
        "story.tsx",
        "stories.svelte",
        "story.mdx"
      ]
    },
    { name: "wepy", fileExtensions: ["wpy"] },
    { name: "fastlane", fileNames: ["fastfile", "appfile"] },
    { name: "hcl", fileExtensions: ["hcl"], light: true },
    { name: "helm", fileNames: [".helmignore"] },
    { name: "san", fileExtensions: ["san"] },
    {
      name: "quokka",
      fileExtensions: ["quokka.js", "quokka.ts", "quokka.jsx", "quokka.tsx"]
    },
    { name: "wallaby", fileNames: ["wallaby.js", "wallaby.conf.js"] },
    { name: "django", fileExtensions: ["djt"] },
    { name: "stencil", fileNames: ["stencil.config.js", "stencil.config.ts"] },
    { name: "red", fileExtensions: ["red"] },
    {
      name: "makefile",
      fileExtensions: ["mk"],
      fileNames: ["makefile", "gnumakefile", "kbuild"]
    },
    { name: "foxpro", fileExtensions: ["fxp", "prg"] },
    { name: "i18n", fileExtensions: ["pot", "po", "mo", "lang", "xlf"] },
    { name: "webassembly", fileExtensions: ["wat", "wasm"] },
    {
      name: "semantic-release",
      light: true,
      patterns: {
        release: "cosmiconfig" /* Cosmiconfig */
      }
    },
    {
      name: "bitbucket",
      fileNames: ["bitbucket-pipelines.yaml", "bitbucket-pipelines.yml"]
    },
    { name: "jupyter", fileExtensions: ["ipynb"] },
    { name: "d", fileExtensions: ["d"] },
    { name: "mdx", fileExtensions: ["mdx"] },
    { name: "mdsvex", fileExtensions: ["svx"] },
    { name: "ballerina", fileExtensions: ["bal", "balx"] },
    { name: "racket", fileExtensions: ["rkt"] },
    {
      name: "bazel",
      fileExtensions: ["bzl", "bazel"],
      fileNames: [".bazelignore", ".bazelrc", ".bazelversion"]
    },
    { name: "mint", fileExtensions: ["mint"] },
    { name: "velocity", fileExtensions: ["vm", "fhtml", "vtl"] },
    { name: "godot", fileExtensions: ["gd"] },
    {
      name: "godot-assets",
      fileExtensions: [
        "godot",
        "tres",
        "tscn",
        "gdns",
        "gdnlib",
        "gdshader",
        "gdshaderinc",
        "gdextension"
      ],
      fileNames: [".gdignore", "._sc_", "_sc_"]
    },
    {
      name: "azure-pipelines",
      fileNames: [
        "azure-pipelines.yml",
        "azure-pipelines.yaml",
        "azure-pipelines-main.yml",
        "azure-pipelines-main.yaml"
      ],
      fileExtensions: [
        "azure-pipelines.yml",
        "azure-pipelines.yaml",
        "azure-pipelines-main.yml",
        "azure-pipelines-main.yaml"
      ]
    },
    { name: "azure", fileExtensions: ["azcli"] },
    {
      name: "vagrant",
      fileNames: ["vagrantfile"],
      fileExtensions: ["vagrantfile"]
    },
    { name: "prisma", fileNames: ["prisma.yml"], fileExtensions: ["prisma"] },
    { name: "razor", fileExtensions: ["cshtml", "vbhtml"] },
    { name: "abc", fileExtensions: ["abc"] },
    { name: "asciidoc", fileExtensions: ["ad", "adoc", "asciidoc"] },
    {
      name: "istanbul",
      fileNames: [
        ".nycrc",
        ".nycrc.json",
        ".nycrc.yaml",
        ".nycrc.yml",
        "nyc.config.js",
        ".istanbul.yml"
      ]
    },
    { name: "edge", fileExtensions: ["edge"] },
    { name: "scheme", fileExtensions: ["ss", "scm"] },
    { name: "lisp", fileExtensions: ["lisp", "lsp", "cl", "fast"] },
    {
      name: "tailwindcss",
      fileNames: [
        "tailwind.js",
        "tailwind.ts",
        "tailwind.config.js",
        "tailwind.config.cjs",
        "tailwind.config.mjs",
        "tailwind.config.ts",
        "tailwind.config.cts",
        "tailwind.config.mts"
      ]
    },
    {
      name: "3d",
      fileExtensions: [
        "stl",
        "stp",
        "obj",
        "o",
        "ac",
        "blend",
        "dxf",
        "fbx",
        "mesh",
        "mqo",
        "pmd",
        "pmx",
        "skp",
        "vac",
        "vdp",
        "vox"
      ]
    },
    { name: "buildkite", fileNames: ["buildkite.yml", "buildkite.yaml"] },
    {
      name: "netlify",
      fileNames: [
        "netlify.json",
        "netlify.yml",
        "netlify.yaml",
        "netlify.toml"
      ],
      light: true
    },
    { name: "svg", fileExtensions: ["svg"] },
    {
      name: "svelte",
      fileExtensions: ["svelte"],
      fileNames: ["svelte.config.js", "svelte.config.cjs"]
    },
    {
      name: "vim",
      fileExtensions: ["vimrc", "gvimrc", "exrc", "vim", "viminfo"]
    },
    {
      name: "nest",
      fileNames: [
        "nest-cli.json",
        ".nest-cli.json",
        "nestconfig.json",
        ".nestconfig.json"
      ]
    },
    {
      name: "nest-controller",
      clone: {
        base: "nest",
        color: "light-blue-700"
      },
      fileExtensions: ["controller.ts", "controller.js"],
      enabledFor: ["nest" /* Nest */]
    },
    {
      name: "nest-middleware",
      clone: {
        base: "nest",
        color: "indigo-400"
      },
      fileExtensions: ["middleware.ts", "middleware.js"],
      enabledFor: ["nest" /* Nest */]
    },
    {
      name: "nest-module",
      clone: {
        base: "nest",
        color: "red-600"
      },
      fileExtensions: ["module.ts", "module.js"],
      enabledFor: ["nest" /* Nest */]
    },
    {
      name: "nest-service",
      clone: {
        base: "nest",
        color: "amber-400"
      },
      fileExtensions: ["service.ts", "service.js"],
      enabledFor: ["nest" /* Nest */]
    },
    {
      name: "nest-decorator",
      clone: {
        base: "nest",
        color: "purple-400"
      },
      fileExtensions: ["decorator.ts", "decorator.js"],
      enabledFor: ["nest" /* Nest */]
    },
    {
      name: "nest-pipe",
      clone: {
        base: "nest",
        color: "teal-600"
      },
      fileExtensions: ["pipe.ts", "pipe.js"],
      enabledFor: ["nest" /* Nest */]
    },
    {
      name: "nest-filter",
      clone: {
        base: "nest",
        color: "deep-orange-400"
      },
      fileExtensions: ["filter.ts", "filter.js"],
      enabledFor: ["nest" /* Nest */]
    },
    {
      name: "nest-gateway",
      clone: {
        base: "nest",
        color: "lime-700"
      },
      fileExtensions: ["gateway.ts", "gateway.js"],
      enabledFor: ["nest" /* Nest */]
    },
    {
      name: "nest-guard",
      clone: {
        base: "nest",
        color: "green-600"
      },
      fileExtensions: ["guard.ts", "guard.js"],
      enabledFor: ["nest" /* Nest */]
    },
    {
      name: "nest-resolver",
      clone: {
        base: "nest",
        color: "pink-400"
      },
      fileExtensions: ["resolver.ts", "resolver.js"],
      enabledFor: ["nest" /* Nest */]
    },
    { name: "moon", fileNames: ["moon.yml"] },
    { name: "moonscript", fileExtensions: ["moon"] },
    { name: "percy", fileNames: [".percy.yml"] },
    { name: "gitpod", fileNames: [".gitpod.yml"] },
    { name: "advpl", fileExtensions: ["prw", "prx"] },
    {
      name: "advpl-ptm",
      clone: {
        base: "advpl",
        color: "red-400"
      },
      fileExtensions: ["ptm"]
    },
    {
      name: "advpl-tlpp",
      clone: {
        base: "advpl",
        color: "yellow-700"
      },
      fileExtensions: ["tlpp"]
    },
    {
      name: "advpl-include",
      clone: {
        base: "advpl",
        color: "cyan-500"
      },
      fileExtensions: ["ch"]
    },
    { name: "codeowners", fileNames: ["codeowners", "OWNERS"] },
    { name: "gcp", fileNames: [".gcloudignore"] },
    { name: "amplify", fileNames: ["amplify.yml"] },
    {
      name: "disc",
      fileExtensions: ["iso", "vmdk", "hdd", "qcow", "qcow2", "qed", "dmg"]
    },
    {
      name: "fortran",
      fileExtensions: ["f", "f77", "f90", "f95", "f03", "f08"]
    },
    { name: "tcl", fileExtensions: ["tcl"] },
    { name: "liquid", fileExtensions: ["liquid"] },
    { name: "prolog", fileExtensions: ["p", "pro", "pl"] },
    {
      name: "husky",
      patterns: {
        husky: "cosmiconfig" /* Cosmiconfig */
      }
    },
    { name: "coconut", fileExtensions: ["coco"] },
    { name: "tilt", fileNames: ["tiltfile"] },
    {
      name: "capacitor",
      fileNames: ["capacitor.config.json", "capacitor.config.ts"]
    },
    { name: "sketch", fileExtensions: ["sketch"] },
    { name: "pawn", fileExtensions: ["pwn", "amx"] },
    { name: "adonis", fileNames: [".adonisrc.json", "ace"] },
    { name: "forth", fileExtensions: ["4th", "fth", "frt"] },
    {
      name: "uml",
      fileExtensions: ["iuml", "pu", "puml", "plantuml", "wsd"],
      light: true
    },
    {
      name: "meson",
      fileNames: ["meson.build", "meson_options.txt"],
      fileExtensions: ["wrap"]
    },
    {
      name: "commitlint",
      fileNames: [".commitlint.yaml", ".commitlint.yml"],
      patterns: {
        commitlint: "cosmiconfig" /* Cosmiconfig */
      }
    },
    { name: "buck", fileNames: [".buckconfig"] },
    { name: "dhall", fileExtensions: ["dhall", "dhallb"] },
    {
      name: "sml",
      fileExtensions: [
        "sml",
        "mlton",
        "mlb",
        "sig",
        "fun",
        "cm",
        "lex",
        "use",
        "grm"
      ]
    },
    { name: "nx", fileNames: ["nx.json", ".nxignore"] },
    { name: "opam", fileExtensions: ["opam"] },
    {
      name: "dune",
      fileNames: [
        "dune",
        "dune-project",
        "dune-workspace",
        "dune-workspace.dev"
      ]
    },
    { name: "imba", fileExtensions: ["imba"] },
    { name: "drawio", fileExtensions: ["drawio", "dio"] },
    { name: "pascal", fileExtensions: ["pas"] },
    { name: "shaderlab", fileExtensions: ["unity"] },
    {
      name: "roadmap",
      fileNames: [
        "roadmap.md",
        "roadmap.txt",
        "timeline.md",
        "timeline.txt",
        "milestones.md",
        "milestones.txt"
      ]
    },
    {
      name: "sas",
      fileExtensions: ["sas", "sas7bdat", "sashdat", "astore", "ast", "sast"]
    },
    {
      name: "nuget",
      fileNames: ["nuget.config", ".nuspec", "nuget.exe"],
      fileExtensions: ["nupkg"]
    },
    { name: "command", fileExtensions: ["command"] },
    {
      name: "stryker",
      fileNames: [
        "stryker.conf.json",
        "stryker.conf.js",
        "stryker.conf.cjs",
        "stryker.conf.mjs",
        ".stryker.conf.json",
        ".stryker.conf.js",
        ".stryker.conf.cjs",
        ".stryker.conf.mjs"
      ]
    },
    { name: "denizenscript", fileExtensions: ["dsc"] },
    {
      name: "modernizr",
      fileNames: [".modernizrrc", ".modernizrrc.js", ".modernizrrc.json"]
    },
    { name: "slug", fileNames: [".slugignore"] },
    { name: "search", fileExtensions: ["code-search"] },
    {
      name: "stitches",
      fileNames: ["stitches.config.js", "stitches.config.ts"],
      light: true
    },
    {
      name: "nginx",
      fileNames: ["nginx.conf"],
      fileExtensions: ["nginx", "nginxconf", "nginxconfig"]
    },
    {
      name: "minecraft",
      fileExtensions: [
        "mcfunction",
        "mcmeta",
        "mcr",
        "mca",
        "mcgame",
        "mclevel",
        "mcworld",
        "mine",
        "mus",
        "mcstructure",
        "mcpack",
        "mcaddon",
        "mctemplate",
        "mcproject"
      ],
      fileNames: [".mcattributes", ".mcdefinitions", ".mcignore"]
    },
    { name: "replit", fileNames: [".replit"] },
    { name: "rescript", fileExtensions: ["res"] },
    { name: "rescript-interface", fileExtensions: ["resi"] },
    {
      name: "snowpack",
      fileNames: [
        "snowpack.config.js",
        "snowpack.config.cjs",
        "snowpack.config.mjs",
        "snowpack.config.ts",
        "snowpack.config.cts",
        "snowpack.config.mts",
        "snowpack.deps.json",
        "snowpack.config.json"
      ],
      light: true
    },
    { name: "brainfuck", fileExtensions: ["b", "bf"] },
    { name: "bicep", fileExtensions: ["bicep"] },
    { name: "cobol", fileExtensions: ["cob", "cbl"] },
    { name: "grain", fileExtensions: ["gr"] },
    { name: "lolcode", fileExtensions: ["lol"] },
    { name: "idris", fileExtensions: ["idr", "ibc"] },
    { name: "quasar", fileNames: ["quasar.conf.js", "quasar.config.js"] },
    { name: "dependabot", fileNames: ["dependabot.yml", "dependabot.yaml"] },
    { name: "pipeline", fileExtensions: ["pipeline"] },
    {
      name: "vite",
      patterns: {
        "vite.config": "ecmascript" /* Ecmascript */
      }
    },
    {
      name: "vitest",
      patterns: {
        "vitest.workspace": "ecmascript" /* Ecmascript */,
        "vitest.config": "ecmascript" /* Ecmascript */
      }
    },
    {
      name: "velite",
      patterns: {
        "velite.config": "ecmascript" /* Ecmascript */
      }
    },
    { name: "opa", fileExtensions: ["rego"] },
    { name: "lerna", fileNames: ["lerna.json"] },
    {
      name: "windicss",
      fileNames: [
        "windi.config.js",
        "windi.config.cjs",
        "windi.config.ts",
        "windi.config.cts",
        "windi.config.json"
      ],
      fileExtensions: ["windi"]
    },
    {
      name: "textlint",
      fileNames: [
        ".textlintrc",
        ".textlintrc.js",
        ".textlintrc.json",
        ".textlintrc.yml",
        ".textlintrc.yaml"
      ]
    },
    { name: "scala", fileExtensions: ["scala", "sc"] },
    { name: "lilypond", fileExtensions: ["ly"] },
    { name: "vlang", fileExtensions: ["v"], fileNames: ["vpkg.json", "v.mod"] },
    { name: "chess", fileExtensions: ["pgn", "fen"], light: true },
    { name: "gemini", fileExtensions: ["gmi", "gemini"] },
    {
      name: "sentry",
      fileNames: [".sentryclirc"],
      patterns: {
        "sentry.client.config": "ecmascript" /* Ecmascript */,
        "sentry.server.config": "ecmascript" /* Ecmascript */,
        "sentry.edge.config": "ecmascript" /* Ecmascript */
      }
    },
    {
      name: "phpunit",
      fileNames: [
        ".phpunit.result.cache",
        ".phpunit-watcher.yml",
        "phpunit.xml",
        "phpunit.xml.dist",
        "phpunit-watcher.yml",
        "phpunit-watcher.yml.dist"
      ]
    },
    {
      name: "php-cs-fixer",
      fileNames: [
        ".php_cs",
        ".php_cs.dist",
        ".php_cs.php",
        ".php_cs.dist.php",
        ".php-cs-fixer.php",
        ".php-cs-fixer.dist.php"
      ]
    },
    { name: "robots", fileNames: ["robots.txt"] },
    {
      name: "tsconfig",
      fileNames: [
        "tsconfig.json",
        "tsconfig.app.json",
        "tsconfig.editor.json",
        "tsconfig.spec.json",
        "tsconfig.base.json",
        "tsconfig.build.json",
        "tsconfig.eslint.json",
        "tsconfig.lib.json",
        "tsconfig.lib.prod.json",
        "tsconfig.node.json",
        "tsconfig.test.json",
        "tsconfig.e2e.json",
        "tsconfig.web.json",
        "tsconfig.webworker.json",
        "tsconfig.worker.json",
        "tsconfig.config.json",
        "tsconfig.vitest.json",
        "tsconfig.cjs.json",
        "tsconfig.esm.json",
        "tsconfig.mjs.json",
        "tsconfig.doc.json",
        "tsconfig.paths.json",
        "tsconfig.main.json",
        "tsconfig.renderer.json",
        "tsconfig.server.json"
      ],
      fileExtensions: ["tsconfig.json"]
    },
    {
      name: "tauri",
      fileNames: [
        "tauri.conf.json",
        "tauri.config.json",
        "tauri.linux.conf.json",
        "tauri.windows.conf.json",
        "tauri.macos.conf.json",
        ".taurignore"
      ],
      fileExtensions: ["tauri"]
    },
    {
      name: "jsconfig",
      fileNames: ["jsconfig.json"],
      fileExtensions: ["jsconfig.json"]
    },
    {
      name: "maven",
      fileNames: ["maven.config", "jvm.config", "pom.xml"]
    },
    { name: "ada", fileExtensions: ["ada", "adb", "ads", "ali"] },
    {
      name: "serverless",
      fileNames: [
        "serverless.yml",
        "serverless.yaml",
        "serverless.json",
        "serverless.js",
        "serverless.ts"
      ]
    },
    {
      name: "supabase",
      fileNames: ["supabase.js", "supabase.py"]
    },
    {
      name: "ember",
      fileNames: [".ember-cli", ".ember-cli.js", "ember-cli-builds.js"]
    },
    {
      name: "horusec",
      fileNames: ["horusec-config.json"],
      fileExtensions: ["horusec-config.json"]
    },
    { name: "poetry", fileNames: ["poetry.lock"] },
    {
      name: "pdm",
      fileNames: ["pdm.lock", "pdm.toml", ".pdm-python"],
      fileExtensions: ["pdm.lock", "pdm.toml"]
    },
    { name: "coala", fileExtensions: ["coarc", "coafile"] },
    { name: "parcel", fileNames: [".parcelrc"] },
    {
      name: "dinophp",
      fileExtensions: ["bubble", "html.bubble", "php.bubble"]
    },
    { name: "teal", fileExtensions: ["tl"] },
    { name: "template", fileExtensions: ["template"] },
    { name: "astyle", fileNames: [".astylerc"] },
    {
      name: "shader",
      fileExtensions: [
        "glsl",
        "vert",
        "tesc",
        "tese",
        "geom",
        "frag",
        "comp",
        "vert.glsl",
        "tesc.glsl",
        "tese.glsl",
        "geom.glsl",
        "frag.glsl",
        "comp.glsl",
        "vertex.glsl",
        "geometry.glsl",
        "fragment.glsl",
        "compute.glsl",
        "ts.glsl",
        "gs.glsl",
        "vs.glsl",
        "fs.glsl",
        "shader",
        "vertexshader",
        "fragmentshader",
        "geometryshader",
        "computeshader",
        "hlsl",
        "pixel.hlsl",
        "geometry.hlsl",
        "compute.hlsl",
        "tessellation.hlsl",
        "px.hlsl",
        "geom.hlsl",
        "comp.hlsl",
        "tess.hlsl",
        "wgsl"
      ]
    },
    {
      name: "lighthouse",
      fileNames: [
        ".lighthouserc.js",
        "lighthouserc.js",
        ".lighthouserc.cjs",
        "lighthouserc.cjs",
        ".lighthouserc.json",
        "lighthouserc.json",
        ".lighthouserc.yml",
        "lighthouserc.yml",
        ".lighthouserc.yaml",
        "lighthouserc.yaml"
      ]
    },
    {
      name: "svgr",
      patterns: {
        svgr: "cosmiconfig" /* Cosmiconfig */
      }
    },
    { name: "rome", fileNames: ["rome.json"] },
    {
      name: "cypress",
      fileNames: ["cypress.json", "cypress.env.json"],
      patterns: {
        "cypress.config": "ecmascript" /* Ecmascript */
      }
    },
    { name: "siyuan", fileExtensions: ["sy"] },
    { name: "ndst", fileExtensions: ["ndst.yml", "ndst.yaml", "ndst.json"] },
    {
      name: "plop",
      fileNames: ["plopfile.js", "plopfile.cjs", "plopfile.mjs", "plopfile.ts"]
    },
    { name: "tobi", fileExtensions: ["tobi"] },
    { name: "tobimake", fileNames: [".tobimake"] },
    { name: "gleam", fileNames: ["gleam.toml"], fileExtensions: ["gleam"] },
    {
      name: "pnpm",
      light: true,
      fileNames: ["pnpm-lock.yaml", "pnpm-workspace.yaml", ".pnpmfile.cjs"]
    },
    {
      name: "gridsome",
      fileNames: ["gridsome.config.js", "gridsome.server.js"]
    },
    {
      name: "steadybit",
      fileExtensions: ["steadybit.yml", "steadybit.yaml"],
      fileNames: [
        ".steadybit.yml",
        "steadybit.yml",
        ".steadybit.yaml",
        "steadybit.yaml"
      ]
    },
    { name: "capnp", fileExtensions: ["capnp"] },
    { name: "tree", fileExtensions: ["tree"] },
    {
      name: "cadence",
      fileExtensions: ["cdc"]
    },
    { name: "caddy", fileNames: ["Caddyfile"] },
    {
      name: "openapi",
      light: true,
      fileExtensions: ["openapi.json", "openapi.yml", "openapi.yaml"],
      fileNames: ["openapi.json", "openapi.yml", "openapi.yaml"]
    },
    {
      name: "swagger",
      fileExtensions: ["swagger.json", "swagger.yml", "swagger.yaml"],
      fileNames: ["swagger.json", "swagger.yml", "swagger.yaml"]
    },
    { name: "bun", fileNames: ["bun.lockb", "bunfig.toml"], light: true },
    { name: "antlr", fileExtensions: ["g4"] },
    { name: "stylable", fileExtensions: ["st.css"] },
    { name: "pinejs", fileExtensions: ["pine"] },
    {
      name: "nano-staged",
      light: true,
      fileNames: [
        ".nano-staged.js",
        "nano-staged.js",
        ".nano-staged.cjs",
        "nano-staged.cjs",
        ".nano-staged.mjs",
        "nano-staged.mjs",
        ".nano-staged.json",
        "nano-staged.json",
        ".nanostagedrc"
      ]
    },
    {
      name: "knip",
      fileNames: [
        "knip.json",
        "knip.jsonc",
        ".knip.json",
        ".knip.jsonc",
        "knip.ts",
        "knip.js",
        "knip.config.ts",
        "knip.config.js"
      ]
    },
    {
      name: "taskfile",
      fileExtensions: ["taskfile.yml", "taskfile.yaml"],
      fileNames: [
        "taskfile.yml",
        "taskfile.yaml",
        "taskfile.dist.yml",
        "taskfile.dist.yaml"
      ]
    },
    {
      name: "craco",
      patterns: {
        craco: "cosmiconfig" /* Cosmiconfig */
      }
    },
    {
      name: "gamemaker",
      fileExtensions: ["gml", "yy", "yyp", "yyz"]
    },
    { name: "tldraw", fileExtensions: ["tldr"], light: true },
    {
      name: "mercurial",
      fileNames: [
        ".hg",
        ".hgignore",
        ".hgflow",
        ".hgrc",
        "hgrc",
        "mercurial.ini"
      ]
    },
    {
      name: "deno",
      fileNames: ["deno.json", "deno.jsonc", "deno.lock"],
      light: true
    },
    {
      name: "plastic",
      fileNames: [
        "plastic.branchexplorer",
        "plastic.selector",
        "plastic.wktree",
        "plastic.workspace",
        "plastic.workspaces"
      ]
    },
    { name: "typst", fileExtensions: ["typ"] },
    {
      name: "unocss",
      fileNames: [
        "uno.config.js",
        "uno.config.mjs",
        "uno.config.ts",
        "uno.config.mts",
        "unocss.config.js",
        "unocss.config.mjs",
        "unocss.config.ts",
        "unocss.config.mts"
      ]
    },
    { name: "ifanr-cloud", fileNames: [".mincloudrc"] },
    { name: "concourse", fileNames: ["concourse.yml"] },
    { name: "qwik", fileExtensions: ["tsx"], enabledFor: ["qwik" /* Qwik */] },
    { name: "mermaid", fileExtensions: ["mmd", "mermaid"] },
    {
      name: "syncpack",
      patterns: {
        syncpack: "cosmiconfig" /* Cosmiconfig */
      }
    },
    {
      name: "mojo",
      fileExtensions: ["mojo", "\u{1F525}"]
    },
    {
      name: "werf",
      fileNames: [
        "werf.yaml",
        "werf.yml",
        "werf-giterminism.yaml",
        "werf-giterminism.yml"
      ]
    },
    { name: "roblox", fileExtensions: ["rbxl", "rbxlx", "rbxm", "rbxmx"] },
    {
      name: "panda",
      patterns: {
        "panda.config": "ecmascript" /* Ecmascript */
      }
    },
    { name: "biome", fileNames: ["biome.json", "biome.jsonc"] },
    {
      name: "esbuild",
      patterns: {
        esbuild: "ecmascript" /* Ecmascript */,
        "esbuild.config": "ecmascript" /* Ecmascript */
      }
    },
    { name: "spwn", fileExtensions: ["spwn"] },
    { name: "templ", fileExtensions: ["templ"] },
    { name: "chrome", fileExtensions: ["crx"] },
    { name: "stan", fileExtensions: ["stan"] },
    {
      name: "abap",
      fileExtensions: ["abap", "acds", "asddls"]
    },
    { name: "lottie", fileExtensions: ["lottie"] },
    {
      name: "puppeteer",
      patterns: {
        puppeteer: "cosmiconfig" /* Cosmiconfig */
      }
    },
    { name: "apps-script", fileExtensions: ["gs"] },
    {
      name: "pkl",
      fileExtensions: ["pkl"],
      fileNames: ["PklProject", "PklProject.deps.json"]
    },
    {
      name: "kubernetes",
      fileNames: [
        "k8s.yml",
        "k8s.yaml",
        "kubernetes.yml",
        "kubernetes.yaml",
        ".k8s.yml",
        ".k8s.yaml"
      ]
    },
    {
      name: "screwdriver",
      fileNames: ["screwdriver.yaml", "screwdriver.yml"]
    },
    {
      name: "snapcraft",
      fileNames: ["snapcraft.yaml", "snapcraft.yml"]
    },
    {
      name: "container",
      clone: {
        base: "3d",
        color: "#00b0ff"
      },
      fileNames: [".devcontainer/devcontainer.json"]
    },
    {
      name: "kcl",
      fileNames: ["kcl.mod", "kcl.yaml", "kcl.yml"],
      fileExtensions: ["k"]
    },
    {
      name: "verified",
      fileExtensions: ["sigstore.json"]
    },
    {
      name: "bruno",
      fileExtensions: ["bru"]
    },
    {
      name: "cairo",
      fileExtensions: ["cairo"]
    },
    {
      name: "grafana-alloy",
      fileExtensions: ["alloy"]
    },
    {
      name: "markdownlint",
      fileNames: [
        ".markdownlint.json",
        ".markdownlint.jsonc",
        ".markdownlint.yaml",
        ".markdownlint.yml",
        ".markdownlint-cli2.jsonc",
        ".markdownlint-cli2.yaml",
        ".markdownlint-cli2.cjs",
        ".markdownlint-cli2.mjs"
      ]
    },
    {
      name: "tsil",
      fileExtensions: ["\u0446"]
    },
    {
      name: "deepsource",
      fileNames: [".deepsource.toml"]
    },
    {
      name: "tape",
      fileExtensions: ["tape"],
      clone: { base: "video", color: "purple-300" }
    },
    {
      name: "hurl",
      fileExtensions: ["hurl"]
    }
  ])
};

// src/core/icons/folderIcons.ts
var folderIcons = [
  {
    name: "specific",
    defaultIcon: { name: "folder" },
    rootFolder: { name: "folder-root" },
    icons: [
      {
        name: "folder-robot",
        folderNames: ["bot", "robot"]
      },
      {
        name: "folder-src",
        folderNames: ["src", "srcs", "source", "sources", "code"]
      },
      {
        name: "folder-dist",
        folderNames: ["dist", "out", "build", "release", "bin"]
      },
      {
        name: "folder-css",
        folderNames: ["css", "stylesheet", "stylesheets", "style", "styles"]
      },
      { name: "folder-sass", folderNames: ["sass", "scss"] },
      { name: "folder-television", folderNames: ["tv", "television"] },
      { name: "folder-desktop", folderNames: ["desktop"] },
      { name: "folder-console", folderNames: ["console"] },
      {
        name: "folder-images",
        folderNames: [
          "images",
          "image",
          "imgs",
          "img",
          "icons",
          "icon",
          "icos",
          "ico",
          "figures",
          "figure",
          "figs",
          "fig",
          "screenshot",
          "screenshots",
          "screengrab",
          "screengrabs",
          "pic",
          "pics",
          "picture",
          "pictures",
          "photo",
          "photos",
          "photograph",
          "photographs"
        ]
      },
      {
        name: "folder-scripts",
        folderNames: ["script", "scripts", "scripting"]
      },
      { name: "folder-node", folderNames: ["node_modules"] },
      {
        name: "folder-javascript",
        folderNames: ["js", "javascript", "javascripts"]
      },
      { name: "folder-json", folderNames: ["json", "jsons"] },
      { name: "folder-font", folderNames: ["font", "fonts"] },
      { name: "folder-bower", folderNames: ["bower_components"] },
      {
        name: "folder-test",
        folderNames: ["test", "tests", "testing", "snapshots", "spec", "specs"]
      },
      {
        name: "folder-jinja",
        folderNames: ["jinja", "jinja2", "j2"],
        light: true
      },
      { name: "folder-markdown", folderNames: ["markdown", "md"] },
      { name: "folder-pdm", folderNames: ["pdm-plugins", "pdm-build"] },
      { name: "folder-php", folderNames: ["php"] },
      { name: "folder-phpmailer", folderNames: ["phpmailer"] },
      { name: "folder-sublime", folderNames: ["sublime"] },
      {
        name: "folder-docs",
        folderNames: [
          "doc",
          "docs",
          "document",
          "documents",
          "documentation",
          "post",
          "posts",
          "article",
          "articles"
        ]
      },
      { name: "folder-gh-workflows", folderNames: ["github/workflows"] },
      {
        name: "folder-git",
        folderNames: ["git", "patches", "githooks", "submodules"]
      },
      { name: "folder-github", folderNames: ["github"] },
      { name: "folder-gitlab", folderNames: ["gitlab"] },
      { name: "folder-vscode", folderNames: ["vscode", "vscode-test"] },
      {
        name: "folder-views",
        folderNames: [
          "view",
          "views",
          "screen",
          "screens",
          "page",
          "pages",
          "public_html",
          "html"
        ]
      },
      { name: "folder-vue", folderNames: ["vue"] },
      { name: "folder-vuepress", folderNames: ["vuepress"] },
      { name: "folder-expo", folderNames: ["expo", "expo-shared"] },
      {
        name: "folder-config",
        folderNames: [
          "cfg",
          "cfgs",
          "conf",
          "confs",
          "config",
          "configs",
          "configuration",
          "configurations",
          "setting",
          "settings",
          "META-INF",
          "option",
          "options"
        ]
      },
      {
        name: "folder-i18n",
        folderNames: [
          "i18n",
          "internationalization",
          "lang",
          "langs",
          "language",
          "languages",
          "locale",
          "locales",
          "l10n",
          "localization",
          "translation",
          "translate",
          "translations",
          "tx"
        ]
      },
      {
        name: "folder-components",
        folderNames: ["components", "widget", "widgets", "fragments"]
      },
      {
        name: "folder-verdaccio",
        folderNames: ["verdaccio"]
      },
      { name: "folder-aurelia", folderNames: ["aurelia_project"] },
      {
        name: "folder-resource",
        folderNames: [
          "resource",
          "resources",
          "res",
          "asset",
          "assets",
          "static",
          "report",
          "reports"
        ]
      },
      {
        name: "folder-lib",
        folderNames: [
          "lib",
          "libs",
          "library",
          "libraries",
          "vendor",
          "vendors",
          "third-party"
        ]
      },
      {
        name: "folder-theme",
        folderNames: [
          "themes",
          "theme",
          "color",
          "colors",
          "design",
          "designs"
        ]
      },
      { name: "folder-webpack", folderNames: ["webpack"] },
      { name: "folder-global", folderNames: ["global"] },
      {
        name: "folder-public",
        folderNames: [
          "public",
          "www",
          "wwwroot",
          "web",
          "website",
          "site",
          "browser",
          "browsers"
        ]
      },
      {
        name: "folder-include",
        folderNames: ["inc", "include", "includes", "partial", "partials"]
      },
      {
        name: "folder-docker",
        folderNames: ["docker", "dockerfiles", "dockerhub"]
      },
      {
        name: "folder-ngrx-effects",
        folderNames: ["effects"],
        enabledFor: ["angular_ngrx" /* Ngrx */]
      },
      {
        name: "folder-ngrx-store",
        folderNames: ["store"],
        enabledFor: ["angular_ngrx" /* Ngrx */]
      },
      {
        name: "folder-ngrx-state",
        folderNames: ["states", "state"],
        enabledFor: ["angular_ngrx" /* Ngrx */]
      },
      {
        name: "folder-ngrx-reducer",
        folderNames: ["reducers", "reducer"],
        enabledFor: ["angular_ngrx" /* Ngrx */]
      },
      {
        name: "folder-ngrx-actions",
        folderNames: ["actions"],
        enabledFor: ["angular_ngrx" /* Ngrx */]
      },
      {
        name: "folder-ngrx-entities",
        folderNames: ["entities"],
        enabledFor: ["angular_ngrx" /* Ngrx */]
      },
      {
        name: "folder-ngrx-selectors",
        folderNames: ["selectors"],
        enabledFor: ["angular_ngrx" /* Ngrx */]
      },
      {
        name: "folder-redux-reducer",
        folderNames: ["reducers", "reducer"],
        enabledFor: ["react_redux" /* Redux */]
      },
      {
        name: "folder-redux-actions",
        folderNames: ["actions"],
        enabledFor: ["react_redux" /* Redux */]
      },
      {
        name: "folder-redux-selector",
        folderNames: ["selectors", "selector"],
        enabledFor: ["react_redux" /* Redux */]
      },
      {
        name: "folder-redux-store",
        folderNames: ["store", "stores"],
        enabledFor: ["react_redux" /* Redux */]
      },
      {
        name: "folder-react-components",
        folderNames: ["components", "react", "jsx", "reactjs"],
        enabledFor: ["react" /* React */, "react_redux" /* Redux */]
      },
      {
        name: "folder-astro",
        folderNames: ["astro"]
      },
      {
        name: "folder-database",
        folderNames: ["db", "data", "database", "databases", "sql"]
      },
      { name: "folder-log", folderNames: ["log", "logs", "logging"] },
      { name: "folder-target", folderNames: ["target"] },
      {
        name: "folder-temp",
        folderNames: ["temp", "tmp", "cached", "cache"]
      },
      { name: "folder-aws", folderNames: ["aws"] },
      {
        name: "folder-audio",
        folderNames: [
          "aud",
          "auds",
          "audio",
          "audios",
          "music",
          "sound",
          "sounds"
        ]
      },
      {
        name: "folder-video",
        folderNames: ["vid", "vids", "video", "videos", "movie", "movies"]
      },
      {
        name: "folder-kubernetes",
        folderNames: ["kubernetes", "k8s"]
      },
      { name: "folder-import", folderNames: ["import", "imports", "imported"] },
      { name: "folder-export", folderNames: ["export", "exports", "exported"] },
      { name: "folder-wakatime", folderNames: ["wakatime"] },
      { name: "folder-circleci", folderNames: ["circleci"] },
      {
        name: "folder-wordpress",
        folderNames: ["wordpress-org", "wp-content"]
      },
      { name: "folder-gradle", folderNames: ["gradle"] },
      {
        name: "folder-coverage",
        folderNames: [
          "coverage",
          "nyc-output",
          "nyc_output",
          "e2e",
          "it",
          "integration-test",
          "integration-tests"
        ]
      },
      {
        name: "folder-class",
        folderNames: [
          "class",
          "classes",
          "model",
          "models",
          "schemas",
          "schema"
        ]
      },
      {
        name: "folder-other",
        folderNames: [
          "other",
          "others",
          "misc",
          "miscellaneous",
          "extra",
          "extras",
          "etc"
        ]
      },
      { name: "folder-lua", folderNames: ["lua"] },
      { name: "folder-turborepo", folderNames: ["turbo"] },
      {
        name: "folder-typescript",
        folderNames: ["typescript", "ts", "typings", "@types", "types"]
      },
      { name: "folder-graphql", folderNames: ["graphql", "gql"] },
      { name: "folder-routes", folderNames: ["routes", "router", "routers"] },
      { name: "folder-ci", folderNames: ["ci"] },
      {
        name: "folder-benchmark",
        folderNames: [
          "benchmark",
          "benchmarks",
          "performance",
          "measure",
          "measures",
          "measurement"
        ]
      },
      {
        name: "folder-messages",
        folderNames: [
          "messages",
          "messaging",
          "forum",
          "chat",
          "chats",
          "conversation",
          "conversations"
        ]
      },
      { name: "folder-less", folderNames: ["less"] },
      {
        name: "folder-gulp",
        folderNames: [
          "gulp",
          "gulp-tasks",
          "gulpfile.js",
          "gulpfile.mjs",
          "gulpfile.ts",
          "gulpfile.babel.js"
        ]
      },
      {
        name: "folder-python",
        folderNames: ["python", "pycache", "pytest_cache"]
      },
      {
        name: "folder-mojo",
        folderNames: ["mojo"]
      },
      { name: "folder-moon", folderNames: ["moon"] },
      { name: "folder-debug", folderNames: ["debug", "debugging"] },
      { name: "folder-fastlane", folderNames: ["fastlane"] },
      {
        name: "folder-plugin",
        folderNames: [
          "plugin",
          "plugins",
          "mod",
          "mods",
          "modding",
          "extension",
          "extensions",
          "addon",
          "addons",
          "module",
          "modules"
        ]
      },
      { name: "folder-middleware", folderNames: ["middleware", "middlewares"] },
      {
        name: "folder-controller",
        folderNames: [
          "controller",
          "controllers",
          "service",
          "services",
          "provider",
          "providers",
          "handler",
          "handlers"
        ]
      },
      { name: "folder-ansible", folderNames: ["ansible"] },
      {
        name: "folder-server",
        folderNames: ["server", "servers", "backend", "backends"]
      },
      {
        name: "folder-client",
        folderNames: ["client", "clients", "frontend", "frontends", "pwa"]
      },
      { name: "folder-tasks", folderNames: ["tasks", "tickets"] },
      { name: "folder-android", folderNames: ["android"] },
      { name: "folder-ios", folderNames: ["ios"] },
      {
        name: "folder-ui",
        folderNames: ["presentation", "gui", "ui", "ux"]
      },
      { name: "folder-upload", folderNames: ["uploads", "upload"] },
      { name: "folder-download", folderNames: ["downloads", "download"] },
      {
        name: "folder-tools",
        folderNames: [
          "tools",
          "toolkit",
          "toolkits",
          "toolbox",
          "toolboxes",
          "tooling"
        ]
      },
      { name: "folder-helper", folderNames: ["helpers", "helper"] },
      { name: "folder-serverless", folderNames: ["serverless"] },
      { name: "folder-api", folderNames: ["api", "apis", "restapi"] },
      { name: "folder-app", folderNames: ["app", "apps"] },
      {
        name: "folder-apollo",
        folderNames: [
          "apollo",
          "apollo-client",
          "apollo-cache",
          "apollo-config"
        ]
      },
      {
        name: "folder-archive",
        folderNames: [
          "arc",
          "arcs",
          "archive",
          "archives",
          "archival",
          "bkp",
          "bkps",
          "bak",
          "baks",
          "backup",
          "backups",
          "back-up",
          "back-ups",
          "history",
          "histories"
        ]
      },
      { name: "folder-batch", folderNames: ["batch", "batchs", "batches"] },
      { name: "folder-buildkite", folderNames: ["buildkite"] },
      { name: "folder-cluster", folderNames: ["cluster", "clusters"] },
      {
        name: "folder-command",
        folderNames: ["command", "commands", "cmd", "cli", "clis"]
      },
      { name: "folder-constant", folderNames: ["constant", "constants"] },
      {
        name: "folder-container",
        folderNames: ["container", "containers", "devcontainer"]
      },
      { name: "folder-content", folderNames: ["content", "contents"] },
      { name: "folder-context", folderNames: ["context", "contexts"] },
      { name: "folder-core", folderNames: ["core"] },
      { name: "folder-delta", folderNames: ["delta", "deltas", "changes"] },
      { name: "folder-dump", folderNames: ["dump", "dumps"] },
      {
        name: "folder-examples",
        folderNames: [
          "demo",
          "demos",
          "example",
          "examples",
          "sample",
          "samples",
          "sample-data"
        ]
      },
      {
        name: "folder-environment",
        folderNames: ["env", "envs", "environment", "environments", "venv"]
      },
      {
        name: "folder-functions",
        folderNames: [
          "func",
          "funcs",
          "function",
          "functions",
          "lambda",
          "lambdas",
          "logic",
          "math",
          "maths",
          "calc",
          "calcs",
          "calculation",
          "calculations"
        ]
      },
      {
        name: "folder-generator",
        folderNames: [
          "generator",
          "generators",
          "generated",
          "cfn-gen",
          "gen",
          "gens",
          "auto"
        ]
      },
      {
        name: "folder-hook",
        folderNames: ["hook", "hooks", "trigger", "triggers"]
      },
      { name: "folder-job", folderNames: ["job", "jobs"] },
      {
        name: "folder-keys",
        folderNames: [
          "key",
          "keys",
          "token",
          "tokens",
          "jwt",
          "secret",
          "secrets"
        ]
      },
      { name: "folder-layout", folderNames: ["layout", "layouts"] },
      {
        name: "folder-mail",
        folderNames: ["mail", "mails", "email", "emails", "smtp", "mailers"]
      },
      { name: "folder-mappings", folderNames: ["mappings", "mapping"] },
      { name: "folder-meta", folderNames: ["meta"] },
      { name: "folder-changesets", folderNames: ["changesets", "changeset"] },
      {
        name: "folder-packages",
        folderNames: ["package", "packages", "pkg", "pkgs"]
      },
      { name: "folder-shared", folderNames: ["shared", "common"] },
      {
        name: "folder-shader",
        folderNames: ["glsl", "hlsl", "shader", "shaders"]
      },
      { name: "folder-stack", folderNames: ["stack", "stacks"] },
      {
        name: "folder-template",
        folderNames: [
          "template",
          "templates",
          "github/ISSUE_TEMPLATE",
          "github/PULL_REQUEST_TEMPLATE"
        ]
      },
      {
        name: "folder-utils",
        folderNames: ["util", "utils", "utility", "utilities"]
      },
      { name: "folder-supabase", folderNames: ["supabase"] },
      { name: "folder-private", folderNames: ["private"] },
      { name: "folder-linux", folderNames: ["linux", "linuxbsd", "unix"] },
      { name: "folder-windows", folderNames: ["windows", "win", "win32"] },
      {
        name: "folder-macos",
        folderNames: ["macos", "mac", "osx", "DS_Store"]
      },
      {
        name: "folder-error",
        folderNames: ["error", "errors", "err", "errs", "crash", "crashes"]
      },
      { name: "folder-event", folderNames: ["event", "events"] },
      {
        name: "folder-secure",
        folderNames: [
          "auth",
          "authentication",
          "secure",
          "security",
          "cert",
          "certs",
          "certificate",
          "certificates",
          "ssl"
        ]
      },
      { name: "folder-custom", folderNames: ["custom", "customs"] },
      {
        name: "folder-mock",
        folderNames: [
          "draft",
          "drafts",
          "mock",
          "mocks",
          "fixture",
          "fixtures",
          "concept",
          "concepts",
          "sketch",
          "sketches"
        ]
      },
      {
        name: "folder-syntax",
        folderNames: ["syntax", "syntaxes", "spellcheck"]
      },
      { name: "folder-vm", folderNames: ["vm", "vms"] },
      { name: "folder-stylus", folderNames: ["stylus"] },
      { name: "folder-flow", folderNames: ["flow-typed"] },
      {
        name: "folder-rules",
        folderNames: [
          "rule",
          "rules",
          "validation",
          "validations",
          "validator",
          "validators"
        ]
      },
      {
        name: "folder-review",
        folderNames: ["review", "reviews", "revisal", "revisals", "reviewed"]
      },
      {
        name: "folder-animation",
        folderNames: ["anim", "anims", "animation", "animations", "animated"]
      },
      { name: "folder-guard", folderNames: ["guard", "guards"] },
      { name: "folder-prisma", folderNames: ["prisma", "prisma/schema"] },
      { name: "folder-pipe", folderNames: ["pipe", "pipes"] },
      { name: "folder-svg", folderNames: ["svg", "svgs"] },
      {
        name: "folder-vuex-store",
        folderNames: ["store", "stores"],
        enabledFor: ["vue_vuex" /* Vuex */]
      },
      {
        name: "folder-nuxt",
        folderNames: ["nuxt"],
        enabledFor: ["vue_vuex" /* Vuex */, "vue" /* Vue */]
      },
      {
        name: "folder-vue-directives",
        folderNames: ["directives"],
        enabledFor: ["vue_vuex" /* Vuex */, "vue" /* Vue */]
      },
      {
        name: "folder-vue",
        folderNames: ["components"],
        enabledFor: ["vue_vuex" /* Vuex */, "vue" /* Vue */]
      },
      { name: "folder-terraform", folderNames: ["terraform"] },
      {
        name: "folder-mobile",
        folderNames: ["mobile", "mobiles", "portable", "portability"]
      },
      { name: "folder-stencil", folderNames: ["stencil"] },
      { name: "folder-firebase", folderNames: ["firebase"] },
      { name: "folder-svelte", folderNames: ["svelte", "svelte-kit"] },
      {
        name: "folder-update",
        folderNames: ["update", "updates", "upgrade", "upgrades"]
      },
      { name: "folder-intellij", folderNames: ["idea"], light: true },
      {
        name: "folder-azure-pipelines",
        folderNames: ["azure-pipelines", "azure-pipelines-ci"]
      },
      { name: "folder-mjml", folderNames: ["mjml"] },
      {
        name: "folder-admin",
        folderNames: [
          "admin",
          "admins",
          "manager",
          "managers",
          "moderator",
          "moderators"
        ]
      },
      {
        name: "folder-jupyter",
        folderNames: ["jupyter", "notebook", "notebooks"]
      },
      { name: "folder-scala", folderNames: ["scala"] },
      {
        name: "folder-connection",
        folderNames: [
          "connection",
          "connections",
          "integration",
          "integrations"
        ]
      },
      { name: "folder-quasar", folderNames: ["quasar"] },
      { name: "folder-next", folderNames: ["next"] },
      { name: "folder-cobol", folderNames: ["cobol"] },
      { name: "folder-yarn", folderNames: ["yarn"] },
      { name: "folder-husky", folderNames: ["husky"] },
      {
        name: "folder-storybook",
        folderNames: ["storybook", "stories"]
      },
      { name: "folder-base", folderNames: ["base", "bases"] },
      {
        name: "folder-cart",
        folderNames: ["cart", "shopping-cart", "shopping", "shop"]
      },
      {
        name: "folder-home",
        folderNames: ["home", "start"]
      },
      {
        name: "folder-project",
        folderNames: ["project", "projects"]
      },
      {
        name: "folder-interface",
        folderNames: ["interface", "interfaces"]
      },
      { name: "folder-netlify", folderNames: ["netlify"] },
      {
        name: "folder-enum",
        folderNames: ["enum", "enums"]
      },
      {
        name: "folder-contract",
        folderNames: [
          "pact",
          "pacts",
          "contract",
          "contracts",
          "contract-testing",
          "contract-test",
          "contract-tests"
        ]
      },
      {
        name: "folder-helm",
        folderNames: ["helm", "helmchart", "helmcharts"]
      },
      {
        name: "folder-queue",
        folderNames: ["queue", "queues", "bull", "mq"]
      },
      {
        name: "folder-vercel",
        folderNames: ["vercel", "now"]
      },
      {
        name: "folder-cypress",
        folderNames: ["cypress"]
      },
      {
        name: "folder-decorators",
        folderNames: ["decorator", "decorators"]
      },
      {
        name: "folder-java",
        folderNames: ["java"]
      },
      {
        name: "folder-resolver",
        folderNames: ["resolver", "resolvers"]
      },
      {
        name: "folder-angular",
        folderNames: ["angular"]
      },
      {
        name: "folder-unity",
        folderNames: ["unity"]
      },
      {
        name: "folder-pdf",
        folderNames: ["pdf", "pdfs"]
      },
      {
        name: "folder-proto",
        folderNames: ["protobuf", "protobufs", "proto", "protos"]
      },
      {
        name: "folder-plastic",
        folderNames: ["plastic"]
      },
      {
        name: "folder-gamemaker",
        folderNames: ["gamemaker", "gamemaker2"]
      },
      {
        name: "folder-mercurial",
        folderNames: ["hg", "hghooks", "hgext"]
      },
      {
        name: "folder-godot",
        folderNames: ["godot", "godot-cpp"]
      },
      {
        name: "folder-lottie",
        folderNames: ["lottie", "lotties", "lottiefiles"]
      },
      {
        name: "folder-taskfile",
        folderNames: ["taskfile", "taskfiles"]
      },
      {
        name: "folder-cloudflare",
        folderNames: ["cloudflare"]
      },
      {
        name: "folder-seeders",
        folderNames: ["seeds", "seeders", "seed", "seeding"]
      },
      { name: "folder-bicep", folderNames: ["bicep"] },
      { name: "folder-snapcraft", folderNames: ["snap", "snapcraft"] }
    ]
  },
  {
    name: "classic",
    defaultIcon: { name: "folder" },
    rootFolder: { name: "folder-root" }
  },
  { name: "none", defaultIcon: { name: "" } }
];

// src/core/icons/languageIcons.ts
var languageIcons = [
  { icon: { name: "git" }, ids: ["git", "git-commit", "git-rebase", "ignore"] },
  {
    icon: { name: "yaml" },
    ids: [
      "yaml",
      "github-actions-workflow",
      "spring-boot-properties-yaml",
      "ansible",
      "ansible-jinja"
    ]
  },
  { icon: { name: "xml" }, ids: ["xml", "xquery", "xsl"] },
  { icon: { name: "matlab" }, ids: ["matlab"] },
  {
    icon: { name: "settings" },
    ids: ["makefile", "toml", "ini", "properties", "spring-boot-properties"]
  },
  { icon: { name: "shaderlab" }, ids: ["shaderlab"] },
  { icon: { name: "diff" }, ids: ["diff"] },
  { icon: { name: "json" }, ids: ["json", "jsonc", "json5"] },
  { icon: { name: "blink" }, ids: ["blink"] },
  { icon: { name: "java" }, ids: ["java"] },
  { icon: { name: "razor" }, ids: ["razor", "aspnetcorerazor"] },
  { icon: { name: "python" }, ids: ["python"] },
  { icon: { name: "mojo" }, ids: ["mojo"] },
  { icon: { name: "javascript" }, ids: ["javascript"] },
  { icon: { name: "typescript" }, ids: ["typescript"] },
  { icon: { name: "scala" }, ids: ["scala"] },
  { icon: { name: "handlebars" }, ids: ["handlebars"] },
  { icon: { name: "perl" }, ids: ["perl", "perl6"] },
  { icon: { name: "haxe" }, ids: ["haxe", "hxml"] },
  { icon: { name: "puppet" }, ids: ["puppet"] },
  { icon: { name: "elixir" }, ids: ["elixir"] },
  { icon: { name: "livescript" }, ids: ["livescript"] },
  { icon: { name: "erlang" }, ids: ["erlang"] },
  { icon: { name: "twig" }, ids: ["twig"] },
  { icon: { name: "julia" }, ids: ["julia"] },
  { icon: { name: "elm" }, ids: ["elm"] },
  { icon: { name: "purescript" }, ids: ["purescript"] },
  { icon: { name: "stylus" }, ids: ["stylus"] },
  { icon: { name: "nunjucks" }, ids: ["nunjucks"] },
  { icon: { name: "pug" }, ids: ["pug"] },
  { icon: { name: "robot" }, ids: ["robotframework"] },
  { icon: { name: "sass" }, ids: ["sass", "scss"] },
  { icon: { name: "less" }, ids: ["less"] },
  { icon: { name: "css" }, ids: ["css"] },
  { icon: { name: "visualstudio" }, ids: ["testOutput", "vb"] },
  { icon: { name: "angular" }, ids: ["ng-template"] },
  { icon: { name: "graphql" }, ids: ["graphql"] },
  { icon: { name: "solidity" }, ids: ["solidity"] },
  { icon: { name: "autoit" }, ids: ["autoit"] },
  { icon: { name: "haml" }, ids: ["haml"] },
  { icon: { name: "yang" }, ids: ["yang"] },
  { icon: { name: "terraform" }, ids: ["terraform"] },
  { icon: { name: "applescript" }, ids: ["applescript"] },
  { icon: { name: "cake" }, ids: ["cake"] },
  { icon: { name: "cucumber" }, ids: ["cucumber"] },
  { icon: { name: "nim" }, ids: ["nim", "nimble"] },
  { icon: { name: "apiblueprint" }, ids: ["apiblueprint"] },
  { icon: { name: "riot" }, ids: ["riot"] },
  { icon: { name: "postcss" }, ids: ["postcss"] },
  { icon: { name: "coldfusion" }, ids: ["lang-cfml"] },
  { icon: { name: "haskell" }, ids: ["haskell"] },
  { icon: { name: "dhall" }, ids: ["dhall"] },
  { icon: { name: "cabal" }, ids: ["cabal"] },
  { icon: { name: "nix" }, ids: ["nix"] },
  { icon: { name: "ruby" }, ids: ["ruby"] },
  { icon: { name: "slim" }, ids: ["slim"] },
  { icon: { name: "php" }, ids: ["php"] },
  { icon: { name: "php_elephant" }, ids: [] },
  { icon: { name: "php_elephant_pink" }, ids: [] },
  { icon: { name: "hack" }, ids: ["hack"] },
  { icon: { name: "react" }, ids: ["javascriptreact"] },
  { icon: { name: "mjml" }, ids: ["mjml"] },
  { icon: { name: "processing" }, ids: ["processing"] },
  { icon: { name: "hcl" }, ids: ["hcl"] },
  { icon: { name: "go" }, ids: ["go"] },
  { icon: { name: "go_gopher" }, ids: [] },
  { icon: { name: "nodejs_alt" }, ids: [] },
  { icon: { name: "django" }, ids: ["django-html", "django-txt"] },
  { icon: { name: "html" }, ids: ["html"] },
  { icon: { name: "godot" }, ids: ["gdscript"] },
  { icon: { name: "godot-assets" }, ids: ["gdresource", "gdshader"] },
  { icon: { name: "vim" }, ids: ["viml"] },
  { icon: { name: "silverstripe" }, ids: [] },
  { icon: { name: "prolog" }, ids: ["prolog"] },
  { icon: { name: "pawn" }, ids: ["pawn"] },
  { icon: { name: "reason" }, ids: ["reason", "reason_lisp"] },
  { icon: { name: "sml" }, ids: ["sml"] },
  { icon: { name: "tex" }, ids: ["tex", "doctex", "latex", "latex-expl3"] },
  { icon: { name: "salesforce" }, ids: ["apex"] },
  { icon: { name: "sas" }, ids: ["sas"] },
  { icon: { name: "docker" }, ids: ["dockerfile", "dockercompose"] },
  { icon: { name: "table" }, ids: ["csv", "tsv", "psv"] },
  { icon: { name: "csharp" }, ids: ["csharp"] },
  { icon: { name: "console" }, ids: ["bat", "awk", "shellscript"] },
  { icon: { name: "c" }, ids: ["c"] },
  { icon: { name: "cpp" }, ids: ["cpp"] },
  { icon: { name: "objective-c" }, ids: ["objective-c"] },
  { icon: { name: "objective-cpp" }, ids: ["objective-cpp"] },
  { icon: { name: "coffee" }, ids: ["coffeescript"] },
  { icon: { name: "fsharp" }, ids: ["fsharp"] },
  { icon: { name: "editorconfig" }, ids: ["editorconfig"] },
  { icon: { name: "clojure" }, ids: ["clojure"] },
  { icon: { name: "groovy" }, ids: ["groovy"] },
  { icon: { name: "markdown" }, ids: ["markdown"] },
  { icon: { name: "jinja" }, ids: ["jinja"] },
  { icon: { name: "proto" }, ids: ["proto"] },
  { icon: { name: "python-misc" }, ids: ["pip-requirements"] },
  { icon: { name: "vue" }, ids: ["vue", "vue-postcss", "vue-html"] },
  { icon: { name: "lua" }, ids: ["lua"] },
  { icon: { name: "lib" }, ids: ["bibtex", "bibtex-style"] },
  { icon: { name: "log" }, ids: ["log"] },
  { icon: { name: "jupyter" }, ids: ["jupyter"] },
  { icon: { name: "document" }, ids: ["plaintext"] },
  { icon: { name: "pdf" }, ids: ["pdf"] },
  { icon: { name: "powershell" }, ids: ["powershell"] },
  { icon: { name: "pug" }, ids: ["jade"] },
  { icon: { name: "r" }, ids: ["r", "rsweave"] },
  { icon: { name: "rust" }, ids: ["rust"] },
  { icon: { name: "database" }, ids: ["sql"] },
  { icon: { name: "kusto" }, ids: ["kql"] },
  { icon: { name: "lock" }, ids: ["ssh_config"] },
  { icon: { name: "svg" }, ids: ["svg"] },
  { icon: { name: "swift" }, ids: ["swift"] },
  { icon: { name: "react_ts" }, ids: ["typescriptreact"] },
  { icon: { name: "search" }, ids: ["search-result"] },
  { icon: { name: "minecraft" }, ids: ["mcfunction"] },
  { icon: { name: "rescript" }, ids: ["rescript"] },
  { icon: { name: "otne" }, ids: ["otne"] },
  {
    icon: { name: "twine" },
    ids: ["twee3", "twee3-harlowe-3", "twee3-chapbook-1", "twee3-sugarcube-2"]
  },
  { icon: { name: "grain" }, ids: ["grain"] },
  { icon: { name: "lolcode" }, ids: ["lolcode"] },
  { icon: { name: "idris" }, ids: ["idris"] },
  { icon: { name: "chess" }, ids: ["pgn"] },
  { icon: { name: "gemini" }, ids: ["gemini", "text-gemini"] },
  { icon: { name: "vlang" }, ids: ["v"] },
  { icon: { name: "wolframlanguage" }, ids: ["wolfram"] },
  { icon: { name: "shader" }, ids: ["hlsl", "glsl", "wgsl"] },
  { icon: { name: "tree" }, ids: ["tree"] },
  { icon: { name: "svelte" }, ids: ["svelte"] },
  { icon: { name: "dart" }, ids: ["dart"] },
  { icon: { name: "cadence" }, ids: ["cadence"] },
  { icon: { name: "stylable" }, ids: ["stylable"] },
  { icon: { name: "hjson" }, ids: ["hjson"] },
  { icon: { name: "huff" }, ids: ["huff"] },
  {
    icon: { name: "concourse" },
    ids: ["concourse-pipeline-yaml", "concourse-task-yaml"]
  }
];

// src/core/generator/languageGenerator.ts
var loadLanguageIconDefinitions = (languageIcons2, config, manifest) => {
  var _a;
  const enabledLanguages = disableLanguagesByPack(
    languageIcons2,
    config.activeIconPack
  );
  const customIcons = getCustomIcons3((_a = config.languages) == null ? void 0 : _a.associations);
  const allLanguageIcons = [...enabledLanguages, ...customIcons];
  allLanguageIcons.forEach((lang) => {
    if (lang.disabled) return;
    manifest = setIconDefinitions2(manifest, config, lang.icon);
    manifest = merge(
      manifest,
      setLanguageIdentifiers(lang.icon.name, lang.ids)
    );
    manifest.light = lang.icon.light ? merge(
      manifest.light,
      setLanguageIdentifiers(
        lang.icon.name + lightColorFileEnding,
        lang.ids
      )
    ) : manifest.light;
    manifest.highContrast = lang.icon.highContrast ? merge(
      manifest.highContrast,
      setLanguageIdentifiers(
        lang.icon.name + highContrastColorFileEnding,
        lang.ids
      )
    ) : manifest.highContrast;
  });
  return manifest;
};
var setIconDefinitions2 = (manifest, config, icon) => {
  manifest = createIconDefinitions2(manifest, config, icon.name);
  manifest = merge(
    manifest,
    icon.light ? createIconDefinitions2(
      manifest,
      config,
      icon.name + lightColorFileEnding
    ) : manifest.light
  );
  manifest = merge(
    manifest,
    icon.highContrast ? createIconDefinitions2(
      manifest,
      config,
      icon.name + highContrastColorFileEnding
    ) : manifest.highContrast
  );
  return manifest;
};
var createIconDefinitions2 = (manifest, config, iconName) => {
  const fileConfigHash = getFileConfigHash(config);
  if (manifest.iconDefinitions) {
    manifest.iconDefinitions[iconName] = {
      iconPath: `${iconFolderPath}${iconName}${fileConfigHash}.svg`
    };
  }
  return manifest;
};
var setLanguageIdentifiers = (iconName, languageIds) => {
  const obj = { languageIds: {} };
  languageIds.forEach((id) => {
    obj.languageIds[id] = iconName;
  });
  return obj;
};
var getCustomIcons3 = (languageAssociations) => {
  if (!languageAssociations) return [];
  const icons = Object.keys(languageAssociations).map((fa) => ({
    icon: { name: languageAssociations[fa].toLowerCase() },
    ids: [fa.toLowerCase()]
  }));
  return icons;
};
var disableLanguagesByPack = (languageIcons2, activatedIconPack) => {
  return languageIcons2.filter((language) => {
    return !language.enabledFor ? true : language.enabledFor.some((p) => p === activatedIconPack);
  });
};

// src/core/generator/generateManifest.ts
var generateManifest = (config) => {
  const refinedConfig = padWithDefaultConfig(config);
  const manifest = createEmptyManifest();
  const languageIconDefinitions = loadLanguageIconDefinitions(
    languageIcons,
    refinedConfig,
    manifest
  );
  const fileIconDefinitions = loadFileIconDefinitions(
    fileIcons,
    refinedConfig,
    manifest
  );
  const folderIconDefinitions = loadFolderIconDefinitions(
    folderIcons,
    refinedConfig,
    manifest
  );
  return merge(
    languageIconDefinitions,
    fileIconDefinitions,
    folderIconDefinitions
  );
};

// src/core/helpers/iconPacks.ts
var availableIconPacks = Object.values(IconPack);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  availableIconPacks,
  generateManifest
});
