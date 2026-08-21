import React, { useState } from 'react';
import { 
  X, Image as ImageIcon, Sparkles, Layers, Scissors, 
  Users, Star, Plus, Trash2, RefreshCw, Check, Upload, 
  ExternalLink, Eye, ArrowRight, ShieldCheck, GraduationCap,
  Download, Copy, FileJson, Code, CheckCheck, Share2
} from 'lucide-react';
import { useMedia, HeroSlide, SpecialistMember } from '../../context/MediaContext';
import { ImageFieldEditor } from './ImageFieldEditor';
import { ServiceItem, GalleryItem, ReviewItem } from '../../types';
import { ONLINE_COURSES, STUDIO_INFO } from '../../data/initialData';
import { AllegraLogo } from '../AllegraLogo';

export const MediaManagerModal: React.FC = () => {
  const {
    isMediaManagerOpen,
    closeMediaManager,
    initialManagerTab,
    heroSlides,
    updateHeroSlide,
    addHeroSlide,
    deleteHeroSlide,
    services,
    updateServiceImage,
    updateService,
    gallery,
    updateGalleryItem,
    addGalleryItem,
    deleteGalleryItem,
    specialists,
    updateSpecialist,
    reviews,
    updateReview,
    resetAllToDefault
  } = useMedia();

  const [activeTab, setActiveTab] = useState<'hero' | 'servicios' | 'galeria' | 'equipo' | 'testimonios' | 'cursos' | 'exportar'>((initialManagerTab as any) || 'hero');
  const [saveToast, setSaveToast] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);

  // Sync initial tab if opened from specific section
  React.useEffect(() => {
    if (initialManagerTab) {
      setActiveTab(initialManagerTab as any);
    }
  }, [initialManagerTab]);

  if (!isMediaManagerOpen) return null;

  const triggerToast = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2000);
  };

  // Compile full current media configuration
  const exportPayload = {
    exportDate: new Date().toISOString(),
    version: "2.0.0",
    studio: STUDIO_INFO.name,
    heroSlides,
    services,
    gallery,
    specialists,
    reviews,
    courses: ONLINE_COURSES
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(exportPayload, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2500);
  };

  const handleDownloadJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportPayload, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `allegra_salon_media_v0_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJson = () => {
    try {
      if (!importJsonText.trim()) return;
      const parsed = JSON.parse(importJsonText);
      if (parsed.heroSlides && Array.isArray(parsed.heroSlides)) {
        parsed.heroSlides.forEach((slide: any, idx: number) => {
          updateHeroSlide(idx, slide);
        });
      }
      if (parsed.services && Array.isArray(parsed.services)) {
        parsed.services.forEach((srv: any) => {
          updateService(srv.id, srv);
        });
      }
      if (parsed.specialists && Array.isArray(parsed.specialists)) {
        parsed.specialists.forEach((sp: any, idx: number) => {
          updateSpecialist(idx, sp);
        });
      }
      setImportStatus('¡Datos importados con éxito!');
      triggerToast();
      setTimeout(() => setImportStatus(null), 3000);
    } catch (e: any) {
      setImportStatus('Error: Formato JSON inválido (' + e.message + ')');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-5xl h-[90vh] max-h-[850px] bg-[#F8F5F2] rounded-3xl border border-[#E8DDD4] shadow-2xl flex flex-col overflow-hidden text-left">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-white border-b border-[#E8DDD4] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#2C2C2C] text-[#C8A96B] flex items-center justify-center shadow-sm">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading text-lg sm:text-xl font-bold text-[#2C2C2C]">
                  Gestor de Imágenes & Multimedia
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-[#C8A96B]/15 text-[#C8A96B] text-[10px] font-bold uppercase tracking-wider font-button">
                  En Vivo
                </span>
              </div>
              <p className="text-xs text-[#2C2C2C]/60">
                Cambia las fotos de banners, servicios, trabajos antes/después y especialistas.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (confirm('¿Deseas restaurar todas las imágenes y fotos del sitio a sus valores originales de fábrica?')) {
                  resetAllToDefault();
                  triggerToast();
                }
              }}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E8DDD4] text-xs font-semibold text-[#2C2C2C]/70 hover:bg-white hover:text-red-600 transition-colors"
              title="Restaurar fotos iniciales de fábrica"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Restablecer todo</span>
            </button>

            <button
              onClick={closeMediaManager}
              className="w-9 h-9 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-600 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Category Navigation Tabs */}
        <div className="px-6 py-2.5 bg-[#E8DDD4]/40 border-b border-[#E8DDD4] flex items-center gap-2 overflow-x-auto shrink-0 scrollbar-none">
          {[
            { id: 'hero', label: '1. Portada (Hero)', icon: Layers, count: heroSlides.length },
            { id: 'cursos', label: '2. Cursos Online', icon: GraduationCap, count: ONLINE_COURSES.length },
            { id: 'servicios', label: '3. Servicios & Tratamientos', icon: Scissors, count: services.length },
            { id: 'galeria', label: '4. Galería Antes/Después', icon: Eye, count: gallery.length },
            { id: 'equipo', label: '5. Especialistas', icon: Users, count: specialists.length },
            { id: 'testimonios', label: '6. Testimonios', icon: Star, count: reviews.length },
            { id: 'exportar', label: '7. Guardar / Exportar para v0', icon: Download, count: 'v0' }
          ].map((tab) => {
            const Icon = tab.icon;
            const isV0 = tab.id === 'exportar';
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all font-button ${
                  activeTab === tab.id
                    ? isV0 ? 'bg-[#C8A96B] text-white shadow-md' : 'bg-[#2C2C2C] text-white shadow-md'
                    : isV0 ? 'bg-[#C8A96B]/15 text-[#8F6B2C] hover:bg-[#C8A96B]/25' : 'bg-white/80 text-[#2C2C2C]/70 hover:bg-white hover:text-[#2C2C2C]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${activeTab === tab.id ? 'text-white' : isV0 ? 'text-[#8F6B2C]' : 'text-neutral-400'}`} />
                <span>{tab.label}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-neutral-200 text-neutral-700'}`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* TAB 1: HERO CAROUSEL SLIDES */}
          {activeTab === 'hero' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-heading text-lg font-bold text-[#2C2C2C]">Slides del Banner Principal (Hero)</h4>
                  <p className="text-xs text-[#2C2C2C]/65">Edita las fotos de gran formato que rotan en la portada de la web.</p>
                </div>
                <button
                  onClick={() => {
                    addHeroSlide({
                      url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=85',
                      title: 'Nuevo Slide de Portada',
                      caption: 'Descripción estética de alta gama para Allegra Salon.'
                    });
                    triggerToast();
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#C8A96B] hover:bg-[#B2904F] text-white text-xs font-semibold font-button shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Agregar Slide</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {heroSlides.map((slide, index) => (
                  <div key={slide.id || index} className="bg-white rounded-2xl border border-[#E8DDD4] p-4 shadow-sm space-y-3 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-md bg-[#2C2C2C] text-[#C8A96B] text-[11px] font-bold font-mono">
                          Slide #{index + 1}
                        </span>
                        {heroSlides.length > 1 && (
                          <button
                            onClick={() => {
                              if (confirm('¿Eliminar este slide?')) {
                                deleteHeroSlide(index);
                                triggerToast();
                              }
                            }}
                            className="text-neutral-400 hover:text-red-600 p-1 transition-colors"
                            title="Eliminar slide"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      <ImageFieldEditor
                        label="Foto de Fondo del Banner"
                        currentUrl={slide.url}
                        aspectRatioClass="aspect-video"
                        categoryFilter="cejas"
                        onChangeUrl={(newUrl) => {
                          updateHeroSlide(index, { url: newUrl });
                          triggerToast();
                        }}
                      />

                      <div className="space-y-2 pt-1">
                        <div>
                          <label className="text-[11px] font-semibold text-[#2C2C2C]">Título del Slide</label>
                          <input
                            type="text"
                            value={slide.title}
                            onChange={(e) => updateHeroSlide(index, { title: e.target.value })}
                            className="w-full mt-1 px-3 py-1.5 text-xs rounded-xl border border-[#E8DDD4] bg-white focus:outline-none focus:border-[#C8A96B]"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-semibold text-[#2C2C2C]">Subtítulo / Bajada</label>
                          <textarea
                            rows={2}
                            value={slide.caption}
                            onChange={(e) => updateHeroSlide(index, { caption: e.target.value })}
                            className="w-full mt-1 px-3 py-1.5 text-xs rounded-xl border border-[#E8DDD4] bg-white focus:outline-none focus:border-[#C8A96B] resize-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: SERVICIOS */}
          {activeTab === 'servicios' && (
            <div className="space-y-6">
              <div>
                <h4 className="font-heading text-lg font-bold text-[#2C2C2C]">Imágenes y Datos de Servicios</h4>
                <p className="text-xs text-[#2C2C2C]/65">Personaliza la foto de portada, precio y descripción de cada tratamiento.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                  <div key={service.id} className="bg-white rounded-2xl border border-[#E8DDD4] p-4 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#D8B4B0]/30 text-[#2C2C2C] text-[10px] font-bold uppercase tracking-wider font-button">
                        {service.category}
                      </span>
                      <span className="text-xs font-bold text-[#C8A96B] font-heading">{service.priceLocal}</span>
                    </div>

                    <ImageFieldEditor
                      label="Foto de Portada del Servicio"
                      currentUrl={service.imageUrl}
                      aspectRatioClass="aspect-video"
                      categoryFilter={service.category as any}
                      onChangeUrl={(newUrl) => {
                        updateServiceImage(service.id, newUrl);
                        triggerToast();
                      }}
                    />

                    <div className="space-y-2">
                      <div>
                        <label className="text-[11px] font-semibold text-[#2C2C2C]">Nombre del Servicio</label>
                        <input
                          type="text"
                          value={service.title}
                          onChange={(e) => updateService(service.id, { title: e.target.value })}
                          className="w-full mt-1 px-3 py-1.5 text-xs rounded-xl border border-[#E8DDD4] bg-white font-medium focus:outline-none focus:border-[#C8A96B]"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-[#2C2C2C]">Precio / Inversión</label>
                        <input
                          type="text"
                          value={service.priceLocal}
                          onChange={(e) => updateService(service.id, { priceLocal: e.target.value })}
                          className="w-full mt-1 px-3 py-1.5 text-xs rounded-xl border border-[#E8DDD4] bg-white focus:outline-none focus:border-[#C8A96B]"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-[#2C2C2C]">Descripción Corta</label>
                        <textarea
                          rows={2}
                          value={service.shortDescription}
                          onChange={(e) => updateService(service.id, { shortDescription: e.target.value })}
                          className="w-full mt-1 px-3 py-1.5 text-xs rounded-xl border border-[#E8DDD4] bg-white focus:outline-none focus:border-[#C8A96B] resize-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: GALERÍA ANTES Y DESPUÉS */}
          {activeTab === 'galeria' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-heading text-lg font-bold text-[#2C2C2C]">Galería de Trabajos (Antes y Después)</h4>
                  <p className="text-xs text-[#2C2C2C]/65">Configura la foto de "Antes" y la foto de "Después" para el comparador interactivo.</p>
                </div>
                <button
                  onClick={() => {
                    addGalleryItem({
                      title: 'Nuevo Trabajo de Micropigmentación',
                      category: 'cejas',
                      beforeUrl: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=700&q=80',
                      afterUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=700&q=80',
                      technique: 'Técnica Rusa Hiperrealista',
                      healedResult: true,
                      artist: 'Master Leticia Moctezuma',
                      date: '2026-08-20',
                      description: 'Diseño de visagismo áureo y armonización facial.'
                    });
                    triggerToast();
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#C8A96B] hover:bg-[#B2904F] text-white text-xs font-semibold font-button shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Agregar Caso Antes/Después</span>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {gallery.map((item) => (
                  <div key={item.id} className="bg-white rounded-2xl border border-[#E8DDD4] p-5 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#2C2C2C] text-[#C8A96B] text-[10px] font-bold uppercase font-button">
                          {item.category}
                        </span>
                        <span className="text-xs font-semibold text-[#2C2C2C]">{item.artist}</span>
                      </div>
                      <button
                        onClick={() => {
                          if (confirm('¿Eliminar este caso de la galería?')) {
                            deleteGalleryItem(item.id);
                            triggerToast();
                          }
                        }}
                        className="text-neutral-400 hover:text-red-600 p-1 transition-colors"
                        title="Eliminar caso"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Before and After Image Pair */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <ImageFieldEditor
                        label="Foto ANTES"
                        currentUrl={item.beforeUrl}
                        aspectRatioClass="aspect-square"
                        categoryFilter={item.category as any}
                        onChangeUrl={(newUrl) => {
                          updateGalleryItem(item.id, { beforeUrl: newUrl });
                          triggerToast();
                        }}
                      />

                      <ImageFieldEditor
                        label="Foto DESPUÉS"
                        currentUrl={item.afterUrl}
                        aspectRatioClass="aspect-square"
                        categoryFilter={item.category as any}
                        onChangeUrl={(newUrl) => {
                          updateGalleryItem(item.id, { afterUrl: newUrl });
                          triggerToast();
                        }}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div>
                        <label className="text-[11px] font-semibold text-[#2C2C2C]">Título del Trabajo</label>
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => updateGalleryItem(item.id, { title: e.target.value })}
                          className="w-full mt-1 px-3 py-1.5 text-xs rounded-xl border border-[#E8DDD4] bg-white focus:outline-none focus:border-[#C8A96B]"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-[#2C2C2C]">Técnica Empleada</label>
                        <input
                          type="text"
                          value={item.technique}
                          onChange={(e) => updateGalleryItem(item.id, { technique: e.target.value })}
                          className="w-full mt-1 px-3 py-1.5 text-xs rounded-xl border border-[#E8DDD4] bg-white focus:outline-none focus:border-[#C8A96B]"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: ESPECIALISTAS & EQUIPO */}
          {activeTab === 'equipo' && (
            <div className="space-y-6">
              <div>
                <h4 className="font-heading text-lg font-bold text-[#2C2C2C]">Especialistas & Artistas</h4>
                <p className="text-xs text-[#2C2C2C]/65">Actualiza las fotos de perfil y descripciones de Master Leticia Moctezuma y el equipo.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {specialists.map((spec, index) => (
                  <div key={index} className="bg-white rounded-2xl border border-[#E8DDD4] p-5 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#C8A96B]/20 text-[#2C2C2C] text-[10px] font-bold uppercase tracking-wider font-button">
                        {spec.tier}
                      </span>
                    </div>

                    <ImageFieldEditor
                      label={`Retrato de ${spec.name}`}
                      currentUrl={spec.photo}
                      aspectRatioClass="aspect-square"
                      categoryFilter="especialistas"
                      onChangeUrl={(newUrl) => {
                        updateSpecialist(index, { photo: newUrl });
                        triggerToast();
                      }}
                    />

                    <div className="space-y-2">
                      <div>
                        <label className="text-[11px] font-semibold text-[#2C2C2C]">Nombre</label>
                        <input
                          type="text"
                          value={spec.name}
                          onChange={(e) => updateSpecialist(index, { name: e.target.value })}
                          className="w-full mt-1 px-3 py-1.5 text-xs rounded-xl border border-[#E8DDD4] bg-white font-bold focus:outline-none focus:border-[#C8A96B]"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-[#2C2C2C]">Cargo / Título</label>
                        <input
                          type="text"
                          value={spec.title}
                          onChange={(e) => updateSpecialist(index, { title: e.target.value })}
                          className="w-full mt-1 px-3 py-1.5 text-xs rounded-xl border border-[#E8DDD4] bg-white focus:outline-none focus:border-[#C8A96B]"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-[#2C2C2C]">Biografía / Trayectoria</label>
                        <textarea
                          rows={3}
                          value={spec.description}
                          onChange={(e) => updateSpecialist(index, { description: e.target.value })}
                          className="w-full mt-1 px-3 py-1.5 text-xs rounded-xl border border-[#E8DDD4] bg-white focus:outline-none focus:border-[#C8A96B] resize-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: TESTIMONIOS */}
          {activeTab === 'testimonios' && (
            <div className="space-y-6">
              <div>
                <h4 className="font-heading text-lg font-bold text-[#2C2C2C]">Reseñas & Fotos de Clientes</h4>
                <p className="text-xs text-[#2C2C2C]/65">Modifica los avatares y opiniones de clientas reales.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reviews.map((rev) => (
                  <div key={rev.id} className="bg-white rounded-2xl border border-[#E8DDD4] p-4 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#2C2C2C]">{rev.clientName}</span>
                      <div className="flex items-center gap-0.5">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-[#C8A96B] text-[#C8A96B]" />
                        ))}
                      </div>
                    </div>

                    <ImageFieldEditor
                      label="Foto de Avatar de la Cliente"
                      currentUrl={rev.clientPhoto || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80'}
                      aspectRatioClass="aspect-square"
                      categoryFilter="especialistas"
                      onChangeUrl={(newUrl) => {
                        updateReview(rev.id, { clientPhoto: newUrl });
                        triggerToast();
                      }}
                    />

                    <div className="space-y-2">
                      <div>
                        <label className="text-[11px] font-semibold text-[#2C2C2C]">Nombre</label>
                        <input
                          type="text"
                          value={rev.clientName}
                          onChange={(e) => updateReview(rev.id, { clientName: e.target.value })}
                          className="w-full mt-1 px-3 py-1.5 text-xs rounded-xl border border-[#E8DDD4] bg-white focus:outline-none focus:border-[#C8A96B]"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-[#2C2C2C]">Comentario</label>
                        <textarea
                          rows={3}
                          value={rev.comment}
                          onChange={(e) => updateReview(rev.id, { comment: e.target.value })}
                          className="w-full mt-1 px-3 py-1.5 text-xs rounded-xl border border-[#E8DDD4] bg-white focus:outline-none focus:border-[#C8A96B] resize-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: CURSOS ONLINE ACADEMY */}
          {activeTab === 'cursos' && (
            <div className="space-y-6">
              <div>
                <h4 className="font-heading text-lg font-bold text-[#2C2C2C]">Cursos Online & Masterclasses</h4>
                <p className="text-xs text-[#2C2C2C]/65">Imágenes y datos de portada de la academia online.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {ONLINE_COURSES.map((course) => (
                  <div key={course.id} className="bg-white rounded-2xl border border-[#E8DDD4] p-5 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#C8A96B]/15 text-[#8F6B2C] text-[11px] font-bold uppercase tracking-wider">
                        {course.category}
                      </span>
                      <span className="text-xs font-bold text-[#2C2C2C]">{course.priceLocal}</span>
                    </div>

                    <div className="space-y-1">
                      <h5 className="font-display font-medium text-sm text-[#2C2C2C]">{course.title}</h5>
                      <p className="text-[11px] text-[#8F6B2C]">{course.subtitle}</p>
                    </div>

                    <ImageFieldEditor
                      label="Imagen de Portada del Curso"
                      currentUrl={course.imageUrl}
                      aspectRatioClass="aspect-video"
                      categoryFilter="servicios"
                      onChangeUrl={(newUrl) => {
                        course.imageUrl = newUrl;
                        triggerToast();
                      }}
                    />

                    <div className="p-3 bg-[#F8F5F2] rounded-xl text-xs space-y-1">
                      <div className="flex justify-between text-[#2C2C2C]/70">
                        <span>Instructor:</span>
                        <span className="font-medium text-[#2C2C2C]">{course.instructor}</span>
                      </div>
                      <div className="flex justify-between text-[#2C2C2C]/70">
                        <span>Duración:</span>
                        <span className="font-medium text-[#2C2C2C]">{course.duration}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: GUARDAR Y EXPORTAR PARA V0 */}
          {activeTab === 'exportar' && (
            <div className="space-y-6 animate-fade-in">
              <div className="p-6 rounded-2xl bg-gradient-to-r from-[#2C2C2C] to-[#1A1A1A] text-white space-y-3">
                <div className="flex items-center gap-2 text-[#C8A96B]">
                  <Download className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-wider">Exportación para v0 & Despliegue</span>
                </div>
                <h4 className="font-display text-2xl font-medium">Todas tus imágenes y datos listos para subir</h4>
                <p className="text-xs sm:text-sm text-white/75 max-w-2xl leading-relaxed">
                  Todas las fotos y textos que configuraste están guardados localmente y listos. Puedes copiar el paquete JSON completo o descargar el archivo de respaldo para importarlo directamente en tu proyecto en v0 o GitHub.
                </p>
              </div>

              {/* Action Buttons Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={handleCopyJson}
                  className="p-5 rounded-2xl bg-white border-2 border-[#C8A96B] hover:bg-[#C8A96B]/5 transition-all text-left flex items-start gap-4 group shadow-sm"
                >
                  <div className="p-3 rounded-xl bg-[#C8A96B] text-white shrink-0 group-hover:scale-105 transition-transform">
                    {copiedJson ? <CheckCheck className="w-6 h-6" /> : <Copy className="w-6 h-6" />}
                  </div>
                  <div>
                    <h5 className="font-heading font-bold text-[#2C2C2C] text-sm flex items-center gap-2">
                      {copiedJson ? '¡JSON Copiado al Portapapeles!' : 'Copiar JSON Completo'}
                    </h5>
                    <p className="text-xs text-[#2C2C2C]/65 mt-1">
                      Copia todas las URLs de imágenes, servicios, testimonios y cursos en formato JSON estructurado.
                    </p>
                  </div>
                </button>

                <button
                  onClick={handleDownloadJson}
                  className="p-5 rounded-2xl bg-white border border-[#E8DDD4] hover:border-[#2C2C2C] transition-all text-left flex items-start gap-4 group shadow-sm"
                >
                  <div className="p-3 rounded-xl bg-[#2C2C2C] text-white shrink-0 group-hover:scale-105 transition-transform">
                    <FileJson className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="font-heading font-bold text-[#2C2C2C] text-sm">Descargar Backup (.json)</h5>
                    <p className="text-xs text-[#2C2C2C]/65 mt-1">
                      Descarga un archivo local con todas las imágenes cargadas para guardarlo en tu computadora.
                    </p>
                  </div>
                </button>
              </div>

              {/* Direct Image URLs Gallery Checklist */}
              <div className="bg-white rounded-2xl border border-[#E8DDD4] p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h5 className="font-heading font-bold text-sm text-[#2C2C2C] flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-[#C8A96B]" />
                    Resumen de Imágenes Activas en la Web ({heroSlides.length + services.length + gallery.length + specialists.length} fotos)
                  </h5>
                  <span className="text-[11px] text-[#2C2C2C]/60">URLs CDN Permanentes</span>
                </div>

                <div className="max-h-60 overflow-y-auto space-y-2 pr-1 divide-y divide-[#E8DDD4]/50">
                  {/* Hero Slides */}
                  {heroSlides.map((s, idx) => (
                    <div key={'h-' + idx} className="pt-2 flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2 truncate">
                        <img src={s.url} alt="" className="w-8 h-8 rounded-lg object-cover shrink-0 border border-[#E8DDD4]" />
                        <span className="font-medium text-[#2C2C2C] truncate">Hero #{idx + 1}: {s.title}</span>
                      </div>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(s.url);
                          triggerToast();
                        }}
                        className="px-2.5 py-1 rounded-lg bg-[#F8F5F2] hover:bg-[#E8DDD4] text-[#2C2C2C] text-[10px] font-semibold shrink-0"
                      >
                        Copiar URL
                      </button>
                    </div>
                  ))}

                  {/* Services */}
                  {services.map((s) => (
                    <div key={'s-' + s.id} className="pt-2 flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2 truncate">
                        <img src={s.imageUrl} alt="" className="w-8 h-8 rounded-lg object-cover shrink-0 border border-[#E8DDD4]" />
                        <span className="font-medium text-[#2C2C2C] truncate">Servicio: {s.title}</span>
                      </div>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(s.imageUrl);
                          triggerToast();
                        }}
                        className="px-2.5 py-1 rounded-lg bg-[#F8F5F2] hover:bg-[#E8DDD4] text-[#2C2C2C] text-[10px] font-semibold shrink-0"
                      >
                        Copiar URL
                      </button>
                    </div>
                  ))}

                  {/* Specialists */}
                  {specialists.map((sp, idx) => (
                    <div key={'sp-' + idx} className="pt-2 flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2 truncate">
                        <img src={sp.photo} alt="" className="w-8 h-8 rounded-lg object-cover shrink-0 border border-[#E8DDD4]" />
                        <span className="font-medium text-[#2C2C2C] truncate">Equipo: {sp.name}</span>
                      </div>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(sp.photo);
                          triggerToast();
                        }}
                        className="px-2.5 py-1 rounded-lg bg-[#F8F5F2] hover:bg-[#E8DDD4] text-[#2C2C2C] text-[10px] font-semibold shrink-0"
                      >
                        Copiar URL
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Import Section */}
              <div className="bg-white rounded-2xl border border-[#E8DDD4] p-5 space-y-3">
                <h5 className="font-heading font-bold text-sm text-[#2C2C2C] flex items-center gap-2">
                  <Code className="w-4 h-4 text-[#C8A96B]" />
                  Importar Configuración JSON Personalizada
                </h5>
                <textarea
                  rows={3}
                  placeholder='Pega aquí el JSON exportado previamente para restaurar todas tus imágenes...'
                  value={importJsonText}
                  onChange={(e) => setImportJsonText(e.target.value)}
                  className="w-full p-3 rounded-xl border border-[#E8DDD4] text-xs font-mono bg-[#F8F5F2] focus:outline-none focus:border-[#C8A96B]"
                />
                <div className="flex items-center justify-between">
                  {importStatus && (
                    <span className="text-xs font-semibold text-[#8F6B2C]">{importStatus}</span>
                  )}
                  <button
                    onClick={handleImportJson}
                    disabled={!importJsonText.trim()}
                    className="ml-auto px-4 py-2 rounded-xl bg-[#2C2C2C] text-white hover:bg-[#C8A96B] transition-colors text-xs font-semibold uppercase tracking-wider font-button disabled:opacity-50"
                  >
                    Importar y Aplicar
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer Bar */}
        <div className="px-6 py-3.5 bg-white border-t border-[#E8DDD4] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs text-[#2C2C2C]/70">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Todos los cambios se guardan y actualizan automáticamente en vivo en el sitio web.</span>
          </div>

          <div className="flex items-center gap-3">
            {saveToast && (
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 flex items-center gap-1.5 animate-fade-in">
                <Check className="w-3.5 h-3.5" /> ¡Guardado en vivo!
              </span>
            )}
            <button
              onClick={closeMediaManager}
              className="px-6 py-2 rounded-xl bg-[#2C2C2C] text-white hover:bg-[#C8A96B] transition-colors text-xs font-semibold uppercase tracking-wider font-button shadow-md"
            >
              Cerrar y Ver Cambios
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
