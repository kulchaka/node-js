const shift = Number(process.env.SHIFT_DAYS || 0);
export const now = () => {
  const d = new Date();
  d.setDate(d.getDate() + shift);
  return d;
};