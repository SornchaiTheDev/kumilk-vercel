"use client";

import { Carousel } from "@mantine/carousel";

export default function ImageCarousel() {
  return (
    <Carousel
      withIndicators
      height={200}
      slideSize={{ base: "100%", sm: "50%", md: "33.333333%" }}
      slideGap={{ base: 0, sm: "md" }}
      loop
      align="start"
    >
      <Carousel.Slide>
        <img className="" src="/image/01.webp" alt="" />
      </Carousel.Slide>
      <Carousel.Slide>
        <img src="/image/02.webp" alt="" />
      </Carousel.Slide>
      <Carousel.Slide>
        <img src="/image/03.webp" alt="" />
      </Carousel.Slide>
    </Carousel>
  );
}
