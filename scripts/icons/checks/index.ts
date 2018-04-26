import * as checkAvailability from './checkIconAvailability';
import * as checkIconConflicts from './checkIconConflicts';
import * as checkIconUsage from './checkIconUsage';

checkAvailability.check();
checkIconUsage.check();
checkIconConflicts.check();
