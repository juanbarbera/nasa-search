import styled from 'styled-components';

import { Logo } from '../components/Logo';
import SearchBar from '../components/SearchBar';

const Background = styled.section`
  height: 100vh;
  width: 100vw;
  background: linear-gradient(#2c2c2c, #000000);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const LogoPositioner = styled.div`
  transform: scale(.7);
`;

// https://images-api.nasa.gov/search?q=mars --->DONE

export const Home = () => {
  return (    
    <Background>
      <LogoPositioner>
        <Logo />
      </LogoPositioner>      
      <SearchBar />
    </Background>
  )
}

