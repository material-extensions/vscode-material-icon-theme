import { DefaultIcon, IconPack } from '../index';

export interface LanguageIcon {
  /**
   * Icon for the language identifier
   */
  icon: DefaultIcon;

  /**
   * Language ID, e.g. 'javascript'
   *
   * According to official VS Code documentation:
   * https://code.visualstudio.com/docs/languages/identifiers
   */
  ids: string[];

  /**
   * Define if the icon should be disabled.
   */
  disabled?: boolean;

  /**
   * Defines a pack to which this icon belongs. A pack can be toggled and all icons inside this pack can be enabled or disabled together.
   */
  enabledFor?: IconPack[];
}
