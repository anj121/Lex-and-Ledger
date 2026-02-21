import React, { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight ,ArrowRight} from "lucide-react";
import { Button } from '@/components/ui/button.jsx'

const ServicesSlider = ({ serviceCategories, handleCategorySelect }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider({
    slides: {
      perView: 1.2,
      spacing: 15,
    },
    breakpoints: {
      "(min-width: 768px)": {
        slides: { perView: 2.2, spacing: 24 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 3, spacing: 32 },
      },
      "(min-width: 1280px)": {
        slides: { perView: 3, spacing: 32 },
      },
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  return (
    <div className="relative px-2">
      {/* Left Arrow */}
      {loaded && currentSlide > 0 && (
        <button
onClick={() => {
  const current = instanceRef.current?.track.details.rel;
  instanceRef.current?.moveToIdx(Math.max(current - 3, 0));
}}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full hover:scale-110 transition"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>
      )}

      {/* Right Arrow */}
      {loaded &&
        instanceRef.current &&
        currentSlide <
          instanceRef.current.track.details.slides.length -
            Math.floor(instanceRef.current.options.slides.perView) && (
          <button
            onClick={() => {
  const current = instanceRef.current?.track.details.rel;
  const max =
    instanceRef.current.track.details.slides.length -
    Math.floor(instanceRef.current.options.slides.perView);
  instanceRef.current?.moveToIdx(Math.min(current + 3, max));
}}

            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full hover:scale-110 transition"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        )}

      {/* Slider */}
      <div ref={sliderRef} className="keen-slider mb-6 py-5">
        {serviceCategories.map((category) => (
          <div key={category.id} className="keen-slider__slide !overflow-[unset]">
        <Card 
                key={category.id} 
                className="shadow-[0px_0px_5px_#00000020] cursor-pointer border-0 bg-white/60 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.02] h-full"
                onClick={() => handleCategorySelect(category)}
              >
                <CardContent className="p-8 text-center h-full flex justify-between flex-col">
                  <div>
                    <div className={`w-20 h-20 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                    <category.icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {category.description}
                  </p>
                  <Badge variant="secondary" className="bg-blue-50 text-blue-600 mb-4">
                    {category.services.length} Services Available
                  </Badge>
                  <div className="space-y-1 text-sm text-gray-500 mb-4">
                    {category.services.slice(0, 3).map((service, index) => (
                      <div key={index}>• {service.name}</div>
                    ))}
                    {category.services.length > 3 && (
                      <div className="text-blue-600 font-medium">
                        +{category.services.length - 3} more services
                      </div>
                    )}
                  </div>
                  </div>
                  <div>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Explore Services
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  </div>
                </CardContent>
              </Card>
          </div>
        ))}
      </div>

      {/* Dots */}
      {loaded && instanceRef.current && (
        <div className="flex justify-center gap-2 mt-2">
          {Array.from(
            {
              length:
                instanceRef.current.track.details.slides.length -
                Math.floor(instanceRef.current.options.slides.perView) +
                1,
            },
            (_, idx) => (
              <button
                key={idx}
                onClick={() => instanceRef.current?.moveToIdx(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  currentSlide === idx
                    ? "bg-blue-600"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            )
          )}
        </div>
      )}
    </div>
  );
};

export default ServicesSlider;
