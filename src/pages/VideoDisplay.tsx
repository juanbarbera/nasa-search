/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { Logo } from '../components/Logo';
import { ReturnButton } from '../components/ReturnButton';

const Background = styled.div`
  background: linear-gradient(rgb(35,35,35), #0c0c0c);
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
  margin: 5vh 0;
  font-size: 2.75rem;
  font-weight: 500;
  width: 90%;
  text-align: center;
  @media (max-width: 1100px) {
    font-size: 1.85rem;
  }
`;

const VideoWrapper = styled.div`
  width: 80vw;
  height: auto;
  @media (max-width: 1100px) {
    width: 95vw;
  }
`;

const Description = styled.div`
  font-family: 'Kanit', sans-serif;
  color: white;
  margin: 2vh 0 5vh;
  font-size: 1.25rem;
  font-weight: 300;
  width: 90%;
  @media (max-width: 1100px) {
    width: 95%;
    height: auto;
    text-align: center;
    /* word-break: break-all; */
    overflow-wrap: break-word;
  }
`;

const VideoDisplay = ({ collectionLink, collectionInfo }:any) => {
  const [videoResponse, setVideoResponse]:any = useState('');
  
  const navigate = useNavigate();
  let response:any = {};

  const fetchNasaMedia = async () => {
    response = await axios.get(collectionLink);
    console.log(response);
    const goodVideo = response.data.filter((item:any) => 
      item.split("").reverse().join("").split('.')[0] === "4pm"
    )
    console.log(goodVideo[0])
    setVideoResponse(goodVideo[0]);
  }
  
  useEffect(() => {
    fetchNasaMedia();
  },[])

  return (
    <Background>
      <LogoPositioner>
        <Logo />
      </LogoPositioner>
      <ReturnButton onClick={() => navigate('/results')}>RETURN</ReturnButton>
      <Title>{collectionInfo ? collectionInfo.title : ''}</Title>
      <VideoWrapper>
        <video src={videoResponse} width="100%" controls autoPlay={true} />
      </VideoWrapper>
      <Description>{collectionInfo ? collectionInfo.description: ''}</Description>      
    </Background>
  )
}

const mapStateToProps = (state:any) => {
  return { collectionLink: state.nasa.collectionLink, collectionInfo: state.nasa.collectionInfo };
};

export default connect(mapStateToProps, {})(VideoDisplay);