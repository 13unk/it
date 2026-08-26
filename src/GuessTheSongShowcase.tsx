import React, { useRef } from 'react';
import { Instagram, Youtube, Music2, Grid, CheckCircle2, ChevronDown, VolumeX } from 'lucide-react';
import './GuessTheSongShowcase.css';

interface VideoData {
  id: number;
  title: string;
  src: string;
  stats: {
    instagram: string;
    tiktok: string;
    youtube: string;
    total: string;
  };
  links: {
    instagram: string;
    tiktok: string;
    youtube: string;
  };
}

const videos: VideoData[] = [
  {
    id: 1,
    title: 'Capítulo 1',
    src: '/Reel_1_1080p.mp4',
    stats: {
      instagram: '13.9K',
      tiktok: '1.1K',
      youtube: '23.1K',
      total: '38.1K'
    },
    links: {
      instagram: 'https://www.instagram.com/reel/Db3gyz6t_p0/',
      tiktok: 'https://www.tiktok.com/@tresilllo/video/7672852055253421334',
      youtube: 'https://www.youtube.com/shorts/Z1cGAo7uqWI'
    }
  },
  {
    id: 2,
    title: 'Capítulo 2',
    src: '/Reel_2_1080p.mp4',
    stats: {
      instagram: '7.7K',
      tiktok: '127.4K',
      youtube: '5.2K',
      total: '140.3K'
    },
    links: {
      instagram: 'https://www.instagram.com/reel/Db8V5xmjK9u/',
      tiktok: 'https://www.tiktok.com/@tresilllo/video/7673167825141239062',
      youtube: 'https://www.youtube.com/shorts/SOAUOPNU4iY'
    }
  },
  {
    id: 3,
    title: 'Capítulo 3',
    src: '/Reel_3_1080p.mp4',
    stats: {
      instagram: '5.2K',
      tiktok: '63.4K',
      youtube: '1K',
      total: '69.6K'
    },
    links: {
      instagram: 'https://www.instagram.com/reel/DcJ20EIibxz/',
      tiktok: 'https://www.tiktok.com/@tresilllo/video/7675095464558988566',
      youtube: 'https://www.youtube.com/shorts/UWZiFuCJQoY'
    }
  },
  {
    id: 4,
    title: 'Capítulo 4',
    src: '/Reel_4_1080p.mp4',
    stats: {
      instagram: '3.5K',
      tiktok: '50.5K',
      youtube: '1.8K',
      total: '55.8K'
    },
    links: {
      instagram: 'https://www.instagram.com/reel/DcWsADhjjdA/',
      tiktok: 'https://www.tiktok.com/@tresilllo/video/7676943636063325462',
      youtube: 'https://www.youtube.com/shorts/zKi0q8bxmsI'
    }
  }
];

export const GuessTheSongShowcase: React.FC = () => {
  return (
    <div className="showcase-container">
      {/* Page 1: Brand & IG */}
      <section className="hero-section">
        <h2 className="brand-title">UNK EDITION</h2>
        
        <InstagramWidget />
        
        <div className="scroll-indicator">
          <ChevronDown size={40} />
        </div>
      </section>

      {/* Page 2: Title */}
      <section className="hero-section">
        <p className="presents-text">presenta el formato</p>
        <h1 className="showcase-title">ADIVINA LA CANCIÓN</h1>
        
        <div className="scroll-indicator">
          <ChevronDown size={40} />
        </div>
      </section>

      {/* Videos Section */}
      <section className="videos-section">
        <div className="videos-grid">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </section>
    </div>
  );
};

const AnimatedNumber: React.FC<{ value: string; isVisible: boolean; delay?: number }> = ({ value, isVisible, delay = 0 }) => {
  const [displayValue, setDisplayValue] = React.useState('0');
  const [suffix, setSuffix] = React.useState('');

  React.useEffect(() => {
    if (!isVisible) {
      setDisplayValue('0');
      return;
    }

    const match = value.match(/^([\d.]+)(.*)$/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const endNum = parseFloat(match[1]);
    const suff = match[2];
    setSuffix(suff);
    const isFloat = match[1].includes('.');

    let startTimestamp: number | null = null;
    let timeoutId: number;
    let rafId: number;

    const duration = 1500; // 1.5s animation

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3); // cubic ease out
      
      const current = easeProgress * endNum;
      setDisplayValue(isFloat ? current.toFixed(1) : Math.round(current).toString());
      
      if (progress < 1) {
        rafId = window.requestAnimationFrame(step);
      } else {
        setDisplayValue(match[1]); // Ensure exact end value
      }
    };

    timeoutId = window.setTimeout(() => {
      rafId = window.requestAnimationFrame(step);
    }, delay);

    return () => {
      window.clearTimeout(timeoutId);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [value, isVisible, delay]);

  return <span>{displayValue}{suffix}</span>;
};

const VideoCard: React.FC<{ video: VideoData }> = ({ video }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | ReturnType<typeof setTimeout>>();
  const [isVisible, setIsVisible] = React.useState(false);
  
  // Determinamos si es móvil al cargar para evitar cargar la miniatura de 6s en móvil
  const isMobile = typeof window !== 'undefined' ? window.innerWidth <= 600 : false;
  
  // Mute overlay and state
  const [isMuted, setIsMuted] = React.useState(true);
  const [showMuteOverlay, setShowMuteOverlay] = React.useState(false);
  const [isFadingOutMute, setIsFadingOutMute] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        
        // Autoplay logic on scroll ONLY for mobile
        if (window.innerWidth <= 600) {
          if (entry.isIntersecting) {
            timeoutRef.current = window.setTimeout(() => {
              if (videoRef.current) {
                // Ensure it plays from 0
                if (videoRef.current.currentTime !== 0) {
                  videoRef.current.currentTime = 0;
                }
                videoRef.current.muted = true;
                setIsMuted(true);
                setShowMuteOverlay(true);
                setIsFadingOutMute(false);
                const p = videoRef.current.play();
                if (p !== undefined) p.catch(() => {});
                // En móvil empieza en blanco y negro hasta desmutear
                videoRef.current.style.filter = 'grayscale(100%)';
              }
            }, 100); // Super responsive timeout
          } else {
            window.clearTimeout(timeoutRef.current);
            if (videoRef.current) {
              videoRef.current.pause();
              // En móvil lo devolvemos a 0 en lugar de 6s para evitar parpadeos
              videoRef.current.currentTime = 0; 
              videoRef.current.style.filter = 'grayscale(100%)';
            }
            // Reset states
            setIsMuted(true);
            setShowMuteOverlay(false);
            setIsFadingOutMute(false);
          }
        } else {
          // Desktop: Pause video if user scrolls far away while it was playing
          if (!entry.isIntersecting && videoRef.current && !videoRef.current.paused) {
            videoRef.current.pause();
            videoRef.current.currentTime = 6.0;
            videoRef.current.muted = true;
            videoRef.current.style.filter = 'grayscale(100%)';
            setIsMuted(true);
            setShowMuteOverlay(false);
            setIsFadingOutMute(false);
          }
        }
      },
      { threshold: 0.6 } // Trigger when 60% of the card is visible
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    return () => {
      observer.disconnect();
      window.clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    if (window.innerWidth > 600 && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.muted = true; // Siempre iniciar muteado
      setIsMuted(true);
      setShowMuteOverlay(true);
      setIsFadingOutMute(false);
      const p = videoRef.current.play();
      if (p !== undefined) p.catch(() => {});
      // En desktop, al hacer hover sí que ponemos el color directamente
      videoRef.current.style.filter = 'grayscale(0%)';
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth > 600 && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 6.0;
      videoRef.current.muted = true;
      videoRef.current.style.filter = 'grayscale(100%)';
      setIsMuted(true);
      setShowMuteOverlay(false);
      setIsFadingOutMute(false);
    }
  };

  const handleUnmute = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evitar otros clics
    if (videoRef.current) {
      videoRef.current.muted = false; // Desmutear
      setIsMuted(false);
      setIsFadingOutMute(true); // Iniciar animación de desaparición
      
      // En móvil, la transición a color ocurre AQUÍ
      videoRef.current.style.filter = 'grayscale(0%)';

      setTimeout(() => {
        setShowMuteOverlay(false); // Eliminar del DOM después de 1 segundo
      }, 1000);
    }
  };

  const openLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div ref={cardRef} className="showcase-video-card">
      <div className="card-header">
        <h2 className="chapter-title">{video.title.toUpperCase()}</h2>
      </div>
      
      <div 
        className={`video-wrapper ${!isMuted ? 'hide-cursor' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <video 
          ref={videoRef}
          src={isMobile ? video.src : video.src + '#t=6.0'} 
          className="showcase-video"
          loop
          muted
          playsInline
        />
        {showMuteOverlay && (
          <div 
            className={`mute-icon-overlay ${isFadingOutMute ? 'fade-out' : ''}`}
            onClick={handleUnmute}
          >
            <VolumeX size={32} />
          </div>
        )}
      </div>
      
      <div className="video-info">
        <div className="stats-container">
          <div className={`total-views fade-in-element ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '0.1s' }}>
            <span>Views Totales:</span>
            <span className="total-views-value">
              <AnimatedNumber value={video.stats.total} isVisible={isVisible} delay={100} />
            </span>
          </div>

          <div className={`stats-row-horizontal fade-in-element ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '0.4s' }}>
            <div className="stat-item instagram" onClick={() => openLink(video.links.instagram)}>
              <Instagram size={18} />
              <span className="stat-value">
                <AnimatedNumber value={video.stats.instagram} isVisible={isVisible} delay={400} />
              </span>
            </div>
            
            <div className="stat-item tiktok" onClick={() => openLink(video.links.tiktok)}>
              <Music2 size={18} />
              <span className="stat-value">
                <AnimatedNumber value={video.stats.tiktok} isVisible={isVisible} delay={400} />
              </span>
            </div>
            
            <div className="stat-item youtube" onClick={() => openLink(video.links.youtube)}>
              <Youtube size={18} />
              <span className="stat-value">
                <AnimatedNumber value={video.stats.youtube} isVisible={isVisible} delay={400} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InstagramWidget: React.FC = () => {
  return (
    <div className="ig-widget">
      <div className="ig-widget-header">
        <div className="ig-avatar">
          <img src="/instagram_pfp.jpg" alt="UNK EDITION" />
        </div>
        <div className="ig-info">
          <div className="ig-username">
            unkedition <CheckCircle2 size={16} color="#38bdf8" fill="#ffffff" style={{marginLeft: '4px'}} />
          </div>
          <div className="ig-stats">
            <span><strong>205</strong> posts</span>
            <span><strong>56.4K</strong> followers</span>
            <span><strong>17</strong> following</span>
          </div>
          <div className="ig-bio">
            🫟 INCLASIFICABLE 🫟<br/>
            • • Least obvious psyop • •
          </div>
        </div>
      </div>
      <div className="ig-tabs">
        <div className="ig-tab active"><Grid size={16} /> POSTS</div>
      </div>
      <div className="ig-grid">
        <div className="ig-grid-item">
          <img src="/859.png" alt="Post 1" className="ig-grid-img" />
        </div>
        <div className="ig-grid-item">
          <img src="/848.png" alt="Post 2" className="ig-grid-img" />
        </div>
        <div className="ig-grid-item">
          <img src="/841.png" alt="Post 3" className="ig-grid-img" />
        </div>
      </div>
    </div>
  );
};
