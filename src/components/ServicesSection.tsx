import React, { useState } from 'react';
import { ServiceItem } from '../types';
import { ServiceDetailModal } from './ServiceDetailModal';
import { Sparkles, Clock, Calendar } from 'lucide-react';
import { useMedia } from '../context/MediaContext';

interface ServicesSectionProps {
  onOpenBooking: (serviceId?: string) => void;
  onOpenChat: (serviceQuery?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenBooking, onOpenChat }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const { services } = useMedia();

  const filteredServices = activeCategory === 'todos'
    ? services
    : services.filter(s => s.category === activeCategory);

  return (
    <section id="servicios" className="py-24 bg-[#E8DDD4]/30 relative overflow-hidden">
      {/* Decorative luxury accents */}
      <div className="absolute top-10 left-0 w-72 h-72 bg-[#D8B4B0]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#C8A96B]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white border border-[#E8DDD4] text-xs font-semibold uppercase tracking-widest text-[#C8A96B] font-button">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Excelencia en Estética Facial</span>
          </div>
          
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C2C2C] tracking-tight">
            Nuestros Servicios
          </h2>
          
          <p className="font-body text-sm sm:text-base text-[#2C2C2C]/75 leading-relaxed">
            Cada tratamiento es una obra de precisión estética. Empleamos pigmentos hipoalergénicos de grado médico, visagismo proporcional y técnicas de vanguardia.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {[
              { id: 'todos', label: 'Todos los Servicios' },
              { id: 'cejas', label: 'Cejas' },
              { id: 'labios', label: 'Labios' },
              { id: 'pestanas', label: 'Pestañas' },
              { id: 'ojos', label: 'Delineado de Ojos' },
              { id: 'faciales', label: 'Remoción & Otros' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all font-button ${
                  activeCategory === cat.id
                    ? 'bg-[#C8A96B] text-white shadow-md'
                    : 'bg-white/80 text-[#2C2C2C]/70 border border-[#E8DDD4] hover:border-[#C8A96B] hover:text-[#2C2C2C]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-3xl overflow-hidden border border-[#E8DDD4] hover:border-[#C8A96B]/50 transition-all duration-300 luxury-shadow flex flex-col group"
            >
              
              {/* Image Container with Badges */}
              <div className="relative aspect-4/3 overflow-hidden bg-neutral-100">
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#2C2C2C]/80 text-white backdrop-blur-md border border-white/20">
                    {service.category}
                  </span>
                  {service.popular && (
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#C8A96B] text-white shadow-sm">
                      Favorito
                    </span>
                  )}
                </div>

                {/* Duration Tag */}
                <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-white/90 text-xs font-medium">
                  <Clock className="w-3.5 h-3.5 text-[#C8A96B]" />
                  <span>{service.durationMinutes} min</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between text-left space-y-4">
                <div className="space-y-2">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-heading text-xl font-bold text-[#2C2C2C] group-hover:text-[#C8A96B] transition-colors leading-snug">
                      {service.title}
                    </h3>
                  </div>

                  <p className="font-body text-xs text-[#2C2C2C]/70 line-clamp-2 leading-relaxed">
                    {service.shortDescription}
                  </p>
                </div>

                {/* Benefits Pills Preview */}
                <div className="space-y-1.5">
                  {service.benefits.slice(0, 2).map((benefit, i) => (
                    <div key={i} className="flex items-center gap-2 text-[11px] text-[#2C2C2C]/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#C8A96B]" />
                      <span className="truncate">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Price & Action Row */}
                <div className="pt-4 border-t border-[#E8DDD4] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#2C2C2C]/50 uppercase tracking-wider block">Inversión</span>
                    <span className="font-heading text-lg font-bold text-[#2C2C2C]">{service.priceLocal}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedService(service)}
                      className="font-button text-xs uppercase tracking-wider font-semibold px-3.5 py-2.5 rounded-xl border border-[#E8DDD4] text-[#2C2C2C] hover:bg-[#F8F5F2] hover:border-[#C8A96B] transition-colors"
                    >
                      Detalles
                    </button>
                    <button
                      onClick={() => onOpenBooking(service.id)}
                      className="font-button text-xs uppercase tracking-wider font-semibold px-4 py-2.5 rounded-xl bg-[#C8A96B] text-white hover:bg-[#B2904F] transition-all duration-200 flex items-center gap-1.5 group-hover:shadow-md"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Agendar</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Floating Custom Treatment Advice */}
        <div className="mt-14 p-6 rounded-2xl bg-white border border-[#E8DDD4] max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 luxury-shadow">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-full bg-[#D8B4B0]/30 flex items-center justify-center text-[#C8A96B] shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-heading text-base font-bold text-[#2C2C2C]">¿No sabes qué técnica es ideal para ti?</h4>
              <p className="text-xs text-[#2C2C2C]/70">Nuestras especialistas realizan una evaluación de visagismo con compás áureo en tu primera consulta.</p>
            </div>
          </div>
          <button
            onClick={() => onOpenChat('Evaluación de visagismo y diseño de cejas')}
            className="w-full sm:w-auto shrink-0 font-button text-xs uppercase tracking-wider font-semibold px-6 py-3 rounded-xl bg-[#2C2C2C] text-white hover:bg-[#C8A96B] transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#C8A96B]" />
            <span>Consultar Asistente IA</span>
          </button>
        </div>

      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <ServiceDetailModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onSelectBooking={() => {
            const sid = selectedService.id;
            setSelectedService(null);
            onOpenBooking(sid);
          }}
        />
      )}
    </section>
  );
};
