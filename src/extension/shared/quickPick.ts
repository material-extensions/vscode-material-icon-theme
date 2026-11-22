import {
  window as codeWindow,
  type QuickPickItem,
  type QuickPickOptions,
} from 'vscode';

const SELECTED_ICON = '\u2714';
const UNSELECTED_ICON = '\u25FB';

/** Add a selected or unselected indicator to a QuickPick item. */
export const createSelectionItem = <T extends Omit<QuickPickItem, 'label'>>(
  item: T,
  selected: boolean
): T & Pick<QuickPickItem, 'label'> => ({
  ...item,
  label: selected ? SELECTED_ICON : UNSELECTED_ICON,
});

/** Show a QuickPick with the common options used by extension commands. */
export const showQuickPick = <T extends QuickPickItem>(
  items: T[],
  options: QuickPickOptions
) =>
  codeWindow.showQuickPick(items, {
    ignoreFocusOut: false,
    matchOnDescription: true,
    ...options,
  });
