"use client"
import { useEffect, useRef } from "react"
import styled from "styled-components"
import { ShopCarouselPlugin } from '@/app/Components/Common/ShopCarouselPlugin'

const ShopContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - var(--header-height) - var(--footer-height));
  overflow-y: hidden;
  scroll-behavior: smooth;
  padding: 1rem;
  gap: 2rem; // margin between carousels
  
  @media (min-width: 640px) {
    padding: 2rem;
  }
  
  @media (min-width: 1024px) {
    padding: 3rem;
  }
`

const CarouselSection = styled.section`
  height: calc((100vh - var(--header-height) - var(--footer-height) - 4rem) / 3);
  width: 80%;
  margin: 0 auto;

  // Calculate title size based on carousel height
  --carousel-title-size: calc(100% / 5);
`

export default function ShopComponent() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set CSS variables for header and footer heights
    if (containerRef.current) {
      const header = document.querySelector('header');
      const footer = document.querySelector('footer');
      
      containerRef.current.style.setProperty(
        '--header-height', 
        `${header?.offsetHeight || 0}px`
      );
      containerRef.current.style.setProperty(
        '--footer-height', 
        `${footer?.offsetHeight || 0}px`
      );
    }
  }, []);

  return (
    <ShopContainer ref={containerRef}>
      <CarouselSection>
        <ShopCarouselPlugin 
          title="Featured Projects" 
          autoplaySpeed={25000}
        />
      </CarouselSection>
      <CarouselSection>
        <ShopCarouselPlugin 
          title="Recent Work" 
          autoplaySpeed={20000}
        />
      </CarouselSection>
      <CarouselSection>
        <ShopCarouselPlugin 
          title="Client Projects" 
          autoplaySpeed={15000}
        />
      </CarouselSection>
    </ShopContainer>
  )
}