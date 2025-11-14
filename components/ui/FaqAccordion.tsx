'use client';

import { useState } from 'react';

type FaqItem = {
  question: string;
  answer: string;
};

type FaqAccordionProps = {
  items: FaqItem[];
};

const IconChevronDown = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
    />
  </svg>
);

export default function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className="rounded-lg border border-gray-200 bg-white shadow-sm"
          >
            <button
              className="faq-toggle flex w-full items-center justify-between p-6 text-left hover:bg-gray-50/50"
              onClick={() => handleClick(index)}
            >
              <span className="font-poppins text-lg font-medium text-gray-900">
                {item.question}
              </span>
              <span
                className={`faq-icon ml-6 h-5 w-5 text-brand-accent ${
                  isOpen ? 'open' : ''
                }`}
              >
                <IconChevronDown />
              </span>
            </button>
            <div
              className="faq-answer overflow-hidden transition-all duration-500 ease-in-out"
              style={{ maxHeight: isOpen ? '1000px' : '0px' }} // Simple and effective
            >
              <p className="text-base text-gray-600 px-6 pb-6">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
