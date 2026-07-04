// Weekly shopping baskets rebuilt from the v1 Tableau shopper profiles
// (Shopper A/B/C). Methodology matches v1: one package of each item per week.
// Items are referenced by USDA fdcId.
export const BASKETS = [
  {
    id: 'a',
    name: 'Shopper A — takes no notice',
    blurb:
      'The average cart: typical protein and dairy picks, chosen with no regard to GHG labeling.',
    itemIds: [
      '1597055', // ground beef
      '1568052', // ground lamb
      '2683232', // chicken
      '2426953', // shrimp, wild
      '2096834', // eggs
      '2617014', // whole milk
      '2057196', // cheddar
      '1592891', // american cheese
      '2094280', // butter
      '1063145', // coffee creamer
      '2623658', // coffee k-cups
      '2097032', // frozen pizza
      '2054962', // white bread
      '1630363', // pasta
      '2096564', // potato chips
      '2032501', // milk chocolate
      '2121094', // ice cream
      '2012128', // banana
      '2117388', // apple
      '2251779', // potatoes
    ],
  },
  {
    id: 'b',
    name: 'Shopper B — reads the label',
    blurb:
      'Climate conscious: avoids red meat and uses the labels to pick some alternative proteins and dairy.',
    itemIds: [
      '2683232', // chicken
      '1457189', // tilapia, farmed
      '2313609', // shrimp, farmed
      '1578041', // salmon, wild
      '2052398', // canned tuna
      '2096834', // eggs
      '2052228', // 1% lowfat milk
      '2057196', // cheddar
      '2615037', // parmesan
      '2097032', // frozen pizza
      '2054998', // wheat bread
      '2443255', // rice
      '2396908', // hummus
      '1459670', // tortilla chips
      '2479821', // dark chocolate
      '2131337', // granola
      '2012128', // banana
      '2117388', // apple
      '2391372', // kale
      '2339607', // tomato
    ],
  },
  {
    id: 'c',
    name: 'Shopper C — minimizes the number',
    blurb: 'Plant-based diet, using the labels to push the footprint as low as it will go.',
    itemIds: [
      '2663629', // beyond beef
      '1863123', // tofu
      '2020249', // lentils
      '2425082', // black beans
      '2396908', // hummus
      '2506626', // oat milk
      '2102063', // almond-milk creamer
      '2628069', // plant-based cheddar
      '2553551', // just egg
      '2607541', // vegan pizza
      '2443255', // rice
      '2054998', // wheat bread
      '2096564', // potato chips
      '1975864', // peanuts
      '2094362', // almonds
      '2391372', // kale
      '2339607', // tomato
      '2012128', // banana
      '2395846', // blueberries
      '2032205', // green tea
    ],
  },
]
