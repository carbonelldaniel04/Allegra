/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CoursesSection } from './components/CoursesSection';
import { ServicesSection } from './components/ServicesSection';
import { BeforeAfterGallery } from './components/BeforeAfterGallery';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { IntelligentChat } from './components/IntelligentChat';
import { AdminDashboard } from './components/AdminCRM/AdminDashboard';
import { MediaProvider } from './context/MediaContext';
import { MediaManagerModal } from './components/MediaManager/MediaManagerModal';

function AppContent() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingServiceId, setBookingServiceId] = useState<string | undefined>(undefined);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const handleOpenBooking = (serviceId?: string) => {
    setBookingServiceId(serviceId);
    setIsBookingOpen(true);
  };

  const handleOpenChat = (initialPrompt?: string) => {
    setIsChatOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F8F5F2] text-[#2C2C2C] font-body selection:bg-[#C8A96B] selection:text-white relative">
      {/* Top Luxury Navigation */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenChat={() => handleOpenChat()}
        onToggleAdmin={() => setIsAdminOpen(!isAdminOpen)}
        isAdminOpen={isAdminOpen}
      />

      {/* Main Landing Sections */}
      <main>
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          onOpenChat={() => handleOpenChat()}
        />

        <CoursesSection
          onOpenChat={(courseTitle) => handleOpenChat(courseTitle)}
        />

        <ServicesSection
          onOpenBooking={(serviceId) => handleOpenBooking(serviceId)}
          onOpenChat={(serviceTitle) => handleOpenChat(serviceTitle)}
        />

        <BeforeAfterGallery
          onOpenBooking={() => handleOpenBooking()}
          onOpenChat={(query) => handleOpenChat(query)}
        />

        <TestimonialsSection />

        <FaqSection
          onOpenChat={() => handleOpenChat()}
        />

        <ContactSection
          onOpenBooking={() => handleOpenBooking()}
          onOpenChat={() => handleOpenChat()}
        />
      </main>

      {/* Studio Footer */}
      <Footer
        onToggleAdmin={() => setIsAdminOpen(true)}
        onOpenBooking={() => handleOpenBooking()}
        onOpenChat={() => handleOpenChat()}
      />

      {/* Interactive Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialServiceId={bookingServiceId}
      />

      {/* Intelligent AI Chat with Kommo/n8n Lead Sync */}
      <IntelligentChat
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
        onOpenBookingForService={(serviceId) => {
          setIsChatOpen(false);
          handleOpenBooking(serviceId);
        }}
      />

      {/* Admin CRM Management Dashboard */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

      {/* Full Visual Media & Image Manager Modal */}
      <MediaManagerModal />
    </div>
  );
}

export default function App() {
  return (
    <MediaProvider>
      <AppContent />
    </MediaProvider>
  );
}
