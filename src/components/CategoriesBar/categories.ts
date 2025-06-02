export interface Category {
  id: string;
  name: string;
  value: string;
}

export const categories: Category[] = [
  { id: '1', name: 'Neck', value: 'neck' },
  { id: '2', name: 'Back', value: 'back' },
  { id: '3', name: 'Abs', value: 'abs' },
  { id: '4', name: 'Legs', value: 'legs' },
  { id: '5', name: 'Arms', value: 'arms' },
  { id: '6', name: 'Shoulders', value: 'shoulders' },
];
