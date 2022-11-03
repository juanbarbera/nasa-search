import styled, { keyframes } from 'styled-components';
import earth from '../assets/images/earth.webp';
import jamesWebb from '../assets/images/JWST.webp';

const LoadingAnimationWrapper = styled.div`
  height: 60vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Earth = styled.img`
  width: 95px;
  height: 95px;
  z-index: 0;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg) translateX(150px) rotate(0deg);
  }
  to {
    transform: rotate(360deg) translatex(150px) rotate(-360deg);
  }
`;

const JamesWebb = styled.img`
  width: 30px;
  height: 30px;
  position: absolute;
  z-index: 1;
  animation: ${rotate} 2.5s infinite linear;
`;

export const LoadingAnimation:any = () => {
  return (
    <LoadingAnimationWrapper>
      <Earth src={earth} />
      <JamesWebb src={jamesWebb} />
    </LoadingAnimationWrapper>
  )
}