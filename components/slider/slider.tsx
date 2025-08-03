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
import React from "react";

export default function Slider({
  children,
  delay = 1500,
}: {
  readonly children: React.ReactNode[];
  readonly delay: number;
}) {
  return (
    <Swiper
      spaceBetween={20}
      centeredSlides={true}
      slidesPerView={3}
      breakpoints={{
        1300: {
          slidesPerView: 7,
        },
        1200: {
          slidesPerView: 6,
        },
        1024: {
          slidesPerView: 5,
        },
        924: {
          slidesPerView: 4,
        },
        768: {
          slidesPerView: 4,
        },
        580: {
          slidesPerView: 4,
        },
      }}
      autoplay={{
        delay,
        disableOnInteraction: false,
      }}
      loop={children.length > 1}
      // pagination={{
      //   clickable: true,
      // }}
      // grabCursor={true}
      // navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
    >
      {children.map((child, i) => (
        <SwiperSlide key={i}>{child}</SwiperSlide>
      ))}
    </Swiper>
  );
}

Slider.propTypes = {
  children: PropTypes.array.isRequired,
  delay: PropTypes.number,
};
