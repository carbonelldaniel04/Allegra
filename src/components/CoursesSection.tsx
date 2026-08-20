/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { GraduationCap, Award, PlayCircle, CheckCircle2, Clock, Sparkles, BookOpen, MessageCircle, ArrowRight, ShieldCheck, Users } from 'lucide-react';
import { ONLINE_COURSES, STUDIO_INFO } from '../data/initialData';
import { OnlineCourse } from '../types';

interface CoursesSectionProps {
  onOpenChat: (courseName?: string) => void;
}

export const CoursesSection: React.FC<CoursesSectionProps> = ({ onOpenChat }) => {
  const [selectedCourse, setSelectedCourse] = useState<OnlineCourse>(ONLINE_COURSES[0]);
  const [activeCategory, setActiveCategory] = useState<string>('todos');

  const categories = [
    { id: 'todos', label: 'Todos los Cursos' },
    { id: 'Cejas', label: 'Microblading & Cejas' },
    { id: 'Labios', label: 'Lip Blush & Labios' },
    { id: 'Ojos', label: 'Delineado & Párpados' },
    { id: 'Corrección', label: 'Remoción & Corrección' }
  ];

  const filteredCourses = activeCategory === 'todos'
    ? ONLINE_COURSES
    : ONLINE_COURSES.filter(c => c.category.toLowerCase() === activeCategory.toLowerCase());

  const handleEnroll = (course: OnlineCourse) => {
    const text = encodeURIComponent(
      `¡Hola Master Leticia! Me interesa inscribirme al curso online: "${course.title}". ¿Podrían brindarme los detalles de acceso y formas de pago?`
    );
    window.open(`https://wa.me/${STUDIO_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section id="cursos" className="py-24 bg-white border-y border-[#E8DDD4] relative overflow-hidden">
      {/* Subtle Background Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C8A96B]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D8B4B0]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C8A96B]/15 text-[#8F6B2C] text-xs font-semibold uppercase tracking-widest mb-4">
            <GraduationCap className="w-4 h-4 text-[#C8A96B]" />
            <span>Allegra Academy Online</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-[#2C2C2C] tracking-tight mb-5">
            Cursos Online & Masterclasses
          </h2>

          <p className="text-base sm:text-lg text-[#2C2C2C]/75 font-body leading-relaxed">
            Fórmate con la metodología rusa y los estándares de élite de <strong className="font-semibold text-[#2C2C2C]">Master Leticia Moctezuma</strong>. Aprende desde cualquier lugar a tu propio ritmo con certificación avalada.
          </p>
        </div>

        {/* Value Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-2xl bg-[#F8F5F2] border border-[#E8DDD4]/80 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-[#C8A96B]/15 text-[#C8A96B] shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display font-medium text-lg text-[#2C2C2C] mb-1">Certificación Internacional</h3>
              <p className="text-sm text-[#2C2C2C]/70">Diploma oficial avalado por Allegra Academy con validez curricular y código QR verificable.</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#F8F5F2] border border-[#E8DDD4]/80 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-[#C8A96B]/15 text-[#C8A96B] shrink-0">
              <PlayCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display font-medium text-lg text-[#2C2C2C] mb-1">Acceso de por Vida en 4K</h3>
              <p className="text-sm text-[#2C2C2C]/70">Clases paso a paso en ultra alta definición con tomas macro en modelos reales y látex.</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#F8F5F2] border border-[#E8DDD4]/80 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-[#C8A96B]/15 text-[#C8A96B] shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display font-medium text-lg text-[#2C2C2C] mb-1">Tutoría & Grupo VIP</h3>
              <p className="text-sm text-[#2C2C2C]/70">Corrección de trazos directa por la Master y comunidad exclusiva para resolver dudas.</p>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                activeCategory === cat.id
                  ? 'bg-[#2C2C2C] text-white shadow-sm scale-105'
                  : 'bg-[#F8F5F2] text-[#2C2C2C]/70 hover:bg-[#E8DDD4] border border-[#E8DDD4]/80'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="group bg-[#F8F5F2] rounded-3xl overflow-hidden border border-[#E8DDD4] hover:border-[#C8A96B] transition-all duration-300 hover:shadow-xl flex flex-col justify-between"
            >
              <div>
                {/* Course Image Header */}
                <div className="relative aspect-[16/9] overflow-hidden bg-[#E8DDD4]">
                  <img
                    src={course.imageUrl}
                    alt={course.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2C2C2C]/80 via-transparent to-transparent" />
                  
                  {/* Category & Level Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#C8A96B] text-white text-xs font-semibold uppercase tracking-wider shadow">
                      {course.category}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[#2C2C2C] text-xs font-medium">
                      {course.level}
                    </span>
                  </div>

                  {/* Instructor Badge */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#C8A96B]" />
                      <span className="text-xs font-medium">{course.instructor}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-white/90">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{course.duration}</span>
                    </div>
                  </div>
                </div>

                {/* Course Body Content */}
                <div className="p-7">
                  <h3 className="text-xl font-display font-medium text-[#2C2C2C] mb-2 group-hover:text-[#C8A96B] transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-xs font-medium text-[#8F6B2C] mb-4">
                    {course.subtitle}
                  </p>
                  <p className="text-sm text-[#2C2C2C]/75 mb-6 leading-relaxed">
                    {course.description}
                  </p>

                  {/* Topics Checklist */}
                  <div className="mb-6 space-y-2">
                    <span className="text-xs uppercase font-semibold tracking-wider text-[#2C2C2C]/60 block mb-2">
                      Lo que aprenderás:
                    </span>
                    {course.topics.slice(0, 4).map((topic, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-[#2C2C2C]/80">
                        <CheckCircle2 className="w-4 h-4 text-[#C8A96B] shrink-0 mt-0.5" />
                        <span>{topic}</span>
                      </div>
                    ))}
                  </div>

                  {/* Includes List */}
                  <div className="p-4 rounded-xl bg-white border border-[#E8DDD4] mb-6 space-y-1.5">
                    <span className="text-xs font-semibold text-[#2C2C2C] flex items-center gap-1.5 mb-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#C8A96B]" />
                      Incluye en esta formación:
                    </span>
                    {course.includes.slice(0, 3).map((item, i) => (
                      <p key={i} className="text-xs text-[#2C2C2C]/70 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C8A96B]" />
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price & Action Buttons Footer */}
              <div className="px-7 pb-7 pt-2 border-t border-[#E8DDD4]/60 flex items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-[#2C2C2C]/60 uppercase tracking-wider block">Inversión única</span>
                  <div className="text-2xl font-display font-semibold text-[#2C2C2C]">
                    {course.priceLocal}
                  </div>
                  <span className="text-[11px] text-[#8F6B2C]">6 MSI con tarjetas de crédito</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenChat(`Deseo información del curso: ${course.title}`)}
                    className="p-3 rounded-full border border-[#E8DDD4] bg-white text-[#2C2C2C] hover:border-[#C8A96B] hover:text-[#C8A96B] transition-colors"
                    title="Preguntar a la IA"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleEnroll(course)}
                    className="font-button text-xs uppercase tracking-wider font-semibold px-6 py-3 rounded-full bg-[#C8A96B] text-white hover:bg-[#B2904F] transition-all duration-300 shadow-md hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
                  >
                    <span>Inscribirme</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Personalized Academy Consultation Banner */}
        <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-[#2C2C2C] text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="relative z-10 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#C8A96B] text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Mentoría & Asesoría Personalizada</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-medium text-white mb-2">
              ¿No sabes qué curso es el ideal para tu nivel?
            </h3>
            <p className="text-sm text-white/70 leading-relaxed">
              Consulta con nuestro asistente inteligente o agenda una videollamada de orientación gratuita con el equipo académico de Master Leticia Moctezuma.
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onOpenChat('¿Qué curso online me recomiendas para comenzar en micropigmentación?')}
              className="px-6 py-3 rounded-full bg-white/10 text-white hover:bg-white/20 border border-white/20 text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Consultar con IA
            </button>
            <a
              href={`https://wa.me/${STUDIO_INFO.whatsappNumber}?text=${encodeURIComponent('Hola! Quisiera orientación sobre los cursos online de Allegra Academy')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-[#C8A96B] text-white hover:bg-[#B2904F] text-xs font-semibold uppercase tracking-wider shadow transition-transform hover:scale-105"
            >
              Hablar con Asesor Académico
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
