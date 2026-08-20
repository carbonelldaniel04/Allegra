import React, { useState } from 'react';
import { GalleryItem } from '../types';
import { Sparkles, X, ChevronLeft, ChevronRight, Eye, CheckCircle2, Calendar } from 'lucide-react';
import { useMedia } from '../context/MediaContext';

interface GalleryProps {
  onOpenBooking: () => void;
  onOpenChat: (query?: string) => void;
}

export const BeforeAfterGallery: React.FC<GalleryProps> = ({ onOpenBooking, onOpenChat }) => {
  const [activeFilter, setActiveFilter] = useState<string>('todos');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [viewMode, setViewMode] = useState<'compare' | 'after' | 'before'>('compare');
  const { gallery } = useMedia();

  const filteredItems = activeFilter === 'todos'
    ? gallery
    : gallery.filter(item => item.category === activeFilter);

  return (
    <section id="galeria" className="py-24 bg-[#F8F5F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white border border-[#E8DDD4] text-xs font-semibold uppercase tracking-widest text-[#C8A96B] font-button">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Resultados Reales</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C2C2C] tracking-tight">
            Antes & Después
          </h2>

          <p className="font-body text-sm sm:text-base text-[#2C2C2C]/75">
            Explora transformaciones reales realizadas por Master Leticia Moctezuma y las Artistas de Allegra Salon. Sin filtros engañosos.
          </p>

          {/* Filter Categories */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {[
              { id: 'todos', label: 'Todos los Casos' },
              { id: 'cejas', label: 'Cejas' },
              { id: 'labios', label: 'Labios' },
              { id: 'ojos', label: 'Delineado' },
              { id: 'pestanas', label: 'Pestañas' }
            ].map(filter => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all font-button ${
                  activeFilter === filter.id
                    ? 'bg-[#C8A96B] text-white shadow-md'
                    : 'bg-white text-[#2C2C2C]/70 border border-[#E8DDD4] hover:border-[#C8A96B] hover:text-[#2C2C2C]'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setLightboxItem(item);
                setSliderPos(50);
                setViewMode('compare');
              }}
              className="group cursor-pointer bg-white rounded-3xl overflow-hidden border border-[#E8DDD4] hover:border-[#C8A96B] transition-all duration-300 luxury-shadow flex flex-col"
            >
              
              {/* Dual image split preview */}
              <div className="relative aspect-4/3 overflow-hidden bg-neutral-100">
                <div className="absolute inset-0 grid grid-cols-2">
                  {/* Before thumbnail */}
                  <div className="relative h-full overflow-hidden border-r border-white/40">
                    <img
                      src={item.beforeUrl}
                      alt={`Antes ${item.title}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-[10px] uppercase font-bold text-white tracking-wider">
                      Antes
                    </span>
                  </div>

                  {/* After thumbnail */}
                  <div className="relative h-full overflow-hidden">
                    <img
                      src={item.afterUrl}
                      alt={`Después ${item.title}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-[#C8A96B] text-[10px] uppercase font-bold text-white tracking-wider shadow-xs">
                      Después
                    </span>
                  </div>
                </div>

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="px-4 py-2 rounded-full bg-white/90 text-[#2C2C2C] text-xs font-semibold flex items-center gap-2 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <Eye className="w-3.5 h-3.5 text-[#C8A96B]" />
                    <span>Ver Comparador Interactivo</span>
                  </div>
                </div>

                {/* Healed Result Badge */}
                {item.healedResult && (
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-emerald-700/80 backdrop-blur-xs text-white text-[10px] font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Resultado Cicatrizado</span>
                  </div>
                )}
              </div>

              {/* Card Meta */}
              <div className="p-5 text-left space-y-1.5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-[#2C2C2C]/50 mb-1">
                    <span className="uppercase font-semibold tracking-wider text-[#C8A96B]">
                      {item.category}
                    </span>
                    <span>{item.date}</span>
                  </div>
                  <h3 className="font-heading text-lg font-bold text-[#2C2C2C] group-hover:text-[#C8A96B] transition-colors">
                    {item.title}
                  </h3>
                </div>

                <div className="pt-2 border-t border-[#E8DDD4] flex items-center justify-between text-xs text-[#2C2C2C]/70">
                  <span>Artista: <strong>{item.artist}</strong></span>
                  <span className="text-[11px] text-[#C8A96B] font-semibold">{item.technique}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Interactive Before / After Comparator */}
      {lightboxItem && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in">
          
          <div className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
            
            {/* Header */}
            <div className="p-4 sm:p-6 border-b border-[#E8DDD4] flex items-center justify-between">
              <div className="text-left">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#C8A96B] block">
                  {lightboxItem.category} • {lightboxItem.technique}
                </span>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#2C2C2C]">
                  {lightboxItem.title}
                </h3>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setLightboxItem(null)}
                className="p-2 rounded-full hover:bg-[#F8F5F2] text-[#2C2C2C]/60 hover:text-[#2C2C2C] transition-colors"
                aria-label="Cerrar"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mode Selector */}
            <div className="px-6 pt-3 flex items-center justify-center gap-2">
              <button
                onClick={() => setViewMode('compare')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  viewMode === 'compare'
                    ? 'bg-[#C8A96B] text-white shadow-xs'
                    : 'bg-[#F8F5F2] text-[#2C2C2C]/70 hover:bg-[#E8DDD4]'
                }`}
              >
                Comparador Deslizable
              </button>
              <button
                onClick={() => setViewMode('after')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  viewMode === 'after'
                    ? 'bg-[#C8A96B] text-white shadow-xs'
                    : 'bg-[#F8F5F2] text-[#2C2C2C]/70 hover:bg-[#E8DDD4]'
                }`}
              >
                Solo Resultado Final
              </button>
              <button
                onClick={() => setViewMode('before')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  viewMode === 'before'
                    ? 'bg-[#C8A96B] text-white shadow-xs'
                    : 'bg-[#F8F5F2] text-[#2C2C2C]/70 hover:bg-[#E8DDD4]'
                }`}
              >
                Solo Antes
              </button>
            </div>

            {/* Interactive Image Area */}
            <div className="p-4 sm:p-6 flex-1 flex items-center justify-center overflow-hidden">
              
              {viewMode === 'compare' ? (
                <div className="relative w-full max-w-2xl aspect-4/3 rounded-2xl overflow-hidden select-none border border-[#E8DDD4] shadow-inner bg-neutral-100">
                  {/* After Image (Background) */}
                  <img
                    src={lightboxItem.afterUrl}
                    alt="Después"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#C8A96B] text-white text-xs font-bold uppercase tracking-wider shadow-md pointer-events-none z-10">
                    Después
                  </span>

                  {/* Before Image (Clipped overlay) */}
                  <div
                    className="absolute inset-y-0 left-0 overflow-hidden"
                    style={{ width: `${sliderPos}%` }}
                  >
                    <img
                      src={lightboxItem.beforeUrl}
                      alt="Antes"
                      className="absolute inset-0 w-full h-full object-cover max-w-none"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/70 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-xs pointer-events-none z-10">
                      Antes
                    </span>
                  </div>

                  {/* Divider Line & Handle */}
                  <div
                    className="absolute inset-y-0 w-1 bg-white cursor-ew-resize shadow-2xl z-20 flex items-center justify-center"
                    style={{ left: `calc(${sliderPos}% - 2px)` }}
                  >
                    <div className="w-8 h-8 rounded-full bg-white shadow-xl flex items-center justify-center text-[#C8A96B] border-2 border-[#C8A96B]">
                      <ChevronLeft className="w-3.5 h-3.5 -mr-1" />
                      <ChevronRight className="w-3.5 h-3.5 -ml-1" />
                    </div>
                  </div>

                  {/* Range Input Overlay for Dragging */}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderPos}
                    onChange={(e) => setSliderPos(Number(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
                    aria-label="Deslizar para comparar"
                  />
                </div>
              ) : viewMode === 'after' ? (
                <div className="relative w-full max-w-2xl aspect-4/3 rounded-2xl overflow-hidden border border-[#E8DDD4] shadow-md">
                  <img
                    src={lightboxItem.afterUrl}
                    alt="Después"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#C8A96B] text-white text-xs font-bold uppercase tracking-wider shadow-md">
                    Resultado Final
                  </span>
                </div>
              ) : (
                <div className="relative w-full max-w-2xl aspect-4/3 rounded-2xl overflow-hidden border border-[#E8DDD4] shadow-md">
                  <img
                    src={lightboxItem.beforeUrl}
                    alt="Antes"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/70 text-white text-xs font-bold uppercase tracking-wider">
                    Estado Previo
                  </span>
                </div>
              )}

            </div>

            {/* Lightbox Footer & CTAs */}
            <div className="p-4 sm:p-6 bg-[#F8F5F2] border-t border-[#E8DDD4] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-left space-y-1">
                <p className="text-xs text-[#2C2C2C]/70">
                  Realizado por <strong className="text-[#2C2C2C]">{lightboxItem.artist}</strong> ({lightboxItem.technique})
                </p>
                <p className="text-xs text-[#2C2C2C]/50">
                  {lightboxItem.description || 'Diseño de visagismo áureo y aplicación de pigmentos grado médico.'}
                </p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => {
                    setLightboxItem(null);
                    onOpenBooking();
                  }}
                  className="w-full sm:w-auto font-button text-xs uppercase tracking-wider font-semibold px-6 py-2.5 rounded-xl bg-[#C8A96B] text-white hover:bg-[#B2904F] transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Reservar Este Tratamiento</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
