'use client';

import React, { useState } from 'react';
import { ZoomIn, X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import styles from './GallerySection.module.css';

export const GALLERY_ITEMS = [
  {
    id: 1,
    title: 'Lake Crown Beira & Colombo Lotus Tower',
    category: 'lake',
    src: '/images/hero-beira-lake.jpg',
    caption: 'Serene dusk view of Lake Crown Beira with the iconic Colombo Lotus Tower illuminated across Beira Lake.',
  },
  {
    id: 2,
    title: 'Living Lounge & Lakeside Balcony',
    category: 'living',
    src: '/images/living-area.jpg',
    caption: 'Sunlit living room with plush sofas, teak dining set, ambient lighting, and views of the lake.',
  },
  {
    id: 3,
    title: 'Master Suite Bedroom 1',
    category: 'bedrooms',
    src: '/images/bedroom1.jpg',
    caption: 'Solid teak king-size bed, luxury linens, air conditioning, reading sconces, and private balcony access.',
  },
  {
    id: 4,
    title: 'Chef Kitchen & Dining Space',
    category: 'kitchen',
    src: '/images/kitchen.jpg',
    caption: 'Modern cabinetry, refrigerator, gas hob, microwave oven, electric kettle, and cookware.',
  },
  {
    id: 5,
    title: 'Deluxe Twin Suite Bedroom 2',
    category: 'bedrooms',
    src: '/images/bedroom2.jpg',
    caption: 'Comfortable twin bedding with warm yellow runners, air conditioning, wardrobe, and garden window.',
  },
  {
    id: 6,
    title: 'Walk-in Rain Shower & Vanity',
    category: 'kitchen',
    src: '/images/bathroom.jpg',
    caption: 'Luxury bathroom with 24/7 hot and cold water mixer, glass walk-in rain shower, and backlit vanity.',
  },
  {
    id: 7,
    title: 'Seema Malakaya Floating Temple',
    category: 'lake',
    src: '/images/seema-malakaya.jpg',
    caption: 'The famous Geoffrey Bawa-designed floating temple on Beira Lake, just a 350-meter scenic stroll away.',
  },
];

const CATEGORIES = [
  { id: 'all', label: 'ALL PHOTOS' },
  { id: 'bedrooms', label: 'BEDROOMS' },
  { id: 'living', label: 'LIVING & DINING' },
  { id: 'kitchen', label: 'KITCHEN & BATH' },
  { id: 'lake', label: 'BEIRA LAKE & CITY' },
];

export default function GallerySection({ selectedImage, setSelectedImage }) {
  const [filter, setFilter] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filteredItems =
    filter === 'all'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === filter);

  const openLightbox = (index) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev + 1) % filteredItems.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  return (
    <section id="gallery" className={styles.gallerySection}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tagline">PHOTO TOUR</span>
          <h2 className="section-title">Experience Lake Crown Beira</h2>
          <p className="section-subtitle">
            Take a visual tour of our modern serviced residence, peaceful interiors,
            and prime waterfront surroundings.
          </p>
        </div>

        {/* Filter Pills */}
        <div className={styles.filterBar}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`${styles.filterBtn} ${filter === cat.id ? styles.filterActive : ''}`}
              id={`gallery-filter-${cat.id}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className={styles.galleryGrid}>
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              className={`${styles.galleryCard} ${idx === 0 ? styles.featuredCard : ''}`}
              onClick={() => openLightbox(idx)}
              role="button"
              tabIndex={0}
              id={`gallery-item-${item.id}`}
            >
              <img src={item.src} alt={item.title} className={styles.galleryImg} />
              <div className={styles.overlay}>
                <div className={styles.zoomCircle}>
                  <ZoomIn size={20} className={styles.zoomIcon} />
                </div>
                <h4 className={styles.itemTitle}>{item.title}</h4>
                <p className={styles.itemCaption}>{item.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="modal-overlay" onClick={closeLightbox}>
          <div
            className={styles.lightboxContent}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className={styles.lightboxCloseBtn}
              aria-label="Close photo lightbox"
              id="lightbox-close-btn"
            >
              <X size={26} />
            </button>

            {/* Navigation Arrows */}
            <button
              onClick={prevImage}
              className={`${styles.navArrow} ${styles.prevArrow}`}
              aria-label="Previous photo"
              id="lightbox-prev-btn"
            >
              <ChevronLeft size={32} />
            </button>

            <button
              onClick={nextImage}
              className={`${styles.navArrow} ${styles.nextArrow}`}
              aria-label="Next photo"
              id="lightbox-next-btn"
            >
              <ChevronRight size={32} />
            </button>

            {/* Main Lightbox Image */}
            <div className={styles.lightboxImageWrap}>
              <img
                src={filteredItems[lightboxIndex].src}
                alt={filteredItems[lightboxIndex].title}
                className={styles.lightboxImage}
              />
            </div>

            {/* Lightbox Info Bar */}
            <div className={styles.lightboxInfo}>
              <div className={styles.lightboxTitleRow}>
                <h3 className={styles.lightboxTitle}>
                  {filteredItems[lightboxIndex].title}
                </h3>
                <span className={styles.lightboxCounter}>
                  {lightboxIndex + 1} / {filteredItems.length}
                </span>
              </div>
              <p className={styles.lightboxCaption}>
                {filteredItems[lightboxIndex].caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
