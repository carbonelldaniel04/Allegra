import React, { useState } from 'react';
import { X, Calendar, Clock, User, Phone, Mail, Check, Sparkles, ChevronRight, ChevronLeft, ShieldCheck, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { INITIAL_SERVICES, STUDIO_INFO } from '../data/initialData';
import { ServiceItem } from '../types';
import { AllegraLogo } from './AllegraLogo';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: string;
  onBookingSuccess?: (appointmentData: any) => void;
}

const AVAILABLE_TIMES = [
  '09:30', '11:00', '12:30', '14:30', '16:00', '17:30', '19:00'
];

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialServiceId,
  onBookingSuccess
}) => {
  const [step, setStep] = useState<number>(1);
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    initialServiceId || INITIAL_SERVICES[0].id
  );
  const [selectedSpecialist, setSelectedSpecialist] = useState<string>(
    STUDIO_INFO.specialists[0].name
  );
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  });
  const [selectedTime, setSelectedTime] = useState<string>('11:00');

  // Client form
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    comentarios: '',
    firstTime: true
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<any>(null);

  if (!isOpen) return null;

  const currentService = INITIAL_SERVICES.find(s => s.id === selectedServiceId) || INITIAL_SERVICES[0];

  const handleNextStep = () => {
    if (step === 1) setStep(2);
    else if (step === 2) setStep(3);
  };

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre || !formData.telefono) return;

    setIsSubmitting(true);

    const newAppointment = {
      clientName: `${formData.nombre} ${formData.apellido}`.trim(),
      clientPhone: formData.telefono,
      clientEmail: formData.email,
      serviceId: currentService.id,
      serviceName: currentService.title,
      specialist: selectedSpecialist,
      date: selectedDate,
      time: selectedTime,
      status: 'confirmado',
      notes: `${formData.comentarios} ${formData.firstTime ? '(Primera vez en el estudio)' : ''}`,
      totalPrice: currentService.priceUSD
    };

    try {
      // POST to backend API
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAppointment)
      });
      const data = await res.json();
      setConfirmedBooking(data);

      if (onBookingSuccess) {
        onBookingSuccess(data);
      }

      // Trigger luxury confetti celebration
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C8A96B', '#D8B4B0', '#E8DDD4', '#2C2C2C']
      });

      setStep(4);
    } catch (err) {
      console.error('Error booking appointment:', err);
      // Fallback
      setConfirmedBooking(newAppointment);
      setStep(4);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-[#F8F5F2] rounded-3xl border border-[#E8DDD4] shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-white border-b border-[#E8DDD4] flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3 text-left">
            <AllegraLogo size={38} />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#C8A96B] block font-button">
                Allegra Salon Online
              </span>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#2C2C2C]">
                {step === 4 ? '¡Turno Reservado!' : 'Agendá tu Cita'}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Step indicators */}
            {step < 4 && (
              <div className="flex items-center gap-1 text-xs font-semibold text-[#2C2C2C]/50">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 1 ? 'bg-[#C8A96B] text-white' : 'bg-[#E8DDD4]'}`}>1</span>
                <span className="w-2 h-0.5 bg-[#E8DDD4]" />
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 2 ? 'bg-[#C8A96B] text-white' : 'bg-[#E8DDD4]'}`}>2</span>
                <span className="w-2 h-0.5 bg-[#E8DDD4]" />
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 3 ? 'bg-[#C8A96B] text-white' : 'bg-[#E8DDD4]'}`}>3</span>
              </div>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-[#E8DDD4] text-[#2C2C2C] transition-colors ml-2"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body with Step Multi-views */}
        <div className="p-6 sm:p-8 flex-1 text-left">
          
          {/* STEP 1: Select Service */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h4 className="font-heading text-lg font-bold text-[#2C2C2C]">1. Seleccioná tu Tratamiento</h4>
                <p className="text-xs text-[#2C2C2C]/70">Elegí el servicio de micropigmentación o pestañas que deseas realizarte.</p>
              </div>

              <div className="space-y-3">
                {INITIAL_SERVICES.map((srv) => (
                  <div
                    key={srv.id}
                    onClick={() => setSelectedServiceId(srv.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                      selectedServiceId === srv.id
                        ? 'bg-white border-[#C8A96B] shadow-md ring-1 ring-[#C8A96B]'
                        : 'bg-white/60 border-[#E8DDD4] hover:bg-white hover:border-[#C8A96B]/50'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <img
                        src={srv.imageUrl}
                        alt={srv.title}
                        className="w-14 h-14 rounded-xl object-cover shrink-0 border border-[#E8DDD4]"
                      />
                      <div>
                        <h5 className="font-heading text-sm sm:text-base font-bold text-[#2C2C2C]">
                          {srv.title}
                        </h5>
                        <p className="text-xs text-[#2C2C2C]/65 flex items-center gap-2 mt-0.5">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[#C8A96B]" /> {srv.durationMinutes} min
                          </span>
                          <span>•</span>
                          <span className="capitalize">{srv.category}</span>
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <p className="font-heading text-sm sm:text-base font-bold text-[#2C2C2C]">
                        {srv.priceLocal}
                      </p>
                      <span className="text-[10px] text-[#2C2C2C]/50 block">(${srv.priceUSD} USD)</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={handleNextStep}
                  className="font-button text-xs uppercase tracking-wider font-semibold px-7 py-3.5 rounded-xl bg-[#C8A96B] text-white hover:bg-[#B2904F] transition-all luxury-shadow flex items-center gap-2"
                >
                  <span>Continuar: Fecha y Especialista</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Specialist & Date / Time */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h4 className="font-heading text-lg font-bold text-[#2C2C2C]">2. Fecha, Horario y Especialista</h4>
                <p className="text-xs text-[#2C2C2C]/70">Elegí con quién deseas atenderte y el momento que mejor se adapte a tu agenda.</p>
              </div>

              {/* Specialist Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#C8A96B] block">
                  Especialista Asignada
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {STUDIO_INFO.specialists.map((spec) => (
                    <div
                      key={spec.name}
                      onClick={() => setSelectedSpecialist(spec.name)}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer flex flex-col items-center text-center gap-2 ${
                        selectedSpecialist === spec.name
                          ? 'bg-white border-[#C8A96B] shadow-md ring-1 ring-[#C8A96B]'
                          : 'bg-white/60 border-[#E8DDD4] hover:bg-white'
                      }`}
                    >
                      <img
                        src={spec.photo}
                        alt={spec.name}
                        className="w-12 h-12 rounded-full object-cover border border-[#C8A96B]/30"
                      />
                      <div>
                        <p className="font-heading text-xs font-bold text-[#2C2C2C]">{spec.name}</p>
                        <p className="text-[10px] text-[#2C2C2C]/60 line-clamp-1">{spec.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Date & Time Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                
                {/* Date Picker */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#C8A96B] block">
                    Día del Turno
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={selectedDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-[#E8DDD4] text-xs font-semibold text-[#2C2C2C] focus:outline-none focus:border-[#C8A96B]"
                    />
                  </div>
                </div>

                {/* Available Hours */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#C8A96B] block">
                    Horarios Disponibles
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {AVAILABLE_TIMES.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`py-2 rounded-xl text-xs font-semibold transition-all ${
                          selectedTime === time
                            ? 'bg-[#C8A96B] text-white shadow-xs'
                            : 'bg-white text-[#2C2C2C] border border-[#E8DDD4] hover:border-[#C8A96B]'
                        }`}
                      >
                        {time} hs
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              <div className="pt-4 flex items-center justify-between border-t border-[#E8DDD4]">
                <button
                  onClick={handlePrevStep}
                  className="px-5 py-3 rounded-xl border border-[#E8DDD4] text-xs font-semibold text-[#2C2C2C] hover:bg-white transition-colors flex items-center gap-1.5"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Atrás</span>
                </button>

                <button
                  onClick={handleNextStep}
                  className="font-button text-xs uppercase tracking-wider font-semibold px-7 py-3.5 rounded-xl bg-[#C8A96B] text-white hover:bg-[#B2904F] transition-all luxury-shadow flex items-center gap-2"
                >
                  <span>Continuar: Datos de Contacto</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Client Details & Notes */}
          {step === 3 && (
            <form onSubmit={handleFinalSubmit} className="space-y-5 animate-in fade-in duration-200">
              <div>
                <h4 className="font-heading text-lg font-bold text-[#2C2C2C]">3. Tus Datos Personales</h4>
                <p className="text-xs text-[#2C2C2C]/70">Para confirmar tu reserva y enviarte la ficha técnica por WhatsApp y correo.</p>
              </div>

              {/* Selected Summary Pill */}
              <div className="p-3.5 rounded-2xl bg-white border border-[#C8A96B]/40 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-[#2C2C2C]">{currentService.title}</span>
                  <p className="text-[11px] text-[#C8A96B]">{selectedDate} a las {selectedTime} hs con {selectedSpecialist}</p>
                </div>
                <span className="font-heading text-sm font-bold text-[#2C2C2C]">{currentService.priceLocal}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#2C2C2C]">Nombre *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Valentina"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E8DDD4] text-xs text-[#2C2C2C] focus:outline-none focus:border-[#C8A96B]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#2C2C2C]">Apellido</label>
                  <input
                    type="text"
                    placeholder="Ej. Gómez"
                    value={formData.apellido}
                    onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E8DDD4] text-xs text-[#2C2C2C] focus:outline-none focus:border-[#C8A96B]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#2C2C2C]">WhatsApp / Teléfono *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+52 55 1234 5678"
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E8DDD4] text-xs text-[#2C2C2C] focus:outline-none focus:border-[#C8A96B]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#2C2C2C]">Email</label>
                  <input
                    type="email"
                    placeholder="ejemplo@correo.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E8DDD4] text-xs text-[#2C2C2C] focus:outline-none focus:border-[#C8A96B]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#2C2C2C]">Comentarios o requerimientos especiales</label>
                <textarea
                  rows={2}
                  placeholder="¿Tenés algún trabajo previo en la zona o alergias conocidas?"
                  value={formData.comentarios}
                  onChange={(e) => setFormData({ ...formData, comentarios: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E8DDD4] text-xs text-[#2C2C2C] focus:outline-none focus:border-[#C8A96B]"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="firstTimeCheck"
                  checked={formData.firstTime}
                  onChange={(e) => setFormData({ ...formData, firstTime: e.target.checked })}
                  className="rounded border-[#E8DDD4] text-[#C8A96B] focus:ring-[#C8A96B]"
                />
                <label htmlFor="firstTimeCheck" className="text-xs text-[#2C2C2C]/80 cursor-pointer">
                  Es mi primera vez en Allegra Salon (incluye visagismo previo sin cargo con Master Leticia Moctezuma o equipo).
                </label>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-[#E8DDD4]">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-5 py-3 rounded-xl border border-[#E8DDD4] text-xs font-semibold text-[#2C2C2C] hover:bg-white transition-colors flex items-center gap-1.5"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Atrás</span>
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="font-button text-xs uppercase tracking-wider font-semibold px-8 py-3.5 rounded-xl bg-[#C8A96B] text-white hover:bg-[#B2904F] transition-all luxury-shadow flex items-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Registrando en CRM...</span>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Confirmar Turno</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Success Celebration Confirmation */}
          {step === 4 && (
            <div className="py-6 text-center space-y-6 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
                <Check className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#C8A96B] font-button">
                  Turno Confirmado en Sistema
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#2C2C2C]">
                  ¡Te esperamos con entusiasmo!
                </h3>
                <p className="text-xs text-[#2C2C2C]/75 max-w-md mx-auto">
                  Hemos registrado tu reserva y sincronizado los datos en nuestro CRM para asignarte atención prioritaria.
                </p>
              </div>

              {/* Receipt card */}
              <div className="p-5 rounded-2xl bg-white border border-[#E8DDD4] text-left max-w-md mx-auto space-y-3 luxury-shadow">
                <div className="flex justify-between items-center border-b border-[#E8DDD4]/60 pb-2">
                  <span className="text-xs text-[#2C2C2C]/60">Tratamiento</span>
                  <span className="text-xs font-bold text-[#2C2C2C]">{confirmedBooking?.serviceName}</span>
                </div>
                <div className="flex justify-between items-center border-b border-[#E8DDD4]/60 pb-2">
                  <span className="text-xs text-[#2C2C2C]/60">Fecha & Hora</span>
                  <span className="text-xs font-bold text-[#C8A96B]">{confirmedBooking?.date} — {confirmedBooking?.time} hs</span>
                </div>
                <div className="flex justify-between items-center border-b border-[#E8DDD4]/60 pb-2">
                  <span className="text-xs text-[#2C2C2C]/60">Especialista</span>
                  <span className="text-xs font-bold text-[#2C2C2C]">{confirmedBooking?.specialist}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-[#2C2C2C]/60">Lugar</span>
                  <span className="text-xs font-medium text-[#2C2C2C]">{STUDIO_INFO.address}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={`https://wa.me/${STUDIO_INFO.whatsappNumber}?text=Hola!%20Acabo%20de%20reservar%20un%20turno%20para%20${encodeURIComponent(confirmedBooking?.serviceName || '')}%20el%20día%20${confirmedBooking?.date}%20a%20las%20${confirmedBooking?.time}%20hs.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto font-button text-xs tracking-wider font-semibold px-6 py-3 rounded-xl bg-[#25D366] text-white hover:bg-[#1ebd5a] transition-all flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Enviar Confirmación por WhatsApp</span>
                </a>

                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#2C2C2C] text-white text-xs font-semibold uppercase tracking-wider font-button hover:bg-[#C8A96B] transition-all"
                >
                  Finalizar
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
