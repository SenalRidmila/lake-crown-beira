'use client';

import { Phone, Mail, MapPin, ShieldCheck, Heart, Cookie } from 'lucide-react';
import { FacebookIcon, InstagramIcon } from './SocialIcons';
import styles from './Footer.module.css';

export default function Footer({ onOpenCookies }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className={styles.footer}>
      {/* Top Banner Row from Original Design */}
      <div className={styles.topBanner}>
        <div className={`container ${styles.bannerContainer}`}>
          {/* Phone Block */}
          <div className={styles.bannerItem}>
            <div className={styles.bannerIconCircle}>
              <Phone size={22} className={styles.bannerIcon} />
            </div>
            <div>
              <a href="tel:+94766418199" className={styles.bannerMainText}>
                076 641 8199
              </a>
              <span className={styles.bannerSubText}>Call us for reservations</span>
            </div>
          </div>

          {/* Email Block */}
          <div className={styles.bannerItem}>
            <div className={styles.bannerIconCircle}>
              <Mail size={22} className={styles.bannerIcon} />
            </div>
            <div>
              <a href="mailto:lakecrownbeira@gmail.com" className={styles.bannerMainText}>
                lakecrownbeira@gmail.com
              </a>
              <span className={styles.bannerSubText}>Send us an email</span>
            </div>
          </div>

          {/* Location Block */}
          <div className={styles.bannerItem}>
            <div className={styles.bannerIconCircle}>
              <MapPin size={22} className={styles.bannerIcon} />
            </div>
            <div>
              <a
                href="https://maps.app.goo.gl/2uN9A9GkPMsecEzm8"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.bannerMainText}
              >
                Beira Lake Colombo, Sri Lanka
              </a>
              <span className={styles.bannerSubText}>Visit our location</span>
            </div>
          </div>

          {/* Follow Us Block */}
          <div className={styles.bannerItem}>
            <div className={styles.socialFollowWrap}>
              <span className={styles.followLabel}>FOLLOW US</span>
              <div className={styles.socialButtons}>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialBtn}
                  aria-label="Facebook"
                >
                  <FacebookIcon size={16} />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialBtn}
                  aria-label="Instagram"
                >
                  <InstagramIcon size={16} />
                </a>
                <span className={styles.followBrand}>Lake Crown Beira</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Bio */}
      <div className={`container ${styles.mainContent}`}>
        <div className={styles.columnsGrid}>
          {/* Brand Col */}
          <div className={styles.brandCol}>
            <div className={styles.brandTitleWrap}>
              <span className={styles.brandCrown}>👑</span>
              <h3 className={styles.brandName}>LAKE CROWN BEIRA</h3>
            </div>
            <p className={styles.brandTagline}>Where comfort meets elegance.</p>
            <p className={styles.brandBio}>
              A serene 2-bedroom serviced accommodation on the shores of Beira Lake, Colombo 02.
              Immerse yourself in tranquil waterside living, private Lotus Tower views, and authentic Sri Lankan warmth.
            </p>
            <div className={styles.secureTag}>
              <ShieldCheck size={16} className={styles.shieldIcon} />
              <span>Verified Superhost & Secure Reservations</span>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Navigation</h4>
            <ul className={styles.linksList}>
              <li>
                <button onClick={() => scrollTo('home')} className={styles.navLinkBtn}>
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('about')} className={styles.navLinkBtn}>
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('accommodation')} className={styles.navLinkBtn}>
                  Accommodation
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('amenities')} className={styles.navLinkBtn}>
                  Amenities
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('gallery')} className={styles.navLinkBtn}>
                  Photo Gallery
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('attractions')} className={styles.navLinkBtn}>
                  Attractions
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('contact')} className={styles.navLinkBtn}>
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Landmarks Near Us */}
          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Nearby Highlights</h4>
            <ul className={styles.linksList}>
              <li>Seema Malakaya Temple (350m)</li>
              <li>Gangaramaya Temple (400m)</li>
              <li>Colombo Lotus Tower (1.2 km)</li>
              <li>Colombo City Centre (500m)</li>
              <li>Galle Face Green (1.5 km)</li>
              <li>One Galle Face Mall (1.8 km)</li>
            </ul>
          </div>

          {/* Guest Policies & Cookie settings */}
          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Guest Policies</h4>
            <ul className={styles.linksList}>
              <li>Check-in: 2:00 PM</li>
              <li>Check-out: 11:00 AM</li>
              <li>Free WiFi included</li>
              <li>Free Gated Parking</li>
              <li>Strict No Smoking Indoors</li>
              <li>
                <button
                  onClick={onOpenCookies}
                  className={styles.cookieBtn}
                  id="footer-cookie-settings-btn"
                >
                  <Cookie size={14} />
                  <span>Cookie Preferences</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Lake Crown Beira. All rights reserved. Beira Lake Colombo, Sri Lanka.
          </p>
          <div className={styles.bottomLinks}>
            <span>Security & Privacy Guaranteed</span>
            <span className={styles.dot}>•</span>
            <span>Where Comfort Meets Elegance</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
