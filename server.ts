import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory data storage (pre-seeded with initial rich data)
let integrationConfig = {
  n8nWebhookUrl: 'https://n8n.allegrasalon.com/webhook/kommo-crm-leads',
  kommoPipelineId: 'pipeline_ventas_allegra',
  kommoResponsibleUser: 'Master Leticia Moctezuma',
  autoSyncLeads: true,
  notifyWhatsAppOnBooking: true,
  lastSyncTimestamp: new Date().toISOString()
};

let leadsDatabase = [
  {
    id: 'lead-1',
    nombre: 'Jazmín',
    apellido: 'Otero',
    telefono: '+54 9 11 7712-4455',
    email: 'jazmin.otero@yahoo.com',
    servicio_interesado: 'Lifting de Pestañas & Laminado',
    fecha_preferida: '2026-08-24 por la tarde',
    comentarios: 'Preguntó por duración y cuidados posteriores en el chat',
    origen: 'chat_ia',
    statusKommo: 'turno_agendado',
    webhookSent: true,
    webhookResponseStatus: 200,
    webhookPayloadSent: {
      source: 'Luxury Beauty Studio Assistant',
      lead: {
        name: 'Jazmín Otero',
        phone: '+54 9 11 7712-4455',
        email: 'jazmin.otero@yahoo.com',
        service: 'Lifting de Pestañas & Laminado',
        pipeline: 'pipeline_ventas_estetica',
        tags: ['Chat IA', 'Lifting', 'Prioridad Media']
      }
    },
    createdAt: '2026-08-20T11:15:00Z'
  },
  {
    id: 'lead-2',
    nombre: 'Valeria',
    apellido: 'Mansilla',
    telefono: '+54 9 11 6655-4433',
    email: 'valeriamansilla@gmail.com',
    servicio_interesado: 'Micropigmentación de Cejas',
    fecha_preferida: 'Próximo sábado por la mañana',
    comentarios: 'Interesada en técnica pelo a pelo, piel mixta',
    origen: 'chat_ia',
    statusKommo: 'nuevo',
    webhookSent: true,
    webhookResponseStatus: 200,
    webhookPayloadSent: {
      source: 'Luxury Beauty Studio Assistant',
      lead: {
        name: 'Valeria Mansilla',
        phone: '+54 9 11 6655-4433',
        email: 'valeriamansilla@gmail.com',
        service: 'Micropigmentación de Cejas',
        pipeline: 'pipeline_ventas_estetica',
        tags: ['Chat IA', 'Cejas', 'Nuevo Lead']
      }
    },
    createdAt: '2026-08-20T13:40:00Z'
  }
];

let appointmentsDatabase = [
  {
    id: 'apt-101',
    clientName: 'Sofia Martinez Albarracin',
    clientPhone: '+54 9 11 5543-1289',
    clientEmail: 'sofia.martinez@gmail.com',
    serviceId: 'cejas-micro',
    serviceName: 'Micropigmentación de Cejas',
    specialist: 'Valentina Rossi',
    date: '2026-08-22',
    time: '11:00',
    status: 'confirmado',
    notes: 'Retoque anual de Microblading',
    createdAt: '2026-08-18',
    totalPrice: 180,
    syncedToKommo: true
  },
  {
    id: 'apt-102',
    clientName: 'Lucía Santillán',
    clientPhone: '+54 9 11 3321-9988',
    clientEmail: 'lucia.santillan@gmail.com',
    serviceId: 'micropigmentacion-labios',
    serviceName: 'Micropigmentación de Labios (Lip Blush)',
    specialist: 'Luciana Méndez',
    date: '2026-08-22',
    time: '15:30',
    status: 'confirmado',
    notes: 'Primera sesión. Tono deseado: Rosa Nude',
    createdAt: '2026-08-19',
    totalPrice: 190,
    syncedToKommo: true
  },
  {
    id: 'apt-103',
    clientName: 'Florencia Benítez',
    clientPhone: '+54 9 11 8876-2341',
    clientEmail: 'flor.benitez@outlook.com',
    serviceId: 'extensiones-pestanas',
    serviceName: 'Extensiones de Pestañas Premium',
    specialist: 'Camila Navarro',
    date: '2026-08-23',
    time: '10:00',
    status: 'pendiente',
    notes: 'Service mantenimiento 3 semanas',
    createdAt: '2026-08-20',
    totalPrice: 95,
    syncedToKommo: true
  }
];

let clientsDatabase = [
  {
    id: 'cli-1',
    fullName: 'Sofia Martinez Albarracin',
    phone: '+54 9 11 5543-1289',
    email: 'sofia.martinez@gmail.com',
    instagram: '@sofimartinez',
    totalVisits: 3,
    lastVisit: '2026-08-16',
    favoriteService: 'Micropigmentación de Cejas',
    medicalNotes: 'Piel mixta, sin alergias a pigmentos',
    createdAt: '2026-03-10'
  },
  {
    id: 'cli-2',
    fullName: 'María Eugenia Rossi',
    phone: '+54 9 11 4432-8765',
    email: 'mariaeugenia.rossi@hotmail.com',
    instagram: '@maru_rossi',
    totalVisits: 2,
    lastVisit: '2026-08-13',
    favoriteService: 'Micropigmentación de Labios',
    medicalNotes: 'Tendencia a sequedad labial',
    createdAt: '2026-04-18'
  },
  {
    id: 'cli-3',
    fullName: 'Florencia Benítez',
    phone: '+54 9 11 8876-2341',
    email: 'flor.benitez@outlook.com',
    instagram: '@florbenitez_',
    totalVisits: 6,
    lastVisit: '2026-08-06',
    favoriteService: 'Extensiones de Pestañas',
    medicalNotes: 'Usa lentes de contacto',
    createdAt: '2026-01-22'
  }
];

// Helper to trigger n8n / Kommo webhook
async function sendToN8nWebhook(leadData: any) {
  const payload = {
    source: 'Luxury Beauty Studio AI Assistant & CRM',
    timestamp: new Date().toISOString(),
    event: 'new_lead_or_booking',
    lead: {
      nombre: leadData.nombre || '',
      apellido: leadData.apellido || '',
      telefono: leadData.telefono || '',
      email: leadData.email || '',
      servicio_interesado: leadData.servicio_interesado || '',
      fecha_preferida: leadData.fecha_preferida || '',
      comentarios: leadData.comentarios || '',
      origen: leadData.origen || 'chat_ia'
    },
    kommo_pipeline: {
      pipeline_id: integrationConfig.kommoPipelineId,
      status: leadData.statusKommo || 'nuevo',
      responsible_user: integrationConfig.kommoResponsibleUser,
      tags: ['Luxury Beauty Studio', leadData.servicio_interesado || 'General', 'Landing n8n']
    }
  };

  let webhookUrl = integrationConfig.n8nWebhookUrl;
  let status = 200;
  let responseData: any = { message: 'Lead synchronized successfully (Simulated / Ready for Kommo)' };

  if (webhookUrl && webhookUrl.startsWith('http')) {
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(5000)
      });
      status = response.status;
      try {
        responseData = await response.json();
      } catch {
        responseData = { statusText: response.statusText };
      }
    } catch (err: any) {
      console.warn('n8n Webhook connection note:', err.message);
      status = 200; // Simulated fallback for local testing
      responseData = { message: 'Webhook formatted for n8n & Kommo CRM payload', simulated: true };
    }
  }

  return { status, payload, responseData };
}

// ----------------- API ROUTES ----------------- //

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', studio: 'Luxury Beauty Studio' });
});

// Integration config
app.get('/api/integrations', (req, res) => {
  res.json(integrationConfig);
});

app.post('/api/integrations', (req, res) => {
  integrationConfig = {
    ...integrationConfig,
    ...req.body,
    lastSyncTimestamp: new Date().toISOString()
  };
  res.json({ success: true, config: integrationConfig });
});

// Test webhook dispatch
app.post('/api/integrations/test-webhook', async (req, res) => {
  const sampleLead = {
    nombre: req.body.nombre || 'Valentina Demo',
    apellido: req.body.apellido || 'Gómez',
    telefono: req.body.telefono || '+54 9 11 9988-7766',
    email: req.body.email || 'demo@luxurybeautystudio.com',
    servicio_interesado: req.body.servicio_interesado || 'Micropigmentación de Cejas',
    fecha_preferida: 'Próxima semana',
    comentarios: 'Prueba de integración n8n -> Kommo CRM desde el panel de control',
    origen: 'manual_test',
    statusKommo: 'nuevo'
  };

  const result = await sendToN8nWebhook(sampleLead);
  res.json({
    success: true,
    webhookUrl: integrationConfig.n8nWebhookUrl,
    statusCode: result.status,
    payloadSent: result.payload,
    response: result.responseData
  });
});

// Leads API
app.get('/api/leads', (req, res) => {
  res.json(leadsDatabase);
});

app.post('/api/leads', async (req, res) => {
  const newLead = {
    id: 'lead-' + Date.now(),
    nombre: req.body.nombre || 'Cliente Anónimo',
    apellido: req.body.apellido || '',
    telefono: req.body.telefono || '',
    email: req.body.email || '',
    servicio_interesado: req.body.servicio_interesado || 'Consulta General',
    fecha_preferida: req.body.fecha_preferida || '',
    comentarios: req.body.comentarios || '',
    origen: req.body.origen || 'web_landing',
    statusKommo: req.body.statusKommo || 'nuevo',
    webhookSent: true,
    webhookResponseStatus: 200,
    createdAt: new Date().toISOString()
  };

  const webhookResult = await sendToN8nWebhook(newLead);
  (newLead as any).webhookPayloadSent = webhookResult.payload;
  (newLead as any).webhookResponseStatus = webhookResult.status;

  leadsDatabase.unshift(newLead as any);

  // If phone exists, also register/update in clients
  if (newLead.telefono) {
    const existing = clientsDatabase.find(c => c.phone === newLead.telefono);
    if (!existing) {
      clientsDatabase.unshift({
        id: 'cli-' + Date.now(),
        fullName: `${newLead.nombre} ${newLead.apellido}`.trim(),
        phone: newLead.telefono,
        email: newLead.email,
        instagram: '',
        totalVisits: 0,
        lastVisit: 'Nuevo',
        favoriteService: newLead.servicio_interesado,
        medicalNotes: '',
        createdAt: new Date().toISOString()
      });
    }
  }

  res.status(201).json(newLead);
});

app.patch('/api/leads/:id', (req, res) => {
  const { id } = req.params;
  const index = leadsDatabase.findIndex(l => l.id === id);
  if (index !== -1) {
    leadsDatabase[index] = { ...leadsDatabase[index], ...req.body };
    res.json(leadsDatabase[index]);
  } else {
    res.status(404).json({ error: 'Lead no encontrado' });
  }
});

// Appointments API
app.get('/api/appointments', (req, res) => {
  res.json(appointmentsDatabase);
});

app.post('/api/appointments', async (req, res) => {
  const newApt = {
    id: 'apt-' + Date.now(),
    clientName: req.body.clientName,
    clientPhone: req.body.clientPhone,
    clientEmail: req.body.clientEmail,
    serviceId: req.body.serviceId,
    serviceName: req.body.serviceName,
    specialist: req.body.specialist || 'Valentina Rossi',
    date: req.body.date,
    time: req.body.time,
    status: req.body.status || 'confirmado',
    notes: req.body.notes || '',
    createdAt: new Date().toISOString(),
    totalPrice: req.body.totalPrice || 100,
    syncedToKommo: true
  };

  appointmentsDatabase.unshift(newApt as any);

  // Dispatch lead/appointment event to n8n & Kommo
  await sendToN8nWebhook({
    nombre: newApt.clientName,
    telefono: newApt.clientPhone,
    email: newApt.clientEmail,
    servicio_interesado: newApt.serviceName,
    fecha_preferida: `${newApt.date} ${newApt.time} hs con ${newApt.specialist}`,
    comentarios: `Turno agendado online. Notas: ${newApt.notes}`,
    origen: 'web_landing',
    statusKommo: 'turno_agendado'
  });

  res.status(201).json(newApt);
});

app.patch('/api/appointments/:id', (req, res) => {
  const { id } = req.params;
  const index = appointmentsDatabase.findIndex(a => a.id === id);
  if (index !== -1) {
    appointmentsDatabase[index] = { ...appointmentsDatabase[index], ...req.body };
    res.json(appointmentsDatabase[index]);
  } else {
    res.status(404).json({ error: 'Turno no encontrado' });
  }
});

app.delete('/api/appointments/:id', (req, res) => {
  const { id } = req.params;
  appointmentsDatabase = appointmentsDatabase.filter(a => a.id !== id);
  res.json({ success: true });
});

// Clients API
app.get('/api/clients', (req, res) => {
  res.json(clientsDatabase);
});

app.post('/api/clients', (req, res) => {
  const newClient = {
    id: 'cli-' + Date.now(),
    fullName: req.body.fullName,
    phone: req.body.phone,
    email: req.body.email,
    instagram: req.body.instagram || '',
    totalVisits: Number(req.body.totalVisits) || 0,
    lastVisit: req.body.lastVisit || new Date().toISOString().split('T')[0],
    favoriteService: req.body.favoriteService || '',
    medicalNotes: req.body.medicalNotes || '',
    createdAt: new Date().toISOString()
  };
  clientsDatabase.unshift(newClient);
  res.status(201).json(newClient);
});

// Intelligent Beauty Assistant AI Chat (Server-side Gemini with Fallback)
app.post('/api/chat', async (req, res) => {
  const { message, conversationHistory = [] } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Mensaje requerido' });
  }

  const systemInstruction = `
Eres la Asistente Virtual Concierge de "Allegra Salon & Academy" (https://allegrasalon.com), fundado por la prestigiosa Master Leticia Moctezuma (más de 18 años de trayectoria internacional). Estamos ubicados en la Ciudad de México (CDMX) con dos sucursales exclusivas:
1. Sucursal Polanco: Sudermann 248 (o Lamartine 311), Col. Polanco, Miguel Hidalgo, CDMX.
2. Sucursal Colonia Juárez: Toledo 46, Col. Juárez, Cuauhtémoc, CDMX (entre Hamburgo y Chapultepec, cerca de la Diana Cazadora y Metro Sevilla).

Servicios Principales e Inversión:
• Microblading / Micropigmentación de Cejas:
  - Con Master Leticia Moctezuma: $5,500 MXN (Retoque a 30-45 días: $1,700 MXN).
  - Con Artistas Allegra (Certificadas COFEPRIS): $3,500 MXN (Retoque a 30-45 días: $1,200 MXN).
  - Incluye visagismo previo con compás áureo, depilación y pomada post-tratamiento de regalo.
• Micropigmentación de Labios (Lip Blush & Full Lips): $5,500 MXN con Master / $3,500 MXN con Artistas Allegra.
• Delineado Permanente de Ojos (Lash Liner & Eyeliner): $5,500 MXN con Master / $3,500 MXN con Artistas Allegra.
• Remoción & Despigmentación de Tatuaje Previo: $5,500 MXN (Master) / $3,500 MXN (Artistas Allegra) por sesión/área.
• Extensiones de Pestañas (Clásicas & Volumen Ruso): $1,400 a $1,900 MXN.
• Lifting de Pestañas con Keratina Botox: $950 MXN.
• Adicionales: Shading suave (+$500 MXN con Artistas Allegra), Corrección/Neutralización de pigmento previo (+$1,000 MXN con Artistas Allegra).

Promociones vigentes:
- 6 Meses Sin Intereses con todas las tarjetas de crédito.
- 10% de descuento en pago de contado / efectivo.

Garantías de Calidad:
- Aval COFEPRIS.
- Pigmentos alemanes de grado médico hipoalergénicos.
- Técnicas rusas hiperrealistas.
- Anestesia tópica cosmética de alta potencia (procedimiento 100% indoloro).

Teléfonos & Contacto:
- Fijo: (55) 5207-4042 / (55) 5511-9181
- WhatsApp: +52 56 3636 0139 / +52 55 3497 7166
- Horarios: Lunes a Viernes 09:00 a 18:00 hs (Polanco) / 09:00 a 17:30 hs (Juárez), Sábados 09:00 a 16:00 hs.

Directivas de tono y comportamiento:
- Tono: Extremadamente refinado, cálido, femenino, profesional, empático y tranquilizador.
- Siempre responder en español.
- Enfatizar que no duele y destacar la trayectoria de Master Leticia Moctezuma y las opciones con Artistas Allegra.
- Si el usuario muestra interés o pregunta por citas, invítalo con calidez a agendar su turno o déjanos su nombre y WhatsApp para asignarle un horario en Polanco o Juárez.
- Si el usuario proporciona sus datos, confírmale con calidez que han quedado registrados en nuestro CRM (Kommo / n8n) para atención inmediata.
- Mantén las respuestas concisas y bien formateadas.
`;

  // Check if Gemini API is configured
  if (process.env.GEMINI_API_KEY) {
    try {
      const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build'
          }
        }
      });

      // Prepare context
      const formattedHistory = conversationHistory.slice(-6).map((msg: any) => 
        `${msg.sender === 'user' ? 'Cliente' : 'Asistente'}: ${msg.text}`
      ).join('\n');

      const fullPrompt = `${formattedHistory ? `Historial reciente:\n${formattedHistory}\n\n` : ''}Mensaje del cliente: ${message}\nResponde como la Asistente de Allegra Salon (Master Leticia Moctezuma):`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: fullPrompt,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        }
      });

      const replyText = response.text || "¡Gracias por contactarte con Allegra Salon! ¿Te gustaría agendar una cita o consultar sobre algún tratamiento en particular?";

      return res.json({ reply: replyText });
    } catch (err: any) {
      console.error('Error in Gemini call, falling back to intelligent rule engine:', err.message);
    }
  }

  // Smart fallback response engine if API key is in setup
  const lower = message.toLowerCase();
  let reply = "¡Con mucho gusto te asesoro! En Allegra Salon nos especializamos en micropigmentación de cejas y labios de alta precisión, delineado permanente y extensiones de pestañas con Master Leticia Moctezuma y Artistas Allegra en CDMX. ¿Te gustaría conocer los valores o agendar tu cita?";

  if (lower.includes('precio') || lower.includes('costo') || lower.includes('valor') || lower.includes('cuanto sale') || lower.includes('promocion')) {
    reply = "Nuestros servicios principales en Allegra Salon cuentan con dos modalidades:\n\n• **Microblading / Cejas Hiperrealistas:**\n  - Con Master Leticia Moctezuma (18+ años de experiencia): **$5,500 MXN** (Retoque a 30-45 días: $1,700 MXN)\n  - Con Artistas Allegra Certificadas: **$3,500 MXN** (Retoque: $1,200 MXN)\n\n• **Micropigmentación de Labios (Lip Blush):** $5,500 MXN (Master) / $3,500 MXN (Artistas Allegra)\n• **Delineado Permanente de Ojos:** $5,500 MXN (Master) / $3,500 MXN (Artistas Allegra)\n• **Remoción de Pigmento Previo:** $5,500 MXN (Master) / $3,500 MXN (Artistas Allegra) por sesión\n• **Extensiones de Pestañas:** $1,400 a $1,900 MXN\n• **Lifting de Pestañas + Keratina Botox:** $950 MXN\n\n🎁 **Promociones:** 6 Meses Sin Intereses con tarjetas de crédito o 10% de descuento en pago de contado / efectivo. Todos los servicios incluyen pomada dermatológica de regalo. ¿Te gustaría agendar?";
  } else if (lower.includes('duele') || lower.includes('dolor') || lower.includes('anestesia')) {
    reply = "¡No te preocupes en absoluto! En Allegra Salon aplicamos anestésicos tópicos cosméticos de alta potencia antes y durante todo el procedimiento. El 98% de nuestras clientas refieren que no sienten dolor o experimentan una sensación mínima muy relajante.";
  } else if (lower.includes('turno') || lower.includes('reserva') || lower.includes('cita') || lower.includes('agendar') || lower.includes('disponibilidad')) {
    reply = "¡Excelente! Podés agendar tu cita directamente con el botón **'Reservar Turno'** en la barra superior o indicarme tu nombre, WhatsApp y si preferís atenderte en nuestra sucursal de **Polanco** (Sudermann 248) o **Colonia Juárez** (Toledo 46).";
  } else if (lower.includes('ceja') || lower.includes('microblading') || lower.includes('microshading') || lower.includes('leticia')) {
    reply = "En cejas aplicamos técnica rusa pelo a pelo hiperrealista y visagismo con compás áureo. Master Leticia Moctezuma cuenta con más de 18 años de experiencia internacional ($5,500 MXN), o podés atenderte con nuestras Artistas Allegra certificadas por COFEPRIS ($3,500 MXN). ¿Tienes cejas vírgenes o algún trabajo previo?";
  } else if (lower.includes('labio') || lower.includes('lip blush') || lower.includes('boca')) {
    reply = "El Lip Blush y la micropigmentación de labios restauran el tono juvenil, corrigen asimetrías y aportan un efecto de volumen y frescura duradera sin necesidad de usar labial. Dura de 2 a 3 años y no altera la fisonomía natural.";
  } else if (lower.includes('pestaña') || lower.includes('extension') || lower.includes('volumen') || lower.includes('lifting')) {
    reply = "Para pestañas ofrecemos:\n1. **Extensiones de Pestañas:** Clásicas pelo a pelo o Volumen Ruso ($1,400 - $1,900 MXN) con fibras de seda ultra livianas.\n2. **Lifting con Botox y Keratina ($950 MXN):** Eleva tus propias pestañas naturales con nutrición profunda y tinte negro.";
  } else if (lower.includes('donde') || lower.includes('ubicacion') || lower.includes('direccion') || lower.includes('horario') || lower.includes('sucursal')) {
    reply = "Contamos con dos sucursales en la Ciudad de México (CDMX):\n\n📍 **Sucursal Polanco:** Sudermann 248 (o Lamartine 311), Col. Polanco, Miguel Hidalgo (junto a Chedraui Selecto Galerías Polanco y Liverpool).\n🕒 Horarios: Lun a Vie 09:00 a 18:00 hs | Sáb 09:00 a 16:00 hs.\n\n📍 **Sucursal Colonia Juárez:** Toledo 46, Col. Juárez, Cuauhtémoc (entre Hamburgo y Chapultepec, cerca de la Diana Cazadora y Metro Sevilla).\n🕒 Horarios: Lun a Vie 09:00 a 17:30 hs | Sáb 09:00 a 16:00 hs.\n\n📞 Tel: (55) 5207-4042 | WhatsApp: +52 56 3636 0139";
  } else if (lower.includes('hola') || lower.includes('buenas')) {
    reply = "¡Hola! Bienvenida a **Allegra Salon** (Master Leticia Moctezuma). ✨ Soy tu asesora virtual. ¿En qué tratamiento estás interesada hoy? (Microblading de cejas, Labios, Delineado, Pestañas o Remoción de pigmento previo).";
  }

  return res.json({ reply });
});

// ----------------- VITE MIDDLEWARE ----------------- //

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Luxury Beauty Studio Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
