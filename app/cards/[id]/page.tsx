'use client';

import { useParams } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/app/Components/Common/ui/card";
import { Button } from "@/app/Components/Common/ui/button";
import { ProjectConstants } from "@/app/Constants/ProjectConstants/ProjectConstants";
import { useState, useEffect } from 'react';
import { Card as CardType } from "@/app/Constants/ProjectConstants/card";
import LoadingSpinner from '@/app/Components/Common/LoadingSpinner';

export default function CardDetailPage() {
  const params = useParams();
  const [card, setCard] = useState<CardType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const loadCard = async () => {
      setIsLoading(true);
      setIsVisible(false);
      
      // Simulate loading delay for fade effect
      await new Promise(resolve => setTimeout(resolve, 250));
      
      const cardData = ProjectConstants.find(card => card.id === params.id) || null;
      setCard(cardData);
      setIsLoading(false);
      setIsVisible(true);
    };

    loadCard();
  }, [params.id]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!card) {
    return <div>Card not found</div>;
  }

  return (
    <div className={`transition-opacity duration-250 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <Card className="max-w-3xl mx-auto">
        <CardContent className="p-0">
          <div className="bg-gray-300 h-64 sm:h-96 flex items-center justify-center">
            {card.mediaUrl ? (
              <img src={card.mediaUrl} alt={card.title} className="w-full h-full object-cover" />
            ) : (
              <span className="text-6xl">🎨</span>
            )}
          </div>
        </CardContent>
        <CardHeader className="p-6">
          <CardTitle className="text-2xl sm:text-3xl">{card.title}</CardTitle>
          <CardDescription className="text-base sm:text-lg">{card.secondaryText}</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-gray-700 text-lg leading-relaxed">{card.description}</p>
        </CardContent>
        <CardFooter className="p-6 flex justify-between">
          <Button variant="link" className="text-blue-500 text-lg">{card.actions.action1}</Button>
          <Button variant="link" className="text-blue-500 text-lg">{card.actions.action2}</Button>
        </CardFooter>
      </Card>
    </div>
  );
} 