import styled from 'styled-components';
import TextField from '@mui/material/TextField';

import { Logo } from '../components/Logo';
import { SearchBar } from '../components/SearchBar';

const Background = styled.section`
  height: 100vh;
  width: 100vw;
  background-color: black;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

// not the best layout, the focus is on the final product and the improvements can be done with more time.

const LogoPositioner = styled.div`
  transform: scale(.7) translateX(250px);
`;

export const Home = () => {
  return (
    <Background>
      <LogoPositioner>
        <Logo />
      </LogoPositioner>      
      < SearchBar />
    </Background>
  );
}