'use client';

import React from 'react';
import { MapPin, Navigation, Clock, ExternalLink } from 'lucide-react';
import styles from './AttractionsSection.module.css';

const ATTRACTIONS = [
  {
    id: 1,
    title: 'Seema Malakaya & Gangaramaya Temple',
    distance: '350 meters',
    travelTime: '4 min walk',
    type: 'Cultural & Spiritual',
    image: '/images/seema-malakaya.jpg',
    description:
      'The world-famous floating temple on Beira Lake designed by maestro architect Geoffrey Bawa. Features serene Buddha statues, bodhi tree, and meditative waters.',
    mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Seema+Malakaya+Colombo',
  },
  {
    id: 2,
    title: 'Colombo Lotus Tower (Nelum Kuluna)',
    distance: '1.2 km',
    travelTime: '5 min ride / Direct lake view',
    type: 'Landmark & Dining',
    image: '/images/hero-beira-lake.jpg',
    description:
      'South Asia’s tallest tower standing 350 meters tall. Enjoy 360° observation decks, revolving skyline dining, and vibrant nightly LED illumination.',
    mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Colombo+Lotus+Tower',
  },
  {
    id: 3,
    title: 'Colombo City Centre (CCC) Mall',
    distance: '500 meters',
    travelTime: '6 min walk',
    type: 'Shopping & Dining',
    image: '/images/living-area.jpg',
    description:
      'Premier upscale shopping center right by Beira Lake featuring Scope Cinemas, international retail brands, a gourmet food court, and Cargill’s supermarket.',
    mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Colombo+City+Centre',
  },
  {
    id: 4,
    title: 'Galle Face Green & Ocean Promenade',
    distance: '1.5 km',
    travelTime: '6 min ride',
    type: 'Sunset & Beachfront',
    image: '/images/bedroom1.jpg',
    description:
      'Colombo’s iconic ocean promenade along the Indian Ocean. Perfect for sunset strolls, ocean air, flying kites, and tasting authentic street food.',
    mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Galle+Face+Green+Colombo',
  },
];

export default function AttractionsSection() {
  return (
    <section id="attractions" className={styles.attractionsSection}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tagline">EXPLORE COLOMBO</span>
          <h2 className="section-title">Nearby Landmarks & Attractions</h2>
          <p className="section-subtitle">
            Lake Crown Beira places you in the heart of the capital. Discover temples,
            lakeside walks, modern malls, and coastal sunsets within minutes.
          </p>
        </div>

        {/* Attractions Grid */}
        <div className={styles.grid}>
          {ATTRACTIONS.map((spot) => (
            <div key={spot.id} className={styles.attractionCard} id={`attraction-${spot.id}`}>
              <div className={styles.imageWrap}>
                <img src={spot.image} alt={spot.title} className={styles.spotImage} />
                <span className={styles.spotType}>{spot.type}</span>
              </div>

              <div className={styles.cardContent}>
                <div className={styles.badgeRow}>
                  <div className={styles.distanceBadge}>
                    <MapPin size={13} className={styles.badgeIcon} />
                    <span>{spot.distance}</span>
                  </div>
                  <div className={styles.timeBadge}>
                    <Clock size={13} className={styles.badgeIcon} />
                    <span>{spot.travelTime}</span>
                  </div>
                </div>

                <h3 className={styles.spotTitle}>{spot.title}</h3>
                <p className={styles.spotDescription}>{spot.description}</p>

                <a
                  href={spot.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.directionsLink}
                  id={`directions-link-${spot.id}`}
                >
                  <Navigation size={15} />
                  <span>Get Directions</span>
                  <ExternalLink size={13} className={styles.extIcon} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
