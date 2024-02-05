import { IconAssociations, IconJsonOptions } from '../models';

export interface LucodearOptions {
  enable?: boolean;
  ignoreLookupPaths?: string[];
  files?: {
    regexAssociations?: IconAssociations;
  };
  folders?: {
    regexAssociations?: IconAssociations;
  };
}

export type ExtendedOptions = IconJsonOptions & {
  lucodear: LucodearOptions;
};
