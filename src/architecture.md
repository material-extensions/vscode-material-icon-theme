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

The desktop extension keeps packaged SVGs unchanged. Each configuration generation prepares its icons, including all custom clones, in a private temporary directory under `icons/generated/`. After all transformations finish, each final SVG is addressed by the SHA-256 of its exact bytes in `icons/generated/sha256/<hash>.svg`. Identical images share one file regardless of icon name, settings, profile or generator version within the same installation. Changes to associations alone do not create new image copies.

Only complete, closed temporary files are renamed into the shared store. Existing identical bytes are reused; damaged files can be replaced with the correct bytes without first removing their paths. Concurrent generators can publish the same hash with identical complete bytes. Only after all referenced images are available is `dist/material-icons.json` replaced by a same-directory rename. Transient sharing/permission errors are retried a bounded number of times; a failed publication never deletes the previous manifest as a fallback. Configuration events are queued within each extension host.

Before skipping generation, the extension checks the storage format, configuration/version signature, manifest integrity, hashes of referenced SVG contents, and hashes of external source contents. Source hashes describe the same bytes consumed by the generator, rather than a timestamp sampled after reading. Profile-local `globalState` is not evidence that the shared installation is current. A storage-format change triggers migration even if settings and package version are unchanged. The version participates in generation invalidation, not in image filenames.

Private staging is removed after success or failure. Published image files are shared immediately and are never rolled back: another process may already reference them even if this process fails to publish its manifest. Previously published snapshot directories are also retained for cached CSS references. A killed process can leave private staging or unreferenced complete images; deleting another process's files based only on age is unsafe. Build cleanup excludes the entire runtime `icons/generated/` tree from fresh packages.

Persistent image storage grows with distinct final SVG byte sequences, not generation count. Returning to prior settings reuses existing images. This is deduplication, not a fixed storage cap or automatic garbage collection. Reuse is installation-local: another version's installation directory is a separate store. Retaining paths is compatible with cached CSS; repairing a file on disk does not itself guarantee immediate revalidation of an already failed browser image request. Ordinary rename also does not provide a power-loss durability guarantee.

This preserves asset consistency during cooperative generation, not per-window configuration isolation: all windows still consume the single statically contributed theme manifest, so the last successful publication wins. Workspace-specific theme selection remains a separate limitation.

## Npm module

The npm module exposes some of the functions so that the icon manifest can be generated programmatically. More information can be found in the [README.md](./module/README.md) of the module.
