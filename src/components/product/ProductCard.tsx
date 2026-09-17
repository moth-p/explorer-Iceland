import Link from 'next/link';
import { asset } from '@/lib/asset';
import type { Product } from '@/lib/types';

/**
 * One tour card in the shop grid. Server Component -- static markup from props,
 * so it ships no JavaScript.
 *
 * Replaces `<template id="productTemplate">`, which was cloned 12 times and so
 * produced 12 elements each claiming id="productImg" / "productTitle" /
 * "productPrice" / "productBrief".
 */
export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/shop/${product.id}`}
      className="group relative flex max-h-[800px] cursor-pointer flex-col rounded-lg border border-gray-200 bg-white shadow-lg sm:min-w-[200px]"
    >
      <div className="px-3 pt-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
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
