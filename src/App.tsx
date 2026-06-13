import React, { useState, useEffect, useRef } from 'react';
import { Folder, Play, FileText, Gamepad2, Plus, Youtube } from 'lucide-react';

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

interface Album {
  title: string;
  artist: string;
}

const ALBUM_DATABASE: Record<string, Album[]> = {
  'A': [
    { title: 'Bien o Mal', artist: 'Trueno' },
    { title: 'Pegao en Youtube', artist: 'La Mafia del Amor' },
    { title: 'La Vida Es Una', artist: 'Myke Towers' },
    { title: 'Nadie Sabe Lo Que Va A Pasar Mañana', artist: 'Bad Bunny' },
    { title: 'OASIS', artist: 'Bad Bunny & J Balvin' }
  ],
  'B': [
    { title: 'Bien o Mal', artist: 'Trueno' },
    { title: 'Pegao en Youtube', artist: 'La Mafia del Amor' },
    { title: 'Nadie Sabe Lo Que Va A Pasar Mañana', artist: 'Bad Bunny' }
  ],
  'C': [],
  'D': [
    { title: 'La Vida Es Una', artist: 'Myke Towers' },
    { title: 'Nadie Sabe Lo Que Va A Pasar Mañana', artist: 'Bad Bunny' }
  ],
  'E': [
    { title: 'Bien o Mal', artist: 'Trueno' },
    { title: 'Pegao en Youtube', artist: 'La Mafia del Amor' },
    { title: 'La Vida Es Una', artist: 'Myke Towers' },
    { title: 'Nadie Sabe Lo Que Va A Pasar Mañana', artist: 'Bad Bunny' }
  ],
  'F': [],
  'G': [
    { title: 'El Pluggg 3 Ova 1', artist: 'Yung Beef' },
    { title: 'Pegao en Youtube', artist: 'La Mafia del Amor' },
    { title: 'Moonlight922', artist: 'Cruz Cafuné' }
  ],
  'H': [
    { title: 'Moonlight922', artist: 'Cruz Cafuné' }
  ],
  'I': [
    { title: 'Bien o Mal', artist: 'Trueno' },
    { title: 'Moonlight922', artist: 'Cruz Cafuné' },
    { title: 'La Vida Es Una', artist: 'Myke Towers' },
    { title: 'Nadie Sabe Lo Que Va A Pasar Mañana', artist: 'Bad Bunny' },
    { title: 'OASIS', artist: 'Bad Bunny & J Balvin' }
  ],
  'J': [],
  'K': [],
  'L': [
    { title: 'El Pluggg 3 Ova 1', artist: 'Yung Beef' },
    { title: 'Bien o Mal', artist: 'Trueno' },
    { title: 'Moonlight922', artist: 'Cruz Cafuné' },
    { title: 'La Vida Es Una', artist: 'Myke Towers' },
    { title: 'Nadie Sabe Lo Que Va A Pasar Mañana', artist: 'Bad Bunny' }
  ],
  'M': [
    { title: 'Bien o Mal', artist: 'Trueno' },
    { title: 'Moonlight922', artist: 'Cruz Cafuné' },
    { title: 'Nadie Sabe Lo Que Va A Pasar Mañana', artist: 'Bad Bunny' }
  ],
  'N': [
    { title: 'Bien o Mal', artist: 'Trueno' },
    { title: 'Pegao en Youtube', artist: 'La Mafia del Amor' },
    { title: 'Moonlight922', artist: 'Cruz Cafuné' },
    { title: 'La Vida Es Una', artist: 'Myke Towers' },
    { title: 'Nadie Sabe Lo Que Va A Pasar Mañana', artist: 'Bad Bunny' }
  ],
  'Ñ': [
    { title: 'Nadie Sabe Lo Que Va A Pasar Mañana', artist: 'Bad Bunny' }
  ],
  'O': [
    { title: 'Bien o Mal', artist: 'Trueno' },
    { title: 'Pegao en Youtube', artist: 'La Mafia del Amor' },
    { title: 'Moonlight922', artist: 'Cruz Cafuné' },
    { title: 'Nadie Sabe Lo Que Va A Pasar Mañana', artist: 'Bad Bunny' },
    { title: 'OASIS', artist: 'Bad Bunny & J Balvin' }
  ],
  'P': [
    { title: 'El Pluggg 3 Ova 1', artist: 'Yung Beef' },
    { title: 'Pegao en Youtube', artist: 'La Mafia del Amor' },
    { title: 'Nadie Sabe Lo Que Va A Pasar Mañana', artist: 'Bad Bunny' }
  ],
  'Q': [
    { title: 'Nadie Sabe Lo Que Va A Pasar Mañana', artist: 'Bad Bunny' }
  ],
  'R': [
    { title: 'Nadie Sabe Lo Que Va A Pasar Mañana', artist: 'Bad Bunny' }
  ],
  'S': [
    { title: 'La Vida Es Una', artist: 'Myke Towers' },
    { title: 'Nadie Sabe Lo Que Va A Pasar Mañana', artist: 'Bad Bunny' },
    { title: 'OASIS', artist: 'Bad Bunny & J Balvin' }
  ],
  'T': [
    { title: 'Pegao en Youtube', artist: 'La Mafia del Amor' },
    { title: 'Moonlight922', artist: 'Cruz Cafuné' }
  ],
  'U': [
    { title: 'El Pluggg 3 Ova 1', artist: 'Yung Beef' },
    { title: 'Pegao en Youtube', artist: 'La Mafia del Amor' },
    { title: 'La Vida Es Una', artist: 'Myke Towers' },
    { title: 'Nadie Sabe Lo Que Va A Pasar Mañana', artist: 'Bad Bunny' }
  ],
  'V': [
    { title: 'La Vida Es Una', artist: 'Myke Towers' },
    { title: 'Nadie Sabe Lo Que Va A Pasar Mañana', artist: 'Bad Bunny' }
  ],
  'W': [],
  'X': [],
  'Y': [
    { title: 'Pegao en Youtube', artist: 'La Mafia del Amor' }
  ],
  'Z': [],
  '0': [],
  '1': [],
  '2': [
    { title: 'Moonlight922', artist: 'Cruz Cafuné' }
  ],
  '3': [
    { title: 'El Pluggg 3 Ova 1', artist: 'Yung Beef' }
  ],
  '4': [],
  '5': [],
  '6': [],
  '7': [],
  '8': [],
  '9': [
    { title: 'Moonlight922', artist: 'Cruz Cafuné' }
  ]
};

function AlbumCover({ title, artist }: { title: string; artist: string }) {
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    
    const fetchCover = async () => {
      try {
        const cleanArtist = artist.split(/\s*(?:&|and|y|\/|,)\s*/i)[0].trim();
        const query = encodeURIComponent(`release:"${title}" AND artist:"${cleanArtist}"`);
        const searchRes = await fetch(`https://musicbrainz.org/ws/2/release/?query=${query}&fmt=json`);
        if (!searchRes.ok) throw new Error('Search failed');
        const data = await searchRes.json();
        
        if (data.releases && data.releases.length > 0) {
          const mbid = data.releases[0].id;
          const coverArchiveUrl = `https://coverartarchive.org/release/${mbid}/front-250`;
          if (active) {
            setCoverUrl(coverArchiveUrl);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchCover();
    return () => {
      active = false;
    };
  }, [title, artist]);

  const placeholder = (
    <div style={{
      width: '130px',
      height: '130px',
      backgroundColor: '#fafafa',
      border: '2px solid #000000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      marginBottom: '0.75rem',
      userSelect: 'none'
    }}>
      <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    </div>
  );

  if (loading) {
    return (
      <div style={{
        width: '130px',
        height: '130px',
        backgroundColor: '#fafafa',
        border: '2px solid #000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '0.75rem'
      }}>
        <span style={{ fontSize: '0.8rem', color: '#666666', fontFamily: 'var(--font-heading)' }}>Buscando...</span>
      </div>
    );
  }

  if (!coverUrl) {
    return placeholder;
  }

  return (
    <div style={{ position: 'relative', width: '130px', height: '130px', marginBottom: '0.75rem' }}>
      <img 
        src={coverUrl} 
        alt={title}
        onError={() => setCoverUrl(null)}
        style={{
          width: '130px',
          height: '130px',
          objectFit: 'cover',
          border: '2px solid #000000'
        }}
      />
    </div>
  );
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
  const [activeSubPage, setActiveSubPage] = useState<{ name: string; details: string; parentName: string } | null>(null);
  const [activeSubSubPage, setActiveSubSubPage] = useState<{ name: string; parentName: string } | null>(null);
  const [isExample1Revealed, setIsExample1Revealed] = useState<boolean>(false);
  const [isExample2Revealed, setIsExample2Revealed] = useState<boolean>(false);
  const [isExample3Revealed, setIsExample3Revealed] = useState<boolean>(false);
  const [isExample4Revealed, setIsExample4Revealed] = useState<boolean>(false);
  const [isExample5Revealed, setIsExample5Revealed] = useState<boolean>(false);
  const [selectedAlphabetLetter, setSelectedAlphabetLetter] = useState<string | null>(null);
  const [hoveredTimelinePart, setHoveredTimelinePart] = useState<{ title: string; desc: string; x: number; y: number } | null>(null);

  const [isSecretModalOpen, setIsSecretModalOpen] = useState<boolean>(false);
  const bulletPressTimerRef = useRef<number | null>(null);

  const startPress = (e: React.PointerEvent) => {
    e.preventDefault();
    if (bulletPressTimerRef.current) {
      window.clearTimeout(bulletPressTimerRef.current);
    }
    bulletPressTimerRef.current = window.setTimeout(() => {
      setIsSecretModalOpen(true);
    }, 3000);
  };

  const endPress = () => {
    if (bulletPressTimerRef.current) {
      window.clearTimeout(bulletPressTimerRef.current);
      bulletPressTimerRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (bulletPressTimerRef.current) {
        window.clearTimeout(bulletPressTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setIsExample1Revealed(false);
    setIsExample2Revealed(false);
    setIsExample3Revealed(false);
    setIsExample4Revealed(false);
    setIsExample5Revealed(false);
    setSelectedAlphabetLetter(null);
    setHoveredTimelinePart(null);
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

  const realProjects: Project[] = [
    { name: 'MAPA INTERACTIVO', description: 'Mapa interactivo de localizaciones.', category: 'Herramientas', details: 'Mapa interactivo que incluya todos los lugares donde hemos grabado. Locales con los que hemos colaborado sea haciéndoles promos, grabando una entrevista en su local, etc. También si hacemos vídeos en lugares públicos, por ejemplo preguntando a transeúntes en las ramblas de Salou, Cambrils o donde sea, o preguntando a borrachos en la puerta de una discoteca.', author: 'UNK' }
  ];

  const projects: Project[] = [
    { name: 'BUNKER', description: 'Sistema de almacenamiento seguro y gestión de recursos.', category: 'Infraestructura', details: 'El protocolo BUNKER centraliza toda la infraestructura de copias de seguridad de la red UNK. Cuenta con redundancia triple e inmunidad electromagnética.', author: 'UNK' },
    { name: 'SEEDTV', description: 'Plataforma de streaming y distribución de contenidos audiovisuales.', category: 'Media', details: 'Servidor de media activo. SEEDTV aloja las retransmisiones directas y el repositorio máster de contenidos para los socios del consorcio.', author: 'SEED' },
    { name: 'FURBOLÍSTICO', description: 'Portal y comunidad interactiva para el análisis de fútbol.', category: 'Deportes', details: 'Algoritmos predictivos listos. FURBOLÍSTICO realiza minería de datos avanzada sobre partidos, jugadores y rendimiento deportivo para generar informes analíticos.', author: 'UNK' },
    { name: 'SHOW', description: 'Show y eventos en vivo.', category: 'Entretenimiento', details: 'Planificación de la gira en desarrollo. Estructura de costes, contratos con recintos y logística integrada para los shows en vivo.', author: 'UNK' },
    { name: 'SIDETALK', description: 'Canal de entrevistas callejeras y cultura urbana.', category: 'Media', details: 'Formato dinámico de entrevistas rápidas a pie de calle sobre actualidad y cultura pop.', author: 'UNK' },
    { name: 'PRANKS', description: 'Carpeta de proyectos de bromas y cámara oculta.', category: 'Entretenimiento', details: 'Esta carpeta está vacía.', author: 'UNK' }
  ];

  const videos: Video[] = [
    { title: 'El prostíbulo 100 montaditos', details: 'Ficha técnica de producción: 1 cámara principal, 1 micrófono de corbata. Grabación secreta autorizada. Estado de edición: Terminado y subido.' },
    { title: 'Un día siendo esclavos', details: 'Ficha técnica de producción: Experimento sociológico extremo. Grabación multicámara en localización exterior. Estado de edición: Terminado y subido.' },
    { title: 'Comprobador de IA', details: 'Análisis de rendimiento de modelos de lenguaje e inteligencias artificiales generativas de última generación aplicada a flujos de trabajo.' },
    { title: 'Un día trabajando en el Top Manta', details: 'Investigación periodística a pie de calle sobre el mercado de falsificaciones y distribución informal urbana. Audio directo.' },
    { title: '100 Gitanos Dicen', details: 'En este concurso, el concursante debe dar una respuesta a cada categoría que se le pregunte, intentando acertar cuál es la respuesta más común que hemos recibido de los 100 gitanos a los que hemos encuestado.\nPara esta ocasión traemos de invitado al cantante y gitano, Rafalillo, a quien pondremos contra las cuerdas.' }
  ];

  const handleFolderClick = (e: React.MouseEvent, project: Project) => {
    e.preventDefault();
    setActiveItem({
      type: 'project',
      name: project.name,
      description: project.description,
      details: project.details
    });
  };

  const handleVideoClick = (e: React.MouseEvent, video: Video) => {
    e.preventDefault();
    setActiveItem({
      type: 'video',
      name: video.title,
      description: video.title,
      details: video.details
    });
  };



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
        ) : activeSubSubPage.name === '¿Esta barra es real o me la acabo de inventar?' ? (
          <main className="custom-page-content" style={{ border: 'none', background: 'transparent', padding: '2rem 0', textAlign: 'left' }}>
            <FolderTree path={[parentType, activeItem!.name, activeSubPage!.name, activeSubSubPage.name]} onNavigate={handleNavigate} />
            
            <hr style={{ border: 'none', borderTop: '1px solid #cccccc', margin: '1.5rem 0' }} />
            
            <div style={{ color: '#000000', lineHeight: '1.6' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem' }}>
                Vídeo de referencia:
              </div>
              
              <a 
                href="https://vm.tiktok.com/ZNRbAnayB/" 
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

              <hr style={{ border: 'none', borderTop: '1px solid #cccccc', margin: '1.5rem 0' }} />

              <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>
                Barras inventadas:
              </div>
              <ul style={{ paddingLeft: '1.5rem', margin: '0 0 1.5rem 0', listStyleType: 'square', lineHeight: '1.8', color: '#000000' }}>
                <li>Ese portero es Bonnie Blue, le entran todas</li>
              </ul>
            </div>
          </main>
        ) : activeSubSubPage.name === 'Adivina el álbum por la letra X de su portada' ? (
          <main className="custom-page-content" style={{ border: 'none', background: 'transparent', padding: '2rem 0', textAlign: 'left' }}>
            <FolderTree path={[parentType, activeItem!.name, activeSubPage!.name, activeSubSubPage.name]} onNavigate={handleNavigate} />
            
            <hr style={{ border: 'none', borderTop: '1px solid #cccccc', margin: '1.5rem 0' }} />
            
            <div style={{ color: '#000000', lineHeight: '1.6' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem' }}>
                Vídeo de referencia:
              </div>
              
              <a 
                href="https://vm.tiktok.com/ZNRbykuC9/" 
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
                  cursor: 'pointer'
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23.86.03 1.73-.02 2.6.02.01 1.37-.02 2.73.01 4.1-.73-.06-1.46-.24-2.14-.52-.61-.26-1.16-.65-1.61-1.14-.04 2.61.02 5.23-.03 7.84-.04.99-.27 2-.72 2.91-.56.98-1.45 1.75-2.5 2.18-.89.37-1.85.53-2.8.48-1.57-.02-3.13-.6-4.27-1.68-1.12-1.07-1.78-2.61-1.79-4.17-.03-1.62.63-3.23 1.79-4.32 1.1-1.05 2.62-1.63 4.14-1.62.03 1.45-.02 2.9.02 4.35-.61-.05-1.24.11-1.75.46-.54.38-.87.99-.91 1.65-.05.81.33 1.63 1.01 2.06.66.42 1.51.48 2.22.15.65-.28 1.13-.89 1.25-1.58.07-.63.02-1.27.02-1.91 0-3.66.01-7.32.02-10.98.01-.17.02-.33.02-.5z" />
                </svg>
                <span>Ver en TikTok</span>
              </a>

              <hr style={{ border: 'none', borderTop: '1px solid #cccccc', margin: '1.5rem 0' }} />

              <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem' }}>
                Abecedario
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem 0.75rem', fontSize: '1.1rem', fontFamily: 'var(--font-heading)' }}>
                {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].map((letter) => (
                  <span 
                    key={letter}
                    onClick={() => setSelectedAlphabetLetter(letter === selectedAlphabetLetter ? null : letter)}
                    style={{
                      cursor: 'pointer',
                      fontWeight: letter === selectedAlphabetLetter ? 700 : 400,
                      textDecoration: letter === selectedAlphabetLetter ? 'underline' : 'none',
                      color: letter === selectedAlphabetLetter ? '#000000' : '#888888',
                      padding: '2px 6px',
                      transition: 'color 0.2s'
                    }}
                    className="alphabet-letter"
                  >
                    {letter}
                  </span>
                ))}
              </div>

              {selectedAlphabetLetter && (
                <div style={{ marginTop: '1.5rem' }}>
                  {ALBUM_DATABASE[selectedAlphabetLetter] && ALBUM_DATABASE[selectedAlphabetLetter].length > 0 ? (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginTop: '1rem' }}>
                      {ALBUM_DATABASE[selectedAlphabetLetter].map((album, idx) => (
                        <div key={idx} style={{ width: '130px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                          <AlbumCover title={album.title} artist={album.artist} />
                          {/* Title */}
                          <div style={{ fontSize: '0.9rem', fontWeight: 700, lineHeight: '1.3', color: '#000000', wordBreak: 'break-word', width: '100%' }}>
                            {album.title}
                          </div>
                          {/* Artist */}
                          <div style={{ fontSize: '0.75rem', color: '#666666', marginTop: '0.25rem', width: '100%' }}>
                            {album.artist}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p style={{ fontStyle: 'italic', color: '#666666', marginTop: '0.5rem' }}>
                      No hay álbumes registrados bajo esta letra.
                    </p>
                  )}
                </div>
              )}
            </div>
          </main>
        ) : activeSubSubPage.name === 'Adivina la canción por sus stems' ? (
          <main className="custom-page-content" style={{ border: 'none', background: 'transparent', padding: '2rem 0', textAlign: 'left' }}>
            <FolderTree path={[parentType, activeItem!.name, activeSubPage!.name, activeSubSubPage.name]} onNavigate={handleNavigate} />
            
            <hr style={{ border: 'none', borderTop: '1px solid #cccccc', margin: '1.5rem 0' }} />
            
            <div style={{ color: '#000000', lineHeight: '1.6' }}>
              <p style={{ fontStyle: 'italic' }}>Esta carpeta está vacía.</p>
            </div>
          </main>
        ) : activeSubSubPage.name === 'Adivina en X palabras o menos' ? (
          <main className="custom-page-content" style={{ border: 'none', background: 'transparent', padding: '2rem 0', textAlign: 'left' }}>
            <FolderTree path={[parentType, activeItem!.name, activeSubPage!.name, activeSubSubPage.name]} onNavigate={handleNavigate} />
            
            <hr style={{ border: 'none', borderTop: '1px solid #cccccc', margin: '1.5rem 0' }} />
            
            <div style={{ color: '#000000', lineHeight: '1.6' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem' }}>
                Vídeo de referencia:
              </div>
              
              <a 
                href="https://www.tiktok.com/@waterboyzhq/video/7649448507601898782?_r=1&_t=ZN-9761dXZnI4E" 
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
                  cursor: 'pointer'
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23.86.03 1.73-.02 2.6.02.01 1.37-.02 2.73.01 4.1-.73-.06-1.46-.24-2.14-.52-.61-.26-1.16-.65-1.61-1.14-.04 2.61.02 5.23-.03 7.84-.04.99-.27 2-.72 2.91-.56.98-1.45 1.75-2.5 2.18-.89.37-1.85.53-2.8.48-1.57-.02-3.13-.6-4.27-1.68-1.12-1.07-1.78-2.61-1.79-4.17-.03-1.62.63-3.23 1.79-4.32 1.1-1.05 2.62-1.63 4.14-1.62.03 1.45-.02 2.9.02 4.35-.61-.05-1.24.11-1.75.46-.54.38-.87.99-.91 1.65-.05.81.33 1.63 1.01 2.06.66.42 1.51.48 2.22.15.65-.28 1.13-.89 1.25-1.58.07-.63.02-1.27.02-1.91 0-3.66.01-7.32.02-10.98.01-.17.02-.33.02-.5z" />
                </svg>
                <span>Ver en TikTok</span>
              </a>
            </div>
          </main>
        ) : activeSubSubPage.name === 'Palabras encadenadas' ? (
          <main className="custom-page-content" style={{ border: 'none', background: 'transparent', padding: '2rem 0', textAlign: 'left' }}>
            <FolderTree path={[parentType, activeItem!.name, activeSubPage!.name, activeSubSubPage.name]} onNavigate={handleNavigate} />
            
            <hr style={{ border: 'none', borderTop: '1px solid #cccccc', margin: '1.5rem 0' }} />
            
            <div style={{ color: '#000000', lineHeight: '1.6' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem' }}>
                Vídeo de referencia:
              </div>
              
              <a 
                href="https://www.tiktok.com/@imachuca01/video/7649436957822536982?_r=1&_t=ZN-975KK6wje46" 
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
                  cursor: 'pointer'
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23.86.03 1.73-.02 2.6.02.01 1.37-.02 2.73.01 4.1-.73-.06-1.46-.24-2.14-.52-.61-.26-1.16-.65-1.61-1.14-.04 2.61.02 5.23-.03 7.84-.04.99-.27 2-.72 2.91-.56.98-1.45 1.75-2.5 2.18-.89.37-1.85.53-2.8.48-1.57-.02-3.13-.6-4.27-1.68-1.12-1.07-1.78-2.61-1.79-4.17-.03-1.62.63-3.23 1.79-4.32 1.1-1.05 2.62-1.63 4.14-1.62.03 1.45-.02 2.9.02 4.35-.61-.05-1.24.11-1.75.46-.54.38-.87.99-.91 1.65-.05.81.33 1.63 1.01 2.06.66.42 1.51.48 2.22.15.65-.28 1.13-.89 1.25-1.58.07-.63.02-1.27.02-1.91 0-3.66.01-7.32.02-10.98.01-.17.02-.33.02-.5z" />
                </svg>
                <span>Ver en TikTok</span>
              </a>
            </div>
          </main>
        ) : activeSubSubPage.name === 'Adivina la canción narrada como una escritura antigua' ? (
          <main className="custom-page-content" style={{ border: 'none', background: 'transparent', padding: '2rem 0', textAlign: 'left' }}>
            <FolderTree path={[parentType, activeItem!.name, activeSubPage!.name, activeSubSubPage.name]} onNavigate={handleNavigate} />
            
            <hr style={{ border: 'none', borderTop: '1px solid #cccccc', margin: '1.5rem 0' }} />
            
            <div style={{ color: '#000000', lineHeight: '1.6' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>
                Descripción
              </div>
              <p style={{ fontSize: '1rem', color: '#000000', margin: '0 0 1.5rem 0', maxWidth: 'none', lineHeight: '1.6' }}>
                Leo la letra de canciones que son hits reversionadas en castellano antiguo.
              </p>

              <hr style={{ border: 'none', borderTop: '1px solid #cccccc', margin: '1.5rem 0' }} />

              <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem' }}>
                Vídeo de referencia
              </div>
              
              <a 
                href="https://www.tiktok.com/@horapico.stream/video/7649791285494107410?_r=1&_t=ZN-979KDByKRZm" 
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

              <hr style={{ border: 'none', borderTop: '1px solid #cccccc', margin: '1.5rem 0' }} />

              <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>
                Props
              </div>
              <p style={{ fontSize: '1rem', color: '#000000', margin: '0 0 1.5rem 0', maxWidth: 'none', lineHeight: '1.6' }}>
                Usar un pergamino, una piedra tallada, pluma, algún sombrero antiguo... ir subiendo el nivel.
              </p>

              <hr style={{ border: 'none', borderTop: '1px solid #cccccc', margin: '1.5rem 0' }} />

              <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>
                Balas
              </div>
              <div style={{ marginTop: '1rem' }}>
                <img 
                  src="/bullet.png" 
                  alt="Balas" 
                  onPointerDown={startPress}
                  onPointerUp={endPress}
                  onPointerLeave={endPress}
                  onPointerCancel={endPress}
                  onDragStart={(e) => e.preventDefault()}
                  style={{ 
                    height: '46px', 
                    width: 'auto', 
                    display: 'block',
                    cursor: 'default',
                    userSelect: 'none',
                    touchAction: 'none'
                  }} 
                />
              </div>
            </div>
          </main>
        ) : activeSubSubPage.name === 'Adivina al cantante por su paquete' ? (
          <main className="custom-page-content" style={{ border: 'none', background: 'transparent', padding: '2rem 0', textAlign: 'left' }}>
            <FolderTree path={[parentType, activeItem!.name, activeSubPage!.name, activeSubSubPage.name]} onNavigate={handleNavigate} />
            
            <hr style={{ border: 'none', borderTop: '1px solid #cccccc', margin: '1.5rem 0' }} />
            
            <div style={{ color: '#000000', lineHeight: '1.6' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem' }}>
                Vídeo de referencia:
              </div>
              
              <a 
                href="https://vm.tiktok.com/ZNRvH2NjQ/" 
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
                  cursor: 'pointer'
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23.86.03 1.73-.02 2.6.02.01 1.37-.02 2.73.01 4.1-.73-.06-1.46-.24-2.14-.52-.61-.26-1.16-.65-1.61-1.14-.04 2.61.02 5.23-.03 7.84-.04.99-.27 2-.72 2.91-.56.98-1.45 1.75-2.5 2.18-.89.37-1.85.53-2.8.48-1.57-.02-3.13-.6-4.27-1.68-1.12-1.07-1.78-2.61-1.79-4.17-.03-1.62.63-3.23 1.79-4.32 1.1-1.05 2.62-1.63 4.14-1.62.03 1.45-.02 2.9.02 4.35-.61-.05-1.24.11-1.75.46-.54.38-.87.99-.91 1.65-.05.81.33 1.63 1.01 2.06.66.42 1.51.48 2.22.15.65-.28 1.13-.89 1.25-1.58.07-.63.02-1.27.02-1.91 0-3.66.01-7.32.02-10.98.01-.17.02-.33.02-.5z" />
                </svg>
                <span>Ver en TikTok</span>
              </a>
            </div>
          </main>
        ) : activeSubSubPage.name === 'Adivina mi canción' ? (
          <main className="custom-page-content" style={{ border: 'none', background: 'transparent', padding: '2rem 0', textAlign: 'left' }}>
            <FolderTree path={[parentType, activeItem!.name, activeSubPage!.name, activeSubSubPage.name]} onNavigate={handleNavigate} />
            
            <hr style={{ border: 'none', borderTop: '1px solid #cccccc', margin: '1.5rem 0' }} />
            
            <div style={{ color: '#000000', lineHeight: '1.6' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem' }}>
                Vídeo de referencia:
              </div>
              
              <a 
                href="https://vm.tiktok.com/ZNRvuwybP/" 
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
                  cursor: 'pointer'
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23.86.03 1.73-.02 2.6.02.01 1.37-.02 2.73.01 4.1-.73-.06-1.46-.24-2.14-.52-.61-.26-1.16-.65-1.61-1.14-.04 2.61.02 5.23-.03 7.84-.04.99-.27 2-.72 2.91-.56.98-1.45 1.75-2.5 2.18-.89.37-1.85.53-2.8.48-1.57-.02-3.13-.6-4.27-1.68-1.12-1.07-1.78-2.61-1.79-4.17-.03-1.62.63-3.23 1.79-4.32 1.1-1.05 2.62-1.63 4.14-1.62.03 1.45-.02 2.9.02 4.35-.61-.05-1.24.11-1.75.46-.54.38-.87.99-.91 1.65-.05.81.33 1.63 1.01 2.06.66.42 1.51.48 2.22.15.65-.28 1.13-.89 1.25-1.58.07-.63.02-1.27.02-1.91 0-3.66.01-7.32.02-10.98.01-.17.02-.33.02-.5z" />
                </svg>
                <span>Ver en TikTok</span>
              </a>
            </div>
          </main>
        ) : activeSubSubPage.name === 'Torre' ? (
          <main className="custom-page-content" style={{ border: 'none', background: 'transparent', padding: '2rem 0', textAlign: 'left' }}>
            <FolderTree path={[parentType, activeItem!.name, activeSubPage!.name, activeSubSubPage.name]} onNavigate={handleNavigate} />
            
            <hr style={{ border: 'none', borderTop: '1px solid #cccccc', margin: '1.5rem 0' }} />
            
            <div style={{ color: '#000000', lineHeight: '1.6' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem' }}>
                Vídeo de referencia:
              </div>
              
              <a 
                href="https://www.tiktok.com/@anavfelipe/video/7647891655470714134?_r=1&_t=ZN-975JYQ5Kr7X" 
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

              <hr style={{ border: 'none', borderTop: '1px solid #cccccc', margin: '1.5rem 0' }} />

              <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>
                Apunte:
              </div>
              <p style={{ fontSize: '1rem', color: '#000000', margin: '0 0 1.5rem 0', maxWidth: 'none', lineHeight: '1.6' }}>
                No hacerlo con torres. Decir algo con mejor narrativa, como <strong>squad</strong>, <strong>equipo</strong>, etc. Para ir formando con IA una imagen en la que lideras el equipo o algo similar.
              </p>
            </div>
          </main>
        ) : activeSubSubPage.name === 'Apartado técnico' && activeSubSubPage.parentName === 'Plató' ? (
          <main className="custom-page-content" style={{ border: 'none', background: 'transparent', padding: '2rem 0', textAlign: 'left' }}>
            <FolderTree path={[parentType, activeItem!.name, activeSubPage!.name, activeSubSubPage.name]} onNavigate={handleNavigate} />
            <hr style={{ border: 'none', borderTop: '1px solid #cccccc', margin: '1.5rem 0' }} />
            <ul style={{ paddingLeft: '1.5rem', margin: '0 0 1.5rem 0', listStyleType: 'square', lineHeight: '1.8', color: '#000000' }}>
              <li>Sony ZV-E10K</li>
              <li>Sony A5000</li>
              <li>2x Trípode</li>
              <li>Rode NT1A</li>
              <li>3x Pie de micro</li>
              <li>PodTrak P4Next</li>
              <li>2x Luz Softbox Neewer</li>
            </ul>
          </main>
        ) : activeSubSubPage.name === 'Props' && activeSubSubPage.parentName === 'Plató' ? (
          <main className="custom-page-content" style={{ border: 'none', background: 'transparent', padding: '2rem 0', textAlign: 'left' }}>
            <FolderTree path={[parentType, activeItem!.name, activeSubPage!.name, activeSubSubPage.name]} onNavigate={handleNavigate} />
            <hr style={{ border: 'none', borderTop: '1px solid #cccccc', margin: '1.5rem 0' }} />
            <ul style={{ paddingLeft: '1.5rem', margin: '0 0 1.5rem 0', listStyleType: 'square', lineHeight: '1.8', color: '#000000' }}>
              <li>Latas de sopa custom</li>
              <li>Nukecolas custom</li>
              <li>Tablero de Risk custom</li>
            </ul>
          </main>
        ) : activeSubSubPage.name === 'Peluches' && activeSubSubPage.parentName === 'Plató' ? (
          <main className="custom-page-content" style={{ border: 'none', background: 'transparent', padding: '2rem 0', textAlign: 'left' }}>
            <FolderTree path={[parentType, activeItem!.name, activeSubPage!.name, activeSubSubPage.name]} onNavigate={handleNavigate} />
            <hr style={{ border: 'none', borderTop: '1px solid #cccccc', margin: '1.5rem 0' }} />
            <div style={{ color: '#000000', lineHeight: '1.6' }}>
              <p style={{ fontStyle: 'italic', color: '#666666' }}>Esta carpeta está vacía.</p>
            </div>
          </main>
        ) : activeSubSubPage.name === 'Tablero' && activeSubSubPage.parentName === 'Plató' ? (
          <main className="custom-page-content" style={{ border: 'none', background: 'transparent', padding: '2rem 0', textAlign: 'left' }}>
            <FolderTree path={[parentType, activeItem!.name, activeSubPage!.name, activeSubSubPage.name]} onNavigate={handleNavigate} />
            <hr style={{ border: 'none', borderTop: '1px solid #cccccc', margin: '1.5rem 0' }} />
            <div style={{ color: '#000000', lineHeight: '1.6' }}>
              <p style={{ fontStyle: 'italic', color: '#666666' }}>Esta carpeta está vacía.</p>
            </div>
          </main>
        ) : (
          <main className="custom-page-content" style={{ border: 'none', background: 'transparent', padding: '2rem 0', textAlign: 'left' }}>
            <FolderTree path={[parentType, activeItem!.name, activeSubPage!.name, activeSubSubPage.name]} onNavigate={handleNavigate} />
            
            <hr style={{ border: 'none', borderTop: '1px solid #cccccc', margin: '1.5rem 0' }} />
            
            <div style={{ color: '#000000', lineHeight: '1.6' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>
                Descripción
              </div>
              <p style={{ fontSize: '1rem', color: '#000000', margin: '0 0 1.5rem 0', maxWidth: 'none', lineHeight: '1.6' }}>
                Te dan la siguiente información de un artista musical: Nombre completo, nacionalidad y fecha de nacimiento. Con eso debes saber quién es.
              </p>

              <hr style={{ border: 'none', borderTop: '1px solid #cccccc', margin: '1.5rem 0' }} />

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
                  cursor: 'pointer'
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23.86.03 1.73-.02 2.6.02.01 1.37-.02 2.73.01 4.1-.73-.06-1.46-.24-2.14-.52-.61-.26-1.16-.65-1.61-1.14-.04 2.61.02 5.23-.03 7.84-.04.99-.27 2-.72 2.91-.56.98-1.45 1.75-2.5 2.18-.89.37-1.85.53-2.8.48-1.57-.02-3.13-.6-4.27-1.68-1.12-1.07-1.78-2.61-1.79-4.17-.03-1.62.63-3.23 1.79-4.32 1.1-1.05 2.62-1.63 4.14-1.62.03 1.45-.02 2.9.02 4.35-.61-.05-1.24.11-1.75.46-.54.38-.87.99-.91 1.65-.05.81.33 1.63 1.01 2.06.66.42 1.51.48 2.22.15.65-.28 1.13-.89 1.25-1.58.07-.63.02-1.27.02-1.91 0-3.66.01-7.32.02-10.98.01-.17.02-.33.02-.5z" />
                </svg>
                <span>Ver en TikTok</span>
              </a>

              <hr style={{ border: 'none', borderTop: '1px solid #cccccc', margin: '1.5rem 0' }} />

              <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>
                Estética
              </div>
              <p style={{ fontSize: '1rem', color: '#000000', margin: '0 0 1.5rem 0', maxWidth: 'none', lineHeight: '1.6' }}>
                Ambientado como Papers Please mezclado con una cárcel. Es como que eres un agente penitenciario al que le llegan fichas de personas que han ingresado a la cárcel y debes adivinar de qué artista se trata.
              </p>

              <hr style={{ border: 'none', borderTop: '1px solid #cccccc', margin: '1.5rem 0' }} />

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

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <span>Pedro Navarro Utrera es</span>
                  <span 
                    onClick={() => setIsExample4Revealed(!isExample4Revealed)}
                    className={`spoiler-text ${isExample4Revealed ? 'revealed' : ''}`}
                  >
                    Foyone
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <span>David Calvo Villa es</span>
                  <span 
                    onClick={() => setIsExample5Revealed(!isExample5Revealed)}
                    className={`spoiler-text ${isExample5Revealed ? 'revealed' : ''}`}
                  >
                    El Jincho
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
          
          {activeSubPage.parentName === 'BUNKER' && activeSubPage.name === 'Plató' ? (
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginTop: '2rem' }}>
              <div 
                className="folder-card" 
                style={{ width: '220px', padding: '1.5rem 1rem' }}
                onClick={() => setActiveSubSubPage({ name: 'Apartado técnico', parentName: 'Plató' })}
              >
                <div className="folder-icon-wrapper" style={{ marginBottom: '0.75rem' }}>
                  <Folder size={48} strokeWidth={1.5} />
                </div>
                <span className="folder-name" style={{ fontSize: '1rem', fontWeight: 700 }}>Apartado técnico</span>
              </div>

              <div 
                className="folder-card" 
                style={{ width: '220px', padding: '1.5rem 1rem' }}
                onClick={() => setActiveSubSubPage({ name: 'Props', parentName: 'Plató' })}
              >
                <div className="folder-icon-wrapper" style={{ marginBottom: '0.75rem' }}>
                  <Folder size={48} strokeWidth={1.5} />
                </div>
                <span className="folder-name" style={{ fontSize: '1rem', fontWeight: 700 }}>Props</span>
              </div>

              <div 
                className="folder-card" 
                style={{ width: '220px', padding: '1.5rem 1rem' }}
                onClick={() => setActiveSubSubPage({ name: 'Peluches', parentName: 'Plató' })}
              >
                <div className="folder-icon-wrapper" style={{ marginBottom: '0.75rem' }}>
                  <Folder size={48} strokeWidth={1.5} />
                </div>
                <span className="folder-name" style={{ fontSize: '1rem', fontWeight: 700 }}>Peluches</span>
              </div>

              <div 
                className="folder-card" 
                style={{ width: '220px', padding: '1.5rem 1rem' }}
                onClick={() => setActiveSubSubPage({ name: 'Tablero', parentName: 'Plató' })}
              >
                <div className="folder-icon-wrapper" style={{ marginBottom: '0.75rem' }}>
                  <Folder size={48} strokeWidth={1.5} />
                </div>
                <span className="folder-name" style={{ fontSize: '1rem', fontWeight: 700 }}>Tablero</span>
              </div>
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
                  <Gamepad2 size={48} strokeWidth={1.5} />
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
                  <Gamepad2 size={48} strokeWidth={1.5} />
                </div>
                <span className="folder-name" style={{ fontSize: '0.9rem', fontWeight: 700, textAlign: 'center', lineHeight: '1.3' }}>
                  Adivina el artista por su nombre real
                </span>
              </div>

              <div 
                className="folder-card" 
                style={{ width: '220px', padding: '1.5rem 1rem' }}
                onClick={() => setActiveSubSubPage({
                  name: '¿Esta barra es real o me la acabo de inventar?',
                  parentName: 'Formatos'
                })}
              >
                <div className="folder-icon-wrapper" style={{ marginBottom: '0.75rem' }}>
                  <Gamepad2 size={48} strokeWidth={1.5} />
                </div>
                <span className="folder-name" style={{ fontSize: '0.9rem', fontWeight: 700, textAlign: 'center', lineHeight: '1.3' }}>
                  ¿Esta barra es real o me la acabo de inventar?
                </span>
              </div>

              <div 
                className="folder-card" 
                style={{ width: '220px', padding: '1.5rem 1rem' }}
                onClick={() => setActiveSubSubPage({
                  name: 'Adivina el álbum por la letra X de su portada',
                  parentName: 'Formatos'
                })}
              >
                <div className="folder-icon-wrapper" style={{ marginBottom: '0.75rem' }}>
                  <Gamepad2 size={48} strokeWidth={1.5} />
                </div>
                <span className="folder-name" style={{ fontSize: '0.9rem', fontWeight: 700, textAlign: 'center', lineHeight: '1.3' }}>
                  Adivina el álbum por la letra X de su portada
                </span>
              </div>

              <div 
                className="folder-card" 
                style={{ width: '220px', padding: '1.5rem 1rem' }}
                onClick={() => setActiveSubSubPage({
                  name: 'Adivina la canción por sus stems',
                  parentName: 'Formatos'
                })}
              >
                <div className="folder-icon-wrapper" style={{ marginBottom: '0.75rem' }}>
                  <Gamepad2 size={48} strokeWidth={1.5} />
                </div>
                <span className="folder-name" style={{ fontSize: '0.9rem', fontWeight: 700, textAlign: 'center', lineHeight: '1.3' }}>
                  Adivina la canción por sus stems
                </span>
              </div>

              <div 
                className="folder-card" 
                style={{ width: '220px', padding: '1.5rem 1rem' }}
                onClick={() => setActiveSubSubPage({
                  name: 'Adivina en X palabras o menos',
                  parentName: 'Formatos'
                })}
              >
                <div className="folder-icon-wrapper" style={{ marginBottom: '0.75rem' }}>
                  <Gamepad2 size={48} strokeWidth={1.5} />
                </div>
                <span className="folder-name" style={{ fontSize: '0.9rem', fontWeight: 700, textAlign: 'center', lineHeight: '1.3' }}>
                  Adivina en X palabras o menos
                </span>
              </div>

              <div 
                className="folder-card" 
                style={{ width: '220px', padding: '1.5rem 1rem' }}
                onClick={() => setActiveSubSubPage({
                  name: 'Palabras encadenadas',
                  parentName: 'Formatos'
                })}
              >
                <div className="folder-icon-wrapper" style={{ marginBottom: '0.75rem' }}>
                  <Gamepad2 size={48} strokeWidth={1.5} />
                </div>
                <span className="folder-name" style={{ fontSize: '0.9rem', fontWeight: 700, textAlign: 'center', lineHeight: '1.3' }}>
                  Palabras encadenadas
                </span>
              </div>

              <div 
                className="folder-card" 
                style={{ width: '220px', padding: '1.5rem 1rem' }}
                onClick={() => setActiveSubSubPage({
                  name: 'Torre',
                  parentName: 'Formatos'
                })}
              >
                <div className="folder-icon-wrapper" style={{ marginBottom: '0.75rem' }}>
                  <Gamepad2 size={48} strokeWidth={1.5} />
                </div>
                <span className="folder-name" style={{ fontSize: '0.9rem', fontWeight: 700, textAlign: 'center', lineHeight: '1.3' }}>
                  Torre
                </span>
              </div>

              <div 
                className="folder-card" 
                style={{ width: '220px', padding: '1.5rem 1rem' }}
                onClick={() => setActiveSubSubPage({
                  name: 'Adivina mi canción',
                  parentName: 'Formatos'
                })}
              >
                <div className="folder-icon-wrapper" style={{ marginBottom: '0.75rem' }}>
                  <Gamepad2 size={48} strokeWidth={1.5} />
                </div>
                <span className="folder-name" style={{ fontSize: '0.9rem', fontWeight: 700, textAlign: 'center', lineHeight: '1.3' }}>
                  Adivina mi canción
                </span>
              </div>

              <div 
                className="folder-card" 
                style={{ width: '220px', padding: '1.5rem 1rem' }}
                onClick={() => setActiveSubSubPage({
                  name: 'Adivina al cantante por su paquete',
                  parentName: 'Formatos'
                })}
              >
                <div className="folder-icon-wrapper" style={{ marginBottom: '0.75rem' }}>
                  <Gamepad2 size={48} strokeWidth={1.5} />
                </div>
                <span className="folder-name" style={{ fontSize: '0.9rem', fontWeight: 700, textAlign: 'center', lineHeight: '1.3' }}>
                  Adivina al cantante por su paquete
                </span>
              </div>

              <div 
                className="folder-card" 
                style={{ width: '220px', padding: '1.5rem 1rem' }}
                onClick={() => setActiveSubSubPage({
                  name: 'Adivina la canción narrada como una escritura antigua',
                  parentName: 'Formatos'
                })}
              >
                <div className="folder-icon-wrapper" style={{ marginBottom: '0.75rem' }}>
                  <Gamepad2 size={48} strokeWidth={1.5} />
                </div>
                <span className="folder-name" style={{ fontSize: '0.9rem', fontWeight: 700, textAlign: 'center', lineHeight: '1.3' }}>
                  Adivina la canción narrada como una escritura antigua
                </span>
              </div>
            </div>
          ) : activeSubPage.parentName === 'MAPA INTERACTIVO' && activeSubPage.name === 'Samöa Club' ? (
            <div style={{ color: '#000000', lineHeight: '1.6' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem' }}>
                Vídeo de referencia:
              </div>
              
              <a 
                href="https://vm.tiktok.com/ZNRvXmESQ/" 
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

              <hr style={{ border: 'none', borderTop: '1px solid #cccccc', margin: '1.5rem 0' }} />

              <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>
                Idea:
              </div>
              <p style={{ fontSize: '1rem', color: '#000000', margin: '0 0 1.5rem 0', maxWidth: 'none', lineHeight: '1.6' }}>
                Combinarlo con un sketch en el que salen del Samöa unos empleados a meternos a patadas a dentro y ponernos a hacer ejercicio. Mientras hacemos ejercicio de fondo sale en primer plano el empleado y suelta su speech.
              </p>
            </div>
          ) : activeSubPage.parentName === 'PRANKS' && activeSubPage.name === '¿Qué lubricante te gusta más?' ? (
            <div style={{ color: '#000000', lineHeight: '1.6' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem' }}>
                Vídeo de referencia:
              </div>
              
              <a 
                href="https://www.tiktok.com/@ikervvera/video/7628584423809715478?_r=1&_t=ZN-972feKVGXo6" 
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
                  cursor: 'pointer'
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23.86.03 1.73-.02 2.6.02.01 1.37-.02 2.73.01 4.1-.73-.06-1.46-.24-2.14-.52-.61-.26-1.16-.65-1.61-1.14-.04 2.61.02 5.23-.03 7.84-.04.99-.27 2-.72 2.91-.56.98-1.45 1.75-2.5 2.18-.89.37-1.85.53-2.8.48-1.57-.02-3.13-.6-4.27-1.68-1.12-1.07-1.78-2.61-1.79-4.17-.03-1.62.63-3.23 1.79-4.32 1.1-1.05 2.62-1.63 4.14-1.62.03 1.45-.02 2.9.02 4.35-.61-.05-1.24.11-1.75.46-.54.38-.87.99-.91 1.65-.05.81.33 1.63 1.01 2.06.66.42 1.51.48 2.22.15.65-.28 1.13-.89 1.25-1.58.07-.63.02-1.27.02-1.91 0-3.66.01-7.32.02-10.98.01-.17.02-.33.02-.5z" />
                </svg>
                <span>Ver en TikTok</span>
              </a>
            </div>
          ) : activeSubPage.parentName === 'PRANKS' && activeSubPage.name === 'Requisitos para ser mi novia' ? (
            <div style={{ color: '#000000', lineHeight: '1.6' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem' }}>
                Vídeo de referencia:
              </div>
              
              <a 
                href="https://www.tiktok.com/@turbotank.tv/video/7645413007593458957?_r=1&_t=ZN-972fEU9N7zS" 
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
                  cursor: 'pointer'
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23.86.03 1.73-.02 2.6.02.01 1.37-.02 2.73.01 4.1-.73-.06-1.46-.24-2.14-.52-.61-.26-1.16-.65-1.61-1.14-.04 2.61.02 5.23-.03 7.84-.04.99-.27 2-.72 2.91-.56.98-1.45 1.75-2.5 2.18-.89.37-1.85.53-2.8.48-1.57-.02-3.13-.6-4.27-1.68-1.12-1.07-1.78-2.61-1.79-4.17-.03-1.62.63-3.23 1.79-4.32 1.1-1.05 2.62-1.63 4.14-1.62.03 1.45-.02 2.9.02 4.35-.61-.05-1.24.11-1.75.46-.54.38-.87.99-.91 1.65-.05.81.33 1.63 1.01 2.06.66.42 1.51.48 2.22.15.65-.28 1.13-.89 1.25-1.58.07-.63.02-1.27.02-1.91 0-3.66.01-7.32.02-10.98.01-.17.02-.33.02-.5z" />
                </svg>
                <span>Ver en TikTok</span>
              </a>
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
        ) : activeItem.type === 'video' && activeItem.name === '100 Gitanos Dicen' ? (
          <main className="custom-page-content" style={{ border: 'none', background: 'transparent', padding: '2rem 0', textAlign: 'left' }}>
            <FolderTree path={[parentType, activeItem.name]} onNavigate={handleNavigate} />
            <hr style={{ border: 'none', borderTop: '1px solid #cccccc', margin: '1.5rem 0' }} />
            
            <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem', textTransform: 'uppercase' }}>
              Sinopsis
            </div>
            <p className="custom-page-text" style={{ fontStyle: 'italic', color: '#000000', margin: '0 0 1.5rem 0', maxWidth: 'none', whiteSpace: 'pre-line' }}>
              {activeItem.details}
            </p>
            
            <hr style={{ border: 'none', borderTop: '1px solid #cccccc', margin: '1.5rem 0' }} />
            
            <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem', textTransform: 'uppercase' }}>
              Recolección de data
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', margin: '0 0 1.5rem 0', color: '#000000', lineHeight: '1.6' }}>
              <p className="custom-page-text" style={{ maxWidth: 'none', margin: 0 }}>
                <strong>Método 1: Pedir en stories</strong> (Necesito gitanos que contesten una encuesta rápida de menos de 3 minutos. Reacciona a la story y te la mando). Mandamos un link de un uso para que podamos hacer un seguimiento, no se dupliquen entradas ni puedan reenviar el mismo link, y es una encuesta con todas las preguntas de forma "anónima".
              </p>
              <p className="custom-page-text" style={{ maxWidth: 'none', margin: 0 }}>
                <strong>Método 2: Ir a un mercadillo</strong> a recopilar las preguntas con trabajo de campo y eso sirve como fragmentos para el vídeo. Podemos sacar 10-20 y luego rellenar respuestas con el método 1 o si vamos cortos con IA.
              </p>
            </div>
            
            <hr style={{ border: 'none', borderTop: '1px solid #cccccc', margin: '1.5rem 0' }} />
            
            <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem', textTransform: 'uppercase' }}>
              Estructura del vídeo
            </div>

            <div style={{ position: 'relative', width: '100%', marginTop: '1rem', marginBottom: '2.5rem' }}>
              {/* Segmented Timeline Bar */}
              <div style={{
                width: '100%',
                height: '35px',
                border: '2px solid #000000',
                display: 'flex',
                backgroundColor: '#ffffff',
                position: 'relative',
                overflow: 'hidden'
              }}>
                {/* 10% Segment: Introducción */}
                <div 
                  onMouseEnter={() => setHoveredTimelinePart({
                    title: 'Introducción',
                    desc: 'Se explican las normas del juego.',
                    x: 0,
                    y: 0
                  })}
                  onMouseMove={(e) => setHoveredTimelinePart(prev => prev ? { ...prev, x: e.clientX, y: e.clientY } : null)}
                  onMouseLeave={() => setHoveredTimelinePart(null)}
                  style={{
                    width: '10%',
                    height: '100%',
                    borderRight: '2px solid #000000',
                    backgroundColor: '#f0f0f0',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                  }}
                  className="timeline-part-hover"
                />

                {/* 10% Segment: Presentación */}
                <div 
                  onMouseEnter={() => setHoveredTimelinePart({
                    title: 'Presentación',
                    desc: 'Se presenta al concursante y se muestra un poco de su música.',
                    x: 0,
                    y: 0
                  })}
                  onMouseMove={(e) => setHoveredTimelinePart(prev => prev ? { ...prev, x: e.clientX, y: e.clientY } : null)}
                  onMouseLeave={() => setHoveredTimelinePart(null)}
                  style={{
                    width: '10%',
                    height: '100%',
                    borderRight: '2px solid #000000',
                    backgroundColor: '#e0e0e0',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                  }}
                  className="timeline-part-hover"
                />

                {/* 20% Segment: Ronda 1 */}
                <div 
                  onMouseEnter={() => setHoveredTimelinePart({
                    title: 'RONDA 1',
                    desc: '5 preguntas donde puede acumular hasta 500 puntos.',
                    x: 0,
                    y: 0
                  })}
                  onMouseMove={(e) => setHoveredTimelinePart(prev => prev ? { ...prev, x: e.clientX, y: e.clientY } : null)}
                  onMouseLeave={() => setHoveredTimelinePart(null)}
                  style={{
                    width: '20%',
                    height: '100%',
                    borderRight: '2px solid #000000',
                    backgroundColor: '#cccccc',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                  }}
                  className="timeline-part-hover"
                />

                {/* 10% Segment: Pausa publicitaria 1 */}
                <div 
                  onMouseEnter={() => setHoveredTimelinePart({
                    title: 'Pausa publicitaria 1',
                    desc: "Con un sello de 'Gitano Owned Business' con los colores de la bandera gitana (parodia de la campaña americana que promueve comprar únicamente en Black Owned Businesses para redistribuir riqueza entre la comunidad), cuña publicitaria de una paradita del mercadillo que vende ropa.",
                    x: 0,
                    y: 0
                  })}
                  onMouseMove={(e) => setHoveredTimelinePart(prev => prev ? { ...prev, x: e.clientX, y: e.clientY } : null)}
                  onMouseLeave={() => setHoveredTimelinePart(null)}
                  style={{
                    width: '10%',
                    height: '100%',
                    borderRight: '2px solid #000000',
                    backgroundColor: '#b8b8b8',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                  }}
                  className="timeline-part-hover"
                />

                {/* 20% Segment: Ronda 2 */}
                <div 
                  onMouseEnter={() => setHoveredTimelinePart({
                    title: 'RONDA 2',
                    desc: 'Puntos x2. 5 preguntas, 1000 puntos en juego.',
                    x: 0,
                    y: 0
                  })}
                  onMouseMove={(e) => setHoveredTimelinePart(prev => prev ? { ...prev, x: e.clientX, y: e.clientY } : null)}
                  onMouseLeave={() => setHoveredTimelinePart(null)}
                  style={{
                    width: '20%',
                    height: '100%',
                    borderRight: '2px solid #000000',
                    backgroundColor: '#a8a8a8',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                  }}
                  className="timeline-part-hover"
                />

                {/* 10% Segment: Pausa publicitaria 2 */}
                <div 
                  onMouseEnter={() => setHoveredTimelinePart({
                    title: 'Pausa publicitaria 2',
                    desc: 'Igual que la anterior pero esta vez de una frutería del mercadillo.',
                    x: 0,
                    y: 0
                  })}
                  onMouseMove={(e) => setHoveredTimelinePart(prev => prev ? { ...prev, x: e.clientX, y: e.clientY } : null)}
                  onMouseLeave={() => setHoveredTimelinePart(null)}
                  style={{
                    width: '10%',
                    height: '100%',
                    borderRight: '2px solid #000000',
                    backgroundColor: '#989898',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                  }}
                  className="timeline-part-hover"
                />

                {/* 20% Segment: Ronda Final */}
                <div 
                  onMouseEnter={() => setHoveredTimelinePart({
                    title: 'RONDA FINAL',
                    desc: 'Algún factor gambling o pregunta de oro.',
                    x: 0,
                    y: 0
                  })}
                  onMouseMove={(e) => setHoveredTimelinePart(prev => prev ? { ...prev, x: e.clientX, y: e.clientY } : null)}
                  onMouseLeave={() => setHoveredTimelinePart(null)}
                  style={{
                    width: '20%',
                    height: '100%',
                    backgroundColor: '#888888',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                  }}
                  className="timeline-part-hover"
                />
              </div>

              {/* Floating Tooltip following cursor */}
              {hoveredTimelinePart && (
                <div style={{
                  position: 'fixed',
                  left: hoveredTimelinePart.x + 15,
                  top: hoveredTimelinePart.y + 15,
                  backgroundColor: '#ffffff',
                  border: '2px solid #000000',
                  padding: '0.75rem 1rem',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.85rem',
                  lineHeight: '1.4',
                  color: '#000000',
                  zIndex: 9999,
                  pointerEvents: 'none',
                  boxShadow: '3px 3px 0px rgba(0,0,0,0.15)',
                  maxWidth: '280px'
                }}>
                  <strong style={{ display: 'block', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                    {hoveredTimelinePart.title}
                  </strong>
                  <span>{hoveredTimelinePart.desc}</span>
                </div>
              )}
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid #cccccc', margin: '1.5rem 0' }} />
            
            <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem', textTransform: 'uppercase' }}>
              Preguntas
            </div>
            <ul style={{ paddingLeft: '1.5rem', margin: '0 0 1.5rem 0', listStyleType: 'square', lineHeight: '1.8', color: '#000000' }}>
              <li>Apellido típico de gitano</li>
              <li>Coche típico de gitano</li>
              <li>Marca de ropa</li>
              <li>Cantante</li>
              <li>Plan de domingo</li>
              <li>Película</li>
              <li>¿Qué regalar en una boda?</li>
              <li>Marca de alcohol preferida</li>
              <li>Nombre para un perro</li>
              <li>En qué canal se ve el telediario</li>
            </ul>

            <hr style={{ border: 'none', borderTop: '1px solid #cccccc', margin: '1.5rem 0' }} />
            
            <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem', textTransform: 'uppercase' }}>
              Anotaciones
            </div>
            <ul style={{ paddingLeft: '1.5rem', margin: '0 0 1.5rem 0', listStyleType: 'square', lineHeight: '1.8', color: '#000000' }}>
              <li>Humor muy del estilo del S01E07 de Atlanta, el skit sobre el hombre negro que se siente transracial.</li>
              <li>Para la logística, cuando se grabe la recopilación de data en el mercadillo también se pueden pactar los spots publicitarios y grabarlos al momento.</li>
              <li>Recopilar la data en el mercadillo da mucho juego porque se puede interactuar por ahí y que salgan cosas improvisadas.</li>
            </ul>
          </main>
        ) : activeItem.type === 'project' && activeItem.name === 'MAPA INTERACTIVO' ? (
          <main className="custom-page-content" style={{ border: 'none', background: 'transparent', padding: '2rem 0', textAlign: 'left' }}>
            <FolderTree path={[parentType, activeItem.name]} onNavigate={handleNavigate} />
            <hr style={{ border: 'none', borderTop: '1px solid #cccccc', margin: '1.5rem 0' }} />
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', color: '#000000', margin: '0 0 1.5rem 0', maxWidth: 'none', lineHeight: '1.6' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Descripción
              </div>
              <p className="custom-page-text" style={{ maxWidth: 'none', margin: 0, lineHeight: '1.6' }}>
                {activeItem.details}
              </p>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid #cccccc', margin: '1.5rem 0' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', color: '#000000', margin: '0 0 2.5rem 0', maxWidth: 'none', lineHeight: '1.6' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Estética
              </div>
              <p className="custom-page-text" style={{ maxWidth: 'none', margin: 0, lineHeight: '1.6' }}>
                Guía turística, es un suplemento más de la revista UNK.
              </p>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid #cccccc', margin: '2rem 0' }} />

            <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', textTransform: 'uppercase' }}>
              Ejemplos
            </div>
            
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginTop: '1rem' }}>
              <div 
                className="folder-card" 
                style={{ width: '220px', padding: '1.5rem 1rem' }}
                onClick={() => setActiveSubPage({
                  name: 'Samöa Club',
                  details: '',
                  parentName: activeItem.name
                })}
              >
                <div className="folder-icon-wrapper" style={{ marginBottom: '0.75rem' }}>
                  <Folder size={48} strokeWidth={1.5} />
                </div>
                <span className="folder-name" style={{ fontSize: '1rem', fontWeight: 700 }}>Samöa Club</span>
              </div>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid #cccccc', margin: '2rem 0' }} />

            <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', textTransform: 'uppercase' }}>
              Posibles negocios
            </div>

            <ul style={{ paddingLeft: '1.5rem', margin: '0 0 1.5rem 0', listStyleType: 'square', lineHeight: '1.8', color: '#000000' }}>
              <li style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span>Ice Lab</span>
                  <a 
                    href="https://www.tiktok.com/@_1mattiass7_" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    style={{ color: '#000000', display: 'inline-flex', alignItems: 'center' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23.86.03 1.73-.02 2.6.02.01 1.37-.02 2.73.01 4.1-.73-.06-1.46-.24-2.14-.52-.61-.26-1.16-.65-1.61-1.14-.04 2.61.02 5.23-.03 7.84-.04.99-.27 2-.72 2.91-.56.98-1.45 1.75-2.5 2.18-.89.37-1.85.53-2.8.48-1.57-.02-3.13-.6-4.27-1.68-1.12-1.07-1.78-2.61-1.79-4.17-.03-1.62.63-3.23 1.79-4.32 1.1-1.05 2.62-1.63 4.14-1.62.03 1.45-.02 2.9.02 4.35-.61-.05-1.24.11-1.75.46-.54.38-.87.99-.91 1.65-.05.81.33 1.63 1.01 2.06.66.42 1.51.48 2.22.15.65-.28 1.13-.89 1.25-1.58.07-.63.02-1.27.02-1.91 0-3.66.01-7.32.02-10.98.01-.17.02-.33.02-.5z" />
                    </svg>
                  </a>
                </div>
                <span style={{ fontSize: '0.85rem', color: '#666666', marginLeft: '1rem', marginTop: '0.25rem' }}>
                  Podríamos usar sus vasos para nuestros vídeos veraniegos en la piscina
                </span>
              </li>
              
              <li style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span>Zinful</span>
                  <a 
                    href="https://vm.tiktok.com/ZNRvqNRrY/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    style={{ color: '#000000', display: 'inline-flex', alignItems: 'center' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23.86.03 1.73-.02 2.6.02.01 1.37-.02 2.73.01 4.1-.73-.06-1.46-.24-2.14-.52-.61-.26-1.16-.65-1.61-1.14-.04 2.61.02 5.23-.03 7.84-.04.99-.27 2-.72 2.91-.56.98-1.45 1.75-2.5 2.18-.89.37-1.85.53-2.8.48-1.57-.02-3.13-.6-4.27-1.68-1.12-1.07-1.78-2.61-1.79-4.17-.03-1.62.63-3.23 1.79-4.32 1.1-1.05 2.62-1.63 4.14-1.62.03 1.45-.02 2.9.02 4.35-.61-.05-1.24.11-1.75.46-.54.38-.87.99-.91 1.65-.05.81.33 1.63 1.01 2.06.66.42 1.51.48 2.22.15.65-.28 1.13-.89 1.25-1.58.07-.63.02-1.27.02-1.91 0-3.66.01-7.32.02-10.98.01-.17.02-.33.02-.5z" />
                    </svg>
                  </a>
                </div>
                <span style={{ fontSize: '0.85rem', color: '#666666', marginLeft: '1rem', marginTop: '0.25rem' }}>
                  Otro negocio de granizados.
                </span>
              </li>
            </ul>
          </main>
        ) : activeItem.type === 'project' && activeItem.name === 'PRANKS' ? (
          <main className="custom-page-content" style={{ border: 'none', background: 'transparent', padding: '2rem 0', textAlign: 'left' }}>
            <FolderTree path={[parentType, activeItem.name]} onNavigate={handleNavigate} />
            <hr style={{ border: 'none', borderTop: '1px solid #cccccc', margin: '1.5rem 0' }} />
            
            <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', textTransform: 'uppercase' }}>
              POVs
            </div>
            
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginTop: '1rem', marginBottom: '2rem' }}>
              <div 
                className="folder-card" 
                style={{ width: '220px', padding: '1.5rem 1rem' }}
                onClick={() => setActiveSubPage({
                  name: '¿Qué lubricante te gusta más?',
                  details: '',
                  parentName: activeItem.name
                })}
              >
                <div className="folder-icon-wrapper" style={{ marginBottom: '0.75rem' }}>
                  <Folder size={48} strokeWidth={1.5} />
                </div>
                <span className="folder-name" style={{ fontSize: '1rem', fontWeight: 700 }}>¿Qué lubricante te gusta más?</span>
              </div>

              <div 
                className="folder-card" 
                style={{ width: '220px', padding: '1.5rem 1rem' }}
                onClick={() => setActiveSubPage({
                  name: 'Requisitos para ser mi novia',
                  details: '',
                  parentName: activeItem.name
                })}
              >
                <div className="folder-icon-wrapper" style={{ marginBottom: '0.75rem' }}>
                  <Folder size={48} strokeWidth={1.5} />
                </div>
                <span className="folder-name" style={{ fontSize: '1rem', fontWeight: 700 }}>Requisitos para ser mi novia</span>
              </div>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid #cccccc', margin: '2rem 0' }} />

            <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', textTransform: 'uppercase' }}>
              Pranks
            </div>
            <p style={{ fontStyle: 'italic', color: '#666666', margin: '1rem 0 0 0' }}>Esta sección está vacía.</p>
          </main>
        ) : activeItem.type === 'project' && activeItem.name === 'BUNKER' ? (
          <main className="custom-page-content" style={{ border: 'none', background: 'transparent', padding: '2rem 0', textAlign: 'left' }}>
            <FolderTree path={[parentType, activeItem.name]} onNavigate={handleNavigate} />
            <hr style={{ border: 'none', borderTop: '1px solid #cccccc', margin: '1.5rem 0' }} />
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', color: '#000000', margin: '0 0 2.5rem 0', maxWidth: 'none', lineHeight: '1.6' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Descripción
              </div>
              <p className="custom-page-text" style={{ maxWidth: 'none', margin: 0 }}>
                Lugar desde el que UNK gestiona todo. Estética de bunker porque somos las personas que están detrás de una revista que genera polémica y controversia y estamos protegiéndonos y resguardándonos en un sitio seguro. Una pistola dentro de una caja de cristal, luces de emergencia, latas de sopa, NukeColas, un tablero de corcho con fotos unidas por hilos rojos, etc.
              </p>
              <p className="custom-page-text" style={{ maxWidth: 'none', margin: 0 }}>
                Estética de sótano acogedor tipo That 70s Show con cojines, un puff, humo, neverita, un tablero con sus fichas tiradas por la mesa, etc.
              </p>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid #cccccc', margin: '1.5rem 0' }} />
            
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginTop: '2rem' }}>
              <div 
                className="folder-card" 
                style={{ width: '100%', padding: '1.5rem 1rem' }}
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

              <div 
                className="folder-card" 
                style={{ width: '220px', padding: '1.5rem 1rem' }}
                onClick={() => setActiveSubPage({
                  name: 'Plató',
                  details: '',
                  parentName: activeItem.name
                })}
              >
                <div className="folder-icon-wrapper" style={{ marginBottom: '0.75rem' }}>
                  <Folder size={48} strokeWidth={1.5} />
                </div>
                <span className="folder-name" style={{ fontSize: '1rem', fontWeight: 700 }}>Plató</span>
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
                  <Plus size={48} strokeWidth={1.5} />
                </div>
                <span className="folder-name" style={{ fontSize: '1rem', fontWeight: 700 }}>Sponsors</span>
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

      {/* Real Projects Section */}
      <section className="section">
        <h2 className="section-title">PROYECTOS</h2>
        <div className="folders-grid">
          {realProjects.map((project) => (
            <div
              key={project.name}
              className="folder-card"
              onClick={(e) => handleFolderClick(e, project)}
            >
              <div className="folder-icon-wrapper">
                <Folder size={64} strokeWidth={1.5} />
              </div>
              <span className="folder-name">{project.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Formatos Section */}
      <section className="section">
        <h2 className="section-title">FORMATOS</h2>
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
        <h2 className="section-title" style={{ display: 'inline-flex', alignItems: 'center' }}>
          <Youtube size={36} strokeWidth={1.5} />
        </h2>
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

      {isSecretModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 99999,
          padding: '2rem'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            border: '3px solid #000000',
            padding: '2.5rem',
            width: '100%',
            maxWidth: '900px',
            position: 'relative',
            fontFamily: 'Courier New, Courier, monospace',
            color: '#000000',
            boxShadow: '10px 10px 0px #000000'
          }}>
            <button 
              onClick={() => setIsSecretModalOpen(false)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                border: '2px solid #000000',
                backgroundColor: '#ffffff',
                color: '#000000',
                padding: '0.25rem 0.75rem',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontWeight: 'bold',
                fontSize: '0.9rem',
                transition: 'all 0.1s ease-in-out'
              }}
            >
              [ X ]
            </button>

            <div style={{ display: 'flex', gap: '3rem', marginTop: '1rem' }}>
              {/* Left Column */}
              <div style={{ flex: 1, borderRight: '1px dashed #cccccc', paddingRight: '1.5rem' }}>
                <p style={{ margin: 0, whiteSpace: 'pre-line', fontSize: '1rem', lineHeight: '1.8' }}>
                  Me ve entrando en la disco y se me queda mirando{"\n"}
                  Creo que me ha conocido, será uno más de tantos{"\n"}
                  Mierda, quizá eres mi próximo error
                </p>
              </div>

              {/* Right Column */}
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, whiteSpace: 'pre-line', fontSize: '1rem', lineHeight: '1.8', fontStyle: 'italic' }}>
                  Al cruzar yo el umbral del salón de baile, su mirada quedó fija en mi figura{"\n"}
                  Percibo que mi renombre no le es ajeno, mas debe ser otro más entre mi vasta corte de pretendientes{"\n"}
                  ¡Pardiez! Presiento que estáis llamado a ser mi próximo desatino
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
