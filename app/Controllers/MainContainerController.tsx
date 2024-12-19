"use client"
import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import styled from 'styled-components';
import { 
  activeTabAtom, 
  navigationHistoryAtom, 
  isLoadingAtom,
} from '../Store/atoms';
import ProjectsComponent from '../Components/PageLevelComponents/ProjectsComponent';
import SettingsComponent from '../Components/PageLevelComponents/SettingsComponent';
import LoadingSpinner from '../Components/Common/LoadingSpinner';
import LoginComponentForm from '@/app/View/login/page';
import ShopComponent from '@/app/Components/PageLevelComponents/ShopComponent';

const FadeContainer = styled.div<{ isvisible: string }>`
  opacity: ${props => props.isvisible === "true" ? 1 : 0};
  transition: opacity 0.25s ease-in-out;
`;

const MainContainerController: React.FC = () => {
  const [activeTab] = useAtom(activeTabAtom);
  const [, setNavigationHistory] = useAtom(navigationHistoryAtom);
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
  const [currentComponent, setCurrentComponent] = useState<React.ReactNode | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  const renderComponent = (tabId: number) => {
    switch (tabId) {
      case 0:
        return <ProjectsComponent />;
      case 1:
        return <SettingsComponent />;
      case 2:
        return <ShopComponent />;
      case 3:
        return <LoginComponentForm />;
    }
  };

  useEffect(() => {
    const handleComponentChange = async () => {
      setIsLoading(true);
      setIsVisible(false);

      // Wait for fade out
      await new Promise(resolve => setTimeout(resolve, 250));

      // Update component
      setCurrentComponent(renderComponent(activeTab));
      
      // Add to navigation history
      setNavigationHistory(prev => [...prev, { tabId: activeTab, timestamp: Date.now() }]);
      
      // Show new component
      setIsVisible(true);
      setIsLoading(false);
    };

    handleComponentChange();
  }, [activeTab, setNavigationHistory, setIsLoading]);

  return (
    <FadeContainer isvisible={isVisible ? "true" : "false"}>
      {isLoading ? <LoadingSpinner /> : currentComponent}
    </FadeContainer>
  );
};

export default MainContainerController; 