import React, { useState, Suspense, lazy } from 'react';
import { useDeviceTier } from '@/shared/hooks/use-device-tier';
import Reveal from '@/components/ui/Reveal';
import ScrollFloat from '@/components/ui/ScrollFloat';
import ShineBorder from '@/components/ui/ShineBorder';
import StatefulButton from '@/components/ui/StatefulButton';
import { getInquiryWebmailUrl } from '@/shared/lib/email-inquiry';
import { PRODUCTS_DATA } from '@/domains/products/data/products-data';
import { ArrowUpRight, Mail } from 'lucide-react';

const SoftAurora = lazy(() => import('@/components/ui/SoftAurora'));

export const ContactSection: React.FC = () => {
  const tier = useDeviceTier();
  const isFull = tier === 'full';

  const [activeTab, setActiveTab] = useState<'project' | 'product'>('project');
  const [formData, setFormData] = useState({
    name: '',
    contactInfo: '',
    selectedProduct: PRODUCTS_DATA[0].name,
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Please add your name.';
    }
    if (!formData.contactInfo.trim()) {
      newErrors.contactInfo = 'Please add an email or phone number.';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Tell us a little about what you want to build.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitStatus('loading');

    const subject =
      activeTab === 'product'
        ? `Inquiry regarding ${formData.selectedProduct} — Kavirox`
        : `New Project Inquiry from ${formData.name} — Kavirox`;

    const bodyContent =
      activeTab === 'product'
        ? `Hello Kavirox Team,\n\nI would like to inquire about ${formData.selectedProduct}.\n\nFrom: ${formData.name}\nContact: ${formData.contactInfo}\n\nDetails:\n${formData.message}\n\nLooking forward to discussing scope and deployment.`
        : `Hello Kavirox Team,\n\nI would like to discuss a project with Kavirox.\n\nFrom: ${formData.name}\nContact: ${formData.contactInfo}\n\nProject Overview:\n${formData.message}\n\nLooking forward to hearing from you.`;

    const webmailUrl = getInquiryWebmailUrl({
      source: activeTab === 'product' ? `Product: ${formData.selectedProduct}` : 'Custom Project Inquiry',
    });

    const mailtoUrl = `mailto:info@kavirox.space?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(bodyContent)}`;

    setTimeout(() => {
      setSubmitStatus('success');
      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || window.innerWidth < 768;
      if (isMobile) {
        window.location.href = mailtoUrl;
      } else {
        const opened = window.open(webmailUrl, '_blank');
        if (!opened) {
          window.location.href = mailtoUrl;
        }
      }

      setTimeout(() => {
        setSubmitStatus('idle');
      }, 4000);
    }, 600);
  };

  return (
    <section
      id="contact"
      className="relative w-full py-20 sm:py-28 md:py-32 bg-[#060913] border-b border-line overflow-hidden scroll-mt-24 md:scroll-mt-28 isolate"
      aria-label="Contact and Inquiries"
    >
      {/* SoftAurora Ambient Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-90 overflow-hidden">
        <Suspense fallback={null}>
          <SoftAurora
            speed={0.6}
            scale={1.2}
            brightness={1}
            color1="#c6c6d8"
            color2="#0033ff"
            bandHeight={0.51}
            bandSpread={1.95}
            enableMouseInteraction={isFull}
            mouseInfluence={0.25}
            spectrum={1}
            colorSpeed={1}
            noiseFrequency={2.5}
            noiseAmplitude={2.2}
            tilt={-14}
            octaveDecay={0.1}
            layerOffset={0}
            clickPulse={true}
            intro={true}
            lightMode={false}
          />
        </Suspense>
      </div>

      <div className="max-w-4xl mx-auto px-5 sm:px-8 md:px-12 relative z-10">
        <Reveal>
          <div className="text-center space-y-3 mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-primary uppercase tracking-widest">
              <span className="w-4 h-[1px] bg-primary" />
              <span>Contact</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl text-text tracking-tight leading-tight">
              <ScrollFloat effect="float" splitBy="words" animationDuration={0.8} stagger={0.03}>
                Tell us what you want to build.
              </ScrollFloat>
            </h2>
            <p className="text-text-muted text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Share a few lines. Sending opens a ready-written email in your email app, so you can review it before it goes.
            </p>
          </div>
        </Reveal>

        {/* Path Selection Tabs */}
        <Reveal delayMs={60}>
          <div className="flex justify-center mb-8">
            <div className="inline-flex p-1 rounded-full bg-surface-2 border border-line">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('project');
                  setErrors({});
                }}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-mono font-medium transition-all ${
                  activeTab === 'project'
                    ? 'bg-primary text-primary-ink shadow-md font-bold'
                    : 'text-text-muted hover:text-white'
                }`}
              >
                Discuss a project
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('product');
                  setErrors({});
                }}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-mono font-medium transition-all ${
                  activeTab === 'product'
                    ? 'bg-primary text-primary-ink shadow-md font-bold'
                    : 'text-text-muted hover:text-white'
                }`}
              >
                Ask about a product
              </button>
            </div>
          </div>
        </Reveal>

        <Reveal delayMs={100}>
          <ShineBorder
            borderRadius={28}
            borderWidth={1}
            duration={10}
            shineColor={['#1e3fd8', '#38bdf8', '#a5d8ff']}
            className="shadow-2xl"
          >
            <form
              onSubmit={handleSubmit}
              noValidate
              className="p-6 sm:p-10 md:p-12 space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <label
                    htmlFor="contact-name"
                    className="block font-sans text-sm text-text-muted font-medium"
                  >
                    Your name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: '' });
                    }}
                    className={`cursor-target w-full px-4 py-3 bg-surface-2 border rounded-xl text-sm font-sans text-text placeholder:text-text-muted/40 outline-none transition-colors ${
                      errors.name ? 'border-red-500/80' : 'border-line focus:border-primary/60'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-400 font-mono">{errors.name}</p>
                  )}
                </div>

                {/* Email or Phone */}
                <div className="space-y-2">
                  <label
                    htmlFor="contact-info"
                    className="block font-sans text-sm text-text-muted font-medium"
                  >
                    Email or phone
                  </label>
                  <input
                    id="contact-info"
                    type="text"
                    placeholder="you@company.com or phone"
                    value={formData.contactInfo}
                    onChange={(e) => {
                      setFormData({ ...formData, contactInfo: e.target.value });
                      if (errors.contactInfo) setErrors({ ...errors, contactInfo: '' });
                    }}
                    className={`cursor-target w-full px-4 py-3 bg-surface-2 border rounded-xl text-sm font-sans text-text placeholder:text-text-muted/40 outline-none transition-colors ${
                      errors.contactInfo ? 'border-red-500/80' : 'border-line focus:border-primary/60'
                    }`}
                  />
                  {errors.contactInfo && (
                    <p className="text-xs text-red-400 font-mono">{errors.contactInfo}</p>
                  )}
                </div>
              </div>

              {/* Product Select (When in Product Tab) */}
              {activeTab === 'product' && (
                <div className="space-y-2">
                  <label
                    htmlFor="contact-product"
                    className="block font-sans text-sm text-text-muted font-medium"
                  >
                    Which product?
                  </label>
                  <select
                    id="contact-product"
                    value={formData.selectedProduct}
                    onChange={(e) =>
                      setFormData({ ...formData, selectedProduct: e.target.value })
                    }
                    className="cursor-target w-full px-4 py-3 bg-surface-2 border border-line rounded-xl text-sm font-sans text-text outline-none focus:border-primary/60 transition-colors"
                  >
                    {PRODUCTS_DATA.map((p) => (
                      <option key={p.slug} value={p.name} className="bg-[#0b120c] text-white">
                        {p.name} — {p.category} ({p.status})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Message */}
              <div className="space-y-2">
                <label
                  htmlFor="contact-message"
                  className="block font-sans text-sm text-text-muted font-medium"
                >
                  What are you building?
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  placeholder={
                    activeTab === 'product'
                      ? "Tell us how you plan to use this product, your team size, or specific integration requirements..."
                      : "A few lines about the problem, who it is for, and what you are looking to build..."
                  }
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    if (errors.message) setErrors({ ...errors, message: '' });
                  }}
                  className={`cursor-target w-full px-4 py-3 bg-surface-2 border rounded-xl text-sm font-sans text-text placeholder:text-text-muted/40 outline-none transition-colors resize-none ${
                    errors.message ? 'border-red-500/80' : 'border-line focus:border-primary/60'
                  }`}
                />
                {errors.message && (
                  <p className="text-xs text-red-400 font-mono">{errors.message}</p>
                )}
              </div>

              {/* Submit Button & Disclaimer */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <StatefulButton
                  status={submitStatus}
                  loadingText="Opening your email..."
                  successText="Email ready"
                  className="w-full sm:w-auto text-sm px-8 py-3.5 shadow-[0_0_20px_rgba(56, 189, 248,0.35)]"
                >
                  <span>Open the email</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                </StatefulButton>

                <div className="text-center sm:text-right font-mono text-[12px] text-text-muted/80 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-primary" />
                  <span>Prefer to write directly? </span>
                  <a
                    href="mailto:info@kavirox.space"
                    className="text-primary hover:underline font-bold"
                  >
                    info@kavirox.space
                  </a>
                </div>
              </div>
            </form>
          </ShineBorder>
        </Reveal>
      </div>
    </section>
  );
};

export default ContactSection;
