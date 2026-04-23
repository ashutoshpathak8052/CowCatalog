import { generateId } from '../utils/helpers';

export const MOCK_COWS = [
  {
    id: generateId(),
    earTag: 'ET-001',
    sex: 'Female',
    pen: 'Pen A',
    status: 'Active',
    weight: 520,
    lastEventDate: '2025-06-01',
    createdAt: '2025-01-10',
  },
  {
    id: generateId(),
    earTag: 'ET-002',
    sex: 'Male',
    pen: 'Pen B',
    status: 'In Treatment',
    weight: 680,
    lastEventDate: '2025-06-10',
    createdAt: '2025-02-14',
  },
  {
    id: generateId(),
    earTag: 'ET-003',
    sex: 'Female',
    pen: 'Pen A',
    status: 'Active',
    weight: 490,
    lastEventDate: '2025-05-28',
    createdAt: '2025-03-01',
  },
  {
    id: generateId(),
    earTag: 'ET-004',
    sex: 'Male',
    pen: 'Pen C',
    status: 'Deceased',
    weight: 710,
    lastEventDate: '2025-04-15',
    createdAt: '2025-01-20',
  },
  {
    id: generateId(),
    earTag: 'ET-005',
    sex: 'Female',
    pen: 'Pen D',
    status: 'Active',
    weight: 540,
    lastEventDate: '2025-06-12',
    createdAt: '2025-04-05',
  },
];

export const MOCK_EVENTS = [
  { id: 1, type: 'Weight Check', date: '2025-06-01', note: 'Routine weigh-in' },
  { id: 2, type: 'Moved', date: '2025-05-15', note: 'Transferred to Pen A' },
  { id: 3, type: 'Treatment', date: '2025-04-20', note: 'Vitamin supplement administered' },
  { id: 4, type: 'Weight Check', date: '2025-03-10', note: 'Routine weigh-in' },
  { id: 5, type: 'Vaccination', date: '2025-02-01', note: 'Annual vaccination' },
];
