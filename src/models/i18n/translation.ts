export interface Translation {
  activate: string;
  activated: string;
  iconPacks: {
    selectPack: string;
    description: string;
    disabled: string;
  };
  folders: {
    toggleIcons: string;
    color: string;
    hexCode: string;
    wrongHexCode: string;
    disabled: string;
    theme: {
      description: string;
    };
  };
  opacity: {
    inputPlaceholder: string;
    wrongValue: string;
  };
  toggleSwitch: {
    on: string;
    off: string;
  };
  explorerArrows: {
    toggle: string;
    enable: string;
    disable: string;
  };
  grayscale: {
    toggle: string;
    enable: string;
    disable: string;
  };
  saturation: {
    inputPlaceholder: string;
    wrongValue: string;
  };
}
