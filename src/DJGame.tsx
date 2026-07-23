import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Crown, Disc } from 'lucide-react';
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
    stems: [
      '/stems/1 Travis Scott - Fein/1.mp3',
      '/stems/1 Travis Scott - Fein/2.mp3',
      '/stems/1 Travis Scott - Fein/3.mp3',
      '/stems/1 Travis Scott - Fein/4.mp3'
    ]
  },
  {
    id: 'track2',
    name: 'TRACK 2',
    title: 'BnB',
    artist: 'Young Miko\nft. Clarent',
    stems: [
      '/stems/2 Young Miko - BnB/1.mp3',
      '/stems/2 Young Miko - BnB/2.mp3',
      '/stems/2 Young Miko - BnB/3.mp3',
      '/stems/2 Young Miko - BnB/4.mp3'
    ]
  },
  {
    id: 'track3',
    name: 'TRACK 3',
    title: 'QLOO',
    artist: 'Young Cister',
    stems: [
      '/stems/3 Young Cister - QLOO/1.mp3',
      '/stems/3 Young Cister - QLOO/2.mp3',
      '/stems/3 Young Cister - QLOO/3.mp3',
      '/stems/3 Young Cister - QLOO/4.mp3'
    ]
  },
  {
    id: 'track4',
    name: 'TRACK 4',
    title: 'La Plena',
    artist: 'Beéle',
    stems: [
      '/stems/4 Beéle - La Plena/1.mp3',
      '/stems/4 Beéle - La Plena/2.mp3',
      '/stems/4 Beéle - La Plena/3.mp3',
      '/stems/4 Beéle - La Plena/4.mp3'
    ]
  },
  {
    id: 'track5',
    name: 'TRACK 5',
    title: 'De Lejitos',
    artist: 'Jay Wheeler',
    stems: [
      '/stems/5 Jay Wheeler - De Lejitos/1.mp3',
      '/stems/5 Jay Wheeler - De Lejitos/2.mp3',
      '/stems/5 Jay Wheeler - De Lejitos/3.mp3',
      '/stems/5 Jay Wheeler - De Lejitos/4.mp3'
    ]
  },
  {
    id: 'track6',
    name: 'TRACK 6',
    title: 'Amanece',
    artist: 'Anuel AA',
    stems: [
      '/stems/6 Anuel AA - Amanece/1.mp3',
      '/stems/6 Anuel AA - Amanece/2.mp3',
      '/stems/6 Anuel AA - Amanece/3.mp3',
      '/stems/6 Anuel AA - Amanece/4.mp3'
    ]
  },
  {
    id: 'track7',
    name: 'TRACK 7',
    title: 'Adivino',
    artist: 'Myke Towers',
    stems: [
      '/stems/7 Myke Towers - Adivino/1.mp3',
      '/stems/7 Myke Towers - Adivino/2.mp3',
      '/stems/7 Myke Towers - Adivino/3.mp3',
      '/stems/7 Myke Towers - Adivino/4.mp3'
    ]
  },
  {
    id: 'track8',
    name: 'TRACK 8',
    title: 'Ginza',
    artist: 'J Balvin',
    stems: [
      '/stems/8 J Balvin - Ginza/1.mp3',
      '/stems/8 J Balvin - Ginza/2.mp3',
      '/stems/8 J Balvin - Ginza/3.mp3',
      '/stems/8 J Balvin - Ginza/4.mp3'
    ]
  },
  {
    id: 'track9',
    name: 'TRACK 9',
    title: "Don't Stop The Music",
    artist: 'Rihanna',
    stems: [
      "/stems/9 Rihanna - Don't Stop The Music/1.mp3",
      "/stems/9 Rihanna - Don't Stop The Music/2.mp3",
      "/stems/9 Rihanna - Don't Stop The Music/3.mp3",
      "/stems/9 Rihanna - Don't Stop The Music/4.mp3"
    ]
  },
  {
    id: 'track10',
    name: 'TRACK 10',
    title: 'Suavemente',
    artist: 'Elvis Crespo',
    stems: [
      '/stems/10 Elvis Crespo - Suavemente/1.mp3',
      '/stems/10 Elvis Crespo - Suavemente/2.mp3',
      '/stems/10 Elvis Crespo - Suavemente/3.mp3',
      '/stems/10 Elvis Crespo - Suavemente/4.mp3'
    ]
  },
  {
    id: 'track11',
    name: 'TRACK 11',
    title: "Po' Encima",
    artist: 'Arcángel',
    stems: [
      "/stems/11 Arcángel - Po' Encima/1.mp3",
      "/stems/11 Arcángel - Po' Encima/2.mp3",
      "/stems/11 Arcángel - Po' Encima/3.mp3",
      "/stems/11 Arcángel - Po' Encima/4.mp3"
    ]
  }
];

export const DJGame: React.FC = () => {
  const [selectedTrackId, setSelectedTrackId] = useState<string>('track1');
  const activeTrack = TRACKS.find(t => t.id === selectedTrackId) || TRACKS[0];
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [currentLevel, setCurrentLevel] = useState<1 | 2 | 3 | 4 | null>(null);
  const [unlockedLevel, setUnlockedLevel] = useState<1 | 2 | 3>(1);
  const [finishedLevels, setFinishedLevels] = useState<number[]>([]);
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
  const resolveClickedRef = useRef<boolean>(false);

  // Load and decode all 4 stems using Web Audio API
  useEffect(() => {
    setIsLoaded(false);
    setLoadingProgress(0);
    setIsResolved(false);
    resolveClickedRef.current = false;
    setCurrentLevel(null);
    setUnlockedLevel(1);
    setFinishedLevels([]);
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
    if (currentLevel === level) return;
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
        setFinishedLevels(prev => [...new Set([...prev, level])]);
        setCurrentLevel(null);
        if (level === 4) {
          setIsResolved(false);
          resolveClickedRef.current = false;
        }
      }
    };
    
    animationFrameRef.current = requestAnimationFrame(updateProgress);
  };

  const handleResolve = () => {
    if (resolveClickedRef.current || isResolved || !audioCtxRef.current || !isLoaded) return;
    resolveClickedRef.current = true;
    setIsResolved(true);
    playTrack(4);
  };

  return (
    <div className="dj-game-container glass-brutalist">
      {/* Track Selector Dropdown */}
      <div className="track-dropdown-container">
        <button 
          className="track-item-btn dropdown-toggle" 
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Disc size={20} color="#fff" />
          <span>{activeTrack.name}</span>
        </button>

        <div className={`track-dropdown-menu ${sidebarOpen ? 'open' : ''}`}>
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
                  const isFinished = finishedLevels.includes(numLevel);
                  const progressWidth = isActive ? `${progress}%` : isFinished ? '100%' : '0%';
                  
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

      {/* Footer Logo */}
      <img src="/unklogo.png" alt="UNK Logo" className="footer-logo" />
    </div>
  );
};

export default DJGame;
