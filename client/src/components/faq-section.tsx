import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
  heading?: string;
}

export function FAQSection({ faqs, heading = "Frequently Asked Questions" }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-white" data-testid="section-faq">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-serif text-aryo-deepBlue mb-12 text-center">{heading}</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-aryo-lightGrey overflow-hidden"
              data-testid={`faq-item-${i}`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
                data-testid={`faq-toggle-${i}`}
              >
                <span className="font-medium text-aryo-deepBlue pr-4">{faq.question}</span>
                <ChevronDown
                  size={20}
                  className={`text-aryo-teal shrink-0 transition-transform duration-200 ${openIndex === i ? 'rotate-180' : ''}`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-200 ${openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="px-6 pb-6 text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
