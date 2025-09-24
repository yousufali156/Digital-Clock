// সংখ্যাকে দুটি ডিজিটে রূপান্তর করার জন্য (যেমন: 7 কে "07")
export const padZero = (num: number): string => num.toString().padStart(2, '0');

// Date অবজেক্টকে 'YYYY-MM-DD' ফরম্যাটে রূপান্তর করার জন্য
export const toYYYYMMDD = (date: Date): string => date.toISOString().split('T')[0];
