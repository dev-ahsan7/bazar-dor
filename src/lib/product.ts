export type Product = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: { dir: string; pct: number };
  markets?: Market[];
};

export type Market = {
  market: string;
  division: string;
  min: number;
  max: number;
};


const units: Record<string, string> = {
  kg: 'কেজি',
  litre: 'লিটার',
  dozen: 'ডজন',
  hali: 'হালি',
  piece: 'পিস',
  pcs: 'পিস',
  gram: 'গ্রাম',
};

export const getUnit = (unit: string) => units[unit.toLowerCase()] ?? unit;

// 1290 -> ১,২৯০   |   bn(9, 1) -> ৯.০
export const bn = (n: number, digits?: number) =>
  n.toLocaleString(
    'bn-BD',
    digits === undefined
      ? undefined
      : { minimumFractionDigits: digits, maximumFractionDigits: digits },
  );
