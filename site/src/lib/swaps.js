// Like-for-like swap pairs, referenced by USDA fdcId.
// The dataset was deliberately collected in conventional/plant-based pairs;
// these ids come from the selection documented in the data-prep notebook.
export const SWAP_GROUPS = [
  { id: 'beef', title: 'Ground beef', from: '1597055', alternatives: ['2663629', '2664238'] },
  { id: 'sausage', title: 'Pork sausage', from: '2389332', alternatives: ['2545686'] },
  { id: 'chicken', title: 'Chicken', from: '2683232', alternatives: ['1854765'] },
  { id: 'eggs', title: 'Eggs', from: '2096834', alternatives: ['2553551'] },
  { id: 'milk', title: 'Whole milk', from: '2617014', alternatives: ['2506626', '2309058', '2675467'] },
  { id: 'cheddar', title: 'Cheddar', from: '2057196', alternatives: ['2628069'] },
  { id: 'american', title: 'American cheese', from: '1592891', alternatives: ['2628070'] },
  { id: 'parmesan', title: 'Parmesan', from: '2615037', alternatives: ['2628072'] },
  { id: 'butter', title: 'Butter', from: '2094280', alternatives: ['1493586'] },
  { id: 'creamcheese', title: 'Cream cheese', from: '2094316', alternatives: ['1989964'] },
  { id: 'mayo', title: 'Mayo', from: '1593206', alternatives: ['2501701'] },
  { id: 'icecream', title: 'Ice cream', from: '2121094', alternatives: ['2447124'] },
  { id: 'creamer', title: 'Coffee creamer', from: '1063145', alternatives: ['2102063'] },
  { id: 'nuggets', title: 'Chicken nuggets', from: '2548207', alternatives: ['2683081'] },
  { id: 'pizza', title: 'Frozen pizza', from: '2097032', alternatives: ['2607541'] },
]
