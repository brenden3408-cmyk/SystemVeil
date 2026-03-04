import { ArrowRight, Code2, Cpu, Globe, Layers, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] z-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-600/20 rounded-full blur-[120px] z-0" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/70 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
            Mississauga Web Design & Development
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 max-w-4xl"
          >
            Engineering <span className="text-gradient-primary">Digital</span> Experiences
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-white/60 max-w-2xl mb-10"
          >
            SystemVeil builds modern, scalable, and high-performance web applications. We transform complex requirements into elegant, user-centric solutions.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <Link
              to="/contact"
              className="group flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full text-sm font-medium transition-transform hover:scale-105 w-full sm:w-auto justify-center"
            >
              Start Your Project
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/services"
              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-6 py-3 rounded-full text-sm font-medium transition-colors w-full sm:w-auto justify-center"
            >
              Explore Services
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-surface relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Accelerate your business with a first-class web presence
            </h2>
            <p className="text-white/60 max-w-2xl">
              We don't just build websites; we engineer digital platforms designed for performance, scalability, and conversion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="md:col-span-2 bg-bg border border-white/5 rounded-2xl p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 rounded-full blur-[80px] group-hover:bg-violet-500/20 transition-colors" />
              <Globe className="w-10 h-10 text-violet-400 mb-6" />
              <h3 className="text-2xl font-semibold mb-3">Modern Web Applications</h3>
              <p className="text-white/60 max-w-md mb-8">
                Built with the latest technologies like React, Next.js, and Tailwind CSS. We deliver lightning-fast, SEO-optimized applications that engage your users.
              </p>
              <Link to="/services" className="inline-flex items-center gap-2 text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors">
                Learn more <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Feature 2 */}
            <div className="bg-bg border border-white/5 rounded-2xl p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-500/10 rounded-full blur-[60px] group-hover:bg-fuchsia-500/20 transition-colors" />
              <Zap className="w-10 h-10 text-fuchsia-400 mb-6" />
              <h3 className="text-xl font-semibold mb-3">Performance First</h3>
              <p className="text-white/60 text-sm mb-8">
                Every millisecond counts. We optimize assets, leverage edge caching, and write efficient code to ensure your site loads instantly.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-bg border border-white/5 rounded-2xl p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[60px] group-hover:bg-blue-500/20 transition-colors" />
              <ShieldCheck className="w-10 h-10 text-blue-400 mb-6" />
              <h3 className="text-xl font-semibold mb-3">Secure by Default</h3>
              <p className="text-white/60 text-sm mb-8">
                We implement industry best practices for security, protecting your data and your users from common vulnerabilities.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="md:col-span-2 bg-bg border border-white/5 rounded-2xl p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] group-hover:bg-emerald-500/20 transition-colors" />
              <Layers className="w-10 h-10 text-emerald-400 mb-6" />
              <h3 className="text-2xl font-semibold mb-3">Scalable Architecture</h3>
              <p className="text-white/60 max-w-md mb-8">
                Whether you're expecting 100 or 100,000 daily visitors, our solutions are designed to scale effortlessly with your business growth.
              </p>
              <Link to="/services" className="inline-flex items-center gap-2 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors">
                Learn more <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-24 border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-900/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Powered by an elite technology stack
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              We utilize the most robust, developer-friendly tools to build your digital products.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { name: 'React', desc: 'UI Library' },
              { name: 'TypeScript', desc: 'Type Safety' },
              { name: 'Tailwind CSS', desc: 'Styling' },
              { name: 'Node.js', desc: 'Backend' },
              { name: 'Next.js', desc: 'Framework' },
              { name: 'Vite', desc: 'Build Tool' },
              { name: 'Framer Motion', desc: 'Animations' },
              { name: 'PostgreSQL', desc: 'Database' },
            ].map((tech) => (
              <div key={tech.name} className="flex flex-col items-center p-6 rounded-xl bg-surface/50 border border-white/5 hover:bg-surface transition-colors">
                <Code2 className="w-8 h-8 text-white/40 mb-4" />
                <h4 className="font-semibold">{tech.name}</h4>
                <span className="text-xs text-white/40 font-mono mt-1">{tech.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-violet-600/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-64 bg-violet-500/20 blur-[100px]" />
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Ready to elevate your digital presence?
          </h2>
          <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
            Let's discuss how SystemVeil can engineer a solution tailored to your specific business goals.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="bg-white text-black px-8 py-4 rounded-full text-sm font-medium transition-transform hover:scale-105 w-full sm:w-auto"
            >
              Contact Us Today
            </Link>
            <a
              href="mailto:Brenden@systemveil.com"
              className="bg-white/10 hover:bg-white/20 border border-white/10 text-white px-8 py-4 rounded-full text-sm font-medium transition-colors w-full sm:w-auto"
            >
              Email Brenden
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
