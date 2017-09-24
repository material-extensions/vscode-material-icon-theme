export interface LanguageIcon {
    /**
     * Name of the icon, e.g. 'javascript'
     */
    icon: string;

    /**
     * Language ID, e.g. 'javascript'
     *
     * According to official VS Code documentation:
     * https://code.visualstudio.com/docs/languages/identifiers
     */
    languageId: string;

    /**
     * Define if the icon should be disabled.
     */
    disabled?: boolean;
}
