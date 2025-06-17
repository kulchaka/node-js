import { add, list, done, stats, update, del } from '../controllers/habits.controller.js';

export const router = async (cmd, args) => {
  switch (cmd) {
    case 'add':
      return add(args);
    case 'list':
      return list();
    case 'done':
      return done(args);
    case 'stats':
      return stats();
    case 'update':
      return update(args);
    case 'delete':
      return del(args);
    default:
      console.log('Unknown command. Use --help for reference.');
  }
};