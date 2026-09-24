import { yellow } from '../../helpers/painter';
import { check as checkFolderIconStructure } from './checkFolderIconStructure';
import { check as checkFolderNameDots } from './checkFolderNameDots';
import { check as checkAvailability } from './checkIconAvailability';
import { check as checkIconConflicts } from './checkIconConflicts';
import { check as checkIconUsage } from './checkIconUsage';

console.log('> Material Icon Theme:', yellow('Running icon checks...'));
await checkAvailability();
await checkIconUsage();
await checkIconConflicts();
await checkFolderNameDots();
await checkFolderIconStructure();
