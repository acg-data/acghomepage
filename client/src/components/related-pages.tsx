import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';

interface RelatedPage {
  title: string;
  description: string;
  href: string;
}

interface RelatedPagesProps {
  heading?: string;
  pages: RelatedPage[];
}

export function RelatedPages({ heading = "Explore More", pages }: RelatedPagesProps) {
  return (
    <section className="border-t border-aryo-lightGrey pt-12 mt-16" data-testid="section-related-pages">
      <h2 className="text-2xl font-serif text-aryo-deepBlue mb-8">{heading}</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {pages.map((page, i) => (
          <Link
            key={i}
            href={page.href}
            className="group block bg-white border border-aryo-lightGrey p-6 hover:border-aryo-teal transition-colors"
            data-testid={`link-related-${i}`}
          >
            <h3 className="font-serif font-bold text-aryo-deepBlue mb-2 group-hover:text-aryo-teal transition-colors">
              {page.title}
            </h3>
            <p className="text-sm text-slate-600 mb-4 line-clamp-2">{page.description}</p>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-aryo-greenTeal uppercase tracking-widest">
              Learn More <ArrowRight size={12} />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
