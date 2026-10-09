import Hero from '@/components/Homepage/Hero';
import PriceMovers from '@/components/Products/PriceMovers';
import ProductGrid from '@/components/Products/ProductGrid';

export default function Home() {
  return (
    <div>
      <Hero />
      <PriceMovers />
      <ProductGrid />
    </div>
  );
}
