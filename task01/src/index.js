import { add, list, done, stats, update, del } from './controllers/habits.controller.js';

const args = process.argv.slice(2);
const cmd = args[0];

const parseArgs = (args) => {
  const result = {};
  for (let i = 1; i < args.length; i += 2) {
    if (args[i].startsWith('--')) {
      const key = args[i].slice(2);
      result[key] = args[i + 1];
    }
  }
  return result;
};

const parsedArgs = parseArgs(args);

switch (cmd) {
  case 'add':
    await add({ name: parsedArgs.name, freq: parsedArgs.freq });
    break;
  case 'list':
    await list();
    break;
  case 'done':
    await done({ id: parsedArgs.id });
    break;
  case 'stats':
    await stats();
    break;
  case 'update':
    await update({ id: parsedArgs.id, name: parsedArgs.name, freq: parsedArgs.freq });
    break;
  case 'delete':
    await del({ id: parsedArgs.id });
    break;
  default:
    console.log('Unknown command. Use --help for reference.');
}