import React, { useState, useEffect } from 'react';
import { Folder, Play, FileText } from 'lucide-react';

interface Project {
  name: string;
  description: string;
  category: string;
  details: string;
  author: string;
}

interface Video {
  title: string;
  details: string;
}

type ActiveItem = {
  type: 'project' | 'video';
  name: string;
  description: string;
  details: string;
} | null;

function FolderTree({ 
  path, 
  onNavigate 
}: { 
  path: string[]; 
  onNavigate: (index: number) => void;
}) {
  return (
    <div style={{
      fontFamily: 'var(--font-heading)',
      fontSize: '0.95rem',
      lineHeight: '1.6',
      marginBottom: '2rem',
      color: '#000000',
      textAlign: 'left',
      display: 'block',
    }}>
      {path.map((name, index) => {
        const isLast = index === path.length - 1;
        
        const handleClick = () => {
          if (!isLast) {
            onNavigate(index);
          }
        };

        if (index === 0) {
          return (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <div 
                onClick={handleClick} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem', 
                  cursor: isLast ? 'default' : 'pointer',
                  textDecoration: isLast ? 'none' : 'underline'
                }}
                className={isLast ? '' : 'tree-clickable'}
              >
                <Folder size={16} style={{ color: '#000000' }} />
                <span style={{ fontWeight: isLast ? 700 : 400 }}>{name}</span>
              </div>
            </div>
          );
        }
        
        let prefix = '';
        for (let i = 0; i < index; i++) {
          if (i === index - 1) {
            prefix += '└── ';
          } else {
            prefix += '│   ';
          }
        }
        
        return (
          <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', whiteSpace: 'pre', marginBottom: '0.25rem' }}>
            <span style={{ color: '#888888', fontWeight: 'normal' }}>{prefix}</span>
            <div 
              onClick={handleClick} 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem', 
                cursor: isLast ? 'default' : 'pointer',
                textDecoration: isLast ? 'none' : 'underline'
              }}
              className={isLast ? '' : 'tree-clickable'}
            >
              <Folder size={16} style={{ color: '#000000' }} />
              <span style={{ fontWeight: isLast ? 700 : 400 }}>{name}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function App() {
  const [activeItem, setActiveItem] = useState<ActiveItem>(null);
  const [pendingItem, setPendingItem] = useState<ActiveItem>(null);
  const [isPadlockActive, setIsPadlockActive] = useState<boolean>(false);
  const [enteredCode, setEnteredCode] = useState<string>('');
  const [codeError, setCodeError] = useState<boolean>(false);
  const [codeSuccess, setCodeSuccess] = useState<boolean>(false);
  const [activeSubPage, setActiveSubPage] = useState<{ name: string; details: string; parentName: string } | null>(null);
  const [activeSubSubPage, setActiveSubSubPage] = useState<{ name: string; parentName: string } | null>(null);
  const [isExample1Revealed, setIsExample1Revealed] = useState<boolean>(false);
  const [isExample2Revealed, setIsExample2Revealed] = useState<boolean>(false);
  const [isExample3Revealed, setIsExample3Revealed] = useState<boolean>(false);

  useEffect(() => {
    setIsExample1Revealed(false);
    setIsExample2Revealed(false);
    setIsExample3Revealed(false);
  }, [activeSubSubPage, activeSubPage, activeItem]);

  const handleNavigate = (depth: number) => {
    if (depth === 0) {
      setActiveSubSubPage(null);
      setActiveSubPage(null);
      setActiveItem(null);
    } else if (depth === 1) {
      setActiveSubSubPage(null);
      setActiveSubPage(null);
    } else if (depth === 2) {
      setActiveSubSubPage(null);
    }
  };

  const projects: Project[] = [
    { name: 'BUNKER', description: 'Sistema de almacenamiento seguro y gestión de recursos.', category: 'Infraestructura', details: 'El protocolo BUNKER centraliza toda la infraestructura de copias de seguridad de la red UNK. Cuenta con redundancia triple e inmunidad electromagnética.', author: 'UNK' },
    { name: 'SEEDTV', description: 'Plataforma de streaming y distribución de contenidos audiovisuales.', category: 'Media', details: 'Servidor de media activo. SEEDTV aloja las retransmisiones directas y el repositorio máster de contenidos para los socios del consorcio.', author: 'SEED' },
    { name: 'FURBOLÍSTICO', description: 'Portal y comunidad interactiva para el análisis de fútbol.', category: 'Deportes', details: 'Algoritmos predictivos listos. FURBOLÍSTICO realiza minería de datos avanzada sobre partidos, jugadores y rendimiento deportivo para generar informes analíticos.', author: 'UNK' },
    { name: 'SHOW', description: 'Show y eventos en vivo.', category: 'Entretenimiento', details: 'Planificación de la gira en desarrollo. Estructura de costes, contratos con recintos y logística integrada para los shows en vivo.', author: 'UNK' },
    { name: 'SIDETALK', description: 'Canal de entrevistas callejeras y cultura urbana.', category: 'Media', details: 'Formato dinámico de entrevistas rápidas a pie de calle sobre actualidad y cultura pop.', author: 'UNK' }
  ];

  const videos: Video[] = [
    { title: 'El prostíbulo 100 montaditos', details: 'Ficha técnica de producción: 1 cámara principal, 1 micrófono de corbata. Grabación secreta autorizada. Estado de edición: Terminado y subido.' },
    { title: 'Un día siendo esclavos', details: 'Ficha técnica de producción: Experimento sociológico extremo. Grabación multicámara en localización exterior. Estado de edición: Terminado y subido.' },
    { title: 'Comprobador de IA', details: 'Análisis de rendimiento de modelos de lenguaje e inteligencias artificiales generativas de última generación aplicada a flujos de trabajo.' },
    { title: 'Un día trabajando en el Top Manta', details: 'Investigación periodística a pie de calle sobre el mercado de falsificaciones y distribución informal urbana. Audio directo.' }
  ];

  // Listen to physical keyboard events when padlock is active
  useEffect(() => {
    if (!isPadlockActive || codeSuccess || codeError) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') {
        handleKeyPress(e.key);
      } else if (e.key === 'Backspace') {
        handleBackspace();
      } else if (e.key === 'Escape') {
        setIsPadlockActive(false);
        setPendingItem(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPadlockActive, enteredCode, codeError, codeSuccess, pendingItem]);

  const handleFolderClick = (e: React.MouseEvent, project: Project) => {
    e.preventDefault();
    const item: ActiveItem = {
      type: 'project',
      name: project.name,
      description: project.description,
      details: project.details
    };
    setPendingItem(item);
    setIsPadlockActive(true);
    setEnteredCode('');
  };

  const handleVideoClick = (e: React.MouseEvent, video: Video) => {
    e.preventDefault();
    const item: ActiveItem = {
      type: 'video',
      name: video.title,
      description: video.title,
      details: video.details
    };
    setPendingItem(item);
    setIsPadlockActive(true);
    setEnteredCode('');
  };

  const handleKeyPress = (num: string) => {
    if (enteredCode.length < 4 && !codeError && !codeSuccess) {
      const newCode = enteredCode + num;
      setEnteredCode(newCode);

      if (newCode.length === 4) {
        if (newCode === '0000') {
          setCodeSuccess(true);
          setTimeout(() => {
            setIsPadlockActive(false);
            setActiveItem(pendingItem);
            setPendingItem(null);
            setEnteredCode('');
            setCodeSuccess(false);
          }, 600);
        } else {
          setCodeError(true);
          setTimeout(() => {
            setEnteredCode('');
            setCodeError(false);
          }, 800);
        }
      }
    }
  };

  const handleClear = () => {
    if (!codeSuccess) setEnteredCode('');
  };

  const handleBackspace = () => {
    if (!codeSuccess) setEnteredCode((prev) => prev.slice(0, -1));
  };

  // Render padlock screen if active
  if (isPadlockActive) {
    return (
      <div className="padlock-overlay">
        <div className={`padlock-container ${codeError ? 'shake' : ''}`}>
          <div className="padlock-display">
            {[0, 1, 2, 3].map((index) => (
              <div 
                key={index} 
                className={`padlock-dot ${enteredCode.length > index ? 'filled' : ''} ${codeError ? 'error' : ''} ${codeSuccess ? 'success' : ''}`}
              >
                {enteredCode.length > index ? '*' : ''}
              </div>
            ))}
          </div>

          <div className="padlock-grid">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
              <button 
                key={num} 
                className="padlock-btn" 
                onClick={() => handleKeyPress(num)}
              >
                {num}
              </button>
            ))}
            <button className="padlock-btn action-btn" onClick={handleClear}>C</button>
            <button className="padlock-btn" onClick={() => handleKeyPress('0')}>0</button>
            <button className="padlock-btn action-btn" onClick={handleBackspace}>⌫</button>
          </div>

          <button 
            className="back-btn" 
            style={{ width: '100%', fontSize: '0.8rem', border: 'none', background: 'transparent' }} 
            onClick={() => {
              setIsPadlockActive(false);
              setPendingItem(null);
            }}
          >
            [ Cancelar ]
          </button>
        </div>
      </div>
    );
  }

  // Render sub-subpage (bypasses padlock)
  if (activeSubSubPage) {
    const parentType = activeItem?.type === 'video' ? 'VÍDEOS' : 'PROYECTOS';
    return (
      <div className="custom-page-container">
        <header className="custom-page-header">
          <h1 className="logo-unk" style={{ fontSize: '3rem' }}>/UNK/</h1>
        </header>
        
        {activeSubSubPage.name === 'Eneryeti' ? (
          <main className="custom-page-content" style={{ border: 'none', background: 'transparent', padding: '2rem 0', textAlign: 'left' }}>
            <FolderTree path={[parentType, activeItem!.name, activeSubPage!.name, activeSubSubPage.name]} onNavigate={handleNavigate} />
            
            <hr style={{ border: 'none', borderTop: '1px solid #cccccc', margin: '1.5rem 0' }} />
            
            <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem', textTransform: 'uppercase' }}>
              Características
            </div>
            
            <hr style={{ border: 'none', borderTop: '1px solid #cccccc', margin: '1.5rem 0' }} />
            
            <ul style={{ paddingLeft: '1.5rem', margin: '0 0 2.5rem 0', listStyleType: 'square', lineHeight: '1.8', color: '#000000' }}>
              <li>Tienen un formulario abierto para pedir colaboraciones.</li>
              <li>Muy relacionados con el deporte, patrocinan a la selección.</li>
              <li>Eslogan: Ladrones de energía.</li>
              <li>Tras una simple colaboración en la que nos mandan producto, podríamos proponer una campaña de marketing más trabajada que le dé una vuelta de tuerca a su eslogan.</li>
            </ul>
          </main>
        ) : activeSubSubPage.name === 'Simyo' ? (
          <main className="custom-page-content" style={{ border: 'none', background: 'transparent', padding: '2rem 0', textAlign: 'left' }}>
            <FolderTree path={[parentType, activeItem!.name, activeSubPage!.name, activeSubSubPage.name]} onNavigate={handleNavigate} />
            
            <hr style={{ border: 'none', borderTop: '1px solid #cccccc', margin: '1.5rem 0' }} />
            
            <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem', textTransform: 'uppercase' }}>
              Características
            </div>
            
            <hr style={{ border: 'none', borderTop: '1px solid #cccccc', margin: '1.5rem 0' }} />
            
            <ul style={{ paddingLeft: '1.5rem', margin: '0 0 2.5rem 0', listStyleType: 'square', lineHeight: '1.8', color: '#000000' }}>
              <li>Promos muy enfocadas a 'En Simyo puedes hacer lo que te da la gana'.</li>
              <li>Tienen a content creators en nómina bochornosos.</li>
              <li>Últimamente están haciendo una publicidad agresiva para competir con Digi.</li>
            </ul>
          </main>
        ) : activeSubSubPage.name === 'Adivina el artista por el outfit' ? (
          <main className="custom-page-content" style={{ border: 'none', background: 'transparent', padding: '2rem 0', textAlign: 'left' }}>
            <FolderTree path={[parentType, activeItem!.name, activeSubPage!.name, activeSubSubPage.name]} onNavigate={handleNavigate} />
            
            <hr style={{ border: 'none', borderTop: '1px solid #cccccc', margin: '1.5rem 0' }} />
            
            <div style={{ color: '#000000', lineHeight: '1.6' }}>
              <p style={{ fontStyle: 'italic' }}>Esta carpeta está vacía.</p>
            </div>
          </main>
        ) : (
          <main className="custom-page-content" style={{ border: 'none', background: 'transparent', padding: '2rem 0', textAlign: 'left' }}>
            <FolderTree path={[parentType, activeItem!.name, activeSubPage!.name, activeSubSubPage.name]} onNavigate={handleNavigate} />
            
            <hr style={{ border: 'none', borderTop: '1px solid #cccccc', margin: '1.5rem 0' }} />
            
            <div style={{ color: '#000000', lineHeight: '1.6' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem' }}>
                Vídeo de referencia:
              </div>
              
              <a 
                href="https://www.tiktok.com/@dumblitstudios/video/7605739514329369870" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="tiktok-link"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1.5rem',
                  border: '2px solid #000000',
                  color: '#000000',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1rem',
                  fontWeight: 700,
                  backgroundColor: '#ffffff',
                  transition: 'all 0.2s ease-in-out',
                  cursor: 'pointer',
                  marginBottom: '2rem'
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23.86.03 1.73-.02 2.6.02.01 1.37-.02 2.73.01 4.1-.73-.06-1.46-.24-2.14-.52-.61-.26-1.16-.65-1.61-1.14-.04 2.61.02 5.23-.03 7.84-.04.99-.27 2-.72 2.91-.56.98-1.45 1.75-2.5 2.18-.89.37-1.85.53-2.8.48-1.57-.02-3.13-.6-4.27-1.68-1.12-1.07-1.78-2.61-1.79-4.17-.03-1.62.63-3.23 1.79-4.32 1.1-1.05 2.62-1.63 4.14-1.62.03 1.45-.02 2.9.02 4.35-.61-.05-1.24.11-1.75.46-.54.38-.87.99-.91 1.65-.05.81.33 1.63 1.01 2.06.66.42 1.51.48 2.22.15.65-.28 1.13-.89 1.25-1.58.07-.63.02-1.27.02-1.91 0-3.66.01-7.32.02-10.98.01-.17.02-.33.02-.5z" />
                </svg>
                <span>Ver en TikTok</span>
              </a>

              <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>
                Ejemplos:
              </div>

              <div style={{ fontSize: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <span>Lorena Zamora es</span>
                  <span 
                    onClick={() => setIsExample1Revealed(!isExample1Revealed)}
                    className={`spoiler-text ${isExample1Revealed ? 'revealed' : ''}`}
                  >
                    Lorna
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <span>Carlos Bruñas Zamorín es</span>
                  <span 
                    onClick={() => setIsExample2Revealed(!isExample2Revealed)}
                    className={`spoiler-text ${isExample2Revealed ? 'revealed' : ''}`}
                  >
                    Cruz Cafuné
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <span>Adrián Pedrosa Hidalgo es</span>
                  <span 
                    onClick={() => setIsExample3Revealed(!isExample3Revealed)}
                    className={`spoiler-text ${isExample3Revealed ? 'revealed' : ''}`}
                  >
                    Prok
                  </span>
                </div>
              </div>
            </div>
          </main>
        )}
        
        <button className="back-btn" onClick={() => setActiveSubSubPage(null)}>
          [ Volver ]
        </button>
      </div>
    );
  }

  // Render subpage (bypasses padlock)
  if (activeSubPage) {
    const parentType = activeItem?.type === 'video' ? 'VÍDEOS' : 'PROYECTOS';
    return (
      <div className="custom-page-container">
        <header className="custom-page-header">
          <h1 className="logo-unk" style={{ fontSize: '3rem' }}>/UNK/</h1>
        </header>
        
        <main className="custom-page-content" style={{ border: 'none', background: 'transparent', padding: '2rem 0', textAlign: 'left' }}>
          <FolderTree path={[parentType, activeItem!.name, activeSubPage.name]} onNavigate={handleNavigate} />
          
          <hr style={{ border: 'none', borderTop: '1px solid #cccccc', margin: '1.5rem 0' }} />
          
          {activeSubPage.parentName === 'BUNKER' && activeSubPage.name === 'Descripción' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', color: '#000000', margin: '0 0 2.5rem 0', maxWidth: 'none', lineHeight: '1.6' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Lugar desde el que UNK gestiona todo.
              </div>
              <p className="custom-page-text" style={{ maxWidth: 'none', margin: 0 }}>
                Estética de bunker porque somos las personas que están detrás de una revista que genera polémica y controversia y estamos protegiéndonos y resguardándonos en un sitio seguro. Una pistola dentro de una caja de cristal, luces de emergencia, latas de sopa, NukeColas, un tablero de corcho con fotos unidas por hilos rojos, etc.
              </p>
              <p className="custom-page-text" style={{ maxWidth: 'none', margin: 0 }}>
                Estética de sótano acogedor tipo That 70s Show con cojines, un puff, humo, neverita, un tablero con sus fichas tiradas por la mesa, etc.
              </p>
            </div>
          ) : activeSubPage.parentName === 'BUNKER' && activeSubPage.name === 'Sponsors' ? (
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginTop: '2rem' }}>
              <div 
                className="folder-card" 
                style={{ width: '220px', padding: '1.5rem 1rem' }}
                onClick={() => setActiveSubSubPage({
                  name: 'Eneryeti',
                  parentName: 'Sponsors'
                })}
              >
                <div className="folder-icon-wrapper" style={{ marginBottom: '0.75rem' }}>
                  <Folder size={48} strokeWidth={1.5} />
                </div>
                <span className="folder-name" style={{ fontSize: '1rem', fontWeight: 700 }}>Eneryeti</span>
              </div>
              
              <div 
                className="folder-card" 
                style={{ width: '220px', padding: '1.5rem 1rem' }}
                onClick={() => setActiveSubSubPage({
                  name: 'Simyo',
                  parentName: 'Sponsors'
                })}
              >
                <div className="folder-icon-wrapper" style={{ marginBottom: '0.75rem' }}>
                  <Folder size={48} strokeWidth={1.5} />
                </div>
                <span className="folder-name" style={{ fontSize: '1rem', fontWeight: 700 }}>Simyo</span>
              </div>
            </div>
          ) : activeSubPage.parentName === 'BUNKER' && activeSubPage.name === 'Formatos' ? (
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginTop: '2rem' }}>
              <div 
                className="folder-card" 
                style={{ width: '220px', padding: '1.5rem 1rem' }}
                onClick={() => setActiveSubSubPage({
                  name: 'Adivina el artista por el outfit',
                  parentName: 'Formatos'
                })}
              >
                <div className="folder-icon-wrapper" style={{ marginBottom: '0.75rem' }}>
                  <Folder size={48} strokeWidth={1.5} />
                </div>
                <span className="folder-name" style={{ fontSize: '0.9rem', fontWeight: 700, textAlign: 'center', lineHeight: '1.3' }}>
                  Adivina el artista por el outfit
                </span>
              </div>
              
              <div 
                className="folder-card" 
                style={{ width: '220px', padding: '1.5rem 1rem' }}
                onClick={() => setActiveSubSubPage({
                  name: 'Adivina el artista por su nombre real',
                  parentName: 'Formatos'
                })}
              >
                <div className="folder-icon-wrapper" style={{ marginBottom: '0.75rem' }}>
                  <Folder size={48} strokeWidth={1.5} />
                </div>
                <span className="folder-name" style={{ fontSize: '0.9rem', fontWeight: 700, textAlign: 'center', lineHeight: '1.3' }}>
                  Adivina el artista por su nombre real
                </span>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '2rem' }}>
              <div 
                className="folder-card" 
                style={{ width: '220px', padding: '1.5rem 1rem' }}
                onClick={() => alert('Accediendo al Menú de Producción...')}
              >
                <div className="folder-icon-wrapper" style={{ marginBottom: '0.75rem' }}>
                  <FileText size={48} strokeWidth={1.5} />
                </div>
                <span className="folder-name" style={{ fontSize: '1rem', fontWeight: 700 }}>Menú</span>
              </div>
            </div>
          )}
        </main>
        
        <button className="back-btn" onClick={() => setActiveSubPage(null)}>
          [ Volver ]
        </button>
      </div>
    );
  }

  // Render individual custom page
  if (activeItem) {
    const isSpecialVideo = activeItem.type === 'video' && activeItem.name === 'El prostíbulo 100 montaditos';
    const parentType = activeItem.type === 'video' ? 'VÍDEOS' : 'PROYECTOS';

    return (
      <div className="custom-page-container">
        <header className="custom-page-header">
          <h1 className="logo-unk" style={{ fontSize: '3rem' }}>/UNK/</h1>
        </header>
        
        {isSpecialVideo ? (
          <main className="custom-page-content" style={{ border: 'none', background: 'transparent', padding: '2rem 0', textAlign: 'left' }}>
            <FolderTree path={[parentType, activeItem.name]} onNavigate={handleNavigate} />
            <hr style={{ border: 'none', borderTop: '1px solid #cccccc', margin: '1.5rem 0' }} />
            
            <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem', textTransform: 'uppercase' }}>
              Reportaje
            </div>
            
            <hr style={{ border: 'none', borderTop: '1px solid #cccccc', margin: '1.5rem 0' }} />
            
            <p className="custom-page-text" style={{ fontStyle: 'italic', color: '#000000', margin: '0 0 2.5rem 0', maxWidth: 'none' }}>
              Sinopsis: Un prostíbulo decide mostrar sus productos con un formato similar al del menú del 100 montaditos.
            </p>
            
            <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '2rem' }}>
              <div 
                className="folder-card" 
                style={{ width: '220px', padding: '1.5rem 1rem' }}
                onClick={() => setActiveSubPage({
                  name: 'Producción',
                  details: 'Detalles del plan de producción: 1 cámara principal, 1 micrófono de corbata. Grabación secreta autorizada. Estado de edición: Terminado y subido.',
                  parentName: activeItem.name
                })}
              >
                <div className="folder-icon-wrapper" style={{ marginBottom: '0.75rem' }}>
                  <Folder size={48} strokeWidth={1.5} />
                </div>
                <span className="folder-name" style={{ fontSize: '1rem', fontWeight: 700 }}>Producción</span>
              </div>
            </div>
          </main>
        ) : activeItem.type === 'project' && activeItem.name === 'BUNKER' ? (
          <main className="custom-page-content" style={{ border: 'none', background: 'transparent', padding: '2rem 0', textAlign: 'left' }}>
            <FolderTree path={[parentType, activeItem.name]} onNavigate={handleNavigate} />
            <hr style={{ border: 'none', borderTop: '1px solid #cccccc', margin: '1.5rem 0' }} />
            
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginTop: '2rem' }}>
              <div 
                className="folder-card" 
                style={{ width: '220px', padding: '1.5rem 1rem' }}
                onClick={() => setActiveSubPage({
                  name: 'Descripción',
                  details: '',
                  parentName: activeItem.name
                })}
              >
                <div className="folder-icon-wrapper" style={{ marginBottom: '0.75rem' }}>
                  <Folder size={48} strokeWidth={1.5} />
                </div>
                <span className="folder-name" style={{ fontSize: '1rem', fontWeight: 700 }}>Descripción</span>
              </div>
              
              <div 
                className="folder-card" 
                style={{ width: '220px', padding: '1.5rem 1rem' }}
                onClick={() => setActiveSubPage({
                  name: 'Sponsors',
                  details: '',
                  parentName: activeItem.name
                })}
              >
                <div className="folder-icon-wrapper" style={{ marginBottom: '0.75rem' }}>
                  <Folder size={48} strokeWidth={1.5} />
                </div>
                <span className="folder-name" style={{ fontSize: '1rem', fontWeight: 700 }}>Sponsors</span>
              </div>

              <div 
                className="folder-card" 
                style={{ width: '220px', padding: '1.5rem 1rem' }}
                onClick={() => setActiveSubPage({
                  name: 'Formatos',
                  details: '',
                  parentName: activeItem.name
                })}
              >
                <div className="folder-icon-wrapper" style={{ marginBottom: '0.75rem' }}>
                  <Folder size={48} strokeWidth={1.5} />
                </div>
                <span className="folder-name" style={{ fontSize: '1rem', fontWeight: 700 }}>Formatos</span>
              </div>
            </div>
          </main>
        ) : (
          <main className="custom-page-content" style={{ border: 'none', background: 'transparent', padding: '2rem 0', textAlign: 'left' }}>
            <FolderTree path={[parentType, activeItem.name]} onNavigate={handleNavigate} />
            <hr style={{ border: 'none', borderTop: '1px solid #cccccc', margin: '1.5rem 0' }} />
            <p className="custom-page-text" style={{ maxWidth: 'none', margin: 0 }}>
              {activeItem.details}
            </p>
          </main>
        )}
        
        <button className="back-btn" onClick={() => setActiveItem(null)}>
          [ Volver ]
        </button>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <h1 className="logo-unk">/UNK/</h1>
      </header>

      {/* Projects Section */}
      <section className="section">
        <h2 className="section-title">PROYECTOS</h2>
        <div className="folders-grid">
          {projects.map((project) => (
            <div
              key={project.name}
              className="folder-card"
              onClick={(e) => handleFolderClick(e, project)}
            >
              <div className={`project-badge ${project.author.toLowerCase()}`}>
                <span>{project.author}</span>
              </div>
              <div className="folder-icon-wrapper">
                <Folder size={64} strokeWidth={1.5} />
              </div>
              <span className="folder-name">{project.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Videos Section */}
      <section className="section">
        <h2 className="section-title">VÍDEOS</h2>
        <div className="videos-grid">
          {videos.map((video) => (
            <div
              key={video.title}
              className="video-card"
              onClick={(e) => handleVideoClick(e, video)}
            >
              <div className="thumbnail-container">
                <div className="thumbnail-overlay"></div>
                <div className="play-button">
                  <Play size={28} fill="currentColor" />
                </div>
              </div>
              <div className="video-info">
                <span className="video-title">{video.title}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-text">
        <p>© UNK</p>
      </footer>
    </div>
  );
}
