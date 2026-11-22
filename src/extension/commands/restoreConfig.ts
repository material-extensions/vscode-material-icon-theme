import { getConfigProperties, setConfig } from '../shared/config';

export const restoreDefaultConfig = async () => {
  const configProperties = Object.keys(getConfigProperties());
  await Promise.all(
    configProperties.map((configProperty) =>
      setConfig(configProperty, undefined, true)
    )
  );
};
