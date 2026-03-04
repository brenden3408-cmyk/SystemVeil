import { motion } from 'motion/react';
import { Code, Cpu, Globe2, Users } from 'lucide-react';

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-violet-500/10 blur-[100px] z-0" />
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold tracking-tighter mb-6"
          >
            About <span className="text-gradient-primary">SystemVeil</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/60"
          >
            We are a Mississauga-based web design and development agency dedicated to engineering high-performance digital experiences.
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Philosophy</h2>
            <div className="space-y-4 text-white/70 leading-relaxed">
              <p>
                At SystemVeil, we believe that a website is more than just a digital brochure; it's the core engine of your online business. Our approach combines cutting-edge technology with intuitive design to create platforms that not only look exceptional but perform flawlessly.
              </p>
              <p>
                Founded in Mississauga, Ontario, we partner with businesses locally and globally to transform their digital presence. We don't use cookie-cutter templates. Every project is engineered from the ground up to meet your specific requirements and goals.
              </p>
              <p>
                We focus on the metrics that matter: load times, accessibility, SEO performance, and conversion rates. By leveraging modern frameworks like React and Next.js, we ensure your site is built for the future.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: Code, title: 'Clean Code', desc: 'Maintainable, scalable, and efficient architecture.' },
              { icon: Globe2, title: 'Global Reach', desc: 'Optimized for users anywhere, on any device.' },
              { icon: Cpu, title: 'Modern Tech', desc: 'Built with the latest industry-standard tools.' },
              { icon: Users, title: 'User Centric', desc: 'Designed for accessibility and engagement.' },
            ].map((item, i) => (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-surface border border-white/5 p-6 rounded-2xl"
              >
                <item.icon className="w-8 h-8 text-violet-400 mb-4" />
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-white/50">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team / Contact CTA */}
      <section className="py-24 border-t border-white/5 bg-surface/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Led by Expertise</h2>
          <p className="text-white/60 mb-10 max-w-2xl mx-auto">
            SystemVeil is driven by a passion for technology and design. We work closely with our clients to ensure every detail aligns with their vision.
          </p>
          <div className="inline-flex flex-col items-center p-8 bg-bg border border-white/10 rounded-2xl">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center mb-4">
              <span className="text-xl font-bold">B</span>
            </div>
            <h3 className="text-xl font-semibold">Brenden</h3>
            <p className="text-violet-400 text-sm font-mono mb-4">Founder & Lead Engineer</p>
            <a href="mailto:Brenden@systemveil.com" className="text-white/60 hover:text-white transition-colors">
              Brenden@systemveil.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
