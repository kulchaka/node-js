import { getAll, create, updateById, deleteById, markDone } from '../models/habits.models.js';
import { now } from '../utils/timeShift.js';

export const addHabit = async (payload) => {
  return create(payload);
};

export const getAllHabits = async () => {
  return getAll();
};

export const markHabitDone = async (id) => {
  return markDone(id);
};

export const statsHabit = async (rangeDays = 7) => {
  const habits = await getAll();
  const today = now();
  const fromDate = new Date(today);
  fromDate.setDate(today.getDate() - rangeDays);

  return habits.map(habit => {
    if (!habit.history) {
      return { id: habit.id, name: habit.name, percent: 0 };
    }
    const completedDays = habit.history.filter(date => {
      const completionDate = new Date(date);
      return completionDate >= fromDate && completionDate <= today;
    }).length;

    let expectedDays = rangeDays;
    if (habit.freq === 'weekly') {
      expectedDays = Math.ceil(rangeDays / 7);
    } else if (habit.freq === 'monthly') {
      expectedDays = Math.ceil(rangeDays / 30);
    }

    const percent = expectedDays > 0 ? Math.round((completedDays / expectedDays) * 100) : 0;
    return { id: habit.id, name: habit.name, percent };
  });
};

export const deleteHabitById = async (id) => {
  return deleteById(id);
};

export const updateHabitById = async (id, payload) => {
  return updateById(id, payload);
};
