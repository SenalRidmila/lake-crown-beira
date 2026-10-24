'use client';

import React, { useState } from 'react';
import { Bed, Sofa, Utensils, Wind, Droplets, Wifi, Check, X } from 'lucide-react';
import styles from './KeyFeaturesBar.module.css';

const FEATURES = [
  {
    id: 'bedrooms',
    icon: Bed,
    title: '2 BEDROOMS',
    detail: 'Master Suite with King Bed & Second Bedroom with Twin/Queen arrangement. Premium linens and blackout curtains for deep restful sleep.',
  },
  {
    id: 'living',
    icon: Sofa,
    title: '1 LIVING AREA',
    detail: 'Spacious lounge with plush sofas, 50" 4K Smart TV, ambient lighting, and dedicated dining space for family meals.',
  },
  {
    id: 'kitchen',
    icon: Utensils,
    title: 'FULLY EQUIPPED KITCHEN',
    detail: 'Complete kitchenette featuring gas hob, microwave, refrigerator, electric kettle, cookware, dishes, and cutlery for home-cooked meals.',
  },
  {
    id: 'ac',
    icon: Wind,
    title: 'AIR CONDITIONED ROOMS',
    detail: 'Whisper-quiet dual inverter air conditioning in every bedroom and the living space to keep you perfectly cool in Colombo tropical weather.',
  },
  {
    id: 'water',
    icon: Droplets,
    title: 'HOT & COLD WATER',
    detail: 'Continuous 24/7 high-pressure hot and cold water system in the modern glass rain shower and bathroom vanity.',
  },
  {
    id: 'wifi',
    icon: Wifi,
    title: 'FREE WiFi',
    detail: 'Ultra high-speed optical fiber WiFi throughout the entire apartment, perfect for digital nomads, remote work, and 4K streaming.',
  },
];

export default function KeyFeaturesBar() {
  const [selectedFeature, setSelectedFeature] = useState(null);

  return (
    <section className={styles.featuresSection} aria-label="Key Features">
      <div className={`container ${styles.container}`}>
        <div className={styles.featuresGrid}>
          {FEATURES.map((item) => {
            const IconComponent = item.icon;
            const isSelected = selectedFeature?.id === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setSelectedFeature(isSelected ? null : item)}
                className={`${styles.featureCard} ${isSelected ? styles.cardActive : ''}`}
                id={`feature-btn-${item.id}`}
                type="button"
                aria-expanded={isSelected}
              >
                <div className={styles.iconWrap}>
                  <IconComponent size={24} className={styles.icon} />
                </div>
                <span className={styles.featureTitle}>{item.title}</span>
                <span className={styles.clickHint}>
                  {isSelected ? 'Close info' : 'View info'}
                </span>
              </button>
            );
          })}
        </div>

        {/* Feature Detail Drawer/Popup */}
        {selectedFeature && (
          <div className={styles.detailBox} role="region" aria-live="polite">
            <div className={styles.detailHeader}>
              <div className={styles.detailTitleWrap}>
                <Check size={18} className={styles.checkIcon} />
                <h3 className={styles.detailTitle}>{selectedFeature.title}</h3>
              </div>
              <button
                onClick={() => setSelectedFeature(null)}
                className={styles.closeBtn}
                aria-label="Close feature details"
              >
                <X size={18} />
              </button>
            </div>
            <p className={styles.detailDescription}>{selectedFeature.detail}</p>
          </div>
        )}
      </div>
    </section>
  );
}
