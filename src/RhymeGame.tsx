import React, { useState, useEffect, useRef } from 'react';
import { Play, ChevronLeft, ChevronRight, Disc, Shuffle } from 'lucide-react';
import './RhymeGame.css';

const BEATS = [
  {
    title: 'Get It',
    titleUrl: 'https://www.youtube.com/watch?v=xbqGwPRwJFc',
    artist: 'Fat Cat Beats',
    artistUrl: 'https://www.youtube.com/@fatcatbeats',
    bpm: 89,
    introRows: 4,
    file: '/Beats/Get It - Fat Cat Beats - 89BPM.mp3'
  },
  {
    title: 'Jutsu',
    titleUrl: 'https://www.youtube.com/watch?v=XeMUZg2uTT8',
    artist: 'Atom Child',
    artistUrl: 'https://www.youtube.com/@PRODBYATOMCHILD',
    bpm: 140,
    gameBpm: 70,
    introRows: 4,
    file: '/Beats/Jutsu - Atom Child - 140BPM.mp3'
  }
];
import './RhymeGame.css';

const BASE_WORDS = [
  ['', '', '', 'mente'],
  ['', '', '', 'frente'],
  ['', '', '', 'camino'],
  ['', '', '', 'destino'],
  ['', '', '', 'fuego'],
  ['', '', '', 'juego'],
  ['', '', '', 'suerte'],
  ['', '', '', 'fuerte'],
  ['', '', '', 'corazón'],
  ['', '', '', 'razón'],
  ['', '', '', 'pasado'],
  ['', '', '', 'lado'],
  ['', '', '', 'cielo'],
  ['', '', '', 'vuelo'],
  ['', '', '', 'sueño'],
  ['', '', '', 'dueño'],
];

function shufflePairs(words: string[][]) {
  const pairs = [];
  for (let i = 0; i < words.length; i += 2) {
    pairs.push([words[i], words[i + 1]]);
  }
  for (let i = pairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
  }
  return pairs.flat();
}

function getInitialWords(beatIndex: number, limit: number) {
  const beat = BEATS[beatIndex];
  const introCount = beat.introRows || 0;
  const intros = Array.from({ length: introCount }, () => [null, null, null, null]);
  const words = [
    ...shufflePairs(BASE_WORDS), 
    ...shufflePairs(BASE_WORDS), 
    ...shufflePairs(BASE_WORDS)
  ].slice(0, limit);
  const outros = [[null, null, null, null]];
  return [...intros, ...words, ...outros];
}


export const RhymeGame: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentBeatIndex, setCurrentBeatIndex] = useState(0);
  const [currentRow, setCurrentRow] = useState(0);
  const [currentCol, setCurrentCol] = useState(-1);
  const [wordLimit, setWordLimit] = useState(20);
  const [gameWords, setGameWords] = useState<(string | null)[][]>(() => getInitialWords(0, 20));
  const [isFadingOut, setIsFadingOut] = useState(false);
  const timerRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const cassetteRef = useRef<HTMLAudioElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [scale, setScale] = useState(1.2);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  const [useChromaKey, setUseChromaKey] = useState(false);
  const chromaTimeoutRef = useRef<number | null>(null);

  const handleBpmPointerDown = () => {
    chromaTimeoutRef.current = window.setTimeout(() => {
      setUseChromaKey(prev => !prev);
    }, 3000);
  };

  const handleBpmPointerUpOrLeave = () => {
    if (chromaTimeoutRef.current) {
      clearTimeout(chromaTimeoutRef.current);
      chromaTimeoutRef.current = null;
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      setIsMobile(screenWidth <= 768);
      const desiredBase = 750;
      
      if (screenWidth < desiredBase * 1.2) {
        // scale down to fit screen width with a small 10px padding on each side
        const newScale = (screenWidth - 20) / desiredBase;
        setScale(newScale);
      } else {
        setScale(1.2);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // exactly 3 seconds to complete the simulation animation
    return () => clearTimeout(timer);
  }, []);

  const currentBeat = BEATS[currentBeatIndex];
  const bpm = currentBeat.bpm;
  const effectiveBpm = (currentBeat as any).gameBpm || currentBeat.bpm;
  const intervalMs = (60 / effectiveBpm) * 1000;

  const cycleWordLimit = () => {
    if (isPlaying) return;
    setWordLimit((prev) => (prev === 32 ? 8 : prev + 4));
  };
  const fillPercentage = (wordLimit / 4 - 1) * 12.5;

  // Fixed limit is handled by getInitialWords, so we don't append words anymore

  useEffect(() => {
    if (isPlaying) {
      if (currentCol === -1) {
        setCurrentCol(0);
      }
      
      timerRef.current = window.setInterval(() => {
        setCurrentCol((prev) => {
          if (prev >= 3) {
            setCurrentRow((r) => r + 1);
            return 0;
          }
          return prev + 1;
        });
      }, intervalMs);

      if (audioRef.current && audioRef.current.paused && !isFadingOut) {
        audioRef.current.play().catch(e => console.log('Audio play error', e));
      }
    } else if (!isFadingOut) {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, effectiveBpm, isFadingOut]);

  useEffect(() => {
    const beat = BEATS[currentBeatIndex];
    const introCount = beat.introRows || 0;
    const fadeOutRow = introCount + wordLimit;

    if (currentRow === fadeOutRow && isPlaying && !isFadingOut) {
      setIsFadingOut(true);
    }

    if (currentRow >= gameWords.length && isPlaying) {
      setIsPlaying(false);
    }
  }, [currentRow, isPlaying, isFadingOut, currentBeatIndex, gameWords.length]);

  useEffect(() => {
    if (isFadingOut && audioRef.current) {
      const audio = audioRef.current;
      const totalFadeTime = intervalMs * 4;
      const steps = 20;
      const fadeIntervalMs = totalFadeTime / steps;

      const fadeInterval = setInterval(() => {
        if (audio.volume > 0.05) {
          audio.volume -= 0.05;
        } else {
          audio.pause();
          audio.volume = 1;
          setIsFadingOut(false);
          clearInterval(fadeInterval);
        }
      }, fadeIntervalMs);
      return () => clearInterval(fadeInterval);
    }
  }, [isFadingOut, intervalMs]);

  // Restart game & audio if beat changes
  useEffect(() => {
    setCurrentRow(0);
    setCurrentCol(-1);
    setIsFadingOut(false);
    setGameWords(getInitialWords(currentBeatIndex, wordLimit));
    
    if (audioRef.current) {
      audioRef.current.volume = 1;
      audioRef.current.currentTime = 0;
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log('Audio play error', e));
      }
    }
  }, [currentBeatIndex, wordLimit]);

  const togglePlay = () => {
    if (!isPlaying) {
      if (currentRow >= gameWords.length - 1 && currentCol >= 3) {
        setCurrentRow(0);
        setCurrentCol(-1);
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.volume = 1;
        }
      }
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  };

  const prevBeat = () => {
    setIsPlaying(false);
    if (cassetteRef.current) {
      cassetteRef.current.currentTime = 0;
      cassetteRef.current.play().catch(e => console.log('Cassette play error', e));
    }
    setCurrentBeatIndex((prev) => (prev === 0 ? BEATS.length - 1 : prev - 1));
  };

  const nextBeat = () => {
    setIsPlaying(false);
    if (cassetteRef.current) {
      cassetteRef.current.currentTime = 0;
      cassetteRef.current.play().catch(e => console.log('Cassette play error', e));
    }
    setCurrentBeatIndex((prev) => (prev === BEATS.length - 1 ? 0 : prev + 1));
  };

  const randomBeat = () => {
    setIsPlaying(false);
    if (cassetteRef.current) {
      cassetteRef.current.currentTime = 0;
      cassetteRef.current.play().catch(e => console.log('Cassette play error', e));
    }
    setCurrentBeatIndex((prev) => {
      if (BEATS.length <= 1) return prev;
      let next;
      do {
        next = Math.floor(Math.random() * BEATS.length);
      } while (next === prev);
      return next;
    });
  };

  if (isLoading) {
    return (
      <div className="rhyme-loader-screen">
        <div className="rhyme-loader-container">
          <div className="jukebox-arch" style={{ marginBottom: '40px', padding: '20px 40px' }}>
            <div className="neon-tube"></div>
            <div className="rhyme-header">
              <h1>¡RIMA COMO PUEDAS!</h1>
            </div>
          </div>
          <div className="rhyme-loader-simulation">
            <div className="loader-block">
              <div className="loader-progress-bar bar-1" />
              <span className="loader-dot"></span>
            </div>
            <div className="loader-block">
              <div className="loader-progress-bar bar-2" />
              <span className="loader-dot"></span>
            </div>
            <div className="loader-block">
              <div className="loader-progress-bar bar-3" />
              <span className="loader-dot"></span>
            </div>
            <div className="loader-block">
              <div className="loader-progress-bar bar-4" />
              <span className="loader-dot"></span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`rhyme-game-container ${useChromaKey ? 'chroma-mode' : ''}`}>
      
      <div className="jukebox-body" style={{ transform: `scale(${scale})`, transformOrigin: 'center center' }}>
        <div className="jukebox-arch">
          <div className="neon-tube"></div>
          <div className="rhyme-header">
            <h1>RIMA COMO PUEDAS</h1>
          </div>
        </div>

        <div className="jukebox-center">
          <div className="rhyme-game-area">
            <div className="rhyme-grid-viewport" style={{ width: '100%', height: '300px', overflow: 'hidden', position: 'relative', padding: '5px' }}>
              <div 
                className="rhyme-grid"
                style={{
                  transform: `translateY(-${currentRow * 65}px)`,
                  transition: `transform ${intervalMs * 0.8}ms cubic-bezier(0.25, 1, 0.5, 1)`
                }}
              >
                {gameWords.map((row, rIndex) => {
                  const beat = BEATS[currentBeatIndex];
                  const introCount = beat.introRows || 0;
                  const isWaitLine = row[3] === null;
                  const gameRowIndex = rIndex - introCount;
                  const isRhymeA = Math.floor(Math.max(0, gameRowIndex) / 2) % 2 === 0;
                  const colorClass = isRhymeA ? 'rhyme-color-a' : 'rhyme-color-b';
                  const rowTypeClass = isWaitLine ? 'intro-row' : colorClass;
                  
                  const isPast = rIndex < currentRow - 1;
                  const isPastBlurred = rIndex === currentRow - 1;
                  const isFutureBlurred = rIndex === currentRow + 4;
                  const isGameFinished = !isPlaying && currentRow >= gameWords.length;
                  const isOutroRow = rIndex === gameWords.length - 1;

                  return (
                    <div 
                      key={rIndex} 
                      className={`rhyme-row ${isPast ? 'fade-out-up' : ''} ${isPastBlurred || isFutureBlurred ? 'blur-row' : ''} ${rowTypeClass}`}
                      style={isGameFinished && isOutroRow ? { opacity: 0, transition: 'opacity 1.5s ease 0.5s' } : {}}
                    >
                      {row.map((word, cIndex) => {
                        const isPastBlock = rIndex < currentRow || (rIndex === currentRow && cIndex < currentCol);
                        const isCurrentBlock = rIndex === currentRow && cIndex === currentCol;
                        const isBlockFilling = isPastBlock || isCurrentBlock;
                        const isIntroBlock = word === null;
                        const displayWord = word || '';
                        return (
                          <div 
                            key={cIndex} 
                            className={`rhyme-block ${word ? `rhyme-word-block` : ''} ${isIntroBlock ? 'intro-block' : ''} ${isBlockFilling ? 'filling-text' : ''} ${isPastBlock ? 'block-locked' : ''}`}
                          >
                            <div 
                              className="block-progress-bar"
                              style={{
                                width: isPastBlock || isCurrentBlock ? '100%' : '0%',
                                backgroundColor: isPastBlock ? 'rgba(30, 30, 30, 0.85)' : 'rgba(60, 60, 60, 0.4)',
                                transition: (isCurrentBlock && isPlaying ? `width ${intervalMs}ms linear, ` : '') + 'background-color 0.2s ease'
                              }}
                            />
                            <div className="rhyme-content">
                              {displayWord ? displayWord : (!isIntroBlock && <span className="rhyme-dot"></span>)}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="jukebox-lower" style={{ position: 'relative', display: 'flex', width: '100%', padding: '20px 20px 40px', marginTop: '10px', minHeight: '130px' }}>
          
          <div className="rhyme-controls" style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '35px' : '20px', alignItems: 'center', width: '100%', paddingRight: '50px' }}>
            
            <div className="controls-top-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', maxWidth: isMobile ? '480px' : '340px' }}>
              <button 
                className="rhyme-play-btn" 
                onClick={togglePlay}
                style={{ opacity: isPlaying ? 0.5 : 1, cursor: isPlaying ? 'default' : 'pointer' }}
              >
                <Play size={isMobile ? 40 : 24} />
              </button>
              
              <button 
                className="rhyme-random-btn" 
                onClick={randomBeat}
                title="Beat aleatorio"
              >
                <Shuffle size={isMobile ? 32 : 18} />
              </button>

              <div className="bpm-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div 
                  className="bpm-info"
                  onMouseDown={handleBpmPointerDown}
                  onMouseUp={handleBpmPointerUpOrLeave}
                  onMouseLeave={handleBpmPointerUpOrLeave}
                  onTouchStart={handleBpmPointerDown}
                  onTouchEnd={handleBpmPointerUpOrLeave}
                  onContextMenu={(e) => e.preventDefault()}
                  style={{ touchAction: 'none' }}
                >
                  <span>{bpm}</span>
                </div>
                <span style={{ fontFamily: 'Righteous', fontSize: isMobile ? '1.4rem' : '1.1rem', color: '#555', letterSpacing: '2px', textShadow: '1px 1px 0px rgba(255,255,255,0.3), -1px -1px 0px rgba(0,0,0,0.8)' }}>BPM</span>
              </div>
            </div>

            <div className="controls-bottom-row" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <div className="beat-selector" style={{ width: '100%', maxWidth: isMobile ? '480px' : '340px', height: isMobile ? '80px' : '50px' }}>
                <button onClick={prevBeat} className="beat-btn"><ChevronLeft size={isMobile ? 40 : 24} /></button>
                <div className="beat-info">
                  <Disc size={isMobile ? 44 : 28} className={`disc-icon ${isPlaying ? 'spinning-disc' : ''}`} />
                  <div className="beat-text">
                    <span className="beat-title">
                      <a href={currentBeat.titleUrl} target="_blank" rel="noopener noreferrer">{currentBeat.title}</a>
                    </span>
                    <span className="beat-artist">
                      <a href={currentBeat.artistUrl} target="_blank" rel="noopener noreferrer">{currentBeat.artist}</a>
                    </span>
                  </div>
                </div>
                <button onClick={nextBeat} className="beat-btn"><ChevronRight size={isMobile ? 40 : 24} /></button>
              </div>
            </div>

          </div>

          <div className="coin-slot-container" style={{ position: 'absolute', right: '20px', top: 'calc(50% - 10px)', transform: 'translateY(-50%)', cursor: isPlaying ? 'default' : 'pointer', userSelect: 'none' }} onClick={cycleWordLimit}>
            <div className="coin-slot">
              <div className="coin-insert" style={{ background: `linear-gradient(to top, #ffd700 ${fillPercentage}%, #111 ${fillPercentage}%)` }}></div>
              <div className="coin-btn" style={{ fontSize: isMobile ? '16px' : '11px', padding: '2px 4px' }}>{wordLimit}</div>
            </div>
          </div>
          
          <audio ref={audioRef} src={currentBeat.file} loop />
          <audio ref={cassetteRef} src="/soundfx/cassette.mp3" />
        </div>

        <div className="jukebox-footer" style={{ position: 'absolute', bottom: '4px', textAlign: 'center', fontSize: '0.75rem', fontFamily: 'Righteous', letterSpacing: '2px', textShadow: '1px 1px 0px rgba(255,255,255,0.2), -1px -1px 0px rgba(0,0,0,0.8)' }}>
          <a href="https://unkedition.com" target="_blank" rel="noopener noreferrer" style={{ color: '#444', textDecoration: 'none' }}>
            UNK EDITION
          </a>
        </div>
      </div>
    </div>
  );
};

export default RhymeGame;
