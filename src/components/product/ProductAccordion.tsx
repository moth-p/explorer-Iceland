import { useState } from 'react';
import type { Product } from '@/lib/types';

/**
 * 行程詳細內容下面那五個可折疊的區塊。全部預設展開，跟原本一樣，
 * 圖示會在 minus 和 plus 之間切換。
 *
 * 原本的版本是用五個幾乎一樣的 click handler，分別接在
 * `#minusIcon1`..`#minusIcon5` / `#foldaccordion1`..`#foldaccordion5`
 * 上；這裡則統一成一個 component 的 markup。
 */
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);

  return (
    <div className="pt-10">
      <dt>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex w-full items-start justify-between text-left text-gray-900"
          aria-expanded={open}
        >
          <span className="text-2xl font-semibold">{title}</span>
          <span className="ml-6 flex h-7 items-center">
            <i className={`fa-solid ${open ? 'fa-minus' : 'fa-plus'}`} />
          </span>
        </button>
      </dt>
      {open && (
        <dd className="animate__animated animate__fadeIn animate__faster mt-2 ps-8">{children}</dd>
      )}
    </div>
  );
}

/** 一個 `<b>Label:</b>&nbsp;&nbsp;value` 形式的列表項目，全篇通用的樣式。 */
function LabelledItem({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <li>
      <b>{label}&nbsp;&nbsp;</b>
      {children}
    </li>
  );
}

export function ProductAccordion({ product }: { product: Product }) {
  return (
    <div>
      <div className="mx-auto max-w-7xl px-14 pb-40 leading-loose lg:pt-4">
        <div className="mb-8 flex items-center justify-center text-5xl text-subPurple">
          <i className="fa-solid fa-volcano" />
        </div>

        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
          <h2 className="flex items-center justify-center font-krona text-3xl tracking-tight text-subPurple sm:text-4xl">
            About the tour
          </h2>

          <dl className="mt-12 space-y-12 divide-y divide-gray-900/10">
            <div className="pt-10">
              <dt>
                <div className="flex w-full items-start justify-between text-left text-gray-900">
                  {/* 原本的版本是用 briefLong 填這裡的，不是 aboutTheTour --
                      這裡保留這個行為，所以較長的 aboutTheTour 文字仍然沒有被用到。 */}
                  <span className="text-lg font-medium text-gray-800">{product.briefLong}</span>
                </div>
              </dt>
            </div>

            <Section title="Tour Duration">
              <ul className="list-disc text-base/7 text-gray-600">
                <LabelledItem label="Total Duration:">{product.duration}</LabelledItem>
                <LabelledItem label="Time:">{product.time}</LabelledItem>
                <LabelledItem label="Daily Start Time:">{product.startTime}</LabelledItem>
              </ul>
            </Section>

            <Section title="Meeting Point">
              <ul className="list-disc text-base/7 text-gray-600">
                <LabelledItem label="Location:">{product.location}</LabelledItem>
                <LabelledItem label="Meeting Time:">{product.meetingTime}</LabelledItem>
              </ul>
            </Section>

            <Section title="Before You Go">
              <ol className="list-disc text-base/7 text-gray-600">
                {product.beforeYouGo.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ol>
            </Section>

            <Section title="Cancellation Policy">
              <ol className="list-disc text-base/7 text-gray-600">
                <LabelledItem label="Free Cancellation:">
                  Full refund for cancellations made 72 hours before the tour.
                </LabelledItem>
                <LabelledItem label="Partial Refund:">
                  50% refund for cancellations made 24–72 hours before the tour.
                </LabelledItem>
                <LabelledItem label="No Refund:">
                  No refunds for cancellations made within 24 hours of the tour start.
                </LabelledItem>
              </ol>
            </Section>

            <Section title="Rules">
              <ol className="list-disc text-base/7 text-gray-600">
                {product.rules.map((rule, i) => (
                  <li key={i}>
                    {rule.label && (
                      <>
                        <b>{rule.label}</b>
                        {'  '}
                      </>
                    )}
                    {rule.text}
                  </li>
                ))}
              </ol>
            </Section>
          </dl>
        </div>
      </div>
    </div>
  );
}
