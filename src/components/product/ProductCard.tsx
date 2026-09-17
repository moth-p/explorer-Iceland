import { Link } from 'react-router';
import { asset } from '@/lib/asset';
import type { Product } from '@/lib/types';

/**
 * shop 網格裡的一張行程卡片。Server Component -- 完全是從 props 產生的
 * 靜態 markup，所以不會送出任何 JavaScript。
 *
 * 取代了 `<template id="productTemplate">`，它以前被複製 12 次，
 * 因此產生了 12 個各自宣稱 id="productImg" / "productTitle" /
 * "productPrice" / "productBrief" 的元素。
 */
export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to={`/shop/${product.id}`}
      className="group relative flex max-h-[800px] cursor-pointer flex-col rounded-lg border border-gray-200 bg-white shadow-lg sm:min-w-[200px]"
    >
      <div className="px-3 pt-3">
        <img
          src={asset(product.img)}
          alt={product.title}
          className="h-36 w-full object-cover group-hover:opacity-75 sm:aspect-auto"
        />
      </div>
      <div className="flex flex-1 flex-col space-y-2 p-4">
        <h3 className="mb-2 text-wrap break-words font-sans text-sm font-medium text-gray-800">
          {product.title}
        </h3>
        <div className="flex flex-1 flex-col justify-end">
          <p className="text-md mb-2 text-wrap break-words font-sans font-medium text-gray-800">
            €&nbsp;{product.price}
          </p>
          <p className="text-wrap break-words font-mono text-[12px] text-gray-400">
            {product.region}
          </p>
        </div>
      </div>
    </Link>
  );
}
