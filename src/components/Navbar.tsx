import React, { useState, useEffect } from 'react';
import { Sparkles, GraduationCap, MessageCircle, Menu, X, Shield, Phone } from 'lucide-react';
import { STUDIO_INFO } from '../data/initialData';
import { AllegraLogo } from './AllegraLogo';

interface NavbarProps {
  onOpenBooking?: () => void;
  onOpenChat: () => void;
  onToggleAdmin: () => void;
  isAdminOpen: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenChat,
  onToggleAdmin,
  isAdminOpen
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Cursos Online', href: '#cursos' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Galería', href: '#galeria' },
    { label: 'Opiniones', href: '#opiniones' },
    { label: 'Preguntas', href: '#preguntas' },
    { label: 'Contacto', href: '#contacto' }
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#F8F5F2]/95 backdrop-blur-md shadow-sm border-b border-[#E8DDD4]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <a
            id="brand-logo-link"
            href="#inicio"
            className="flex items-center gap-3 group focus:outline-none"
          >
            <AllegraLogo size={46} showText={true} />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                id={`nav-link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                href={item.href}
                className="text-sm font-medium text-[#2C2C2C]/80 hover:text-[#C8A96B] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#C8A96B] hover:after:w-full after:transition-all after:duration-300"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            {/* WhatsApp Quick Link */}
            <a
              id="header-whatsapp-btn"
              href={STUDIO_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full text-[#2C2C2C]/70 hover:text-[#2C2C2C] hover:bg-[#E8DDD4]/60 transition-all"
              title="Consultar por WhatsApp"
            >
              <Phone className="w-4 h-4" />
            </a>

            {/* Admin Panel Toggle */}
            <button
              id="admin-panel-toggle-btn"
              onClick={onToggleAdmin}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium border transition-all ${
                isAdminOpen
                  ? 'bg-[#2C2C2C] text-white border-[#2C2C2C]'
                  : 'bg-white/80 text-[#2C2C2C]/70 border-[#E8DDD4] hover:border-[#C8A96B] hover:text-[#2C2C2C]'
              }`}
              title="Acceso al panel CRM y gestión de fotos"
            >
              <Shield className="w-3.5 h-3.5 text-[#C8A96B]" />
              <span>CRM Studio</span>
            </button>

            {/* Online Courses Primary CTA */}
            <a
              id="header-courses-cta"
              href="#cursos"
              className="font-button text-xs uppercase tracking-wider font-semibold px-5 py-2.5 rounded-full bg-[#C8A96B] text-white hover:bg-[#B2904F] transition-all duration-300 luxury-shadow hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Cursos Online</span>
            </a>
          </div>

          {/* Mobile Menu & Quick Buttons */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              id="mobile-chat-btn"
              onClick={onOpenChat}
              className="p-2 rounded-full bg-[#D8B4B0]/30 text-[#2C2C2C]"
              aria-label="Abrir chat"
            >
              <MessageCircle className="w-5 h-5 text-[#C8A96B]" />
            </button>

            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full text-[#2C2C2C] hover:bg-[#E8DDD4]/60"
              aria-label="Menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F8F5F2] border-b border-[#E8DDD4] px-6 py-6 space-y-4 shadow-xl animate-fade-in">
          <nav className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-[#2C2C2C] hover:text-[#C8A96B] py-1 border-b border-[#E8DDD4]/40 text-left"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="pt-4 flex flex-col gap-3">
            <a
              href="#cursos"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full font-button text-xs uppercase tracking-wider font-semibold py-3 rounded-xl bg-[#C8A96B] text-white flex items-center justify-center gap-2 shadow-md text-center"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Ver Cursos Online</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onToggleAdmin();
              }}
              className="w-full font-button text-xs uppercase tracking-wider font-semibold py-2.5 rounded-xl border border-[#2C2C2C]/20 text-[#2C2C2C]/70 flex items-center justify-center gap-2"
            >
              <Shield className="w-4 h-4 text-[#C8A96B]" />
              <span>Acceso CRM Studio</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

