import Link from 'next/link';
import { bn, getUnit, type Product } from '@/lib/product';

const PriceCard = ({ p }: { p: Product }) => {
  const dir = p.change.dir;

  const color =
    dir === 'up'
      ? 'text-red-600'
      : dir === 'down'
        ? 'text-[#05893E]'
        : 'text-gray-500';

  const arrow = dir === 'up' ? '▲' : dir === 'down' ? '▼' : '–';

  return (
    <Link
      href={`/products/${p.slug}`}
      className="group block rounded-2xl border border-[#e2e8e2] bg-[#FAFCF9] p-4 transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F0F5F0] text-2xl transition-transform group-hover:scale-105">
          {p.image}
        </div>
        <div className="min-w-0">
          <h3 className="truncate font-bold text-[#1a1a1a]">{p.nameBn}</h3>
          <p className="text-xs text-gray-600">প্রতি {getUnit(p.unit)}</p>
        </div>
      </div>

      <p className="mt-4 text-xs text-gray-700">আজকের দাম</p>
      <div className="mt-1 flex items-center justify-between gap-2">
        <p className="text-lg font-bold text-[#1a1a1a]">
          {bn(p.today)} <span className="text-sm font-medium">টাকা</span>
        </p>
        <span
          className={`rounded-full bg-[#F0F5F0] px-2.5 py-1 text-xs font-bold ${color}`}
        >
          {arrow} {bn(Math.abs(p.change.pct), 1)}%
        </span>
      </div>
    </Link>
  );
};

export default PriceCard;
