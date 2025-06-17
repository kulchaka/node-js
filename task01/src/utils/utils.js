export const parseArgs = (args) => {
  const result = {};
  args.forEach((arg, index) => {
    if (arg.startsWith('--')) {
      const key = arg.slice(2);
      result[key] = args[index + 1];
    }
  });
  return result;
};

const shift = Number(process.env.SHIFT_DAYS || 0);

export const now = () => {
  const d = new Date();
  d.setDate(d.getDate() + shift);
  return d;
};