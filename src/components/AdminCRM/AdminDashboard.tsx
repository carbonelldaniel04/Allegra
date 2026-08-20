import React, { useState, useEffect } from 'react';
import { 
  Users, Calendar, Image as ImageIcon, MessageSquare, Settings, 
  Plus, Search, Edit2, Trash2, CheckCircle2, XCircle, RefreshCw, 
  Send, ExternalLink, Shield, LogOut, ArrowUpRight, Check, AlertCircle, Sparkles, Filter, Zap,
  Layers, Scissors, Eye, Star
} from 'lucide-react';
import { Client, Appointment, GalleryItem, ReviewItem, ChatLead, IntegrationConfig } from '../../types';
import { STUDIO_INFO } from '../../data/initialData';
import { AllegraLogo } from '../AllegraLogo';
import { useMedia } from '../../context/MediaContext';
import { ImageFieldEditor } from '../MediaManager/ImageFieldEditor';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'turnos' | 'clientes' | 'leads' | 'galeria_crm' | 'integraciones'>('turnos');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [pinInput, setPinInput] = useState('');

  const {
    openMediaManager,
    heroSlides,
    updateHeroSlide,
    services,
    updateServiceImage,
    gallery,
    updateGalleryItem,
    specialists,
    updateSpecialist,
    reviews,
    resetAllToDefault
  } = useMedia();

  // Data states
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [leads, setLeads] = useState<ChatLead[]>([]);
  const [config, setConfig] = useState<IntegrationConfig>({
    n8nWebhookUrl: 'https://n8n.allegrasalon.com/webhook/kommo-crm-leads',
    kommoPipelineId: 'pipeline_ventas_allegra',
    kommoResponsibleUser: 'Master Leticia Moctezuma',
    autoSyncLeads: true,
    notifyWhatsAppOnBooking: true
  });

  // Search & Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');

  // Webhook Tester state
  const [testResult, setTestResult] = useState<any>(null);
  const [isTestingWebhook, setIsTestingWebhook] = useState(false);

  // Load backend data
  const fetchData = async () => {
    try {
      const [aptRes, cliRes, leadRes, intRes] = await Promise.all([
        fetch('/api/appointments').then(r => r.json()),
        fetch('/api/clients').then(r => r.json()),
        fetch('/api/leads').then(r => r.json()),
        fetch('/api/integrations').then(r => r.json())
      ]);
      setAppointments(aptRes || []);
      setClients(cliRes || []);
      setLeads(leadRes || []);
      if (intRes) setConfig(intRes);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Authentication gate
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
        <div className="w-full max-w-sm bg-[#F8F5F2] rounded-3xl p-8 border border-[#E8DDD4] shadow-2xl text-center space-y-5">
          <div className="w-12 h-12 rounded-full bg-[#2C2C2C] text-[#C8A96B] flex items-center justify-center mx-auto">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-heading text-xl font-bold text-[#2C2C2C]">CRM Studio & n8n</h3>
            <p className="text-xs text-[#2C2C2C]/60 mt-1">Ingresa el PIN de seguridad para acceder</p>
          </div>
          <form onSubmit={(e) => {
            e.preventDefault();
            if (pinInput === '1234' || pinInput === 'admin' || pinInput.length > 0) {
              setIsAuthenticated(true);
            }
          }} className="space-y-3">
            <input
              type="password"
              placeholder="PIN (Demo: 1234)"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E8DDD4] text-center text-sm font-bold tracking-widest text-[#2C2C2C] focus:outline-none focus:border-[#C8A96B]"
            />
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#C8A96B] text-white text-xs font-semibold uppercase tracking-wider font-button"
            >
              Ingresar al Panel
            </button>
          </form>
          <button
            onClick={onClose}
            className="text-xs text-[#2C2C2C]/50 hover:text-[#2C2C2C]"
          >
            Volver a la Web
          </button>
        </div>
      </div>
    );
  }

  // Handle appointment status change
  const handleUpdateAppointmentStatus = async (id: string, newStatus: string) => {
    try {
      await fetch(`/api/appointments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: newStatus as any } : a));
    } catch (err) {
      console.error('Error updating appointment:', err);
    }
  };

  // Test webhook trigger
  const handleTestWebhook = async () => {
    setIsTestingWebhook(true);
    try {
      const res = await fetch('/api/integrations/test-webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: 'Mariana',
          apellido: 'Test',
          telefono: '+52 55 1234-5678',
          servicio_interesado: 'Microblading con Master Leticia Moctezuma'
        })
      });
      const data = await res.json();
      setTestResult(data);
    } catch (err: any) {
      setTestResult({ error: err.message });
    } finally {
      setIsTestingWebhook(false);
    }
  };

  // Save integration config
  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/integrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      });
      alert('Configuración guardada exitosamente.');
    } catch (err) {
      console.error('Error saving config:', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="w-full max-w-6xl h-[92vh] bg-[#F8F5F2] rounded-3xl border border-[#E8DDD4] shadow-2xl flex flex-col overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Navbar */}
        <div className="p-4 sm:px-8 sm:py-5 bg-[#2C2C2C] text-white flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <AllegraLogo size={42} variant="gold" />
            <div>
              <h3 className="font-heading text-lg sm:text-xl font-bold">
                Allegra Salon & Academy CRM
              </h3>
              <p className="text-[11px] text-[#C8A96B]">
                Master Leticia Moctezuma • Turnos, Clientes, Leads & Multimedia
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => openMediaManager('hero')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#C8A96B] hover:bg-[#B2904F] text-white text-xs font-semibold font-button transition-colors shadow-sm"
              title="Abrir editor completo de fotos"
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Editor de Imágenes</span>
            </button>

            <button
              onClick={fetchData}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Actualizar datos"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold font-button uppercase tracking-wider transition-colors"
            >
              Cerrar Panel
            </button>
          </div>
        </div>

        {/* Dashboard Tabs Bar */}
        <div className="px-6 py-3 bg-white border-b border-[#E8DDD4] flex items-center gap-2 overflow-x-auto text-xs">
          {[
            { id: 'turnos', label: 'Turnos & Citas', icon: Calendar, badge: appointments.length },
            { id: 'leads', label: 'Leads del Chat IA', icon: Sparkles, badge: leads.length },
            { id: 'clientes', label: 'Clientes CRM', icon: Users, badge: clients.length },
            { id: 'galeria_crm', label: 'Gestor de Imágenes & Fotos', icon: ImageIcon },
            { id: 'integraciones', label: 'n8n & Kommo CRM', icon: Settings, highlight: true }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all font-button shrink-0 ${
                  isActive
                    ? 'bg-[#C8A96B] text-white shadow-xs'
                    : 'text-[#2C2C2C]/70 hover:bg-[#F8F5F2] hover:text-[#2C2C2C]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-[#E8DDD4] text-[#2C2C2C]'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6 sm:p-8 overflow-y-auto space-y-6">
          
          {/* TAB 1: TURNOS */}
          {activeTab === 'turnos' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-heading text-2xl font-bold text-[#2C2C2C]">Agenda de Turnos</h4>
                  <p className="text-xs text-[#2C2C2C]/60">Administra citas, estados de confirmación y asignación de especialistas en Polanco y Juárez.</p>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Buscar por cliente o servicio..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-white border border-[#E8DDD4] text-xs focus:outline-none focus:border-[#C8A96B] w-56"
                  />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-white border border-[#E8DDD4] text-xs focus:outline-none focus:border-[#C8A96B]"
                  >
                    <option value="todos">Todos los Estados</option>
                    <option value="confirmado">Confirmados</option>
                    <option value="pendiente">Pendientes</option>
                    <option value="completado">Completados</option>
                    <option value="cancelado">Cancelados</option>
                  </select>
                </div>
              </div>

              {/* Appointments Table */}
              <div className="bg-white rounded-2xl border border-[#E8DDD4] shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#F8F5F2] border-b border-[#E8DDD4] text-[#2C2C2C]/70 uppercase tracking-wider font-semibold">
                      <tr>
                        <th className="p-4">Cliente & Contacto</th>
                        <th className="p-4">Servicio</th>
                        <th className="p-4">Fecha & Hora</th>
                        <th className="p-4">Especialista</th>
                        <th className="p-4">Estado</th>
                        <th className="p-4 text-right">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E8DDD4]/60">
                      {appointments
                        .filter(a => {
                          const matchesQuery = a.clientName.toLowerCase().includes(searchQuery.toLowerCase()) || a.serviceName.toLowerCase().includes(searchQuery.toLowerCase());
                          const matchesStatus = statusFilter === 'todos' || a.status === statusFilter;
                          return matchesQuery && matchesStatus;
                        })
                        .map((apt) => (
                          <tr key={apt.id} className="hover:bg-[#F8F5F2]/50 transition-colors">
                            <td className="p-4">
                              <p className="font-bold text-[#2C2C2C]">{apt.clientName}</p>
                              <p className="text-[11px] text-[#2C2C2C]/60">{apt.clientPhone}</p>
                              {apt.clientEmail && <p className="text-[10px] text-[#2C2C2C]/40">{apt.clientEmail}</p>}
                            </td>
                            <td className="p-4">
                              <p className="font-semibold text-[#2C2C2C]">{apt.serviceName}</p>
                              {apt.notes && <p className="text-[10px] text-[#C8A96B] italic">{apt.notes}</p>}
                            </td>
                            <td className="p-4">
                              <p className="font-bold text-[#2C2C2C]">{apt.date}</p>
                              <p className="text-[11px] text-[#C8A96B] font-semibold">{apt.time} hs</p>
                            </td>
                            <td className="p-4 text-[#2C2C2C] font-medium">
                              {apt.specialist}
                            </td>
                            <td className="p-4">
                              <select
                                value={apt.status}
                                onChange={(e) => handleUpdateAppointmentStatus(apt.id, e.target.value)}
                                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider border transition-colors ${
                                  apt.status === 'confirmado' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                  apt.status === 'pendiente' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                  apt.status === 'completado' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                  'bg-rose-50 text-rose-700 border-rose-200'
                                }`}
                              >
                                <option value="confirmado">Confirmado</option>
                                <option value="pendiente">Pendiente</option>
                                <option value="completado">Completado</option>
                                <option value="cancelado">Cancelado</option>
                              </select>
                            </td>
                            <td className="p-4 text-right space-x-2">
                              <a
                                href={`https://wa.me/${apt.clientPhone.replace(/[^0-9]/g, '')}?text=Hola%20${encodeURIComponent(apt.clientName)}!%20Te%20contactamos%20de%20Allegra%20Salon%20sobre%20tu%20cita.`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block p-1.5 rounded-lg bg-[#25D366]/15 text-[#1e7e34] hover:bg-[#25D366]/30"
                                title="Abrir WhatsApp"
                              >
                                <Send className="w-3.5 h-3.5" />
                              </a>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LEADS */}
          {activeTab === 'leads' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-heading text-2xl font-bold text-[#2C2C2C]">Leads Capturados por IA</h4>
                  <p className="text-xs text-[#2C2C2C]/60">Prospectos calificados generados automáticamente por el Asistente Virtual.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {leads.map((lead) => (
                  <div key={lead.id} className="p-5 bg-white rounded-2xl border border-[#E8DDD4] shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-md bg-[#2C2C2C] text-[#C8A96B] text-[10px] font-bold uppercase tracking-wider">
                        {lead.statusKommo}
                      </span>
                      <span className="text-[11px] text-[#2C2C2C]/40">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div>
                      <h5 className="font-heading text-base font-bold text-[#2C2C2C]">{lead.nombre} {lead.apellido}</h5>
                      <p className="text-xs text-[#C8A96B] font-semibold">{lead.servicio_interesado}</p>
                    </div>

                    <div className="text-xs space-y-1 text-[#2C2C2C]/70">
                      <p>📞 {lead.telefono}</p>
                      {lead.email && <p>✉️ {lead.email}</p>}
                      {lead.fecha_preferida && <p className="italic text-[#2C2C2C]/50">📅 {lead.fecha_preferida}</p>}
                    </div>

                    {lead.comentarios && (
                      <p className="text-[11px] text-[#2C2C2C]/60 bg-[#F8F5F2] p-2 rounded-lg">
                        "{lead.comentarios}"
                      </p>
                    )}

                    <div className="pt-2 border-t border-[#E8DDD4]/60 flex items-center justify-between">
                      <span className="flex items-center gap-1 text-[10px] text-emerald-700 font-semibold">
                        <CheckCircle2 className="w-3 h-3" /> Kommo CRM Sync
                      </span>
                      <a
                        href={`https://wa.me/${lead.telefono.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 rounded-lg bg-[#25D366] text-white text-[11px] font-semibold flex items-center gap-1"
                      >
                        Contactar
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: CLIENTES */}
          {activeTab === 'clientes' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-heading text-2xl font-bold text-[#2C2C2C]">Historial de Clientes</h4>
                  <p className="text-xs text-[#2C2C2C]/60">Directorio de clientas frecuentes, servicios favoritos y notas clínicas.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {clients.map((cli) => (
                  <div key={cli.id} className="p-5 bg-white rounded-2xl border border-[#E8DDD4] shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-[#2C2C2C]">{cli.fullName}</span>
                      <span className="px-2 py-0.5 rounded-full bg-[#E8DDD4] text-[10px] font-semibold text-[#2C2C2C]">
                        {cli.totalVisits} visitas
                      </span>
                    </div>
                    <div className="text-xs text-[#2C2C2C]/70 space-y-1">
                      <p>📞 {cli.phone}</p>
                      <p>✉️ {cli.email}</p>
                      {cli.favoriteService && <p className="text-[#C8A96B] font-medium">⭐ {cli.favoriteService}</p>}
                    </div>
                    {cli.medicalNotes && (
                      <p className="text-[11px] text-[#2C2C2C]/60 bg-amber-50/60 p-2 rounded-lg border border-amber-200/50">
                        📋 {cli.medicalNotes}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: GESTOR DE IMÁGENES Y FOTOS */}
          {activeTab === 'galeria_crm' && (
            <div className="space-y-6 animate-fade-in">
              <div className="p-6 rounded-2xl bg-white border border-[#E8DDD4] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-heading text-xl font-bold text-[#2C2C2C]">Gestión Integral de Fotos e Imágenes</h4>
                  <p className="text-xs text-[#2C2C2C]/60 mt-1 max-w-xl">
                    Centro de control administrativo para modificar todas las fotografías de la web: banner hero, tratamientos, galería antes/después, equipo de especialistas y testimonios.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => openMediaManager('hero')}
                    className="px-5 py-2.5 rounded-xl bg-[#C8A96B] text-white hover:bg-[#B2904F] text-xs font-semibold uppercase tracking-wider font-button shadow-md flex items-center gap-2"
                  >
                    <ImageIcon className="w-4 h-4" />
                    <span>Abrir Editor Completo</span>
                  </button>
                  <button
                    onClick={resetAllToDefault}
                    className="px-3.5 py-2.5 rounded-xl border border-[#E8DDD4] bg-white hover:bg-[#F8F5F2] text-[#2C2C2C]/70 text-xs font-semibold flex items-center gap-1.5"
                    title="Restablecer fotos predeterminadas de Allegra Salon"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Restablecer</span>
                  </button>
                </div>
              </div>

              {/* Grid of All Managed Image Categories */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {/* 1. Hero */}
                <div className="p-5 rounded-2xl bg-white border border-[#E8DDD4] shadow-2xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-heading text-sm font-bold text-[#2C2C2C]">1. Banner Principal (Hero)</span>
                      <span className="text-[11px] font-semibold text-[#C8A96B]">{heroSlides.length} diapositivas</span>
                    </div>
                    <p className="text-[11px] text-[#2C2C2C]/60">Imágenes rotativas de la portada principal con títulos y subtítulos.</p>
                  </div>
                  <div className="aspect-video rounded-xl overflow-hidden bg-neutral-100 border border-[#E8DDD4]">
                    <img src={heroSlides[0]?.url} alt="Hero preview" className="w-full h-full object-cover" />
                  </div>
                  <button
                    onClick={() => openMediaManager('hero')}
                    className="w-full py-2 rounded-xl bg-[#F8F5F2] hover:bg-[#E8DDD4]/80 text-[#2C2C2C] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-[#E8DDD4]"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-[#C8A96B]" />
                    <span>Modificar Fotos de Portada</span>
                  </button>
                </div>

                {/* 2. Servicios */}
                <div className="p-5 rounded-2xl bg-white border border-[#E8DDD4] shadow-2xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-heading text-sm font-bold text-[#2C2C2C]">2. Catálogo de Servicios</span>
                      <span className="text-[11px] font-semibold text-[#C8A96B]">{services.length} tratamientos</span>
                    </div>
                    <p className="text-[11px] text-[#2C2C2C]/60">Fotografías de cejas, labios, delineado, pestañas y remoción.</p>
                  </div>
                  <div className="aspect-video rounded-xl overflow-hidden bg-neutral-100 border border-[#E8DDD4]">
                    <img src={services[0]?.imageUrl} alt="Services preview" className="w-full h-full object-cover" />
                  </div>
                  <button
                    onClick={() => openMediaManager('servicios')}
                    className="w-full py-2 rounded-xl bg-[#F8F5F2] hover:bg-[#E8DDD4]/80 text-[#2C2C2C] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-[#E8DDD4]"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-[#C8A96B]" />
                    <span>Modificar Fotos de Servicios</span>
                  </button>
                </div>

                {/* 3. Galería Antes/Después */}
                <div className="p-5 rounded-2xl bg-white border border-[#E8DDD4] shadow-2xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-heading text-sm font-bold text-[#2C2C2C]">3. Casos Antes & Después</span>
                      <span className="text-[11px] font-semibold text-[#C8A96B]">{gallery.length} comparativas</span>
                    </div>
                    <p className="text-[11px] text-[#2C2C2C]/60">Imágenes dobles de antes y después con slider interactivo.</p>
                  </div>
                  <div className="aspect-video rounded-xl overflow-hidden bg-neutral-100 border border-[#E8DDD4]">
                    <img src={gallery[0]?.afterUrl} alt="Gallery preview" className="w-full h-full object-cover" />
                  </div>
                  <button
                    onClick={() => openMediaManager('galeria')}
                    className="w-full py-2 rounded-xl bg-[#F8F5F2] hover:bg-[#E8DDD4]/80 text-[#2C2C2C] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-[#E8DDD4]"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-[#C8A96B]" />
                    <span>Modificar Galería de Casos</span>
                  </button>
                </div>

                {/* 4. Especialistas */}
                <div className="p-5 rounded-2xl bg-white border border-[#E8DDD4] shadow-2xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-heading text-sm font-bold text-[#2C2C2C]">4. Equipo y Artistas</span>
                      <span className="text-[11px] font-semibold text-[#C8A96B]">{specialists.length} profesionales</span>
                    </div>
                    <p className="text-[11px] text-[#2C2C2C]/60">Retratos profesionales de las masters y especialistas del salón.</p>
                  </div>
                  <div className="aspect-video rounded-xl overflow-hidden bg-neutral-100 border border-[#E8DDD4]">
                    <img src={specialists[0]?.photoUrl} alt="Specialists preview" className="w-full h-full object-cover" />
                  </div>
                  <button
                    onClick={() => openMediaManager('especialistas')}
                    className="w-full py-2 rounded-xl bg-[#F8F5F2] hover:bg-[#E8DDD4]/80 text-[#2C2C2C] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-[#E8DDD4]"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-[#C8A96B]" />
                    <span>Modificar Fotos de Especialistas</span>
                  </button>
                </div>

                {/* 5. Testimonios */}
                <div className="p-5 rounded-2xl bg-white border border-[#E8DDD4] shadow-2xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-heading text-sm font-bold text-[#2C2C2C]">5. Testimonios de Clientes</span>
                      <span className="text-[11px] font-semibold text-[#C8A96B]">{reviews.length} opiniones</span>
                    </div>
                    <p className="text-[11px] text-[#2C2C2C]/60">Fotos de perfil y reseñas de las clientas satisfechas en CDMX.</p>
                  </div>
                  <div className="aspect-video rounded-xl overflow-hidden bg-neutral-100 border border-[#E8DDD4]">
                    <img src={reviews[0]?.clientPhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'} alt="Reviews preview" className="w-full h-full object-cover" />
                  </div>
                  <button
                    onClick={() => openMediaManager('testimonios')}
                    className="w-full py-2 rounded-xl bg-[#F8F5F2] hover:bg-[#E8DDD4]/80 text-[#2C2C2C] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-[#E8DDD4]"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-[#C8A96B]" />
                    <span>Modificar Fotos de Reseñas</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: INTEGRACIONES (n8n & Kommo) */}
          {activeTab === 'integraciones' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h4 className="font-heading text-2xl font-bold text-[#2C2C2C]">Automatización n8n & Kommo CRM</h4>
                <p className="text-xs text-[#2C2C2C]/60">
                  Conexión directa por Webhook para enviar cada lead capturado en el chat y cada turno agendado al pipeline comercial.
                </p>
              </div>

              {/* Webhook Configuration Form */}
              <form onSubmit={handleSaveConfig} className="p-6 rounded-2xl bg-white border border-[#E8DDD4] shadow-xs space-y-5">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#2C2C2C]">
                    URL del Webhook de n8n
                  </label>
                  <input
                    type="url"
                    required
                    value={config.n8nWebhookUrl}
                    onChange={(e) => setConfig({ ...config, n8nWebhookUrl: e.target.value })}
                    placeholder="https://tu-n8n.com/webhook/kommo-crm-leads"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F8F5F2] border border-[#E8DDD4] text-xs font-mono text-[#2C2C2C] focus:outline-none focus:border-[#C8A96B]"
                  />
                  <p className="text-[10px] text-[#2C2C2C]/50">
                    Reemplaza con la URL de tu Webhook Trigger de n8n para producción.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#2C2C2C]">ID Pipeline Kommo</label>
                    <input
                      type="text"
                      value={config.kommoPipelineId || ''}
                      onChange={(e) => setConfig({ ...config, kommoPipelineId: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#F8F5F2] border border-[#E8DDD4] text-xs text-[#2C2C2C]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#2C2C2C]">Responsable de Ventas</label>
                    <input
                      type="text"
                      value={config.kommoResponsibleUser || ''}
                      onChange={(e) => setConfig({ ...config, kommoResponsibleUser: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#F8F5F2] border border-[#E8DDD4] text-xs text-[#2C2C2C]"
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#C8A96B] text-white text-xs font-semibold uppercase tracking-wider font-button hover:bg-[#B2904F] transition-all"
                  >
                    Guardar Configuración
                  </button>

                  <button
                    type="button"
                    onClick={handleTestWebhook}
                    disabled={isTestingWebhook}
                    className="px-5 py-2.5 rounded-xl bg-[#2C2C2C] text-white text-xs font-semibold font-button hover:bg-[#444] transition-all flex items-center gap-2 disabled:opacity-50"
                  >
                    <Zap className="w-3.5 h-3.5 text-[#C8A96B]" />
                    <span>{isTestingWebhook ? 'Probando Webhook...' : 'Probar Webhook en Vivo'}</span>
                  </button>
                </div>
              </form>

              {/* Webhook Test Inspector Result */}
              {testResult && (
                <div className="p-6 rounded-2xl bg-white border border-[#E8DDD4] shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C8A96B]">
                      Resultado de Prueba del Webhook n8n
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
                      Código HTTP: {testResult.statusCode}
                    </span>
                  </div>
                  <pre className="p-4 rounded-xl bg-[#2C2C2C] text-emerald-400 text-[11px] font-mono overflow-x-auto">
                    {JSON.stringify(testResult, null, 2)}
                  </pre>
                </div>
              )}

              {/* Lead Field Mapping documentation card */}
              <div className="p-6 rounded-2xl bg-white border border-[#E8DDD4] shadow-xs space-y-4">
                <h5 className="font-heading text-sm font-bold text-[#2C2C2C]">
                  Campos Mapeados enviados en el Payload JSON:
                </h5>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  {['nombre', 'apellido', 'telefono', 'email', 'servicio_interesado', 'fecha_preferida', 'comentarios', 'pipeline_id'].map((field) => (
                    <div key={field} className="p-2.5 rounded-lg bg-[#F8F5F2] border border-[#E8DDD4] font-mono text-[11px] text-[#2C2C2C]">
                      ✔ {field}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
