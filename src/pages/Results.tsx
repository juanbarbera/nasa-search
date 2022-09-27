/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import { handleCollectionLink, handleCollectionInfo } from '../actions';

import { Logo } from '../components/Logo';
import SearchBar from '../components/SearchBar';

import earth from '../assets/images/earth.webp';
import jamesWebb from '../assets/images/JWST.webp';

const Background = styled.section`
  width: 100%;
  min-height: 100vh;
  height: auto;
  color: white;
  background: linear-gradient(#2c2c2c, #000000);
  overflow: hidden;
`;

const LogoAndSearchBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5vh;
  @media (max-width: 1100px) {
    margin-bottom: 0;
  }
`;

const LogoPositioner = styled.div`
  display: flex;
  justify-content: center;
  transform: scale(.55);
  @media (max-width: 1100px) {
    margin-left: 10vw;
  }
`;

const SearchBarPositioner = styled.div`
  transform: scale(.7);
  @media (max-width: 1100px) {
    margin-bottom: 5vh;
    transform: scale(1);
  }
`;

const ResultsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface Props {
  imgsrc?: any;
  isLoading: any;
};

const ResultsGrid = styled.div<Props>`
  display: ${props => props.isLoading? 'flex' : 'grid'};
  grid-template-columns: 1fr;
  grid-auto-flow: row;
  justify-items: center;
  align-items: center;
  grid-gap: 20px;
  width: ${props => props.isLoading? '90%' : 'auto'};
  height: auto;
  margin-bottom: 5vh;
  @media (min-width: 750px) {
    grid-template-columns: 1fr 1fr;
    justify-content: center;
  }
  @media (min-width: 1100px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media (min-width: 1500px) {
    grid-gap: 30px;
  }
`;

const SingleResult = styled.div<Props>`
  width: 345px;
  height: 235px;
  transition: all .25s;
  cursor: pointer;
  background-image: ${props => `url(${props.imgsrc})`} !important;
  background-size: cover;
  @media (min-width: 1100px) {
    :hover {
      transform: scale(1.085);
    }
  }
`;

const NoReturn = styled.div`
  height: 30vh;
  width: 100%;
  font-family: 'Kanit', sans-serif;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

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
  animation: ${rotate} 4.5s infinite linear;
`;

const Results = ({ handleCollectionLink, handleCollectionInfo, query, mediaType }:any) => {
  const [controlledResponse, setControlledResponse]:any = useState([]);
  const [isLoading, setIsLoading]:any = useState(false); 

  const fetchNasa = async (query:any) => {
    setIsLoading(true);
    let response:any = {};
    if (query && mediaType === "image") {
      response = await axios.get(`https://images-api.nasa.gov/search?q=${query.toLowerCase()}&media_type=image`)
        .catch(error => {
          setIsLoading(false);
          if (error.response) {
            console.log('Response Data:' + error.response.data);
            console.log(`Response Status: ${error.response.status}`);
            console.log(`Response Header: ${error.response.headers}`);
          } else if (error.request) {
            console.log(`Request Error: ${error.request}`);
          } else {
            console.log('Error:', error.message);
          }
      })
      const firstEighteenItems = response.data.collection.items.slice(0, 18);
      setControlledResponse(firstEighteenItems);
      setIsLoading(false);
    } else if (query && mediaType === "video") {
      response = await axios.get(`https://images-api.nasa.gov/search?q=${query.toLowerCase()}&media_type=video`) 
      .catch(error => {
        setIsLoading(false);
        if (error.response) {
          console.log('Response Data:' + error.response.data);
          console.log(`Response Status: ${error.response.status}`);
          console.log(`Response Header: ${error.response.headers}`);
        } else if (error.request) {
          console.log(`Request Error: ${error.request}`);
        } else {
          console.log('Error:', error.message);
        }
      })
      const firstEighteenItems = response.data.collection.items.slice(0, 18);
      setControlledResponse(firstEighteenItems);
      setIsLoading(false);
    }   
  };
    
  useEffect(() => {
    fetchNasa(query);
  },[query, mediaType]);

  const navigate = useNavigate();

  const onThumbnailClick = (num:number) => {    
    handleCollectionLink(controlledResponse[num].href);
    handleCollectionInfo(controlledResponse[num].data[0]);
    if (mediaType === "image") {
      navigate('/image-display');
    } else {
      navigate('/video-display');
    }
  }

  const spaceRemover:any = (num:number) => {
    let thumbnail:string = '';
    if (controlledResponse[num]) {
      thumbnail = controlledResponse[num].links[0].href;
    }
    return thumbnail.split(" ").join("%20");
  }

  const renderResults = () => {
    if (isLoading) {
      return (
        <LoadingAnimationWrapper>
          <Earth src={earth} />
          <JamesWebb src={jamesWebb} />
        </LoadingAnimationWrapper>
      )
    } else {
      if (controlledResponse.length > 1){
        return (
          <>
          <SingleResult isLoading={isLoading} imgsrc={spaceRemover(0)} onClick={() => onThumbnailClick(0)}/>
          <SingleResult isLoading={isLoading} imgsrc={spaceRemover(1)} onClick={() => onThumbnailClick(1)}/>
          <SingleResult isLoading={isLoading} imgsrc={spaceRemover(2)} onClick={() => onThumbnailClick(2)}/>
          <SingleResult isLoading={isLoading} imgsrc={spaceRemover(3)} onClick={() => onThumbnailClick(3)}/>
          <SingleResult isLoading={isLoading} imgsrc={spaceRemover(4)} onClick={() => onThumbnailClick(4)}/>
          <SingleResult isLoading={isLoading} imgsrc={spaceRemover(5)} onClick={() => onThumbnailClick(5)}/>
          <SingleResult isLoading={isLoading} imgsrc={spaceRemover(6)} onClick={() => onThumbnailClick(6)}/>
          <SingleResult isLoading={isLoading} imgsrc={spaceRemover(7)} onClick={() => onThumbnailClick(7)}/>
          <SingleResult isLoading={isLoading} imgsrc={spaceRemover(8)} onClick={() => onThumbnailClick(8)}/>
          <SingleResult isLoading={isLoading} imgsrc={spaceRemover(9)} onClick={() => onThumbnailClick(9)}/>
          <SingleResult isLoading={isLoading} imgsrc={spaceRemover(10)} onClick={() => onThumbnailClick(10)}/>
          <SingleResult isLoading={isLoading} imgsrc={spaceRemover(11)} onClick={() => onThumbnailClick(11)}/>
          <SingleResult isLoading={isLoading} imgsrc={spaceRemover(12)} onClick={() => onThumbnailClick(12)}/>
          <SingleResult isLoading={isLoading} imgsrc={spaceRemover(13)} onClick={() => onThumbnailClick(13)}/>
          <SingleResult isLoading={isLoading} imgsrc={spaceRemover(14)} onClick={() => onThumbnailClick(14)}/>
          <SingleResult isLoading={isLoading} imgsrc={spaceRemover(15)} onClick={() => onThumbnailClick(15)}/>
          <SingleResult isLoading={isLoading} imgsrc={spaceRemover(16)} onClick={() => onThumbnailClick(16)}/>
          <SingleResult isLoading={isLoading} imgsrc={spaceRemover(17)} onClick={() => onThumbnailClick(17)}/>
          </>
        )
      } else {            
      return (
        <NoReturn>Nothing was found...</NoReturn>
      )}
    }
  }

  return (
    <Background>
      <LogoAndSearchBarWrapper>
        <LogoPositioner>
          <Logo />
        </LogoPositioner>
        <SearchBarPositioner>
          <SearchBar />
        </SearchBarPositioner>
      </LogoAndSearchBarWrapper>      
      <ResultsWrapper>
        <ResultsGrid isLoading={isLoading}>
          {renderResults()}
        </ResultsGrid>
      </ResultsWrapper>
    </Background>
  )
}

const mapStateToProps = (state:any) => {
  return { 
    query: state.nasa.query,
    mediaType: state.nasa.mediaType
  }
}

export default connect(mapStateToProps, { handleCollectionLink, handleCollectionInfo })(Results);