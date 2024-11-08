"use client";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import PropTypes from "prop-types";

export default function Slider({
  children,
  delay = 1500,
}: {
  children: React.ReactNode[];
  delay: number;
}) {
  return (
    <>
      <Swiper
        spaceBetween={20}
        centeredSlides={true}
        slidesPerView={10}
        breakpoints={{
          1300: {
            slidesPerView: 9,
          },
          1200: {
            slidesPerView: 8,
          },
          1024: {
            slidesPerView: 7,
          },
          924: {
            slidesPerView: 6,
          },
          768: {
            slidesPerView: 5,
          },
          580: {
            slidesPerView: 4,
          },
        }}
        autoplay={{
          delay,
          disableOnInteraction: false,
        }}
        loop={true}
        // pagination={{
        //   clickable: true,
        // }}
        // grabCursor={true}
        // navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {children.map((child, i) => (
          <SwiperSlide className="" key={i}>
            {child}
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

Slider.propTypes = {
  children: PropTypes.array.isRequired,
  delay: PropTypes.number,
};
