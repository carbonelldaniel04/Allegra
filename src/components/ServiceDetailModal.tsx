import React from 'react';
import { X, Clock, DollarSign, Check, AlertCircle, Sparkles, Calendar } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onSelectBooking: (serviceId: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onSelectBooking
}) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#F8F5F2] rounded-3xl border border-[#E8DDD4] shadow-2xl text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image with close button */}
        <div className="relative h-64 w-full overflow-hidden rounded-t-3xl">
          <img
            src={service.imageUrl}
            alt={service.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2C2C2C] via-[#2C2C2C]/30 to-transparent" />
          
          <button
            onClick={onClose}
            aria-label="Cerrar modal"
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-[#C8A96B] text-white mb-2">
              {service.category.toUpperCase()}
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl font-bold">
              {service.title}
            </h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Quick Metrics (Duration & Price) */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#E8DDD4]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#E8DDD4]/50 flex items-center justify-center text-[#C8A96B]">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-[#2C2C2C]/60 uppercase font-medium">Duración de Sesión</p>
                <p className="text-sm font-bold text-[#2C2C2C]">{service.durationMinutes} minutos</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#D8B4B0]/30 flex items-center justify-center text-[#C8A96B]">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-[#2C2C2C]/60 uppercase font-medium">Inversión</p>
                <p className="text-sm font-bold text-[#2C2C2C]">{service.priceLocal} <span className="text-xs font-normal text-[#2C2C2C]/60">(${service.priceUSD} USD)</span></p>
              </div>
            </div>
          </div>

          {/* Full Description */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C8A96B]">Acerca del Tratamiento</h4>
            <p className="text-sm text-[#2C2C2C]/80 leading-relaxed">
              {service.fullDescription}
            </p>
          </div>

          {/* Benefits */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C8A96B]">Beneficios Exclusivos</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {service.benefits.map((benefit, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-[#2C2C2C]/80 bg-white/60 p-2.5 rounded-xl border border-[#E8DDD4]/60">
                  <Check className="w-4 h-4 text-[#C8A96B] shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Preparation & Aftercare Accordions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-white border border-[#E8DDD4] space-y-2">
              <div className="flex items-center gap-2 text-[#C8A96B]">
                <AlertCircle className="w-4 h-4" />
                <h5 className="text-xs font-bold uppercase tracking-wider text-[#2C2C2C]">Antes de tu Turno</h5>
              </div>
              <ul className="text-xs text-[#2C2C2C]/70 space-y-1.5 list-disc list-inside">
                {service.preparation.map((prep, i) => (
                  <li key={i}>{prep}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#E8DDD4] space-y-2">
              <div className="flex items-center gap-2 text-[#C8A96B]">
                <Sparkles className="w-4 h-4" />
                <h5 className="text-xs font-bold uppercase tracking-wider text-[#2C2C2C]">Cuidados Posteriores</h5>
              </div>
              <ul className="text-xs text-[#2C2C2C]/70 space-y-1.5 list-disc list-inside">
                {service.aftercare.map((care, i) => (
                  <li key={i}>{care}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-end gap-3 border-t border-[#E8DDD4]">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-3 rounded-xl border border-[#E8DDD4] text-xs font-semibold text-[#2C2C2C] hover:bg-white transition-colors"
            >
              Cerrar
            </button>
            <button
              onClick={() => {
                onClose();
                onSelectBooking(service.id);
              }}
              className="w-full sm:w-auto font-button text-xs uppercase tracking-wider font-semibold px-8 py-3 rounded-xl bg-[#C8A96B] text-white hover:bg-[#B2904F] transition-all luxury-shadow flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Reservar Este Servicio</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
