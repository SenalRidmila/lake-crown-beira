'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import styles from './FaqSection.module.css';

const FAQS = [
  {
    q: 'What are the check-in and check-out times?',
    a: 'Check-in is from 2:00 PM onwards, and check-out is by 11:00 AM. If you have an early morning flight or late evening departure, please let us know in advance — complimentary luggage storage is available, and early check-in or late check-out can be arranged subject to availability.',
  },
  {
    q: 'Is secure parking available on premises?',
    a: 'Yes, complimentary secure on-site gated parking is provided for our guests. The parking space accommodates cars, SUVs, or passenger vans, monitored with 24/7 building security.',
  },
  {
    q: 'Can we cook our own meals in the kitchen?',
    a: 'Absolutely! The serviced kitchen is fully equipped for complete self-catering with a gas hob stove, microwave oven, refrigerator/freezer, electric kettle, frying pans, saucepans, and full dining dinnerware. Supermarkets (Cargills Food City & Keells) are within 5 minutes walk.',
  },
  {
    q: 'How do we reach Lake Crown Beira from Colombo Airport (CMB)?',
    a: 'Bandaranaike International Airport is approximately 32 km away. Taking the Colombo–Katunayake Expressway takes just 35 to 40 minutes. We can also coordinate a private, air-conditioned airport transfer with a trusted driver upon your booking request.',
  },
  {
    q: 'What is the security setup at Lake Crown Beira?',
    a: 'Your peace of mind is our utmost priority. The property features electronic digital door locks with unique access codes, 24/7 CCTV surveillance in entryways, gated access, first aid kits, and night security personnel on duty.',
  },
  {
    q: 'What is the cancellation policy?',
    a: 'We offer flexible travel planning with free full cancellation up to 48 hours before your scheduled arrival date. For last-minute changes or emergencies, please reach out directly to our management team via WhatsApp or phone.',
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faqs" className={styles.faqSection}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tagline">GOT QUESTIONS?</span>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Find answers to commonly asked questions about booking, policies, and facilities
            at Lake Crown Beira.
          </p>
        </div>

        {/* Accordion Container */}
        <div className={styles.accordionWrap}>
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`${styles.accordionItem} ${isOpen ? styles.itemOpen : ''}`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className={styles.questionBtn}
                  aria-expanded={isOpen}
                  id={`faq-btn-${idx}`}
                >
                  <span className={styles.questionText}>
                    <HelpCircle size={18} className={styles.qIcon} />
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`${styles.chevron} ${isOpen ? styles.chevronRotated : ''}`}
                  />
                </button>

                {isOpen && (
                  <div className={styles.answerBox} role="region">
                    <p className={styles.answerText}>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
