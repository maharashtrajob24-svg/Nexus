import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle2, Loader2, ArrowRight, Calendar } from 'lucide-react';

export const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    service: 'Strategy',
    preferredDate: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // ---------------------------------------------------------
    // FORMSPREE INTEGRATION
    // ---------------------------------------------------------
    const FORMSPREE_ID = "xkgerwze"; 
    // ---------------------------------------------------------

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ firstName: '', lastName: '', email: '', service: 'Strategy', preferredDate: '', message: '' });
      } else {
        const data = await response.json();
        if (Object.prototype.hasOwnProperty.call(data, 'errors')) {
            setError(data.errors.map((err: any) => err.message).join(", "));
        } else {
            setError("Oops! There was a problem submitting your form.");
        }
      }
    } catch (err) {
      setError("Network error. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contact" className="relative py-24 bg-slate-950 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-indigo-900/10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-purple-900/10 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Info Column */}
          <div>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold tracking-wider uppercase mb-6">
              Get In Touch
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Ready to <span className="gradient-text">transform</span> your digital presence?
            </h2>
            <p className="text-slate-400 mb-10 text-lg leading-relaxed">
              We accept a limited number of new clients each quarter to ensure maximum attention and results. Secure your consultation today.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-center group p-4 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer">
                <div className="flex-shrink-0 bg-indigo-500/20 p-4 rounded-xl group-hover:bg-indigo-500/30 transition-colors">
                  <MapPin className="w-6 h-6 text-indigo-400" />
                </div>
                <div className="ml-6">
                  <h3 className="text-lg font-medium text-white">Headquarters</h3>
                  <p className="text-slate-400 mt-1">100 Innovation Dr, San Francisco, CA</p>
                </div>
              </div>
              
              <div className="flex items-center group p-4 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer">
                <div className="flex-shrink-0 bg-purple-500/20 p-4 rounded-xl group-hover:bg-purple-500/30 transition-colors">
                  <Mail className="w-6 h-6 text-purple-400" />
                </div>
                <div className="ml-6">
                  <h3 className="text-lg font-medium text-white">Email Us</h3>
                  <p className="text-slate-400 mt-1">hello@nexusdigital.ai</p>
                </div>
              </div>

              <div className="flex items-center group p-4 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer">
                <div className="flex-shrink-0 bg-cyan-500/20 p-4 rounded-xl group-hover:bg-cyan-500/30 transition-colors">
                  <Phone className="w-6 h-6 text-cyan-400" />
                </div>
                <div className="ml-6">
                  <h3 className="text-lg font-medium text-white">Direct Line</h3>
                  <p className="text-slate-400 mt-1">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="glass-panel p-1 rounded-3xl shadow-2xl bg-slate-900/50">
            <div className="bg-slate-900/80 rounded-[20px] p-8 md:p-10 border border-slate-800">
              
              {submitted ? (
                <div className="h-[500px] flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500">
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Request Received!</h3>
                  <p className="text-slate-400 max-w-xs mx-auto">
                    Thank you for contacting Nexus Digital. We will review your project details and confirm your booking within 24 hours.
                  </p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="mt-8 px-6 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors"
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="text-sm font-medium text-slate-300 ml-1">First Name</label>
                      <input 
                        type="text" 
                        id="firstName" 
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-slate-950/50 border border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white outline-none transition-all placeholder:text-slate-600"
                        placeholder="Jane"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="text-sm font-medium text-slate-300 ml-1">Last Name</label>
                      <input 
                        type="text" 
                        id="lastName" 
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-slate-950/50 border border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white outline-none transition-all placeholder:text-slate-600"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-slate-300 ml-1">Email Address</label>
                    <input 
                      type="email" 
                      id="email"
                      name="replyto" // Formspree standard
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-slate-950/50 border border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white outline-none transition-all placeholder:text-slate-600"
                      placeholder="jane@company.com"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label htmlFor="service" className="text-sm font-medium text-slate-300 ml-1">Interested In</label>
                        <div className="relative">
                            <select 
                            id="service"
                            value={formData.service}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-slate-950/50 border border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white outline-none appearance-none cursor-pointer transition-all"
                            >
                            <option>Full Marketing Strategy</option>
                            <option>AI Content Generation</option>
                            <option>SEO & Analytics</option>
                            <option>Social Media Management</option>
                            <option>Custom Development</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                <ArrowRight className="w-4 h-4 rotate-90" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <label htmlFor="preferredDate" className="text-sm font-medium text-slate-300 ml-1">Target Booking Date</label>
                        <div className="relative">
                            <input 
                                type="date"
                                id="preferredDate"
                                value={formData.preferredDate}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-slate-950/50 border border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white outline-none transition-all placeholder:text-slate-600 [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                {/* Calendar icon is hidden by native date picker indicator usually, but kept for fallback/styling */}
                            </div>
                        </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-slate-300 ml-1">Project & Booking Details</label>
                    <textarea 
                      id="message" 
                      rows={3} 
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-slate-950/50 border border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white outline-none transition-all placeholder:text-slate-600 resize-none"
                      placeholder="Tell us about your goals and preferred meeting time..."
                    ></textarea>
                  </div>

                  {error && (
                    <p className="text-red-400 text-sm text-center bg-red-900/20 py-2 rounded-lg">{error}</p>
                  )}

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg shadow-indigo-900/50 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        Securing Slot...
                      </>
                    ) : (
                      <>
                        Book Consultation
                        <Send className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};