import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { now } from '../utils/utils.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_PATH = join(dirname(__dirname), 'database.json');

const readDB = async () => {
  try {
    const data = await readFile(DB_PATH, 'utf-8');
    return JSON.parse(data || '[]');
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
};

const writeDB = async (data) => {
  return writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
};

export const create = async (payload) => {
  const habits = await readDB();
  const newHabit = {
    id: Date.now().toString(),
    ...payload,
    done: false,
    createdAt: now().toISOString()
  };
  habits.push(newHabit);
  await writeDB(habits);
  return newHabit;
};

export const getAll = async () => {
  const habits = await readDB();
  return habits;
};

export const markDone = async (id) => {
  const habits = await readDB();

  const updatedHabit = habits.map((habit) => {
    if (habit.id === id) {
      return { ...habit, done: !habit.done };
    } else {
      return habit;
    }
  });
  await writeDB(updatedHabit);
  return updatedHabit.find((habit) => habit.id === id);
};

export const updateById = async (id, payload) => {
  const habits = await readDB();
  const updatedHabit = habits.map((habit) => {
    if (habit.id === id) {
      return { ...habit, name: payload?.name || habit.name, freq: payload?.freq || habit.freq };
    }
    return habit;
  });
  await writeDB(updatedHabit);
  return updatedHabit.find((habit) => habit.id === id);
};

export const deleteById = async (id) => {
  const habits = await readDB();
  const updatedHabit = habits.filter((habit) => {
    return habit.id !== id;
  });
  await writeDB(updatedHabit);
  return habits.find((habit) => habit.id === id);
};