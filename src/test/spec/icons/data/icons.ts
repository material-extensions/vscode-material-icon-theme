/** a file icon with just one node */
export const file = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <path d="M8,2V6h2V24a6,6,0,0,0,12,0V6h2V2Z" style="fill:#4db6ac"/>
</svg>
`;

export const fileFill = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <path d="M8,2V6h2V24a6,6,0,0,0,12,0V6h2V2Z" fill="#4db6ac"/>
</svg>
`;

/** an icon with a gradient */
export const gradient = `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32">
  <defs>
    <linearGradient id="a" x1="16" y1="25.0625" x2="16" y2="6.20391" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#b2dfdb"/>
      <stop offset="0.5" stop-color="#26a69a"/>
      <stop offset="1" stop-color="#00695c"/>
    </linearGradient>
  </defs>
  <path d="M8,2V6h2V24a6,6,0,0,0,12,0V6h2V2Z" style="fill:url(#a)"/>
</svg>
`;

/** a folder icon with many nodes */
export const folder = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <polygon points="12 8 12 6 2 6 2 26 30 26 30 8 12 8" style="fill:#009688"/>
  <path d="M20,12v2h2V24a4,4,0,0,0,8,0V14h2V12Z" style="fill:#b2dfdb;fill-rule:evenodd"/>
</svg>
`;

/** a folder icon asking for one node to not be recolorized */
export const folderIgnores = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <polygon points="12 8 12 6 2 6 2 26 30 26 30 8 12 8" style="fill:#009688"/>
  <path data-mit-no-recolor="true" d="M20,12v2h2V24a4,4,0,0,0,8,0V14h2V12Z" style="fill:red;fill-rule:evenodd"/>
</svg>
`;

/** an icon with a gradient that asks for the gradient node to not be recolorized */
export const gradientIgnore = `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32">
  <defs>
    <linearGradient data-mit-no-recolor="true" id="a" x1="16" y1="25" x2="16" y2="6" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#b2dfdb"/>
      <stop offset="0.5" stop-color="#26a69a"/>
      <stop offset="1" stop-color="#00695c"/>
    </linearGradient>
  </defs>
  <path d="M8,2V6h2V24a6,6,0,0,0,12,0V6h2V2Z" style="fill:url(#a)"/>
</svg>
`;
