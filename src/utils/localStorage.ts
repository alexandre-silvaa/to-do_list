import type { ITasks } from "@/@types/tasks.type";

export function removeItemFromLocalStorage<T extends { id: string }>(
  key: string,
  id: string
): void {
  const items = loadFromLocalStorage<T[]>(key, []);
  const filteredItems = items.filter((item) => item.id !== id);
  saveToLocalStorage(key, filteredItems);
}

export function getItemFromLocalStorage<T extends { id: string }>(
  key: string,
  id: string
): T | undefined {
  const items = loadFromLocalStorage<T[]>(key, []);
  return items.find((item) => item.id === id);
}

export function updateItemInLocalStorage<T extends ITasks>(
  key: string,
  id: string,
  update: Partial<T>
): void {
  const items = loadFromLocalStorage<T[]>(key, []);
  const updatedItems = items.map((item) =>
    item.id === id ? { ...item, ...update } : item
  );
  saveToLocalStorage(key, updatedItems);
}

export const loadFromLocalStorage = <T>(key: string, defaultValue: T): T => {
  if (typeof window === "undefined") {
    return defaultValue;
  }
  const stored = localStorage.getItem(key);
  if (stored) {
    try {
      return JSON.parse(stored) as T;
    } catch {
      return defaultValue;
    }
  }
  return defaultValue;
};

export const saveToLocalStorage = <T>(key: string, value: T): void => {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeFromLocalStorage = (key: string): void => {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.removeItem(key);
};
