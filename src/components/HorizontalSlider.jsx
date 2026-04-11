import React, { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HorizontalSlider = ({ items, renderCard, slidesPerView = 3 }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider({
    slides: { perView: 1.2, spacing: 15 },
    breakpoints: {
      "(min-width: 768px)": { slides: { perView: 2.2, spacing: 24 } },
      "(min-width: 1024px)": { slides: { perView: slidesPerView, spacing: 32 } },
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  const goToPrev = () => {
    const current = instanceRef.current?.track.details.rel;
    instanceRef.current?.moveToIdx(Math.max(current - slidesPerView, 0));
  };

  const goToNext = () => {
    const current = instanceRef.current?.track.details.rel;
    const max =
      instanceRef.current.track.details.slides.length - slidesPerView;
    instanceRef.current?.moveToIdx(Math.min(current + slidesPerView, max));
  };

  return (
    <div className="relative px-2">
      {loaded && currentSlide > 0 && (
        <button
          onClick={goToPrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>
      )}

      {loaded &&
        instanceRef.current &&
        currentSlide <
          instanceRef.current.track.details.slides.length - slidesPerView && (
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        )}

      <div ref={sliderRef} className="keen-slider py-6 mb-6">
        {items.map((item, index) => (
          <div key={`${item.id || item._id}-${index}`} className="keen-slider__slide !overflow-visible">
            {renderCard(item)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalSlider;
