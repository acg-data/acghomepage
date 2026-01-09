import { useState, useRef, forwardRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const portfolioPages = [
  {
    title: "Cover",
    content: "Portfolio of Relevant Work",
    image: null,
  },
  {
    title: "Project 1 of 8",
    subtitle: "Insurance GTM Strategy",
    description: "Built GTM strategy for a 50 year-old insurance company – ranking 10 different lines for them to best enter the Houston market across different parameters",
  },
  {
    title: "Project 2 of 8",
    subtitle: "VC End-to-End Strategy",
    description: "Working with a major VC firm to provide their entire end-to-end strategy of multiple industry's platform's friction point",
  },
  {
    title: "Project 3 of 8",
    subtitle: "Competitive Landscape Mapping",
    description: "Marketing mapping the competitive landscape of various segments the firm was interested in entering",
  },
  {
    title: "Project 4 of 8",
    subtitle: "$2B EU EdTech Due Diligence",
    description: "Analyzed the finances and ran due diligence for a $2B purchase of major EU EdTech company",
  },
  {
    title: "Project 5 of 8",
    subtitle: "Cloud Infrastructure Analysis",
    description: "Worked directly with a leading SaaS and E-commerce company ($50M-100M rev) to identify the financial value of AWS over on-premise cloud software",
  },
  {
    title: "Project 6 of 8",
    subtitle: "Environmental-Tech Pricing",
    description: "Determined the ideal pricing and GTM strategy for a leading Environmental-tech startup and its ability to compare to similar premium SaaS firms",
  },
  {
    title: "Project 7 of 8",
    subtitle: "SaaS Pricing Strategy",
    description: "Developed comprehensive pricing and go-to-market strategy benchmarked against premium SaaS industry standards",
  },
  {
    title: "Project 8 of 8",
    subtitle: "Ice Cream Market Analysis",
    description: "Analyzed a completely new concept on ice-cream to determine the TAM/SAM/SOM along with finding analogs in the current space to define highest penetration rate",
  },
  {
    title: "Our Clients",
    subtitle: "Working with ACG, you're in good hands",
    description: "Some of our happy clients include Fortune 500 companies, startups, and everything in between",
  },
];

const PageContent = forwardRef<HTMLDivElement, { page: typeof portfolioPages[0]; pageNumber: number }>(
  ({ page, pageNumber }, ref) => {
    const isFirstPage = pageNumber === 0;
    const isLastPage = pageNumber === portfolioPages.length - 1;

    return (
      <div 
        ref={ref} 
        className="page-content h-full w-full bg-white overflow-hidden"
        style={{ boxShadow: 'inset -2px 0 8px rgba(0,0,0,0.1)' }}
      >
        <div className={`h-full w-full flex flex-col ${isFirstPage ? 'bg-gradient-to-br from-[#274D8E] to-[#1a3a6d]' : 'bg-white'}`}>
          {isFirstPage ? (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-serif font-bold">A</span>
                </div>
                <p className="text-[#47B5CB] text-xs font-bold uppercase tracking-[0.2em] mb-2">Aryo Consulting Group</p>
              </div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-4 leading-tight">
                Portfolio of<br/>Relevant Work
              </h2>
              <div className="w-16 h-0.5 bg-[#47B5CB] mx-auto mb-4" />
              <p className="text-white/60 text-sm">Private and Confidential</p>
            </div>
          ) : isLastPage ? (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-[#274D8E] to-[#1a3a6d]">
              <p className="text-[#47B5CB] text-xs font-bold uppercase tracking-[0.2em] mb-4">Working with ACG</p>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-6 leading-tight">
                You're in<br/>Good Hands
              </h2>
              <p className="text-white/70 text-sm mb-8 max-w-xs">
                Some of our happy clients include Fortune 500 companies, startups, and everything in between
              </p>
              <div className="w-16 h-0.5 bg-[#47B5CB] mx-auto" />
            </div>
          ) : (
            <div className="h-full flex flex-col p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[#47B5CB] text-[10px] font-bold uppercase tracking-[0.15em]">
                  {page.title}
                </span>
                <span className="text-slate-400 text-[10px]">{pageNumber + 1}</span>
              </div>
              
              <div className="flex-1 flex flex-col justify-center">
                <div className="mb-4">
                  <div className="w-12 h-1 bg-gradient-to-r from-[#274D8E] to-[#47B5CB] rounded-full mb-4" />
                  <h3 className="text-lg md:text-xl font-serif font-bold text-[#274D8E] mb-3 leading-tight">
                    {page.subtitle}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {page.description}
                  </p>
                </div>

                <div className="mt-auto pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#274D8E]/10 rounded-full flex items-center justify-center">
                      <span className="text-[#274D8E] text-xs font-bold">{pageNumber}</span>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider">Case Study</p>
                      <p className="text-xs text-[#274D8E] font-medium">View Full Details</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-[8px] text-slate-300 text-right mt-4">
                Private and Confidential
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
);

PageContent.displayName = 'PageContent';

export function PortfolioFlipbook() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const flipBookRef = useRef<any>(null);

  const goToPrevPage = () => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipPrev();
    }
  };

  const goToNextPage = () => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipNext();
    }
  };

  const onFlip = (e: any) => {
    setCurrentPage(e.data);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const pageWidth = isFullscreen ? 350 : 280;
  const pageHeight = pageWidth * 1.4;

  return (
    <div 
      className={`transition-all duration-300 ${
        isFullscreen 
          ? 'fixed inset-0 z-50 bg-black/95 flex items-center justify-center' 
          : 'py-24 bg-gradient-to-b from-aryo-offWhite to-white border-b border-aryo-lightGrey'
      }`}
      data-testid="section-portfolio"
    >
      <div className={`${isFullscreen ? 'w-full max-w-5xl px-4' : 'max-w-7xl mx-auto px-6 lg:px-8'}`}>
        {!isFullscreen && (
          <div className="text-center mb-12">
            <span className="text-xs font-bold font-sans text-aryo-greenTeal tracking-[0.2em] uppercase">
              Our Track Record
            </span>
            <h2 className="text-4xl font-serif text-aryo-deepBlue mt-4 mb-4">
              Portfolio of Work
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg font-light">
              Explore our case studies and see how we've delivered measurable results across industries.
            </p>
          </div>
        )}

        <div className="flex flex-col items-center">
          <div className="relative mb-8">
            <HTMLFlipBook
              ref={flipBookRef}
              width={pageWidth}
              height={pageHeight}
              size="fixed"
              minWidth={250}
              maxWidth={400}
              minHeight={350}
              maxHeight={560}
              showCover={true}
              mobileScrollSupport={true}
              onFlip={onFlip}
              className="flipbook-shadow"
              style={{}}
              startPage={0}
              drawShadow={true}
              flippingTime={600}
              usePortrait={false}
              startZIndex={0}
              autoSize={false}
              maxShadowOpacity={0.4}
              showPageCorners={true}
              disableFlipByClick={false}
              swipeDistance={30}
              clickEventForward={true}
              useMouseEvents={true}
            >
              {portfolioPages.map((page, i) => (
                <PageContent key={i} page={page} pageNumber={i} />
              ))}
            </HTMLFlipBook>
          </div>

          <div className={`flex items-center justify-center gap-4 ${isFullscreen ? 'text-white' : ''}`}>
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrevPage}
              disabled={currentPage === 0}
              className={`${
                isFullscreen 
                  ? 'border-white/30 text-white hover:bg-white/10' 
                  : 'border-aryo-lightGrey hover:border-aryo-deepBlue'
              }`}
              data-testid="button-flipbook-prev"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            <div className={`text-sm font-medium px-4 py-2 rounded-full ${
              isFullscreen 
                ? 'bg-white/10 text-white' 
                : 'bg-aryo-offWhite text-aryo-deepBlue'
            }`}>
              {currentPage + 1} / {portfolioPages.length}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={goToNextPage}
              disabled={currentPage >= portfolioPages.length - 1}
              className={`${
                isFullscreen 
                  ? 'border-white/30 text-white hover:bg-white/10' 
                  : 'border-aryo-lightGrey hover:border-aryo-deepBlue'
              }`}
              data-testid="button-flipbook-next"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={toggleFullscreen}
              className={`ml-4 ${
                isFullscreen 
                  ? 'border-white/30 text-white hover:bg-white/10' 
                  : 'border-aryo-lightGrey hover:border-aryo-deepBlue'
              }`}
              data-testid="button-flipbook-fullscreen"
            >
              {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </Button>
          </div>

          <p className={`text-sm mt-4 ${isFullscreen ? 'text-white/60' : 'text-slate-400'}`}>
            Click pages or use arrows to flip through
          </p>
        </div>
      </div>
    </div>
  );
}
