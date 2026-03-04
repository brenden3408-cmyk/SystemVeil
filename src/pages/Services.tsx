import { motion } from 'motion/react';
import { LayoutTemplate, Smartphone, Zap, Search, Shield, Database } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Services() {
  const services = [
    {
      icon: LayoutTemplate,
      title: 'Custom Web Design',
      description: 'Bespoke, visually stunning interfaces tailored to your brand identity. We design with user experience (UX) and user interface (UI) best practices at the forefront.',
    },
    {
      icon: Zap,
      title: 'Frontend Development',
      description: 'Lightning-fast, responsive web applications built with React, Next.js, and modern CSS frameworks. We ensure your site feels like a native app.',
    },
    {
      icon: Smartphone,
      title: 'Responsive & Mobile First',
      description: 'Your audience is mobile. We engineer layouts that adapt flawlessly to any screen size, ensuring a perfect experience on phones, tablets, and desktops.',
    },
    {
      icon: Database,
      title: 'Full-Stack Solutions',
      description: 'Need more than just a static site? We build robust backend systems, APIs, and database architectures to power complex web applications.',
    },
    {
      icon: Search,
      title: 'SEO Optimization',
      description: 'Technical SEO built-in from day one. We optimize semantic HTML, meta tags, structured data, and performance metrics to help you rank higher.',
    },
    {
      icon: Shield,
      title: 'Security & Maintenance',
      description: 'Ongoing support, security updates, and performance monitoring to keep your digital assets safe and running at peak efficiency.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-fuchsia-600/10 blur-[120px] rounded-full z-0" />
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold tracking-tighter mb-6"
          >
            Our <span className="text-gradient-primary">Services</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/60"
          >
            Comprehensive digital solutions engineered for performance and scale.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-surface border border-white/5 p-8 rounded-2xl hover:bg-surface-hover transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <service.icon className="w-6 h-6 text-violet-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 border-t border-white/5 bg-surface/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Engineering Process</h2>
            <p className="text-white/60">How we take your project from concept to deployment.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Discovery', desc: 'Understanding your goals, audience, and technical requirements.' },
              { step: '02', title: 'Design', desc: 'Creating wireframes, UI designs, and architectural plans.' },
              { step: '03', title: 'Development', desc: 'Writing clean, scalable code using modern frameworks.' },
              { step: '04', title: 'Deployment', desc: 'Rigorous testing, optimization, and launch.' },
            ].map((phase) => (
              <div key={phase.step} className="relative">
                <div className="text-5xl font-mono font-bold text-white/5 mb-4">{phase.step}</div>
                <h4 className="text-lg font-semibold mb-2 text-violet-300">{phase.title}</h4>
                <p className="text-sm text-white/50">{phase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <h2 className="text-3xl font-bold mb-6">Need a custom solution?</h2>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full text-sm font-medium transition-transform hover:scale-105"
        >
          Let's Talk
        </Link>
      </section>
    </div>
  );
}
