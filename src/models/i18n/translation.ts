export interface Translation {
    themeInstalled?: string;
    howToActivate?: string;
    activate?: string;
    activated?: string;
    neverShowAgain?: string;
    themeUpdated?: string;
    readChangelog?: string;
    iconPacks?: {
        selectPack?: string;
        description?: string;
        disabled?: string;
    };
    folders?: {
        toggleIcons?: string;
        color?: string;
        hexCode?: string;
        wrongHexCode?: string;
        disabled?: string;
        theme?: {
            description?: string;
        };
    };
    opacity?: {
        inputPlaceholder?: string;
        wrongValue?: string;
    };
    toggleSwitch?: {
        on?: string;
        off?: string;
    };
    explorerArrows?: {
        toggle?: string;
        enable?: string;
        disable?: string;
    };
    confirmReload?: string;
    reload?: string;
    outdatedVersion?: string;
    updateVSCode?: string;
    grayscale?: {
        toggle?: string;
        enable?: string;
        disable?: string;
    };
    saturation?: {
        inputPlaceholder?: string;
        wrongValue?: string;
    };
}
