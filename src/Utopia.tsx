import React, { useState } from 'react';
import './Utopia.css';
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, User, Tv } from 'lucide-react';

interface EventCard {
  id: string;
  date: string;
  title: string;
  users: string[];
  channel: string;
}

const USERS = ['Dario', 'Kai', 'Omar', 'Tresillo'];
const CHANNELS = ['SEED', 'UNK', 'YEP'];

export const Utopia: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<EventCard[]>([]);
  
  const [formData, setFormData] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    users: [] as string[],
    channel: ''
  });

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
    setFormData(prev => ({ ...prev, channel: prev.channel === c ? '' : c }));
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.date || !formData.channel) return;

    const newEvent: EventCard = {
      id: Math.random().toString(36).substr(2, 9),
      title: formData.title,
      date: formData.date,
      users: formData.users,
      channel: formData.channel
    };

    setEvents(prev => [...prev, newEvent]);
    setFormData(prev => ({ ...prev, title: '' }));
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
              <div key={ev.id} className="event-chip">
                <span className="event-chip-title">{ev.title}</span>
                <div className="event-chip-meta">
                  <span className="channel-indicator">{ev.channel}</span>
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
          <span>Añadir Proyecto</span>
        </div>
        
        <form onSubmit={handleAddEvent} className="form-grid">
          <div className="form-group">
            <label className="form-label">Título del evento</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="Ej: Rodaje Clip Principal" 
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

          <div className="form-group">
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

          <div className="form-group">
            <label className="form-label">Canal / Proyecto</label>
            <div className="pills-container">
              {CHANNELS.map(c => (
                <button 
                  key={c} 
                  type="button"
                  className={`pill-btn ${formData.channel === c ? 'active' : ''}`}
                  onClick={() => setChannel(c)}
                >
                  <Tv size={16} /> {c}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={!formData.title || !formData.channel}>
            <Plus size={20} /> Añadir al Calendario
          </button>
        </form>
      </div>
    </div>
  );
};
