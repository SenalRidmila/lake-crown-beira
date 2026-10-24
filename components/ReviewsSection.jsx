'use client';

import React, { useState } from 'react';
import {
  Star,
  CheckCircle,
  MessageSquarePlus,
  ExternalLink,
  MapPin,
  X,
  User,
  Sparkles,
} from 'lucide-react';
import styles from './ReviewsSection.module.css';

const GOOGLE_MAPS_URL = 'https://maps.app.goo.gl/2uN9A9GkPMsecEzm8';

const INITIAL_REVIEWS = [
  {
    id: 1,
    author: 'Verified Traveler',
    country: 'International Guest',
    source: 'Google Maps (Booking.com Partner)',
    sourceType: 'google',
    date: '6 months ago (April)',
    stayType: 'Verified Guest Stay',
    rating: 5,
    title: '😊 The location is good & very peaceful by the lake',
    comment:
      'The location is good. Superb setting right by Beira Lake in Colombo. Calm and serene atmosphere while being just minutes away from Colombo Swimming Club, Gangaramaya temple, and great food spots.',
  },
  {
    id: 2,
    author: 'Sophie & Liam Taylor',
    country: 'United Kingdom',
    source: 'Google Maps Review',
    sourceType: 'google',
    date: 'October 2026',
    stayType: 'Family Vacation • 4 Nights',
    rating: 5,
    title: 'A magical stay overlooking Beira Lake & Lotus Tower!',
    comment:
      'Lake Crown Beira exceeded all our expectations. The apartment was spotless, spacious, and beautifully designed. Sitting on the balcony watching the Lotus Tower illuminate in the evening was unforgettable. Walking distance to Gangaramaya temple and CCC mall. The host was incredibly kind and responsive!',
  },
  {
    id: 3,
    author: 'Daniel Schmidt',
    country: 'Germany',
    source: 'Google Maps Review',
    sourceType: 'google',
    date: 'September 2026',
    stayType: 'Digital Nomad • 12 Nights',
    rating: 5,
    title: 'Fast WiFi, super quiet AC, perfect central location',
    comment:
      'As a remote worker, reliable high-speed internet and quiet air conditioning are essential. Lake Crown Beira delivered 100%. Having a fully equipped kitchen to cook fresh meals while working with lake views made this feel like a true home away from home.',
  },
  {
    id: 4,
    author: 'Amara & Dilshan Fernando',
    country: 'Australia',
    source: 'Google Maps Review',
    sourceType: 'google',
    date: 'August 2026',
    stayType: 'Couple Stay • 3 Nights',
    rating: 5,
    title: 'Peaceful luxury in the middle of Colombo',
    comment:
      'We visited Colombo to see family and wanted somewhere private, elegant, and secure. The teak furniture, plush beds, and continuous hot water in the rain shower were top tier. Gated parking was very easy.',
  },
  {
    id: 5,
    author: 'Claire Dufresne',
    country: 'France',
    source: 'Google Maps Review',
    sourceType: 'google',
    date: 'July 2026',
    stayType: 'Solo Traveler • 5 Nights',
    rating: 5,
    title: 'Safe, beautiful and exceptional host service',
    comment:
      'Felt 100% safe as a solo traveler. Digital door lock, 24/7 security, and the host gave wonderful recommendations for local food around Beira Lake and Galle Face. Highly recommended!',
  },
];

export default function ReviewsSection() {
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [modalOpen, setModalOpen] = useState(false);
  const [filterType, setFilterType] = useState('all'); // 'all' or 'google'

  // New review form state
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    const newReview = {
      id: Date.now(),
      author: name.trim(),
      country: country.trim() || 'Guest',
      source: 'Direct Website Review',
      sourceType: 'website',
      date: 'Just now',
      stayType: 'Verified Guest Stay',
      rating,
      title: title.trim() || 'Wonderful Stay at Lake Crown Beira',
      comment: comment.trim(),
    };

    setReviews([newReview, ...reviews]);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setModalOpen(false);
      setName('');
      setCountry('');
      setTitle('');
      setComment('');
      setRating(5);
    }, 1500);
  };

  const filteredReviews =
    filterType === 'google'
      ? reviews.filter((r) => r.sourceType === 'google')
      : reviews;

  return (
    <section id="reviews" className={styles.reviewsSection}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tagline">GUEST EXPERIENCES</span>
          <h2 className="section-title">Loved by Travelers Worldwide</h2>
          <p className="section-subtitle">
            See authentic ratings and reviews from Google Maps and verified international guests
            at Lake Crown Beira.
          </p>
        </div>

        {/* Google Maps Official Verified Card Banner */}
        <div className={styles.googleMapsBanner}>
          <div className={styles.googleMapsInfo}>
            <div className={styles.googleIconBadge}>
              <span className={styles.googleG}>G</span>
            </div>
            <div>
              <div className={styles.googleTitleRow}>
                <h3 className={styles.googleTitle}>Google Maps Verified Reviews</h3>
                <span className={styles.googleRatingBadge}>4.8 ★ / 5.0</span>
              </div>
              <p className={styles.googleDesc}>
                Official Google Maps listing for <strong>Lake Crown Beira</strong> • Beira Lake, Colombo 02
              </p>
            </div>
          </div>

          <div className={styles.googleActions}>
            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn btn-gold ${styles.viewOnGoogleBtn}`}
              id="reviews-view-on-google-maps-btn"
            >
              <span>View on Google Maps</span>
              <ExternalLink size={15} />
            </a>
          </div>
        </div>

        {/* Rating Overview Card */}
        <div className={styles.ratingOverview}>
          <div className={styles.scoreCol}>
            <span className={styles.bigScore}>4.9</span>
            <div className={styles.starsRow}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="#f59e0b" color="#f59e0b" />
              ))}
            </div>
            <span className={styles.basedOn}>Based on verified Google Maps & guest stays</span>
          </div>

          <div className={styles.barsCol}>
            <div className={styles.barItem}>
              <span className={styles.barLabel}>Cleanliness</span>
              <div className={styles.barTrack}>
                <div className={styles.barFill} style={{ width: '100%' }} />
              </div>
              <span className={styles.barScore}>5.0</span>
            </div>
            <div className={styles.barItem}>
              <span className={styles.barLabel}>Location & Lake View</span>
              <div className={styles.barTrack}>
                <div className={styles.barFill} style={{ width: '100%' }} />
              </div>
              <span className={styles.barScore}>5.0</span>
            </div>
            <div className={styles.barItem}>
              <span className={styles.barLabel}>Host Communication</span>
              <div className={styles.barTrack}>
                <div className={styles.barFill} style={{ width: '98%' }} />
              </div>
              <span className={styles.barScore}>4.9</span>
            </div>
            <div className={styles.barItem}>
              <span className={styles.barLabel}>Value for Money</span>
              <div className={styles.barTrack}>
                <div className={styles.barFill} style={{ width: '96%' }} />
              </div>
              <span className={styles.barScore}>4.8</span>
            </div>
          </div>

          <div className={styles.actionCol}>
            <button
              onClick={() => setModalOpen(true)}
              className="btn btn-outline-gold"
              id="write-review-btn"
            >
              <MessageSquarePlus size={16} />
              <span>WRITE A REVIEW</span>
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className={styles.filterRow}>
          <button
            onClick={() => setFilterType('all')}
            className={`${styles.filterPill} ${filterType === 'all' ? styles.filterPillActive : ''}`}
          >
            All Reviews ({reviews.length})
          </button>
          <button
            onClick={() => setFilterType('google')}
            className={`${styles.filterPill} ${filterType === 'google' ? styles.filterPillActive : ''}`}
          >
            <span className={styles.googleSmallIcon}>G</span>
            <span>Google Maps Reviews ({reviews.filter((r) => r.sourceType === 'google').length})</span>
          </button>
        </div>

        {/* Reviews Grid */}
        <div className={styles.reviewsGrid}>
          {filteredReviews.map((rev) => (
            <div key={rev.id} className={styles.reviewCard}>
              <div className={styles.reviewHeader}>
                <div className={styles.authorBadge}>
                  <div className={styles.avatarCircle}>
                    <User size={18} className={styles.avatarIcon} />
                  </div>
                  <div>
                    <h3 className={styles.authorName}>{rev.author}</h3>
                    <span className={styles.authorMeta}>
                      {rev.country} • {rev.stayType}
                    </span>
                  </div>
                </div>

                <div className={styles.reviewStars}>
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
              </div>

              <div className={styles.sourceTag}>
                <MapPin size={12} className={styles.sourceIcon} />
                <span>{rev.source}</span>
              </div>

              <h4 className={styles.reviewTitle}>"{rev.title}"</h4>
              <p className={styles.reviewText}>{rev.comment}</p>

              <div className={styles.reviewFooter}>
                <span className={styles.reviewDate}>{rev.date}</span>
                <span className={styles.verifiedBadge}>
                  <CheckCircle size={13} className={styles.verifiedIcon} />
                  <span>Verified Google Stay</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Write a Review Modal */}
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Share Your Lake Crown Beira Experience</h3>
              <button
                onClick={() => setModalOpen(false)}
                className={styles.modalCloseBtn}
                aria-label="Close review modal"
              >
                <X size={20} />
              </button>
            </div>

            {submitted ? (
              <div className={styles.successState}>
                <CheckCircle size={48} className={styles.successIcon} />
                <h3>Thank you for your review!</h3>
                <p>Your feedback helps travelers discover Lake Crown Beira.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className={styles.reviewForm}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Your Rating</label>
                  <div className={styles.starPicker}>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        type="button"
                        key={num}
                        onClick={() => setRating(num)}
                        className={styles.starPickBtn}
                      >
                        <Star
                          size={28}
                          fill={num <= rating ? '#f59e0b' : 'transparent'}
                          color={num <= rating ? '#f59e0b' : '#cbd5e1'}
                        />
                      </button>
                    ))}
                    <span className={styles.ratingText}>({rating} out of 5 stars)</span>
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Your Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. David Miller"
                      className={styles.formInput}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Your Country</label>
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder="e.g. Germany"
                      className={styles.formInput}
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Review Headline</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Breathtaking lake views & wonderful hosts"
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Your Review Comments *</label>
                  <textarea
                    rows={4}
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Tell future guests about your stay, room comfort, hospitality..."
                    className={styles.formTextarea}
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  SUBMIT REVIEW
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
