import ProductGrid from '@/components/Products/ProductGrid';

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <ProductGrid key={slug} category={slug} />;
}
