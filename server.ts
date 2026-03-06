import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { Resend } from 'resend';
import * as dotenv from 'dotenv';
import { z } from 'zod';
dotenv.config();

const app = express();

// Security headers with explicit Content Security Policy
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://calendly.com"],
      frameSrc: ["https://calendly.com"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
    },
  },
}));

// CORS — restrict to your app's origin
const allowedOrigins = [
  'https://systemveil.com',
  'https://www.systemveil.com',
  process.env.APP_URL,
  'http://localhost:3000',
  'http://localhost:5173',
].filter(Boolean) as string[];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
}));

app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);

// Escape HTML special chars to prevent injection in email body
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

// Global rate limiter — applies to all /api/* routes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many requests. Please try again later.' },
});

app.use('/api', limiter);

// Stricter limiter for form submission endpoints
const submitLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many requests. Please try again later.' },
});

// Quote form schema — budget max matches the slider cap ($3,500)
const quoteSchema = z.object({
  fullName: z.string().min(1).max(100),
  businessName: z.string().max(100).optional().default(''),
  email: z.email().max(200),
  phone: z.string().max(30).optional().default(''),
  preferredContact: z.enum(['Email', 'Phone', 'Either']).optional().default('Email'),
  businessDescription: z.string().max(2000).optional().default(''),
  goals: z.array(z.string().max(100)).optional().default([]),
  otherGoal: z.string().max(500).optional().default(''),
  currentWebsite: z.string().max(200).optional().default(''),
  pages: z.array(z.string().max(100)).optional().default([]),
  customPage: z.string().max(500).optional().default(''),
  features: z.array(z.string().max(100)).optional().default([]),
  style: z.string().max(100).optional().default(''),
  referenceWebsites: z.string().max(500).optional().default(''),
  budget: z.number().min(0).max(3500).optional().default(0),
  timeline: z.string().max(50).optional().default(''),
});

// Contact form schema
const contactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.email().max(200),
  message: z.string().min(1).max(3000),
});

app.post('/api/quote', submitLimiter, async (req, res) => {
  const parsed = quoteSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ success: false, error: 'Invalid form data.' });
    return;
  }

  const f = parsed.data;

  const name = escapeHtml(f.fullName);
  const business = escapeHtml(f.businessName);
  const email = escapeHtml(f.email);
  const phone = escapeHtml(f.phone);
  const preferredContact = escapeHtml(f.preferredContact);
  const businessDescription = escapeHtml(f.businessDescription);
  const goals = f.goals.map(escapeHtml).join(', ') || '—';
  const otherGoal = escapeHtml(f.otherGoal);
  const currentWebsite = escapeHtml(f.currentWebsite);
  const pages = f.pages.map(escapeHtml).join(', ') || '—';
  const features = f.features.map(escapeHtml).join(', ') || '—';
  const style = escapeHtml(f.style);
  const referenceWebsites = escapeHtml(f.referenceWebsites);
  const timeline = escapeHtml(f.timeline);

  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a2e;">
      <div style="background: linear-gradient(135deg, #8B5CF6, #D946EF); padding: 32px; border-radius: 12px 12px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 24px;">New Quote Request</h1>
        <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0;">Received via systemveil.com</p>
      </div>
      <div style="background: #f9f9fb; padding: 32px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb;">

        <h2 style="font-size: 16px; color: #6d28d9; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 0;">Contact</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 6px 0; color: #6b7280; width: 40%;">Name</td><td style="padding: 6px 0; font-weight: 600;">${name || '—'}</td></tr>
          <tr><td style="padding: 6px 0; color: #6b7280;">Business</td><td style="padding: 6px 0; font-weight: 600;">${business || '—'}</td></tr>
          <tr><td style="padding: 6px 0; color: #6b7280;">Email</td><td style="padding: 6px 0; font-weight: 600;"><a href="mailto:${email}" style="color: #6d28d9;">${email || '—'}</a></td></tr>
          <tr><td style="padding: 6px 0; color: #6b7280;">Phone</td><td style="padding: 6px 0; font-weight: 600;">${phone || '—'}</td></tr>
          <tr><td style="padding: 6px 0; color: #6b7280;">Preferred Contact</td><td style="padding: 6px 0; font-weight: 600;">${preferredContact || '—'}</td></tr>
        </table>

        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />

        <h2 style="font-size: 16px; color: #6d28d9; text-transform: uppercase; letter-spacing: 0.05em;">Project</h2>
        <p style="color: #374151; margin: 0 0 12px;"><strong>About the business:</strong><br>${businessDescription || '—'}</p>
        <p style="color: #374151; margin: 0 0 12px;"><strong>Goals:</strong> ${goals}${otherGoal ? ` (Other: ${otherGoal})` : ''}</p>
        <p style="color: #374151; margin: 0;"><strong>Current website:</strong> ${currentWebsite || 'None'}</p>

        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />

        <h2 style="font-size: 16px; color: #6d28d9; text-transform: uppercase; letter-spacing: 0.05em;">Scope &amp; Design</h2>
        <p style="color: #374151; margin: 0 0 12px;"><strong>Pages needed:</strong> ${pages}</p>
        <p style="color: #374151; margin: 0 0 12px;"><strong>Features:</strong> ${features}</p>
        <p style="color: #374151; margin: 0 0 12px;"><strong>Design style:</strong> ${style || '—'}</p>
        <p style="color: #374151; margin: 0;"><strong>Reference sites:</strong> ${referenceWebsites || '—'}</p>

        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />

        <h2 style="font-size: 16px; color: #6d28d9; text-transform: uppercase; letter-spacing: 0.05em;">Budget &amp; Timeline</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 6px 0; color: #6b7280; width: 40%;">Budget</td><td style="padding: 6px 0; font-weight: 600;">$${f.budget.toLocaleString()}${f.budget >= 3500 ? '+' : ''}</td></tr>
          <tr><td style="padding: 6px 0; color: #6b7280;">Timeline</td><td style="padding: 6px 0; font-weight: 600;">${timeline || '—'}</td></tr>
        </table>

        <div style="margin-top: 32px; padding: 16px; background: #ede9fe; border-radius: 8px; border-left: 4px solid #7c3aed;">
          <p style="margin: 0; font-size: 14px; color: #5b21b6;">Reply directly to this email to reach <strong>${name || 'the client'}</strong> at <a href="mailto:${email}" style="color: #6d28d9;">${email}</a></p>
        </div>
      </div>
    </div>
  `;

  const confirmationHtml = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a2e;">
      <div style="background: linear-gradient(135deg, #8B5CF6, #D946EF); padding: 32px; border-radius: 12px 12px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 24px;">We received your quote request!</h1>
        <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0;">Thanks for reaching out — we'll be in touch soon.</p>
      </div>
      <div style="background: #f9f9fb; padding: 32px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb;">

        <p style="color: #374151; margin: 0 0 24px;">Hi ${name}, here's a summary of what you submitted:</p>

        <h2 style="font-size: 16px; color: #6d28d9; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 0;">Your Info</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 6px 0; color: #6b7280; width: 40%;">Name</td><td style="padding: 6px 0; font-weight: 600;">${name}</td></tr>
          ${business ? `<tr><td style="padding: 6px 0; color: #6b7280;">Business</td><td style="padding: 6px 0; font-weight: 600;">${business}</td></tr>` : ''}
          <tr><td style="padding: 6px 0; color: #6b7280;">Email</td><td style="padding: 6px 0; font-weight: 600;">${email}</td></tr>
          ${phone ? `<tr><td style="padding: 6px 0; color: #6b7280;">Phone</td><td style="padding: 6px 0; font-weight: 600;">${phone}</td></tr>` : ''}
          <tr><td style="padding: 6px 0; color: #6b7280;">Preferred Contact</td><td style="padding: 6px 0; font-weight: 600;">${preferredContact}</td></tr>
        </table>

        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />

        <h2 style="font-size: 16px; color: #6d28d9; text-transform: uppercase; letter-spacing: 0.05em;">Project Details</h2>
        ${businessDescription ? `<p style="color: #374151; margin: 0 0 12px;"><strong>About your business:</strong><br>${businessDescription}</p>` : ''}
        <p style="color: #374151; margin: 0 0 12px;"><strong>Goals:</strong> ${goals}${otherGoal ? ` (Other: ${otherGoal})` : ''}</p>
        ${currentWebsite ? `<p style="color: #374151; margin: 0;"><strong>Current website:</strong> ${currentWebsite}</p>` : ''}

        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />

        <h2 style="font-size: 16px; color: #6d28d9; text-transform: uppercase; letter-spacing: 0.05em;">Scope &amp; Design</h2>
        <p style="color: #374151; margin: 0 0 12px;"><strong>Pages needed:</strong> ${pages}</p>
        <p style="color: #374151; margin: 0 0 12px;"><strong>Features:</strong> ${features}</p>
        ${style ? `<p style="color: #374151; margin: 0 0 12px;"><strong>Design style:</strong> ${style}</p>` : ''}
        ${referenceWebsites ? `<p style="color: #374151; margin: 0;"><strong>Reference sites:</strong> ${referenceWebsites}</p>` : ''}

        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />

        <h2 style="font-size: 16px; color: #6d28d9; text-transform: uppercase; letter-spacing: 0.05em;">Budget &amp; Timeline</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 6px 0; color: #6b7280; width: 40%;">Budget</td><td style="padding: 6px 0; font-weight: 600;">$${f.budget.toLocaleString()}${f.budget >= 3500 ? '+' : ''}</td></tr>
          <tr><td style="padding: 6px 0; color: #6b7280;">Timeline</td><td style="padding: 6px 0; font-weight: 600;">${timeline || '—'}</td></tr>
        </table>

        <div style="margin-top: 32px; padding: 16px; background: #ede9fe; border-radius: 8px; border-left: 4px solid #7c3aed;">
          <p style="margin: 0; font-size: 14px; color: #5b21b6;">We'll review your request and get back to you shortly. If you have any questions in the meantime, reply to this email.</p>
        </div>
      </div>
    </div>
  `;

  const recipientEmail = process.env.QUOTE_RECIPIENT_EMAIL;
  if (!recipientEmail) {
    console.error('QUOTE_RECIPIENT_EMAIL is not set');
    res.status(500).json({ success: false, error: 'Server misconfiguration.' });
    return;
  }

  try {
    await Promise.all([
      resend.emails.send({
        from: 'SystemVeil Quotes <noreply@systemveil.com>',
        to: recipientEmail,
        replyTo: f.email,
        subject: `New Quote Request — ${name} (${business || 'No business'})`,
        html,
      }),
      resend.emails.send({
        from: 'SystemVeil <noreply@systemveil.com>',
        to: f.email,
        subject: 'We received your quote request — SystemVeil',
        html: confirmationHtml,
      }),
    ]);
    res.json({ success: true });
  } catch (err) {
    console.error('Email send error:', err);
    res.status(500).json({ success: false, error: 'Failed to send email.' });
  }
});

app.post('/api/contact', submitLimiter, async (req, res) => {
  const parsed = contactSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ success: false, error: 'Invalid form data.' });
    return;
  }

  const f = parsed.data;
  const name = escapeHtml(f.name);
  const email = escapeHtml(f.email);
  const message = escapeHtml(f.message);

  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a2e;">
      <div style="background: linear-gradient(135deg, #8B5CF6, #D946EF); padding: 32px; border-radius: 12px 12px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Message</h1>
        <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0;">Received via systemveil.com</p>
      </div>
      <div style="background: #f9f9fb; padding: 32px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb;">
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
          <tr><td style="padding: 6px 0; color: #6b7280; width: 30%;">Name</td><td style="padding: 6px 0; font-weight: 600;">${name}</td></tr>
          <tr><td style="padding: 6px 0; color: #6b7280;">Email</td><td style="padding: 6px 0; font-weight: 600;"><a href="mailto:${email}" style="color: #6d28d9;">${email}</a></td></tr>
        </table>
        <h2 style="font-size: 16px; color: #6d28d9; text-transform: uppercase; letter-spacing: 0.05em;">Message</h2>
        <p style="color: #374151; white-space: pre-wrap; margin: 0;">${message}</p>
        <div style="margin-top: 32px; padding: 16px; background: #ede9fe; border-radius: 8px; border-left: 4px solid #7c3aed;">
          <p style="margin: 0; font-size: 14px; color: #5b21b6;">Reply directly to this email to reach <strong>${name}</strong> at <a href="mailto:${email}" style="color: #6d28d9;">${email}</a></p>
        </div>
      </div>
    </div>
  `;

  const recipientEmail = process.env.QUOTE_RECIPIENT_EMAIL;
  if (!recipientEmail) {
    console.error('QUOTE_RECIPIENT_EMAIL is not set');
    res.status(500).json({ success: false, error: 'Server misconfiguration.' });
    return;
  }

  try {
    await resend.emails.send({
      from: 'SystemVeil Contact <noreply@systemveil.com>',
      to: recipientEmail,
      replyTo: f.email,
      subject: `New Message from ${name}`,
      html,
    });
    res.json({ success: true });
  } catch (err) {
    console.error('Email send error:', err);
    res.status(500).json({ success: false, error: 'Failed to send email.' });
  }
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
