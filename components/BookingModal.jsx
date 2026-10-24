'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  Calendar,
  Users,
  Home,
  CheckCircle2,
  Phone,
  MessageCircle,
  ShieldCheck,
  Plane,
  Sparkles,
} from 'lucide-react';
import { useCurrency } from './CurrencyContext';
import { ROOMS_DATA } from './AccommodationSection';
import styles from './BookingModal.module.css';

export default function BookingModal({ isOpen, onClose, initialData = {} }) {
  const { formatPrice, currency } = useCurrency();

  const today = new Date().toISOString().split('T')[0];
  const defaultCheckout = new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0];

  const [suiteType, setSuiteType] = useState('full-apartment');
  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(defaultCheckout);
  const [guests, setGuests] = useState(2);
  const [airportPickup, setAirportPickup] = useState(false);
  const [earlyCheckIn, setEarlyCheckIn] = useState(false);

  // Guest details
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  const [step, setStep] = useState(1); // 1: Dates & Room, 2: Guest Info, 3: Confirmation
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    if (initialData.suiteType) setSuiteType(initialData.suiteType);
    if (initialData.checkIn) setCheckIn(initialData.checkIn);
    if (initialData.checkOut) setCheckOut(initialData.checkOut);
    if (initialData.guests) setGuests(initialData.guests);
  }, [initialData]);

  if (!isOpen) return null;

  // Calculate nights
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diffTime = Math.max(0, end - start);
  const nights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  const selectedRoom = ROOMS_DATA.find((r) => r.id === suiteType) || ROOMS_DATA[0];
  const roomTotalLkr = selectedRoom.basePriceLkr * nights;
  const airportCostLkr = airportPickup ? 12000 : 0; // ~40 USD
  const totalLkr = roomTotalLkr + airportCostLkr;

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step === 1) {
      if (new Date(checkOut) <= new Date(checkIn)) {
        setValidationError('Check-out date must be after check-in date.');
        return;
      }
      setValidationError('');
      setStep(2);
    } else if (step === 2) {
      if (!fullName.trim() || !email.trim() || !phone.trim()) {
        setValidationError('Please fill in your name, email, and phone number.');
        return;
      }
      const refNumber = `LCB-${Math.floor(100000 + Math.random() * 900000)}`;
      const bookingData = {
        refNumber,
        roomName: selectedRoom.name,
        checkIn,
        checkOut,
        nights,
        guests,
        totalLkr,
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        airportPickup,
        earlyCheckIn,
        specialRequests: specialRequests.trim(),
      };
      setConfirmedBooking(bookingData);
      setStep(3);
    }
  };

  const generateWhatsAppUrl = () => {
    if (!confirmedBooking) return '';
    const text = `*New Reservation Request - Lake Crown Beira*
Ref: ${confirmedBooking.refNumber}
Guest: ${confirmedBooking.fullName}
Phone: ${confirmedBooking.phone}
Email: ${confirmedBooking.email}
Suite: ${confirmedBooking.roomName}
Check-In: ${confirmedBooking.checkIn}
Check-Out: ${confirmedBooking.checkOut} (${confirmedBooking.nights} nights)
Guests: ${confirmedBooking.guests}
Airport Pickup: ${confirmedBooking.airportPickup ? 'Yes' : 'No'}
Total Estimate: ${formatPrice(confirmedBooking.totalLkr)}
Special Requests: ${confirmedBooking.specialRequests || 'None'}`;

    return `https://wa.me/94766418199?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.modalHeader}>
          <div className={styles.headerTitleWrap}>
            <span className={styles.crownEmblem}>👑</span>
            <div>
              <h3 className={styles.modalHeading}>Lake Crown Beira Reservation</h3>
              <p className={styles.modalSub}>
                {step === 1 && 'Step 1 of 3: Choose Dates & Accommodation'}
                {step === 2 && 'Step 2 of 3: Guest & Contact Details'}
                {step === 3 && 'Booking Confirmed! Reference Details'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className={styles.closeBtn} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Stepper Indicator */}
        <div className={styles.stepperBar}>
          <div className={`${styles.stepIndicator} ${step >= 1 ? styles.stepActive : ''}`}>
            <span>1</span>
            <small>Dates</small>
          </div>
          <div className={styles.stepLine} />
          <div className={`${styles.stepIndicator} ${step >= 2 ? styles.stepActive : ''}`}>
            <span>2</span>
            <small>Guests</small>
          </div>
          <div className={styles.stepLine} />
          <div className={`${styles.stepIndicator} ${step >= 3 ? styles.stepActive : ''}`}>
            <span>3</span>
            <small>Confirm</small>
          </div>
        </div>

        {validationError && (
          <div className={styles.errorBanner}>{validationError}</div>
        )}

        {/* Step 1: Dates & Room */}
        {step === 1 && (
          <form onSubmit={handleNextStep} className={styles.modalBody}>
            <div className={styles.formSection}>
              <label className={styles.sectionLabel}>Select Accommodation</label>
              <div className={styles.roomsList}>
                {ROOMS_DATA.map((r) => (
                  <label
                    key={r.id}
                    className={`${styles.roomRadioCard} ${
                      suiteType === r.id ? styles.roomSelected : ''
                    }`}
                  >
                    <input
                      type="radio"
                      name="suiteType"
                      value={r.id}
                      checked={suiteType === r.id}
                      onChange={(e) => setSuiteType(e.target.value)}
                      className={styles.radioInput}
                    />
                    <div className={styles.roomRadioContent}>
                      <span className={styles.roomRadioName}>{r.name}</span>
                      <span className={styles.roomRadioPrice}>
                        {formatPrice(r.basePriceLkr)} / night
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.fieldGroup}>
                <label className={styles.inputLabel}>
                  <Calendar size={14} /> Check-In Date
                </label>
                <input
                  type="date"
                  value={checkIn}
                  min={today}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className={styles.modalInput}
                  required
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.inputLabel}>
                  <Calendar size={14} /> Check-Out Date
                </label>
                <input
                  type="date"
                  value={checkOut}
                  min={checkIn || today}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className={styles.modalInput}
                  required
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.fieldGroup}>
                <label className={styles.inputLabel}>
                  <Users size={14} /> Number of Guests
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(parseInt(e.target.value, 10))}
                  className={styles.modalSelect}
                >
                  <option value={1}>1 Guest</option>
                  <option value={2}>2 Guests</option>
                  <option value={3}>3 Guests</option>
                  <option value={4}>4 Guests</option>
                  <option value={5}>5 Guests (Max for 2-Bed)</option>
                </select>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.inputLabel}>Stay Length</label>
                <div className={styles.nightsBadge}>
                  {nights} {nights === 1 ? 'Night' : 'Nights'}
                </div>
              </div>
            </div>

            {/* Add-ons */}
            <div className={styles.addOnsBox}>
              <label className={styles.addOnItem}>
                <input
                  type="checkbox"
                  checked={airportPickup}
                  onChange={(e) => setAirportPickup(e.target.checked)}
                />
                <div className={styles.addOnText}>
                  <span>Airport Transfer (CMB to Lake Crown Beira)</span>
                  <small>+ {formatPrice(12000)} flat rate in private A/C car</small>
                </div>
              </label>

              <label className={styles.addOnItem}>
                <input
                  type="checkbox"
                  checked={earlyCheckIn}
                  onChange={(e) => setEarlyCheckIn(e.target.checked)}
                />
                <div className={styles.addOnText}>
                  <span>Early Check-in / Late Check-out Request</span>
                  <small>Subject to availability (complimentary)</small>
                </div>
              </label>
            </div>

            {/* Total Summary */}
            <div className={styles.summaryBar}>
              <div>
                <span className={styles.summaryTotalLabel}>Estimated Total:</span>
                <span className={styles.summaryTotalPrice}>{formatPrice(totalLkr)}</span>
                <small className={styles.currencyNote}> (Currency: {currency})</small>
              </div>
              <button type="submit" className="btn btn-primary" id="booking-next-btn">
                <span>CONTINUE</span>
              </button>
            </div>
          </form>
        )}

        {/* Step 2: Guest Details */}
        {step === 2 && (
          <form onSubmit={handleNextStep} className={styles.modalBody}>
            <div className={styles.formRow}>
              <div className={styles.fieldGroup}>
                <label className={styles.inputLabel}>Full Name *</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Michael Perera"
                  className={styles.modalInput}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.inputLabel}>Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. michael@example.com"
                  className={styles.modalInput}
                />
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.inputLabel}>Phone / WhatsApp Number *</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. +94 77 123 4567"
                className={styles.modalInput}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.inputLabel}>Special Requests or Flight Arrival Time</label>
              <textarea
                rows={3}
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder="e.g. Arriving on flight UL504 at 8 PM, would love extra pillows..."
                className={styles.modalTextarea}
              />
            </div>

            <div className={styles.securityNote}>
              <ShieldCheck size={16} className={styles.shieldIcon} />
              <span>
                Your privacy is protected. No payment required upfront — pay upon check-in.
              </span>
            </div>

            <div className={styles.buttonRow}>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="btn btn-outline-gold"
              >
                BACK
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                id="booking-confirm-btn"
              >
                CONFIRM RESERVATION
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && confirmedBooking && (
          <div className={styles.modalBody}>
            <div className={styles.confirmationState}>
              <div className={styles.confirmCheckCircle}>
                <CheckCircle2 size={44} className={styles.confirmCheckIcon} />
              </div>
              <h3 className={styles.confirmHeading}>Reservation Request Confirmed!</h3>
              <p className={styles.confirmRef}>
                Booking Reference: <strong>{confirmedBooking.refNumber}</strong>
              </p>

              <div className={styles.confirmReceipt}>
                <div className={styles.receiptRow}>
                  <span>Suite:</span>
                  <strong>{confirmedBooking.roomName}</strong>
                </div>
                <div className={styles.receiptRow}>
                  <span>Dates:</span>
                  <strong>
                    {confirmedBooking.checkIn} to {confirmedBooking.checkOut} (
                    {confirmedBooking.nights} nights)
                  </strong>
                </div>
                <div className={styles.receiptRow}>
                  <span>Guests:</span>
                  <strong>{confirmedBooking.guests} Guests</strong>
                </div>
                <div className={styles.receiptRow}>
                  <span>Guest Name:</span>
                  <strong>{confirmedBooking.fullName}</strong>
                </div>
                <div className={styles.receiptRow}>
                  <span>Total Estimated:</span>
                  <strong className={styles.receiptTotal}>
                    {formatPrice(confirmedBooking.totalLkr)}
                  </strong>
                </div>
              </div>

              <p className={styles.receiptNote}>
                A confirmation has been logged. For instantaneous priority confirmation, you can
                message the host directly on WhatsApp with your reference number.
              </p>

              <div className={styles.confirmActions}>
                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{
                    width: '100%',
                    background: '#25D366',
                    borderColor: '#25D366',
                    marginBottom: '10px',
                  }}
                  id="confirm-whatsapp-btn"
                >
                  <MessageCircle size={18} />
                  <span>CONFIRM ON WHATSAPP NOW</span>
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  className="btn btn-outline-gold"
                  style={{ width: '100%' }}
                >
                  DONE
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
