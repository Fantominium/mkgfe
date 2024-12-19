"use client"
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 1rem;
  
  @media (min-width: 640px) {
    padding: 2rem;
  }
  
  @media (min-width: 1024px) {
    padding: 3rem;
  }
  
  h2 {
    font-size: 1.5rem;
    
    @media (min-width: 640px) {
      font-size: 1.875rem;
    }
    
    @media (min-width: 1024px) {
      font-size: 2.25rem;
    }
  }
`;

export default function SettingsComponent() {
  return (
    <Container>
      <h2>Settings</h2>
      <p>Settings placeholder content</p>
    </Container>
  );
} 