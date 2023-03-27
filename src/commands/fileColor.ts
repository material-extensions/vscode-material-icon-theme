import { QuickPickItem, window as codeWindow } from 'vscode';
import { getMaterialIconsJSON, setThemeConfig } from '../helpers';
import { translate } from '../i18n';
import { getDefaultIconOptions, validateHEXColorCode } from '../icons';

interface FileColor {
  label: string;
  hex: string;
}

const iconPalette: FileColor[] = [
  { label: 'Grey (Default)', hex: '#90a4ae' },
  { label: 'Blue', hex: '#42a5f5' },
  { label: 'Green', hex: '#7CB342' },
  { label: 'Teal', hex: '#26A69A' },
  { label: 'Red', hex: '#EF5350' },
  { label: 'Orange', hex: '#FF7043' },
  { label: 'Yellow', hex: '#FDD835' },
  { label: 'Custom Color', hex: 'Custom HEX Code' },
];

/** Command to toggle the file icons. */
export const changeFileColor = async () => {
  try {
    const status = checkFileColorStatus();
    const response = await showQuickPickItems(status);
    if (response) {
      handleQuickPickActions(response);
    }
  } catch (error) {
    console.error(error);
  }
};

/** Show QuickPick items to select preferred color for the file icons. */
const showQuickPickItems = (currentColor: string) => {
  const options = iconPalette.map(
    (color): QuickPickItem => ({
      description: color.label,
      label: isColorActive(color, currentColor) ? '\u2714' : '\u25FB',
    })
  );

  return codeWindow.showQuickPick(options, {
    placeHolder: translate('colorSelect.color'),
    ignoreFocusOut: false,
    matchOnDescription: true,
  });
};

/** Handle the actions from the QuickPick. */
const handleQuickPickActions = async (value: QuickPickItem) => {
  if (!value || !value.description) return;
  if (value.description === 'Custom Color') {
    const value = await codeWindow.showInputBox({
      placeHolder: translate('colorSelect.hexCode'),
      ignoreFocusOut: true,
      validateInput: validateColorInput,
    });
    if (value) {
      setColorConfig(value);
    }
  } else {
    const hexCode = iconPalette.find((c) => c.label === value.description)?.hex;
    if (hexCode) {
      setColorConfig(hexCode);
    }
  }
};

const validateColorInput = (colorInput: string) => {
  if (!validateHEXColorCode(colorInput)) {
    return translate('colorSelect.wrongHexCode');
  }
  return undefined;
};

/** Check status of the file color */
export const checkFileColorStatus = (): string => {
  const defaultOptions = getDefaultIconOptions();
  const config = getMaterialIconsJSON();
  return config?.options?.files?.color ?? defaultOptions.files.color!;
};

const setColorConfig = (value: string) => {
  setThemeConfig('files.color', value.toLowerCase(), true);
};

const isColorActive = (color: FileColor, currentColor: string): boolean => {
  if (color.label === 'Custom Color') {
    return !iconPalette.some(
      (c) => c.hex.toLowerCase() === currentColor.toLowerCase()
    );
  }
  return color.hex.toLowerCase() === currentColor.toLowerCase();
};
