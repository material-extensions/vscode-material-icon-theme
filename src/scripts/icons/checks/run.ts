import { yellow } from '../../helpers/painter';
import { check as checkAvailability } from './checkIconAvailability';
import { check as checkIconConflicts } from './checkIconConflicts';
import { check as checkIconUsage } from './checkIconUsage';

console.log('> Material Icon Theme:', yellow('Running icon checks...'));
checkAvailability();
checkIconUsage();
checkIconConflicts();
