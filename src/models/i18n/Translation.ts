export interface Translation {
    themeInstalled?: string;
    howToActivate?: string;
    activate?: string;
    activated?: string;
    neverShowAgain?: string;
    themeUpdated?: string;
    readChangelog?: string;
    angular?: {
        alreadyEnabled?: string;
        alreadyDisabled?: string;
        enableIcons?: string;
        disableIcons?: string;
        toggleIcons?: string;
    };
    folders?: {
        alreadyEnabled?: string;
        alreadyDisabled?: string;
        enableIcons?: string;
        disableIcons?: string;
        toggleIcons?: string;
        specific?: {
            name?: string;
            description?: string;
        };
        classic?: {
            name?: string;
            description?: string;
        };
        blue?: {
            name?: string;
            description?: string;
        };
        none?: {
            name?: string;
            description?: string;
        }
    };
    toggleSwitch?: {
        on?: string;
        off?: string;
    };
    confirmReload?: string;
    reload?: string;
    outdatedVersion?: string;
    updateVSCode?: string;
}