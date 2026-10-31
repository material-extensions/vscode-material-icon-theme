---
name: new-icon
description: Create or adjust Material Icon Theme icons and associations.
---

# New icon

Follow [CONTRIBUTING.md](../../../CONTRIBUTING.md) and the linked issue or review feedback.

- Align only the motive's four outer bounds to whole-pixel lines on the 16×16 grid. Measure bounds after transforms; prefer translation and subtle scaling that preserves proportions.
- Preserve the logo's character and internal geometry. Internal edges may fall between pixels; keep natural curves and antialiasing rather than reshaping them or forcing `shape-rendering="crispEdges"`.
- Folder motives must reach **x=16**, filling the rightmost pixel without clipping. This overrides the guide's general outer margin. Apply positioning feedback only on the requested axis and keep geometry consistent across theme variants.
- Inspect the edited SVG on a grid and at 16×16 with device scale factor 1, including dark/light themes and closed/open folders. Show an inline before/after preview with a nearest-neighbor enlargement, report the outer bounds, and disclose incomplete visual checks.
