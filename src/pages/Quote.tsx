import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowLeft, Calendar, CheckCircle } from 'lucide-react';

const STEPS = ['Contact', 'Project', 'Scope', 'Timeline'];

type FormData = {
  // Step 1
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  preferredContact: string;
  // Step 2
  businessDescription: string;
  goals: string[];
  otherGoal: string;
  currentWebsite: string;
  // Step 3
  pages: string[];
  customPage: string;
  features: string[];
  style: string;
  referenceWebsites: string;
  // Step 4
  budget: number;
  timeline: string;
};

const INITIAL: FormData = {
  fullName: '', businessName: '', email: '', phone: '', preferredContact: 'Email',
  businessDescription: '', goals: [], otherGoal: '', currentWebsite: '',
  pages: [], customPage: '', features: [], style: '', referenceWebsites: '',
  budget: 0, timeline: '',
};

const inputCls = "w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.05] transition-all duration-200 text-sm";
const inputErrCls = "w-full bg-white/[0.03] border border-red-500/50 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-red-500/70 focus:bg-white/[0.05] transition-all duration-200 text-sm";
const labelCls = "block text-xs font-semibold uppercase tracking-widest text-white/40 mb-2";

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="text-red-400 text-xs mt-1.5">{msg}</p>;
}

function CheckOption({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border text-sm transition-all duration-200 text-left ${
        checked
          ? 'border-violet-500/60 bg-violet-500/10 text-white'
          : 'border-white/10 bg-white/[0.02] text-white/60 hover:border-white/20 hover:text-white/80'
      }`}
    >
      <span className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 transition-colors ${checked ? 'border-violet-500 bg-violet-500' : 'border-white/20'}`}>
        {checked && <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
      </span>
      {label}
    </button>
  );
}

function RadioOption({ label, selected, onChange }: { label: string; selected: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`px-4 py-2.5 rounded-xl border text-sm transition-all duration-200 ${
        selected
          ? 'border-violet-500/60 bg-violet-500/10 text-white'
          : 'border-white/10 bg-white/[0.02] text-white/60 hover:border-white/20 hover:text-white/80'
      }`}
    >
      {label}
    </button>
  );
}

type Errors = Record<string, string>;

export default function Quote() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [direction, setDirection] = useState(1);
  const [errors, setErrors] = useState<Errors>({});

  const set = (field: keyof FormData, value: string) => {
    setForm(f => ({ ...f, [field]: value }));
    setErrors(e => { const n = { ...e }; delete n[field]; return n; });
  };

  const toggleArray = (field: 'goals' | 'pages' | 'features', value: string) => {
    setForm(f => ({
      ...f,
      [field]: f[field].includes(value)
        ? f[field].filter(v => v !== value)
        : [...f[field], value],
    }));
    setErrors(e => { const n = { ...e }; delete n[field]; return n; });
  };

  const validate = (s: number): Errors => {
    const e: Errors = {};
    if (s === 0) {
      if (!form.fullName.trim()) e.fullName = 'Full name is required.';
      if (!form.email.trim()) e.email = 'Email is required.';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email.';
    }
    if (s === 1) {
      if (!form.businessDescription.trim()) e.businessDescription = 'Please tell us about your business.';
      if (form.goals.length === 0) e.goals = 'Please select at least one goal.';
      if (form.goals.includes('Other') && !form.otherGoal.trim()) e.otherGoal = 'Please describe your other goal.';
    }
    if (s === 2) {
      if (form.pages.length === 0) e.pages = 'Please select at least one page.';
      if (form.pages.includes('Custom') && !form.customPage.trim()) e.customPage = 'Please describe the custom page.';
    }
    if (s === 3) {
      if (!form.timeline) e.timeline = 'Please select a timeline.';
    }
    return e;
  };

  const next = () => {
    const e = validate(step);
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setErrors({});
    setDirection(1);
    setStep(s => s + 1);
  };

  const prev = () => { setErrors({}); setDirection(-1); setStep(s => s - 1); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(3);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSending(true);
    setSubmitError(false);
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        setSubmitError(true);
        setSending(false);
        return;
      }
    } catch {
      setSubmitError(true);
      setSending(false);
      return;
    }
    setSending(false);
    setSubmitted(true);
  };

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -40 : 40 }),
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 pt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg w-full text-center"
        >
          <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-emerald-400" />
          </div>
          <h2 className="text-3xl font-bold mb-3">You're all set!</h2>
          <p className="text-white/60 mb-10">
            Thanks {form.fullName.split(' ')[0]}. We've received your brief and will be in touch within 24 hours. In the meantime, feel free to book a free discovery call.
          </p>
          <a
            href="https://calendly.com/brenden3408/discovery-call"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full text-sm font-semibold hover:bg-white/90 transition-colors"
          >
            <Calendar className="w-4 h-4" />
            Book Your Free Discovery Call
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 pt-24 pb-20">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-violet-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-3">
            Get a <span className="text-gradient-primary">Free Quote</span>
          </h1>
          <p className="text-white/50">Takes about 3 minutes. No commitment required.</p>
        </motion.div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {STEPS.map((label, i) => (
            <React.Fragment key={label}>
              <div className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
                  i < step ? 'bg-violet-500 text-white' :
                  i === step ? 'bg-violet-500/20 border border-violet-500/60 text-violet-300' :
                  'bg-white/5 border border-white/10 text-white/30'
                }`}>
                  {i < step ? (
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  ) : i + 1}
                </div>
                <span className={`text-xs hidden sm:block transition-colors ${i === step ? 'text-white/70' : 'text-white/30'}`}>{label}</span>
              </div>
              {i < STEPS.length - 1 && <div className={`flex-1 h-px max-w-[40px] transition-colors ${i < step ? 'bg-violet-500/60' : 'bg-white/10'}`} />}
            </React.Fragment>
          ))}
        </div>

        {/* Form card */}
        <div className="relative bg-gradient-to-b from-white/[0.04] to-transparent border border-white/10 rounded-2xl p-8 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/10 blur-[80px] rounded-full pointer-events-none" />

          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait" custom={direction}>

              {/* STEP 1 — Contact Info */}
              {step === 0 && (
                <motion.div key="step0" custom={direction} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }} className="space-y-5">
                  <h2 className="text-xl font-semibold mb-6">Let's start with your details</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Full Name <span className="text-red-400">*</span></label>
                      <input
                        type="text"
                        placeholder="Jane Smith"
                        value={form.fullName}
                        onChange={e => set('fullName', e.target.value)}
                        className={errors.fullName ? inputErrCls : inputCls}
                      />
                      <FieldError msg={errors.fullName} />
                    </div>
                    <div>
                      <label className={labelCls}>Business Name</label>
                      <input type="text" placeholder="Acme Co." value={form.businessName} onChange={e => set('businessName', e.target.value)} className={inputCls} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Email <span className="text-red-400">*</span></label>
                      <input
                        type="email"
                        placeholder="jane@acme.com"
                        value={form.email}
                        onChange={e => set('email', e.target.value)}
                        className={errors.email ? inputErrCls : inputCls}
                      />
                      <FieldError msg={errors.email} />
                    </div>
                    <div>
                      <label className={labelCls}>Phone</label>
                      <input type="tel" placeholder="(647) 000-0000" value={form.phone} onChange={e => set('phone', e.target.value)} className={inputCls} />
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>Preferred Contact Method</label>
                    <div className="flex gap-3 flex-wrap">
                      {['Email', 'Phone', 'Either'].map(opt => (
                        <RadioOption key={opt} label={opt} selected={form.preferredContact === opt} onChange={() => set('preferredContact', opt)} />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 2 — Project */}
              {step === 1 && (
                <motion.div key="step1" custom={direction} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }} className="space-y-5">
                  <h2 className="text-xl font-semibold mb-6">Tell us about your project</h2>
                  <div>
                    <label className={labelCls}>What does your business do? <span className="text-red-400">*</span></label>
                    <textarea
                      rows={3}
                      placeholder="We sell handmade candles online and at local markets..."
                      value={form.businessDescription}
                      onChange={e => set('businessDescription', e.target.value)}
                      className={`${errors.businessDescription ? inputErrCls : inputCls} resize-none`}
                    />
                    <FieldError msg={errors.businessDescription} />
                  </div>
                  <div>
                    <label className={labelCls}>Main goal of this website <span className="text-red-400">*</span></label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {['Generate leads', 'Sell products online', 'Book appointments', 'Build brand credibility', 'Share information / blog', 'Other'].map(g => (
                        <CheckOption key={g} label={g} checked={form.goals.includes(g)} onChange={() => toggleArray('goals', g)} />
                      ))}
                    </div>
                    <FieldError msg={errors.goals} />
                    {/* "Other" expansion */}
                    <AnimatePresence>
                      {form.goals.includes('Other') && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden mt-3"
                        >
                          <input
                            type="text"
                            placeholder="Tell us more about your goal..."
                            value={form.otherGoal}
                            onChange={e => set('otherGoal', e.target.value)}
                            className={errors.otherGoal ? inputErrCls : inputCls}
                          />
                          <FieldError msg={errors.otherGoal} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <div>
                    <label className={labelCls}>Current website (if any)</label>
                    <input type="text" placeholder="https://yoursite.com or 'None'" value={form.currentWebsite} onChange={e => set('currentWebsite', e.target.value)} className={inputCls} />
                  </div>
                </motion.div>
              )}

              {/* STEP 3 — Scope & Style */}
              {step === 2 && (
                <motion.div key="step2" custom={direction} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }} className="space-y-5">
                  <h2 className="text-xl font-semibold mb-6">Scope & design preferences</h2>
                  <div>
                    <label className={labelCls}>Pages you need <span className="text-red-400">*</span></label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {['Home', 'About', 'Services', 'Contact', 'Blog', 'Shop / E-commerce', 'Booking', 'Portfolio', 'Custom'].map(p => (
                        <CheckOption key={p} label={p} checked={form.pages.includes(p)} onChange={() => toggleArray('pages', p)} />
                      ))}
                    </div>
                    <FieldError msg={errors.pages} />
                    {/* "Custom" expansion */}
                    <AnimatePresence>
                      {form.pages.includes('Custom') && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden mt-3"
                        >
                          <input
                            type="text"
                            placeholder="Describe the custom page (e.g. Client portal, FAQ, Careers...)"
                            value={form.customPage}
                            onChange={e => set('customPage', e.target.value)}
                            className={errors.customPage ? inputErrCls : inputCls}
                          />
                          <FieldError msg={errors.customPage} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <div>
                    <label className={labelCls}>Special features needed</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {['Online store', 'Booking / scheduling', 'Custom contact form', 'Member / login area', 'Live chat', 'Newsletter signup'].map(f => (
                        <CheckOption key={f} label={f} checked={form.features.includes(f)} onChange={() => toggleArray('features', f)} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>Design style preference</label>
                    <div className="flex flex-wrap gap-2">
                      {['Modern & Minimal', 'Bold & Dynamic', 'Corporate & Clean', 'Creative & Artistic', 'No preference'].map(s => (
                        <RadioOption key={s} label={s} selected={form.style === s} onChange={() => set('style', s)} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>Websites you like (links or names)</label>
                    <input type="text" placeholder="stripe.com, linear.app..." value={form.referenceWebsites} onChange={e => set('referenceWebsites', e.target.value)} className={inputCls} />
                  </div>
                </motion.div>
              )}

              {/* STEP 4 — Budget & Book */}
              {step === 3 && (
                <motion.div key="step3" custom={direction} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }} className="space-y-6">
                  <h2 className="text-xl font-semibold mb-6">Budget & timeline</h2>
                  <div>
                    <label className={labelCls}>What's your investment for this project?</label>
                    <div className="mt-4 p-5 rounded-xl bg-white/[0.03] border border-white/10">
                      <div className="flex items-baseline justify-between mb-4">
                        <span className="text-3xl font-bold text-white">
                          ${form.budget.toLocaleString()}{form.budget >= 3500 ? '+' : ''}
                        </span>
                        <span className="text-white/30 text-xs font-mono uppercase tracking-widest">budget</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={3500}
                        step={100}
                        value={form.budget}
                        onChange={e => setForm(f => ({ ...f, budget: parseInt(e.target.value) }))}
                        style={{
                          background: `linear-gradient(to right, #8B5CF6 ${(form.budget / 3500) * 100}%, rgba(255,255,255,0.2) ${(form.budget / 3500) * 100}%)`
                        }}
                        className="w-full h-1.5 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-[0_0_6px_rgba(139,92,246,0.6)] [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-white/25 mt-2">
                        <span>$0</span>
                        <span>$3,500+</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>Ideal launch timeline <span className="text-red-400">*</span></label>
                    <div className="flex flex-wrap gap-2">
                      {['ASAP', '1–2 days', '3–5 days', '1–2 weeks', '2 weeks+'].map(t => (
                        <RadioOption key={t} label={t} selected={form.timeline === t} onChange={() => set('timeline', t)} />
                      ))}
                    </div>
                    <FieldError msg={errors.timeline} />
                  </div>

                  {/* Calendly CTA */}
                  <div className="mt-6 p-6 rounded-xl bg-violet-500/5 border border-violet-500/20">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0">
                        <Calendar className="w-5 h-5 text-violet-400" />
                      </div>
                      <div>
                        <p className="font-medium text-white mb-1">Prefer to talk it through?</p>
                        <p className="text-white/50 text-sm mb-3">Book a free 30-minute discovery call and we'll scope the project together.</p>
                        <a
                          href="https://calendly.com/brenden3408/discovery-call"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors"
                        >
                          Book a free call
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            {submitError && (
              <p className="text-red-400 text-sm mt-6 text-center">
                Something went wrong — please try again or <a href="mailto:brenden@systemveil.com" className="underline underline-offset-2">email us directly</a>.
              </p>
            )}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/5">
              <button
                type="button"
                onClick={prev}
                className={`flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors ${step === 0 ? 'invisible' : ''}`}
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>

              {step < STEPS.length - 1 ? (
                <button
                  type="button"
                  onClick={next}
                  className="flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-white/90 transition-colors"
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={sending}
                  className="flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-white/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {sending ? 'Sending…' : 'Submit Brief'}
                  {!sending && <ArrowRight className="w-4 h-4" />}
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Bottom Calendly link */}
        <p className="text-center text-white/30 text-xs mt-6">
          Prefer a call first?{' '}
          <a href="https://calendly.com/brenden3408/discovery-call" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:text-violet-300 underline underline-offset-2 transition-colors">
            Book a free 30-min discovery call
          </a>
        </p>
      </div>
    </div>
  );
}
