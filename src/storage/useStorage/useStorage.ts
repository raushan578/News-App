import {useCallback} from 'react';
import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV();

export function useMmkvStorage() {
  const setItem = useCallback((key: string, value: any) => {
    try {
      storage.set(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting value for ${key}:`, error);
    }
  }, []);

  const getItem = useCallback((key: string) => {
    try {
      const value = storage.getString(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error(`Error getting value for ${key}:`, error);
      return null;
    }
  }, []);

  const removeItem = useCallback((key: string) => {
    try {
      storage.delete(key);
    } catch (error) {
      console.error(`Error removing value for ${key}:`, error);
    }
  }, []);

  // clear all data -- mmkv
  const clearAll = useCallback(() => {
    try {
      storage.clearAll();
    } catch (error) {
      console.error('Error clearing all values:', error);
    }
  }, []);

  return {setItem, getItem, removeItem, clearAll};
}
