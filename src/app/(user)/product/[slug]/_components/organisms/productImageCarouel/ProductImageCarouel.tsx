"use client";

import { Carousel } from "@mantine/carousel";
import { Image, rem } from "@mantine/core";

const imgMock =
  "https://img.wongnai.com/p/1600x0/2019/09/07/abc2cc4421a344e1842ab5e0c3ffb130.jpg";

export default function ProductImageCarouel() {
  return (
    <Carousel withIndicators color="blue" className="w-full md:w-[25rem]">
      <Carousel.Slide>
        <Image
          radius={"md"}
          src={imgMock}
          className="h-[20rem] min-w-[20rem] object-cover md:h-[25rem] md:min-w-[25rem]"
          alt=""
        />
      </Carousel.Slide>
      <Carousel.Slide>
        {" "}
        <Image
          radius={"md"}
          src={imgMock}
          className="h-[20rem] min-w-[20rem] object-cover md:h-[25rem] md:min-w-[25rem]"
          alt=""
        />
      </Carousel.Slide>
      <Carousel.Slide>
        {" "}
        <Image
          radius={"md"}
          src={imgMock}
          className="h-[20rem] min-w-[20rem] object-cover md:h-[25rem] md:min-w-[25rem]"
          alt=""
        />
      </Carousel.Slide>
    </Carousel>
  );
}
