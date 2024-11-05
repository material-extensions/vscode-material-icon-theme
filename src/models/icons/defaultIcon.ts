export interface DefaultIcon {
  /**
   * Name of the icon, e.g. 'src'
   */
  name: string;

  /**
   * Define if there is a light icon available.
   */
  light?: boolean;

  /**
   * Define if there is a high contrast icon available.
   */
  highContrast?: boolean;
}
