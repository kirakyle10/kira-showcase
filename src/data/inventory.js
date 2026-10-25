export const inventory = [
  { id: 1,  barcode: '4870001000011', name: 'Нон',       nameRu: 'Хлеб',          nameTj: 'Нон',       category: 'bakery',  price: 3,  stock: 42, unit: 'pcs', lowStockThreshold: 15, emoji: '🥖' },
  { id: 2,  barcode: '4870001000028', name: 'Шир',       nameRu: 'Молоко',        nameTj: 'Шир',       category: 'dairy',   price: 9,  stock: 8,  unit: 'L',   lowStockThreshold: 10, emoji: '🥛' },
  { id: 3,  barcode: '4870001000035', name: 'Тухм',      nameRu: 'Яйца',          nameTj: 'Тухм',      category: 'dairy',   price: 18, stock: 20, unit: '10pk',lowStockThreshold: 8,  emoji: '🥚' },
  { id: 4,  barcode: '4870001000042', name: 'Равған',    nameRu: 'Масло',         nameTj: 'Равған',    category: 'grocery', price: 32, stock: 14, unit: 'L',   lowStockThreshold: 6,  emoji: '🫒' },
  { id: 5,  barcode: '4870001000059', name: 'Биринҷ',    nameRu: 'Рис',           nameTj: 'Биринҷ',    category: 'grocery', price: 22, stock: 25, unit: 'kg',  lowStockThreshold: 10, emoji: '🍚' },
  { id: 6,  barcode: '4870001000066', name: 'Қанд',      nameRu: 'Сахар',         nameTj: 'Қанд',      category: 'grocery', price: 11, stock: 4,  unit: 'kg',  lowStockThreshold: 8,  emoji: '🍬' },
  { id: 7,  barcode: '4870001000073', name: 'Намак',     nameRu: 'Соль',          nameTj: 'Намак',     category: 'grocery', price: 4,  stock: 30, unit: 'kg',  lowStockThreshold: 10, emoji: '🧂' },
  { id: 8,  barcode: '4870001000080', name: 'Чой',       nameRu: 'Чай',           nameTj: 'Чой',       category: 'drinks',  price: 15, stock: 11, unit: 'pk',  lowStockThreshold: 8,  emoji: '🍵' },
  { id: 9,  barcode: '4870001000097', name: 'Об 1.5L',   nameRu: 'Вода 1.5Л',     nameTj: 'Оби 1.5L',  category: 'drinks',  price: 5,  stock: 48, unit: 'btl', lowStockThreshold: 15, emoji: '💧' },
  { id: 10, barcode: '4870001000103', name: 'Мос',       nameRu: 'Йогурт',        nameTj: 'Мос',       category: 'dairy',   price: 7,  stock: 3,  unit: 'pcs', lowStockThreshold: 6,  emoji: '🧋' },
  { id: 11, barcode: '4870001000110', name: 'Қаймоқ',    nameRu: 'Сметана',       nameTj: 'Қаймоқ',    category: 'dairy',   price: 14, stock: 9,  unit: 'pcs', lowStockThreshold: 5,  emoji: '🥛' },
  { id: 12, barcode: '4870001000127', name: 'Помидор',   nameRu: 'Помидоры',      nameTj: 'Помидор',   category: 'produce', price: 12, stock: 18, unit: 'kg',  lowStockThreshold: 8,  emoji: '🍅' },
  { id: 13, barcode: '4870001000134', name: 'Картошка',  nameRu: 'Картофель',     nameTj: 'Картошка',  category: 'produce', price: 6,  stock: 35, unit: 'kg',  lowStockThreshold: 10, emoji: '🥔' },
  { id: 14, barcode: '4870001000141', name: 'Пиёз',      nameRu: 'Лук',           nameTj: 'Пиёз',      category: 'produce', price: 5,  stock: 2,  unit: 'kg',  lowStockThreshold: 8,  emoji: '🧅' },
  { id: 15, barcode: '4870001000158', name: 'Себ',       nameRu: 'Яблоко',        nameTj: 'Себ',       category: 'produce', price: 10, stock: 22, unit: 'kg',  lowStockThreshold: 8,  emoji: '🍎' },
];

export function nameFor(item, lang) {
  if (lang === 'ru') return item.nameRu;
  if (lang === 'tj') return item.nameTj;
  return item.name;
}
