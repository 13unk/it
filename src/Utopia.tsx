import React, { useState, useEffect } from 'react';
import './Utopia.css';
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, User, X, Edit2 } from 'lucide-react';
import { db } from './firebase';
import { collection, addDoc, onSnapshot, query, deleteDoc, doc, updateDoc } from 'firebase/firestore';

interface EventCard {
  id: string;
  date: string;
  title: string;
  description?: string;
  users: string[];
  channel: string;
  project: string;
}

const USERS = ['Dario', 'Kai', 'Omar', 'Tresillo'];
const CHANNELS = ['SEED', 'UNK', 'YEP'];
const PROJECTS_MAP: Record<string, string[]> = {
  'SEED': ['seed_1', 'seed_2', 'seed_3'],
  'UNK': ['unk_1', 'unk_2', 'unk_3'],
  'YEP': ['yep_1', 'yep_2', 'yep_3'],
};

const CHANNEL_ICONS: Record<string, string> = {
  'SEED': '/utopia/pfp_seed.jpg',
  'UNK': '/utopia/pfp_unk.jpeg',
  'YEP': '/utopia/pfp_yep.jpg'
};

const CHANNEL_COLORS: Record<string, string> = {
  'SEED': '#74C476',
  'UNK': '#9B5DE0',
  'YEP': '#6BAED6'
};

export const Utopia: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<EventCard[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<EventCard | null>(null);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
    users: [] as string[],
    channel: '',
    project: ''
  });

  useEffect(() => {
    const q = query(collection(db, 'events'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const eventsData: EventCard[] = [];
      querySnapshot.forEach((doc) => {
        eventsData.push({ id: doc.id, ...doc.data() } as EventCard);
      });
      setEvents(eventsData);
    }, (error) => {
      console.error("Snapshot error:", error);
      if (error.code === 'permission-denied') {
        alert("Atención: No hay permisos para leer/escribir en la base de datos. Asegúrate de poner Firestore en 'Modo de prueba' (Test mode).");
      }
    });
    return () => unsubscribe();
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const toggleUser = (u: string) => {
    setFormData(prev => ({
      ...prev,
      users: prev.users.includes(u) ? prev.users.filter(user => user !== u) : [...prev.users, u]
    }));
  };

  const setChannel = (c: string) => {
    setFormData(prev => ({ 
      ...prev, 
      channel: prev.channel === c ? '' : c,
      project: '' 
    }));
  };

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.date || !formData.channel || !formData.project) return;

    const newEvent = {
      title: formData.title,
      date: formData.date,
      description: formData.description,
      users: formData.users,
      channel: formData.channel,
      project: formData.project
    };

    try {
      if (editingEventId) {
        await updateDoc(doc(db, 'events', editingEventId), newEvent);
        setEditingEventId(null);
      } else {
        await addDoc(collection(db, 'events'), newEvent);
      }
      setFormData({
        title: '',
        date: new Date().toISOString().split('T')[0],
        description: '',
        users: [],
        channel: '',
        project: ''
      });
    } catch (error) {
      console.error("Error saving document: ", error);
    }
  };

  const startEditEvent = () => {
    if (!selectedEvent) return;
    setFormData({
      title: selectedEvent.title,
      date: selectedEvent.date,
      description: selectedEvent.description || '',
      users: selectedEvent.users,
      channel: selectedEvent.channel,
      project: selectedEvent.project
    });
    setEditingEventId(selectedEvent.id);
    setSelectedEvent(null);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const handleDeleteEvent = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'events', id));
      setSelectedEvent(null);
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const renderCalendarCells = () => {
    const cells = [];
    const todayStr = new Date().toISOString().split('T')[0];

    for (let i = 0; i < adjustedFirstDay; i++) {
      cells.push(<div key={`empty-${i}`} className="calendar-cell empty"></div>);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const isToday = dateStr === todayStr;
      
      const dayEvents = events.filter(e => e.date === dateStr);

      cells.push(
        <div key={d} className={`calendar-cell ${isToday ? 'today' : ''}`}>
          <div className="cell-date">{d}</div>
          <div className="events-container">
            {dayEvents.map(ev => (
              <button 
                key={ev.id} 
                className="event-chip-mini"
                style={{ borderColor: CHANNEL_COLORS[ev.channel] || '#111' }}
                title={ev.title}
                onClick={() => setSelectedEvent(ev)}
              >
                <img src={CHANNEL_ICONS[ev.channel]} alt={ev.channel} />
              </button>
            ))}
          </div>
        </div>
      );
    }
    return cells;
  };

  return (
    <div className="utopia-container">
      <div className="utopia-header">
        <h1 className="utopia-title">UTOPIA</h1>
      </div>

      <div className="calendar-card">
        {selectedEvent && (
          <div className="event-detail-overlay">
            <button className="event-detail-close" onClick={() => setSelectedEvent(null)}>
              <X size={24} />
            </button>
            
            <div className="event-detail-content-stacked">
              <h2 className="event-detail-title">{selectedEvent.title}</h2>
              <div className="event-detail-date-right">
                {selectedEvent.date.split('-').reverse().join('/')}
              </div>

              {selectedEvent.description && (
                <div className="stacked-info">
                  <span className="stacked-label">Descripción</span>
                  <p className="stacked-desc">{selectedEvent.description}</p>
                </div>
              )}

              <div className="stacked-info">
                <span className="stacked-label">Canal</span>
                <span className="stacked-value">
                  <img 
                    src={CHANNEL_ICONS[selectedEvent.channel]} 
                    alt={selectedEvent.channel} 
                    style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' }} 
                  />
                  {selectedEvent.channel}
                </span>
              </div>

              <div className="stacked-info">
                <span className="stacked-label">Proyecto</span>
                <span className="stacked-value">{selectedEvent.project}</span>
              </div>

              <div className="stacked-info">
                <span className="stacked-label">Equipo Involucrado</span>
                <div className="pills-container" style={{ marginTop: '0.25rem' }}>
                  {selectedEvent.users.map(u => (
                    <span key={u} className="pill-btn active" style={{ cursor: 'default', padding: '0.4rem 1rem' }}>
                      <User size={14} /> {u}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="event-detail-actions">
              <button className="edit-btn" onClick={startEditEvent}>
                <Edit2 size={18} strokeWidth={3} /> Editar
              </button>
              <button className="delete-btn" onClick={() => handleDeleteEvent(selectedEvent.id)}>
                <X size={18} strokeWidth={3} /> Eliminar
              </button>
            </div>
          </div>
        )}

        <div className="calendar-header">
          <button className="calendar-nav-btn" onClick={handlePrevMonth}>
            <ChevronLeft size={20} />
          </button>
          <div className="calendar-month">{monthNames[month]} {year}</div>
          <button className="calendar-nav-btn" onClick={handleNextMonth}>
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="calendar-grid">
          {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map(d => (
            <div key={d} className="calendar-day-header">{d}</div>
          ))}
          {renderCalendarCells()}
        </div>
      </div>

      <div className="tool-card">
        <div className="tool-header">
          <CalendarIcon size={24} />
          <span>{editingEventId ? 'Editar Evento' : 'Añadir'}</span>
        </div>
        
        <form onSubmit={handleAddEvent} className="form-grid">
          <div className="form-group">
            <label className="form-label">Título</label>
            <input 
              type="text" 
              className="form-input" 
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Fecha</label>
            <input 
              type="date" 
              className="form-input" 
              value={formData.date}
              onChange={e => setFormData({...formData, date: e.target.value})}
              required
            />
          </div>
          
          <div className="form-group full-width">
            <label className="form-label">Descripción (Opcional)</label>
            <textarea 
              className="form-input" 
              rows={3}
              placeholder="Detalles sobre el rodaje, ubicaciones, notas..."
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <div className="form-group full-width">
            <label className="form-label">Canal</label>
            <div className="pills-container">
              {CHANNELS.map(c => (
                <button 
                  key={c} 
                  type="button"
                  className={`pill-btn ${formData.channel === c ? 'active' : ''}`}
                  onClick={() => setChannel(c)}
                >
                  <img src={CHANNEL_ICONS[c]} alt={c} className="channel-icon" />
                  {c}
                </button>
              ))}
            </div>
          </div>

          {formData.channel && (
            <div className="form-group full-width">
              <label className="form-label">Proyecto</label>
              <select 
                className="form-input"
                value={formData.project}
                onChange={e => setFormData({...formData, project: e.target.value})}
                required
              >
                <option value="">Selecciona un proyecto...</option>
                {PROJECTS_MAP[formData.channel].map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
          )}

          <div className="form-group full-width">
            <label className="form-label">Equipo Involucrado</label>
            <div className="pills-container">
              {USERS.map(u => (
                <button 
                  key={u} 
                  type="button"
                  className={`pill-btn ${formData.users.includes(u) ? 'active' : ''}`}
                  onClick={() => toggleUser(u)}
                >
                  <User size={16} /> {u}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={!formData.title || !formData.channel || !formData.project}>
            {editingEventId ? (
              <><Edit2 size={20} /> Guardar Cambios</>
            ) : (
              <><Plus size={20} /> Añadir al Calendario</>
            )}
          </button>
          
          {editingEventId && (
            <button 
              type="button" 
              className="submit-btn" 
              style={{ background: '#f0f0f0', color: '#111', marginTop: '0.5rem' }}
              onClick={() => {
                setEditingEventId(null);
                setFormData({ title: '', date: new Date().toISOString().split('T')[0], description: '', users: [], channel: '', project: '' });
              }}
            >
              Cancelar Edición
            </button>
          )}
        </form>
      </div>
    </div>
  );
};
