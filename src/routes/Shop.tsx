import { Pagination } from '@/components/product/Pagination';
import { ProductCard } from '@/components/product/ProductCard';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { PageMeta } from '@/components/layout/PageMeta';
import { ShopBanner } from '@/components/shop/ShopBanner';
import { getAllProducts } from '@/lib/products';

export function Shop() {
  const products = getAllProducts();

  return (
    <>
      <PageMeta
        title="Shop"
        description="Browse all Explorer tours in Iceland: hiking, sightseeing and outdoor sports, in small guided groups."
      />
      <header className="max-h-[1080px] w-full lg:mb-5">
        <ShopBanner />
      </header>

      <main>
        <section>
          <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-14 lg:max-w-5xl lg:px-8">
            <h2 className="flex justify-center text-2xl text-gray-800 md:text-4xl">
              <span className="text-subPurple">
                <i className="fa-solid fa-volcano" />
              </span>
              &nbsp;Hiking
            </h2>
            <br />
            <hr />
            <br />
            <br />

            <div className="mb-20 grid grid-cols-2 gap-x-2 gap-y-4 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4 lg:gap-x-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <hr />
            <br />
            <br />

            <Pagination />
          </div>
        </section>
      </main>

      <br />
      <br />
      <hr />

      <SiteFooter />
    </>
  );
}
