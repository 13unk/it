import React, { useState, useEffect, useRef } from 'react';
import { Play, ChevronLeft, ChevronRight, Disc } from 'lucide-react';
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
    title: 'Scarface',
    titleUrl: 'https://www.youtube.com/watch?v=N9-uaszmAzc',
    artist: 'KaalaH',
    artistUrl: 'https://www.youtube.com/@KaalaH',
    bpm: 94,
    introRows: 0,
    file: '/Beats/Scarface - KaalaH - 94BPM.mp3'
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

function getInitialWords(beatIndex: number) {
  const beat = BEATS[beatIndex];
  const introCount = beat.introRows || 0;
  const intros = Array.from({ length: introCount }, () => [null, null, null, null]);
  return [...intros, ...shufflePairs(BASE_WORDS)];
}


export const RhymeGame: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentBeatIndex, setCurrentBeatIndex] = useState(0);
  const [currentRow, setCurrentRow] = useState(0);
  const [currentCol, setCurrentCol] = useState(-1);
  const [gameWords, setGameWords] = useState<(string | null)[][]>(() => getInitialWords(0));
  const timerRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const cassetteRef = useRef<HTMLAudioElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // exactly 3 seconds to complete the simulation animation
    return () => clearTimeout(timer);
  }, []);

  const currentBeat = BEATS[currentBeatIndex];
  const bpm = currentBeat.bpm;
  const intervalMs = (60 / bpm) * 1000;

  useEffect(() => {
    if (currentRow + 10 >= gameWords.length) {
      setGameWords((prev) => [...prev, ...shufflePairs(BASE_WORDS)]);
    }
  }, [currentRow, gameWords.length]);

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

      if (audioRef.current) {
        audioRef.current.play().catch(e => console.log('Audio play error', e));
      }
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, bpm]);

  // Restart game & audio if beat changes
  useEffect(() => {
    setCurrentRow(0);
    setCurrentCol(-1);
    setGameWords(getInitialWords(currentBeatIndex));
    
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log('Audio play error', e));
      }
    }
  }, [currentBeatIndex]);

  const togglePlay = () => {
    if (!isPlaying) {
      setIsPlaying(true);
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
    <div className="rhyme-game-container">
      
      <div className="jukebox-body">
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
                  transform: `translateY(-${currentRow * 75}px)`,
                  transition: `transform ${intervalMs * 0.8}ms cubic-bezier(0.25, 1, 0.5, 1)`
                }}
              >
                {gameWords.map((row, rIndex) => {
                  const isRhymeA = Math.floor(rIndex / 2) % 2 === 0;
                  const colorClass = isRhymeA ? 'rhyme-color-a' : 'rhyme-color-b';
                  const isPast = rIndex < currentRow - 1;
                  const isPastBlurred = rIndex === currentRow - 1;
                  const isFutureBlurred = rIndex === currentRow + 4;

                  return (
                    <div 
                      key={rIndex} 
                      className={`rhyme-row ${isPast ? 'fade-out-up' : ''} ${isPastBlurred || isFutureBlurred ? 'blur-row' : ''}`}
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
                            className={`rhyme-block ${word ? `rhyme-word-block ${colorClass}` : ''} ${isIntroBlock ? 'intro-block' : ''} ${isBlockFilling ? 'filling-text' : ''}`}
                          >
                            <div 
                              className="block-progress-bar"
                              style={{
                                width: isPastBlock || isCurrentBlock ? '100%' : '0%',
                                transition: isCurrentBlock && isPlaying ? `width ${intervalMs}ms linear` : 'none'
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

        <div className="jukebox-lower" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '0 20px', marginTop: '20px' }}>
          
          <div className="rhyme-controls" style={{ display: 'flex', gap: '20px', alignItems: 'center', flexDirection: 'row', marginTop: '0', width: '100%', justifyContent: 'center' }}>
            <button 
              className="rhyme-play-btn" 
              onClick={togglePlay}
              style={{ opacity: isPlaying ? 0.5 : 1, cursor: isPlaying ? 'default' : 'pointer' }}
            >
              <Play size={24} />
            </button>
            
            <div className="beat-selector" style={{ width: '320px', height: '50px' }}>
              <button onClick={prevBeat} className="beat-btn"><ChevronLeft size={24} /></button>
              <div className="beat-info">
                <Disc size={28} className={`disc-icon ${isPlaying ? 'spinning-disc' : ''}`} />
                <div className="beat-text">
                  <span className="beat-title">
                    <a href={currentBeat.titleUrl} target="_blank" rel="noopener noreferrer">{currentBeat.title}</a>
                  </span>
                  <span className="beat-artist">
                    <a href={currentBeat.artistUrl} target="_blank" rel="noopener noreferrer">{currentBeat.artist}</a>
                  </span>
                </div>
              </div>
              <button onClick={nextBeat} className="beat-btn"><ChevronRight size={24} /></button>
            </div>
            
            <div className="bpm-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div className="bpm-info">
                <span>{bpm}</span>
              </div>
              <span style={{ fontFamily: 'Righteous', color: '#555', letterSpacing: '2px', textShadow: '1px 1px 0px rgba(255,255,255,0.3), -1px -1px 0px rgba(0,0,0,0.8)' }}>BPM</span>
            </div>

            <div className="coin-slot-container" style={{ position: 'absolute', right: '0', top: '50%', transform: 'translateY(-50%)' }}>
              <div className="coin-slot">
                <div className="coin-insert"></div>
                <div className="coin-btn">25¢</div>
              </div>
            </div>
          </div>

          <audio ref={audioRef} src={currentBeat.file} loop />
          <audio ref={cassetteRef} src="/soundfx/cassette.mp3" />
        </div>

        <div className="jukebox-footer" style={{ position: 'absolute', bottom: '4px', textAlign: 'center', fontSize: '0.75rem', color: '#444', fontFamily: 'Righteous', letterSpacing: '2px', textShadow: '1px 1px 0px rgba(255,255,255,0.2), -1px -1px 0px rgba(0,0,0,0.8)' }}>
          POWERED BY UNK
        </div>
      </div>
    </div>
  );
};
