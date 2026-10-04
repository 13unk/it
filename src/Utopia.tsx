import React, { useState, useEffect, useRef } from 'react';
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
  creator?: string | null;
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
  const [activeTab, setActiveTab] = useState('Calendario');
  
  // Login states
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
  const [loginStep, setLoginStep] = useState<'NAME' | 'PIN'>('NAME');
  const [loginName, setLoginName] = useState('');
  const [loginInput, setLoginInput] = useState('');
  const [pin, setPin] = useState('');
  const [loginError, setLoginError] = useState('');
  
  // Loading states
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setIsAnimatingOut(true);
      setIsLoaded(true); // Animate calendar in simultaneously
      setTimeout(() => {
        setShowLoading(false); // Unmount after animation finishes
      }, 600); 
    }, 8000);
    return () => clearTimeout(t);
  }, []);

  // Modal states
  const [selectedEvent, setSelectedEvent] = useState<EventCard | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: '', date: '', description: '', users: [] as string[], creator: null as string | null, channel: '', project: ''
  });
  
  // Add New form states
  const [formData, setFormData] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
    users: loggedInUser ? [loggedInUser] : [],
    creator: loggedInUser,
    channel: '',
    project: ''
  });

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      creator: loggedInUser,
      users: loggedInUser ? [loggedInUser] : []
    }));
  }, [loggedInUser]);

  // Long-press states
  const [holdTimer, setHoldTimer] = useState<NodeJS.Timeout | null>(null);
  const [holdingUser, setHoldingUser] = useState<string | null>(null);
  const longPressTriggered = useRef(false);

  useEffect(() => {
    const q = query(collection(db, 'events'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const eventsData: EventCard[] = [];
      querySnapshot.forEach((doc) => {
        eventsData.push({ id: doc.id, ...doc.data() } as EventCard);
      });
      setEvents(eventsData);
      
      if (selectedEvent) {
        const updated = eventsData.find(e => e.id === selectedEvent.id);
        if (updated) setSelectedEvent(updated);
        else closeModal(); 
      }
    }, (error) => {
      console.error("Snapshot error:", error);
      if (error.code === 'permission-denied') {
        alert("Atención: No hay permisos para leer/escribir en la base de datos. Asegúrate de poner Firestore en 'Modo de prueba' (Test mode).");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // Long-press Handlers
  const handlePointerDown = (u: string, isEditMode: boolean) => {
    longPressTriggered.current = false;
    setHoldingUser(u);
    const timer = setTimeout(() => {
      longPressTriggered.current = true;
      if (isEditMode) {
        setEditData(prev => ({
          ...prev,
          creator: u,
          users: prev.users.includes(u) ? prev.users : [...prev.users, u]
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          creator: u,
          users: prev.users.includes(u) ? prev.users : [...prev.users, u]
        }));
      }
      setHoldingUser(null);
    }, 1000);
    setHoldTimer(timer);
  };

  const handlePointerUp = () => {
    if (holdTimer) clearTimeout(holdTimer);
    setHoldTimer(null);
    setHoldingUser(null);
  };

  // Handlers for Add Form
  const toggleFormUser = (u: string) => {
    if (longPressTriggered.current) return;
    setFormData(prev => {
      const isRemoving = prev.users.includes(u);
      return { 
        ...prev, 
        users: isRemoving ? prev.users.filter(user => user !== u) : [...prev.users, u],
        creator: isRemoving && prev.creator === u ? null : prev.creator
      };
    });
  };

  const setFormChannel = (c: string) => {
    setFormData(prev => ({ ...prev, channel: prev.channel === c ? '' : c, project: '' }));
  };

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.date || !formData.channel || !formData.project) return;
    try {
      await addDoc(collection(db, 'events'), formData);
      setFormData({ title: '', date: new Date().toISOString().split('T')[0], description: '', users: loggedInUser ? [loggedInUser] : [], creator: loggedInUser, channel: '', project: '' });
    } catch (error) {
      console.error("Error saving document: ", error);
    }
  };

  // Handlers for Edit Form
  const startEditEvent = () => {
    if (!selectedEvent) return;
    setEditData({
      title: selectedEvent.title,
      date: selectedEvent.date,
      description: selectedEvent.description || '',
      users: selectedEvent.users,
      creator: selectedEvent.creator || null,
      channel: selectedEvent.channel,
      project: selectedEvent.project
    });
    setIsEditing(true);
  };

  const saveEditEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent || !editData.title || !editData.channel || !editData.project) return;
    try {
      await updateDoc(doc(db, 'events', selectedEvent.id), editData);
      setSelectedEvent({ ...selectedEvent, ...editData });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const toggleEditUser = (u: string) => {
    if (longPressTriggered.current) return;
    setEditData(prev => {
      const isRemoving = prev.users.includes(u);
      return { 
        ...prev, 
        users: isRemoving ? prev.users.filter(user => user !== u) : [...prev.users, u],
        creator: isRemoving && prev.creator === u ? null : prev.creator
      };
    });
  };

  const setEditChannel = (c: string) => {
    setEditData(prev => ({ ...prev, channel: prev.channel === c ? '' : c, project: '' }));
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setIsEditing(false);
  };

  const handleDeleteEvent = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'events', id));
      closeModal();
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
                onClick={() => { setSelectedEvent(ev); setIsEditing(false); }}
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

  const renderUsersList = (users: string[], creator?: string | null, readonly = false) => {
    const sortedUsers = [...users].sort((a, b) => {
      if (a === creator) return -1;
      if (b === creator) return 1;
      return 0;
    });

    return sortedUsers.map(u => (
      <span 
        key={u} 
        className={`pill-btn active ${u === creator ? 'pill-creator' : ''}`} 
        style={{ cursor: readonly ? 'default' : 'inherit', padding: '0.4rem 1rem' }}
      >
        <User size={14} /> {u} {u === creator && <span style={{fontSize: '0.7rem', marginLeft: '4px'}}>★</span>}
      </span>
    ));
  };

  const handleNameSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const nameStr = loginInput.trim().toLowerCase();
    const foundUser = USERS.find(u => u.toLowerCase() === nameStr);
    if (foundUser) {
      setLoginName(foundUser);
      setLoginStep('PIN');
      setPin('');
      setLoginError('');
    } else {
      setLoginError('Usuario no encontrado');
    }
  };

  const handlePinPress = (digit: string) => {
    if (pin.length < 4) {
      const newPin = pin + digit;
      setPin(newPin);
      if (newPin.length === 4) {
        validatePin(newPin);
      }
    }
  };

  const handlePinDelete = () => {
    setPin(pin.slice(0, -1));
    setLoginError('');
  };

  const validatePin = (currentPin: string) => {
    const isTresillo = loginName.toLowerCase() === 'tresillo';
    if (isTresillo && currentPin === '1990') {
      setLoggedInUser(loginName);
      setLoginStep('NAME');
      setLoginInput('');
      setPin('');
    } else if (!isTresillo && currentPin === '0000') {
      setLoggedInUser(loginName);
      setLoginStep('NAME');
      setLoginInput('');
      setPin('');
    } else {
      setLoginError('PIN incorrecto');
      setTimeout(() => setPin(''), 1000);
    }
  };

  return (
    <div className="utopia-wrapper">
      {showLoading && (
        <div className={`utopia-loading-screen ${isAnimatingOut ? 'animating-out' : ''}`}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
            <div className="loading-text-inc">inc. <sup className="beta-sup">BETA</sup></div>
            <div className="loading-bubble">Herramienta para gestionar proyectos conjuntos.</div>
          </div>
        </div>
      )}
      <div className={`utopia-content-wrapper ${isLoaded ? 'loaded' : ''}`}>
        <div className="dashboard-layout">
          {/* Sidebar */}
          <div className="sidebar">
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 className="sidebar-logo" style={{ display: 'inline-block', position: 'relative', margin: 0 }}>
                inc.
                <span className="beta-sup" style={{ fontSize: '0.8rem', top: '0px', right: '-35px' }}>BETA</span>
              </h2>
            </div>
            <div className="sidebar-menu">
              {['Proyectos', 'Calendario', 'Usuarios'].map(tab => (
                <button
                  key={tab}
                  className={`sidebar-menu-item ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Login Section */}
            <div className="sidebar-login-container">
              {loggedInUser ? (
                <div className="logged-in-box">
                  <div className="logged-in-user">
                    <User size={18} />
                    <span>{loggedInUser}</span>
                  </div>
                  <button className="logout-btn" onClick={() => { setLoggedInUser(null); setLoginInput(''); setPin(''); setLoginStep('NAME'); }}>Cerrar sesión</button>
                </div>
              ) : (
                <div className="login-box">
                  {loginStep === 'NAME' ? (
                    <form onSubmit={handleNameSubmit} className="login-form">
                      <label className="login-label">Iniciar sesión</label>
                      <div className="login-input-row">
                        <input
                          type="text"
                          placeholder="Tu nombre..."
                          value={loginInput}
                          onChange={(e) => { setLoginInput(e.target.value); setLoginError(''); }}
                          className="login-input"
                        />
                        <button type="submit" className="login-submit-btn">
                          <ChevronRight size={18} />
                        </button>
                      </div>
                      {loginError && <div className="login-error">{loginError}</div>}
                    </form>
                  ) : (
                    <div className="pin-pad-container">
                      <div className="pin-pad-header">
                        <span className="pin-user">{loginName}</span>
                        <div className="pin-dots">
                          {[0,1,2,3].map(i => (
                            <div key={i} className={`pin-dot ${i < pin.length ? 'filled' : ''}`} />
                          ))}
                        </div>
                      </div>
                      <div className="lockpad-grid">
                        {[1,2,3,4,5,6,7,8,9].map(num => (
                          <button key={num} type="button" className="lockpad-btn" onClick={() => handlePinPress(num.toString())}>{num}</button>
                        ))}
                        <button type="button" className="lockpad-btn action" onClick={() => { setLoginStep('NAME'); setPin(''); setLoginError(''); }}>
                          <ChevronLeft size={18} />
                        </button>
                        <button type="button" className="lockpad-btn" onClick={() => handlePinPress('0')}>0</button>
                        <button type="button" className="lockpad-btn action" onClick={handlePinDelete}>
                          <X size={18} />
                        </button>
                      </div>
                      {loginError && <div className="login-error pin-error">{loginError}</div>}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* Main Content */}
          <div className="main-content">
            <div className="utopia-container" style={{ overflowX: 'hidden' }}>
              {activeTab !== 'Calendario' && (
                <div className="empty-state">
                  <h3>{activeTab}</h3>
                  <p>Esta secciÃ³n estÃ¡ vacÃ­a por el momento.</p>
                </div>
              )}
              {activeTab === 'Calendario' && (
                <>
                  <div className="calendar-card">
        {selectedEvent && (
          <div className="event-detail-overlay">
            <button className="event-detail-close" onClick={closeModal}>
              <X size={24} />
            </button>
            
            {isEditing ? (
              <form onSubmit={saveEditEvent} className="event-detail-content-stacked">
                <h2 style={{margin: 0, marginBottom: '0.5rem'}}>Editar Evento</h2>
                
                <div className="form-group">
                  <label className="form-label">Título</label>
                  <input type="text" className="form-input" value={editData.title} onChange={e => setEditData({...editData, title: e.target.value})} required />
                </div>

                <div className="form-group">
                  <label className="form-label">Fecha</label>
                  <input type="date" className="form-input" value={editData.date} onChange={e => setEditData({...editData, date: e.target.value})} required />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Descripción</label>
                  <textarea className="form-input" rows={2} value={editData.description} onChange={e => setEditData({...editData, description: e.target.value})} />
                </div>

                <div className="form-group">
                  <label className="form-label">Canal</label>
                  <div className="pills-container">
                    {CHANNELS.map(c => (
                      <button key={c} type="button" className={`pill-btn ${editData.channel === c ? 'active' : ''}`} onClick={() => setEditChannel(c)}>
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {editData.channel && (
                  <div className="form-group">
                    <label className="form-label">Proyecto</label>
                    <select className="form-input" value={editData.project} onChange={e => setEditData({...editData, project: e.target.value})} required>
                      <option value="">Selecciona...</option>
                      {PROJECTS_MAP[editData.channel].map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label">Equipo Involucrado</label>
                  <div className="pills-container">
                    {USERS.map(u => (
                      <button 
                        key={u} 
                        type="button" 
                        className={`pill-btn ${editData.users.includes(u) ? 'active' : ''} ${editData.creator === u ? 'pill-creator' : ''} ${holdingUser === u ? 'holding' : ''}`}
                        onPointerDown={() => handlePointerDown(u, true)}
                        onPointerUp={handlePointerUp}
                        onPointerLeave={handlePointerUp}
                        onContextMenu={(e) => e.preventDefault()}
                        onClick={() => toggleEditUser(u)}
                      >
                        <User size={14} /> {u} {editData.creator === u && <span style={{fontSize: '0.7rem', marginLeft: '4px'}}>★</span>}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="event-detail-actions" style={{paddingTop: '1rem'}}>
                  <button type="button" className="delete-btn" style={{background: '#eee', color: '#111'}} onClick={() => setIsEditing(false)}>
                    Cancelar
                  </button>
                  <button type="submit" className="edit-btn">
                    <Edit2 size={18} strokeWidth={3} /> Guardar
                  </button>
                </div>
              </form>
            ) : (
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
                    {renderUsersList(selectedEvent.users, selectedEvent.creator, true)}
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
          {['Lun', 'Mar', 'MiÃ©', 'Jue', 'Vie', 'SÃ¡b', 'Dom'].map(d => (
            <div key={d} className="calendar-day-header">{d}</div>
          ))}
          {renderCalendarCells()}
        </div>
      </div>

      <div className="tool-card">
        <div className="tool-header">
          <CalendarIcon size={24} />
          <span>Añadir evento</span>
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
                  onClick={() => setFormChannel(c)}
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
                  className={`pill-btn ${formData.users.includes(u) ? 'active' : ''} ${formData.creator === u ? 'pill-creator' : ''} ${holdingUser === u ? 'holding' : ''}`}
                  onPointerDown={() => handlePointerDown(u, false)}
                  onPointerUp={handlePointerUp}
                  onPointerLeave={handlePointerUp}
                  onContextMenu={(e) => e.preventDefault()}
                  onClick={() => toggleFormUser(u)}
                >
                  <User size={16} /> {u} {formData.creator === u && <span style={{fontSize: '0.7rem', marginLeft: '4px'}}>★</span>}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={!formData.title || !formData.channel || !formData.project}>
            <Plus size={20} /> Añadir al Calendario
          </button>
        </form>
      </div>
      </>
      )}
    </div>
    </div>
    </div>
    </div>
    </div>
  );
};
