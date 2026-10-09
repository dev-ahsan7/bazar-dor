'use client';

import { useEffect, useState } from 'react';
import MarqueeText from 'react-marquee-text';

type Product = {
  id: number;
  nameBn: string;
  image: string;
  unit: string;
  today: number;
  change: { dir: string; pct: number };
};

const unitBn: Record<string, string> = {
  kg: 'কেজি',
  litre: 'লিটার',
  liter: 'লিটার',
  l: 'লিটার',
  dozen: 'ডজন',
  hali: 'হালি',
  piece: 'পিস',
  pcs: 'পিস',
  gram: 'গ্রাম',
  g: 'গ্রাম',
};

const bn = (n: number) => n.toLocaleString('bn-BD');

const Marquee = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    fetch('https://api.api-store.workers.dev/api/bazardor/products', {
      signal: controller.signal,
    })
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (Array.isArray(data)) setProducts(data);
      })
      .catch(() => {});

    return () => controller.abort();
  }, []);

  return (
    <div className="h-11 overflow-hidden border-b border-[#e4e4e4] bg-[#F9FBF8] py-2.5">
      {products.length > 0 && (
        <MarqueeText direction="right" duration={10} pauseOnHover>
          {products.map((p) => {
            const up = p.change.dir === 'up';
            return (
              <div key={p.id} className="mr-5 flex items-center gap-1 text-sm">
                <span className="text-lg leading-none">{p.image}</span>
                <span className="font-semibold text-[#1a1a1a]">{p.nameBn}</span>
                <span className="text-gray-600">
                  {bn(p.today)} টাকা/{unitBn[p.unit.toLowerCase()] ?? p.unit}
                </span>
                <span
                  className={`flex items-center gap-1 text-xs font-bold ${
                    up ? 'text-red-600' : 'text-[#05893E]'
                  }`}
                >
                  <span>{up ? '▲' : '▼'}</span>
                  {bn(p.change.pct)}%
                </span>
              </div>
            );
          })}
        </MarqueeText>
      )}
    </div>
  );
};

export default Marquee;
