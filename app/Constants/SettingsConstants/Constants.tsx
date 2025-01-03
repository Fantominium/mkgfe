export interface HeroSectionImage {
    id: number;
    documentId: string;
    url: string;
    alternativeText: string | null;
  }
  
  export interface HeroSectionLink {
    id: number;
    url: string;
    text: string;
    isExternal: boolean;
  }
  
  export interface HeroSectionProps {
    id: number;
    documentId: string;
    __component: string;
    title: string;
    description: string;
    image: HeroSectionImage;
    link: HeroSectionLink;
  }