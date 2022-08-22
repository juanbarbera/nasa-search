
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Home } from './pages/Home';
import Results from './pages/Results';
import ImageDisplay  from './pages/ImageDisplay';
import VideoDisplay from './pages/VideoDisplay';



const App = () => {
  
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<Results />} />
        <Route path="/image-display" element={<ImageDisplay />} />
        <Route path="/video-display" element={<VideoDisplay />} />
      </Routes>
    </Router>
  )  
};

export default App;