import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import Analyzer from './components/Analyzer';
import ResultPage from './components/ResultPage';


function App() {
  return (
    <Router>
      <div className="bg-[#05020a] min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/analyze" element={<Analyzer />} />
          <Route path="*" element={<div className="text-white text-center mt-20">404 - Page not found</div>} />
          <Route path="/results" element={<ResultPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;