'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, Phone } from 'lucide-react';
import styles from './Navbar.module.css';

const NAV_ITEMS = [
  { id: 'home', label: 'HOME' },
  { id: 'about', label: 'ABOUT US' },
  { id: 'accommodation', label: 'ACCOMMODATION' },
  { id: 'amenities', label: 'AMENITIES' },
  { id: 'gallery', label: 'GALLERY' },
  { id: 'attractions', label: 'ATTRACTIONS' },
  { id: 'contact', label: 'CONTACT US' },
];

export default function Navbar({ onOpenBooking }) {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll detection for sticky header styling & active section highlight
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Determine active section based on scroll position
      const scrollPos = window.scrollY + 140;
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const item = NAV_ITEMS[i];
        const section = document.getElementById(item.id);
        if (section) {
          const top = section.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const topOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveSection(id);
    }
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.navbarContainer}`}>
        {/* Brand Logo matching the original banner badge */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, 'home')}
          className={styles.brand}
          id="navbar-logo-link"
        >
          <div className={styles.logoBadge}>
            <div className={styles.logoInnerRing}>
              <span className={styles.logoCrown}>👑</span>
              <span className={styles.logoAcronym}>LCB</span>
              <span className={styles.logoSubtext}>LAKE CROWN</span>
            </div>
          </div>
          <div className={styles.brandTitleWrap}>
            <span className={styles.brandName}>LAKE CROWN</span>
            <span className={styles.brandSub}>BEIRA • COLOMBO</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className={styles.navMenu} aria-label="Main Navigation">
          <ul className={styles.navList}>
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id} className={styles.navItem}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className={`${styles.navLink} ${isActive ? styles.activeLink : ''}`}
                    id={`nav-link-${item.id}`}
                  >
                    {item.label}
                    {isActive && <span className={styles.activeIndicator} />}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Action Button */}
        <div className={styles.navActions}>
          <button
            onClick={onOpenBooking}
            className={`btn btn-primary ${styles.bookNowBtn}`}
            id="navbar-book-now-btn"
          >
            <Calendar size={16} />
            <span>BOOK NOW</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={styles.mobileToggle}
            aria-label="Toggle mobile menu"
            id="mobile-menu-toggle-btn"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div className={`${styles.mobileDrawer} ${mobileMenuOpen ? styles.mobileOpen : ''}`}>
        <ul className={styles.mobileNavList}>
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <li key={item.id} className={styles.mobileNavItem}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`${styles.mobileNavLink} ${isActive ? styles.mobileActiveLink : ''}`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
        <div className={styles.mobileDrawerFooter}>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBooking();
            }}
            className="btn btn-gold"
            style={{ width: '100%', marginBottom: '12px' }}
          >
            <Calendar size={18} />
            <span>BOOK YOUR STAY</span>
          </button>
          <a
            href="tel:+94766418199"
            className="btn btn-outline-white"
            style={{ width: '100%' }}
          >
            <Phone size={16} />
            <span>CALL 076 641 8199</span>
          </a>
        </div>
      </div>
    </header>
  );
}
