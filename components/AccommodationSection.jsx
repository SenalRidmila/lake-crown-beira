'use client';

import React from 'react';
import { Bed, Users, Maximize2, Check, ArrowRight, Eye, Star, Sparkles } from 'lucide-react';
import { useCurrency } from './CurrencyContext';
import styles from './AccommodationSection.module.css';

export const ROOMS_DATA = [
  {
    id: 'full-apartment',
    name: 'Entire 2-Bedroom Luxury Serviced Residence',
    tag: 'MOST POPULAR • ENTIRE PROPERTY',
    basePriceLkr: 28000,
    image: '/images/hero-beira-lake.jpg',
    gallery: [
      '/images/hero-beira-lake.jpg',
      '/images/living-area.jpg',
      '/images/kitchen.jpg',
      '/images/bedroom1.jpg',
      '/images/bedroom2.jpg',
      '/images/bathroom.jpg',
    ],
    capacity: 'Up to 5 Guests',
    beds: '1 King Bed + 2 Single/Twin Beds + Living Sofa',
    size: '1,150 sq ft / 107 m²',
    rating: '4.98',
    description:
      'The entire private residence reserved exclusively for you. Includes both air-conditioned bedrooms, large living lounge, dining area, fully equipped modern kitchen, luxury bathroom, and private balcony overlooking Beira Lake & Colombo Lotus Tower.',
    features: [
      'Private Lake & Lotus Tower Balcony',
      'Fully Equipped Chef Kitchen',
      'Dual Inverter AC in all rooms',
      '50" 4K Smart TV with Netflix',
      'High-Speed Fiber Optical WiFi',
      'Hot & Cold Rain Shower Bathroom',
      'Washing Machine & Laundry facilities',
      'Free secure gated parking on site',
    ],
  },
  {
    id: 'bedroom1',
    name: 'Master Suite with Beira Lake Balcony (Bedroom 1)',
    tag: 'KING SUITE • LAKESIDE VIEW',
    basePriceLkr: 16500,
    image: '/images/bedroom1.jpg',
    gallery: ['/images/bedroom1.jpg', '/images/bathroom.jpg', '/images/living-area.jpg'],
    capacity: 'Up to 2 Guests',
    beds: '1 Solid Teak King-Size Bed',
    size: '420 sq ft / 39 m²',
    rating: '4.95',
    description:
      'A romantic master retreat featuring a solid teak wood king-size bed, luxury linen, direct sliding glass doors opening to the Beira Lake breeze, air conditioning, reading sconces, and generous wardrobe.',
    features: [
      'Lake View Sliding Glass Balcony',
      'Solid Teak King Bed & Luxury Linens',
      'Whisper-quiet Inverter AC',
      'Dedicated Workstation / Desk',
      'Hot & Cold Water Shower access',
      'High-Speed WiFi & Charging ports',
    ],
  },
  {
    id: 'bedroom2',
    name: 'Deluxe Twin / Family Suite (Bedroom 2)',
    tag: 'SPACIOUS • TWIN OR DOUBLE',
    basePriceLkr: 14000,
    image: '/images/bedroom2.jpg',
    gallery: ['/images/bedroom2.jpg', '/images/bathroom.jpg', '/images/living-area.jpg'],
    capacity: 'Up to 3 Guests',
    beds: '2 Comfortable Single Beds (Configurable to King)',
    size: '380 sq ft / 35 m²',
    rating: '4.92',
    description:
      'Bright, sunny, and peaceful suite designed for families, friends, or colleagues traveling together. Fitted with high-end mattresses, yellow-gold accent linens, air conditioning, and open wooden storage.',
    features: [
      'Flexible Twin or Double arrangement',
      'Whisper-quiet Inverter Air Conditioner',
      'Sunlit garden and skyline windows',
      'Open Nordic wooden wardrobe shelving',
      'Fast Optical Fiber WiFi connection',
      'Hot Rain Shower access',
    ],
  },
];

export default function AccommodationSection({ onOpenBooking, onSelectRoomDetails }) {
  const { formatPrice } = useCurrency();

  return (
    <section id="accommodation" className={styles.accommodationSection}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tagline">STAY IN COLOMBO</span>
          <h2 className="section-title">Our Accommodation & Suites</h2>
          <p className="section-subtitle">
            Tailored comfort overlooking Beira Lake. Book the entire serviced 2-bedroom home
            or choose a private suite for your Colombo visit.
          </p>
        </div>

        {/* Accommodation Cards Grid */}
        <div className={styles.roomsGrid}>
          {ROOMS_DATA.map((room) => (
            <div key={room.id} className={styles.roomCard} id={`room-card-${room.id}`}>
              {/* Image Header with Tag & Badge */}
              <div className={styles.roomImageWrap}>
                <img src={room.image} alt={room.name} className={styles.roomImage} />
                <span className={styles.roomTag}>{room.tag}</span>
                <div className={styles.ratingBadge}>
                  <Star size={13} fill="currentColor" className={styles.starIcon} />
                  <span>{room.rating}</span>
                </div>
              </div>

              {/* Room Content */}
              <div className={styles.roomBody}>
                <div className={styles.headerInfo}>
                  <h3 className={styles.roomTitle}>{room.name}</h3>
                  <div className={styles.priceRow}>
                    <span className={styles.fromText}>From</span>
                    <span className={styles.priceAmount}>{formatPrice(room.basePriceLkr)}</span>
                    <span className={styles.perNight}>/ night</span>
                  </div>
                </div>

                <p className={styles.roomDescription}>{room.description}</p>

                {/* Specs Strip */}
                <div className={styles.specsStrip}>
                  <div className={styles.specItem}>
                    <Users size={16} className={styles.specIcon} />
                    <span>{room.capacity}</span>
                  </div>
                  <div className={styles.specItem}>
                    <Bed size={16} className={styles.specIcon} />
                    <span>{room.beds}</span>
                  </div>
                  <div className={styles.specItem}>
                    <Maximize2 size={16} className={styles.specIcon} />
                    <span>{room.size}</span>
                  </div>
                </div>

                {/* Features Highlights Checklist */}
                <ul className={styles.featuresList}>
                  {room.features.slice(0, 4).map((feat, idx) => (
                    <li key={idx} className={styles.featureItem}>
                      <Check size={15} className={styles.checkIcon} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* Card Actions */}
                <div className={styles.cardActions}>
                  <button
                    onClick={() => onOpenBooking({ suiteType: room.id })}
                    className="btn btn-primary"
                    style={{ flex: 1 }}
                    id={`btn-book-${room.id}`}
                  >
                    <span>BOOK SUITE</span>
                    <ArrowRight size={16} />
                  </button>

                  <button
                    onClick={() => onSelectRoomDetails && onSelectRoomDetails(room)}
                    className="btn btn-outline-gold"
                    id={`btn-details-${room.id}`}
                    title="View Full Room Details & Photos"
                  >
                    <Eye size={16} />
                    <span>DETAILS</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
