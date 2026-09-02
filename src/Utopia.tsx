import React, { useState, useEffect } from 'react';
import './Utopia.css';
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, User, X } from 'lucide-react';
import { db } from './firebase';
import { collection, addDoc, onSnapshot, query, deleteDoc, doc } from 'firebase/firestore';

interface EventCard {
  id: string;
  date: string;
  title: string;
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
  
  const [formData, setFormData] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
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
      users: formData.users,
      channel: formData.channel,
      project: formData.project
    };

    try {
      await addDoc(collection(db, 'events'), newEvent);
      setFormData(prev => ({ ...prev, title: '' }));
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handleDeleteEvent = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await deleteDoc(doc(db, 'events', id));
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
              <div 
                key={ev.id} 
                className="event-chip"
                style={{ backgroundColor: CHANNEL_COLORS[ev.channel] || '#111' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="event-chip-title">{ev.title}</span>
                  <button 
                    onClick={(e) => handleDeleteEvent(ev.id, e)}
                    style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
                    title="Eliminar"
                  >
                    <X size={12} strokeWidth={3} />
                  </button>
                </div>
                <div className="event-chip-meta">
                  <span className="channel-indicator" title={ev.project}>{ev.channel} / {ev.project.split('_')[1]}</span>
                  <div className="users-indicator">
                    {ev.users.map(u => (
                      <div key={u} className="user-dot" title={u}>{u.charAt(0)}</div>
                    ))}
                  </div>
                </div>
              </div>
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
          <span>Añadir</span>
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
            <Plus size={20} /> Añadir al Calendario
          </button>
        </form>
      </div>
    </div>
  );
};
