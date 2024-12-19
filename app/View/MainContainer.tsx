"use client"
import React from 'react';
import { Provider } from 'jotai';
import styled from 'styled-components';
import MainContainerController from '../Controllers/MainContainerController';
import MenuComponent from '@/app/Components/Common/MenuComponent';
import CartComponent from '@/app/Components/Common/CartComponent';
import { cartItems } from '../Constants/CartConstants';
import ErrorBoundary from '../Components/Common/ErrorBoundary';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
`;

const Header = styled.header`
  background-color: #f8f9fa;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  color: #212529;
  font-size: 1.5rem;
  font-weight: 600;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;

  > *:first-child {
    margin-right: 1rem;
  }
`;

const HomeLink = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: 600;
  color: inherit;
  font-family: inherit;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  background-color: #ffffff;
  color: #212529;
  overflow-y: auto;
  min-height: 0;
`;

const Footer = styled.footer`
  background-color: #f8f9fa;
  padding: 1rem;
  text-align: center;
  border-top: 1px solid #dee2e6;
  color: #495057;
`;

const MainContainer: React.FC = () => {
  return (
    <Provider>
      <Container>
        <Header>
          <MenuComponent isAtTop="false" />
          <HomeLink>MKG Consultancy</HomeLink>
          <CartComponent cartItems={cartItems} />
        </Header>

        <MainContent>
          <ErrorBoundary>
            <MainContainerController />
          </ErrorBoundary>
        </MainContent>

        <Footer>
          <p>&copy; 2024 MKG Consultancy. All rights reserved.</p>
        </Footer>
      </Container>
    </Provider>
  );
};

export default MainContainer;
