const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
const dayLabels = {
  mon: 'Mon', tue: 'Tue', wed: 'Wed', thu: 'Thu', fri: 'Fri', sat: 'Sat',
};
const dayLabelsRu = {
  mon: 'Пн', tue: 'Вт', wed: 'Ср', thu: 'Чт', fri: 'Пт', sat: 'Сб',
};
const dayLabelsTj = {
  mon: 'Дш', tue: 'Сш', wed: 'Чш', thu: 'Пш', fri: 'Ҷм', sat: 'Шб',
};

function buildTimes() {
  const times = [];
  for (let h = 9; h < 18; h += 1) {
    times.push(`${String(h).padStart(2, '0')}:00`);
    times.push(`${String(h).padStart(2, '0')}:30`);
  }
  return times;
}

const sampleNames = [
  'Rustam Q.', 'Zulfiya R.', 'Farrukh N.', 'Nargiz S.', 'Davron H.',
  'Malika I.', 'Sardor Y.', 'Dilnoza K.', 'Jasur O.', 'Shahnoza S.',
];

function seedRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export function buildWeekSlots() {
  const times = buildTimes();
  const rand = seedRandom(42);
  const slots = [];
  days.forEach((d, di) => {
    times.forEach((time, ti) => {
      const booked = rand() < 0.4;
      slots.push({
        id: `${d}-${time}`,
        day: d,
        time,
        booked,
        client: booked ? sampleNames[(di * 7 + ti) % sampleNames.length] : null,
      });
    });
  });
  return slots;
}

export const dayList = days;
export function labelForDay(d, lang) {
  if (lang === 'ru') return dayLabelsRu[d];
  if (lang === 'tj') return dayLabelsTj[d];
  return dayLabels[d];
}
