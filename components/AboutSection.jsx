'use client';

import React, { useState } from 'react';
import { ArrowRight, ChevronDown, ChevronUp, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';
import styles from './AboutSection.module.css';

const ROOM_PREVIEWS = [
  {
    id: 'living',
    name: 'LIVING AREA',
    image: '/images/living-area.jpg',
    tag: 'Comfort & Elegance',
    caption: 'Airy lounge with smart TV, dining space and lake breeze',
  },
  {
    id: 'kitchen',
    name: 'KITCHEN',
    image: '/images/kitchen.jpg',
    tag: 'Fully Equipped',
    caption: 'Modern cabinetry, refrigerator, gas hob & cookware',
  },
  {
    id: 'bedroom1',
    name: 'BEDROOM 1',
    image: '/images/bedroom1.jpg',
    tag: 'Master King Suite',
    caption: 'Solid teak king bed, AC, and Beira Lake balcony access',
  },
  {
    id: 'bedroom2',
    name: 'BEDROOM 2',
    image: '/images/bedroom2.jpg',
    tag: 'Deluxe Twin Suite',
    caption: 'Two cozy beds, AC, bright windows & generous wardrobe',
  },
];

export default function AboutSection({ onSelectImage }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section id="about" className={styles.aboutSection}>
      <div className={`container ${styles.container}`}>
        <div className={styles.aboutGrid}>
          {/* Left Column: Welcome text and Read More */}
          <div className={styles.textCol}>
            <div className={styles.badgeLine}>
              <span className={styles.welcomeTag}>WELCOME TO</span>
            </div>

            <h2 className={styles.heading}>LAKE CROWN BEIRA</h2>

            <p className={styles.mainDescription}>
              A serene and elegant place to relax with your family or loved ones.
              Overlooking the beautiful Beira Lake, our home offers you comfort,
              convenience and memorable stays in Colombo.
            </p>

            <div className={styles.highlightsList}>
              <div className={styles.highlightItem}>
                <CheckCircle2 size={18} className={styles.highlightIcon} />
                <span>Prime Colombo 02 location overlooking Beira Lake & Lotus Tower</span>
              </div>
              <div className={styles.highlightItem}>
                <CheckCircle2 size={18} className={styles.highlightIcon} />
                <span>Walking distance to Gangaramaya Temple & Colombo City Centre (CCC)</span>
              </div>
              <div className={styles.highlightItem}>
                <CheckCircle2 size={18} className={styles.highlightIcon} />
                <span>Peaceful residential sanctuary with 24/7 security and digital locks</span>
              </div>
            </div>

            {/* Expandable Story Section */}
            {isExpanded && (
              <div className={styles.expandedContent}>
                <p>
                  At Lake Crown Beira, we believe a great vacation or business trip begins
                  with a sanctuary you look forward to returning to each evening. Our 2-bedroom
                  apartment has been meticulously curated with warm teak finishes, modern climate
                  control, plush hotel mattresses, and an authentic Sri Lankan touch of warm hospitality.
                </p>
                <p>
                  Whether you are waking up to misty lake sunrises, cooking a fresh meal in your
                  private kitchen, or strolling to Seema Malakaya temple just minutes away, Lake
                  Crown Beira provides unmatched tranquility without sacrificing proximity to
                  Colombo’s best dining, shopping malls, and cultural treasures.
                </p>
              </div>
            )}

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`btn btn-primary ${styles.readMoreBtn}`}
              id="about-read-more-btn"
              aria-expanded={isExpanded}
            >
              <span>{isExpanded ? 'READ LESS' : 'READ MORE'}</span>
              {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>

          {/* Right Column: 4 Room Photos Grid matching original design */}
          <div className={styles.photosCol}>
            <div className={styles.photosGrid}>
              {ROOM_PREVIEWS.map((item) => (
                <div
                  key={item.id}
                  className={styles.photoCard}
                  onClick={() => onSelectImage && onSelectImage(item.image, item.name)}
                  role="button"
                  tabIndex={0}
                  id={`about-card-${item.id}`}
                >
                  <div className={styles.imageWrap}>
                    <img
                      src={item.image}
                      alt={`Lake Crown Beira ${item.name}`}
                      className={styles.roomImage}
                    />
                    <div className={styles.cardOverlay}>
                      <span className={styles.cardTag}>{item.tag}</span>
                      <span className={styles.cardCaption}>{item.caption}</span>
                    </div>
                  </div>
                  <div className={styles.cardFooter}>
                    <span className={styles.cardTitle}>{item.name}</span>
                    <Sparkles size={14} className={styles.sparkleIcon} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
