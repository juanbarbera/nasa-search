import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { handleQuery, handleMediaType } from '../actions';
import { useNavigate, useLocation } from "react-router-dom";
import styled from 'styled-components';

import { IconButton, ButtonGroup, Button } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import SearchIcon from '@mui/icons-material/Search';

const iFeelSpace = require('../assets/audios/i-feel-space.mov');

const Background = styled.div`
  width: 800px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 1100px) {
    height: 25vh;
    width: 100vw;
    flex-direction: column;
    justify-content: center;
    align-items: space-around;
  }
`;

const Input = styled.input`
  width: 400px;
  height: 100%;
  background-color: black;
  position: relative;
  margin: 4px;
  border-radius: inherit;
  transition: all .35s ease;
  border: 1px solid black;
  color: white;
  font-size: 2rem;
  border-radius: 25px;
  padding-left: 10px;
  :focus {
    box-shadow: 0px 3px 35px #033A92, 0px -3px 35px #FC3A1B;
    outline: none !important;
    border: 1px solid black;
  } 
  @media (max-width: 1100px) {
    width: 90%;
    margin-left: 5vw;
  } 
`;

// const PlayAndSearch = styled.div`
//   width: 10%;
//   height: 100%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

const PlayWrapper = styled.div`
  width: 10%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PlayButton = styled(IconButton)`
  && {
    margin-bottom: 1vh;
    color: #FC3A1B;
    transition: all .3s;
    @media (min-width: 1100px) {
      margin-bottom: 0;
      :hover {
        color: #2170ef;
      }
    }
  }
`;

const SearchWrapper = styled.div`
  /* width: 10%; */
  /* height: 100%; */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchButton = styled(IconButton)`
  && {
    color: #FC3A1B;
    transition: all .3s;
    margin-left: 1vw;
    @media (min-width: 1100px) {
      :hover {
        color: #2170ef;
      }
    }
  }
`;

const Form = styled.form``;

const CustomSearchIcon = styled(SearchIcon)`
  @media (max-width: 1100px) {
    /* margin-top: 3vh; */
  }
`;

const ImageOrVideo = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 1100px) {
  }
`;

interface Props {
  mediatype: string
};

const ImageButton = styled(Button)<Props>`
  && {
    color: ${props => props.mediatype === "image" ? 'white' : '#FC3A1B'};
    border-color: ${props => props.mediatype === "image" ? 'white' : '#FC3A1B'};
    @media (min-width: 1100px) {
      :hover {
        color: ${props => props.mediatype === "image" ? 'white' : '#2170ef'};
        border-color: ${props => props.mediatype === "image" ? 'white' : '#2170ef'};
      }
    }
  }
`;

const VideoButton = styled(Button)<Props>`
  && {
    color: ${props => props.mediatype === "video" ? 'white' : '#FC3A1B'};
    border-color: ${props => props.mediatype === "video" ? 'white' : '#FC3A1B'};
    @media (min-width: 1100px) {
      :hover {
        color: ${props => props.mediatype === "video" ? 'white' : '#2170ef'};
        border-color: ${props => props.mediatype === "video" ? 'white' : '#2170ef'};
      }      
    }
  }
`;

const SearchBar = ({ handleQuery, handleMediaType, mediaType }:any) => {
  const [value, setValue] = useState<string>('');
  const [audio] = useState(new Audio(iFeelSpace));
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  },[playing, audio])

  const onInputChange = (event:any) => {
    setValue(event.target.value); 
  }

  const navigate = useNavigate();
  const location = useLocation();

  const onFormSubmit = (e:any) => {
    e.preventDefault();
    handleQuery(value);
    navigate("/results");
  };
  const onSearchButtonClick = () => {
    handleQuery(value);
    if (location.pathname !== '/results') {
      navigate("/results");
    }    
  };

  const onImageButtonClick = () => {
    handleMediaType("image");
  }
  const onVideoButtonClick = () => {
    handleMediaType("video");
  }

  return (
    <Background>      
      <PlayWrapper onClick={() => setPlaying(!playing)}>
        <PlayButton>
          {playing ? <PauseCircleIcon /> : <PlayArrowIcon />}
        </PlayButton>
      </PlayWrapper>
      <ImageOrVideo>
        <ButtonGroup>
          <ImageButton mediatype={mediaType} onClick={onImageButtonClick}>IMAGE</ImageButton>
          <VideoButton mediatype={mediaType} onClick={onVideoButtonClick}>VIDEO</VideoButton>
        </ButtonGroup>
      </ImageOrVideo>
      <SearchWrapper>
        <Form onSubmit={onFormSubmit}>
          <Input
            id="input"
            type="text"
            placeholder="supernova"
            value={value}
            onChange={onInputChange}
            autoComplete="off"
          />
        </Form>
        <SearchButton onClick={onSearchButtonClick}>
          <CustomSearchIcon />
        </SearchButton>
      </SearchWrapper>
    </Background>
  )
}

const mapStateToProps = (state:any) => {
  return { mediaType: state.nasa.mediaType, query: state.nasa.query };
}

export default connect(mapStateToProps, { handleQuery, handleMediaType })(SearchBar);