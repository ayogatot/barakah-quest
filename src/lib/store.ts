import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getTodayDateString, isYesterday } from './utils';

export type EvolutionStage = 0 | 1 | 2 | 3 | 4 | 5;

export interface Habit {
  id: string;
  name: string;
  streak: number;
  lastCompletedDate: string | null;
  evolutionStage: EvolutionStage;
  history: string[];
}

interface DhuhaState {
  habits: Record<string, Habit>;
  hasStarted: boolean;
  
  // Actions
  markCompleted: (habitId: string) => void;
  checkStreak: () => void;
  resetProgress: () => void;
  setHasStarted: () => void;
}

const INITIAL_HABITS: Record<string, Habit> = {
  dhuha: {
    id: 'dhuha',
    name: 'Dhuha Prayer',
    streak: 0,
    lastCompletedDate: null,
    evolutionStage: 0,
    history: [],
  },
  sunnah_fajr: {
    id: 'sunnah_fajr',
    name: 'Sunnah Fajr',
    streak: 0,
    lastCompletedDate: null,
    evolutionStage: 0,
    history: [],
  },
  dawn_charity: {
    id: 'dawn_charity',
    name: 'Dawn Charity',
    streak: 0,
    lastCompletedDate: null,
    evolutionStage: 0,
    history: [],
  },
};

export const useDhuhaStore = create<DhuhaState>()(
  persist(
    (set, get) => ({
      habits: INITIAL_HABITS,
      hasStarted: false,

      markCompleted: (habitId: string) => {
        const { habits } = get();
        const habit = habits[habitId];
        if (!habit) return;

        const today = getTodayDateString();
        if (habit.lastCompletedDate === today) return; // Already done today

        const newStreak = habit.streak + 1;
        let newStage = habit.evolutionStage;

        // Evolution Logic
        if (newStreak >= 30) newStage = 5;
        else if (newStreak >= 14 && habit.evolutionStage < 4) newStage = 4;
        else if (newStreak >= 7 && habit.evolutionStage < 3) newStage = 3;
        else if (newStreak >= 3 && habit.evolutionStage < 2) newStage = 2;
        else if (newStreak >= 1 && habit.evolutionStage < 1) newStage = 1;

        set({
          habits: {
            ...habits,
            [habitId]: {
              ...habit,
              streak: newStreak,
              lastCompletedDate: today,
              evolutionStage: newStage as EvolutionStage,
              history: [...habit.history, today],
            },
          },
        });
      },

      checkStreak: () => {
        const { habits } = get();
        const today = getTodayDateString();
        let hasChanges = false;
        const newHabits = { ...habits };

        Object.keys(newHabits).forEach((key) => {
          const habit = newHabits[key];
          if (!habit.lastCompletedDate) return;
          if (habit.lastCompletedDate === today) return;
          if (isYesterday(habit.lastCompletedDate)) return;

          // Missed more than 1 day
          const newStage = Math.max(0, habit.evolutionStage - 1) as EvolutionStage;
          newHabits[key] = {
            ...habit,
            streak: 0,
            evolutionStage: newStage,
          };
          hasChanges = true;
        });

        if (hasChanges) {
          set({ habits: newHabits });
        }
      },

      resetProgress: () => {
        set({
          habits: INITIAL_HABITS,
          hasStarted: false,
        });
      },

      setHasStarted: () => {
        set({ hasStarted: true });
      },
    }),
    {
      name: 'dhuha-storage',
      skipHydration: true,
    }
  )
);
