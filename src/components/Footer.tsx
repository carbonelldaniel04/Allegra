import React from 'react';
import { Sparkles, Instagram, Facebook, Shield, Phone, Mail, MapPin, MessageCircle, GraduationCap } from 'lucide-react';
import { STUDIO_INFO } from '../data/initialData';
import { AllegraLogo } from './AllegraLogo';

interface FooterProps {
  onToggleAdmin: () => void;
  onOpenBooking?: () => void;
  onOpenChat: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onToggleAdmin, onOpenBooking, onOpenChat }) => {
  return (
    <footer className="bg-[#232323] text-white pt-16 pb-12 border-t border-[#C8A96B]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10 text-left">
          
          {/* Col 1: Studio Brand */}
          <div className="space-y-4">
            <AllegraLogo size={52} variant="light" showText={true} />
            <p className="text-xs text-white/70 leading-relaxed font-body">
              {STUDIO_INFO.slogan} Especialistas certificados en micropigmentación facial y extensiones de pestañas de alta gama por Master Leticia Moctezuma.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#C8A96B] text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#C8A96B] text-white flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={STUDIO_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#C8A96B] text-white flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-heading text-sm font-bold text-[#C8A96B] uppercase tracking-wider">
              Navegación
            </h4>
            <ul className="space-y-2 text-xs text-white/70">
              <li><a href="#inicio" className="hover:text-[#C8A96B] transition-colors">Inicio</a></li>
              <li><a href="#cursos" className="hover:text-[#C8A96B] transition-colors">Cursos Online Academy</a></li>
              <li><a href="#servicios" className="hover:text-[#C8A96B] transition-colors">Nuestros Servicios</a></li>
              <li><a href="#galeria" className="hover:text-[#C8A96B] transition-colors">Galería de Casos</a></li>
              <li><a href="#opiniones" className="hover:text-[#C8A96B] transition-colors">Opiniones de Clientes</a></li>
              <li><a href="#preguntas" className="hover:text-[#C8A96B] transition-colors">Preguntas Frecuentes</a></li>
              <li><a href="#contacto" className="hover:text-[#C8A96B] transition-colors">Contacto & Sucursales</a></li>
            </ul>
          </div>

          {/* Col 3: Treatments & Academy */}
          <div className="space-y-3">
            <h4 className="font-heading text-sm font-bold text-[#C8A96B] uppercase tracking-wider">
              Tratamientos & Cursos
            </h4>
            <ul className="space-y-2 text-xs text-white/70">
              <li><a href="#cursos" className="hover:text-[#C8A96B] transition-colors">Masterclass Microblading Pelo a Pelo</a></li>
              <li><a href="#cursos" className="hover:text-[#C8A96B] transition-colors">Especialización Lip Blush Online</a></li>
              <li><a href="#servicios" className="hover:text-[#C8A96B] transition-colors">Microblading & Cejas en CDMX</a></li>
              <li><a href="#servicios" className="hover:text-[#C8A96B] transition-colors">Lip Blush & Delineado de Ojos</a></li>
              <li><a href="#servicios" className="hover:text-[#C8A96B] transition-colors">Extensiones de Pestañas</a></li>
            </ul>
          </div>

          {/* Col 4: Studio Contact & Academy */}
          <div className="space-y-4">
            <h4 className="font-heading text-sm font-bold text-[#C8A96B] uppercase tracking-wider">
              Atelier & Academy
            </h4>
            <div className="space-y-2 text-xs text-white/70">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C8A96B] shrink-0" />
                <span>{STUDIO_INFO.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C8A96B] shrink-0" />
                <span>{STUDIO_INFO.phone}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C8A96B] shrink-0" />
                <span>{STUDIO_INFO.email}</span>
              </p>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <a
                href="#cursos"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#C8A96B] hover:bg-[#B2904F] text-white text-xs font-semibold uppercase tracking-wider font-button transition-colors shadow-md text-center"
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Ver Cursos Online</span>
              </a>

              <button
                onClick={onToggleAdmin}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 text-[11px] font-medium transition-colors"
              >
                <Shield className="w-3.5 h-3.5 text-[#C8A96B]" />
                <span>Panel CRM Studio</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-4">
          <p>© {new Date().getFullYear()} Allegra Salón. Master Leticia Moctezuma. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-white transition-colors cursor-pointer">Protocolos Médicos y de Higiene Certificados</span>
            <span>•</span>
            <span className="hover:text-white transition-colors cursor-pointer">Integrado con n8n & Kommo CRM</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

