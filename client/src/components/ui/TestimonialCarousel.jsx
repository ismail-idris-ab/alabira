import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function TestimonialCarousel({ testimonials }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  if (!testimonials?.length) return null;

  return (
    <div className="relative">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{ 768: { slidesPerView: 2 } }}
        autoplay={{ delay: 5000, pauseOnMouseEnter: true, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        className="pb-12"
      >
        {testimonials.map((t) => (
          <SwiperSlide key={t._id}>
            <div className="bg-white rounded-2xl p-8 shadow-sm h-full">
              <span
                className="font-serif text-brand-sage block mb-4"
                style={{ fontSize: "3rem", lineHeight: 1 }}
                aria-hidden="true"
              >
                "
              </span>
              <blockquote
                className="font-serif italic text-brand-brown leading-relaxed mb-6"
                style={{ fontSize: "1.125rem" }}
              >
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
        ref={prevRef}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-brand-green text-white flex items-center justify-center hover:bg-[#1F4D2C] transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-brand-green"
        aria-label="Previous testimonial"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        ref={nextRef}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-brand-green text-white flex items-center justify-center hover:bg-[#1F4D2C] transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-brand-green"
        aria-label="Next testimonial"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
