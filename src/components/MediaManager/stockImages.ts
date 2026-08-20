export interface StockImage {
  category: 'cejas' | 'labios' | 'ojos' | 'pestanas' | 'salon' | 'especialistas';
  title: string;
  url: string;
}

export const CURATED_STOCK_IMAGES: StockImage[] = [
  // Cejas & Microblading
  {
    category: 'cejas',
    title: 'Microblading Pelo a Pelo Hiperrealista',
    url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=85'
  },
  {
    category: 'cejas',
    title: 'Powder Brows Efecto Polvo Sombreado',
    url: 'https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&w=1200&q=85'
  },
  {
    category: 'cejas',
    title: 'Diseño de Cejas con Visagismo Áureo',
    url: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=1200&q=85'
  },
  {
    category: 'cejas',
    title: 'Cejas Naturales Definidas',
    url: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=1200&q=85'
  },

  // Labios & Lip Blush
  {
    category: 'labios',
    title: 'Lip Blush Acuarela Rosa Durazno',
    url: 'https://images.unsplash.com/photo-1588510841407-742d87e07eb4?auto=format&fit=crop&w=1200&q=85'
  },
  {
    category: 'labios',
    title: 'Micropigmentación Labial Nude',
    url: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1200&q=85'
  },
  {
    category: 'labios',
    title: 'Labios Hidratados & Definidos',
    url: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1200&q=85'
  },

  // Ojos & Delineado
  {
    category: 'ojos',
    title: 'Delineado Lash Liner Sutil',
    url: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1200&q=85'
  },
  {
    category: 'ojos',
    title: 'Mirada Intensa & Párpados Definidos',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85'
  },

  // Pestañas
  {
    category: 'pestanas',
    title: 'Extensiones Volumen Ruso 4D',
    url: 'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?auto=format&fit=crop&w=1200&q=85'
  },
  {
    category: 'pestanas',
    title: 'Lifting de Pestañas con Keratina',
    url: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=1200&q=85'
  },
  {
    category: 'pestanas',
    title: 'Efecto Cat Eye Pelo a Pelo',
    url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=85'
  },

  // Estudio & Salón
  {
    category: 'salon',
    title: 'Cabina Privada de Micropigmentación',
    url: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=85'
  },
  {
    category: 'salon',
    title: 'Recepción Exclusiva Allegra Polanco',
    url: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1200&q=85'
  },
  {
    category: 'salon',
    title: 'Estación de Visagismo & Iluminación Clínica',
    url: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1200&q=85'
  },

  // Especialistas
  {
    category: 'especialistas',
    title: 'Master Artist & Directora',
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80'
  },
  {
    category: 'especialistas',
    title: 'Especialista en Micropigmentación Pro',
    url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80'
  },
  {
    category: 'especialistas',
    title: 'Lash & Beauty Specialist',
    url: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=800&q=80'
  }
];
