import React, { useState, useEffect } from 'react';
import { Send, Sparkles, RefreshCw, Clock } from 'lucide-react';
import './StreamChat.css';

interface HistoryItem {
  id: string;
  title: string;
  message: string;
  theme: 'purple' | 'cyan' | 'gold' | 'red';
  duration: number;
  sound: string;
  timestamp: number;
}

export const StreamChatSender: React.FC = () => {
  const [title, setTitle] = useState<string>('AVISO');
  const [message, setMessage] = useState<string>('');
  const [theme, setTheme] = useState<'purple' | 'cyan' | 'gold' | 'red'>('purple');
  const [duration, setDuration] = useState<number>(6); // in seconds
  const [sound, setSound] = useState<string>('bell');
  
  const [isSending, setIsSending] = useState<boolean>(false);
  const [sendSuccess, setSendSuccess] = useState<boolean>(false);
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

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!message.trim()) return;

    setIsSending(true);
    setSendSuccess(false);

    const payload = {
      title: title.trim() || 'AVISO',
      message: message.trim(),
      theme: theme,
      duration: duration * 1000,
      sound: sound,
    };

    try {
      const topic = 'unked-obs-chat-stream-alerts';
      const response = await fetch(`https://ntfy.sh/${topic}`, {
        method: 'POST',
        headers: {
          // ntfy allows publishing via POST where request body is the message
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSendSuccess(true);
        setMessage(''); // Clear message text but keep others
        
        // Add to history list
        const newItem: HistoryItem = {
          id: String(Date.now()),
          title: payload.title,
          message: payload.message,
          theme: payload.theme,
          duration: duration,
          sound: payload.sound,
          timestamp: Date.now(),
        };
        saveToHistory(newItem);

        // Reset success state after a delay
        setTimeout(() => setSendSuccess(false), 2000);
      } else {
        alert('Error al enviar el mensaje al servidor.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Error de conexión al enviar el mensaje.');
    } finally {
      setIsSending(false);
    }
  };

  // Presets
  const applyPreset = (presetTitle: string, presetMsg: string, presetTheme: typeof theme, presetDur: number, presetSound: string) => {
    setTitle(presetTitle);
    setMessage(presetMsg);
    setTheme(presetTheme);
    setDuration(presetDur);
    setSound(presetSound);
  };

  const applyHistory = (item: HistoryItem) => {
    setTitle(item.title);
    setMessage(item.message);
    setTheme(item.theme);
    setDuration(item.duration);
    setSound(item.sound);
  };

  return (
    <div className="sender-container">
      <div className="sender-card">
        <div className="sender-title-section">
          <Sparkles size={24} color="#a855f7" />
          <h1 className="sender-title">UNKED CONTROLLER</h1>
        </div>

        <form onSubmit={handleSend} className="form-group" style={{ gap: '1.25rem' }}>
          
          {/* Header/Title */}
          <div className="form-group">
            <label className="form-label">Cabecera / Autor</label>
            <input 
              type="text" 
              className="form-input" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: AVISO, UNK, IMPORTANTE..."
              maxLength={25}
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

          {/* Duration Slider */}
          <div className="form-group">
            <label className="form-label">Duración en Stream</label>
            <div className="duration-slider-container">
              <Clock size={16} color="#94a3b8" />
              <input 
                type="range" 
                min="3" 
                max="15" 
                className="duration-slider"
                value={duration} 
                onChange={(e) => setDuration(parseInt(e.target.value))}
              />
              <span className="duration-value">{duration}s</span>
            </div>
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

          {/* Send Button */}
          <button 
            type="submit" 
            className="send-btn"
            disabled={isSending || !message.trim()}
          >
            {isSending ? (
              <>
                <RefreshCw size={20} className="spinning-disc" />
                ENVIANDO...
              </>
            ) : sendSuccess ? (
              '¡ENVIADO AL DIRECTO!'
            ) : (
              <>
                <Send size={20} />
                ENVIAR MENSAJE
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
              onClick={() => applyPreset('DIRECTO', '¡Empezamos en unos minutos!', 'purple', 10, 'laser')}
            >
              🚀 Empezar Directo
            </button>
            <button 
              type="button" 
              className="preset-chip"
              onClick={() => applyPreset('VOLVEMOS', '¡Pausa breve! Ya regresamos.', 'cyan', 12, 'bell')}
            >
              ☕ Pausa / Café
            </button>
            <button 
              type="button" 
              className="preset-chip"
              onClick={() => applyPreset('TEMA NUEVO', '¡Escuchando temas en directo!', 'gold', 8, 'bell')}
            >
              🎵 Escuchando Temas
            </button>
            <button 
              type="button" 
              className="preset-chip"
              onClick={() => applyPreset('ATENCIÓN', '¡Escuchen esto con atención!', 'red', 6, 'retro')}
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
                  <span className="history-item-text">{item.message}</span>
                  <span className={`history-item-tag ${item.theme}`}>
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
