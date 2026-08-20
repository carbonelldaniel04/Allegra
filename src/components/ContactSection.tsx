import React from 'react';
import { MessageCircle, Phone, MapPin, Sparkles, ArrowRight, ShieldCheck, CreditCard, Calendar } from 'lucide-react';
import { STUDIO_INFO } from '../data/initialData';

interface ContactSectionProps {
  onOpenBooking: () => void;
  onOpenChat: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenBooking, onOpenChat }) => {
  return (
    <section id="contacto" className="py-24 bg-[#E8DDD4]/30 relative overflow-hidden">
      {/* Decorative Blur Spheres */}
      <div className="absolute top-1/2 -left-20 w-80 h-80 bg-[#D8B4B0]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-[#C8A96B]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Box Card */}
        <div className="bg-white rounded-3xl border border-[#E8DDD4] shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Column: Chat CTA Banner */}
          <div className="lg:col-span-7 p-8 sm:p-12 lg:p-14 flex flex-col justify-between space-y-8 text-left bg-gradient-to-br from-white via-[#F8F5F2] to-[#E8DDD4]/40">
            
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D8B4B0]/30 text-xs font-semibold uppercase tracking-wider text-[#2C2C2C] font-button">
                <Sparkles className="w-3.5 h-3.5 text-[#C8A96B]" />
                <span>Atención Personalizada CDMX</span>
              </div>

              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C2C2C] tracking-tight leading-tight">
                ¿Tienes dudas o deseas agendar tu cita?
              </h2>

              <p className="font-body text-base sm:text-lg text-[#2C2C2C]/80 leading-relaxed max-w-lg">
                Habla con nuestro asistente virtual para cotizaciones personalizadas o agenda directo en nuestras sucursales de <strong>Polanco</strong> y <strong>Colonia Juárez</strong>.
              </p>

              {/* Promotions highlight */}
              <div className="p-4 rounded-2xl bg-white/80 border border-[#E8DDD4] space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase text-[#C8A96B] tracking-wider font-button">
                  <CreditCard className="w-4 h-4" />
                  <span>Promociones y Facilidades de Pago</span>
                </div>
                <ul className="text-xs text-[#2C2C2C]/80 space-y-1">
                  <li>• <strong>6 Meses Sin Intereses</strong> con todas las tarjetas de crédito.</li>
                  <li>• <strong>10% de Descuento</strong> en pago de contado / efectivo.</li>
                  <li>• <strong>Pomada post-tratamiento</strong> dermatológica incluida sin costo.</li>
                </ul>
              </div>
            </div>

            {/* Interactive Prompt Pills to launch chat */}
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#C8A96B]">Preguntas sugeridas al Asistente IA:</p>
              <div className="flex flex-wrap gap-2">
                {[
                  '¿Diferencia entre Master Leticia Moctezuma y Artistas Allegra?',
                  '¿Qué incluye el servicio de Microblading?',
                  '¿Cómo son los 6 Meses Sin Intereses?',
                  '¿Cuáles son los horarios disponibles esta semana?'
                ].map((prompt, i) => (
                  <button
                    key={i}
                    onClick={onOpenChat}
                    className="text-xs text-left px-3.5 py-2 rounded-xl bg-white border border-[#E8DDD4] hover:border-[#C8A96B] hover:text-[#C8A96B] transition-colors flex items-center gap-1.5 shadow-2xs"
                  >
                    <span>{prompt}</span>
                    <ArrowRight className="w-3 h-3 text-[#C8A96B]" />
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={onOpenBooking}
                className="font-button text-xs uppercase tracking-wider font-semibold px-8 py-4 rounded-2xl bg-[#C8A96B] text-white hover:bg-[#B2904F] transition-all shadow-md flex items-center justify-center gap-2 group"
              >
                <Calendar className="w-4 h-4" />
                <span>Reservar Cita Ahora</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href={STUDIO_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-button text-xs uppercase tracking-wider font-semibold px-6 py-4 rounded-2xl bg-white border border-[#E8DDD4] text-[#2C2C2C] hover:border-[#C8A96B] hover:text-[#C8A96B] transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Directo</span>
              </a>
            </div>

          </div>

          {/* Right Column: Physical Studio Info & Map Details */}
          <div className="lg:col-span-5 p-8 sm:p-12 bg-[#2C2C2C] text-white flex flex-col justify-between space-y-8 text-left">
            
            <div className="space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#C8A96B] font-semibold block">Sucursales CDMX</span>
                <h3 className="font-heading text-2xl font-bold mt-1">Allegra Salón</h3>
              </div>

              {/* Both Branches */}
              <div className="space-y-5 text-xs text-white/80">
                
                {/* Branch 1: Polanco */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                  <div className="flex items-center gap-2 text-[#C8A96B] font-semibold text-sm">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span>Sucursal Polanco</span>
                  </div>
                  <p className="text-white font-medium pl-6">Sudermann 248 (o Lamartine 311)</p>
                  <p className="text-white/60 pl-6 text-[11px]">A un costado de Chedraui Selecto Galerías Polanco y Liverpool. Col. Polanco, CDMX.</p>
                  <p className="text-white/70 pl-6 text-[11px] font-mono">🕒 Lun a Vie: 09:00 a 18:00 hs | Sáb: 09:00 a 16:00 hs</p>
                </div>

                {/* Branch 2: Juárez */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                  <div className="flex items-center gap-2 text-[#C8A96B] font-semibold text-sm">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span>Sucursal Colonia Juárez</span>
                  </div>
                  <p className="text-white font-medium pl-6">Toledo 46, Col. Juárez, Cuauhtémoc, CDMX</p>
                  <p className="text-white/60 pl-6 text-[11px]">Entre Hamburgo y Chapultepec (cerca de la Diana Cazadora y Metro Sevilla).</p>
                  <p className="text-white/70 pl-6 text-[11px] font-mono">🕒 Lun a Vie: 09:00 a 17:30 hs | Sáb: 09:00 a 16:00 hs</p>
                </div>

                {/* Phones & Contact */}
                <div className="flex items-start gap-3.5 pt-2">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#C8A96B] shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Teléfonos de Atención Directa</p>
                    <p className="text-white/70">Fijo: (55) 5207-4042 / (55) 5511-9181</p>
                    <p className="text-white/70">WhatsApp: +52 56 3636 0139</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#C8A96B] shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Garantía de Calidad & Higiene</p>
                    <p className="text-white/60">Aval COFEPRIS • Pigmentos alemanes • Materiales 100% descartables</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Direct Booking Reminder in Right Box */}
            <div className="pt-6 border-t border-white/15">
              <p className="text-xs text-white/70 mb-3">
                ¿Lista para lucir unas cejas y labios espectaculares?
              </p>
              <button
                onClick={onOpenBooking}
                className="w-full py-3 rounded-xl bg-[#C8A96B] text-white hover:bg-[#B2904F] transition-all font-button text-xs uppercase tracking-wider font-semibold shadow-md flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Reservar Cita Ahora</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
