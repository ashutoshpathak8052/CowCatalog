import { getCows, addCow, isEarTagUnique, filterCows } from '../storage/cowStorage';
import { generateId } from '../utils/helpers';

export const fetchCows = () => getCows();

export const createCow = async ({ earTag, sex, pen, status, weight }) => {
  const unique = await isEarTagUnique(earTag);
  if (!unique) throw new Error(`Ear tag "${earTag}" already exists.`);
  const cow = {
    id: generateId(),
    earTag: earTag.trim(),
    sex,
    pen,
    status: status || 'Active',
    weight: weight ? parseFloat(weight) : null,
    lastEventDate: new Date().toISOString().split('T')[0],
    createdAt: new Date().toISOString().split('T')[0],
  };
  await addCow(cow);
  return cow;
};

export const searchAndFilter = (cows, filters) => filterCows(cows, filters);
