import React, { Component, ErrorInfo, ReactNode } from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  padding: 2rem;
  color: #721c24;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  margin: 1rem;
`;

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <h2>Something went wrong.</h2>
          <p>{this.state.error?.message}</p>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 