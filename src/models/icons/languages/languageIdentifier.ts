import { DefaultIcon, IconPack } from '../index';

export interface LanguageIdentifier {
    /**
     * Language ID, e.g. 'javascript'
     *
     * According to official VS Code documentation:
     * https://code.visualstudio.com/docs/languages/identifiers
     */
    id: string;

    /**
     * Icon for the language identifier
     */
    icon: DefaultIcon;

    /**
     * Define if the icon should be disabled.
     */
    disabled?: boolean;

    /**
     * Defines a pack to which this icon belongs. A pack can be toggled and all icons inside this pack can be enabled or disabled together.
     */
    pack?: IconPack;
}
