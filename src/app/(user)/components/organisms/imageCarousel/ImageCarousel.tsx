"use client";

import { imageFallback } from "@/utils/imageFallback";
import { Carousel } from "@mantine/carousel";
import { Image } from "@mantine/core";

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
        <Image src="/image/01.webp" alt="" fit="cover" h={200} fallbackSrc={imageFallback} />
      </Carousel.Slide>
      <Carousel.Slide>
        <Image src="/image/02.webp" alt="" fit="cover" h={200} fallbackSrc={imageFallback} />
      </Carousel.Slide>
      <Carousel.Slide>
        <Image src="/image/03.webp" alt="" fit="cover" h={200} fallbackSrc={imageFallback} />
      </Carousel.Slide>
    </Carousel>
  );
}
