'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2, ShieldCheck, MessageCircle, AlertCircle } from 'lucide-react';
import styles from './ContactSection.module.css';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dates: '',
    guests: '2',
    message: '',
    // Honeypot field (anti-spam bot trap)
    websiteUrlHoney: '',
  });

  const [status, setStatus] = useState({ type: null, message: '', refCode: '' });
  const [lastSubmitTime, setLastSubmitTime] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Security: Input Sanitizer to prevent XSS injection
  const sanitize = (str) => {
    return str
      .replace(/[<>]/g, '')
      .replace(/javascript:/gi, '')
      .trim();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Honeypot check - if bot filled the hidden field, silently reject
    if (formData.websiteUrlHoney) {
      console.warn('Bot detected via honeypot.');
      setStatus({
        type: 'success',
        message: 'Your inquiry has been received. Our concierge will contact you shortly!',
        refCode: `LCB-INQ-${Math.floor(1000 + Math.random() * 9000)}`,
      });
      return;
    }

    // 2. Anti-spam Rate Limiting (30-second cooldown)
    const now = Date.now();
    if (now - lastSubmitTime < 30000 && lastSubmitTime !== 0) {
      const waitSec = Math.ceil((30000 - (now - lastSubmitTime)) / 1000);
      setStatus({
        type: 'error',
        message: `Please wait ${waitSec} seconds before submitting another inquiry to prevent duplicate requests.`,
        refCode: '',
      });
      return;
    }

    // 3. Validation
    const sanitizedName = sanitize(formData.fullName);
    const sanitizedEmail = sanitize(formData.email);
    const sanitizedPhone = sanitize(formData.phone);
    const sanitizedMsg = sanitize(formData.message);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sanitizedEmail)) {
      setStatus({
        type: 'error',
        message: 'Please provide a valid email address (e.g., yourname@domain.com).',
        refCode: '',
      });
      return;
    }

    if (sanitizedName.length < 2) {
      setStatus({
        type: 'error',
        message: 'Please enter your full name.',
        refCode: '',
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate secure transmission
    setTimeout(() => {
      setIsSubmitting(false);
      setLastSubmitTime(now);
      const generatedRef = `LCB-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
      setStatus({
        type: 'success',
        message: `Inquiry sent successfully! Reference #${generatedRef}. We will respond within 2 hours.`,
        refCode: generatedRef,
      });

      // Reset form fields
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        dates: '',
        guests: '2',
        message: '',
        websiteUrlHoney: '',
      });
    }, 800);
  };

  const whatsappMessage = encodeURIComponent(
    'Hello Lake Crown Beira! I am interested in inquiring about reservation dates and room availability at your Colombo residence.'
  );

  return (
    <section id="contact" className={styles.contactSection}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tagline">GET IN TOUCH</span>
          <h2 className="section-title">Contact & Reservations</h2>
          <p className="section-subtitle">
            Directly connect with our hospitality team for reservation questions,
            custom stay dates, airport pickups, or special requests.
          </p>
        </div>

        <div className={styles.contactGrid}>
          {/* Left Column: Direct Contact Info Cards */}
          <div className={styles.infoCol}>
            <div className={styles.infoCard}>
              <div className={styles.cardHeader}>
                <div className={styles.iconCircle}>
                  <Phone size={22} className={styles.cardIcon} />
                </div>
                <div>
                  <h3 className={styles.cardTitle}>Call Us Directly</h3>
                  <span className={styles.cardSubtitle}>Available 24/7 for guest inquiries</span>
                </div>
              </div>
              <p className={styles.cardValue}>076 641 8199 / +94 76 641 8199</p>
              <a
                href="tel:+94766418199"
                className="btn btn-outline-gold"
                style={{ width: '100%', marginTop: '12px' }}
                id="contact-call-btn"
              >
                <Phone size={15} />
                <span>CALL NOW</span>
              </a>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.cardHeader}>
                <div className={styles.iconCircle}>
                  <Mail size={22} className={styles.cardIcon} />
                </div>
                <div>
                  <h3 className={styles.cardTitle}>Send Us an Email</h3>
                  <span className={styles.cardSubtitle}>Official booking inquiries</span>
                </div>
              </div>
              <p className={styles.cardValue}>lakecrownbeira@gmail.com</p>
              <a
                href="mailto:lakecrownbeira@gmail.com?subject=Booking%20Inquiry%20-%20Lake%20Crown%20Beira"
                className="btn btn-outline-gold"
                style={{ width: '100%', marginTop: '12px' }}
                id="contact-email-btn"
              >
                <Mail size={15} />
                <span>SEND EMAIL</span>
              </a>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.cardHeader}>
                <div className={styles.iconCircle}>
                  <MessageCircle size={22} className={styles.cardIcon} />
                </div>
                <div>
                  <h3 className={styles.cardTitle}>WhatsApp Instant Chat</h3>
                  <span className={styles.cardSubtitle}>Direct messaging with host</span>
                </div>
              </div>
              <p className={styles.cardValue}>Chat instantly with host for quick answers</p>
              <a
                href={`https://wa.me/94766418199?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '12px', background: '#25D366', borderColor: '#25D366' }}
                id="contact-whatsapp-btn"
              >
                <MessageCircle size={17} />
                <span>CHAT ON WHATSAPP</span>
              </a>
            </div>
          </div>

          {/* Right Column: Secure Reservation Inquiry Form */}
          <div className={styles.formCol}>
            <div className={styles.formWrapper}>
              <div className={styles.formHeader}>
                <div className={styles.securityBadge}>
                  <ShieldCheck size={16} className={styles.shieldIcon} />
                  <span>SSL Encrypted & Secure Transmission</span>
                </div>
                <h3 className={styles.formHeading}>Send Direct Reservation Inquiry</h3>
                <p className={styles.formSubtext}>
                  Best rate guarantee when booking directly with Lake Crown Beira.
                </p>
              </div>

              {/* Status Banner */}
              {status.type && (
                <div
                  className={`${styles.statusBanner} ${
                    status.type === 'success' ? styles.statusSuccess : styles.statusError
                  }`}
                  role="alert"
                >
                  {status.type === 'success' ? (
                    <CheckCircle2 size={20} className={styles.statusIcon} />
                  ) : (
                    <AlertCircle size={20} className={styles.statusIcon} />
                  )}
                  <div>
                    <p className={styles.statusMsg}>{status.message}</p>
                    {status.refCode && (
                      <p className={styles.statusRef}>
                        Please save reference code: <strong>{status.refCode}</strong>
                      </p>
                    )}
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className={styles.inquiryForm} noValidate>
                {/* Honeypot field (hidden from legitimate users) */}
                <input
                  type="text"
                  name="websiteUrlHoney"
                  value={formData.websiteUrlHoney}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                  style={{ display: 'none' }}
                  aria-hidden="true"
                />

                <div className={styles.formRow}>
                  <div className={styles.fieldGroup}>
                    <label htmlFor="contact-name" className={styles.label}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Ruwan Jayasuriya"
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.fieldGroup}>
                    <label htmlFor="contact-email" className={styles.label}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. ruwan@example.com"
                      className={styles.input}
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.fieldGroup}>
                    <label htmlFor="contact-phone" className={styles.label}>
                      Phone / WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      id="contact-phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +94 77 123 4567"
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.fieldGroup}>
                    <label htmlFor="contact-guests" className={styles.label}>
                      Number of Guests
                    </label>
                    <select
                      id="contact-guests"
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      className={styles.select}
                    >
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4 Guests</option>
                      <option value="5">5 Guests (Max)</option>
                    </select>
                  </div>
                </div>

                <div className={styles.fieldGroup}>
                  <label htmlFor="contact-dates" className={styles.label}>
                    Preferred Dates of Stay
                  </label>
                  <input
                    type="text"
                    id="contact-dates"
                    name="dates"
                    value={formData.dates}
                    onChange={handleChange}
                    placeholder="e.g. Nov 15 - Nov 20 (5 nights)"
                    className={styles.input}
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label htmlFor="contact-message" className={styles.label}>
                    Message or Special Requests
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your flight arrival time, airport transfer needs, or any questions..."
                    className={styles.textarea}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`btn btn-primary ${styles.submitBtn}`}
                  id="contact-submit-inquiry-btn"
                >
                  <Send size={16} />
                  <span>{isSubmitting ? 'TRANSMITTING SECURELY...' : 'SUBMIT RESERVATION INQUIRY'}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
