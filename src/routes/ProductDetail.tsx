import { Link, useParams } from 'react-router';
import { AddToCartForm } from '@/components/booking/AddToCartForm';
import { PageMeta } from '@/components/layout/PageMeta';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { ProductAccordion } from '@/components/product/ProductAccordion';
import { asset } from '@/lib/asset';
import { getProductById } from '@/lib/products';
import { CATEGORY_LABELS } from '@/lib/types';
import { NotFound } from './NotFound';

const Star = ({ filled }: { filled: boolean }) => (
  <svg
    className={`size-5 shrink-0 ${filled ? 'text-yellow-400' : 'text-gray-300'}`}
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
      clipRule="evenodd"
    />
  </svg>
);

/**
 * 行程的詳細頁面。路由是 /shop/:id，而不是原本的 ?id= query
 * 參數，這樣每個行程才有自己可以分享的 URL。
 *
 * 這 12 個行程是一個封閉的集合，所以一個未知的 id 會就地渲染 404 --
 * 這正是 Next 的 `dynamicParams = false` 做的事，而且會讓網站的
 * chrome 跟框架的 not-found 頁面表現一致。
 */
export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = id ? getProductById(id) : undefined;
  if (!product) return <NotFound />;

  return (
    <>
      <PageMeta title={product.title} description={product.briefLong} />
      <main>
        <div className="leading-loose">
          <div className="mx-auto max-w-2xl px-4 py-16 font-krona sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:max-w-lg lg:self-end">
              <nav>
                <ol role="list" className="flex items-center space-x-2">
                  <li>
                    <div className="flex items-center text-sm">
                      <Link to="/shop" className="font-medium text-gray-500 hover:text-gray-900">
                        {CATEGORY_LABELS[product.category]}
                      </Link>
                      <svg
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="ml-2 size-5 shrink-0 text-gray-300"
                      >
                        <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                      </svg>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center text-sm">
                      <a href="#" className="font-medium text-gray-500 hover:text-gray-800">
                        Guide
                      </a>
                    </div>
                  </li>
                </ol>
              </nav>

              <div className="mt-5 text-wrap break-words">
                <h1 id="detailsTitle" className="text-3xl font-bold text-gray-800 sm:text-4xl">
                  {product.title}
                </h1>
              </div>

              <section aria-labelledby="information-heading" className="mt-4">
                <div className="flex items-center font-sans font-medium">
                  <p className="text-lg text-gray-800 sm:text-xl">€&nbsp;{product.price}</p>

                  <div className="ml-4 border-l border-gray-300 pl-4">
                    <h2 className="sr-only">Reviews</h2>
                    <div className="flex items-center">
                      <div>
                        <div className="flex items-center">
                          {[0, 1, 2, 3, 4].map((i) => (
                            <Star key={i} filled={i < 4} />
                          ))}
                        </div>
                      </div>
                      <p className="ml-2 text-sm text-gray-500">1624 reviews</p>
                    </div>
                  </div>
                </div>
              </section>

              <div className="mt-4 space-y-6 text-wrap break-words">
                <p className="font-sans text-gray-500">{product.briefLong}</p>
              </div>
            </div>

            <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
              <img
                src={asset(product.imgBig)}
                alt={product.title}
                className="aspect-square w-full rounded-lg object-cover"
              />
            </div>

            <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
              <AddToCartForm product={product} />
            </div>
          </div>
        </div>

        <section>
          <ProductAccordion product={product} />
        </section>
        <hr />
      </main>

      <SiteFooter />
    </>
  );
}
