import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Results from './pages/Results';
import { Display } from './pages/Display';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<Results />} />
        <Route path="/display" element={<Display />} />
      </Routes>
    </Router>
  )  
}

export default App;