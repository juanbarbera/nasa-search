import styled from 'styled-components';

export const ReturnButton = styled.div`
  position: absolute;
  left: 20vw;
  top: 10vh;
  font-family: 'Cabin', sans-serif;
  font-size: 1.15rem;
  color: #c0c0c04c;
  cursor: pointer;
  @media (min-width: 1100px) {
    :hover {
      color: white;
    }
  }
  @media (max-width: 1100px) {
    position: static;
    top: 20vh;
    left: 0;
    width: 100%;
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #eaeaea4b;
  }
`;