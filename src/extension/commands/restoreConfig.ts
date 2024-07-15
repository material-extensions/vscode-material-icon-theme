import { getConfigProperties, setConfig } from '../shared/config';

/** Restore all configurations to default. */
export const restoreDefaultConfig = async () => {
  for (const configProperty of Object.keys(getConfigProperties())) {
    await setConfig(configProperty, undefined, true);
  }
};
