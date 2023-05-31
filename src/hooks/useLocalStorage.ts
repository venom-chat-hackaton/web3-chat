import { useState } from "react";

export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T | undefined, (v: T) => void, () => void] => {
  const [storedValue, setStoredValue] = useState<T | undefined>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteValue = () => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(key);
        setStoredValue(undefined);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue, deleteValue];
};
