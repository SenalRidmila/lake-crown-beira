'use client';

import React, { useState } from 'react';
import { X, Bed, Users, Maximize2, CheckCircle, ArrowRight, Star } from 'lucide-react';
import { useCurrency } from './CurrencyContext';
import styles from './RoomDetailModal.module.css';

export default function RoomDetailModal({ room, onClose, onBookRoom }) {
  const { formatPrice } = useCurrency();
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  if (!room) return null;

  const gallery = room.gallery && room.gallery.length > 0 ? room.gallery : [room.image];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div>
            <span className={styles.tag}>{room.tag}</span>
            <h3 className={styles.title}>{room.name}</h3>
          </div>
          <button onClick={onClose} className={styles.closeBtn} aria-label="Close room details">
            <X size={20} />
          </button>
        </div>

        <div className={styles.body}>
          {/* Main Photo Gallery Slider */}
          <div className={styles.galleryWrap}>
            <div className={styles.mainImageFrame}>
              <img
                src={gallery[activeImgIndex]}
                alt={room.name}
                className={styles.mainImage}
              />
            </div>
            {gallery.length > 1 && (
              <div className={styles.thumbnailsRow}>
                {gallery.map((thumb, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImgIndex(idx)}
                    className={`${styles.thumbBtn} ${
                      activeImgIndex === idx ? styles.thumbActive : ''
                    }`}
                  >
                    <img src={thumb} alt={`Thumbnail ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Specs */}
          <div className={styles.specsRow}>
            <div className={styles.specBox}>
              <Users size={16} className={styles.specIcon} />
              <span>{room.capacity}</span>
            </div>
            <div className={styles.specBox}>
              <Bed size={16} className={styles.specIcon} />
              <span>{room.beds}</span>
            </div>
            <div className={styles.specBox}>
              <Maximize2 size={16} className={styles.specIcon} />
              <span>{room.size}</span>
            </div>
            <div className={styles.specBox}>
              <Star size={16} fill="#f59e0b" color="#f59e0b" />
              <span>{room.rating} Rating</span>
            </div>
          </div>

          <p className={styles.description}>{room.description}</p>

          {/* Full Features Checklist */}
          <div className={styles.featuresSection}>
            <h4 className={styles.featuresHeading}>Included in this suite:</h4>
            <div className={styles.featuresGrid}>
              {room.features.map((feat, idx) => (
                <div key={idx} className={styles.featureItem}>
                  <CheckCircle size={16} className={styles.checkIcon} />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer with Price & Book Action */}
        <div className={styles.footer}>
          <div className={styles.priceCol}>
            <span className={styles.priceLabel}>Price per night:</span>
            <div className={styles.priceAmount}>
              {formatPrice(room.basePriceLkr)}
              <small> / night</small>
            </div>
          </div>

          <button
            onClick={() => {
              onClose();
              onBookRoom({ suiteType: room.id });
            }}
            className="btn btn-primary"
            id="room-modal-book-btn"
          >
            <span>BOOK THIS ROOM</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
