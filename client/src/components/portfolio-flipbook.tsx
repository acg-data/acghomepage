import { useState, useRef, forwardRef, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, ZoomIn, ZoomOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TOTAL_PAGES = 10;

const PageImage = forwardRef<HTMLDivElement, { pageNumber: number; isFullscreen: boolean }>(
  ({ pageNumber, isFullscreen }, ref) => {
    const [loaded, setLoaded] = useState(false);
    const paddedNumber = String(pageNumber).padStart(2, '0');
    const imageSrc = `/portfolio/portfolio_page-${paddedNumber}.png`;

    return (
      <div 
        ref={ref} 
        className="page-image bg-white h-full w-full overflow-hidden"
        style={{ 
          boxShadow: 'inset -3px 0 10px rgba(0,0,0,0.15)',
        }}
      >
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
            <div className="w-8 h-8 border-2 border-aryo-deepBlue/20 border-t-aryo-deepBlue rounded-full animate-spin" />
          </div>
        )}
        <img
          src={imageSrc}
          alt={`Portfolio page ${pageNumber}`}
          className={`w-full h-full object-contain transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setLoaded(true)}
          draggable={false}
        />
      </div>
    );
  }
);

PageImage.displayName = 'PageImage';

export function PortfolioFlipbook() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 350, height: 490 });
  const flipBookRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const maxWidth = isFullscreen ? 700 : 550;
        const calculatedWidth = Math.min(containerWidth * 0.48, maxWidth);
        const width = Math.max(380, calculatedWidth);
        setDimensions({
          width,
          height: Math.round(width * 0.56),
        });
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [isFullscreen]);

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

  return (
    <div 
      ref={containerRef}
      className={`transition-all duration-300 ${
        isFullscreen 
          ? 'fixed inset-0 z-50 bg-gradient-to-b from-slate-900 to-slate-950 flex items-center justify-center' 
          : 'py-24 bg-gradient-to-b from-aryo-offWhite to-white border-b border-aryo-lightGrey'
      }`}
      data-testid="section-portfolio"
    >
      <div className={`${isFullscreen ? 'w-full max-w-6xl px-4' : 'max-w-7xl mx-auto px-6 lg:px-8'}`}>
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

        {isFullscreen && (
          <div className="absolute top-4 right-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleFullscreen}
              className="text-white hover:bg-white/10"
              data-testid="button-flipbook-close"
            >
              <Minimize2 className="w-6 h-6" />
            </Button>
          </div>
        )}

        <div className="flex flex-col items-center">
          <div className="relative mb-8" style={{ perspective: '2000px' }}>
            <HTMLFlipBook
              ref={flipBookRef}
              width={dimensions.width}
              height={dimensions.height}
              size="fixed"
              minWidth={380}
              maxWidth={700}
              minHeight={213}
              maxHeight={392}
              showCover={true}
              mobileScrollSupport={true}
              onFlip={onFlip}
              className="flipbook-container"
              style={{
                boxShadow: isFullscreen 
                  ? '0 25px 80px rgba(0,0,0,0.5)' 
                  : '0 15px 50px rgba(39, 77, 142, 0.2)',
              }}
              startPage={0}
              drawShadow={true}
              flippingTime={700}
              usePortrait={false}
              startZIndex={0}
              autoSize={false}
              maxShadowOpacity={0.5}
              showPageCorners={true}
              disableFlipByClick={false}
              swipeDistance={30}
              clickEventForward={true}
              useMouseEvents={true}
            >
              {Array.from({ length: TOTAL_PAGES }, (_, i) => (
                <PageImage key={i} pageNumber={i + 1} isFullscreen={isFullscreen} />
              ))}
            </HTMLFlipBook>
          </div>

          <div className={`flex items-center justify-center gap-3 ${isFullscreen ? 'text-white' : ''}`}>
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrevPage}
              disabled={currentPage === 0}
              className={`transition-all ${
                isFullscreen 
                  ? 'border-white/30 text-white hover:bg-white/10 disabled:opacity-30' 
                  : 'border-aryo-lightGrey hover:border-aryo-deepBlue hover:bg-aryo-offWhite disabled:opacity-40'
              }`}
              data-testid="button-flipbook-prev"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            <div className={`text-sm font-medium px-5 py-2 rounded-full min-w-[80px] text-center ${
              isFullscreen 
                ? 'bg-white/10 text-white' 
                : 'bg-aryo-deepBlue/5 text-aryo-deepBlue border border-aryo-deepBlue/10'
            }`}>
              {currentPage + 1} / {TOTAL_PAGES}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={goToNextPage}
              disabled={currentPage >= TOTAL_PAGES - 1}
              className={`transition-all ${
                isFullscreen 
                  ? 'border-white/30 text-white hover:bg-white/10 disabled:opacity-30' 
                  : 'border-aryo-lightGrey hover:border-aryo-deepBlue hover:bg-aryo-offWhite disabled:opacity-40'
              }`}
              data-testid="button-flipbook-next"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>

            <div className="w-px h-6 bg-current opacity-20 mx-2" />

            <Button
              variant="outline"
              size="icon"
              onClick={toggleFullscreen}
              className={`transition-all ${
                isFullscreen 
                  ? 'border-white/30 text-white hover:bg-white/10' 
                  : 'border-aryo-lightGrey hover:border-aryo-deepBlue hover:bg-aryo-offWhite'
              }`}
              data-testid="button-flipbook-fullscreen"
            >
              {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </Button>
          </div>

          <p className={`text-sm mt-5 ${isFullscreen ? 'text-white/50' : 'text-slate-400'}`}>
            Click on pages or drag to flip through our portfolio
          </p>
        </div>
      </div>
    </div>
  );
}
