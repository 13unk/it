import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, ChevronLeft, ChevronRight, Disc } from 'lucide-react';
import './RhymeGame.css';

const BEATS = [
  {
    title: 'Get It',
    artist: 'Fat Cat Beats',
    bpm: 89,
    file: '/Beats/Get It - Fat Cat Beats - 89BPM.mp3'
  },
  {
    title: 'Scarface',
    artist: 'KaalaH',
    bpm: 94,
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

import { useNavigate } from 'react-router-dom';

export const RhymeGame: React.FC = () => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentBeatIndex, setCurrentBeatIndex] = useState(0);
  const [currentRow, setCurrentRow] = useState(0);
  const [currentCol, setCurrentCol] = useState(-1);
  const [gameWords, setGameWords] = useState(() => shufflePairs(BASE_WORDS));
  const timerRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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
    setGameWords(shufflePairs(BASE_WORDS));
    
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log('Audio play error', e));
      }
    }
  }, [currentBeatIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const prevBeat = () => {
    setCurrentBeatIndex((prev) => (prev === 0 ? BEATS.length - 1 : prev - 1));
  };

  const nextBeat = () => {
    setCurrentBeatIndex((prev) => (prev === BEATS.length - 1 ? 0 : prev + 1));
  };

  const goBack = () => {
    navigate('/');
  };


  return (
    <div className="rhyme-game-container">
      <button className="rhyme-back-btn" onClick={goBack}>
        <ChevronLeft size={32} />
      </button>
      
      <div className="rhyme-header">
        <h1>THE RHYME GAME</h1>
      </div>

      <div className="rhyme-game-area">
        {isPlaying && currentCol >= 0 && (
          <div 
            className="rhyme-ball"
            style={{
              transform: `translate(${currentCol * 95}px, 0)`,
              transitionDuration: currentCol === 0 ? '0s' : `${intervalMs * 0.5}ms`
            }}
          />
        )}
        
        <div className="rhyme-grid-viewport" style={{ width: '100%', height: '435px', overflow: 'hidden', position: 'relative', padding: '5px' }}>
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
                    return (
                      <div 
                        key={cIndex} 
                        className={`rhyme-block ${word ? `rhyme-word-block ${colorClass}` : ''} ${isBlockFilling ? 'filling-text' : ''}`}
                      >
                        <div 
                          className="block-progress-bar"
                          style={{
                            width: isPastBlock || isCurrentBlock ? '100%' : '0%',
                            transition: isCurrentBlock && isPlaying ? `width ${intervalMs}ms linear` : 'none'
                          }}
                        />
                        <div className="rhyme-content">
                          {word ? word : <span className="rhyme-dot"></span>}
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

      <div className="rhyme-controls">
        <button className="rhyme-play-btn" onClick={togglePlay}>
          {isPlaying ? <Pause size={32} /> : <Play size={32} />}
        </button>
        
        <div className="beat-controls-row">
          <div className="beat-selector">
            <button onClick={prevBeat} className="beat-btn"><ChevronLeft size={24} /></button>
            <div className="beat-info">
              <Disc size={28} className={`disc-icon ${isPlaying ? 'spinning-disc' : ''}`} />
              <div className="beat-text">
                <span className="beat-title">{currentBeat.title}</span>
                <span className="beat-artist">{currentBeat.artist}</span>
              </div>
            </div>
            <button onClick={nextBeat} className="beat-btn"><ChevronRight size={24} /></button>
          </div>
          
          <div className="bpm-info">
            <span>{bpm} BPM</span>
          </div>
        </div>

        <audio ref={audioRef} src={currentBeat.file} loop />
      </div>
    </div>
  );
};
