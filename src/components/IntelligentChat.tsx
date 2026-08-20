import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Sparkles, User, Bot, Calendar, Phone, CheckCircle2, ChevronRight, ArrowRight, DollarSign, Clock, ShieldCheck, Zap } from 'lucide-react';
import { ChatMessage, ChatLead } from '../types';
import { STUDIO_INFO, INITIAL_SERVICES } from '../data/initialData';
import { AllegraLogo } from './AllegraLogo';

interface IntelligentChatProps {
  isOpen: boolean;
  onToggle: () => void;
  onOpenBookingForService: (serviceId: string) => void;
}

export const IntelligentChat: React.FC<IntelligentChatProps> = ({
  isOpen,
  onToggle,
  onOpenBookingForService
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'assistant',
      text: '¡Hola! Soy la asesora virtual de Allegra Salon & Academy (Master Leticia Moctezuma). ✨ ¿En qué tratamiento estás interesada hoy? (Cejas, Labios, Pestañas o Delineado).',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      quickOptions: [
        { label: 'Ver Precios y Duración', action: 'precios' },
        { label: 'Agendar un Turno', action: 'agendar' },
        { label: 'Micropigmentación de Cejas', action: 'cejas' },
        { label: 'Lip Blush (Labios)', action: 'labios' },
        { label: '¿Duele el procedimiento?', action: 'dolor' }
      ]
    }
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadFormData, setLeadFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    servicio_interesado: 'Micropigmentación de Cejas',
    comentarios: ''
  });
  const [leadCapturedSuccess, setLeadCapturedSuccess] = useState(false);
  const [isUnread, setIsUnread] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setIsUnread(false);
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, messages, isTyping]);

  const addAssistantMessage = (text: string, quickOptions?: any[], isLeadCaptureTrigger?: boolean) => {
    setMessages((prev) => [
      ...prev,
      {
        id: 'msg-' + Date.now(),
        sender: 'assistant',
        text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickOptions,
        isLeadCaptureTrigger
      }
    ]);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputVal).trim();
    if (!query) return;

    // Append user message
    const userMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputVal('');
    setIsTyping(true);

    try {
      // Call Server-Side Gemini endpoint
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          conversationHistory: messages
        })
      });

      const data = await res.json();
      setIsTyping(false);

      if (data.reply) {
        // Determine dynamic follow-up options
        const lower = query.toLowerCase();
        let followUps = undefined;

        if (lower.includes('precio') || lower.includes('costo')) {
          followUps = [
            { label: 'Reservar Turno con Seña', action: 'agendar' },
            { label: 'Ver Antes y Después', action: 'galeria' }
          ];
        } else if (lower.includes('turno') || lower.includes('cita') || lower.includes('reservar')) {
          followUps = [
            { label: 'Completar Datos para CRM', action: 'lead_form' },
            { label: 'Ver Servicios Disponibles', action: 'servicios' }
          ];
        }

        addAssistantMessage(data.reply, followUps);
      } else {
        addAssistantMessage('¿Te gustaría que una de nuestras especialistas te contacte directamente por WhatsApp para coordinar tu cita?', [
          { label: 'Sí, dejar mis datos', action: 'lead_form' }
        ]);
      }
    } catch (err) {
      console.error('Chat error:', err);
      setIsTyping(false);
      addAssistantMessage('En este momento nuestro equipo está atendiendo consultas. Podés agendar tu turno directamente con el botón de reservas o dejarnos tu número.', [
        { label: 'Agendar Turno Online', action: 'agendar' }
      ]);
    }
  };

  const handleQuickAction = (action: string, label: string) => {
    if (action === 'agendar') {
      onOpenBookingForService('cejas-micro');
    } else if (action === 'lead_form') {
      setShowLeadForm(true);
    } else if (action === 'galeria') {
      const el = document.getElementById('galeria');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      handleSendMessage(label);
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadFormData.nombre || !leadFormData.telefono) return;

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...leadFormData,
          origen: 'chat_ia',
          statusKommo: 'nuevo'
        })
      });

      if (res.ok) {
        setLeadCapturedSuccess(true);
        setTimeout(() => {
          setShowLeadForm(false);
          setLeadCapturedSuccess(false);
          addAssistantMessage(
            `¡Excelente, ${leadFormData.nombre}! Hemos registrado tus datos y los hemos sincronizado con nuestro CRM Kommo a través de n8n. Una especialista te contactará a la brevedad para asesorarte. ✨`,
            [{ label: 'Agendar Turno Ahora', action: 'agendar' }]
          );
        }, 1500);
      }
    } catch (err) {
      console.error('Error submitting lead:', err);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Expanded Chat Box */}
      {isOpen && (
        <div
          id="chat-assistant-window"
          className="w-[92vw] sm:w-[410px] h-[580px] max-h-[82vh] bg-[#F8F5F2] rounded-3xl border border-[#E8DDD4] shadow-2xl flex flex-col overflow-hidden mb-3 animate-in slide-in-from-bottom-5 duration-300 text-left"
        >
          {/* Header */}
          <div className="p-4 bg-white border-b border-[#E8DDD4] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <AllegraLogo size={36} />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
              </div>

              <div>
                <h4 className="font-heading text-sm font-bold text-[#2C2C2C] flex items-center gap-1.5">
                  <span>Allegra Asistente</span>
                  <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-[#C8A96B]/15 text-[#C8A96B]">IA + Kommo</span>
                </h4>
                <p className="text-[11px] text-[#2C2C2C]/60 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Allegra Salon Online
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowLeadForm(!showLeadForm)}
                className="p-2 rounded-xl text-xs font-semibold text-[#C8A96B] hover:bg-[#F8F5F2] transition-colors"
                title="Capturar Lead / Dejar Datos"
              >
                <Zap className="w-4 h-4" />
              </button>
              <button
                onClick={onToggle}
                className="p-2 rounded-full hover:bg-[#E8DDD4] text-[#2C2C2C] transition-colors"
                aria-label="Cerrar chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Lead Capture Overlay Drawer if toggled */}
          {showLeadForm && (
            <div className="p-4 bg-white border-b border-[#E8DDD4] shadow-sm animate-in slide-in-from-top-2 duration-200">
              {leadCapturedSuccess ? (
                <div className="py-4 text-center space-y-1 text-emerald-700 text-xs font-semibold">
                  <CheckCircle2 className="w-6 h-6 mx-auto text-emerald-600 mb-1" />
                  <p>¡Datos enviados exitosamente a Kommo CRM!</p>
                </div>
              ) : (
                <form onSubmit={handleLeadSubmit} className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#C8A96B]">
                      Contacto Prioritario (CRM)
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowLeadForm(false)}
                      className="text-[11px] text-[#2C2C2C]/50 hover:text-[#2C2C2C]"
                    >
                      Cancelar
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      placeholder="Tu Nombre *"
                      value={leadFormData.nombre}
                      onChange={(e) => setLeadFormData({ ...leadFormData, nombre: e.target.value })}
                      className="px-3 py-1.5 rounded-lg bg-[#F8F5F2] border border-[#E8DDD4] text-xs"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="WhatsApp *"
                      value={leadFormData.telefono}
                      onChange={(e) => setLeadFormData({ ...leadFormData, telefono: e.target.value })}
                      className="px-3 py-1.5 rounded-lg bg-[#F8F5F2] border border-[#E8DDD4] text-xs"
                    />
                  </div>
                  <input
                    type="email"
                    placeholder="Email (opcional)"
                    value={leadFormData.email}
                    onChange={(e) => setLeadFormData({ ...leadFormData, email: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-[#F8F5F2] border border-[#E8DDD4] text-xs"
                  />
                  <button
                    type="submit"
                    className="w-full py-2 rounded-lg bg-[#C8A96B] text-white text-xs font-semibold uppercase tracking-wider font-button hover:bg-[#B2904F] transition-all"
                  >
                    Enviar a Asesora de Ventas
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Messages Scroll Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl text-xs sm:text-[13px] leading-relaxed shadow-2xs ${
                    msg.sender === 'user'
                      ? 'bg-[#2C2C2C] text-white rounded-br-xs'
                      : 'bg-white border border-[#E8DDD4] text-[#2C2C2C] rounded-bl-xs'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <span className={`text-[9px] mt-1.5 block text-right ${msg.sender === 'user' ? 'text-white/60' : 'text-[#2C2C2C]/40'}`}>
                    {msg.timestamp}
                  </span>
                </div>

                {/* Quick action buttons if provided */}
                {msg.quickOptions && msg.quickOptions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2.5 max-w-[90%]">
                    {msg.quickOptions.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleQuickAction(opt.action, opt.label)}
                        className="text-[11px] font-medium bg-white hover:bg-[#C8A96B] hover:text-white text-[#2C2C2C]/80 px-3 py-1.5 rounded-xl border border-[#E8DDD4] shadow-2xs transition-all flex items-center gap-1"
                      >
                        <span>{opt.label}</span>
                        <ChevronRight className="w-3 h-3 opacity-60" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 p-3 rounded-2xl bg-white border border-[#E8DDD4] max-w-[120px]">
                <span className="w-2 h-2 rounded-full bg-[#C8A96B] animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-[#C8A96B] animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-[#C8A96B] animate-bounce [animation-delay:0.4s]" />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Shortcuts Bar */}
          <div className="px-3 py-1.5 bg-white border-t border-[#E8DDD4]/80 flex items-center gap-2 overflow-x-auto text-[10px] text-[#2C2C2C]/70">
            <button
              onClick={() => onOpenBookingForService('cejas-micro')}
              className="shrink-0 px-2.5 py-1 rounded-full bg-[#F8F5F2] hover:bg-[#C8A96B] hover:text-white transition-colors flex items-center gap-1"
            >
              <Calendar className="w-3 h-3 text-[#C8A96B]" /> Reservar Turno
            </button>
            <button
              onClick={() => handleSendMessage('¿Cuáles son los precios de los servicios?')}
              className="shrink-0 px-2.5 py-1 rounded-full bg-[#F8F5F2] hover:bg-[#C8A96B] hover:text-white transition-colors flex items-center gap-1"
            >
              <DollarSign className="w-3 h-3 text-[#C8A96B]" /> Precios
            </button>
            <button
              onClick={() => handleSendMessage('¿Dónde queda el estudio y qué horarios tienen?')}
              className="shrink-0 px-2.5 py-1 rounded-full bg-[#F8F5F2] hover:bg-[#C8A96B] hover:text-white transition-colors"
            >
              📍 Ubicación
            </button>
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white border-t border-[#E8DDD4] flex items-center gap-2">
            <input
              type="text"
              placeholder="Escribe tu consulta aquí..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 px-4 py-2.5 rounded-full bg-[#F8F5F2] border border-[#E8DDD4] text-xs text-[#2C2C2C] focus:outline-none focus:border-[#C8A96B]"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputVal.trim() || isTyping}
              className="w-10 h-10 rounded-full bg-[#C8A96B] hover:bg-[#B2904F] text-white flex items-center justify-center transition-colors disabled:opacity-40 shrink-0"
              aria-label="Enviar mensaje"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        id="floating-chat-trigger"
        onClick={onToggle}
        className="group relative flex items-center gap-3 p-3.5 sm:px-5 sm:py-3.5 rounded-full bg-[#2C2C2C] text-white hover:bg-[#C8A96B] transition-all duration-300 shadow-2xl hover:scale-105 active:scale-95 border border-[#C8A96B]/50"
        aria-label="Abrir asistente de belleza"
      >
        <div className="relative">
          <MessageCircle className="w-5 h-5 text-[#C8A96B] group-hover:text-white transition-colors" />
          {isUnread && (
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#C8A96B] rounded-full border border-[#2C2C2C] animate-ping" />
          )}
        </div>
        
        <div className="hidden sm:flex flex-col text-left">
          <span className="text-xs font-bold tracking-wide font-button leading-tight">
            Asistente Virtual
          </span>
          <span className="text-[10px] text-[#C8A96B] group-hover:text-white/90 leading-tight">
            Consultas & Turnos
          </span>
        </div>
      </button>

    </div>
  );
};
