/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { Logo } from '../components/Logo';
import { ReturnButton } from '../components/ReturnButton';
import { LoadingAnimation } from '../components/LoadingAnimation';

const Background = styled.div`
  background: linear-gradient(#2c2c2c, #000000);
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoPositioner = styled.div`
  transform: scale(.55);
  @media (max-width: 1100px) {
    margin-left: 10vw;
  }
`;

const Title = styled.div`
  font-family: 'Kanit', sans-serif;
  color: white;
  margin: 5vh 0 2vh;
  font-size: 2.35rem;
  font-weight: 500;
  width: 90%;
  text-align: center;
  @media (max-width: 1100px) {
    font-size: 1.85rem;
  }
`;

// type Props = {
//   imageHasLoaded: boolean
// }

const Image = styled.img<{ imageHasLoaded: boolean }>`
  width: 80%;
  max-height: 80vh;
  object-fit: scale-down;
  display: ${props => props.imageHasLoaded ? 'block': 'none'};
`;

const LoadingAnimationContainer = styled.div<{ imageHasLoaded: boolean }>`
  width: 100%;
  height: 100%;
  display: ${props => props.imageHasLoaded ? 'none': 'block'};
`;

const Description = styled.div`
  font-family: 'Kanit', sans-serif;
  color: white;
  margin: 5vh 0 5vh;
  font-size: 1.25rem;
  font-weight: 300;
  width: 75%;
  @media (max-width: 1100px) {
    width: 95%;
    height: auto;
    text-align: center;
    /* word-break: break-all; */
    overflow-wrap: break-word;
  }
`;

const ImageDisplay = ({ collectionLink, collectionInfo }:any) => {
  const [imageResponse, setImageResponse]:any = useState('');
  const [imageHasLoaded, setImageHasLoaded]:any = useState(false);
  
  const navigate = useNavigate();
  let response:any = {};

  const fetchNasaMedia = async () => {
    response = await axios
      .get(collectionLink)
      .catch(error => {
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }})
    // console.log(response.data[0]);
    setImageResponse(response.data[0]);
  }
  
  useEffect(() => {
    fetchNasaMedia();
  },[]);

  return (
    <Background>
      <LogoPositioner>
        <Logo />
      </LogoPositioner>
      <ReturnButton onClick={() => navigate('/results')}>RETURN</ReturnButton>
      <Title>{collectionInfo ? collectionInfo.title : ''}</Title>
      <Image src={imageResponse} onLoad={() => setImageHasLoaded(true)} imageHasLoaded={imageHasLoaded}/>
      <LoadingAnimationContainer imageHasLoaded={imageHasLoaded}>
        <LoadingAnimation />
      </LoadingAnimationContainer>
      <Description>{collectionInfo ? collectionInfo.description : ''}</Description>      
    </Background>
  )
}

const mapStateToProps = (state:any) => {
  return { collectionLink: state.nasa.collectionLink, collectionInfo: state.nasa.collectionInfo };
};

export default connect(mapStateToProps, {})(ImageDisplay);