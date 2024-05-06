import { PatternType } from '../../icons/patterns/utils';
import { FileIcon } from '../icons';

export type Patterns = Record<string, PatternType>;
export type RawFileIcons = (FileIcon & { patterns?: Patterns })[];

export type Method = 'CONF' | 'ECMA' | 'BOTH';
export type PatternFunction = (key: string) => string[];
