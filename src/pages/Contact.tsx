import { motion } from 'motion/react';
import { Mail, MapPin, Phone } from 'lucide-react';
import React, { useState } from 'react';

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || 'Something went wrong. Please try again.');
        return;
      }
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 5000);
      setFormState({ name: '', email: '', message: '' });
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <section className="pt-24 pb-8 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full z-0" />
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold tracking-tighter mb-4"
          >
            Get in <span className="text-gradient-primary">Touch</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/60"
          >
            Ready to start your next project? We'd love to hear from you.
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-24 relative z-10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Contact Information</h2>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-surface border border-white/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-violet-400" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white/50 mb-1">Email Us</h4>
                  <a href="mailto:Brenden@systemveil.com" className="text-lg font-medium hover:text-violet-400 transition-colors">
                    Brenden@systemveil.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-surface border border-white/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-violet-400" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white/50 mb-1">Call Us</h4>
                  <a href="tel:647-563-4664" className="text-lg font-medium hover:text-violet-400 transition-colors">
                    647-563-4664
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-surface border border-white/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-violet-400" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white/50 mb-1">Location</h4>
                  <p className="text-lg font-medium">
                    Mississauga, Ontario<br />
                    Canada
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="relative bg-gradient-to-b from-white/[0.04] to-transparent border border-white/10 p-8 rounded-2xl overflow-hidden">
            {/* Subtle glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/10 blur-[80px] rounded-full pointer-events-none" />

            <h3 className="text-2xl font-bold mb-2 relative z-10">Send a Message</h3>
            <p className="text-white/40 text-sm mb-8 relative z-10">We'll get back to you within 24 hours.</p>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 gap-4 text-center"
              >
                <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                  <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-emerald-400 font-medium">Message sent!</p>
                <p className="text-white/50 text-sm">We'll be in touch shortly.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                <div className="group">
                  <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-widest text-white/40 mb-2 group-focus-within:text-violet-400 transition-colors">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-violet-500/60 focus:bg-white/[0.05] transition-all duration-200"
                    placeholder="John Doe"
                  />
                </div>
                <div className="group">
                  <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-widest text-white/40 mb-2 group-focus-within:text-violet-400 transition-colors">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-violet-500/60 focus:bg-white/[0.05] transition-all duration-200"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="group">
                  <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-widest text-white/40 mb-2 group-focus-within:text-violet-400 transition-colors">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-violet-500/60 focus:bg-white/[0.05] transition-all duration-200 resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>
                {error && (
                  <p className="text-red-400 text-sm">{error}</p>
                )}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="relative w-full overflow-hidden bg-white text-black font-semibold py-3.5 rounded-xl hover:bg-white/90 transition-colors group disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isLoading ? 'Sending...' : 'Send Message'}
                    {!isLoading && (
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    )}
                  </span>
                </button>
              </form>
            )}
          </div>

        </div>
      </section>
    </div>
  );
}
