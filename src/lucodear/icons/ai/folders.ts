import { LucodearFolderIcon } from '../../model';
import { lucodear } from '../utils';

const pyfolder = (...x: string[]) => x.flatMap((x) => [x, `_${x}`, `__${x}`]);
const extend = (...x: string[]) =>
  pyfolder(...x).flatMap((x) => [x, `=${x}`, `~${x}`, `@${x}`]);

const light = (conf: LucodearFolderIcon) => ({
  ...conf,
  light: true,
});

const folder = (name: string, ...others: string[]): LucodearFolderIcon => ({
  name: `ai-${name}`,
  folderNames: extend(name, ...others),
});

export const folders = lucodear('ai', [
  light(folder('agent', 'agents')),
  light(folder('chain', 'chains')),
  folder('chromadb', 'chroma'),
  folder('huggingface', 'hf', 'hugging_face', 'hugging-face'),
  light(
    folder(
      'llm',
      'language-model',
      'language-models',
      'language_model',
      'language_models'
    )
  ),
  {
    name: `ai`,
    light: true,
    folderNames: extend(
      'ai',
      'ai',
      'artificial-intelligence',
      'ia',
      'ml',
      'machine-learning',
      'artificial_intelligence',
      'machine_learning'
    ),
  },
  light(
    folder(
      'vector',
      'vectors',
      'vectordb',
      'vector-db',
      'vector-dbs',
      'vector_db',
      'vector_dbs',
      'vector_databases',
      'vector_database',
      'vector-databases',
      'vector-database'
    )
  ),
] as LucodearFolderIcon[]);
