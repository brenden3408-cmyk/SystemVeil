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

      {/* What's Included */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Everything You Get</h2>
            <p className="text-white/60 max-w-xl mx-auto">Every project is custom-quoted. Here's what we bring to the table.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                label: 'Starter',
                accent: 'border-white/10',
                dot: 'bg-violet-400',
                items: [
                  'Up to 3 custom pages',
                  'Mobile-responsive layout',
                  'Contact form integration',
                  'Basic on-page SEO',
                  'Fast delivery',
                ],
              },
              {
                label: 'Growth',
                accent: 'border-violet-500/30',
                dot: 'bg-violet-400',
                featured: true,
                items: [
                  'Multi-page site (up to 8)',
                  'Custom UI/UX design',
                  'Smooth animations & micro-interactions',
                  'CMS / blog integration',
                  'Advanced SEO & structured data',
                  'Performance optimization',
                  'Multiple revision rounds',
                  '30-day post-launch support',
                ],
              },
              {
                label: 'Platform',
                accent: 'border-fuchsia-500/20',
                dot: 'bg-fuchsia-400',
                items: [
                  'Unlimited pages',
                  'Full-stack development',
                  'Custom API & database design',
                  'E-commerce & payment integration',
                  'User authentication & dashboards',
                  'AI-powered features',
                  'Advanced motion & 3D effects',
                  'Analytics & tracking setup',
                  'Priority support & SLA',
                  'Ongoing maintenance retainer',
                ],
              },
            ].map((tier, i) => (
              <motion.div
                key={tier.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative rounded-2xl p-8 flex flex-col border ${
                  tier.featured
                    ? 'bg-gradient-to-b from-violet-600/20 to-surface shadow-[0_0_40px_rgba(139,92,246,0.15)]'
                    : 'bg-surface'
                } ${tier.accent}`}
              >
                {tier.featured && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-xs font-semibold px-4 py-1 rounded-full whitespace-nowrap">
                    Most Requested
                  </div>
                )}
                <h3 className="text-lg font-semibold mb-6">{tier.label}</h3>
                <ul className="space-y-3 flex-grow mb-10">
                  {tier.items.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-white/70">
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${tier.dot}`} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/quote"
                  className={`block text-center px-6 py-3 rounded-full text-sm font-medium transition-colors ${
                    tier.featured
                      ? 'bg-white text-black hover:bg-white/90'
                      : 'border border-white/10 text-white hover:bg-white/5'
                  }`}
                >
                  Get a Free Quote
                </Link>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-white/30 text-sm mt-10">
            Every project is scoped and priced individually.{' '}
            <Link to="/quote" className="text-violet-400 hover:text-violet-300 transition-colors underline underline-offset-2">
              Tell us about yours
            </Link>{' '}
            and we'll send a custom proposal within 24 hours.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <h2 className="text-3xl font-bold mb-6">Not sure what you need?</h2>
        <p className="text-white/50 mb-8 max-w-md mx-auto">Fill out a quick brief and we'll recommend the right solution for your business.</p>
        <Link
          to="/quote"
          className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full text-sm font-medium transition-transform hover:scale-105"
        >
          Get a Free Quote
        </Link>
      </section>
    </div>
  );
}
