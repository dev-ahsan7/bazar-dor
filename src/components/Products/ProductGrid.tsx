'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import PriceCard from './PriceCard';
import { bn, type Product } from '@/lib/product';

type Sort = 'default' | 'asc' | 'desc';

const options: { value: Sort; label: string }[] = [
  { value: 'default', label: 'ডিফল্ট' },
  { value: 'asc', label: 'দাম: কম থেকে বেশি' },
  { value: 'desc', label: 'দাম: বেশি থেকে কম' },
];

const ProductGrid = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [sort, setSort] = useState<Sort>('default');
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  // Fetch data
  useEffect(() => {
    const controller = new AbortController();

    fetch('https://api.api-store.workers.dev/api/bazardor/products', {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed');
        return res.json();
      })
      .then((data) => {
        setProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        setError(true);
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  // Close dropdown on outside click or Esc
  useEffect(() => {
    if (!open) return;

    const onClick = (e: MouseEvent) => {
      if (!boxRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const sorted = useMemo(() => {
    if (sort === 'default') return products;
    return [...products].sort((a, b) =>
      sort === 'asc' ? a.today - b.today : b.today - a.today,
    );
  }, [products, sort]);

  const current = options.find((o) => o.value === sort)!;

  return (
    <section className="px-4 py-5">
      <h1 className="text-2xl font-bold text-[#1a1a1a]">সব পণ্য</h1>

      {/* Count + sort */}
      <div className="mt-4 mb-4 flex items-center justify-between gap-3">
        <p className="text-sm text-gray-600">
          {loading
            ? 'লোড হচ্ছে...'
            : `মোট ${bn(sorted.length)}টি পণ্য দেখানো হচ্ছে`}
        </p>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">সাজান</span>

          <div ref={boxRef} className="relative">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-haspopup="listbox"
              aria-expanded={open}
              className="flex items-center gap-1.5 rounded-xl border border-[#e2e8e2] bg-[#FAFCF9] px-3 py-1.5 text-sm font-medium text-[#1a1a1a] shadow-sm transition hover:border-[#05893E]/40"
            >
              {current.label}
              <span className="text-[10px]">{open ? '▴' : '▾'}</span>
            </button>

            {open && (
              <ul
                role="listbox"
                className="absolute right-0 z-20 mt-2 w-52 rounded-2xl border border-[#e2e8e2] bg-[#FAFCF9] p-1.5 shadow-lg"
              >
                {options.map((o) => {
                  const active = o.value === sort;
                  return (
                    <li key={o.value}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={active}
                        onClick={() => {
                          setSort(o.value);
                          setOpen(false);
                        }}
                        className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm transition ${
                          active
                            ? 'bg-[#e4e8e4] font-medium text-[#1a1a1a]'
                            : 'text-[#1a1a1a] hover:bg-[#05893E]/10 hover:text-[#05893E]'
                        }`}
                      >
                        <span className="w-4 text-xs">{active ? '✓' : ''}</span>
                        {o.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      {error ? (
        <p className="rounded-2xl border border-[#e2e8e2] bg-[#FAFCF9] p-6 text-center text-sm text-gray-600">
          পণ্যের তথ্য লোড করা যায়নি। একটু পরে আবার চেষ্টা করুন।
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className="h-34.5 animate-pulse rounded-2xl border border-[#e2e8e2] bg-[#FAFCF9]"
                />
              ))
            : sorted.map((p) => <PriceCard key={p.id} p={p} />)}
        </div>
      )}
    </section>
  );
};

export default ProductGrid;
