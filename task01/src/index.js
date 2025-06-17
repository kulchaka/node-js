import { router } from './routers/habits.routers.js';
import { parseArgs } from './utils/utils.js';

const [cmd, ...rawArgs] = process.argv.slice(2);
const args = parseArgs([cmd, ...rawArgs]);
await router(cmd, args);
