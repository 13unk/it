import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Crown } from 'lucide-react';
import './DJGame.css';

type Track = {
  id: string;
  name: string;
  title: string;
  artist: string;
  stems: string[];
};

const TRACKS: Track[] = [
  {
    id: 'track1',
    name: 'TRACK 1',
    title: 'FE!N',
    artist: 'Travis Scott\nft. Playboi Carti',
    stems: ['/stems/fein1.mp3', '/stems/fein2.mp3', '/stems/fein3.mp3', '/stems/fein4.mp3']
  },
  {
    id: 'track2',
    name: 'TRACK 2',
    title: 'BnB',
    artist: 'Young Miko\nft. Clarent',
    stems: ['/stems/bnb1.mp3', '/stems/bnb2.mp3', '/stems/bnb3.mp3', '/stems/bnb4.mp3']
  }
];

export const DJGame: React.FC = () => {
  const [selectedTrackId, setSelectedTrackId] = useState<string>('track1');
  const activeTrack = TRACKS.find(t => t.id === selectedTrackId) || TRACKS[0];
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [currentLevel, setCurrentLevel] = useState<1 | 2 | 3 | 4 | null>(null);
  const [unlockedLevel, setUnlockedLevel] = useState<1 | 2 | 3>(1);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [isResolved, setIsResolved] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Web Audio API refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const buffersRef = useRef<(AudioBuffer | null)[]>([null, null, null, null]);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  
  // Playback timing refs
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const activeDurationRef = useRef<number>(0);

  // Load and decode all 4 stems using Web Audio API
  useEffect(() => {
    setIsLoaded(false);
    setLoadingProgress(0);
    setIsResolved(false);
    setCurrentLevel(null);
    setUnlockedLevel(1);
    setProgress(0);

    if (sourceRef.current) {
      try { sourceRef.current.stop(); } catch(e) {}
    }

    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = audioCtxRef.current || new AudioContextClass();
    audioCtxRef.current = ctx;

    const urls = activeTrack.stems;

    let loadedCount = 0;

    const loadTrack = async (url: string, index: number) => {
      try {
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
        buffersRef.current[index] = audioBuffer;
        
        loadedCount++;
        setLoadingProgress(Math.round((loadedCount / urls.length) * 100));
        
        if (loadedCount === urls.length) {
          setIsLoaded(true);
        }
      } catch (err) {
        console.error(`Error loading or decoding stem ${index + 1}:`, err);
      }
    };

    urls.forEach((url, i) => loadTrack(url, i));

    return () => {
      // Don't close the audio context here so it can be reused on track switch
      if (sourceRef.current) {
        try { sourceRef.current.stop(); } catch(e) {}
      }
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [activeTrack.stems]);

  // Update volume live
  useEffect(() => {
    if (gainRef.current && audioCtxRef.current) {
      gainRef.current.gain.setValueAtTime(volume, audioCtxRef.current.currentTime);
    }
  }, [volume]);

  const playTrack = async (level: 1 | 2 | 3 | 4) => {
    if (!audioCtxRef.current || !isLoaded) return;
    const ctx = audioCtxRef.current;
    
    if (ctx.state === 'suspended') {
      await ctx.resume();
    }
    
    // Stop currently playing
    if (sourceRef.current) {
      sourceRef.current.onended = null;
      try { sourceRef.current.stop(); } catch (e) {}
    }
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    setProgress(0);

    const buffer = buffersRef.current[level - 1];
    if (!buffer) return;

    // Create source
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = false;
    
    const gainNode = ctx.createGain();
    gainNode.gain.value = volume;
    
    source.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    source.start(ctx.currentTime);
    sourceRef.current = source;
    gainRef.current = gainNode;
    
    startTimeRef.current = ctx.currentTime;
    activeDurationRef.current = buffer.duration;
    
    setCurrentLevel(level);
    
    // Advance unlocked level if needed
    if (level === 1 && unlockedLevel < 2) setUnlockedLevel(2);
    if (level === 2 && unlockedLevel < 3) setUnlockedLevel(3);
    
    // Update progress loop
    const updateProgress = () => {
      if (!audioCtxRef.current) return;
      const elapsed = audioCtxRef.current.currentTime - startTimeRef.current;
      const percent = Math.min((elapsed / activeDurationRef.current) * 100, 100);
      setProgress(percent);
      
      if (percent < 100) {
        animationFrameRef.current = requestAnimationFrame(updateProgress);
      } else {
        setProgress(0);
        setCurrentLevel(null);
      }
    };
    
    animationFrameRef.current = requestAnimationFrame(updateProgress);
  };

  const handleResolve = () => {
    if (isResolved || !audioCtxRef.current || !isLoaded) return;
    setIsResolved(true);
    playTrack(4);
  };

  return (
    <div className="dj-game-container glass-brutalist">
      {/* Track Selector Sidebar */}
      <div className={`track-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <button 
          className="sidebar-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? '◀' : '▶'}
        </button>
        <div className="sidebar-content">
          <div className="track-list">
            {TRACKS.map(track => (
              <button
                key={track.id}
                className={`track-item-btn ${selectedTrackId === track.id ? 'active' : ''}`}
                onClick={() => {
                  setSelectedTrackId(track.id);
                  setSidebarOpen(false);
                }}
              >
                {track.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lava Lamp Background */}
      <div className="lava-background">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
        <div className="blob blob-4"></div>
        <div className="blob blob-5"></div>
        <div className="blob blob-6"></div>
        <div className="blob blob-7"></div>
        <div className="blob blob-8"></div>
        <div className="blob blob-9"></div>
        <div className="blob blob-10"></div>
        <div className="blob blob-11"></div>
        <div className="blob blob-12"></div>
        <div className="blob blob-13"></div>
        <div className="blob blob-14"></div>
        <div className="blob blob-15"></div>
        <div className="blob blob-16"></div>
        <div className="blob blob-17"></div>
        <div className="blob blob-18"></div>
        <div className="blob blob-19"></div>
        <div className="blob blob-20"></div>
      </div>

      {/* Top Header Controls */}
      <div className="dj-header-controls">
        <div className="dj-volume-glass">
          <Volume2 size={16} color="#8892b0" />
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.05" 
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="volume-slider-mini glass" 
          />
        </div>
      </div>

      {!isLoaded ? (
        <div className="glass-loader">
          <div className="loader-title">CARGANDO CANALES...</div>
          <div className="glass-progress-track">
            <div className="glass-progress-fill" style={{ width: `${loadingProgress}%` }}></div>
          </div>
          <div className="loader-meta">{loadingProgress}%</div>
        </div>
      ) : (
        <div className="panels-wrapper">
          <div className="glass-deck">
            <div className="glass-controls-grid">
              <div className="level-buttons-container">
                {[1, 2, 3].map((level) => {
                  const numLevel = level as 1 | 2 | 3;
                  const isActive = currentLevel === numLevel;
                  const isUnlocked = numLevel <= unlockedLevel;
                  const progressWidth = isActive ? `${progress}%` : '0%';
                  
                  return (
                    <button 
                      key={level}
                      className={`glass-level-btn ${isActive ? 'active' : ''} ${!isUnlocked ? 'locked' : ''}`}
                      onClick={() => playTrack(numLevel)}
                      disabled={isResolved || !isUnlocked}
                    >
                      <div 
                        className="btn-progress-fill" 
                        style={{ 
                          width: progressWidth,
                          backgroundColor: 'rgba(168, 85, 247, 0.2)'
                        }}
                      ></div>
                      <span className="btn-text">Nivel {level}</span>
                    </button>
                  );
                })}
                
                <button 
                  className={`flip-card-button ${isResolved ? 'resolved' : ''}`}
                  onClick={handleResolve}
                  disabled={isResolved || !isLoaded}
                  title="Resolver"
                >
                  <div className="flip-card-inner">
                    <div className="glass-level-btn flip-card-front">
                      <Crown size={36} color={isResolved ? '#a855f7' : '#888'} />
                    </div>
                    <div className="glass-level-btn flip-card-back">
                      <div className="pad-song-title">{activeTrack.title}</div>
                      <div className="pad-artist-name">
                        {activeTrack.artist.split('\n').map((line, i) => (
                          <React.Fragment key={i}>
                            {line}
                            {i === 0 && <br />}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </div>
                </button>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DJGame;
