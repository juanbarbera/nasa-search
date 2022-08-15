/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { Logo } from '../components/Logo';
import { useEffect } from 'react';

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
  /* margin-top: 5vh; */
`;

const ReturnButton = styled.div`
  position: absolute;
  left: 10vw;
  top: 10vh;
  font-family: 'Cabin', sans-serif;
  font-size: 1.5rem;
  letter-spacing: 5px;
  color: rgba(100,100,100,0.3);
  cursor: pointer;
  transition: all .2s;
  :hover {
    color: white;
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
`;

const Image = styled.img`
  width: 90%;
`;

const Description = styled.div`
  font-family: 'Kanit', sans-serif;
  color: white;
  margin: 2vh 0 5vh;
  font-size: 1.25rem;
  font-weight: 300;
  width: 90%;
`;

const ImageDisplay = ({ collectionLink, collectionInfo }:any) => {
  const [imageResponse, setImageResponse]:any = useState('');
  
  const navigate = useNavigate();
  let response:any = {};

  const fetchNasaMedia = async () => {
    response = await axios.get(collectionLink);
    console.log(response.data[0]);
    setImageResponse(response.data[0]);
  }
  
  useEffect(() => {
    console.log(collectionLink, collectionInfo)
    fetchNasaMedia();
  },[collectionLink, collectionInfo])

  return (
    <Background>
      <ReturnButton onClick={() => navigate('/results')}>RETURN</ReturnButton>
      <LogoPositioner>
        <Logo />
      </LogoPositioner>
      {/* <Image src="https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001465/GSFC_20171208_Archive_e001465~orig.jpg" /> */}
      <Title>{collectionInfo ? collectionInfo.title : ''}</Title>
      <Image src={imageResponse} />
      <Description>{collectionInfo ? collectionInfo.description : ''}</Description>      
    </Background>
  )
}

const mapStateToProps = (state:any) => {
  return { collectionLink: state.nasa.collectionLink, collectionInfo: state.nasa.collectionInfo };
};

export default connect(mapStateToProps, {})(ImageDisplay);