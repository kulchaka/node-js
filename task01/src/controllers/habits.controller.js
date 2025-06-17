import * as service from '../services/habits.services.js';

export const add = async ({ name, freq }) => {
  if (!name || !freq) {
    console.log('🚫 Помилка: Необхідно вказати --name "назва звички" та --freq <daily|weekly|monthly>');
    return;
  }

  if (!['daily', 'weekly', 'monthly'].includes(freq)) {
    console.log('🚫 Помилка: Частота має бути одним з: daily, weekly, monthly');
    return;
  }

  try {
    const habit = await service.addHabit({ name, freq });
    console.log(`✅ Додано звичку "${habit.name}" (id: ${habit.id})`);
  } catch (error) {
    console.error(`🚫 Помилка: ${error.message}`);
    process.exitCode = 1;
  }
};

export const list = async () => {
  try {
    const habits = await service.getAllHabits();
    if (!habits.length) {
      console.log('📋 Список звичок порожній');
    } else {
      console.table(habits.map(({ id, name, freq, done, createdAt }) => ({
        id,
        name,
        freq,
        done: done,
        createdAt: createdAt.toLocaleString()
      })));
    }
  } catch (error) {
    console.error(`🚫 Помилка: ${error.message}`);
    process.exitCode = 1;
  }
};

export const done = async ({ id }) => {
  if (!id) {
    console.log('🚫 Помилка: Необхідно вказати --id <ідентифікатор>');
    return;
  }
  try {
    const habit = await service.markHabitDone(id);
    console.log(`✅ Звичку "${habit.name}" виконано`);
  } catch (error) {
    console.error(`🚫 Помилка: ${error.message}`);
    process.exitCode = 1;
  }
};

export const stats = async (rangeDays = 7) => {
  try {
    const stats = await service.statsHabit(rangeDays);
    console.log(`✅ Статистика за останні ${rangeDays} днів`);
    console.table(stats.map(({ id, name, percent }) => ({ id, name, percent })));
  } catch (error) {
    console.error(`🚫 Помилка: ${error.message}`);
    process.exitCode = 1;
  }
};

export const update = async ({ id, name, freq }) => {
  if (!id) {
    console.log('🚫 Помилка: Необхідно вказати --id <ідентифікатор>');
    return;
  }

  const updateData = {};
  if (name) updateData.name = name;
  if (freq) {
    if (!['daily', 'weekly', 'monthly'].includes(freq)) {
      console.log('🚫 Помилка: Частота має бути одним з: daily, weekly, monthly');
      return;
    }
    updateData.freq = freq;
  }

  if (Object.keys(updateData).length === 0) {
    console.log('🚫 Помилка: Необхідно вказати хоча б один параметр для оновлення (--name або --freq)');
    return;
  }

  try {
    await service.updateHabitById(id, { name, freq });
    console.log(`✅ Звичку id: ${id} оновлено`);
  } catch (error) {
    console.error(`🚫 Помилка: ${error.message}`);
    process.exitCode = 1;
  }
};

export const del = async ({ id }) => {
  if (!id) {
    console.log('🚫 Помилка: Необхідно вказати --id <ідентифікатор>');
    return;
  }
  try {
    const habit = await service.deleteHabitById(id);
    if (!habit) {
      console.log('🚫 Звичку не знайдено');
      return;
    }
    console.log(`✅ Звичку "${habit.name}" з id ${id} видалено`);
  } catch (error) {
    console.error(`🚫 Помилка: ${error.message}`);
    process.exitCode = 1;
  }
};