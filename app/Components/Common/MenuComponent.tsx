"use client"
import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { activeTabAtom } from '../../Store/atoms';
import styled from 'styled-components';

const MenuButton = styled.button<{ isattop: string; isopen: string }>`
  display: flex;
  position: ${props => props.isattop === "true" ? 'relative' : 'fixed'};
  top: ${props => props.isattop === "true" ? 'auto' : '1rem'};
  left: ${props => props.isattop === "true" ? 'auto' : '1rem'};
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  background-color: #2c3e50;
  color: gray;
  border: none;
  border-radius: 9999px;
  z-index: 50;
  transition: all 0.3s ease;
  opacity: ${props => props.isopen === "true" ? 0 : 1};
  
  &:hover {
    background-color: #34495e;
  }

  svg {
    width: 24px;
    height: 24px;
    display: block;
    stroke: #ffffff;
  }
`;

const MenuItem = styled.button<{ isactive: string }>`
  width: 100%;
  text-align: left;
  padding: 1rem;
  margin: 0.25rem;
  background-color: ${props => props.isactive ? '#2c3e50' : '#2c3e90'};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  &:hover {
    background-color: #83c4e7;
  }
`;
const menuItems = [
    { id: 0, name: 'Projects', icon: '🏠' },
    { id: 1, name: 'Settings', icon: '⚙️' },
    { id: 2, name: 'Shop', icon: '🛒' },
    { id: 3, name: 'Log in', icon: '🔑' }
  ];

const MenuComponent: React.FC<{ isAtTop : string }> = ({ isAtTop }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useAtom(activeTabAtom);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuClick = (tabId: number) => {
    setActiveTab(tabId);
    setIsOpen(false);
  };

  return (
    <>
      <MenuButton 
        onClick={toggleDrawer} 
        aria-label="Open menu"
        isopen={isOpen ? "true" : "false"}
        isattop={ isAtTop ? "true" : "false"}
      >
  
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#ffffff"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </MenuButton>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity z-30"
          onClick={toggleDrawer}
          onKeyDown={(e) => e.key === 'Escape' && toggleDrawer()}
          role="button"
          tabIndex={0}
        />
      )}

      <div
        className={`fixed left-0 top-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        tabIndex={0}
        aria-label="Navigation menu drawer"
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Menu</h2>
            <button
              onClick={toggleDrawer}
              className="p-2 hover:bg-gray-100 rounded-full"
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <MenuItem
                  isactive={activeTab === item.id ? 'true' : 'false'}
                  onClick={() => handleMenuClick(item.id)}
                >
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </MenuItem>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default MenuComponent;
