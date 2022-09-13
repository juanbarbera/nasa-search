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
  justify-content: center;
  align-items: center;
`;

const LogoPositioner = styled.div`
  transform: scale(.7);
  @media (max-width: 1100px) {
    transform: scale(.6);
    margin-left: 10vw;
  }
`;

const SearchBarPositioner = styled.div`
  margin-top: 8vh;
`;

const FavoritesWrapper = styled.div`
  position: absolute;
  top: 80%;
  font-family: 'Ubuntu Mono', monospace;
  width: 100%;
  height: 5vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: left;
  @media (max-width: 1100px) {
    top: 90%;
  }
`;

const FavoritesRecommendations = styled.div`
  text-align: center;
`;

export const Home = () => {
  return (    
    <Background>
      <LogoPositioner>
        <Logo />
      </LogoPositioner>      
      <SearchBarPositioner>
        <SearchBar />
      </SearchBarPositioner>
      <FavoritesWrapper>
        Recommended Image Searches:
        <FavoritesRecommendations>
          <br/>
          reef
          <br/>
          nebula
          <br/>
          black hole
        </FavoritesRecommendations>
      </FavoritesWrapper>
    </Background>
  )
}

