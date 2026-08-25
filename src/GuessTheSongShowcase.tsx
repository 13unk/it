import React, { useRef } from 'react';
import { Instagram, Youtube, Music2, Play } from 'lucide-react';
import './GuessTheSongShowcase.css';

interface VideoData {
  id: number;
  title: string;
  src: string;
  stats: {
    instagram: string;
    tiktok: string;
    youtube: string;
  };
}

const videos: VideoData[] = [
  {
    id: 1,
    title: 'Capítulo 1',
    src: '/Reel 1 1080p.mp4',
    stats: {
      instagram: '1.2M',
      tiktok: '2.5M',
      youtube: '800K'
    }
  },
  {
    id: 2,
    title: 'Capítulo 2',
    src: '/Reel 2 1080p.mp4',
    stats: {
      instagram: '850K',
      tiktok: '1.8M',
      youtube: '620K'
    }
  },
  {
    id: 3,
    title: 'Capítulo 3',
    src: '/Reel 3 1080p.mp4',
    stats: {
      instagram: '2.1M',
      tiktok: '4.2M',
      youtube: '1.5M'
    }
  },
  {
    id: 4,
    title: 'Capítulo 4',
    src: '/Reel 4 1080p.mp4',
    stats: {
      instagram: '950K',
      tiktok: '1.1M',
      youtube: '410K'
    }
  }
];

export const GuessTheSongShowcase: React.FC = () => {
  return (
    <div className="showcase-container">
      <header className="showcase-header">
        <h1 className="showcase-title">¿PUEDES ADIVINAR LA CANCIÓN?</h1>
        <p className="showcase-subtitle">
          Serie producida por UNK. Pasa el ratón por encima de cada vídeo para reproducirlo.
        </p>
      </header>

      <div className="videos-grid">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
};

const VideoCard: React.FC<{ video: VideoData }> = ({ video }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(e => console.log('Autoplay prevented:', e));
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      // Optionally reset to beginning
      // videoRef.current.currentTime = 0; 
    }
  };

  return (
    <div 
      className="video-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="video-wrapper">
        <video 
          ref={videoRef}
          src={video.src} 
          className="showcase-video"
          loop
          muted
          playsInline
        />
        <div className="play-hint">
          <Play size={16} fill="currentColor" /> Reproducir
        </div>
      </div>
      
      <div className="video-info">
        <h2 className="chapter-title">{video.title}</h2>
        
        <div className="stats-container">
          <div className="stat-row instagram">
            <div className="stat-icon">
              <Instagram size={18} />
            </div>
            <span>Instagram:</span>
            <span className="stat-value">{video.stats.instagram}</span>
          </div>
          
          <div className="stat-row tiktok">
            <div className="stat-icon">
              <Music2 size={18} />
            </div>
            <span>TikTok:</span>
            <span className="stat-value">{video.stats.tiktok}</span>
          </div>
          
          <div className="stat-row youtube">
            <div className="stat-icon">
              <Youtube size={18} />
            </div>
            <span>Shorts:</span>
            <span className="stat-value">{video.stats.youtube}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
