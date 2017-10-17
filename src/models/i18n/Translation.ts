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
        enableIcons?: string;
        disableIcons?: string;
        toggleIcons?: string;
    };
    folders?: {
        enableIcons?: string;
        disableIcons?: string;
        toggleIcons?: string;
        disabled?: string;
        theme?: {
            description?: string;
        };
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
}
