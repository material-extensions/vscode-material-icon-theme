/**
 * Defines icon packs that can be toggled.
 */
export enum IconPack {
  Angular = 'angular',
  Nest = 'nest',
  Ngrx = 'angular_ngrx',
  React = 'react',
  Redux = 'react_redux',
  Roblox = 'roblox',
  Qwik = 'qwik',
  Vue = 'vue',
  Vuex = 'vue_vuex',
}

export type IconPackValue = `${IconPack}` | '';
