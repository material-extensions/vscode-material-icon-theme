import type { Translation } from '../../models/i18n/translation';

export const translation: Translation = {
  activate: '활성화',
  activated: 'Material Icon Theme이 활성화되었습니다.',
  iconPacks: {
    selectPack: '아이콘 팩 선택',
    description: "'%0' 아이콘 팩 선택",
    disabled: '아이콘 팩 비활성화',
  },
  folders: {
    toggleIcons: '폴더 테마 선택',
    disabled: '폴더 아이콘 없음',
    theme: {
      description: "'%0' 폴더 테마 선택",
    },
  },
  colorSelect: {
    color: '색상 선택',
    hexCode: 'HEX 색상 코드 입력',
    wrongHexCode: '유효하지 않은 HEX 색상 코드입니다!',
  },
  opacity: {
    inputPlaceholder: '투명도 값 (0과 1 사이)',
    wrongValue: '0과 1 사이의 부동 소수점 숫자를 입력하세요.',
  },
  toggleSwitch: {
    on: '켜짐',
    off: '꺼짐',
  },
  explorerArrows: {
    toggle: '파일 탐색기의 폴더 화살표 설정',
    enable: '파일 탐색기의 폴더 화살표 표시',
    disable: '파일 탐색기의 폴더 화살표 숨기기',
  },
  grayscale: {
    toggle: '그레이스케일 아이콘 설정',
    enable: '그레이스케일 아이콘 활성화',
    disable: '그레이스케일 아이콘 비활성화',
  },
  saturation: {
    inputPlaceholder: '채도 값 (0과 1 사이)',
    wrongValue: '0과 1 사이의 부동 소수점 숫자를 입력하세요.',
  },
};
