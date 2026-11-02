---
name: new-icon
description: Create or adjust Material Icon Theme icons and associations.
---

# New icon

Follow [CONTRIBUTING.md](../../../CONTRIBUTING.md) and the linked issue or review feedback.

- Try simplifying the motive's shapes and details to align with the 16×16 grid, including internal edges where practical. Preserve the logo's recognizable silhouette, proportions, and defining features; keep the original geometry wherever simplification would substantially alter its character.
- Align the motive's four outer bounds to whole-pixel lines where this preserves the logo's character. Measure bounds after transforms; prefer translation and subtle proportional scaling. Keep natural curves and antialiasing where needed, allowing internal edges between pixels rather than forcing `shape-rendering="crispEdges"`.
- Folder motives must reach **x=16**, filling the rightmost pixel without clipping. This overrides the guide's general outer margin. Apply positioning feedback only on the requested axis and keep geometry consistent across theme variants.
- Inspect the edited SVG on a grid and at 16×16 with device scale factor 1, including dark/light themes and closed/open folders. Show an inline before/after preview with a nearest-neighbor enlargement, report the outer bounds, and disclose incomplete visual checks.
