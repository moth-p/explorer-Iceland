import { useState } from 'react';
import type { Product } from '@/lib/types';

/**
 * The five collapsible sections below the tour detail. All start expanded, as in
 * the original, and the icon flips between minus and plus.
 *
 * The original wired these with five near-identical click handlers over
 * `#minusIcon1`..`#minusIcon5` / `#foldaccordion1`..`#foldaccordion5`; the
 * markup is one component here.
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

/** A `<b>Label:</b>&nbsp;&nbsp;value` list item, the shape used throughout. */
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
                  {/* The original filled this from briefLong, not aboutTheTour --
                      preserved, so the longer aboutTheTour copy stays unused. */}
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
