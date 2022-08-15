/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { handleCollectionLink, handleCollectionInfo } from '../actions';

import { Logo } from '../components/Logo';
import SearchBar from '../components/SearchBar';

const Background = styled.section`
  min-width: 100%;
  min-height: 100vh;
  color: white;
  background: linear-gradient(rgb(35,35,35), #0c0c0c);
`;

const LogoAndSearchBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5vh;
`;

const LogoPositioner = styled.div`
  display: flex;
  justify-content: center;
  transform: scale(.55);
`;

const SearchBarPositioner = styled.div`
  transform: scale(.7);
`;

const ResultsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-flow: row;
  justify-items: center;
  align-items: center;
  grid-gap: 20px;
  /* width: 90%; */
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
    /* width: 80%; */
    grid-gap: 30px;
  }
`;

const SingleResult = styled.img`
  width: 345px;
  height: 235px;
  transition: all .15s ease-in;
  cursor: pointer;
  :hover {
    transform: scale(1.075);
  }
`;

const Results = ({ handleCollectionLink, handleCollectionInfo, query, mediaType }:any) => {
  const [controlledResponse, setControlledResponse]:any = useState([]);

  const fetchNasa = async (query:any) => {
    let response:any = {};
    if (query && mediaType === "image") {
      response = await axios.get(`https://images-api.nasa.gov/search?q=${query.toLowerCase()}&media_type=image`) 
      .catch(error => {
        if (error.response) {
          // Request made and server responded
          console.log('Response Data:' + error.response.data);
          console.log(`Response Status: ${error.response.status}`);
          console.log(`Response Header: ${error.response.headers}`);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(`Request Error: ${error.request}`);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error:', error.message);
        }
      })
      console.log(response.data);
      setControlledResponse(response.data.collection.items.slice(0, 12));
    } else if (query && mediaType === "video") {
      response = await axios.get(`https://images-api.nasa.gov/search?q=${query.toLowerCase()}&media_type=video`) 
      .catch(error => {
        if (error.response) {
          // Request made and server responded
          console.log('Response Data:' + error.response.data);
          console.log(`Response Status: ${error.response.status}`);
          console.log(`Response Header: ${error.response.headers}`);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(`Request Error: ${error.request}`);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error:', error.message);
        }
      })
      // console.log(response.data);
      setControlledResponse(response.data.collection.items.slice(0, 12));
    }   
  };
  
  useEffect(() => {
    fetchNasa(query);
  },[query, mediaType]);

  useEffect(() => {
    console.log(query, mediaType);
  },[query, mediaType]);

  const navigate = useNavigate();

  const onThumbnailClick = (num:number) => {
    // console.log(controlledResponse[0].data[0].title)
    // console.log(controlledResponse[0].data[0].description)
    
    // if (controlledResponse[0]) {
      handleCollectionLink(controlledResponse[num].href);
      handleCollectionInfo(controlledResponse[num].data[0])
    // }

    if (mediaType === "image") {
      // update response link state at redux
      // navigate to image display page
      navigate('/image-display');
    } else {
      navigate('/video-display');
    }
  }

  const renderResults = () => {
    if (controlledResponse.length > 1){
      // console.log(controlledResponse.length);
      return (
        <>
        <SingleResult src={controlledResponse[0] ? controlledResponse[0].links[0].href : ''} onClick={() => onThumbnailClick(0)}/>
        <SingleResult src={controlledResponse[1] ? controlledResponse[1].links[0].href : ''} onClick={() => onThumbnailClick(1)}/>
        <SingleResult src={controlledResponse[2] ? controlledResponse[2].links[0].href : ''} onClick={() => onThumbnailClick(2)}/>
        <SingleResult src={controlledResponse[3] ? controlledResponse[3].links[0].href : ''} onClick={() => onThumbnailClick(3)}/>
        <SingleResult src={controlledResponse[4] ? controlledResponse[4].links[0].href : ''} onClick={() => onThumbnailClick(4)}/>
        <SingleResult src={controlledResponse[5] ? controlledResponse[5].links[0].href : ''} onClick={() => onThumbnailClick(5)}/>
        <SingleResult src={controlledResponse[6] ? controlledResponse[6].links[0].href : ''} onClick={() => onThumbnailClick(6)}/>
        <SingleResult src={controlledResponse[7] ? controlledResponse[7].links[0].href : ''} onClick={() => onThumbnailClick(7)}/>
        <SingleResult src={controlledResponse[8] ? controlledResponse[8].links[0].href : ''} onClick={() => onThumbnailClick(8)}/>
        <SingleResult src={controlledResponse[9] ? controlledResponse[9].links[0].href : ''} onClick={() => onThumbnailClick(9)}/>
        <SingleResult src={controlledResponse[10] ? controlledResponse[10].links[0].href : ''} onClick={() => onThumbnailClick(10)}/>
        <SingleResult src={controlledResponse[11] ? controlledResponse[11].links[0].href : ''} onClick={() => onThumbnailClick(11)}/>
        </>
      )
    } else {            
    return (
      <>
      <SingleResult />
      <SingleResult />
      <SingleResult />
      <SingleResult />
      <SingleResult />
      <SingleResult />
      </>
    )}
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
        <ResultsGrid>
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