'use client';

import React, { useState, useEffect } from 'react';
import { Cookie, Shield, Check, X, Settings2 } from 'lucide-react';
import styles from './CookieBanner.module.css';

export default function CookieBanner({ forceOpen, onCloseForce }) {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true
    analytics: true,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem('lcb_cookie_consent');
    if (!consent) {
      // Delay showing slightly for smooth entrance
      const timer = setTimeout(() => setShowBanner(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (forceOpen) {
      setShowPreferences(true);
    }
  }, [forceOpen]);

  const handleAcceptAll = () => {
    const choice = { necessary: true, analytics: true, marketing: true };
    localStorage.setItem('lcb_cookie_consent', JSON.stringify(choice));
    setShowBanner(false);
    setShowPreferences(false);
    if (onCloseForce) onCloseForce();
  };

  const handleDecline = () => {
    const choice = { necessary: true, analytics: false, marketing: false };
    localStorage.setItem('lcb_cookie_consent', JSON.stringify(choice));
    setShowBanner(false);
    setShowPreferences(false);
    if (onCloseForce) onCloseForce();
  };

  const handleSavePreferences = () => {
    localStorage.setItem('lcb_cookie_consent', JSON.stringify(preferences));
    setShowBanner(false);
    setShowPreferences(false);
    if (onCloseForce) onCloseForce();
  };

  if (!showBanner && !showPreferences) return null;

  return (
    <>
      {/* Floating Banner */}
      {showBanner && !showPreferences && (
        <div className={styles.cookieBar} role="region" aria-label="Cookie consent">
          <div className={styles.cookieContent}>
            <div className={styles.iconWrap}>
              <Cookie size={24} className={styles.cookieIcon} />
            </div>
            <div className={styles.textWrap}>
              <h4 className={styles.cookieTitle}>We Value Your Privacy</h4>
              <p className={styles.cookieText}>
                Lake Crown Beira uses cookies to ensure secure reservations, remember currency
                preferences, and deliver smooth browsing by Beira Lake.
              </p>
            </div>
          </div>

          <div className={styles.actionButtons}>
            <button
              onClick={() => setShowPreferences(true)}
              className={styles.settingsBtn}
              id="cookie-customize-btn"
            >
              <Settings2 size={14} />
              <span>Customize</span>
            </button>
            <button
              onClick={handleDecline}
              className={styles.declineBtn}
              id="cookie-decline-btn"
            >
              Essential Only
            </button>
            <button
              onClick={handleAcceptAll}
              className={`btn btn-gold ${styles.acceptBtn}`}
              id="cookie-accept-all-btn"
            >
              Accept All
            </button>
          </div>
        </div>
      )}

      {/* Preferences Modal */}
      {showPreferences && (
        <div
          className="modal-overlay"
          onClick={() => {
            setShowPreferences(false);
            if (onCloseForce) onCloseForce();
          }}
        >
          <div className={styles.prefModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.prefHeader}>
              <div className={styles.prefTitleGroup}>
                <Shield size={20} className={styles.prefIcon} />
                <h3 className={styles.prefTitle}>Privacy & Cookie Preferences</h3>
              </div>
              <button
                onClick={() => {
                  setShowPreferences(false);
                  if (onCloseForce) onCloseForce();
                }}
                className={styles.prefCloseBtn}
                aria-label="Close preferences"
              >
                <X size={18} />
              </button>
            </div>

            <div className={styles.prefBody}>
              <p className={styles.prefIntro}>
                Manage your cookie preferences. Essential cookies are required for core security,
                session management, and room reservation flow.
              </p>

              {/* Necessary */}
              <div className={styles.toggleRow}>
                <div>
                  <h4 className={styles.toggleTitle}>Strictly Necessary Cookies</h4>
                  <p className={styles.toggleDesc}>
                    Required for page navigation, security verification, and booking engine.
                  </p>
                </div>
                <div className={styles.alwaysActive}>Always Active</div>
              </div>

              {/* Analytics */}
              <div className={styles.toggleRow}>
                <div>
                  <h4 className={styles.toggleTitle}>Performance & Analytics Cookies</h4>
                  <p className={styles.toggleDesc}>
                    Helps us understand user traffic and improve the website performance.
                  </p>
                </div>
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) =>
                      setPreferences({ ...preferences, analytics: e.target.checked })
                    }
                  />
                  <span className={styles.slider} />
                </label>
              </div>

              {/* Marketing */}
              <div className={styles.toggleRow}>
                <div>
                  <h4 className={styles.toggleTitle}>Marketing & Experience Cookies</h4>
                  <p className={styles.toggleDesc}>
                    Enables tailored hospitality promotions and social sharing features.
                  </p>
                </div>
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={(e) =>
                      setPreferences({ ...preferences, marketing: e.target.checked })
                    }
                  />
                  <span className={styles.slider} />
                </label>
              </div>
            </div>

            <div className={styles.prefFooter}>
              <button onClick={handleDecline} className={styles.prefDeclineBtn}>
                Reject Non-Essential
              </button>
              <button onClick={handleSavePreferences} className="btn btn-primary">
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
