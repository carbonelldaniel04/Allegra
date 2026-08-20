import React, { useState } from 'react';
import { ReviewItem } from '../types';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2, MessageSquarePlus, X, Sparkles } from 'lucide-react';
import { useMedia } from '../context/MediaContext';

export const TestimonialsSection: React.FC = () => {
  const { reviews, updateReview } = useMedia();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    clientName: '',
    serviceName: 'Micropigmentación de Cejas',
    rating: 5,
    comment: ''
  });
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Group into pages of 3 on desktop, 1 on mobile
  const itemsPerPage = 3;
  const maxPages = Math.max(1, Math.ceil(reviews.length / itemsPerPage));

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % maxPages);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + maxPages) % maxPages);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.clientName || !newReview.comment) return;

    const created: ReviewItem = {
      id: 'rev-' + Date.now(),
      clientName: newReview.clientName,
      serviceName: newReview.serviceName,
      rating: newReview.rating,
      comment: newReview.comment,
      date: 'Reciente',
      verified: true,
      approved: true
    };

    updateReview(created.id, created);
    setReviewSubmitted(true);
    setTimeout(() => {
      setReviewSubmitted(false);
      setIsReviewModalOpen(false);
      setNewReview({
        clientName: '',
        serviceName: 'Micropigmentación de Cejas',
        rating: 5,
        comment: ''
      });
    }, 1800);
  };

  return (
    <section id="opiniones" className="py-24 bg-[#E8DDD4]/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="text-left max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white border border-[#E8DDD4] text-xs font-semibold uppercase tracking-widest text-[#C8A96B] font-button">
              <Star className="w-3.5 h-3.5 fill-[#C8A96B]" />
              <span>Experiencias Reales</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C2C2C] tracking-tight">
              Opiniones de Nuestras Clientes
            </h2>

            <p className="font-body text-sm sm:text-base text-[#2C2C2C]/75">
              Más de 2.400 mujeres en CDMX confían en nuestra precisión estética. La excelencia y el trato humano son nuestra firma.
            </p>
          </div>

          {/* Action and Navigation buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsReviewModalOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[#E8DDD4] text-xs font-semibold text-[#2C2C2C] hover:border-[#C8A96B] transition-all shadow-xs font-button"
            >
              <MessageSquarePlus className="w-4 h-4 text-[#C8A96B]" />
              <span>Dejar mi Opinión</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="Opinión anterior"
                className="p-2.5 rounded-full bg-white border border-[#E8DDD4] hover:bg-[#F8F5F2] text-[#2C2C2C] transition-colors shadow-xs"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Siguiente opinión"
                className="p-2.5 rounded-full bg-white border border-[#E8DDD4] hover:bg-[#F8F5F2] text-[#2C2C2C] transition-colors shadow-xs"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Testimonials Grid (Paginated) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews
            .slice(currentIndex * itemsPerPage, currentIndex * itemsPerPage + itemsPerPage)
            .map((item) => (
              <div
                key={item.id}
                className="p-7 rounded-2xl bg-white border border-[#E8DDD4] luxury-shadow flex flex-col justify-between space-y-6 text-left relative hover:-translate-y-1 transition-all duration-300 group"
              >
                {/* Subtle Quote Icon Background */}
                <Quote className="absolute top-6 right-6 w-10 h-10 text-[#E8DDD4]/40 pointer-events-none" />

                <div className="space-y-4">
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C8A96B] text-[#C8A96B]" />
                    ))}
                  </div>

                  {/* Comment Quote */}
                  <p className="font-quote text-base sm:text-lg italic text-[#2C2C2C]/90 leading-relaxed">
                    "{item.comment}"
                  </p>
                </div>

                {/* Author Details */}
                <div className="pt-4 border-t border-[#E8DDD4]/60 flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={item.clientPhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'}
                      alt={item.clientName}
                      className="w-11 h-11 rounded-full object-cover border border-[#C8A96B]/40 shadow-xs"
                    />
                    <div className="text-left">
                      <div className="flex items-center gap-1.5">
                        <p className="font-heading text-sm font-bold text-[#2C2C2C]">
                          {item.clientName}
                        </p>
                        {item.verified && (
                          <span title="Cliente Verificada">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#C8A96B]" />
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#2C2C2C]/60">
                        {item.serviceName}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

      </div>

      {/* Review Submission Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-[#F8F5F2] rounded-3xl p-6 sm:p-8 border border-[#E8DDD4] shadow-2xl relative text-left">
            
            <button
              onClick={() => setIsReviewModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/80 border border-[#E8DDD4] text-[#2C2C2C]/70 hover:text-[#2C2C2C] flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>

            {reviewSubmitted ? (
              <div className="py-8 text-center space-y-3 animate-fade-in">
                <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="font-heading text-xl font-bold text-[#2C2C2C]">¡Gracias por tu opinión!</h4>
                <p className="text-xs text-[#2C2C2C]/70">Tu valoración ayuda a más mujeres a conocer la calidad de Allegra Salon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#C8A96B] font-button">Tu Experiencia</span>
                  <h3 className="font-heading text-xl font-bold text-[#2C2C2C]">Dejar una Reseña</h3>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#2C2C2C] block mb-1">Nombre Completo</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Valeria Mansilla"
                    value={newReview.clientName}
                    onChange={(e) => setNewReview({ ...newReview, clientName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E8DDD4] text-xs text-[#2C2C2C] focus:outline-none focus:border-[#C8A96B]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#2C2C2C] block mb-1">Servicio Realizado</label>
                  <select
                    value={newReview.serviceName}
                    onChange={(e) => setNewReview({ ...newReview, serviceName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E8DDD4] text-xs text-[#2C2C2C] focus:outline-none focus:border-[#C8A96B]"
                  >
                    <option value="Microblading / Micropigmentación de Cejas">Microblading / Micropigmentación de Cejas</option>
                    <option value="Micropigmentación de Labios (Lip Blush)">Micropigmentación de Labios (Lip Blush)</option>
                    <option value="Delineado Permanente de Ojos">Delineado Permanente de Ojos</option>
                    <option value="Extensiones de Pestañas Premium">Extensiones de Pestañas Premium</option>
                    <option value="Lifting de Pestañas & Keratina">Lifting de Pestañas & Keratina</option>
                    <option value="Remoción de Pigmento Previo">Remoción de Pigmento Previo</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#2C2C2C] block mb-1">Puntuación</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                        className="p-1 text-[#C8A96B]"
                      >
                        <Star className={`w-6 h-6 ${star <= newReview.rating ? 'fill-[#C8A96B]' : 'text-neutral-300'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#2C2C2C] block mb-1">Tu Comentario</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Contanos tu experiencia, atención de las especialistas y el resultado final..."
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E8DDD4] text-xs text-[#2C2C2C] focus:outline-none focus:border-[#C8A96B] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#C8A96B] text-white text-xs font-semibold uppercase tracking-wider font-button hover:bg-[#B2904F] transition-colors shadow-md"
                >
                  Publicar Valoración
                </button>
              </form>
            )}

          </div>
        </div>
      )}
    </section>
  );
};
