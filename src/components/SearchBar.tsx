import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

import { connect } from 'react-redux';
import { handleParameter } from '../actions';

import { IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';

const benTen = require('../assets/audios/benten.mp3');

const Background = styled.div`
  height: auto;
  width: 400px;
`;

const InputWrapper = styled.div`
  box-sizing: border-box;
`;

const Divider = styled.div`
  display: flex;
`;

const Input = styled.input`
  width: 95%;
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

const Play = styled.div`
  width: 10%;
  height: 100%;
`;

const PlayButton = styled(IconButton)`
  && {
    margin-top: 15%;
    color: #FC3A1B;
    transition: all .3s;
    :hover {
      color: #2170ef;
    }
  }
`;

// Searchbar has CSS taken from internet and play button with alien music

const SearchBar = ({handleParameter}:any, { query }:any) => {
  const [value, setValue] = useState('');
  const [audio] = useState(new Audio(benTen));
  const [playing, setPlaying] = useState(false)

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
  },[value])

  return (
    <Background>
      <InputWrapper>
        <Divider>
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
          <Play onClick={() => setPlaying(!playing)}>
            {/* adjust HEIGHT */}
            <PlayButton>
              {playing ? <PauseCircleIcon /> : <PlayArrowIcon />}
            </PlayButton>
          </Play>
        </Divider>        
      </InputWrapper>
    </Background>
  )
}

const mapStateToProps = (state:any) => {
  return { query: state.query };
}

export default connect(mapStateToProps, { handleParameter })(SearchBar)