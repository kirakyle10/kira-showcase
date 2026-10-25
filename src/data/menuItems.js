export const menuItems = [
  { id: 1,  name: 'Чой',       nameRu: 'Чай',          nameTj: 'Чой',       category: 'hot',    price: 5,  emoji: '🍵' },
  { id: 2,  name: 'Қаҳва',     nameRu: 'Кофе',         nameTj: 'Қаҳва',     category: 'hot',    price: 12, emoji: '☕' },
  { id: 3,  name: 'Какао',     nameRu: 'Какао',        nameTj: 'Какао',     category: 'hot',    price: 10, emoji: '🍫' },
  { id: 4,  name: 'Кола',      nameRu: 'Кола',         nameTj: 'Кола',      category: 'cold',   price: 7,  emoji: '🥤' },
  { id: 5,  name: 'Шарбат',    nameRu: 'Шербет',       nameTj: 'Шарбат',    category: 'cold',   price: 10, emoji: '🧃' },
  { id: 6,  name: 'Самбӯса',   nameRu: 'Самса',        nameTj: 'Самбӯса',   category: 'food',   price: 8,  emoji: '🥟' },
  { id: 7,  name: 'Кабоб',     nameRu: 'Кебаб',        nameTj: 'Кабоб',     category: 'food',   price: 35, emoji: '🍢' },
  { id: 8,  name: 'Манту',     nameRu: 'Манты',        nameTj: 'Манту',     category: 'food',   price: 25, emoji: '🥟' },
  { id: 9,  name: 'Ош',        nameRu: 'Плов',         nameTj: 'Ош',        category: 'food',   price: 30, emoji: '🍚' },
  { id: 10, name: 'Нон',       nameRu: 'Лепёшка',      nameTj: 'Нон',       category: 'food',   price: 3,  emoji: '🥖' },
  { id: 11, name: 'Боқлавa',   nameRu: 'Пахлава',      nameTj: 'Боқлавa',   category: 'dessert',price: 15, emoji: '🍯' },
  { id: 12, name: 'Чизкейк',   nameRu: 'Чизкейк',      nameTj: 'Чизкейк',   category: 'dessert',price: 18, emoji: '🍰' },
  { id: 13, name: 'Мороженое', nameRu: 'Мороженое',    nameTj: 'Яхмос',     category: 'dessert',price: 12, emoji: '🍨' },
];

export const mockOrderQueue = [
  { id: 1023, items: ['Ош', 'Чой', 'Нон'],        status: 'preparing', total: 38 },
  { id: 1024, items: ['Кабоб', 'Кола'],           status: 'pending',   total: 42 },
  { id: 1025, items: ['Самбӯса', 'Чой'],          status: 'ready',     total: 13 },
];

export function menuNameFor(item, lang) {
  if (lang === 'ru') return item.nameRu;
  if (lang === 'tj') return item.nameTj;
  return item.name;
}
