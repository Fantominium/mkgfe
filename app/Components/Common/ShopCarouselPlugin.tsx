import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import { cn } from "@/lib/utils"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/app/Components/Common/ui/carousel"
import CardContentComponent from "@/app/Components/Common/CardContent"
import { ProjectConstants } from "@/app/Constants/ProjectConstants/ProjectConstants"

interface CarouselPluginProps {
  className?: string;
  title?: string;
  autoplaySpeed?: number;
}

export function ShopCarouselPlugin({ 
  className, 
  title, 
  autoplaySpeed = 20000
}: CarouselPluginProps) {
  const [isHovered, setIsHovered] = React.useState(false);
  const plugin = React.useRef(
    Autoplay({ 
      delay: autoplaySpeed,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
      rootNode: (emblaRoot) => emblaRoot.parentElement
    })
  )

  return (
    <div className={cn("flex items-center gap-6 w-full h-full", className)}>
      {title && (
        <h2 className="font-display text-[length:var(--carousel-title-size)] whitespace-nowrap">
          {title}
        </h2>
      )}
      <Carousel
        plugins={[plugin.current]}
        className="flex-1 h-[90%]"
        onMouseEnter={() => {
          plugin.current.stop();
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          plugin.current.play();
          setIsHovered(false);
        }}
        opts={{
          loop: true,
          align: "center",
          dragFree: !isHovered,
          slides: {
            perView: 3,
            spacing: 16,
          },
          breakpoints: {
            '(max-width: 768px)': {
              slides: {
                perView: 1,
                spacing: 8,
              },
            },
          },
        }
    }
      >
        <CarouselContent className="-ml-2 md:-ml-4 h-full">
          {ProjectConstants.map((card, index) => (
            <CarouselItem 
              key={index} 
              className="pl-2 md:pl-4 h-full"
              style={{ flex: '0 0 calc(33.333% - 16px)' }}
            >
              <div className="p-1 h-full">
                <CardContentComponent 
                  card={card}
                  className="h-full flex flex-col"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex -left-4" />
        <CarouselNext className="hidden sm:flex -right-4" />
      </Carousel>
    </div>
  )
}