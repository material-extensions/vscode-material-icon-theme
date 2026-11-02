---
name: new-icon
description: Create or adjust Material Icon Theme icons and associations.
---

# New icon

Follow [CONTRIBUTING.md](../../../CONTRIBUTING.md) and the linked issue or review feedback.

- Simplify the motive for its final 16×16 size: redraw small details as squares, rectangles, or simpler paths, aligning straight edges and negative-space gaps to whole-pixel lines. Aim for visible details and gaps at least one pixel wide. Adjust local proportions where this improves legibility while preserving the distinctive silhouette and defining features that make the logo recognizable.
- Keep curves where they carry the logo's identity; other curves may become straight edges.
- Align the motive's four outer bounds to whole-pixel lines where this preserves its character. Measure bounds after transforms. Keep natural antialiasing on retained curves, allowing them between pixels rather than forcing `shape-rendering="crispEdges"`.
- Folder motives must reach **x=16**, filling the rightmost pixel without clipping. This overrides the guide's general outer margin. Apply positioning feedback only on the requested axis and keep geometry consistent across theme variants.
- Inspect the edited SVG on a grid and at 16×16 with device scale factor 1, including dark/light themes and closed/open folders. Compare it with the original at native size; reduce or undo simplifications that obscure defining features or make the logo harder to recognize. Show an inline before/after preview with a nearest-neighbor enlargement, report the outer bounds, and disclose incomplete visual checks.
