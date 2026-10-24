'use client';

import React from 'react';
import { MapPin, Navigation, Plane, Train, Car, ExternalLink, Phone } from 'lucide-react';
import styles from './GoogleMapSection.module.css';

export default function GoogleMapSection() {
  const googleMapsUrl = 'https://maps.app.goo.gl/2uN9A9GkPMsecEzm8';

  return (
    <section className={styles.mapSection} aria-label="Location & Map">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tagline">PRIME WATERFRONT LOCATION</span>
          <h2 className="section-title">Find Us by Beira Lake</h2>
          <p className="section-subtitle">
            Situated right on the edge of scenic Beira Lake in Colombo 02,
            giving you rapid access to the city’s major transportation hubs, embassies, and business centers.
          </p>
        </div>

        <div className={styles.mapCard}>
          {/* Map Info Sidebar */}
          <div className={styles.infoCol}>
            <div className={styles.propertyBadge}>
              <div className={styles.pinCircle}>
                <MapPin size={22} className={styles.pinIcon} />
              </div>
              <div>
                <h3 className={styles.propertyName}>Lake Crown Beira</h3>
                <p className={styles.address}>Beira Lake, Colombo 02, Sri Lanka</p>
              </div>
            </div>

            <div className={styles.routesList}>
              <h4 className={styles.routesHeading}>Transit & Commute Times:</h4>

              <div className={styles.routeItem}>
                <Plane size={18} className={styles.routeIcon} />
                <div className={styles.routeDetails}>
                  <span className={styles.routeName}>Bandaranaike Int'l Airport (CMB)</span>
                  <span className={styles.routeMeta}>32 km • 35-40 mins via Katunayake Expressway</span>
                </div>
              </div>

              <div className={styles.routeItem}>
                <Train size={18} className={styles.routeIcon} />
                <div className={styles.routeDetails}>
                  <span className={styles.routeName}>Colombo Fort Railway Station</span>
                  <span className={styles.routeMeta}>2.5 km • 8 mins (Direct trains to Kandy & Ella)</span>
                </div>
              </div>

              <div className={styles.routeItem}>
                <Car size={18} className={styles.routeIcon} />
                <div className={styles.routeDetails}>
                  <span className={styles.routeName}>Kollupitiya & Galle Road</span>
                  <span className={styles.routeMeta}>1.2 km • 4 mins (Shopping & dining hub)</span>
                </div>
              </div>
            </div>

            <div className={styles.buttonStack}>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn btn-primary ${styles.openMapBtn}`}
                id="open-google-maps-btn"
              >
                <Navigation size={17} />
                <span>OPEN IN GOOGLE MAPS</span>
                <ExternalLink size={15} />
              </a>

              <a
                href="tel:+94766418199"
                className={`btn btn-outline-gold ${styles.callHelpBtn}`}
                id="location-call-host-btn"
              >
                <Phone size={15} />
                <span>Call Host for Directions</span>
              </a>
            </div>
          </div>

          {/* Embedded Google Map Frame */}
          <div className={styles.mapIframeWrap}>
            <iframe
              title="Lake Crown Beira Google Map Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.7836349834547!2d79.8500311!3d6.9164518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2596c53c59f67%3A0x9d5054570a9ca223!2sLake%20Crown%20Beira!5e0!3m2!1sen!2slk!4v1700000000000!5m2!1sen!2slk"
              className={styles.iframe}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
