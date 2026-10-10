import type { Product } from '@/lib/product';
import PriceCard from './PriceCard';

const PriceMovers = async () => {
  const res = await fetch('https://api.abcz.workers.dev/api/bazardor/products');
  if (!res.ok) return null;

  const products: Product[] = await res.json();

  const up = products.filter((p) => p.change.dir === 'up').slice(0, 6);
  const down = products.filter((p) => p.change.dir === 'down').slice(0, 6);

  return (
    <>
      {up.length > 0 && (
        <section className="px-4 py-4">
          <h2 className="mb-4 text-xl font-bold text-[#1a1a1a]">
            <span className="mr-2 text-sm text-red-600">▲</span>
            আজ দাম বেড়েছে
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {up.map((p) => (
              <PriceCard key={p.id} p={p} />
            ))}
          </div>
        </section>
      )}

      {down.length > 0 && (
        <section className="px-4 py-4">
          <h2 className="mb-4 text-xl font-bold text-[#1a1a1a]">
            <span className="mr-2 text-sm text-[#05893E]">▼</span>
            আজ দাম কমেছে
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {down.map((p) => (
              <PriceCard key={p.id} p={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default PriceMovers;
