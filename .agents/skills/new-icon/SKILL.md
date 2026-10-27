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
- Design against a 16×16 pixel grid. For block-shaped marks, place horizontal and vertical filled edges on whole-pixel boundaries at the rendered 16px size. Check the final geometry after transforms; integer source coordinates alone do not prove alignment.
- Preserve the recognizable silhouette while simplifying details that disappear at 16px. Curves and diagonals can require fractional coordinates and antialiasing; avoid distorting them merely to remove decimals.
- Honor explicit positioning feedback on the requested axis. For example, “align to the most right, bottom is good” means move the mark horizontally until its rightmost edge reaches x=16, keep every vertical coordinate unchanged, and keep all artwork inside the viewBox. Otherwise follow the contribution guide's outer spacing.
- Apply the same geometry correction to every theme variant; preserve their contrasting colors.

For folder icons, use the canonical `viewBox="0 0 16 16"` and `id="folder"` path from the contribution guide. Keep that background geometry intact. Put the foreground artwork in `id="motive"`, using a group when necessary. Author the closed variants and use the repository generator for open variants; generated open SVGs stay out of the commit.

## Wire and verify

Update the relevant association definition under `src/core/icons/` and follow nearby entries for theme flags, icon packs, and cloning. Read the current `package.json` scripts to choose the generation and validation commands.

Generate any required manifest, clone, and open-folder outputs, then run the icon and color checks. The color-check script reads staged SVGs: for unstaged artwork, invoke its configured linter with the explicit SVG paths. An empty file list does not validate the colors. Run focused tests when changing association or generator behavior. Keep the authored SVGs and association changes in the diff; inspect generated output without committing ignored build files.

Render the affected icons at **16×16 with device scale factor 1** and at a larger inspection size. Inspect dark and light backgrounds and, for folders, both closed and open states. Check contrast, clipping, spacing, and grid alignment. For a mark made entirely of pixel-aligned horizontal and vertical fills, rendering the isolated mark on transparency should produce only fully opaque or transparent pixels. This check applies to the mark, not the curved folder background.

Show an **inline image preview** in the response, including before/after views for corrections and the affected theme and folder states. An enlarged SVG alone cannot establish native-size sharpness. If rendering is unavailable, state that limitation rather than claiming visual verification.

## Prepare the contribution

Summarize the icon and association changes, validation performed, and any remaining limitations. When asked to publish, use a Conventional Commit PR title, follow the repository PR template, and link the originating issue. Describe visible behavior and include the preview when it can be attached through the available publishing tools. Commit, push, or open a PR only when the user's request authorizes those actions.
