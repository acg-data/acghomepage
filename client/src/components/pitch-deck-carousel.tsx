import { useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const slides = [
  {
    id: 1,
    label: "Pitch Deck for AI Music SaaS Startup",
    image: "/pitch-deck/pitch_deck_page-1.png",
  },
  {
    id: 2,
    label: "Pitch Deck for Food Delivery Startup",
    image: "/pitch-deck/pitch_deck_page-2.png",
  },
  {
    id: 3,
    label: "Pitch Deck for Sexual Health Startup",
    image: "/pitch-deck/pitch_deck_page-3.png",
  },
];

export function PitchDeckCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useState(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    onSelect();
  });

  return (
    <section 
      className="py-16 sm:py-24 bg-gradient-to-b from-aryo-offWhite to-white"
      data-testid="section-pitch-deck-carousel"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-12">
          <span className="text-xs font-bold font-sans text-aryo-greenTeal tracking-[0.2em] uppercase">
            Sample Work
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-aryo-deepBlue mt-4 mb-4">
            Client Pitch Decks
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-base sm:text-lg font-light">
            Explore examples of pitch decks we've created for startups across different industries.
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-xl" ref={emblaRef}>
            <div className="flex">
              {slides.map((slide) => (
                <div 
                  key={slide.id} 
                  className="flex-[0_0_100%] min-w-0 px-2 sm:px-4"
                >
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-aryo-lightGrey">
                    <div className="p-4 sm:p-6 text-center bg-gradient-to-r from-aryo-deepBlue/5 to-aryo-teal/5">
                      <p className="text-sm sm:text-base font-medium text-aryo-deepBlue">
                        {slide.label}
                      </p>
                    </div>
                    <div className="relative aspect-video">
                      <img
                        src={slide.image}
                        alt={slide.label}
                        className="w-full h-full object-contain bg-slate-50"
                        data-testid={`img-pitch-slide-${slide.id}`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 z-10 bg-white/90 backdrop-blur-sm border-aryo-lightGrey hover:border-aryo-deepBlue hover:bg-white shadow-lg"
            data-testid="button-carousel-prev"
          >
            <ChevronLeft className="w-5 h-5 text-aryo-deepBlue" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 z-10 bg-white/90 backdrop-blur-sm border-aryo-lightGrey hover:border-aryo-deepBlue hover:bg-white shadow-lg"
            data-testid="button-carousel-next"
          >
            <ChevronRight className="w-5 h-5 text-aryo-deepBlue" />
          </Button>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                selectedIndex === index 
                  ? 'bg-aryo-deepBlue w-8' 
                  : 'bg-aryo-deepBlue/20 hover:bg-aryo-deepBlue/40'
              }`}
              data-testid={`button-dot-${index}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <p className="text-xs sm:text-sm text-slate-400 text-center mt-4">
          Swipe or use arrows to navigate
        </p>
      </div>
    </section>
  );
}
