import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { handleParameter } from '../actions';

import { Logo } from '../components/Logo';
import SearchBar from '../components/SearchBar';

const Background = styled.section`
  height: 100vh;
  width: 100vw;
  background-color: rgb(35,35,35);
  color: white;
  display: grid;
  grid-template-rows: 1fr 4fr;
`;

const LogoAndSearchBarDivider = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  height: 90%;
`;

const SingleResult = styled.img`
  width: 350px;
  height: 210px;
`;

const Results = ({ query, handleParameter }:any) => {
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
      // controlledResponse =  response ? response.data.collection.items.slice(0, 6) : [];
      setControlledResponse(response.data.collection.items.slice(0, 6));
    }    
  }
  
  useEffect(() => {
    fetchNasa(query);
  },[query]);

  const renderResults = () => {
    if (controlledResponse.length > 1){
      // console.log(controlledResponse);
      return (
        <>
        <SingleResult src={controlledResponse[0] ? controlledResponse[0].links[0].href : ''} />
        <SingleResult src={controlledResponse[1] ? controlledResponse[1].links[0].href : ''}/>
        <SingleResult src={controlledResponse[2] ? controlledResponse[2].links[0].href : ''}/>
        <SingleResult src={controlledResponse[3] ? controlledResponse[3].links[0].href : ''}/>
        <SingleResult src={controlledResponse[4] ? controlledResponse[4].links[0].href : ''}/>
        <SingleResult src={controlledResponse[5] ? controlledResponse[5].links[0].href : ''}/>
        </>
      )
      // controlledResponse.map((item:any) => {
      //   console.log(item.links[0].href)
      //   return <SingleResult key={item.links[0].href} src={item.links[0].href} />
      // })                  
      // return( <SingleResult src={controlledResponse[0].links[0].href}/> )
      // return <div>controlled</div>
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
      <LogoAndSearchBarDivider>
        <LogoPositioner>
          <Logo />
        </LogoPositioner>
        <SearchBarPositioner>
          <SearchBar />
        </SearchBarPositioner>
      </LogoAndSearchBarDivider>      
      <ResultsWrapper>
        <ResultsGrid>
          {/* <SingleResult src={nasa.length > 1 ? nasa.nasaContent[3].links[0].href : ''}/>
          <SingleResult />
          <SingleResult />
          <SingleResult />
          <SingleResult />
          <SingleResult /> */}

          {/* { if (nasaContent) {
            nasaContent.map((item:any) => {
              // console.log(item.links[0].href)
              return <SingleResult src={item.links[0].href}/>
            })
          }
          } */}

          {/* Immediately invoked function expression */}
          {/* {(() => {
              if (loaded){
                controlledResponse.map((item:any) => {
                  return (
                    <SingleResult src={item.links[0].href}/>
                  )
                })                  
              }              
              return (
                <>
                <SingleResult />
                <SingleResult />
                <SingleResult />
                <SingleResult />
                <SingleResult />
                <SingleResult />
                </>
              )
            })()} */}

            {renderResults()}
        </ResultsGrid>
      </ResultsWrapper>
    </Background>
  )
}

const mapStateToProps = (state:any) => {
  return { query: state.nasa.query}
}

export default connect(mapStateToProps, { handleParameter })(Results)