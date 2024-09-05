import { IconPack, type IconPackValue } from '../models/icons/iconPack';

/** Get all packs that can be used in this icon theme. */
export const availableIconPacks: IconPackValue[] = Object.values(IconPack);
