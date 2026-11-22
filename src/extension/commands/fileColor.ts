import { window as codeWindow, type QuickPickItem } from 'vscode';
import {
  getDefaultConfig,
  logger,
  translate,
  validateHEXColorCode,
} from '../../core';
import { getThemeConfig, setThemeConfig } from '../shared/config';
import { createSelectionItem, showQuickPick } from '../shared/quickPick';

type FileColor = {
  label: string;
  hex: string;
};

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
    logger.error(error);
  }
};

/** Show QuickPick items to select preferred color for the file icons. */
const showQuickPickItems = (currentColor: string) => {
  const options = iconPalette.map((color) =>
    createSelectionItem(
      { description: color.label },
      isColorActive(color, currentColor)
    )
  );

  return showQuickPick(options, {
    placeHolder: translate('colorSelect.color'),
    ignoreFocusOut: false,
    matchOnDescription: true,
  });
};

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

export const checkFileColorStatus = (): string => {
  const defaultConfig = getDefaultConfig();
  return getThemeConfig<string>('files.color') ?? defaultConfig.files.color;
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
