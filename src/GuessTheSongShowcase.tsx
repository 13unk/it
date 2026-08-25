import React, { useRef } from 'react';
import { Instagram, Youtube, Music2, Grid, CheckCircle2 } from 'lucide-react';
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
      instagram: '13.8K',
      tiktok: '1.1K',
      youtube: '23K',
      total: '37.9K'
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
      instagram: '7.6K',
      tiktok: '123.2K',
      youtube: '5.2K',
      total: '136K'
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
      instagram: '5.1K',
      tiktok: '61.3K',
      youtube: '1K',
      total: '67.4K'
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
      instagram: '3.3K',
      tiktok: '40.5K',
      youtube: '1.4K',
      total: '45.2K'
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
      <header className="showcase-header">
        <h1 className="showcase-title">ADIVINA LA CANCIÓN</h1>
        <p className="showcase-subtitle">
          Un formato de <a href="https://www.instagram.com/unkedition" target="_blank" rel="noopener noreferrer" className="unk-link">UNK EDITION</a>.
        </p>
        <InstagramWidget />
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
    }
  };

  const openLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      className="showcase-video-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="video-wrapper">
        <video 
          ref={videoRef}
          src={video.src + '#t=6.0'} 
          className="showcase-video"
          loop
          muted
          playsInline
        />
      </div>
      
      <div className="video-info">
        <h2 className="chapter-title">{video.title.toUpperCase()}</h2>
        
        <div className="stats-container">
          <div className="total-views">
            <span>Views Totales:</span>
            <span className="total-views-value">{video.stats.total}</span>
          </div>

          <div className="stats-row-horizontal">
            <div className="stat-item instagram" onClick={() => openLink(video.links.instagram)}>
              <Instagram size={18} />
              <span className="stat-value">{video.stats.instagram}</span>
            </div>
            
            <div className="stat-item tiktok" onClick={() => openLink(video.links.tiktok)}>
              <Music2 size={18} />
              <span className="stat-value">{video.stats.tiktok}</span>
            </div>
            
            <div className="stat-item youtube" onClick={() => openLink(video.links.youtube)}>
              <Youtube size={18} />
              <span className="stat-value">{video.stats.youtube}</span>
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
