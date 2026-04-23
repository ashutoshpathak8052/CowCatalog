import AsyncStorage from '@react-native-async-storage/async-storage';
import { MOCK_COWS } from './mockData';

const STORAGE_KEY = '@cow_catalog';

export const getCows = async () => {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  if (data) return JSON.parse(data);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_COWS));
  return MOCK_COWS;
};

export const addCow = async cow => {
  const cows = await getCows();
  const updated = [...cows, cow];
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

export const isEarTagUnique = async earTag => {
  const cows = await getCows();
  return !cows.some(c => c.earTag.toLowerCase() === earTag.toLowerCase());
};

export const filterCows = (cows, { search, status, pen }) => {
  return cows.filter(cow => {
    const matchSearch = !search || cow.earTag.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !status || cow.status === status;
    const matchPen = !pen || cow.pen === pen;
    return matchSearch && matchStatus && matchPen;
  });
};
