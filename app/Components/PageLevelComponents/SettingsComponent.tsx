'use client'
import React, { useEffect, useState } from 'react';
import { getStrapiData } from '../../Controllers/SettingsPageController';
import { HeroSection } from './HeroSection';
import { HeroSectionProps } from '../../Constants/SettingsConstants/Constants';

export default function SettingsComponent() {
  const [strapiData, setStrapiData] = useState<HeroSectionProps | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getStrapiData("api/home-page");
      setStrapiData(data.data.blocks[0]);
    };
    fetchData();
  }, []);

  if (!strapiData) {
    return <p>Loading...</p>;
  }
    
  return (
    <HeroSection data={strapiData} />
  );
} 