import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import styled from 'styled-components';

import { Logo } from '../components/Logo';
import SearchBar from '../components/SearchBar';

const Background = styled.section`
  height: auto;
  width: 100%;
  background-color: rgb(35,35,35);
  color: white;
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
  transform: scale(.35);
`;

const SearchBarPositioner = styled.div`
  transform: scale(.7);
`;

const ResultsWrapper = styled.div`
  background: linear-gradient(rgb(35,35,35), #0c0c0c);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-auto-flow: row;
  justify-items: center;
  align-items: center;
  grid-gap: 15px;
  width: 80%;
  height: auto;
  margin-bottom: 5vh;
  @media (min-width: 750px) {
    grid-template-columns: 1fr 1fr;
    justify-content: center;
    grid-gap: 20px;
  }
  @media (min-width: 1035px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const SingleResult = styled.img`
  width: 100%;
  max-height: 250px;
  object-fit: cover;
`;

const Results = ({ query }:any) => {
  const [controlledResponse, setControlledResponse]:any = useState([]);

  const fetchNasa = async (query:any) => {
    if (query) {
    const response:any = await axios.get(`https://images-api.nasa.gov/search?q=${query.toLowerCase()}`) 
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
      setControlledResponse(response.data.collection.items.slice(0, 13));
    }    
  }
  
  useEffect(() => {
    fetchNasa(query);
  },[query]);

  const renderResults = () => {
    if (controlledResponse.length > 1){
      console.log(controlledResponse.length);
      return (
        <>
        <SingleResult src={controlledResponse[0] ? controlledResponse[0].links[0].href : ''}/>
        <SingleResult src={controlledResponse[1] ? controlledResponse[1].links[0].href : ''}/>
        <SingleResult src={controlledResponse[2] ? controlledResponse[2].links[0].href : ''}/>
        <SingleResult src={controlledResponse[3] ? controlledResponse[3].links[0].href : ''}/>
        <SingleResult src={controlledResponse[4] ? controlledResponse[4].links[0].href : ''}/>
        <SingleResult src={controlledResponse[5] ? controlledResponse[5].links[0].href : ''}/>
        <SingleResult src={controlledResponse[6] ? controlledResponse[6].links[0].href : ''}/>
        <SingleResult src={controlledResponse[7] ? controlledResponse[7].links[0].href : ''}/>
        <SingleResult src={controlledResponse[8] ? controlledResponse[8].links[0].href : ''}/>
        <SingleResult src={controlledResponse[9] ? controlledResponse[9].links[0].href : ''}/>
        <SingleResult src={controlledResponse[10] ? controlledResponse[10].links[0].href : ''}/>
        <SingleResult src={controlledResponse[11] ? controlledResponse[11].links[0].href : ''}/>
        <SingleResult src={controlledResponse[12] ? controlledResponse[12].links[0].href : ''}/>
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
  return { query: state.nasa.query}
}

export default connect(mapStateToProps, {})(Results)