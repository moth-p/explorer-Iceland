/**
 * 捲動顯示的「Iceland」跑馬燈。純 CSS（`animate-marquee` 加上重複一遍的
 * 文字）-- Server Component，不需要 JavaScript。
 */
export function Marquee() {
  const run = (
    <>
      &nbsp;Iceland&nbsp;&nbsp;
      <i className="fa-solid fa-person-hiking" />
      &nbsp;&nbsp;Iceland&nbsp;&nbsp;
      <i className="fa-solid fa-person-hiking" />
      &nbsp;&nbsp;Iceland&nbsp;&nbsp;
      <i className="fa-solid fa-person-hiking" />
      &nbsp;&nbsp;Iceland&nbsp;&nbsp;
      <i className="fa-solid fa-person-hiking" />
      &nbsp;&nbsp;Iceland&nbsp;&nbsp;
      <i className="fa-solid fa-person-hiking" />
      &nbsp;&nbsp;Iceland
    </>
  );

  return (
    <section className="h-[140px] text-4xl text-subPurple md:h-[180px] md:text-5xl lg:h-[220px] lg:text-7xl">
      <div className="relative flex h-full w-screen max-w-full items-center overflow-x-hidden">
        <div className="absolute animate-marquee whitespace-nowrap will-change-transform">
          <div className="inline-block">{run}</div>
        </div>
      </div>
    </section>
  );
}
