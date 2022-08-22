/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
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

interface Props {
  imgsrc: any;
  loading: any;
};

const SingleResult = styled.div<Props>`
  width: 345px;
  height: 235px;
  transition: all .15s ease-in;
  cursor: pointer;
  background-image: ${props => `url(${props.imgsrc})`} !important;
  background-size: cover;
  :hover {
    transform: scale(1.075);
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

const Results = ({ handleCollectionLink, handleCollectionInfo, query, mediaType }:any) => {
  const [controlledResponse, setControlledResponse]:any = useState([]);
  const [loading, setLoading]:any = useState(false);

  const fetchNasa = async (query:any) => {
    let response:any = {};
    if (query && mediaType === "image") {
      response = await axios.get(`https://images-api.nasa.gov/search?q=${query.toLowerCase()}&media_type=image`)
        .catch(error => {
          setLoading(false);
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
      console.log(response.data);
      setControlledResponse(response.data.collection.items.slice(0, 12));
    } else if (query && mediaType === "video") {
      response = await axios.get(`https://images-api.nasa.gov/search?q=${query.toLowerCase()}&media_type=video`) 
      .catch(error => {
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
      console.log(response.data);
      setControlledResponse(response.data.collection.items.slice(0, 12));
    }   
  };

  useEffect(() => {
    console.log(loading);
  },[loading])
  
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

  const spaceRemover:any = (num:number) => {
    let thumbnail:string = '';
    if (controlledResponse[num]) {
      thumbnail = controlledResponse[num].links[0].href;
    }
    return thumbnail.split(" ").join("%20");
  }

  const renderResults = () => {
    if (controlledResponse.length > 1){
      // console.log(controlledResponse.length);
      return (
        <>
        <SingleResult loading={loading} imgsrc={spaceRemover(0)} onClick={() => onThumbnailClick(0)}/>
        <SingleResult loading={loading} imgsrc={spaceRemover(1)} onClick={() => onThumbnailClick(1)}/>
        <SingleResult loading={loading} imgsrc={spaceRemover(2)} onClick={() => onThumbnailClick(2)}/>
        <SingleResult loading={loading} imgsrc={spaceRemover(3)} onClick={() => onThumbnailClick(3)}/>
        <SingleResult loading={loading} imgsrc={spaceRemover(4)} onClick={() => onThumbnailClick(4)}/>
        <SingleResult loading={loading} imgsrc={spaceRemover(5)} onClick={() => onThumbnailClick(5)}/>
        <SingleResult loading={loading} imgsrc={spaceRemover(6)} onClick={() => onThumbnailClick(6)}/>
        <SingleResult loading={loading} imgsrc={spaceRemover(7)} onClick={() => onThumbnailClick(7)}/>
        <SingleResult loading={loading} imgsrc={spaceRemover(8)} onClick={() => onThumbnailClick(8)}/>
        <SingleResult loading={loading} imgsrc={spaceRemover(9)} onClick={() => onThumbnailClick(9)}/>
        <SingleResult loading={loading} imgsrc={spaceRemover(10)} onClick={() => onThumbnailClick(10)}/>
        <SingleResult loading={loading} imgsrc={spaceRemover(11)} onClick={() => onThumbnailClick(11)}/>
        </>
      )
    } else {            
    return (
      // <>
      // <SingleResult />
      // <SingleResult />
      // <SingleResult />
      // <SingleResult />
      // <SingleResult />
      // <SingleResult />
      // </>
      <NoReturn>Nothing was found...</NoReturn>
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