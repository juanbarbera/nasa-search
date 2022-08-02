import styled from 'styled-components';
import { connect } from 'react-redux';
import { fetchContent } from '../actions';

import { Logo } from '../components/Logo';
import { SearchBar } from '../components/SearchBar';
import { useEffect } from 'react';

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

// given an array of objects, how do I render a generic component for each object inside the array?

// const DynamicallyRenderGrid = (nasa: any) => {
//   let nasaContent:any = nasa ? nasa.nasaContent : [];




//   return (
//     <>
//     <SingleResult />
//     <SingleResult />
//     <SingleResult />
//     <SingleResult />
//     <SingleResult />
//     <SingleResult />
//     </>
//   )
// }


const Results = ({ nasa, fetchContent }:any) => {
  

  let nasaContent:any = nasa ? nasa.nasaContent : [];

    // useEffect(() => {
  //   console.log(nasa.nasaContent[0]);
  // },[nasa])

  return (
    <Background>
      <LogoAndSearchBarDivider>
        <LogoPositioner>
          <Logo />
        </LogoPositioner>
        <SearchBarPositioner>
          <SearchBar fetchContent={fetchContent} />
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
          {(() => {
              if (nasaContent){
                nasaContent.map((item:any) => {
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
            })()}


        </ResultsGrid>
      </ResultsWrapper>
    </Background>
  )
}

const mapStateToProps = (state:any) => {
  return { nasa: state.nasa}
}

export default connect(mapStateToProps, { fetchContent })(Results)