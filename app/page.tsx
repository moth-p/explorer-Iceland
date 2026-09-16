import { getAllProducts } from '@/lib/products';

export default function HomePage() {
  const products = getAllProducts();
  return (
    <main className="grid min-h-screen place-items-center bg-lightGray">
      <h1 className="font-krona text-2xl text-gray-800">Explorer in Iceland</h1>
      <p className="font-libreBodoni_Regular text-subPurple">
        {products.length} tours &mdash; scaffold check, replaced in Phase 4.
      </p>
    </main>
  );
}
