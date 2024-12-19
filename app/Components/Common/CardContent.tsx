import * as React from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/app/Components/Common/ui/card";
import { Button } from "@/app/Components/Common/ui/button";
import { Card as CardType } from "@/app/Constants/ProjectConstants/card";
import { cn } from "@/lib/utils";

interface CardContentComponentProps {
  card: CardType;
  className?: string;
}

const CardContentComponent = ({ card, className }: CardContentComponentProps) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/cards/${card.id}`);
  };

  return (
    <Card 
      onClick={handleCardClick}
      className={cn(
        "cursor-pointer transition-all duration-200 hover:shadow-lg h-full flex flex-col",
        className
      )}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
    >
      <CardContent className="p-0 flex-shrink-0">
        <div className="relative w-full pt-[56.25%]"> {/* 16:9 aspect ratio */}
          {card?.mediaUrl ? (
            <img 
              src={card.mediaUrl} 
              alt={card.title} 
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          ) : (
            <div className="absolute top-0 left-0 w-full h-full bg-gray-300 flex items-center justify-center">
              <span className="text-4xl sm:text-5xl lg:text-6xl">🎨</span>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardHeader className="p-3 sm:p-4 flex-shrink-0">
        <CardTitle className="text-lg sm:text-xl lg:text-2xl line-clamp-2">{card?.title}</CardTitle>
        <CardDescription className="text-xs sm:text-sm lg:text-base line-clamp-2">
          {card?.secondaryText}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-3 sm:p-4 flex-grow">
        <p className="text-gray-700 text-sm sm:text-base line-clamp-3">
          {card?.description}
        </p>
      </CardContent>
      
      <CardFooter className="p-3 sm:p-4 flex-shrink-0 flex justify-between mt-auto">
        <Button 
          variant="link" 
          className="text-blue-500 text-xs sm:text-sm lg:text-base px-1"
        >
          {card?.actions?.action1}
        </Button>
        <Button 
          variant="link" 
          className="text-blue-500 text-xs sm:text-sm lg:text-base px-1"
        >
          {card?.actions?.action2}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CardContentComponent;
