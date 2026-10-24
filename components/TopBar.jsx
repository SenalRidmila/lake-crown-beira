'use client';

import React from 'react';
import { Phone, Mail, MapPin, Globe } from 'lucide-react';
import { FacebookIcon, InstagramIcon } from './SocialIcons';
import { useCurrency } from './CurrencyContext';
import styles from './TopBar.module.css';

export default function TopBar() {
  const { currency, changeCurrency, currencies } = useCurrency();

  return (
    <div className={styles.topBar}>
      <div className={`container ${styles.container}`}>
        {/* Contact Info (from original design banner) */}
        <div className={styles.contacts}>
          <a
            href="tel:+94766418199"
            className={styles.contactItem}
            title="Call Lake Crown Beira"
            id="topbar-phone"
          >
            <Phone size={14} className={styles.icon} />
            <span className={styles.text}>076 641 8199</span>
          </a>

          <a
            href="mailto:lakecrownbeira@gmail.com"
            className={styles.contactItem}
            title="Email Lake Crown Beira"
            id="topbar-email"
          >
            <Mail size={14} className={styles.icon} />
            <span className={styles.text}>lakecrownbeira@gmail.com</span>
          </a>

          <a
            href="https://maps.app.goo.gl/2uN9A9GkPMsecEzm8"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactItem}
            title="Open Lake Crown Beira on Google Maps"
            id="topbar-location"
          >
            <MapPin size={14} className={styles.icon} />
            <span className={styles.text}>Beira Lake Colombo, Sri Lanka</span>
          </a>
        </div>

        {/* Currency & Social Links */}
        <div className={styles.actions}>
          <div className={styles.currencySelector}>
            <Globe size={13} className={styles.currencyIcon} />
            <select
              value={currency}
              onChange={(e) => changeCurrency(e.target.value)}
              className={styles.select}
              aria-label="Select currency"
              id="topbar-currency-select"
            >
              {Object.keys(currencies).map((curr) => (
                <option key={curr} value={curr}>
                  {currencies[curr].label}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.social}>
            <span className={styles.followText}>Follow us</span>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              title="Follow Lake Crown Beira on Facebook"
              aria-label="Facebook"
              id="topbar-facebook"
            >
              <FacebookIcon size={14} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              title="Follow Lake Crown Beira on Instagram"
              aria-label="Instagram"
              id="topbar-instagram"
            >
              <InstagramIcon size={14} />
            </a>
            <span className={styles.brandName}>Lake Crown Beira</span>
          </div>
        </div>
      </div>
    </div>
  );
}
