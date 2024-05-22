import { Translation } from '../models';

export const translation: Translation = {
  activate: '有効化',
  activated: 'Material Icon Theme は有効です。',
  iconPacks: {
    selectPack: 'アイコンパックを選択する',
    description: "アイコンパック '%0' を選択する",
    disabled: 'アイコンパックを無効化する',
  },
  folders: {
    toggleIcons: 'フォルダーアイコンを切り替える',
    disabled: 'フォルダーアイコンを表示しない',
    theme: {
      description: "フォルダーテーマ '%0' を選択する",
    },
  },
  colorSelect: {
    color: '色を変える',
    hexCode: 'HEX カラーコードを入力する',
    wrongHexCode: '無効な HEX カラーコードです！',
  },
  opacity: {
    inputPlaceholder: '不透明度（0〜1）',
    wrongValue: '値は0から1の間にしてください！',
  },
  toggleSwitch: {
    on: 'ON',
    off: 'OFF',
  },
  explorerArrows: {
    toggle: 'フォルダーの矢印を切り替える',
    enable: 'フォルダーの矢印を表示する',
    disable: 'フォルダーの矢印を隠す',
  },
  grayscale: {
    toggle: 'グレースケールアイコンを切り替える',
    enable: 'グレースケールアイコンを有効にする',
    disable: 'グレースケールアイコンを無効にする',
  },
  saturation: {
    inputPlaceholder: '彩度（0〜1）',
    wrongValue: '値は0から1の間にしてください！',
  },
};
