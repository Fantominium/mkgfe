import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Spinner = styled.div`
  width: 30px;
  height: 30px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #3498db;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  
  @media (min-width: 640px) {
    width: 40px;
    height: 40px;
    border-width: 4px;
  }
  
  @media (min-width: 1024px) {
    width: 50px;
    height: 50px;
    border-width: 5px;
  }
`;

export default function LoadingSpinner() {
  return (
    <SpinnerContainer>
      <Spinner />
    </SpinnerContainer>
  );
} 