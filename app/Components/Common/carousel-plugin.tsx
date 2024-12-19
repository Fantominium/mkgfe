import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/app/Components/Common/ui/carousel"
import CardContentComponent from "@/app/Components/Common/CardContent"
import { ProjectConstants } from "@/app/Constants/ProjectConstants/ProjectConstants"

export function CarouselPlugin() {
  const plugin = React.useRef(
    Autoplay({ 
      delay: 6000, 
      stopOnInteraction: true,
      stopOnMouseEnter: true, 
      rootNode: (emblaRoot) => emblaRoot.parentElement
    })
  )

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-screen-xl md:max-w-screen-sm mx-auto px-4"
      onMouseEnter={() => plugin.current.stop()}
      onMouseLeave={() => plugin.current.play()}
      opts={{
        loop: true,
        align: "center",
        
      }}
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem 
            key={index} 
            className="pl-2 md:pl-4 basis-11/12 md:basis-full"
          >
            <div className="p-1">
              <CardContentComponent card={ProjectConstants[index]}/>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden sm:flex" />
      <CarouselNext className="hidden sm:flex" />
    </Carousel>
  )
}

