import { useState, useEffect, FC } from 'react';
import { connect } from 'react-redux';
import { handleParameter } from '../actions';
import { useNavigate } from "react-router-dom";
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
  localmediatype: string
}

const ImageButton = styled(Button)<Props>`
  && {
    color: ${props => props.localmediatype === "image" ? 'white' : '#FC3A1B'};
    border-color: ${props => props.localmediatype === "image" ? 'white' : '#FC3A1B'};
    :hover {
      color: ${props => props.localmediatype === "image" ? 'white' : '#2170ef'};
      border-color: ${props => props.localmediatype === "image" ? 'white' : '#2170ef'};
    }
  }
`;

const VideoButton = styled(Button)<Props>`
  && {
    color: ${props => props.localmediatype === "video" ? 'white' : '#FC3A1B'};
    border-color: ${props => props.localmediatype === "video" ? 'white' : '#FC3A1B'};
    :hover {
      color: ${props => props.localmediatype === "video" ? 'white' : '#2170ef'};
      border-color: ${props => props.localmediatype === "video" ? 'white' : '#2170ef'};
    }
  }
`;

// Searchbar has CSS taken from internet and play button with alien music

const SearchBar = ({handleParameter}:any, { query }:any) => {
  const [value, setValue] = useState<string>('');
  const [audio] = useState(new Audio(benTen));
  const [playing, setPlaying] = useState(false);
  const [localMediaType, setLocalMediaType] = useState("image");

  useEffect(() => {
    playing ? audio.play() : audio.pause();
    // playing ? console.log('yes') : console.log('no');
  },[playing, audio])

  // state is managed locally and sent to redux

  const onInputChange = (event:any) => {
    setValue(event.target.value);
    // handleParameter(event.target.value);  
  }

  const navigate = useNavigate();
  const onFormSubmit = (e:any) => {
    e.preventDefault();
    handleParameter(value);
    navigate("/results");
  }  

  useEffect(() => {
    // handleParameter(value)
    console.log(value);
  },[value]);

  return (
    <Background>      
      <PlayAndSearch onClick={() => setPlaying(!playing)}>
        {/* adjust HEIGHT */}
        <PlayAndSearchButton>
          {playing ? <PauseCircleIcon /> : <PlayArrowIcon />}
        </PlayAndSearchButton>
      </PlayAndSearch>
      <ImageOrVideo>
        <ButtonGroup disableElevation={true}>
          <ImageButton localmediatype={localMediaType} onClick={() => setLocalMediaType("image")}>IMAGE</ImageButton>
          <VideoButton localmediatype={localMediaType} onClick={() => setLocalMediaType("video")}>VIDEO</VideoButton>
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
        <PlayAndSearchButton>
          <SearchIcon />
        </PlayAndSearchButton>
      </PlayAndSearch>
    </Background>
  )
}

const mapStateToProps = (state:any) => {
  return { query: state.query };
}

export default connect(mapStateToProps, { handleParameter })(SearchBar)