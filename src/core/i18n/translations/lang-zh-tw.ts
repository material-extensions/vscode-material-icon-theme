import type { Translation } from '../../models/i18n/translation';

export const translation: Translation = {
  activate: '啟用',
  activated: 'Material Icon Theme 已啟用。',
  iconPacks: {
    selectPack: '選取圖示套件',
    description: '選取「%0」圖示套件',
    disabled: '停用圖示套件',
  },
  folders: {
    toggleIcons: '選取資料夾佈景主題',
    disabled: '無資料夾圖示',
    theme: {
      description: '選取「%0」資料夾佈景主題',
    },
  },
  colorSelect: {
    color: '選擇色彩',
    hexCode: '插入十六進位色彩代碼',
    wrongHexCode: '無效的十六進位色彩代碼!',
  },
  opacity: {
    inputPlaceholder: '不透明度值 (介於 0 到 1 之間)',
    wrongValue: '請輸入介於 0 到 1 之間的浮點數。',
  },
  toggleSwitch: {
    on: '開啟',
    off: '關閉',
  },
  explorerArrows: {
    toggle: '切換檔案總管中的資料夾箭頭圖示',
    enable: '顯示檔案總管中的資料夾箭頭圖示',
    disable: '隱藏檔案總管中的資料夾箭頭圖示',
  },
  grayscale: {
    toggle: '切換灰階圖示',
    enable: '啟用灰階圖示',
    disable: '停用灰階圖示',
  },
  saturation: {
    inputPlaceholder: '飽和度值 (介於 0 到 1 之間)',
    wrongValue: '請輸入介於 0 到 1 之間的浮點數。',
  },
};
