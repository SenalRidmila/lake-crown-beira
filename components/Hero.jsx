'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Calendar, Users, Home, Sparkles, ArrowRight, ShieldCheck, Star } from 'lucide-react';
import { useCurrency } from './CurrencyContext';
import styles from './Hero.module.css';

export default function Hero({ onOpenBooking }) {
  const { formatPrice } = useCurrency();

  // Availability form state
  const today = new Date().toISOString().split('T')[0];
  const nextDate = new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(nextDate);
  const [guests, setGuests] = useState('2');
  const [suiteType, setSuiteType] = useState('full-apartment');

  const handleQuickSearch = (e) => {
    e.preventDefault();
    onOpenBooking({
      checkIn,
      checkOut,
      guests: parseInt(guests, 10),
      suiteType,
    });
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className={styles.heroSection}>
      {/* Background with Ambient Gradient */}
      <div className={styles.heroBgContainer}>
        <div className={styles.heroBackdropGradient} />
      </div>

      <div className={`container ${styles.heroContainer}`}>
        <div className={styles.heroGrid}>
          {/* Left Column: Brand Content & Titles */}
          <div className={styles.heroContent}>
            {/* Crown Emblem from Original Design */}
            <div className={styles.crownWrapper}>
              <span className={styles.crownIcon}>👑</span>
              <span className={styles.crownDivider} />
            </div>

            <h1 className={styles.mainTitle}>
              <span className={styles.titleLine1}>LAKE CROWN</span>
              <span className={styles.titleLine2}>• BEIRA •</span>
            </h1>

            <p className={styles.tagline}>Where comfort meets elegance</p>

            <p className={styles.description}>
              Experience peaceful stays by the scenic Beira Lake, Colombo, Sri Lanka.
              Enjoy prime lakeside living with private balconies, Lotus Tower skyline views,
              and boutique hospitality in the heart of the capital.
            </p>

            <div className={styles.heroBadges}>
              <div className={styles.badgeItem}>
                <Star size={15} className={styles.badgeStar} fill="currentColor" />
                <span>4.9 / 5 Guest Rating</span>
              </div>
              <div className={styles.badgeItem}>
                <ShieldCheck size={16} className={styles.badgeIcon} />
                <span>Verified Colombo Superhost</span>
              </div>
            </div>

            <div className={styles.heroCtaGroup}>
              <button
                onClick={() => onOpenBooking()}
                className={`btn btn-primary ${styles.btnHeroPrimary}`}
                id="hero-book-stay-btn"
              >
                <span>BOOK YOUR STAY</span>
                <ArrowRight size={17} />
              </button>

              <button
                onClick={() => scrollToSection('accommodation')}
                className={`btn btn-outline-gold ${styles.btnHeroSecondary}`}
                id="hero-explore-suites-btn"
              >
                <Sparkles size={16} />
                <span>EXPLORE SUITES</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual Frame */}
          <div className={styles.heroVisualWrap}>
            <div className={styles.heroImageFrame}>
              <div className={styles.imageOverlayGradient} />
              <img
                src="/images/hero-beira-lake.jpg"
                alt="Lake Crown Beira - Luxury lakeside stay in Colombo overlooking Lotus Tower"
                className={styles.heroImage}
              />
              <div className={styles.imageFloatingBadge}>
                <span className={styles.floatingTag}>Scenic Water Front</span>
                <span className={styles.floatingLocation}>Overlooking Beira Lake & Lotus Tower</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Check-in / Booking Availability Strip */}
        <div className={styles.bookingStrip}>
          <form onSubmit={handleQuickSearch} className={styles.stripForm}>
            <div className={styles.stripField}>
              <label htmlFor="hero-check-in" className={styles.stripLabel}>
                <Calendar size={14} className={styles.fieldIcon} />
                <span>CHECK-IN</span>
              </label>
              <input
                type="date"
                id="hero-check-in"
                value={checkIn}
                min={today}
                onChange={(e) => setCheckIn(e.target.value)}
                className={styles.stripInput}
                required
              />
            </div>

            <div className={styles.stripDivider} />

            <div className={styles.stripField}>
              <label htmlFor="hero-check-out" className={styles.stripLabel}>
                <Calendar size={14} className={styles.fieldIcon} />
                <span>CHECK-OUT</span>
              </label>
              <input
                type="date"
                id="hero-check-out"
                value={checkOut}
                min={checkIn || today}
                onChange={(e) => setCheckOut(e.target.value)}
                className={styles.stripInput}
                required
              />
            </div>

            <div className={styles.stripDivider} />

            <div className={styles.stripField}>
              <label htmlFor="hero-guests" className={styles.stripLabel}>
                <Users size={14} className={styles.fieldIcon} />
                <span>GUESTS</span>
              </label>
              <select
                id="hero-guests"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className={styles.stripSelect}
              >
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests</option>
                <option value="5">5 Guests (Max)</option>
              </select>
            </div>

            <div className={styles.stripDivider} />

            <div className={styles.stripField}>
              <label htmlFor="hero-suite" className={styles.stripLabel}>
                <Home size={14} className={styles.fieldIcon} />
                <span>ACCOMMODATION</span>
              </label>
              <select
                id="hero-suite"
                value={suiteType}
                onChange={(e) => setSuiteType(e.target.value)}
                className={styles.stripSelect}
              >
                <option value="full-apartment">Full 2-Bedroom Apartment (From {formatPrice(28000)}/night)</option>
                <option value="bedroom1">Master Lake View Suite (From {formatPrice(16500)}/night)</option>
                <option value="bedroom2">Deluxe Family Twin Suite (From {formatPrice(14000)}/night)</option>
              </select>
            </div>

            <button
              type="submit"
              className={`btn btn-gold ${styles.stripSubmitBtn}`}
              id="hero-check-availability-btn"
            >
              <span>CHECK AVAILABILITY</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
