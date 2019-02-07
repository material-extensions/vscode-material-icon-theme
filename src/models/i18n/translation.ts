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
    hidesExplorerArrows?: {
        toggleArrows?: string;
        enableArrows?: string;
        disableArrows?: string;
    };
    confirmReload?: string;
    reload?: string;
    outdatedVersion?: string;
    updateVSCode?: string;
    grayscale?: {
        toggleGrayscale?: string;
        enableGrayscale?: string;
        disableGrayscale?: string;
    };
}
