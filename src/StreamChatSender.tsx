import React, { useState, useEffect } from 'react';
import { Sparkles, RefreshCw, Play, Square } from 'lucide-react';
import './StreamChat.css';

interface HistoryItem {
  id: string;
  title: string;
  message: string;
  theme: 'purple' | 'cyan' | 'gold' | 'red';
  sound: string;
  layout: 'top-right-banner' | 'full-bottom-banner' | 'top-left-alert';
  avatar: string;
  timestamp: number;
}

const AVATAR_PRESETS = [
  { name: 'UNK', url: '/unklogo.png' },
  { name: 'Robot', url: 'https://api.dicebear.com/7.x/bottts/svg?seed=unked' },
  { name: 'Música', url: 'https://api.dicebear.com/7.x/identicon/svg?seed=music' },
  { name: 'Streamer', url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=streamer' }
];

export const StreamChatSender: React.FC = () => {
  const [title, setTitle] = useState<string>('UNK');
  const [message, setMessage] = useState<string>('');
  const [theme, setTheme] = useState<'purple' | 'cyan' | 'gold' | 'red'>('purple');
  const [sound, setSound] = useState<string>('bell');
  const [layout, setLayout] = useState<'top-right-banner' | 'full-bottom-banner' | 'top-left-alert'>('top-right-banner');
  const [avatar, setAvatar] = useState<string>('/unklogo.png');
  const [customAvatar, setCustomAvatar] = useState<string>('');
  
  const [isSending, setIsSending] = useState<boolean>(false);
  const [activeInStream, setActiveInStream] = useState<boolean>(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Load history from localStorage
  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem('unked_stream_chat_history');
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (e) {
      console.warn("Could not load history from local storage", e);
    }
  }, []);

  // Save history to localStorage
  const saveToHistory = (newItem: HistoryItem) => {
    const updatedHistory = [newItem, ...history.filter(h => h.message !== newItem.message)].slice(0, 10);
    setHistory(updatedHistory);
    localStorage.setItem('unked_stream_chat_history', JSON.stringify(updatedHistory));
  };

  const sendPayload = async (payload: any) => {
    setIsSending(true);
    try {
      const topic = 'unked-obs-chat-stream-alerts';
      const response = await fetch(`https://ntfy.sh/${topic}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify(payload),
      });
      return response.ok;
    } catch (error) {
      console.error('Error sending message:', error);
      return false;
    } finally {
      setIsSending(false);
    }
  };

  const handleToggleStream = async (e: React.FormEvent) => {
    e.preventDefault();

    if (activeInStream) {
      // Send clear command
      const success = await sendPayload({ action: 'clear' });
      if (success) {
        setActiveInStream(false);
      } else {
        alert('Error al intentar quitar la alerta.');
      }
    } else {
      if (!message.trim()) return;

      const payload = {
        action: 'show',
        title: title.trim() || 'UNK',
        message: message.trim(),
        theme: theme,
        sound: sound,
        layout: layout,
        avatar: avatar,
      };

      const success = await sendPayload(payload);
      if (success) {
        setActiveInStream(true);
        
        // Add to history
        const newItem: HistoryItem = {
          id: String(Date.now()),
          title: payload.title,
          message: payload.message,
          theme: payload.theme,
          sound: payload.sound,
          layout: payload.layout,
          avatar: payload.avatar,
          timestamp: Date.now(),
        };
        saveToHistory(newItem);
      } else {
        alert('Error al enviar la alerta.');
      }
    }
  };

  // Presets
  const applyPreset = (presetTitle: string, presetMsg: string, presetTheme: typeof theme, presetSound: string, presetLayout: typeof layout, presetAvatar: string) => {
    setTitle(presetTitle);
    setMessage(presetMsg);
    setTheme(presetTheme);
    setSound(presetSound);
    setLayout(presetLayout);
    setAvatar(presetAvatar);
    setCustomAvatar('');
    setActiveInStream(false); // Reset active state since we have new data to show
  };

  const applyHistory = (item: HistoryItem) => {
    setTitle(item.title);
    setMessage(item.message);
    setTheme(item.theme);
    setSound(item.sound);
    setLayout(item.layout || 'top-right-banner');
    setAvatar(item.avatar || '/unklogo.png');
    if (!AVATAR_PRESETS.some(p => p.url === item.avatar)) {
      setCustomAvatar(item.avatar);
    } else {
      setCustomAvatar('');
    }
    setActiveInStream(false);
  };

  const getLayoutLabel = (l: HistoryItem['layout']) => {
    if (l === 'top-right-banner') return 'Arriba Der';
    if (l === 'top-left-alert') return 'Arriba Izq';
    if (l === 'full-bottom-banner') return 'Abajo';
    return 'Banner';
  };

  return (
    <div className="sender-container">
      <div className="sender-card">
        <div className="sender-title-section">
          <Sparkles size={24} color="#a855f7" />
          <h1 className="sender-title">UNKED CONTROLLER</h1>
        </div>

        <form onSubmit={handleToggleStream} className="form-group" style={{ gap: '1.25rem' }}>
          
          {/* Author */}
          <div className="form-group">
            <label className="form-label">Autor</label>
            <input 
              type="text" 
              className="form-input" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: UNK, AVISO..."
              maxLength={25}
            />
          </div>

          {/* Profile Picture Selector */}
          <div className="form-group">
            <label className="form-label">Imagen de Perfil</label>
            <div className="avatar-picker">
              {AVATAR_PRESETS.map((preset) => (
                <div 
                  key={preset.name}
                  className={`avatar-option ${avatar === preset.url ? 'selected' : ''}`}
                  onClick={() => {
                    setAvatar(preset.url);
                    setCustomAvatar('');
                  }}
                >
                  <img src={preset.url} alt={preset.name} className="avatar-img-preview" />
                  <span className="avatar-name-label">{preset.name}</span>
                </div>
              ))}
            </div>
            <input 
              type="text" 
              className="form-input" 
              value={customAvatar} 
              onChange={(e) => {
                setCustomAvatar(e.target.value);
                setAvatar(e.target.value || '/unklogo.png');
              }}
              placeholder="O pega una URL de imagen personalizada..."
              style={{ marginTop: '0.25rem', fontSize: '0.85rem' }}
            />
          </div>

          {/* Message Content */}
          <div className="form-group">
            <label className="form-label">Mensaje en Pantalla</label>
            <textarea 
              className="form-input form-textarea" 
              value={message} 
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Escribe el mensaje que saldrá en directo..."
              maxLength={200}
              required
            />
          </div>

          {/* Theme Color Picker */}
          <div className="form-group">
            <label className="form-label">Color del Pop-up</label>
            <div className="theme-picker">
              {(['purple', 'cyan', 'gold', 'red'] as const).map((t) => (
                <div 
                  key={t}
                  className={`theme-option ${t} ${theme === t ? 'selected' : ''}`}
                  onClick={() => setTheme(t)}
                >
                  {t === 'purple' && 'Morado'}
                  {t === 'cyan' && 'Cian'}
                  {t === 'gold' && 'Oro'}
                  {t === 'red' && 'Rojo'}
                </div>
              ))}
            </div>
          </div>

          {/* Layout Selector */}
          <div className="form-group">
            <label className="form-label">Diseño de Alerta (Layout)</label>
            <select 
              className="sound-selector" 
              value={layout} 
              onChange={(e) => setLayout(e.target.value as any)}
            >
              <option value="top-right-banner">Banner (Deslizar arriba-derecha)</option>
              <option value="top-left-alert">Alerta clásica (Arriba-izquierda)</option>
              <option value="full-bottom-banner">Banner completo inferior (Deslizar abajo)</option>
            </select>
          </div>

          {/* Alert Sound Trigger */}
          <div className="form-group">
            <label className="form-label">Sonido de Notificación</label>
            <select 
              className="sound-selector" 
              value={sound} 
              onChange={(e) => setSound(e.target.value)}
            >
              <option value="bell">Campana Digital</option>
              <option value="retro">Retro Blip</option>
              <option value="laser">Láser Sintetizado</option>
              <option value="none">Sin Sonido</option>
            </select>
          </div>

          {/* Send/Toggle Button */}
          <button 
            type="submit" 
            className="send-btn"
            style={{ 
              backgroundColor: activeInStream ? '#ef4444' : '#a855f7',
              borderColor: '#111'
            }}
            disabled={isSending || (!activeInStream && !message.trim())}
          >
            {isSending ? (
              <>
                <RefreshCw size={20} className="spinning-disc" />
                COMUNICANDO...
              </>
            ) : activeInStream ? (
              <>
                <Square size={18} />
                QUITAR DE STREAM (STOP)
              </>
            ) : (
              <>
                <Play size={18} />
                MOSTRAR EN STREAM (PLAY)
              </>
            )}
          </button>
        </form>

        {/* Quick Presets */}
        <div className="presets-section">
          <label className="form-label">Presets Rápidos</label>
          <div className="presets-grid">
            <button 
              type="button" 
              className="preset-chip"
              onClick={() => applyPreset('DIRECTO', '¡Empezamos en unos minutos!', 'purple', 'laser', 'top-right-banner', '/unklogo.png')}
            >
              🚀 Empezar Directo
            </button>
            <button 
              type="button" 
              className="preset-chip"
              onClick={() => applyPreset('VOLVEMOS', '¡Pausa breve! Ya regresamos.', 'cyan', 'bell', 'top-left-alert', 'https://api.dicebear.com/7.x/bottts/svg?seed=unked')}
            >
              ☕ Pausa / Café
            </button>
            <button 
              type="button" 
              className="preset-chip"
              onClick={() => applyPreset('TEMA NUEVO', '¡Escuchando temas en directo!', 'gold', 'bell', 'top-right-banner', '/unklogo.png')}
            >
              🎵 Escuchando Temas
            </button>
            <button 
              type="button" 
              className="preset-chip"
              onClick={() => applyPreset('ATENCIÓN', '¡Escuchen esto con atención!', 'red', 'retro', 'full-bottom-banner', 'https://api.dicebear.com/7.x/identicon/svg?seed=music')}
            >
              ⚠️ Alerta / Micrófono
            </button>
          </div>
        </div>

        {/* History of messages */}
        {history.length > 0 && (
          <div className="history-section">
            <label className="form-label">Historial de Envíos</label>
            <div className="history-list">
              {history.map((item) => (
                <div 
                  key={item.id} 
                  className="history-item"
                  onClick={() => applyHistory(item)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '70%' }}>
                    <img src={item.avatar} alt="" style={{ width: '20px', height: '20px', borderRadius: '50%' }} />
                    <span className="history-item-text" style={{ maxWidth: '80%' }}>{item.message}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
                    <span className="history-item-tag" style={{ background: 'rgba(255,255,255,0.08)', color: '#94a3b8' }}>
                      {getLayoutLabel(item.layout)}
                    </span>
                    <span className={`history-item-tag ${item.theme}`}>
                      {item.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
