# Architecture

The project is structured in a way that the core logic is separated from the extension logic. The core logic is used for the generation of the icon manifest, for the definition of the icon associations and for the translation logic. The extension logic is used for the interaction with the VS Code extension API (e.g. getting the user configuration, providing commands etc.).

```text
📦 src
 ┣ 📂 core         <-- Logic for generating icon manifest, icon associations, translation logic, models, tests
 ┣ 📂 extension    <-- Code which uses VS Code extension API (get user config, providing commands etc)
 ┣ 📂 module       <-- Control which part of the core is exposed to the npm module
 ┗ 📂 scripts      <-- Scripts which are executed during build time (in the package.json)
```

By using the [sheriff](https://github.com/softarc-consulting/sheriff) library dependencies between the modules can be verified. The command `bun run verify` checks if the imports between the modules are allowed. For instance it's not allowed, that any of the other modules imports something from the `extension` module because of it's dependency to `vscode`. But the `extension` module itself is allowed to import from `core`.

This is realized by using the dependency rules in the sheriff.config.ts file:

```ts
depRules: {
  root: ['core'],
  extension: ['core'],
  module: ['core'],
}
```

## Npm module

The npm module exposes some of the functions so that the icon manifest can be generated programmatically. More information can be found in the [README.md](./module/README.md) of the module.
