export const students = [
  { id: 1, name: 'Rustam Qosimov',   grade: 'A',  attendance: 96, homework: [true, true, true, true, true],  payment: 'paid',   avatar: '🧑‍🎓' },
  { id: 2, name: 'Zulfiya Rajabova', grade: 'A-', attendance: 92, homework: [true, true, true, false, true], payment: 'paid',   avatar: '👩‍🎓' },
  { id: 3, name: 'Farrukh Nazarov',  grade: 'B+', attendance: 88, homework: [true, false, true, true, true], payment: 'unpaid', avatar: '🧑' },
  { id: 4, name: 'Nargiz Sharifova', grade: 'B',  attendance: 81, homework: [true, true, false, true, false], payment: 'paid',   avatar: '👩' },
  { id: 5, name: 'Davron Hakimov',   grade: 'C+', attendance: 74, homework: [false, true, false, true, true], payment: 'unpaid', avatar: '🧑‍🦱' },
  { id: 6, name: 'Malika Ibragimova',grade: 'A',  attendance: 98, homework: [true, true, true, true, true],  payment: 'paid',   avatar: '👩‍🦰' },
  { id: 7, name: 'Sardor Yusupov',   grade: 'B-', attendance: 79, homework: [true, false, true, false, true], payment: 'paid',   avatar: '🧑‍🦰' },
  { id: 8, name: 'Dilnoza Kamolova', grade: 'B+', attendance: 85, homework: [true, true, false, true, true],  payment: 'unpaid', avatar: '👩‍🦱' },
  { id: 9, name: 'Jasur Olimov',     grade: 'C',  attendance: 68, homework: [false, false, true, true, false],payment: 'unpaid', avatar: '🧒' },
  { id: 10,name: 'Shahnoza Sattorova',grade: 'A-',attendance: 94, homework: [true, true, true, true, false],  payment: 'paid',   avatar: '👧' },
];

export const recentPayments = [
  { id: 1, student: 'Rustam Qosimov',    amount: 350, date: '2026-10-22', status: 'verified' },
  { id: 2, student: 'Malika Ibragimova', amount: 350, date: '2026-10-21', status: 'verified' },
  { id: 3, student: 'Zulfiya Rajabova',  amount: 350, date: '2026-10-20', status: 'verified' },
  { id: 4, student: 'Nargiz Sharifova',  amount: 350, date: '2026-10-19', status: 'verified' },
  { id: 5, student: 'Shahnoza Sattorova',amount: 350, date: '2026-10-18', status: 'verified' },
];

export function studentPoints(s) {
  const hwDone = s.homework.filter(Boolean).length;
  return s.attendance + hwDone * 8;
}
