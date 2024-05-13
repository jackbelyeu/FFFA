import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import image1 from "@/images/carosel-img/4.jpg";
import image2 from "@/images/carosel-img/2.jpg";
import image3 from "@/images/carosel-img/3.jpg";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export function HomeCarousel() {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 2500,
        }),
      ]}
    >
      <CarouselContent>
        <CarouselItem className="h-[68vh] relative w-full flex justify-center items-center">
          <Image
            src={image1}
            alt="People playing Soccer in a field"
            layout="fill"
            objectFit="cover"
          />
        </CarouselItem>
        <CarouselItem className="h-[68vh] relative w-full flex justify-center items-center">
          <Image
            src={image2}
            alt="People playing Soccer in a field"
            layout="fill"
            objectFit="cover"
          />
        </CarouselItem>
        <CarouselItem className="h-[68vh] relative w-full flex justify-center items-center">
          <Image
            src={image3}
            alt="People playing Soccer in a field"
            layout="fill"
            objectFit="cover"
          />
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
}
