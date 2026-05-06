import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-[#05020a] min-h-screen">
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
}

export default App;