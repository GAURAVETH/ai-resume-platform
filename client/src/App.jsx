import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
          <Route path="/results" element={<ResultPage />} />
          {/* Catch-all route: redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
