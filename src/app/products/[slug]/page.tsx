import Link from 'next/link';
import { notFound } from 'next/navigation';
import { bn, getUnit, type Product } from '@/lib/product';

const getProduct = async (slug: string) => {
  const res = await fetch('https://api.abcz.workers.dev/api/bazardor/products');
  if (!res.ok) return null;

  const products: Product[] = await res.json();
  return products.find((p) => p.slug === slug) ?? null;
};

// 133.5 -> ১৩৩.৫০   |   135 -> ১৩৫
const fmt = (n: number) => (Number.isInteger(n) ? bn(n) : bn(n, 2));

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = await getProduct(slug);
  return { title: p ? `${p.nameBn} এর দাম | বাজার দর` : 'বাজার দর' };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = await getProduct(slug);
  if (!p) notFound();

  const unit = getUnit(p.unit);
  const { dir, pct } = p.change;

  const color =
    dir === 'up'
      ? 'text-red-600'
      : dir === 'down'
        ? 'text-[#05893E]'
        : 'text-gray-500';
  const arrow = dir === 'up' ? '▲' : dir === 'down' ? '▼' : '—';
  const word = dir === 'up' ? 'বেড়েছে' : dir === 'down' ? 'কমেছে' : null;

  // Market rows sorted by average (low to high)
  const rows = (p.markets ?? [])
    .map((m) => ({ ...m, avg: (m.min + m.max) / 2 }))
    .sort((a, b) => a.avg - b.avg);

  const lowest = rows.length ? Math.min(...rows.map((r) => r.min)) : 0;
  const highest = rows.length ? Math.max(...rows.map((r) => r.max)) : 0;
  const average = rows.length
    ? Math.round(rows.reduce((sum, r) => sum + r.avg, 0) / rows.length)
    : 0;

  const card = 'rounded-3xl border border-[#e2e8e2] bg-[#FAFCF9]';

  return (
    <div className="px-4 py-6">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-[#1a1a1a]">
        <Link
          href="/"
          className="transition hover:text-[#05893E] hover:underline"
        >
          হোম
        </Link>
        <span className="text-gray-400">›</span>
        <Link
          href={`/category/${p.category}`}
          className="hover:underline transition hover:text-[#05893E]"
        >
          {p.categoryNameBn}
        </Link>
        <span className="text-gray-400">›</span>
        <span className="font-medium">{p.nameBn}</span>
      </nav>

      {/* Header card */}
      <section
        className={`${card} flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6`}
      >
        <div className="flex items-center gap-4">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#F0F5F0] text-4xl">
            {p.image}
          </div>
          <div className="min-w-0">
            <h1 className="text-3xl leading-tight font-extrabold text-[#1a1a1a]">
              {p.nameBn}
            </h1>
            <p className="text-sm text-gray-600">
              প্রতি {unit} · {p.categoryNameBn}
            </p>
            <p className="mt-2 text-sm text-gray-700">
              {word ? (
                <>
                  গতকালের তুলনায় আজ দাম{' '}
                  <strong className="text-[#1a1a1a]">{word}</strong>{' '}
                  {bn(Math.abs(pct), 1)}%
                </>
              ) : (
                'গতকালের তুলনায় আজ দামের কোনো পরিবর্তন নেই'
              )}
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-[#F0F5F0] px-6 py-4 text-center sm:min-w-37.5">
          <p className="text-sm text-gray-600">আজকের দাম</p>
          <p className="text-4xl leading-tight font-extrabold text-[#1a1a1a]">
            {bn(p.today)}
          </p>
          <p className="text-sm text-gray-600">টাকা / {unit}</p>
          <p className={`mt-1 text-sm font-bold ${color}`}>
            {arrow} {bn(Math.abs(pct), 1)}%
          </p>
        </div>
      </section>

      {/* Summary + market table */}
      {rows.length > 0 && (
        <section className={`${card} mt-6 p-5 sm:p-6`}>
          <h2 className="mb-4 text-xl font-bold text-[#1a1a1a]">
            দামের সারসংক্ষেপ
          </h2>

          <div className="grid gap-4 sm:grid-cols-3">
            <Stat
              label="সর্বনিম্ন দাম"
              value={bn(lowest)}
              note="সবচেয়ে কম দামের বাজার"
              valueClass="text-[#05893E]"
            />
            <Stat
              label="সর্বাধিক দাম"
              value={bn(highest)}
              note="সবচেয়ে বেশি দামের বাজার"
              valueClass="text-red-600"
            />
            <Stat
              label="গড় দাম"
              value={bn(average)}
              note={`প্রতি ${unit}-এর হিসাবে`}
              valueClass="text-[#05893E]"
            />
          </div>

          <h2 className="mt-8 mb-4 text-xl font-bold text-[#1a1a1a]">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <div className="overflow-x-auto rounded-2xl border border-[#e2e8e2]">
            <table className="w-full min-w-140 border-collapse text-sm">
              <thead>
                <tr className="border-b border-[#e2e8e2] text-gray-600">
                  <th className="px-4 py-3 text-left font-medium">বাজার</th>
                  <th className="px-4 py-3 text-left font-medium">বিভাগ</th>
                  <th className="px-4 py-3 text-right font-medium">
                    সর্বনিম্ন
                  </th>
                  <th className="px-4 py-3 text-right font-medium">সর্বাধিক</th>
                  <th className="px-4 py-3 text-right font-medium">গড়</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr
                    key={`${r.market}-${r.division}`}
                    className="border-b border-[#e2e8e2] last:border-b-0 even:bg-[#F3F7F3]"
                  >
                    <td className="px-4 py-3.5 text-[#1a1a1a]">{r.market}</td>
                    <td className="px-4 py-3.5 text-gray-600">{r.division}</td>
                    <td className="px-4 py-3.5 text-right text-[#1a1a1a]">
                      {bn(r.min)} টাকা
                    </td>
                    <td className="px-4 py-3.5 text-right text-[#1a1a1a]">
                      {bn(r.max)} টাকা
                    </td>
                    <td className="px-4 py-3.5 text-right font-bold text-[#1a1a1a]">
                      {fmt(r.avg)} টাকা
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Back to category */}
      <Link
        href={`/category/${p.category}`}
        className="mt-6 inline-flex items-center gap-2 rounded-lg px-1 py-2 text-sm font-semibold text-[#1a1a1a] transition hover:text-[#05893E]"
      >
        <span className="text-lg leading-none">{p.categoryIcon}</span>
        সব {p.categoryNameBn}
      </Link>
    </div>
  );
}

// One summary box
const Stat = ({
  label,
  value,
  note,
  valueClass,
}: {
  label: string;
  value: string;
  note: string;
  valueClass: string;
}) => (
  <div className="rounded-2xl border border-[#e2e8e2] bg-[#FAFCF9] p-4">
    <p className="text-xs text-gray-600">{label}</p>
    <p className={`mt-1 text-3xl font-extrabold ${valueClass}`}>
      {value} <span className="text-sm font-medium">টাকা</span>
    </p>
    <p className="mt-1 text-xs text-gray-600">{note}</p>
  </div>
);
