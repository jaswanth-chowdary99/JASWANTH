// Local storage utilities for client-side data persistence

const STORAGE_KEYS = {
  USER_PREFERENCES: "bodbot_user_preferences",
  USER_STATS: "bodbot_user_stats", 
  USER_PROGRESS: "bodbot_user_progress",
  WORKOUT_HISTORY: "bodbot_workout_history"
} as const;

export function saveToLocalStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error("Failed to save to localStorage:", error);
  }
}

export function loadFromLocalStorage<T>(key: string): T | null {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Failed to load from localStorage:", error);
    return null;
  }
}

export function removeFromLocalStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Failed to remove from localStorage:", error);
  }
}

export function clearAllLocalStorage(): void {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  } catch (error) {
    console.error("Failed to clear localStorage:", error);
  }
}

// Specific helper functions for app data
export const localStorageHelpers = {
  preferences: {
    save: (data: any) => saveToLocalStorage(STORAGE_KEYS.USER_PREFERENCES, data),
    load: () => loadFromLocalStorage(STORAGE_KEYS.USER_PREFERENCES),
    clear: () => removeFromLocalStorage(STORAGE_KEYS.USER_PREFERENCES)
  },
  
  stats: {
    save: (data: any) => saveToLocalStorage(STORAGE_KEYS.USER_STATS, data),
    load: () => loadFromLocalStorage(STORAGE_KEYS.USER_STATS),
    clear: () => removeFromLocalStorage(STORAGE_KEYS.USER_STATS)
  },
  
  progress: {
    save: (data: any) => saveToLocalStorage(STORAGE_KEYS.USER_PROGRESS, data),
    load: () => loadFromLocalStorage(STORAGE_KEYS.USER_PROGRESS),
    clear: () => removeFromLocalStorage(STORAGE_KEYS.USER_PROGRESS)
  },
  
  workoutHistory: {
    save: (data: any) => saveToLocalStorage(STORAGE_KEYS.WORKOUT_HISTORY, data),
    load: () => loadFromLocalStorage(STORAGE_KEYS.WORKOUT_HISTORY),
    clear: () => removeFromLocalStorage(STORAGE_KEYS.WORKOUT_HISTORY)
  }
};
