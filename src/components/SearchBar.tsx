import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { handleQuery, handleMediaType } from '../actions';
import { useNavigate, useLocation } from "react-router-dom";
import styled from 'styled-components';

import { IconButton, ButtonGroup, Button } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import SearchIcon from '@mui/icons-material/Search';

const benTen = require('../assets/audios/benten.mp3');

const Background = styled.div`
  height: auto;
  width: 800px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Input = styled.input`
  width: 400px;
  height: 100%;
  background-color: black;
  position: relative;
  margin: 4px;
  border-radius: inherit;
  transition: all .3s;
  border: 1px solid black;
  color: white;
  font-size: 2rem;
  border-radius: 25px;
  padding-left: 10px;
  :focus {
    box-shadow: -3px 3px 30px #033A92, 3px -3px 30px #FC3A1B;
    outline: none !important;
    border: 1px solid black;
  }  
`;

const PlayAndSearch = styled.div`
  width: 10%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PlayAndSearchButton = styled(IconButton)`
  && {
    color: #FC3A1B;
    transition: all .3s;
    :hover {
      color: #2170ef;
    }
  }
`;

const ImageOrVideo = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface Props {
  mediatype: string
};

const ImageButton = styled(Button)<Props>`
  && {
    color: ${props => props.mediatype === "image" ? 'white' : '#FC3A1B'};
    border-color: ${props => props.mediatype === "image" ? 'white' : '#FC3A1B'};
    :hover {
      color: ${props => props.mediatype === "image" ? 'white' : '#2170ef'};
      border-color: ${props => props.mediatype === "image" ? 'white' : '#2170ef'};
    }
  }
`;

const VideoButton = styled(Button)<Props>`
  && {
    color: ${props => props.mediatype === "video" ? 'white' : '#FC3A1B'};
    border-color: ${props => props.mediatype === "video" ? 'white' : '#FC3A1B'};
    :hover {
      color: ${props => props.mediatype === "video" ? 'white' : '#2170ef'};
      border-color: ${props => props.mediatype === "video" ? 'white' : '#2170ef'};
    }
  }
`;

const SearchBar = ({ handleQuery, handleMediaType, mediaType, query }:any) => {
  const [value, setValue] = useState<string>('');
  const [audio] = useState(new Audio(benTen));
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  },[playing, audio])

  // state is managed locally then it is sent to redux on submission. Request is made by results page
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

  // useEffect(() => {
  //   console.log(mediaType);
  // },[mediaType])

  return (
    <Background>      
      <PlayAndSearch onClick={() => setPlaying(!playing)}>
        <PlayAndSearchButton>
          {playing ? <PauseCircleIcon /> : <PlayArrowIcon />}
        </PlayAndSearchButton>
      </PlayAndSearch>
      <ImageOrVideo>
        <ButtonGroup>
          <ImageButton mediatype={mediaType} onClick={onImageButtonClick}>IMAGE</ImageButton>
          <VideoButton mediatype={mediaType} onClick={onVideoButtonClick}>VIDEO</VideoButton>
        </ButtonGroup>
      </ImageOrVideo>
      <form onSubmit={onFormSubmit}>
        <Input
          id="input"
          type="text"
          placeholder="Nebula"
          value={value}
          onChange={onInputChange}
          autoComplete="off"
        />
      </form>      
      <PlayAndSearch>
        <PlayAndSearchButton onClick={onSearchButtonClick}>
          <SearchIcon />
        </PlayAndSearchButton>
      </PlayAndSearch>
    </Background>
  )
}

const mapStateToProps = (state:any) => {
  return { mediaType: state.nasa.mediaType, query: state.nasa.query };
}

export default connect(mapStateToProps, { handleQuery, handleMediaType })(SearchBar);