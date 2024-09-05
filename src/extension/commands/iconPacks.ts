import { type QuickPickItem, window as codeWindow } from 'vscode';
import { logger, toTitleCase, translate } from '../../core';
import { availableIconPacks } from '../../core/helpers/iconPacks';
import type { IconPackValue } from '../../core/models/icons/iconPack';
import { getThemeConfig, setThemeConfig } from '../shared/config';

/** Command to toggle the icons packs */
export const toggleIconPacks = async () => {
  try {
    const activeIconPack = getActiveIconPack();
    const response = await showQuickPickItems(activeIconPack);
    if (response) {
      handleQuickPickActions(response);
    }
  } catch (error) {
    logger.error(error);
  }
};

/** Show QuickPick items to select preferred configuration for the icon packs. */
const showQuickPickItems = (activePack: IconPackValue) => {
  const packs = [...availableIconPacks.sort(), 'none'] as (
    | IconPackValue
    | 'none'
  )[];
  const options = packs.map((pack): QuickPickItem => {
    const packLabel = toTitleCase(pack.replace('_', ' + '));
    const active = isPackActive(activePack, pack);
    const iconPacksDeactivated = pack === 'none' && activePack === '';

    return {
      description: packLabel,
      detail: translate(
        `iconPacks.${pack === 'none' ? 'disabled' : 'description'}`,
        packLabel
      ),
      label: iconPacksDeactivated ? '\u2714' : active ? '\u2714' : '\u25FB',
    };
  });

  return codeWindow.showQuickPick(options, {
    placeHolder: translate('iconPacks.selectPack'),
    ignoreFocusOut: false,
    matchOnDescription: true,
    matchOnDetail: true,
  });
};

/** Handle the actions from the QuickPick. */
const handleQuickPickActions = (value: QuickPickItem) => {
  if (!value || !value.description) return;
  const decision = value.description.replace(' + ', '_').toLowerCase() as
    | IconPackValue
    | 'none';

  setThemeConfig('activeIconPack', decision === 'none' ? '' : decision, true);
};

const getActiveIconPack = () => {
  return getThemeConfig<IconPackValue>('activeIconPack') ?? '';
};

const isPackActive = (activePack: string, pack: string) => {
  return activePack.toLowerCase() === pack.toLowerCase();
};
