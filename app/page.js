'use client';

import React, { useState } from 'react';
import { CurrencyProvider } from '@/components/CurrencyContext';
import TopBar from '@/components/TopBar';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import KeyFeaturesBar from '@/components/KeyFeaturesBar';
import AboutSection from '@/components/AboutSection';
import AccommodationSection from '@/components/AccommodationSection';
import AmenitiesSection from '@/components/AmenitiesSection';
import GallerySection from '@/components/GallerySection';
import AttractionsSection from '@/components/AttractionsSection';
import GoogleMapSection from '@/components/GoogleMapSection';
import ReviewsSection from '@/components/ReviewsSection';
import FaqSection from '@/components/FaqSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';
import RoomDetailModal from '@/components/RoomDetailModal';
import CookieBanner from '@/components/CookieBanner';

export default function Home() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingData, setBookingData] = useState({});
  const [activeRoomDetail, setActiveRoomDetail] = useState(null);
  const [cookieModalForceOpen, setCookieModalForceOpen] = useState(false);

  const handleOpenBooking = (initialParams = {}) => {
    setBookingData(initialParams);
    setBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setBookingOpen(false);
  };

  const handleOpenRoomDetails = (room) => {
    setActiveRoomDetail(room);
  };

  const handleCloseRoomDetails = () => {
    setActiveRoomDetail(null);
  };

  return (
    <CurrencyProvider>
      <div className="site-wrapper">
        {/* Top Header Bar from original banner design */}
        <TopBar />

        {/* Sticky Navbar with Active Scrollspy Highlighting */}
        <Navbar onOpenBooking={() => handleOpenBooking()} />

        {/* Main Content Sections */}
        <main id="main-content">
          <Hero onOpenBooking={handleOpenBooking} />
          <KeyFeaturesBar />
          <AboutSection onSelectImage={(img, name) => handleOpenBooking()} />
          <AccommodationSection
            onOpenBooking={handleOpenBooking}
            onSelectRoomDetails={handleOpenRoomDetails}
          />
          <AmenitiesSection />
          <GallerySection />
          <AttractionsSection />
          <GoogleMapSection />
          <ReviewsSection />
          <FaqSection />
          <ContactSection />
        </main>

        {/* Footer matching bottom bar design */}
        <Footer onOpenCookies={() => setCookieModalForceOpen(true)} />

        {/* Modals & Dialogs */}
        <BookingModal
          isOpen={bookingOpen}
          onClose={handleCloseBooking}
          initialData={bookingData}
        />

        <RoomDetailModal
          room={activeRoomDetail}
          onClose={handleCloseRoomDetails}
          onBookRoom={handleOpenBooking}
        />

        {/* Cookies Consent Banner & Settings Modal */}
        <CookieBanner
          forceOpen={cookieModalForceOpen}
          onCloseForce={() => setCookieModalForceOpen(false)}
        />
      </div>
    </CurrencyProvider>
  );
}
