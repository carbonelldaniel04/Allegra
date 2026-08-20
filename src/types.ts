export type ServiceCategory = 'cejas' | 'labios' | 'ojos' | 'pestanas' | 'faciales';

export interface ServiceItem {
  id: string;
  title: string;
  category: ServiceCategory;
  shortDescription: string;
  fullDescription: string;
  durationMinutes: number;
  priceUSD: number;
  priceLocal: string;
  benefits: string[];
  preparation: string[];
  aftercare: string[];
  imageUrl: string;
  popular?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: ServiceCategory;
  beforeUrl: string;
  afterUrl: string;
  technique: string;
  healedResult?: boolean;
  artist: string;
  date: string;
  description?: string;
}

export interface ReviewItem {
  id: string;
  clientName: string;
  clientPhoto?: string;
  serviceName: string;
  rating: number; // 1 to 5
  comment: string;
  date: string;
  verified: boolean;
  approved: boolean;
  reply?: string;
}

export interface Appointment {
  id: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  serviceId: string;
  serviceName: string;
  specialist: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  status: 'confirmado' | 'pendiente' | 'completado' | 'cancelado';
  notes?: string;
  createdAt: string;
  totalPrice: number;
  syncedToKommo?: boolean;
}

export interface Client {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  instagram?: string;
  totalVisits: number;
  lastVisit?: string;
  favoriteService?: string;
  medicalNotes?: string; // alergias, tipo de piel
  createdAt: string;
}

export interface ChatLead {
  id: string;
  nombre: string;
  apellido?: string;
  telefono: string;
  email?: string;
  servicio_interesado: string;
  fecha_preferida?: string;
  comentarios?: string;
  origen: 'chat_ia' | 'web_landing' | 'whatsapp' | 'manual';
  statusKommo: 'nuevo' | 'contactado' | 'turno_agendado' | 'ganado' | 'perdido';
  webhookSent: boolean;
  webhookResponseStatus?: number;
  webhookPayloadSent?: any;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  quickOptions?: { label: string; action: string; value?: string }[];
  isLeadCaptureTrigger?: boolean;
}

export interface IntegrationConfig {
  n8nWebhookUrl: string;
  kommoPipelineId?: string;
  kommoResponsibleUser?: string;
  autoSyncLeads: boolean;
  notifyWhatsAppOnBooking: boolean;
  lastSyncTimestamp?: string;
}

export interface OnlineCourse {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  level: 'Principiante a Avanzado' | 'Intermedio / Avanzado' | 'Masterclass Pro';
  duration: string;
  modulesCount: number;
  priceLocal: string;
  priceUSD: number;
  instructor: string;
  imageUrl: string;
  description: string;
  topics: string[];
  includes: string[];
  certificate: boolean;
  featured?: boolean;
}

