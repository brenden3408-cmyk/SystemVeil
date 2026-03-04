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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this to an API
    console.log('Form submitted:', formState);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
    setFormState({ name: '', email: '', message: '' });
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
          <div className="bg-surface border border-white/5 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
            {isSubmitted ? (
              <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-lg">
                Thank you for your message! We will get back to you shortly.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white/70 mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full bg-bg border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full bg-bg border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white/70 mb-2">Message</label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full bg-bg border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition-colors resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-white text-black font-medium py-3 rounded-lg hover:bg-white/90 transition-colors"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

        </div>
      </section>
    </div>
  );
}
