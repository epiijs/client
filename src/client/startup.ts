import verifyConfig, { IMaybeAppConfig } from '@epiijs/config';

import { buildAppBundle, deployLauncher, startDevServer } from './builder';

export async function startClient(config: IMaybeAppConfig): Promise<void> {
  const verifiedConfig = verifyConfig(config);
  await deployLauncher(verifiedConfig);
  await startDevServer(verifiedConfig);
}

export async function buildClient(config: IMaybeAppConfig): Promise<void> {
  const verifiedConfig = verifyConfig(config);
  await deployLauncher(verifiedConfig);
  await buildAppBundle(verifiedConfig);
}