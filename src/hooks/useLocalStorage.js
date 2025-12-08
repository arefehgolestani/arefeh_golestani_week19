import { useEffect, useState } from "react";

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    try {
      const localState = localStorage.getItem(key);
    return localState ? JSON.parse(localState) : initialValue;
    } catch (error) {
      return localStorage.getItem(key);
    }
  });

  useEffect(() => {
    try {
      const toStore = typeof value === "string" ? value : JSON.stringify(value);
      localStorage.setItem(key, toStore);
    } catch (error) {
      console.log("LocalStorage write error:", error);
    }
  }, [value]);

  return [value, setValue];
};

export { useLocalStorage };
