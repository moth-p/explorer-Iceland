import { Link } from 'react-router';
import { useState } from 'react';
import { asset } from '@/lib/asset';

/**
 * The play button over the video section. Swaps artwork on hover, as the
 * original mouseenter/mouseleave handlers did by rewriting img.src.
 */
export function VideoButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="absolute top-[calc(50%-27px)] w-14 md:w-16 lg:w-24">
      <Link
        to="/shop"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          src={asset(hovered ? '/img/main-7-button-2.png' : '/img/main-7-button.png')}
          className="w-20 object-cover active:opacity-50"
          alt="Start a journey"
        />
      </Link>
    </div>
  );
}
