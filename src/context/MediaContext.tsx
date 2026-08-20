import React, { createContext, useContext, useState, useEffect } from 'react';
import { ServiceItem, GalleryItem, ReviewItem } from '../types';
import { 
  STUDIO_INFO, 
  INITIAL_SERVICES, 
  INITIAL_GALLERY, 
  INITIAL_REVIEWS 
} from '../data/initialData';

export interface HeroSlide {
  id: string;
  url: string;
  title: string;
  caption: string;
}

export interface SpecialistMember {
  name: string;
  title: string;
  description: string;
  photo: string;
  tier: string;
}

export interface MediaContextType {
  heroSlides: HeroSlide[];
  services: ServiceItem[];
  gallery: GalleryItem[];
  specialists: SpecialistMember[];
  reviews: ReviewItem[];
  
  // Update functions
  updateHeroSlide: (index: number, partial: Partial<HeroSlide>) => void;
  addHeroSlide: (slide: Omit<HeroSlide, 'id'>) => void;
  deleteHeroSlide: (index: number) => void;
  
  updateServiceImage: (serviceId: string, imageUrl: string) => void;
  updateService: (serviceId: string, partial: Partial<ServiceItem>) => void;
  
  updateGalleryItem: (id: string, partial: Partial<GalleryItem>) => void;
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  deleteGalleryItem: (id: string) => void;
  
  updateSpecialist: (index: number, partial: Partial<SpecialistMember>) => void;
  updateReview: (id: string, partial: Partial<ReviewItem>) => void;
  
  resetAllToDefault: () => void;
  isMediaManagerOpen: boolean;
  openMediaManager: (defaultTab?: 'hero' | 'servicios' | 'galeria' | 'equipo' | 'testimonios') => void;
  closeMediaManager: () => void;
  initialManagerTab: 'hero' | 'servicios' | 'galeria' | 'equipo' | 'testimonios';
}

const STORAGE_KEY = 'allegra_salon_site_media_v2';

const DEFAULT_HERO_SLIDES: HeroSlide[] = [
  {
    id: 'hero-1',
    url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=85',
    title: 'Microblading & Cejas Hiperrealistas',
    caption: 'Técnica rusa pelo a pelo milimétrica con visagismo áureo y pigmentos alemanes.'
  },
  {
    id: 'hero-2',
    url: 'https://images.unsplash.com/photo-1588510841407-742d87e07eb4?auto=format&fit=crop&w=1200&q=85',
    title: 'Lip Blush & Micropigmentación de Labios',
    caption: 'Color natural, contorno definido y frescura duradera sin alterar tu fisonomía.'
  },
  {
    id: 'hero-3',
    url: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=85',
    title: 'Estudio de Belleza Exclusivo en CDMX',
    caption: 'Santuario de sofisticación e higiene en Polanco y Colonia Juárez con Master Leticia Moctezuma.'
  }
];

const MediaContext = createContext<MediaContextType | undefined>(undefined);

export const MediaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_hero');
    return saved ? JSON.parse(saved) : DEFAULT_HERO_SLIDES;
  });

  const [services, setServices] = useState<ServiceItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_services');
    return saved ? JSON.parse(saved) : INITIAL_SERVICES;
  });

  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_gallery');
    return saved ? JSON.parse(saved) : INITIAL_GALLERY;
  });

  const [specialists, setSpecialists] = useState<SpecialistMember[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_specialists');
    return saved ? JSON.parse(saved) : STUDIO_INFO.specialists;
  });

  const [reviews, setReviews] = useState<ReviewItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [isMediaManagerOpen, setIsMediaManagerOpen] = useState(false);
  const [initialManagerTab, setInitialManagerTab] = useState<'hero' | 'servicios' | 'galeria' | 'equipo' | 'testimonios'>('hero');

  // Persistence triggers
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + '_hero', JSON.stringify(heroSlides));
  }, [heroSlides]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + '_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + '_gallery', JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + '_specialists', JSON.stringify(specialists));
  }, [specialists]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + '_reviews', JSON.stringify(reviews));
  }, [reviews]);

  // Handler functions
  const updateHeroSlide = (index: number, partial: Partial<HeroSlide>) => {
    setHeroSlides(prev => {
      const next = [...prev];
      if (next[index]) {
        next[index] = { ...next[index], ...partial };
      }
      return next;
    });
  };

  const addHeroSlide = (slide: Omit<HeroSlide, 'id'>) => {
    setHeroSlides(prev => [
      ...prev,
      { ...slide, id: 'hero-' + Date.now() }
    ]);
  };

  const deleteHeroSlide = (index: number) => {
    setHeroSlides(prev => prev.filter((_, i) => i !== index));
  };

  const updateServiceImage = (serviceId: string, imageUrl: string) => {
    setServices(prev => prev.map(s => s.id === serviceId ? { ...s, imageUrl } : s));
  };

  const updateService = (serviceId: string, partial: Partial<ServiceItem>) => {
    setServices(prev => prev.map(s => s.id === serviceId ? { ...s, ...partial } : s));
  };

  const updateGalleryItem = (id: string, partial: Partial<GalleryItem>) => {
    setGallery(prev => prev.map(g => g.id === id ? { ...g, ...partial } : g));
  };

  const addGalleryItem = (item: Omit<GalleryItem, 'id'>) => {
    setGallery(prev => [
      { ...item, id: 'gal-' + Date.now() },
      ...prev
    ]);
  };

  const deleteGalleryItem = (id: string) => {
    setGallery(prev => prev.filter(g => g.id !== id));
  };

  const updateSpecialist = (index: number, partial: Partial<SpecialistMember>) => {
    setSpecialists(prev => {
      const next = [...prev];
      if (next[index]) {
        next[index] = { ...next[index], ...partial };
      }
      return next;
    });
  };

  const updateReview = (id: string, partial: Partial<ReviewItem>) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, ...partial } : r));
  };

  const resetAllToDefault = () => {
    setHeroSlides(DEFAULT_HERO_SLIDES);
    setServices(INITIAL_SERVICES);
    setGallery(INITIAL_GALLERY);
    setSpecialists(STUDIO_INFO.specialists);
    setReviews(INITIAL_REVIEWS);
    localStorage.removeItem(STORAGE_KEY + '_hero');
    localStorage.removeItem(STORAGE_KEY + '_services');
    localStorage.removeItem(STORAGE_KEY + '_gallery');
    localStorage.removeItem(STORAGE_KEY + '_specialists');
    localStorage.removeItem(STORAGE_KEY + '_reviews');
  };

  const openMediaManager = (defaultTab: 'hero' | 'servicios' | 'galeria' | 'equipo' | 'testimonios' = 'hero') => {
    setInitialManagerTab(defaultTab);
    setIsMediaManagerOpen(true);
  };

  const closeMediaManager = () => {
    setIsMediaManagerOpen(false);
  };

  return (
    <MediaContext.Provider
      value={{
        heroSlides,
        services,
        gallery,
        specialists,
        reviews,
        updateHeroSlide,
        addHeroSlide,
        deleteHeroSlide,
        updateServiceImage,
        updateService,
        updateGalleryItem,
        addGalleryItem,
        deleteGalleryItem,
        updateSpecialist,
        updateReview,
        resetAllToDefault,
        isMediaManagerOpen,
        openMediaManager,
        closeMediaManager,
        initialManagerTab
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};

export const useMedia = () => {
  const context = useContext(MediaContext);
  if (!context) {
    throw new Error('useMedia must be used within a MediaProvider');
  }
  return context;
};
