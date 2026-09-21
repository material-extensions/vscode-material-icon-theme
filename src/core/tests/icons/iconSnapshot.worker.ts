import { readFile } from 'node:fs/promises';
import { generateIconSnapshot } from '../../generator/generateIconSnapshot';
import { createLoggingObserver } from '../../logging/logger';
import type { Config } from '../../models/icons/config';

const [manifestPath, serializedConfig, version] = process.argv.slice(2);
const logs: string[] = [];
createLoggingObserver('debug', (event) => logs.push(event.message));

process.once('message', async () => {
  try {
    await generateIconSnapshot(
      JSON.parse(serializedConfig) as Config,
      manifestPath,
      version
    );
    process.send?.({ manifest: await readFile(manifestPath, 'utf8') });
    process.disconnect?.();
  } catch (error) {
    process.send?.({ error: `${String(error)}\n${logs.join('\n')}` });
    process.exitCode = 1;
    process.disconnect?.();
  }
});

process.send?.({ ready: true });
