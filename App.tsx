import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { AIStudio } from './components/AIStudio';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

function App() {
  const [currentView, setCurrentView] = useState('home');

  const handleGetStarted = () => {
    setCurrentView('tools');
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <Navbar currentView={currentView} setView={setCurrentView} />
      
      <main className="pt-16">
        {currentView === 'home' && (
          <>
            <Hero onGetStarted={handleGetStarted} />
            <Services />
            {/* Teaser of studio */}
            <div className="bg-indigo-900/20 border-y border-indigo-500/20 py-20 text-center px-4 backdrop-blur-sm">
                <h2 className="text-3xl font-bold text-white mb-4">Experience the Future of Marketing</h2>
                <p className="text-indigo-200 mb-8 max-w-2xl mx-auto">Try our AI Studio now to generate professional ad copy and visuals in seconds.</p>
                <button 
                  onClick={handleGetStarted}
                  className="bg-white text-indigo-900 px-8 py-3 rounded-full font-bold hover:bg-indigo-50 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                >
                  Open AI Studio
                </button>
            </div>
            <Contact />
          </>
        )}

        {currentView === 'services' && (
          <>
             <Services />
             <Contact />
          </>
        )}

        {currentView === 'tools' && (
          <AIStudio />
        )}

        {currentView === 'contact' && (
          <Contact />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;