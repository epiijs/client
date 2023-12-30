import fs from 'fs/promises';
import path from 'path';

import { IAppConfig, getDirNameByImportMeta } from '@epiijs/config';

function getLauncherDir(config: IAppConfig): string {
  return path.join(config.root, config.dirs.source, config.dirs.client, '.epiijs');
}

export async function deployLauncher(config: IAppConfig): Promise<void> {
  const launcherDir = getLauncherDir(config);
  await fs.rm(launcherDir, { recursive: true }).catch(error => {
    if (error.code !== 'ENOENT') { throw error; }
  });
  await fs.mkdir(launcherDir);

  const fixturesDir = path.join(getDirNameByImportMeta(import.meta), '../fixtures');
  const fixturesFiles = await fs.readdir(fixturesDir);

  for (const fileName of fixturesFiles) {
    const sourceFilePath = path.join(fixturesDir, fileName);
    const sourceFileContent = await fs.readFile(sourceFilePath, 'utf8');
    const targetFileContent = sourceFileContent.replace(/\$\{name\}/g, config.name);
    const targetFilePath = path.join(launcherDir, fileName);
    await fs.writeFile(targetFilePath, targetFileContent);
  }

  const vite = await import('vite');
  const pluginReact = await import('@vitejs/plugin-react');
  const viteConfig = vite.defineConfig({
    plugins: [pluginReact.default()]
  });
  const targetFileContent = `export default ${JSON.stringify(viteConfig, null, 2)}`;
  await fs.writeFile(path.join(launcherDir, 'vite.config.ts'), targetFileContent);
}

export async function startDevServer(config: IAppConfig): Promise<void> {
  // TODO: checkDependencies for react、react-dom、@types for react-*
  const vite = await import('vite');
  const server = await vite.createServer({
    configFile: false,
    root: getLauncherDir(config),
    server: {
      port: config.port.client
    }
  });
  await server.listen();
  server.printUrls();
  server.bindCLIShortcuts({ print: true });
}

export async function buildAppBundle(config: IAppConfig): Promise<void> {
  const vite = await import('vite');
  const launcherDir = getLauncherDir(config);
  const expectedDir = path.join(config.root, config.dirs.target, config.dirs.client);
  const relativeDir = path.relative(launcherDir, expectedDir);
  await vite.build({
    root: launcherDir,
    build: {
      outDir: relativeDir
    }
  });
}