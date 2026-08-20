import React, { useState, useEffect } from 'react';
import { Sparkles, GraduationCap, MessageCircle, Star, ShieldCheck, Award, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { STUDIO_INFO } from '../data/initialData';
import { useMedia } from '../context/MediaContext';

interface HeroProps {
  onOpenBooking?: () => void;
  onOpenChat: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onOpenChat }) => {
  const { heroSlides } = useMedia();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    if (heroSlides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const activeSlide = heroSlides[currentSlideIndex] || heroSlides[0];

  const handlePrevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlideIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const handleNextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlideIndex((prev) => (prev + 1) % heroSlides.length);
  };

  return (
    <section id="inicio" className="relative min-h-[90vh] pt-28 pb-16 flex items-center overflow-hidden bg-[#F8F5F2]">
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D8B4B0]/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#E8DDD4]/50 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text Content & CTAs */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-[#E8DDD4] shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-[#C8A96B] animate-pulse" />
              <span className="text-xs font-semibold tracking-wider text-[#2C2C2C] uppercase font-button">
                Allegra Salón
              </span>
              <span className="text-xs text-[#C8A96B] font-serif italic">Master Leticia Moctezuma</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#2C2C2C] leading-[1.15]">
                Realzamos tu <br />
                <span className="italic font-normal font-serif text-[#C8A96B]">belleza natural</span>
              </h1>
              <p className="font-body text-base sm:text-lg text-[#2C2C2C]/80 max-w-xl leading-relaxed">
                Especialistas certificados en micropigmentación facial, microblading pelo a pelo y extensiones de pestañas de alta gama en CDMX. Resultados naturales, simétricos y duraderos.
              </p>
            </div>

            {/* Quality Seals */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/80 border border-[#E8DDD4] backdrop-blur-xs">
                <ShieldCheck className="w-5 h-5 text-[#C8A96B] shrink-0" />
                <div className="text-left">
                  <p className="text-xs font-semibold text-[#2C2C2C]">Pigmentos Alemanes</p>
                  <p className="text-[11px] text-[#2C2C2C]/60">100% hipoalergénicos</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/80 border border-[#E8DDD4] backdrop-blur-xs">
                <Award className="w-5 h-5 text-[#C8A96B] shrink-0" />
                <div className="text-left">
                  <p className="text-xs font-semibold text-[#2C2C2C]">Master Internacional</p>
                  <p className="text-[11px] text-[#2C2C2C]/60">18+ años de experiencia</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/80 border border-[#E8DDD4] backdrop-blur-xs">
                <Heart className="w-5 h-5 text-[#C8A96B] shrink-0" />
                <div className="text-left">
                  <p className="text-xs font-semibold text-[#2C2C2C]">Sin Dolor</p>
                  <p className="text-[11px] text-[#2C2C2C]/60">Anestesia tópica premium</p>
                </div>
              </div>
            </div>

            {/* CTAs Row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <a
                id="hero-courses-btn"
                href="#cursos"
                className="font-button text-xs uppercase tracking-wider font-semibold px-8 py-4 rounded-2xl bg-[#C8A96B] text-white hover:bg-[#B2904F] transition-all duration-300 luxury-shadow hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2.5 group cursor-pointer"
              >
                <GraduationCap className="w-4 h-4 text-white" />
                <span>Cursos Online</span>
              </a>

              <button
                id="hero-chat-btn"
                onClick={onOpenChat}
                className="font-button text-xs uppercase tracking-wider font-semibold px-7 py-4 rounded-2xl bg-white border border-[#E8DDD4] text-[#2C2C2C] hover:border-[#C8A96B] hover:text-[#C8A96B] transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#C8A96B]" />
                <span>Asistente IA</span>
              </button>

              <a
                id="hero-whatsapp-btn"
                href={STUDIO_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-white border border-[#E8DDD4] text-[#2C2C2C] hover:text-emerald-600 hover:border-emerald-500 transition-all duration-300 flex items-center justify-center"
                title="WhatsApp Directo"
              >
                <MessageCircle className="w-5 h-5 text-emerald-600" />
              </a>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-4 pt-4 border-t border-[#E8DDD4]/60">
              <div className="flex -space-x-2">
                {[
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
                  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
                  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80',
                  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80'
                ].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt="Cliente satisfecha"
                    className="w-9 h-9 rounded-full border-2 border-white object-cover"
                  />
                ))}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#C8A96B] text-[#C8A96B]" />
                  ))}
                  <span className="text-xs font-bold text-[#2C2C2C] ml-1">5.0</span>
                </div>
                <p className="text-xs text-[#2C2C2C]/70 font-medium">Más de 2,400 clientas felices en CDMX</p>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Carousel / Image Card */}
          <div className="lg:col-span-5 relative">
            
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-4/5 bg-neutral-100 group">
              {/* Main Slide Image */}
              {activeSlide && (
                <img
                  src={activeSlide.url}
                  alt={activeSlide.title || 'Allegra Salón Micropigmentación'}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Slide Navigation Arrows */}
              {heroSlides.length > 1 && (
                <>
                  <button
                    onClick={handlePrevSlide}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-xs flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                    aria-label="Anterior foto"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNextSlide}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-xs flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                    aria-label="Siguiente foto"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}

              {/* Slide Text Content & Indicators */}
              <div className="absolute bottom-6 left-6 right-6 text-left text-white space-y-2">
                {activeSlide?.subtitle && (
                  <span className="text-[11px] uppercase tracking-widest text-[#C8A96B] font-bold block">
                    {activeSlide.subtitle}
                  </span>
                )}
                {activeSlide?.title && (
                  <p className="font-heading text-xl sm:text-2xl font-bold leading-tight drop-shadow-md">
                    {activeSlide.title}
                  </p>
                )}

                {/* Carousel Dots */}
                {heroSlides.length > 1 && (
                  <div className="flex items-center gap-1.5 pt-2">
                    {heroSlides.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlideIndex(idx)}
                        className={`h-1.5 rounded-full transition-all ${
                          idx === currentSlideIndex
                            ? 'w-6 bg-[#C8A96B]'
                            : 'w-2 bg-white/50 hover:bg-white'
                        }`}
                        aria-label={`Ir a foto ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Floating Top Badge */}
              <div className="absolute top-4 left-4">
                <span className="px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[#2C2C2C] text-xs font-semibold uppercase tracking-wider border border-[#E8DDD4] shadow-md flex items-center gap-1.5 font-button">
                  <Sparkles className="w-3 h-3 text-[#C8A96B]" />
                  <span>Polanco & Col. Juárez</span>
                </span>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
