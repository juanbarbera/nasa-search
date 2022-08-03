import styled from 'styled-components';

import { Logo } from '../components/Logo';
import SearchBar from '../components/SearchBar';

const Background = styled.section`
  height: 100vh;
  width: 100vw;
  background: linear-gradient(rgb(35,35,35), #0c0c0c);
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

// when press enter, if parameter is valid, fires get request through redux, then go to results page. Parameter is stored as piece of state with redux. and is displayed at results page.  --->DONE

// define "test" to input 

// display page has return button, which returns to results.

// try to smooth out logo render

export const Home = () => {
  return (
    <Background>
      <LogoPositioner>
        <Logo />
      </LogoPositioner>      
      <SearchBar />
    </Background>
  );
}

