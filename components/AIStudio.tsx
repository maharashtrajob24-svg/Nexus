import React, { useState } from 'react';
import { Copy, Download, Loader2, PenTool, RefreshCw, Wand2, Image as ImageIcon, Sparkles, Maximize2 } from 'lucide-react';
import { generateMarketingCopy, generateAdImage } from '../services/geminiService';
import { ToolType } from '../types';

export const AIStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ToolType>(ToolType.COPY_WRITER);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Copy Inputs
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('Professional');
  const [platform, setPlatform] = useState('LinkedIn');

  // Image Inputs
  const [imagePrompt, setImagePrompt] = useState('');

  const handleGenerateCopy = async () => {
    if (!topic) return;
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const text = await generateMarketingCopy(topic, tone, platform);
      setResult(text);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateImage = async () => {
    if (!imagePrompt) return;
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const imageUrl = await generateAdImage(imagePrompt);
      setResult(imageUrl);
    } catch (err: any) {
      setError(err.message || "Image generation failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="tools" className="py-24 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <span className="text-indigo-400 font-mono text-sm tracking-wider uppercase">Nexus Studio v2.5</span>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold text-white mb-4">Create at the speed of thought</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Generate production-ready assets using our tuned Gemini 2.5 models.
          </p>
        </div>

        {/* Main Interface Container */}
        <div className="bg-slate-900 rounded-3xl shadow-2xl border border-slate-800 overflow-hidden flex flex-col md:flex-row min-h-[650px] ring-1 ring-white/5">
          
          {/* Sidebar / Tabs */}
          <div className="md:w-72 bg-slate-950/50 border-r border-slate-800 p-6 flex flex-col space-y-2 backdrop-blur-sm">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-4">Tools</div>
            <button
              onClick={() => { setActiveTab(ToolType.COPY_WRITER); setResult(null); setError(null); }}
              className={`flex items-center px-4 py-4 rounded-xl font-medium transition-all duration-200 ${
                activeTab === ToolType.COPY_WRITER 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <PenTool className="w-5 h-5 mr-3" />
              Smart Copywriter
            </button>
            <button
              onClick={() => { setActiveTab(ToolType.IMAGE_GENERATOR); setResult(null); setError(null); }}
              className={`flex items-center px-4 py-4 rounded-xl font-medium transition-all duration-200 ${
                activeTab === ToolType.IMAGE_GENERATOR 
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/20' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <ImageIcon className="w-5 h-5 mr-3" />
              Ad Visuals
            </button>

            <div className="mt-auto pt-8 border-t border-slate-800">
                <div className="px-4 py-3 bg-slate-900 rounded-xl border border-slate-800">
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                        <span>Credits</span>
                        <span className="text-white font-mono">Unlimited</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5">
                        <div className="bg-indigo-500 h-1.5 rounded-full w-full"></div>
                    </div>
                </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 p-8 md:p-10 bg-slate-900 relative">
            
            {/* COPYWRITER UI */}
            {activeTab === ToolType.COPY_WRITER && (
              <div className="flex flex-col h-full max-w-4xl mx-auto">
                <div className="mb-8">
                  <div className="flex items-center space-x-2 mb-6">
                      <div className="p-2 bg-indigo-500/10 rounded-lg">
                          <PenTool className="w-6 h-6 text-indigo-400" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">Campaign Architect</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-medium text-slate-400 uppercase mb-2 ml-1">What are we selling?</label>
                      <input 
                        type="text" 
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="e.g. A SaaS platform that automates tax returns..."
                        className="w-full px-5 py-4 rounded-xl bg-slate-950 border border-slate-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white outline-none transition-all placeholder:text-slate-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-400 uppercase mb-2 ml-1">Platform</label>
                      <div className="relative">
                        <select 
                            value={platform}
                            onChange={(e) => setPlatform(e.target.value)}
                            className="w-full px-5 py-4 rounded-xl bg-slate-950 border border-slate-800 focus:ring-2 focus:ring-indigo-500 text-white outline-none appearance-none"
                        >
                            <option>LinkedIn Post</option>
                            <option>Twitter Thread</option>
                            <option>Instagram Caption</option>
                            <option>Facebook Ad</option>
                            <option>Email Newsletter</option>
                            <option>Landing Page Header</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-400 uppercase mb-2 ml-1">Voice / Tone</label>
                      <select 
                        value={tone}
                        onChange={(e) => setTone(e.target.value)}
                        className="w-full px-5 py-4 rounded-xl bg-slate-950 border border-slate-800 focus:ring-2 focus:ring-indigo-500 text-white outline-none appearance-none"
                      >
                        <option>Professional & Authoritative</option>
                        <option>Witty & Relatable</option>
                        <option>Urgent & Sales-focused</option>
                        <option>Empathetic & Soft</option>
                        <option>Bold & Disruptive</option>
                      </select>
                    </div>
                  </div>
                  
                  <button 
                    onClick={handleGenerateCopy}
                    disabled={isLoading || !topic}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold hover:shadow-lg hover:shadow-indigo-600/20 transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Sparkles className="w-5 h-5 mr-2 group-hover:animate-spin" /> Generate Campaign</>}
                  </button>
                </div>

                {/* Output Area */}
                <div className="flex-1 bg-slate-950 rounded-2xl border border-slate-800 p-6 relative min-h-[200px]">
                  {error && (
                    <div className="absolute inset-0 flex items-center justify-center text-red-400 bg-slate-950/80 rounded-2xl backdrop-blur-sm z-10">
                      <p>{error}</p>
                    </div>
                  )}
                  
                  {!result && !isLoading && !error && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-700">
                      <Wand2 className="w-12 h-12 mb-4 opacity-20" />
                      <p className="text-sm font-medium">AI is ready to write.</p>
                    </div>
                  )}

                  {isLoading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-indigo-400 bg-slate-950/50 backdrop-blur-sm z-10 rounded-2xl">
                      <Loader2 className="w-10 h-10 animate-spin mb-3" />
                      <p className="animate-pulse font-medium text-sm tracking-widest uppercase">Thinking...</p>
                    </div>
                  )}

                  {result && !isLoading && (
                    <div className="h-full flex flex-col">
                      <div className="flex justify-between items-start mb-4 border-b border-slate-800 pb-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Generated Output</h4>
                        </div>
                        <button 
                          onClick={() => navigator.clipboard.writeText(result)}
                          className="text-slate-500 hover:text-indigo-400 transition-colors flex items-center text-xs font-medium" 
                          title="Copy to clipboard"
                        >
                          <Copy className="w-4 h-4 mr-1" /> Copy Text
                        </button>
                      </div>
                      <div className="prose prose-invert max-w-none flex-1 overflow-y-auto whitespace-pre-wrap text-slate-300 font-light leading-relaxed">
                        {result}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* IMAGE GENERATOR UI */}
            {activeTab === ToolType.IMAGE_GENERATOR && (
              <div className="flex flex-col h-full max-w-4xl mx-auto">
                <div className="mb-8">
                  <div className="flex items-center space-x-2 mb-6">
                      <div className="p-2 bg-purple-500/10 rounded-lg">
                          <ImageIcon className="w-6 h-6 text-purple-400" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">Visual Engine</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-400 uppercase mb-2 ml-1">Image Description</label>
                      <div className="flex gap-3">
                        <input 
                          type="text" 
                          value={imagePrompt}
                          onChange={(e) => setImagePrompt(e.target.value)}
                          placeholder="Cinematic shot of a futuristic sneaker floating in neon mist..."
                          className="flex-1 px-5 py-4 rounded-xl bg-slate-950 border border-slate-800 focus:ring-2 focus:ring-purple-500 text-white outline-none transition-all"
                        />
                        <button 
                          onClick={handleGenerateImage}
                          disabled={isLoading || !imagePrompt}
                          className="px-8 py-4 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-500 transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-900/30"
                        >
                          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Render"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Image Output Area */}
                <div className="flex-1 bg-slate-950 rounded-2xl border border-slate-800 p-2 flex items-center justify-center relative overflow-hidden min-h-[400px]">
                   
                   {/* Grid Background for Transparency/Empty State */}
                   <div className="absolute inset-0 grid-pattern opacity-10"></div>

                   {error && (
                    <div className="relative z-10 text-red-400 bg-slate-900/90 px-6 py-4 rounded-xl border border-red-900/50">
                      <p>{error}</p>
                    </div>
                  )}
                  
                  {!result && !isLoading && !error && (
                    <div className="relative z-10 text-slate-700 flex flex-col items-center justify-center text-center">
                      <ImageIcon className="w-16 h-16 mb-4 opacity-20" />
                      <p className="text-lg font-medium text-slate-500">Canvas Empty</p>
                      <p className="text-sm text-slate-600 mt-1">Describe an image to begin generation</p>
                    </div>
                  )}

                  {isLoading && (
                    <div className="relative z-10 flex flex-col items-center justify-center text-purple-400">
                      <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mb-4"></div>
                      <p className="animate-pulse font-medium tracking-widest uppercase text-sm">Diffusion Process Active...</p>
                    </div>
                  )}

                  {result && !isLoading && (
                    <div className="relative w-full h-full group">
                      <img 
                        src={result} 
                        alt="Generated Ad" 
                        className="w-full h-full object-contain rounded-xl shadow-2xl"
                      />
                      <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm">
                         <a 
                           href={result} 
                           download="nexus-generated-ad.jpg"
                           className="p-4 bg-white rounded-full text-slate-900 hover:scale-110 transition-transform shadow-xl"
                           title="Download High-Res"
                         >
                           <Download className="w-6 h-6" />
                         </a>
                         <button 
                           onClick={() => window.open(result, '_blank')}
                           className="p-4 bg-white rounded-full text-slate-900 hover:scale-110 transition-transform shadow-xl"
                           title="View Fullscreen"
                         >
                           <Maximize2 className="w-6 h-6" />
                         </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};