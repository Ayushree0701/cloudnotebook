import './App.css';
import {
  BrowserRouter as Router,
  Routes, // Replaces Switch
  Route // Unchanged
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} /> {/* Use 'element' prop */}
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
