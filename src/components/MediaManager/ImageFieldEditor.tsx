import React, { useState, useRef } from 'react';
import { Upload, Link, Image as ImageIcon, Check, RefreshCw, X } from 'lucide-react';
import { CURATED_STOCK_IMAGES, StockImage } from './stockImages';

interface ImageFieldEditorProps {
  label: string;
  currentUrl: string;
  onChangeUrl: (newUrl: string) => void;
  aspectRatioClass?: string;
  categoryFilter?: 'cejas' | 'labios' | 'ojos' | 'pestanas' | 'salon' | 'especialistas';
}

export const ImageFieldEditor: React.FC<ImageFieldEditorProps> = ({
  label,
  currentUrl,
  onChangeUrl,
  aspectRatioClass = 'aspect-video',
  categoryFilter
}) => {
  const [isUrlInputOpen, setIsUrlInputOpen] = useState(false);
  const [urlDraft, setUrlDraft] = useState(currentUrl);
  const [isStockOpen, setIsStockOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryFilter || 'todos');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle local file upload & base64 conversion
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit (e.g. 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('La imagen es muy pesada. Por favor selecciona una imagen menor a 5MB para optimizar el rendimiento.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        onChangeUrl(event.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleApplyUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (urlDraft.trim()) {
      onChangeUrl(urlDraft.trim());
      setIsUrlInputOpen(false);
    }
  };

  const filteredStock = selectedCategory === 'todos'
    ? CURATED_STOCK_IMAGES
    : CURATED_STOCK_IMAGES.filter(img => img.category === selectedCategory);

  return (
    <div className="space-y-2 bg-white/60 p-3 rounded-2xl border border-[#E8DDD4] text-left">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-[#2C2C2C]">{label}</label>
        <span className="text-[10px] text-[#2C2C2C]/50 uppercase tracking-wider font-mono">
          {currentUrl.startsWith('data:') ? 'Foto local (Subida)' : 'Enlace Web'}
        </span>
      </div>

      {/* Image Preview & Controls */}
      <div className="relative rounded-xl overflow-hidden border border-[#E8DDD4] bg-neutral-100 group">
        <div className={`w-full ${aspectRatioClass} overflow-hidden bg-neutral-900/10`}>
          <img
            src={currentUrl}
            alt={label}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              // fallback if broken url
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80';
            }}
          />
        </div>

        {/* Floating Quick Action Overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-3">
          {/* File Upload Button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-3 py-1.5 rounded-lg bg-white/90 hover:bg-white text-[#2C2C2C] text-xs font-semibold flex items-center gap-1.5 shadow-md transition-all hover:scale-105"
            title="Subir archivo desde tu dispositivo"
          >
            <Upload className="w-3.5 h-3.5 text-[#C8A96B]" />
            <span>Subir</span>
          </button>

          {/* Paste URL Button */}
          <button
            type="button"
            onClick={() => {
              setUrlDraft(currentUrl);
              setIsUrlInputOpen(!isUrlInputOpen);
              setIsStockOpen(false);
            }}
            className="px-3 py-1.5 rounded-lg bg-white/90 hover:bg-white text-[#2C2C2C] text-xs font-semibold flex items-center gap-1.5 shadow-md transition-all hover:scale-105"
            title="Ingresar URL de imagen"
          >
            <Link className="w-3.5 h-3.5 text-[#C8A96B]" />
            <span>URL</span>
          </button>

          {/* Stock Library Button */}
          <button
            type="button"
            onClick={() => {
              setIsStockOpen(!isStockOpen);
              setIsUrlInputOpen(false);
            }}
            className="px-3 py-1.5 rounded-lg bg-[#C8A96B] hover:bg-[#B2904F] text-white text-xs font-semibold flex items-center gap-1.5 shadow-md transition-all hover:scale-105"
            title="Elegir de fotos curadas de alta calidad"
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Stock</span>
          </button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>

      {/* URL Input Form Drawer */}
      {isUrlInputOpen && (
        <form onSubmit={handleApplyUrl} className="pt-2 space-y-2">
          <div className="flex gap-2">
            <input
              type="url"
              placeholder="https://ejemplo.com/mi-imagen.jpg"
              value={urlDraft}
              onChange={(e) => setUrlDraft(e.target.value)}
              className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-[#E8DDD4] bg-white focus:outline-none focus:border-[#C8A96B]"
              autoFocus
            />
            <button
              type="submit"
              className="px-3 py-1.5 rounded-lg bg-[#C8A96B] text-white text-xs font-semibold hover:bg-[#B2904F] flex items-center gap-1"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Aplicar</span>
            </button>
            <button
              type="button"
              onClick={() => setIsUrlInputOpen(false)}
              className="p-1.5 rounded-lg border border-[#E8DDD4] hover:bg-neutral-100 text-neutral-500"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      )}

      {/* Curated Stock Library Grid */}
      {isStockOpen && (
        <div className="pt-2 space-y-2 border-t border-[#E8DDD4]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-[#2C2C2C]">Biblioteca de Fotos de Alta Gama</span>
            <button
              type="button"
              onClick={() => setIsStockOpen(false)}
              className="text-neutral-400 hover:text-neutral-700"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap gap-1">
            {[
              { id: 'todos', label: 'Todas' },
              { id: 'cejas', label: 'Cejas' },
              { id: 'labios', label: 'Labios' },
              { id: 'ojos', label: 'Ojos' },
              { id: 'pestanas', label: 'Pestañas' },
              { id: 'salon', label: 'Estudio' },
              { id: 'especialistas', label: 'Artistas' }
            ].map(cat => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-[#C8A96B] text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grid of stock choices */}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5 max-h-36 overflow-y-auto p-1 bg-neutral-50 rounded-lg border border-neutral-200">
            {filteredStock.map((stock, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  onChangeUrl(stock.url);
                  setIsStockOpen(false);
                }}
                className="group/item relative aspect-video rounded overflow-hidden border hover:border-[#C8A96B] transition-all hover:scale-105"
                title={stock.title}
              >
                <img
                  src={stock.url}
                  alt={stock.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute inset-0 bg-black/40 opacity-0 group-hover/item:opacity-100 flex items-center justify-center text-[9px] text-white font-semibold text-center p-0.5">
                  Elegir
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
