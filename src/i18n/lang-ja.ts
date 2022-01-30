import { Translation } from '../models';

export const translation: Translation = {
  themeInstalled: 'Material Icon Theme がインストールされました。',
  howToActivate: 'アイコンの有効化方法',
  activate: '有効化',
  activated: 'Material Icon Theme は有効です。',
  neverShowAgain: '今後は表示しない',
  themeUpdated: 'Material Icon Theme が更新されました。',
  readChangelog: '変更履歴を読む',
  iconPacks: {
    selectPack: 'アイコンパックを選択する',
    description: "アイコンパック '%0' を選択する",
    disabled: 'アイコンパックを無効化する',
  },
  folders: {
    toggleIcons: 'フォルダーアイコンを切り替える',
    color: 'フォルダーの色を切り替える',
    hexCode: 'HEX カラーコードを入力する',
    wrongHexCode: '無効な HEX カラーコードです！',
    disabled: 'フォルダーアイコンを表示しない',
    theme: {
      description: "フォルダーテーマ '%0' を選択する",
    },
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
  confirmReload:
    'アイコンの変更を反映するには VS Code を再起動する必要があります。',
  reload: '再起動',
  outdatedVersion:
    'このコマンドを使用するには VS Code を更新する必要があります。',
  updateVSCode: 'VS Code を更新',
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
