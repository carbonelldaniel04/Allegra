import { ServiceItem, GalleryItem, ReviewItem, Appointment, Client, ChatLead, IntegrationConfig, OnlineCourse } from '../types';

export const STUDIO_INFO = {
  name: "Allegra Salon",
  subtitle: "Master Leticia Moctezuma & Allegra Artists",
  slogan: "Diseño hiperrealista de cejas, micropigmentación avanzada y pestañas de alta gama en CDMX.",
  phone: "(55) 5207-4042",
  phoneAlt: "(55) 5511-9181",
  whatsappNumber: "525636360139",
  whatsappUrl: "https://wa.me/525636360139?text=Hola!%20Quisiera%20consultar%20por%20un%20servicio%20en%20Allegra%20Salon%20con%20Leticia%20Moctezuma",
  email: "contacto@allegrasalon.com",
  branches: [
    {
      name: "Sucursal Polanco",
      address: "Sudermann 248 (a un costado de Chedraui Selecto Galerías Polanco), Col. Polanco, Miguel Hidalgo, CDMX",
      hours: "Lunes a Viernes: 09:00 a 18:00 hs | Sábados: 09:00 a 16:00 hs"
    },
    {
      name: "Sucursal Colonia Juárez",
      address: "Toledo 46, Col. Juárez, Cuauhtémoc, CDMX (entre Hamburgo y Chapultepec, a pasos de la Diana Cazadora y Metro Sevilla)",
      hours: "Lunes a Viernes: 09:00 a 17:30 hs | Sábados: 09:00 a 16:00 hs"
    }
  ],
  address: "Sudermann 248, Col. Polanco & Toledo 46, Col. Juárez, Ciudad de México",
  instagram: "@allegrasalon",
  facebook: "facebook.com/allegrasalon",
  hours: {
    weekdays: "Lunes a Viernes: 09:00 a 18:00 hs",
    saturday: "Sábados: 09:00 a 16:00 hs",
    sunday: "Domingos: Cerrado (atención con cita previa)"
  },
  promotions: [
    "6 Meses Sin Intereses con todas las tarjetas de crédito",
    "10% de descuento en pago de contado / efectivo",
    "Pomada post-tratamiento de grado dermatológico incluida en todos los servicios",
    "Diseño de visagismo y depilación de cortesía previo a tu procedimiento"
  ],
  specialists: [
    {
      name: "Leticia Moctezuma",
      title: "Master Artist Internacional & Fundadora",
      description: "Más de 18 años de trayectoria y múltiples certificaciones internacionales en Rusia, Europa y América. Forma y supervisa personalmente a todas las artistas de Allegra Academy.",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      tier: "Master"
    },
    {
      name: "Allegra Artists (Equipo Pro)",
      title: "Artistas Certificadas por Allegra Academy & COFEPRIS",
      description: "Especialistas con 3 a 5 años de experiencia clínica continua, avaladas por COFEPRIS y formadas bajo las técnicas exclusivas de Leticia Moctezuma.",
      photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
      tier: "Artista Pro"
    },
    {
      name: "Camila & Luciana",
      title: "Lash & Dermocosmética Specialists",
      description: "Expertas en visagismo de mirada, efectos de volumen ruso y tratamientos de nutrición con keratina botox.",
      photo: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80",
      tier: "Lash Master"
    }
  ]
};

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'microblading-cejas',
    title: 'Microblading & Micropigmentación de Cejas',
    category: 'cejas',
    shortDescription: 'Trazos hiperrealistas pelo a pelo o efecto sombreado (Powder Brows) con pigmentos alemanes de alta gama.',
    fullDescription: 'Técnica vanguardista de micropigmentación que dibuja finos trazos pelo a pelo siguiendo el patrón natural de crecimiento de tus cejas. Incluye visagismo previo con compás áureo, depilación, pomada post-tratamiento y anestesia tópica sin dolor. Puedes elegir realizarte el procedimiento con Master Leticia Moctezuma ($5,500 MXN) o con Artistas Allegra certificadas ($3,500 MXN). Retoque a 30-45 días disponible.',
    durationMinutes: 120,
    priceUSD: 195,
    priceLocal: '$3,500 - $5,500 MXN',
    benefits: [
      'Cejas hiperrealistas y pobladas con simetría milimétrica',
      'Técnicas rusas de precisión y pigmentos alemanes hipoalergénicos',
      'Incluye pomada regeneradora post-tratamiento de regalo',
      'Opciones con Master Leticia Moctezuma ($5,500 MXN) o Artista Certificada ($3,500 MXN)',
      '6 Meses Sin Intereses con tarjetas o 10% OFF en efectivo'
    ],
    preparation: [
      'No ingerir aspirinas, anticoagulantes ni alcohol 24hs antes',
      'Evitar cafeína en exceso el día de la cita',
      'No es necesario depilarte antes; el diseño incluye perfilado'
    ],
    aftercare: [
      'Aplicar la pomada entregada 3 veces al día durante los primeros 7 días',
      'Evitar vapor, albercas, saunas y sol directo por 10 días',
      'No retirar las pequeñas micro-escamas durante la cicatrización'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    popular: true
  },
  {
    id: 'micropigmentacion-labios',
    title: 'Micropigmentación de Labios (Lip Blush & Full Lips)',
    category: 'labios',
    shortDescription: 'Color permanente, corrección de asimetrías y efecto volumen óptico con técnica de acuarela.',
    fullDescription: 'Restaura el tono juvenil, define los bordes desdibujados y logra un rubor saludable sin necesidad de usar labial a diario. Realizado con técnica indolora y pigmentos orgánicos que se adaptan a tu subtono de piel. Disponible con Master Leticia Moctezuma ($5,500 MXN) o Artistas Allegra ($3,500 MXN).',
    durationMinutes: 120,
    priceUSD: 195,
    priceLocal: '$3,500 - $5,500 MXN',
    benefits: [
      'Tono uniforme, fresco y saludable 24/7',
      'Corrección de asimetrías y contorno desdibujado',
      'Efecto visual de mayor volumen e hidratación',
      'Durabilidad de 2 a 3 años según tipo de piel'
    ],
    preparation: [
      'Mantener los labios súper hidratados 3 días previos',
      'Si tienes antecedentes de herpes labial, realizar profilaxis con tu médico',
      'Evitar tratamientos exfoliantes fuertes 48hs antes'
    ],
    aftercare: [
      'Aplicar el bálsamo hidratante provisto con frecuencia',
      'Tomar líquidos con popote las primeras 24 horas',
      'Evitar alimentos muy calientes o picantes los primeros 3 días'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1588510841407-742d87e07eb4?auto=format&fit=crop&w=800&q=80',
    popular: true
  },
  {
    id: 'delineado-ojos',
    title: 'Delineado Permanente de Ojos (Lash Liner & Eyeliner)',
    category: 'ojos',
    shortDescription: 'Definición elegante entre pestañas o delineado clásico difuminado para iluminar y rasgar la mirada.',
    fullDescription: 'Pigmentación milimétrica en la línea superior e inferior de pestañas. Aporta densidad visual inmediata a tus ojos y abre la mirada sin necesidad de maquillarte a diario. Realizado bajo anestesia tópica sin molestias.',
    durationMinutes: 90,
    priceUSD: 195,
    priceLocal: '$3,500 - $5,500 MXN',
    benefits: [
      'Mirada intensa y definida desde el primer minuto',
      'A prueba de agua, sudor, alberca y lágrimas',
      'Pigmentos fijadores estables que no viran a tonos indeseados',
      'Ideal para personas activas o alérgicas al maquillaje'
    ],
    preparation: [
      'Retirar lentes de contacto antes de la cita',
      'No acudir con extensiones de pestañas ni rímel waterproof',
      'Suspender serums estimulantes de pestañas 5 días antes'
    ],
    aftercare: [
      'Mantener los párpados limpios y secos por 48 horas',
      'No frotar los ojos ni usar sombras por 7 días',
      'Utilizar lágrimas artificiales si experimenta ligera sequedad'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'remocion-pigmento',
    title: 'Remoción & Despigmentación de Tatuaje Previo',
    category: 'cejas',
    shortDescription: 'Extracción segura de pigmentos antiguos no deseados, virados a rojo, azul o mal diseñados.',
    fullDescription: 'Tratamiento especializado para aclarar y extraer pigmentos antiguos o trabajos mal realizados en cejas, párpados o labios. Técnica no invasiva que preserva los folículos naturales y prepara la piel para un nuevo diseño impecable.',
    durationMinutes: 60,
    priceUSD: 195,
    priceLocal: '$3,500 - $5,500 MXN / sesión',
    benefits: [
      'Aclara y elimina pigmentos virados o asimétricos',
      'No daña los vellos ni la estructura dérmica natural',
      'Permite reconstruir un nuevo diseño desde cero',
      'Asesoría y diagnóstico personalizado previo'
    ],
    preparation: [
      'No aplicar cremas ácidas ni retinoides 1 semana antes',
      'Evitar el bronceado previo en la zona a tratar'
    ],
    aftercare: [
      'Mantener la zona limpia y sin maquillaje por 7 días',
      'Aplicar la crema regeneradora recetada',
      'Esperar de 4 a 6 semanas para la siguiente sesión o nuevo microblading'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'extensiones-pestanas',
    title: 'Extensiones de Pestañas (Clásicas & Volumen Ruso)',
    category: 'pestanas',
    shortDescription: 'Aplicación pelo a pelo y abanicos artesanales con fibras de seda ultraligeras y adhesivo hipoalergénico.',
    fullDescription: 'Disfruta de pestañas abundantes, curvadas y de impacto. Diseñamos el mapping ideal (Cat Eye, Doll Eye, Ardilla o Natural) según la morfología de tus ojos para un resultado armónico.',
    durationMinutes: 100,
    priceUSD: 85,
    priceLocal: '$1,400 - $1,900 MXN',
    benefits: [
      'Mirada abierta, descansada y sofisticada al despertar',
      'Fibras ultra livianas que no dañan tu pestaña natural',
      'Adhesivos certificados libres de vapores agresivos',
      'Retoque sugerido cada 2 a 3 semanas'
    ],
    preparation: [
      'Asistir con ojos completamente limpios sin restos de máscara',
      'No usar cremas oleosas en párpados el día de la cita'
    ],
    aftercare: [
      'No mojar las pestañas durante las primeras 6 horas',
      'Cepillar suavemente cada mañana con el cepillito entregado',
      'Lavar con espuma lash shampoo libre de aceites'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?auto=format&fit=crop&w=800&q=80',
    popular: true
  },
  {
    id: 'lifting-pestanas',
    title: 'Lifting de Pestañas con Keratina Botox',
    category: 'pestanas',
    shortDescription: 'Curvatura natural de tus propias pestañas, tinte negro intenso y nutrición profunda.',
    fullDescription: 'Tratamiento que eleva tus pestañas naturales desde la raíz creando un efecto de alargamiento y densidad sin requerir extensiones. Incluye baño de keratina botox para fortalecer la hebra.',
    durationMinutes: 60,
    priceUSD: 50,
    priceLocal: '$950 MXN',
    benefits: [
      'Realce 100% natural de tus propias pestañas',
      'Nutrición intensiva con botox y keratina reconstructiva',
      'Duración de 6 a 8 semanas sin mantenimiento',
      'Compatible con rímel y desmaquillantes después de 24 horas'
    ],
    preparation: [
      'Asistir sin maquillaje de ojos ni lentes de contacto',
      'Ojos descansados'
    ],
    aftercare: [
      'No mojar ni aplicar vapor en las primeras 24 horas',
      'Evitar frotarse los ojos vigorosamente'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=800&q=80'
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Microblading Hiperrealista Pelo a Pelo',
    category: 'cejas',
    beforeUrl: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=700&q=80',
    afterUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=700&q=80',
    technique: 'Técnica Rusa Hiperrealista + Visagismo Áureo',
    healedResult: true,
    artist: 'Leticia Moctezuma',
    date: '2026-06-15',
    description: 'Reconstrucción total de cola y armonización de arco en cejas poco pobladas.'
  },
  {
    id: 'gal-2',
    title: 'Lip Blush Acuarela Labial Nude Rose',
    category: 'labios',
    beforeUrl: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=700&q=80',
    afterUrl: 'https://images.unsplash.com/photo-1588510841407-742d87e07eb4?auto=format&fit=crop&w=700&q=80',
    technique: 'Lip Blush Acuarela Translúcida',
    healedResult: true,
    artist: 'Leticia Moctezuma',
    date: '2026-07-02',
    description: 'Definición de bordes y unificación de tonalidad con pigmento orgánico rosa durazno.'
  },
  {
    id: 'gal-3',
    title: 'Extensiones Efecto Volumen Ruso 4D',
    category: 'pestanas',
    beforeUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=700&q=80',
    afterUrl: 'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?auto=format&fit=crop&w=700&q=80',
    technique: 'Volumen Ruso Curvatura D',
    healedResult: false,
    artist: 'Allegra Artists',
    date: '2026-07-20',
    description: 'Mirada abierta y profundidad elegante con abanicos hechos a mano uno a uno.'
  },
  {
    id: 'gal-4',
    title: 'Lifting de Pestañas + Nutrición Botox Keratina',
    category: 'pestanas',
    beforeUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=700&q=80',
    afterUrl: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=700&q=80',
    technique: 'Lifting con Keratina y Tinte Negro Profundo',
    healedResult: true,
    artist: 'Allegra Artists',
    date: '2026-08-01',
    description: 'Pestañas rectas transformadas en un arco natural, flexible y brillante.'
  },
  {
    id: 'gal-5',
    title: 'Delineado Permanente Lash Liner Sombreado',
    category: 'ojos',
    beforeUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80',
    afterUrl: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=700&q=80',
    technique: 'Smokey Lash Liner Indoloro',
    healedResult: true,
    artist: 'Leticia Moctezuma',
    date: '2026-08-10',
    description: 'Delineado invisible entre pestañas con un suave difuminado en el ángulo externo.'
  },
  {
    id: 'gal-6',
    title: 'Microshading Powder Brows Efecto Polvo',
    category: 'cejas',
    beforeUrl: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=700&q=80',
    afterUrl: 'https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&w=700&q=80',
    technique: 'Efecto Polvo Degradado (Ombré Brows)',
    healedResult: true,
    artist: 'Allegra Artists',
    date: '2026-08-12',
    description: 'Degradé suave desde el inicio hasta una cola nítida y definida.'
  }
];

export const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    clientName: 'Mariana González Peñaloza',
    clientPhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    serviceName: 'Microblading con Master Leticia Moctezuma',
    rating: 5,
    comment: 'La mejor decisión que tomé en mi vida. Leticia Moctezuma es una verdadera Master con más de 18 años de experiencia y se nota en cada trazo. Mis cejas se ven ultra naturales y me cambió la expresión del rostro por completo.',
    date: 'Hace 3 días',
    verified: true,
    approved: true,
    reply: '¡Muchísimas gracias Mariana! Fue un auténtico honor atenderte en Allegra Salon Polanco. ¡A lucir esas cejas perfectas!'
  },
  {
    id: 'rev-2',
    clientName: 'Valeria Sotomayor',
    clientPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    serviceName: 'Lip Blush & Micropigmentación de Labios',
    rating: 5,
    comment: 'La sucursal de Polanco es hermosa, impecable y con trato de primer nivel. El procedimiento con anestesia no me dolió nada y el tono rosa durazno quedó espectacular.',
    date: 'Hace 1 semana',
    verified: true,
    approved: true
  },
  {
    id: 'rev-3',
    clientName: 'Claudia Rivas Morales',
    clientPhoto: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    serviceName: 'Microblading con Artistas Allegra',
    rating: 5,
    comment: 'Excelente servicio con las chicas de Artistas Allegra en sucursal Juárez. Me encantó la promoción a 6 Meses Sin Intereses y la pomada de regalo. Súper profesionales.',
    date: 'Hace 2 semanas',
    verified: true,
    approved: true
  },
  {
    id: 'rev-4',
    clientName: 'Fernanda De la Vega',
    clientPhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    serviceName: 'Delineado Permanente Lash Liner',
    rating: 5,
    comment: 'Tenía miedo de que fuera molesto en los ojos, pero la técnica de Leticia es sumamente suave. Te da una tranquilidad enorme saber que está avalada por COFEPRIS.',
    date: 'Hace 3 semanas',
    verified: true,
    approved: true
  },
  {
    id: 'rev-5',
    clientName: 'Paulina Echeverría',
    clientPhoto: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=200&q=80',
    serviceName: 'Extensiones de Pestañas Volumen Ruso',
    rating: 5,
    comment: 'Mis pestañas duran semanas perfectas. No pesan, no molestan y el diseño Cat Eye me rasga la mirada justo como quería.',
    date: 'Hace 1 mes',
    verified: true,
    approved: true
  }
];

export const INITIAL_CLIENTS: Client[] = [
  {
    id: 'cli-1',
    fullName: 'Mariana González Peñaloza',
    phone: '+52 55 4123 8901',
    email: 'mariana.gonzalez@gmail.com',
    instagram: '@marianagonzalez_p',
    totalVisits: 3,
    lastVisit: '2026-08-16',
    favoriteService: 'Microblading con Master Leticia Moctezuma',
    medicalNotes: 'Piel mixta, excelente cicatrización, sin alergias a pigmentos',
    createdAt: '2026-03-10'
  },
  {
    id: 'cli-2',
    fullName: 'Valeria Sotomayor',
    phone: '+52 55 8890 2341',
    email: 'valeria.sotomayor@hotmail.com',
    instagram: '@valesotomayor',
    totalVisits: 2,
    lastVisit: '2026-08-13',
    favoriteService: 'Micropigmentación de Labios',
    medicalNotes: 'Tono nude durazno preferido',
    createdAt: '2026-04-18'
  },
  {
    id: 'cli-3',
    fullName: 'Claudia Rivas Morales',
    phone: '+52 55 9901 3456',
    email: 'claudia.rivas@outlook.com',
    instagram: '@clau_rivas',
    totalVisits: 4,
    lastVisit: '2026-08-06',
    favoriteService: 'Microblading con Artistas Allegra',
    medicalNotes: 'Sucursal Juárez habitual',
    createdAt: '2026-01-22'
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-101',
    clientName: 'Mariana González Peñaloza',
    clientPhone: '+52 55 4123 8901',
    clientEmail: 'mariana.gonzalez@gmail.com',
    serviceId: 'microblading-cejas',
    serviceName: 'Microblading con Master Leticia Moctezuma',
    specialist: 'Master Leticia Moctezuma (Polanco)',
    date: '2026-08-22',
    time: '11:00',
    status: 'confirmado',
    notes: 'Sucursal Polanco (Sudermann 248). Retoque anual.',
    createdAt: '2026-08-18',
    totalPrice: 5500,
    syncedToKommo: true
  },
  {
    id: 'apt-102',
    clientName: 'Adriana Herrera',
    clientPhone: '+52 55 7766 5544',
    clientEmail: 'adriana.herrera@gmail.com',
    serviceId: 'micropigmentacion-labios',
    serviceName: 'Micropigmentación de Labios (Lip Blush)',
    specialist: 'Artistas Allegra (Juárez)',
    date: '2026-08-22',
    time: '15:30',
    status: 'confirmado',
    notes: 'Sucursal Juárez (Toledo 46). Tono Rosa Nude.',
    createdAt: '2026-08-19',
    totalPrice: 3500,
    syncedToKommo: true
  },
  {
    id: 'apt-103',
    clientName: 'Claudia Rivas Morales',
    clientPhone: '+52 55 9901 3456',
    clientEmail: 'claudia.rivas@outlook.com',
    serviceId: 'extensiones-pestanas',
    serviceName: 'Extensiones de Pestañas Volumen Ruso',
    specialist: 'Camila (Lash Master)',
    date: '2026-08-23',
    time: '10:00',
    status: 'pendiente',
    notes: 'Mantenimiento 3 semanas en Polanco',
    createdAt: '2026-08-20',
    totalPrice: 1900,
    syncedToKommo: true
  }
];

export const INITIAL_LEADS: ChatLead[] = [
  {
    id: 'lead-1',
    nombre: 'Jimena',
    apellido: 'Torres',
    telefono: '+52 55 6677 8899',
    email: 'jimena.torres@gmail.com',
    servicio_interesado: 'Microblading con Master Leticia Moctezuma',
    fecha_preferida: 'Sábado 11:00 en Polanco',
    comentarios: 'Interesada en técnica pelo a pelo y 6 MSI con tarjeta de crédito',
    origen: 'chat_ia',
    statusKommo: 'nuevo',
    webhookSent: true,
    webhookResponseStatus: 200,
    createdAt: '2026-08-20T11:15:00Z'
  },
  {
    id: 'lead-2',
    nombre: 'Patricia',
    apellido: 'Navarrete',
    telefono: '+52 55 3344 5566',
    email: 'patricia.navarrete@yahoo.com',
    servicio_interesado: 'Micropigmentación de Labios & Delineado',
    fecha_preferida: 'Viernes por la tarde en Sucursal Juárez',
    comentarios: 'Preguntó por la diferencia entre Master y Artistas Allegra',
    origen: 'chat_ia',
    statusKommo: 'contactado',
    webhookSent: true,
    webhookResponseStatus: 200,
    createdAt: '2026-08-20T13:40:00Z'
  }
];

export const INITIAL_INTEGRATION_CONFIG: IntegrationConfig = {
  n8nWebhookUrl: 'https://n8n.allegrasalon.com/webhook/kommo-crm-leads',
  kommoPipelineId: 'pipeline_ventas_allegra',
  kommoResponsibleUser: 'Master Leticia Moctezuma',
  autoSyncLeads: true,
  notifyWhatsAppOnBooking: true,
  lastSyncTimestamp: new Date().toISOString()
};

export const FAQS = [
  {
    q: "¿Cuál es la diferencia entre realizarme el servicio con Master Leticia Moctezuma o con las Artistas Allegra?",
    a: "Master Leticia Moctezuma cuenta con más de 18 años de trayectoria internacional y certificaciones de élite ($5,500 MXN). Las Artistas Allegra son profesionales certificadas y avaladas por COFEPRIS con 3 a 5 años de experiencia, capacitadas bajo los estrictos estándares de nuestra Master ($3,500 MXN). En ambos casos la calidad, higiene y pigmentos alemanes son del más alto nivel."
  },
  {
    q: "¿La micropigmentación o el microblading duelen?",
    a: "No. En Allegra Salon aplicamos anestésicos tópicos cosméticos de alta potencia antes y durante todo el procedimiento. La mayoría de nuestras clientas experimentan una sensación mínima o se relajan placenteramente durante la sesión."
  },
  {
    q: "¿Qué incluye el servicio y cuáles son las formas de pago?",
    a: "Todos nuestros servicios incluyen diseño de visagismo con compás áureo, depilación/perfilado previo y pomada post-tratamiento de grado dermatológico. Aceptamos todas las tarjetas de crédito con 6 Meses Sin Intereses o 10% de descuento en pago en efectivo."
  },
  {
    q: "¿Dónde están ubicadas las sucursales en la Ciudad de México?",
    a: "Contamos con dos exclusivas ubicaciones en CDMX:\n• Polanco: Sudermann 248 (a un costado de Chedraui Selecto Galerías Polanco / Lamartine 311).\n• Colonia Juárez: Toledo 46 (entre Hamburgo y Chapultepec, a pasos de la Diana Cazadora y Metro Sevilla)."
  },
  {
    q: "¿Cuánto dura el resultado y cuándo se realiza el retoque?",
    a: "En cejas dura de 12 a 24 meses y en labios de 2 a 3 años según tu tipo de piel. El retoque se programa entre los 30 y 45 días posteriores ($1,700 MXN con Master / $1,200 MXN con Artistas Allegra) para sellar el color y asegurar la máxima longevidad."
  },
  {
    q: "¿Hacen remoción de tatuajes o micropigmentaciones anteriores mal hechas?",
    a: "Sí, contamos con tratamiento especializado de despigmentación y remoción de pigmentos no deseados o virados a tonos rojizos o azulados, permitiendo recuperar la piel y diseñar cejas perfectas desde cero."
  }
];

export const ONLINE_COURSES: OnlineCourse[] = [
  {
    id: 'curso-microblading-pro',
    title: 'Masterclass Microblading Pelo a Pelo & Hiperrealismo',
    subtitle: 'Formación profesional online con técnica rusa y visagismo áureo',
    category: 'Cejas',
    level: 'Principiante a Avanzado',
    duration: '24 horas de video HD + Tutoría personalizada',
    modulesCount: 8,
    priceLocal: '$4,800 MXN',
    priceUSD: 250,
    instructor: 'Master Leticia Moctezuma',
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    description: 'Aprende desde cero o perfecciona tus trazos pelo a pelo con la metodología internacional de Leticia Moctezuma. Incluye práctica en látex, visagismo milimétrico, colorimetría avanzada y casos en modelo real.',
    topics: [
      'Visagismo con compás áureo y mapping según tipo de rostro',
      'Arquitectura de trazo pelo a pelo y patrones de espina dorsal',
      'Colorimetría de pigmentos alemanes para evitar virajes a rojo/azul',
      'Control de profundidad dérmica y estiramiento de piel',
      'Práctica guiada paso a paso en látex y modelo en vivo',
      'Protocolos de bioseguridad, anestesia y atención de clientes'
    ],
    includes: [
      'Acceso de por vida a la plataforma de video en alta definición',
      'Certificado Internacional avalado por Allegra Academy',
      'Corrección y feedback directo en video por Master Leticia Moctezuma',
      'Guía descargable en PDF de colorimetría y consentimientos informados',
      'Grupo privado VIP de alumnas para resolución de dudas 24/7'
    ],
    certificate: true,
    featured: true
  },
  {
    id: 'curso-lip-blush',
    title: 'Especialización Online en Lip Blush & Magic Lips',
    subtitle: 'Micropigmentación de labios translúcida y neutralización de tonos oscuros',
    category: 'Labios',
    level: 'Intermedio / Avanzado',
    duration: '18 horas de video HD + Asesoría directa',
    modulesCount: 6,
    priceLocal: '$4,200 MXN',
    priceUSD: 220,
    instructor: 'Master Leticia Moctezuma',
    imageUrl: 'https://images.unsplash.com/photo-1588510841407-742d87e07eb4?auto=format&fit=crop&w=800&q=80',
    description: 'Domina la técnica más demandada en micropigmentación labial: contornos difuminados, efecto acuarela sin marcas duras y neutralización de labios hiperpigmentados o violáceos.',
    topics: [
      'Neutralización cromática de labios oscuros paso a paso',
      'Efecto Acuarela Translúcida y saturación uniforme',
      'Manejo de dermógrafo, agujas 1RL y velocidad de implantación',
      'Diseño simétrico sin deformar la comisura natural',
      'Cuidado post-tratamiento y prevención de herpes labial'
    ],
    includes: [
      'Acceso ilimitado a clases grabadas en 4K',
      'Certificado de Especialización por Allegra Academy',
      'Recetario de mezclas de pigmentos para cada fototipo',
      'Soporte técnico directo vía WhatsApp'
    ],
    certificate: true,
    featured: true
  },
  {
    id: 'curso-delineado-lash-liner',
    title: 'Masterclass Delineado Permanente de Ojos & Lash Liner',
    subtitle: 'Técnica indolora de sombreado y relleno interciliar',
    category: 'Ojos',
    level: 'Intermedio / Avanzado',
    duration: '14 horas de video HD',
    modulesCount: 5,
    priceLocal: '$3,800 MXN',
    priceUSD: 190,
    instructor: 'Master Leticia Moctezuma',
    imageUrl: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
    description: 'Aprende a realizar delineados permanentes seguros, precisos y estéticos en párpado superior e inferior, con acabado invisible o difuminado estilo sombras.',
    topics: [
      'Anatomía del párpado y zonas de máxima seguridad',
      'Técnica interciliar para dar volumen visual a las pestañas',
      'Delineado esfumado (Smokey Eyeliner)',
      'Protocolos de anestesia ocular sin riesgo de migración de pigmento'
    ],
    includes: [
      'Acceso vitalicio a la academia digital',
      'Certificado digital verificable',
      'Plantillas de práctica de simetría de ojos'
    ],
    certificate: true
  },
  {
    id: 'curso-despigmentacion-salina',
    title: 'Técnica de Remoción Salina & Corrección de Trabajos Anteriores',
    subtitle: 'Aclara y elimina tatuajes y micropigmentaciones viradas de forma segura',
    category: 'Corrección',
    level: 'Masterclass Pro',
    duration: '12 horas de video HD',
    modulesCount: 4,
    priceLocal: '$3,500 MXN',
    priceUSD: 175,
    instructor: 'Master Leticia Moctezuma',
    imageUrl: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80',
    description: 'Capacitación imprescindible para todo micropigmentador: cómo extraer pigmentos antiguos indeseados, corregir virajes y regenerar el tejido dérmico.',
    topics: [
      'Química de la solución salina y mecanismo de ósmosis dérmica',
      'Técnica de implantación manual y mecánica para remoción',
      'Evaluación de cicatrices y tiempos de descanso celular',
      'Estrategia de neutralización de tonos rojos, grises y azules'
    ],
    includes: [
      'Acceso 24/7 a todos los módulos y actualizaciones',
      'Diploma de Certificación de Remoción',
      'Consentimiento médico y protocolo de cuidados posteriores'
    ],
    certificate: true
  }
];

