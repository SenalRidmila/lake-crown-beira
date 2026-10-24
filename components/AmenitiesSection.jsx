'use client';

import React, { useState } from 'react';
import {
  UtensilsCrossed,
  Wind,
  Droplets,
  Wifi,
  Tv,
  Shirt,
  ShieldCheck,
  Car,
  Compass,
  Coffee,
  CheckCircle,
} from 'lucide-react';
import styles from './AmenitiesSection.module.css';

const AMENITY_CATEGORIES = [
  {
    id: 'kitchen',
    title: 'Kitchen & Dining',
    icon: UtensilsCrossed,
    items: [
      'Gas cooking stovetop & range hood',
      'Microwave oven for quick warming',
      'Double-door refrigerator & freezer',
      'Electric water kettle & tea/coffee station',
      'Cookware: frying pans, saucepans & knives',
      'Fine dinner plates, bowls, cups & cutlery',
      'Spacious 4-seat wooden dining table',
      'Dishwashing sink, detergents & sponges',
    ],
  },
  {
    id: 'comfort',
    title: 'Climate & Comfort',
    icon: Wind,
    items: [
      'Dual inverter quiet air conditioners in all bedrooms',
      'Living area independent air conditioning',
      'High-velocity silent ceiling fans',
      'Blackout window curtains for restful sleep',
      'Premium orthopaedic spring & foam mattresses',
      'Hypoallergenic pillows & crisp hotel cotton linens',
      'Private balcony with Beira Lake & Lotus Tower view',
      'Soundproofed glass sliding windows',
    ],
  },
  {
    id: 'bathroom',
    title: 'Bathroom & Hygiene',
    icon: Droplets,
    items: [
      '24/7 high-pressure hot and cold water system',
      'Glass-enclosed luxury walk-in rain shower',
      'Large illuminated vanity mirror',
      'Fluffy bath towels, hand towels & floor mats',
      'Organic shampoo, body wash & hand soaps',
      'High-power ionic hair dryer',
      'Modern western dual-flush toilet & bidet spray',
    ],
  },
  {
    id: 'tech',
    title: 'Tech & Connectivity',
    icon: Wifi,
    items: [
      'Ultra high-speed optical fiber WiFi (unlimited)',
      '50" 4K Smart TV with Netflix, YouTube & Cable',
      'Universal power outlets & USB bedside charging',
      'Dedicated ergonomic work desk & chair',
      'Intercom phone for front desk / host communication',
    ],
  },
  {
    id: 'laundry',
    title: 'Laundry & Convenience',
    icon: Shirt,
    items: [
      'Fully automatic washing machine on premises',
      'Steam iron and foldable ironing board',
      'Balcony clothes drying rack & pegs',
      'Complimentary laundry detergent pods provided',
      'Extra pillows and linen changes upon request',
    ],
  },
  {
    id: 'safety',
    title: 'Safety & Security',
    icon: ShieldCheck,
    items: [
      '24/7 CCTV surveillance in building entryways',
      'Keyless digital smart lock / secure passcode access',
      'Gated compound with security personnel on duty',
      'First aid emergency kit inside the apartment',
      'Fire extinguisher & safety emergency contacts',
    ],
  },
];

export default function AmenitiesSection() {
  const [activeTab, setActiveTab] = useState('kitchen');

  return (
    <section id="amenities" className={styles.amenitiesSection}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tagline">EVERYTHING YOU NEED</span>
          <h2 className="section-title">Premium Stay Amenities</h2>
          <p className="section-subtitle">
            Whether staying for a weekend getaway or an extended month in Colombo,
            Lake Crown Beira provides every modern comfort for an effortless stay.
          </p>
        </div>

        {/* Categories Tab Selector */}
        <div className={styles.categoryTabs} role="tablist">
          {AMENITY_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`${styles.tabBtn} ${isActive ? styles.tabActive : ''}`}
                role="tab"
                aria-selected={isActive}
                id={`tab-${cat.id}`}
              >
                <Icon size={18} className={styles.tabIcon} />
                <span>{cat.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Category Display Panel */}
        <div className={styles.panelWrap}>
          {AMENITY_CATEGORIES.map((cat) => {
            if (cat.id !== activeTab) return null;
            const Icon = cat.icon;

            return (
              <div key={cat.id} className={styles.categoryPanel} role="tabpanel">
                <div className={styles.panelHeader}>
                  <div className={styles.panelIconCircle}>
                    <Icon size={26} className={styles.panelHeaderIcon} />
                  </div>
                  <div>
                    <h3 className={styles.panelTitle}>{cat.title}</h3>
                    <p className={styles.panelDesc}>
                      Designed for total convenience and peace of mind during your stay.
                    </p>
                  </div>
                </div>

                <div className={styles.itemsGrid}>
                  {cat.items.map((item, idx) => (
                    <div key={idx} className={styles.itemCard}>
                      <CheckCircle size={18} className={styles.itemCheck} />
                      <span className={styles.itemText}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
