"use client";

import { Carousel } from "@mantine/carousel";
import { Image, rem } from "@mantine/core";

interface Props {
  images: string[];
}

export default function ProductImageCarouel({ images }: Props) {
  return (
    <Carousel withIndicators color="blue" className="w-full md:w-[25rem]">
      {images.map((img, index) => (
        <Carousel.Slide key={index}>
          <Image
            radius={"md"}
            src={img}
            className="h-[20rem] min-w-[20rem] object-cover md:h-[25rem] md:min-w-[25rem]"
            alt=""
            fallbackSrc="https://placehold.co/600x400?text=Placeholder"
          />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}
