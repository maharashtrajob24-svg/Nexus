import React from 'react';
import { BarChart3, PenTool, Share2, Target, Zap, Image as ImageIcon, ArrowUpRight } from 'lucide-react';

const services = [
  {
    title: "AI Copywriting",
    description: "Generate high-converting ad copy, blog posts, and emails instantly.",
    icon: <PenTool className="w-6 h-6 text-pink-300" />,
    gradient: "from-pink-500/20 to-rose-500/5",
    border: "group-hover:border-pink-500/50"
  },
  {
    title: "Generative Visuals",
    description: "Create unique, brand-aligned imagery for ads without a photoshoot.",
    icon: <ImageIcon className="w-6 h-6 text-purple-300" />,
    gradient: "from-purple-500/20 to-indigo-500/5",
    border: "group-hover:border-purple-500/50"
  },
  {
    title: "Predictive Analytics",
    description: "Real-time insights into campaign performance powered by data.",
    icon: <BarChart3 className="w-6 h-6 text-indigo-300" />,
    gradient: "from-indigo-500/20 to-blue-500/5",
    border: "group-hover:border-indigo-500/50"
  },
  {
    title: "Social Strategy",
    description: "Automated scheduling and trend analysis to keep ahead.",
    icon: <Share2 className="w-6 h-6 text-blue-300" />,
    gradient: "from-blue-500/20 to-cyan-500/5",
    border: "group-hover:border-blue-500/50"
  },
  {
    title: "SEO Optimization",
    description: "Deep learning algorithms that analyze search intent.",
    icon: <Target className="w-6 h-6 text-teal-300" />,
    gradient: "from-teal-500/20 to-emerald-500/5",
    border: "group-hover:border-teal-500/50"
  },
  {
    title: "Workflow Auto",
    description: "Streamline your workflow with intelligent automation.",
    icon: <Zap className="w-6 h-6 text-orange-300" />,
    gradient: "from-orange-500/20 to-amber-500/5",
    border: "group-hover:border-orange-500/50"
  }
];

export const Services: React.FC = () => {
  return (
    <div id="services" className="py-32 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20">
          <div className="max-w-2xl">
            <h2 className="text-indigo-500 font-mono text-sm tracking-wider uppercase mb-4">Our Expertise</h2>
            <p className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Comprehensive digital solutions,<br />
              <span className="text-slate-500">powered by next-gen AI.</span>
            </p>
          </div>
          <div className="mt-8 md:mt-0">
             <button className="text-white border-b border-indigo-500 pb-1 hover:text-indigo-400 transition-colors flex items-center">
                View all capabilities <ArrowUpRight className="ml-2 w-4 h-4" />
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div 
                key={index} 
                className={`group relative bg-slate-900/50 rounded-3xl p-8 border border-slate-800 hover:bg-slate-900 transition-all duration-500 hover:-translate-y-1 overflow-hidden ${service.border}`}
            >
              {/* Hover Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        {service.icon}
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-slate-600 group-hover:text-white transition-colors" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                    {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};