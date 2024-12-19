"use client"
import React from 'react';
import styled from 'styled-components';
import { CarouselPlugin } from '@/app/Components/Common/carousel-plugin';

const ProjectsContainer = styled.div`
  width: 100%;
`;

export default function ProjectsComponent() {
  return (
    <ProjectsContainer>
      <CarouselPlugin />
    </ProjectsContainer>
  );
} 