import React from 'react';
import { ArrowRight, Sparkles, PlayCircle } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  return (
    <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden min-h-screen flex items-center">
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-slate-950 z-0">
        <div className="absolute inset-0 grid-pattern opacity-30"></div>
        {/* Glowing Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/30 rounded-full mix-blend-screen filter blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/30 rounded-full mix-blend-screen filter blur-3xl animate-float animation-delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 text-indigo-400 text-sm font-medium mb-8 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Sparkles className="w-4 h-4 mr-2 text-yellow-400" />
            <span className="text-slate-200 mr-2">New:</span> Gemini 2.5 Integration Live
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-white mb-8 leading-[1.1] animate-in fade-in slide-in-from-bottom-6 duration-1000">
            Scale Your Brand <br/>
            with <span className="gradient-text">Intelligence</span>.
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-400 mb-12 leading-relaxed max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
            The first digital agency powered by autonomous agents. We generate strategies, copy, and visuals 10x faster than human-only teams.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-5 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            <button
              onClick={onGetStarted}
              className="group px-8 py-4 bg-white text-slate-950 rounded-full font-bold text-lg shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.5)] hover:scale-105 transition-all duration-300 flex items-center justify-center"
            >
              Start Creating
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-slate-800/50 text-white border border-slate-700 rounded-full font-bold text-lg hover:bg-slate-800 hover:border-slate-500 transition-all duration-300 backdrop-blur-sm flex items-center justify-center">
              <PlayCircle className="mr-2 w-5 h-5 text-indigo-400" />
              Watch Demo
            </button>
          </div>

          {/* Social Proof */}
          <div className="mt-20 pt-10 border-t border-slate-800/50 animate-in fade-in duration-1000 delay-500">
             <p className="text-sm text-slate-500 mb-6 font-medium uppercase tracking-widest">Trusted by innovative teams at</p>
             <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale">
                <span className="text-2xl font-bold text-white">Acme<span className="font-light">AI</span></span>
                <span className="text-2xl font-bold text-white">Poly<span className="text-indigo-400">math</span></span>
                <span className="text-2xl font-bold text-white tracking-tighter">VORTEX</span>
                <span className="text-2xl font-bold text-white italic">Lumina</span>
                <span className="text-2xl font-bold text-white font-serif">Onyx</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};