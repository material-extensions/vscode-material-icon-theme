---
name: new-icon
description: Create or adjust Material Icon Theme icons and their associations, including pixel-grid corrections and previews for an icon contribution.
---

# New icon

Prepare an icon contribution using the repository's existing SVG, association, and generation workflows.

## Establish the scope

Read [CONTRIBUTING.md](../../../CONTRIBUTING.md) before designing. For an issue or review request, read the linked discussion and inspect its reference images; identify the requested filenames, extensions, folders, or language IDs.

Search the existing icons and association definitions before adding artwork. Reuse an existing icon when appropriate, or use the documented clone configuration for a recolor. Keep associations specific enough to avoid taking over unrelated files or folders.

## Design at the display size

- Use vector SVG artwork and the repository's Material color palette. Follow the contribution guide for spacing, folder colors, and light-theme variants.
- Preserve the source logo's character: silhouette, proportions, rounded tips, curve flow, and distinctive details. Start with the existing artwork and make the smallest adaptation needed for the available width and height. Grid correction is not a redesign; do not replace flowing curves with angular or stepped shapes just to eliminate antialiasing.
- Grid alignment is the default and applies only to the motive's outer bounding box. On the rendered 16×16 grid, align its left, right, top, and bottom bounds to whole-pixel lines. Prefer translation and a small scale adjustment; preserve aspect ratio where possible and keep any width/height adjustment visually subtle. Measure the actual curve bounds after transforms, not just path endpoints or control points.
- Preserve the logo's internal geometry, including ledges, notches, spacing, curves, and diagonals. Internal edges may fall between grid lines; do not snap or reshape them independently. Prefer moving and subtly scaling the whole motive to align its outer bounds. Retain curves or diagonals when they improve recognition, and identify their antialiasing as intentional. Decimal coordinates and antialiasing on internal edges are also valid. Keep normal antialiasing rather than forcing `shape-rendering="crispEdges"`.
- Honor explicit positioning feedback on the requested axis. For example, “align to the most right, bottom is good” means move the mark horizontally until its rightmost edge reaches x=16, keep every vertical coordinate unchanged, and keep all artwork inside the viewBox. Otherwise follow the contribution guide's outer spacing.
- Apply the same geometry correction to every theme variant; preserve their contrasting colors.

For folder icons, use the canonical `viewBox="0 0 16 16"` and `id="folder"` path from the contribution guide. Keep that background geometry intact. Put the foreground artwork in `id="motive"`, using a group when necessary. Author the closed variants and use the repository generator for open variants; generated open SVGs stay out of the commit.

## Wire and verify

Update the relevant association definition under `src/core/icons/` and follow nearby entries for theme flags, icon packs, and cloning. Read the current `package.json` scripts to choose the generation and validation commands.

Generate any required manifest, clone, and open-folder outputs, then run the icon and color checks. The color-check script reads staged SVGs: for unstaged artwork, invoke its configured linter with the explicit SVG paths. An empty file list does not validate the colors. Run focused tests when changing association or generator behavior. Keep the authored SVGs and association changes in the diff; inspect generated output without committing ignored build files.

Use the project's [Pixel Perfect Checker](https://github.com/lucodear/pixp) to inspect the actual SVG under its 16×16 grid. PR previews use `https://pixp.pages.dev/material-extensions/vscode-material-icon-theme/pull/<number>` and show the remote revision. For unpushed artwork, use an equivalent local grid preview of the edited SVG and disclose that distinction; after an authorized push, check the PR preview too. Compare the original and edited logo side by side, check only the four outer bounds against the grid, and verify that internal geometry, curves, proportions, and distinctive features remain faithful to the source. Adjust, reload, and inspect again until alignment and fidelity both pass; revert edits that improve alignment by changing the logo's character. Report the measured bounds and intentional antialiasing. If rendering is unavailable, leave visual verification incomplete.

Also render the affected icons at **16×16 with device scale factor 1** and inspect a nearest-neighbor enlargement of that raster. Inspect dark and light backgrounds and, for folders, both closed and open states. Check recognition, contrast, clipping, spacing, and outer-bound alignment. Inspect the isolated motive on transparency without rendering overrides. Antialiasing on curves, diagonals, and internal edges is expected; reducing partial-alpha pixels is not an acceptance criterion. Keep the canonical curved folder background unchanged.

Show an **inline image preview** in the response, including before/after views for corrections and the affected theme and folder states. An enlarged SVG alone cannot establish native-size sharpness. If rendering is unavailable, state that limitation rather than claiming visual verification.

Report outer-bound alignment and visual fidelity separately: give the four measured bounds and confirm the source comparison and native-size review. Internal edges falling between grid lines are not alignment failures.

## Prepare the contribution

Summarize the icon and association changes, validation performed, and any remaining limitations. When asked to publish, use a Conventional Commit PR title, follow the repository PR template, and link the originating issue. Describe visible behavior and include the preview when it can be attached through the available publishing tools. Commit, push, or open a PR only when the user's request authorizes those actions.
