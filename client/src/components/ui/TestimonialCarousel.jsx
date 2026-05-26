import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";

export default function TestimonialCarousel({ testimonials }) {
  const [swiper, setSwiper] = useState(null);

  if (!testimonials?.length) return null;

  return (
    <div className="relative">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{ 768: { slidesPerView: 2 } }}
        autoplay={{ delay: 5000, pauseOnMouseEnter: true, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        onSwiper={setSwiper}
        className="pb-12"
      >
        {testimonials.map((t) => (
          <SwiperSlide key={t._id}>
            <div className="bg-white rounded-2xl p-8 shadow-sm h-full">
              <span
                className="font-serif text-brand-sage text-[3rem] leading-none block mb-4"
                aria-hidden="true"
              >
                "
              </span>
              <blockquote className="font-serif italic text-brand-brown text-[1.125rem] leading-relaxed mb-6">
                {t.quote}
              </blockquote>
              <footer>
                <cite className="not-italic">
                  <span className="font-sans font-semibold text-brand-charcoal text-sm block">
                    {t.author?.name || t.name}
                  </span>
                  <span className="font-sans text-brand-clay text-xs">
                    {t.author?.role || t.role}
                  </span>
                </cite>
              </footer>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom arrows */}
      <button
        onClick={() => swiper?.slidePrev()}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-brand-green text-white flex items-center justify-center hover:bg-brand-forest transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-brand-green"
        aria-label="Previous testimonial"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={() => swiper?.slideNext()}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-brand-green text-white flex items-center justify-center hover:bg-brand-forest transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-brand-green"
        aria-label="Next testimonial"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
