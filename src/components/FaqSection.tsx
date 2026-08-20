import React, { useState } from 'react';
import { FAQS } from '../data/initialData';
import { ChevronDown, HelpCircle, MessageCircle, Sparkles } from 'lucide-react';

interface FaqSectionProps {
  onOpenChat: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenChat }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="preguntas" className="py-24 bg-[#F8F5F2] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white border border-[#E8DDD4] text-xs font-semibold uppercase tracking-widest text-[#C8A96B] font-button">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Respuestas Claras</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C2C2C] tracking-tight">
            Preguntas Frecuentes
          </h2>

          <p className="font-body text-sm sm:text-base text-[#2C2C2C]/75">
            Todo lo que necesitas saber sobre preparación, cuidados posteriores, técnicas y durabilidad.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-[#E8DDD4] bg-white overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="font-heading text-base sm:text-lg font-bold text-[#2C2C2C]">
                    {faq.q}
                  </span>
                  <div className={`p-1.5 rounded-full bg-[#F8F5F2] text-[#C8A96B] transition-transform duration-300 ${isOpen ? 'rotate-180 bg-[#C8A96B] text-white' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 text-left border-t border-[#E8DDD4]/50 pt-4 animate-in fade-in duration-200">
                    <p className="font-body text-sm text-[#2C2C2C]/80 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Chat assistant callout */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-[#E8DDD4]/40 to-[#D8B4B0]/30 border border-[#E8DDD4] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#C8A96B] shadow-xs shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#2C2C2C]">¿Tu consulta no figura en la lista?</p>
              <p className="text-xs text-[#2C2C2C]/70">Nuestra asistente de IA responde preguntas personalizadas al instante.</p>
            </div>
          </div>

          <button
            onClick={onOpenChat}
            className="font-button text-xs uppercase tracking-wider font-semibold px-5 py-2.5 rounded-full bg-[#2C2C2C] text-white hover:bg-[#C8A96B] transition-all flex items-center gap-2 shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Consultar Asistente IA</span>
          </button>
        </div>

      </div>
    </section>
  );
};
