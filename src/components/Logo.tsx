import styled, { keyframes } from 'styled-components';
import logoNasa from '../assets/images/NASA-logo.webp';

const LogoWrapper = styled.div`
  width: 350px;
  height: 200px;
  background-color: rgba(100,100,100,0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0 100px 100px 0;
  transform: translateX(-50%);
`;

const LogoImage = styled.img`
  position: relative;
  height: 300px;
  left: 0;
  transform: translateX(-25%);
`;

const colorChange = keyframes`
  from {
    color: rgba(100,100,100,0.3);
  }
  to {
    color: rgb(225,225,225);
  }
`;

const Search = styled.div`
  position: relative;
  left: -37.5%;
  font-size: 2.5rem;
  color: rgb(225,225,225);
  font-family: 'Cabin', sans-serif;
  font-weight: 600;
  letter-spacing: 8px;
  animation: ${colorChange} 1;
  animation-duration: 5s;
`;

export const Logo = () => {
  return (
    <LogoWrapper>
      <LogoImage src={logoNasa}/>
      <Search>SEARCH</Search>
    </LogoWrapper>
  )
}