import { Link } from 'react-router';
import { useState } from 'react';
import { asset } from '@/lib/asset';

/**
 * 覆蓋在影片區塊上的播放按鈕。滑鼠移過去時會換圖，就像原本的
 * mouseenter/mouseleave handler 靠改寫 img.src 做到的一樣。
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
