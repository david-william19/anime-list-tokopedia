import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

// Animation for the skeleton loading
const loadingAnimation = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

// Styled Skeleton Component
const SkeletonWrapper = styled.div`
  display: inline-block;
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
  background-image: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 37%, #f0f0f0 63%);
  background-size: 200px 100%;
  animation: ${loadingAnimation} 1.5s infinite;
`;

// Props for SkeletonLoading
interface SkeletonLoadingProps {
  width?: string;
  height?: string;
}

const SkeletonLoading: React.FC<SkeletonLoadingProps> = ({ width, height }) => {
  return <SkeletonWrapper style={{ width, height }} />;
};

export default SkeletonLoading;
