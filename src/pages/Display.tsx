import styled from 'styled-components';
import { Logo } from '../components/Logo';

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
  margin-top: 5vh;
`;

const ReturnButton = styled.div`
  position: absolute;
  left: 10vw;
  top: 15vh;
  font-family: 'Cabin', sans-serif;
  font-size: 2rem;
  letter-spacing: 5px;
  color: rgba(100,100,100,0.3);
  cursor: pointer;
  transition: all .7s;
  :hover {
    color: white;
  }
`;

const Title = styled.div`
  font-family: 'Kanit', sans-serif;
  color: white;
  margin: 10vh 0 5vh;
  font-size: 2.25rem;
  font-weight: 500;
`;

const Image = styled.img`
  width: 90%;
`;


const Description = styled.div`
  font-family: 'Kanit', sans-serif;
  color: white;
  margin: 5vh 0;
  font-size: 1.25rem;
  font-weight: 300;
  width: 80%;
`;

export const Display = () => {
  return (
    <Background>
      <ReturnButton>RETURN</ReturnButton>
      <LogoPositioner>
        <Logo />
      </LogoPositioner>
      <Title>Planetary Nebula</Title>
      {/* <Image src="https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001465/GSFC_20171208_Archive_e001465~orig.jpg" /> */}
      <Image src="https://images-assets.nasa.gov/image/PIA14417/PIA14417~orig.jpg" />
      <Description>
        This planetary nebula's simple, graceful appearance is thought to be due to perspective: our view from Earth looking straight into what is actually a barrel-shaped cloud of gas shrugged off by a dying central star. Hot blue gas near the energizing central star gives way to progressively cooler green and yellow gas at greater distances with the coolest red gas along the outer boundary. Credit: NASA/Hubble Heritage Team ---- The Ring Nebula's distinctive shape makes it a popular illustration for astronomy books. But new observations by NASA's Hubble Space Telescope of the glowing gas shroud around an old, dying, sun-like star reveal a new twist. &quot;The nebula is not like a bagel, but rather, it's like a jelly doughnut, because it's filled with material in the middle,&quot; said C. Robert O'Dell of Vanderbilt University in Nashville, Tenn. He leads a research team that used Hubble and several ground-based telescopes to obtain the best view yet of the iconic nebula. The images show a more complex structure than astronomers once thought and have allowed them to construct the most precise 3-D model of the nebula. &quot;With Hubble's detail, we see a completely different shape than what's been thought about historically for this classic nebula,&quot; O'Dell said. &quot;The new Hubble observations show the nebula in much clearer detail, and we see things are not as simple as we previously thought.&quot; The Ring Nebula is about 2,000 light-years from Earth and measures roughly 1 light-year across. Located in the constellation Lyra, the nebula is a popular target for amateur astronomers. Read more: <a href="http://1.usa.gov/14VAOMk" rel="nofollow">1.usa.gov/14VAOMk</a> <b><a href="http://www.nasa.gov/audience/formedia/features/MP_Photo_Guidelines.html" rel="nofollow">NASA image use policy.</a></b> <b><a href="http://www.nasa.gov/centers/goddard/home/index.html" rel="nofollow">NASA Goddard Space Flight Center</a></b> enables NASA’s mission through four scientific endeavors: Earth Science, Heliophysics, Solar System Exploration, and Astrophysics. Goddard plays a leading role in NASA’s accomplishments by contributing compelling scientific knowledge to advance the Agency’s mission. <b>Follow us on <a href="http://twitter.com/NASAGoddardPix" rel="nofollow">Twitter</a></b> <b>Like us on <a href="http://www.facebook.com/pages/Greenbelt-MD/NASA-Goddard/395013845897?ref=tsd" rel="nofollow">Facebook</a></b> <b>Find us on <a href="http://instagram.com/nasagoddard?vm=grid" rel="nofollow">Instagram</a></b>
      </Description>
    </Background>
  )
}