# Architecture

The project is structured in a way that the core logic is separated from the extension logic. The core logic is used for the generation of the icon manifest, for the definition of the icon associations and for the translation logic. The extension logic is used for the interaction with the VS Code extension API (e.g. getting the user configuration, providing commands etc.).

```text
📦 src
 ┣ 📂 core         <-- Logic for generating icon manifest, icon associations, translation logic, models, tests
 ┣ 📂 extension    <-- Code which uses VS Code extension API (get user config, providing commands etc)
 ┣ 📂 module       <-- Control which part of the core is exposed to the npm module
 ┗ 📂 scripts      <-- Scripts which are executed during build time (in the package.json)
```

By using the [sheriff](https://github.com/softarc-consulting/sheriff) library dependencies between the modules can be verified. The command `npm run verify` checks if the imports between the modules are allowed. For instance it's not allowed, that any of the other modules imports something from the `extension` module because of it's dependency to `vscode`. But the `extension` module itself is allowed to import from `core`.

This is realized by using the dependency rules in the sheriff.config.ts file:

```ts
depRules: {
  root: ['core'],
  extension: ['core'],
  module: ['core'],
}
```

## Runtime icon publication

The desktop extension keeps packaged SVGs unchanged. Each configuration generation writes a complete, isolated snapshot under `icons/generated/`, including custom clones. Only after all referenced files exist is `dist/material-icons.json` replaced by a same-directory rename. Configuration events are queued within each extension host; different hosts can prepare independent snapshots concurrently without renaming or deleting one another's assets.

Before skipping generation, the extension checks the manifest's configuration/version signature, manifest integrity, referenced files, and external source timestamps. Profile-local `globalState` is not evidence that the shared installation is current. Failed generations do not replace the previous manifest or update saved configuration.

Published snapshots are retained because other windows can still reference their URLs. Storage therefore grows with configuration changes until the extension installation is removed; build cleanup excludes runtime snapshots from new packages. Safe reuse and garbage collection require a separate lifecycle design. A hard process termination before publication can leave an unused snapshot, but not a partially published manifest.

This guarantees consistent assets, not per-window configuration isolation: all windows still consume the single statically contributed theme manifest, so the last successful publication wins. Workspace-specific theme selection remains a separate limitation.

## Npm module

The npm module exposes some of the functions so that the icon manifest can be generated programmatically. More information can be found in the [README.md](./module/README.md) of the module.
