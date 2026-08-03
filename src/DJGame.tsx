import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Crown, Disc, ArrowLeft } from 'lucide-react';
import './DJGame.css';

type Track = {
  id: string;
  category: string;
  name: string;
  title: string;
  artist: string;
  stems: string[];
};

const TRACKS: Track[] = [
  {
    id: 'track1',
    category: 'HITS DE LOS 90',
    name: 'TRACK 1',
    title: 'Suavemente',
    artist: 'Elvis Crespo',
    stems: [
      '/stems/HITS DE LOS 90/1 Elvis Crespo - Suavemente/1.mp3',
      '/stems/HITS DE LOS 90/1 Elvis Crespo - Suavemente/2.mp3',
      '/stems/HITS DE LOS 90/1 Elvis Crespo - Suavemente/3.mp3',
      '/stems/HITS DE LOS 90/1 Elvis Crespo - Suavemente/4.mp3'
    ]
  },
  {
    id: 'track2',
    category: 'HITS DE POP 2000S',
    name: 'TRACK 1',
    title: 'Don\'t Stop The Music',
    artist: 'Rihanna',
    stems: [
      '/stems/HITS DE POP 2000S/1 Rihanna - Don\'t Stop The Music/1.mp3',
      '/stems/HITS DE POP 2000S/1 Rihanna - Don\'t Stop The Music/2.mp3',
      '/stems/HITS DE POP 2000S/1 Rihanna - Don\'t Stop The Music/3.mp3',
      '/stems/HITS DE POP 2000S/1 Rihanna - Don\'t Stop The Music/4.mp3'
    ]
  },
  {
    id: 'track3',
    category: 'HITS DE RAP',
    name: 'TRACK 1',
    title: 'No Role Modelz',
    artist: 'J. Cole',
    stems: [
      '/stems/HITS DE RAP/1 J. Cole - No Role Modelz/1.mp3',
      '/stems/HITS DE RAP/1 J. Cole - No Role Modelz/2.mp3',
      '/stems/HITS DE RAP/1 J. Cole - No Role Modelz/3.mp3',
      '/stems/HITS DE RAP/1 J. Cole - No Role Modelz/4.mp3'
    ]
  },
  {
    id: 'track4',
    category: 'HITS DE REGGAETON',
    name: 'TRACK 1',
    title: 'QLOO',
    artist: 'Young Cister',
    stems: [
      '/stems/HITS DE REGGAETON/1 Young Cister - QLOO/1.mp3',
      '/stems/HITS DE REGGAETON/1 Young Cister - QLOO/2.mp3',
      '/stems/HITS DE REGGAETON/1 Young Cister - QLOO/3.mp3',
      '/stems/HITS DE REGGAETON/1 Young Cister - QLOO/4.mp3'
    ]
  },
  {
    id: 'track5',
    category: 'HITS DE REGGAETON',
    name: 'TRACK 2',
    title: 'La Plena',
    artist: 'Beéle',
    stems: [
      '/stems/HITS DE REGGAETON/2 Beéle - La Plena/1.mp3',
      '/stems/HITS DE REGGAETON/2 Beéle - La Plena/2.mp3',
      '/stems/HITS DE REGGAETON/2 Beéle - La Plena/3.mp3',
      '/stems/HITS DE REGGAETON/2 Beéle - La Plena/4.mp3'
    ]
  },
  {
    id: 'track6',
    category: 'HITS DE REGGAETON',
    name: 'TRACK 3',
    title: 'De Lejitos',
    artist: 'Jay Wheeler',
    stems: [
      '/stems/HITS DE REGGAETON/3 Jay Wheeler - De Lejitos/1.mp3',
      '/stems/HITS DE REGGAETON/3 Jay Wheeler - De Lejitos/2.mp3',
      '/stems/HITS DE REGGAETON/3 Jay Wheeler - De Lejitos/3.mp3',
      '/stems/HITS DE REGGAETON/3 Jay Wheeler - De Lejitos/4.mp3'
    ]
  },
  {
    id: 'track7',
    category: 'HITS DE REGGAETON',
    name: 'TRACK 4',
    title: 'Amanece',
    artist: 'Anuel AA',
    stems: [
      '/stems/HITS DE REGGAETON/4 Anuel AA - Amanece/1.mp3',
      '/stems/HITS DE REGGAETON/4 Anuel AA - Amanece/2.mp3',
      '/stems/HITS DE REGGAETON/4 Anuel AA - Amanece/3.mp3',
      '/stems/HITS DE REGGAETON/4 Anuel AA - Amanece/4.mp3'
    ]
  },
  {
    id: 'track8',
    category: 'HITS DE REGGAETON',
    name: 'TRACK 5',
    title: 'Adivino',
    artist: 'Myke Towers',
    stems: [
      '/stems/HITS DE REGGAETON/5 Myke Towers - Adivino/1.mp3',
      '/stems/HITS DE REGGAETON/5 Myke Towers - Adivino/2.mp3',
      '/stems/HITS DE REGGAETON/5 Myke Towers - Adivino/3.mp3',
      '/stems/HITS DE REGGAETON/5 Myke Towers - Adivino/4.mp3'
    ]
  },
  {
    id: 'track9',
    category: 'HITS DE REGGAETON',
    name: 'TRACK 6',
    title: 'Ginza',
    artist: 'J Balvin',
    stems: [
      '/stems/HITS DE REGGAETON/6 J Balvin - Ginza/1.mp3',
      '/stems/HITS DE REGGAETON/6 J Balvin - Ginza/2.mp3',
      '/stems/HITS DE REGGAETON/6 J Balvin - Ginza/3.mp3',
      '/stems/HITS DE REGGAETON/6 J Balvin - Ginza/4.mp3'
    ]
  },
  {
    id: 'track10',
    category: 'HITS DE REGGAETON',
    name: 'TRACK 7',
    title: 'Po\' Encima',
    artist: 'Arcángel',
    stems: [
      '/stems/HITS DE REGGAETON/7 Arcángel - Po\' Encima/1.mp3',
      '/stems/HITS DE REGGAETON/7 Arcángel - Po\' Encima/2.mp3',
      '/stems/HITS DE REGGAETON/7 Arcángel - Po\' Encima/3.mp3',
      '/stems/HITS DE REGGAETON/7 Arcángel - Po\' Encima/4.mp3'
    ]
  },
  {
    id: 'track11',
    category: 'HITS DE REGGAETON',
    name: 'TRACK 8',
    title: 'Cuando No Era Cantante',
    artist: 'El Bogueto',
    stems: [
      '/stems/HITS DE REGGAETON/8 El Bogueto - Cuando No Era Cantante/1.mp3',
      '/stems/HITS DE REGGAETON/8 El Bogueto - Cuando No Era Cantante/2.mp3',
      '/stems/HITS DE REGGAETON/8 El Bogueto - Cuando No Era Cantante/3.mp3',
      '/stems/HITS DE REGGAETON/8 El Bogueto - Cuando No Era Cantante/4.mp3'
    ]
  },
  {
    id: 'track12',
    category: 'HITS DE REGGAETON',
    name: 'TRACK 9',
    title: 'Diavla',
    artist: 'Chris Viz',
    stems: [
      '/stems/HITS DE REGGAETON/9 Chris Viz - Diavla/1.mp3',
      '/stems/HITS DE REGGAETON/9 Chris Viz - Diavla/2.mp3',
      '/stems/HITS DE REGGAETON/9 Chris Viz - Diavla/3.mp3',
      '/stems/HITS DE REGGAETON/9 Chris Viz - Diavla/4.mp3'
    ]
  },
  {
    id: 'track13',
    category: 'HITS DE REGGAETON',
    name: 'TRACK 10',
    title: 'Mirándote',
    artist: 'Rvfv',
    stems: [
      '/stems/HITS DE REGGAETON/10 Rvfv - Mirándote/1.mp3',
      '/stems/HITS DE REGGAETON/10 Rvfv - Mirándote/2.mp3',
      '/stems/HITS DE REGGAETON/10 Rvfv - Mirándote/3.mp3',
      '/stems/HITS DE REGGAETON/10 Rvfv - Mirándote/4.mp3'
    ]
  },
  {
    id: 'track14',
    category: 'HITS DE REGGAETON',
    name: 'TRACK 11',
    title: 'Afrorue',
    artist: 'Afrojuice',
    stems: [
      '/stems/HITS DE REGGAETON/11 Afrojuice - Afrorue/1.mp3',
      '/stems/HITS DE REGGAETON/11 Afrojuice - Afrorue/2.mp3',
      '/stems/HITS DE REGGAETON/11 Afrojuice - Afrorue/3.mp3',
      '/stems/HITS DE REGGAETON/11 Afrojuice - Afrorue/4.mp3'
    ]
  },
  {
    id: 'track15',
    category: 'HITS DE REGGAETON',
    name: 'TRACK 12',
    title: 'Virtual Diva',
    artist: 'Don Omar',
    stems: [
      '/stems/HITS DE REGGAETON/12 Don Omar - Virtual Diva/1.mp3',
      '/stems/HITS DE REGGAETON/12 Don Omar - Virtual Diva/2.mp3',
      '/stems/HITS DE REGGAETON/12 Don Omar - Virtual Diva/3.mp3',
      '/stems/HITS DE REGGAETON/12 Don Omar - Virtual Diva/4.mp3'
    ]
  },
  {
    id: 'track16',
    category: 'HITS DE REGGAETON',
    name: 'TRACK 13',
    title: 'El Señor de la Noche',
    artist: 'Don Omar',
    stems: [
      '/stems/HITS DE REGGAETON/13 Don Omar - El Señor de la Noche/1.mp3',
      '/stems/HITS DE REGGAETON/13 Don Omar - El Señor de la Noche/2.mp3',
      '/stems/HITS DE REGGAETON/13 Don Omar - El Señor de la Noche/3.mp3',
      '/stems/HITS DE REGGAETON/13 Don Omar - El Señor de la Noche/4.mp3'
    ]
  },
  {
    id: 'track17',
    category: 'HITS DE REGGAETON',
    name: 'TRACK 14',
    title: 'La Rubia Remix',
    artist: 'La Nueva Escuela',
    stems: [
      '/stems/HITS DE REGGAETON/14 La Nueva Escuela - La Rubia Remix/1.mp3',
      '/stems/HITS DE REGGAETON/14 La Nueva Escuela - La Rubia Remix/2.mp3',
      '/stems/HITS DE REGGAETON/14 La Nueva Escuela - La Rubia Remix/3.mp3',
      '/stems/HITS DE REGGAETON/14 La Nueva Escuela - La Rubia Remix/4.mp3'
    ]
  },
  {
    id: 'track18',
    category: 'HITS DE REGGAETON',
    name: 'TRACK 15',
    title: 'Té De Campana',
    artist: 'Atomic Otro Way',
    stems: [
      '/stems/HITS DE REGGAETON/15 Atomic Otro Way - Té De Campana/1.mp3',
      '/stems/HITS DE REGGAETON/15 Atomic Otro Way - Té De Campana/2.mp3',
      '/stems/HITS DE REGGAETON/15 Atomic Otro Way - Té De Campana/3.mp3',
      '/stems/HITS DE REGGAETON/15 Atomic Otro Way - Té De Campana/4.mp3'
    ]
  },
  {
    id: 'track19',
    category: 'HITS DE REGGAETON',
    name: 'TRACK 16',
    title: 'Superman Sin Capa',
    artist: 'El Super Nuevo',
    stems: [
      '/stems/HITS DE REGGAETON/16 El Super Nuevo - Superman Sin Capa/1.mp3',
      '/stems/HITS DE REGGAETON/16 El Super Nuevo - Superman Sin Capa/2.mp3',
      '/stems/HITS DE REGGAETON/16 El Super Nuevo - Superman Sin Capa/3.mp3',
      '/stems/HITS DE REGGAETON/16 El Super Nuevo - Superman Sin Capa/4.mp3'
    ]
  },
  {
    id: 'track20',
    category: 'HITS DE REGGAETON',
    name: 'TRACK 17',
    title: 'Se Va Pal Club',
    artist: 'Hugo Castejón',
    stems: [
      '/stems/HITS DE REGGAETON/17 Hugo Castejón - Se Va Pal Club/1.mp3',
      '/stems/HITS DE REGGAETON/17 Hugo Castejón - Se Va Pal Club/2.mp3',
      '/stems/HITS DE REGGAETON/17 Hugo Castejón - Se Va Pal Club/3.mp3',
      '/stems/HITS DE REGGAETON/17 Hugo Castejón - Se Va Pal Club/4.mp3'
    ]
  },
  {
    id: 'track21',
    category: 'HITS DE TRAP',
    name: 'TRACK 1',
    title: 'Fein',
    artist: 'Travis Scott',
    stems: [
      '/stems/HITS DE TRAP/1 Travis Scott - Fein/1.mp3',
      '/stems/HITS DE TRAP/1 Travis Scott - Fein/2.mp3',
      '/stems/HITS DE TRAP/1 Travis Scott - Fein/3.mp3',
      '/stems/HITS DE TRAP/1 Travis Scott - Fein/4.mp3'
    ]
  },
  {
    id: 'track22',
    category: 'HITS DE TRAP',
    name: 'TRACK 2',
    title: 'Boss',
    artist: 'Lil Pump',
    stems: [
      '/stems/HITS DE TRAP/2 Lil Pump - Boss/1.mp3',
      '/stems/HITS DE TRAP/2 Lil Pump - Boss/2.mp3',
      '/stems/HITS DE TRAP/2 Lil Pump - Boss/3.mp3',
      '/stems/HITS DE TRAP/2 Lil Pump - Boss/4.mp3'
    ]
  },
  {
    id: 'track23',
    category: 'HITS DE TRAP',
    name: 'TRACK 3',
    title: 'Betrayed',
    artist: 'Lil Xan',
    stems: [
      '/stems/HITS DE TRAP/3 Lil Xan - Betrayed/1.mp3',
      '/stems/HITS DE TRAP/3 Lil Xan - Betrayed/2.mp3',
      '/stems/HITS DE TRAP/3 Lil Xan - Betrayed/3.mp3',
      '/stems/HITS DE TRAP/3 Lil Xan - Betrayed/4.mp3'
    ]
  },
  {
    id: 'track24',
    category: 'HITS DE TRAP',
    name: 'TRACK 4',
    title: 'Bank Account',
    artist: '21 Savage',
    stems: [
      '/stems/HITS DE TRAP/4 21 Savage - Bank Account/1.mp3',
      '/stems/HITS DE TRAP/4 21 Savage - Bank Account/2.mp3',
      '/stems/HITS DE TRAP/4 21 Savage - Bank Account/3.mp3',
      '/stems/HITS DE TRAP/4 21 Savage - Bank Account/4.mp3'
    ]
  },
  {
    id: 'track25',
    category: 'HITS DE TRAP',
    name: 'TRACK 5',
    title: 'Freestyle',
    artist: 'Lil Baby',
    stems: [
      '/stems/HITS DE TRAP/5 Lil Baby - Freestyle/1.mp3',
      '/stems/HITS DE TRAP/5 Lil Baby - Freestyle/2.mp3',
      '/stems/HITS DE TRAP/5 Lil Baby - Freestyle/3.mp3',
      '/stems/HITS DE TRAP/5 Lil Baby - Freestyle/4.mp3'
    ]
  },
  {
    id: 'track26',
    category: 'HITS DE TRAP',
    name: 'TRACK 6',
    title: 'WTHELLY',
    artist: 'Rob49',
    stems: [
      '/stems/HITS DE TRAP/6 Rob49 - WTHELLY/1.mp3',
      '/stems/HITS DE TRAP/6 Rob49 - WTHELLY/2.mp3',
      '/stems/HITS DE TRAP/6 Rob49 - WTHELLY/3.mp3',
      '/stems/HITS DE TRAP/6 Rob49 - WTHELLY/4.mp3'
    ]
  },
  {
    id: 'track27',
    category: 'HITS DE TRAP',
    name: 'TRACK 7',
    title: 'The Box',
    artist: 'Roddy Ricch',
    stems: [
      '/stems/HITS DE TRAP/7 Roddy Ricch - The Box/1.mp3',
      '/stems/HITS DE TRAP/7 Roddy Ricch - The Box/2.mp3',
      '/stems/HITS DE TRAP/7 Roddy Ricch - The Box/3.mp3',
      '/stems/HITS DE TRAP/7 Roddy Ricch - The Box/4.mp3'
    ]
  },
  {
    id: 'track28',
    category: 'HITS DE TRAP',
    name: 'TRACK 8',
    title: 'Yes Indeed',
    artist: 'Lil Baby',
    stems: [
      '/stems/HITS DE TRAP/8 Lil Baby - Yes Indeed/1.mp3',
      '/stems/HITS DE TRAP/8 Lil Baby - Yes Indeed/2.mp3',
      '/stems/HITS DE TRAP/8 Lil Baby - Yes Indeed/3.mp3',
      '/stems/HITS DE TRAP/8 Lil Baby - Yes Indeed/4.mp3'
    ]
  },
  {
    id: 'track29',
    category: 'HITS DE TRAP',
    name: 'TRACK 9',
    title: 'A Lot',
    artist: '21 Savage',
    stems: [
      '/stems/HITS DE TRAP/9 21 Savage - A Lot/1.mp3',
      '/stems/HITS DE TRAP/9 21 Savage - A Lot/2.mp3',
      '/stems/HITS DE TRAP/9 21 Savage - A Lot/3.mp3',
      '/stems/HITS DE TRAP/9 21 Savage - A Lot/4.mp3'
    ]
  },
  {
    id: 'track30',
    category: 'HITS DE TRAP',
    name: 'TRACK 10',
    title: 'Hate Bein\' Sober',
    artist: 'Chief Keef',
    stems: [
      '/stems/HITS DE TRAP/10 Chief Keef - Hate Bein\' Sober/1.mp3',
      '/stems/HITS DE TRAP/10 Chief Keef - Hate Bein\' Sober/2.mp3',
      '/stems/HITS DE TRAP/10 Chief Keef - Hate Bein\' Sober/3.mp3',
      '/stems/HITS DE TRAP/10 Chief Keef - Hate Bein\' Sober/4.mp3'
    ]
  },
  {
    id: 'track31',
    category: 'HITS DE TRAP',
    name: 'TRACK 11',
    title: 'I Don\'t Like',
    artist: 'Chief Keef',
    stems: [
      '/stems/HITS DE TRAP/11 Chief Keef - I Don\'t Like/1.mp3',
      '/stems/HITS DE TRAP/11 Chief Keef - I Don\'t Like/2.mp3',
      '/stems/HITS DE TRAP/11 Chief Keef - I Don\'t Like/3.mp3',
      '/stems/HITS DE TRAP/11 Chief Keef - I Don\'t Like/4.mp3'
    ]
  },
  {
    id: 'track32',
    category: 'HITS DE TRAP',
    name: 'TRACK 12',
    title: 'Leave Me Alone',
    artist: 'Flipp Dinero',
    stems: [
      '/stems/HITS DE TRAP/12 Flipp Dinero - Leave Me Alone/1.mp3',
      '/stems/HITS DE TRAP/12 Flipp Dinero - Leave Me Alone/2.mp3',
      '/stems/HITS DE TRAP/12 Flipp Dinero - Leave Me Alone/3.mp3',
      '/stems/HITS DE TRAP/12 Flipp Dinero - Leave Me Alone/4.mp3'
    ]
  },
  {
    id: 'track33',
    category: 'HITS DE TRAP',
    name: 'TRACK 13',
    title: 'Love Sosa',
    artist: 'Chief Keef',
    stems: [
      '/stems/HITS DE TRAP/13 Chief Keef - Love Sosa/1.mp3',
      '/stems/HITS DE TRAP/13 Chief Keef - Love Sosa/2.mp3',
      '/stems/HITS DE TRAP/13 Chief Keef - Love Sosa/3.mp3',
      '/stems/HITS DE TRAP/13 Chief Keef - Love Sosa/4.mp3'
    ]
  },
  {
    id: 'track34',
    category: 'HITS DE TRAP',
    name: 'TRACK 14',
    title: 'Trap Queen',
    artist: 'Fetty Wap',
    stems: [
      '/stems/HITS DE TRAP/14 Fetty Wap - Trap Queen/1.mp3',
      '/stems/HITS DE TRAP/14 Fetty Wap - Trap Queen/2.mp3',
      '/stems/HITS DE TRAP/14 Fetty Wap - Trap Queen/3.mp3',
      '/stems/HITS DE TRAP/14 Fetty Wap - Trap Queen/4.mp3'
    ]
  },
  {
    id: 'track35',
    category: 'HITS DE TRAP ESPAÑOL',
    name: 'TRACK 1',
    title: 'Dracukeo',
    artist: 'Kidd Keo',
    stems: [
      '/stems/HITS DE TRAP ESPAÑOL/1 Kidd Keo - Dracukeo/1.mp3',
      '/stems/HITS DE TRAP ESPAÑOL/1 Kidd Keo - Dracukeo/2.mp3',
      '/stems/HITS DE TRAP ESPAÑOL/1 Kidd Keo - Dracukeo/3.mp3',
      '/stems/HITS DE TRAP ESPAÑOL/1 Kidd Keo - Dracukeo/4.mp3'
    ]
  },
  {
    id: 'track36',
    category: 'HITS DE TRAP ESPAÑOL',
    name: 'TRACK 2',
    title: 'Beso Negro',
    artist: 'Kinder Malo',
    stems: [
      '/stems/HITS DE TRAP ESPAÑOL/2 Kinder Malo - Beso Negro/1.mp3',
      '/stems/HITS DE TRAP ESPAÑOL/2 Kinder Malo - Beso Negro/2.mp3',
      '/stems/HITS DE TRAP ESPAÑOL/2 Kinder Malo - Beso Negro/3.mp3',
      '/stems/HITS DE TRAP ESPAÑOL/2 Kinder Malo - Beso Negro/4.mp3'
    ]
  },
  {
    id: 'track37',
    category: 'HITS DE TRAP ESPAÑOL',
    name: 'TRACK 3',
    title: 'La Ley de Eddie Murphy',
    artist: 'Kinder Malo',
    stems: [
      '/stems/HITS DE TRAP ESPAÑOL/3 Kinder Malo - La Ley de Eddie Murphy/1.mp3',
      '/stems/HITS DE TRAP ESPAÑOL/3 Kinder Malo - La Ley de Eddie Murphy/2.mp3',
      '/stems/HITS DE TRAP ESPAÑOL/3 Kinder Malo - La Ley de Eddie Murphy/3.mp3',
      '/stems/HITS DE TRAP ESPAÑOL/3 Kinder Malo - La Ley de Eddie Murphy/4.mp3'
    ]
  },
  {
    id: 'track38',
    category: 'HITS DE TRAP LATINO',
    name: 'TRACK 1',
    title: 'BnB',
    artist: 'Young Miko',
    stems: [
      '/stems/HITS DE TRAP LATINO/1 Young Miko - BnB/1.mp3',
      '/stems/HITS DE TRAP LATINO/1 Young Miko - BnB/2.mp3',
      '/stems/HITS DE TRAP LATINO/1 Young Miko - BnB/3.mp3',
      '/stems/HITS DE TRAP LATINO/1 Young Miko - BnB/4.mp3'
    ]
  },
  {
    id: 'track39',
    category: 'HITS DE TRAP LATINO',
    name: 'TRACK 2',
    title: 'Si Me Gano Un Grammy',
    artist: 'Jon Z',
    stems: [
      '/stems/HITS DE TRAP LATINO/2 Jon Z - Si Me Gano Un Grammy/1.mp3',
      '/stems/HITS DE TRAP LATINO/2 Jon Z - Si Me Gano Un Grammy/2.mp3',
      '/stems/HITS DE TRAP LATINO/2 Jon Z - Si Me Gano Un Grammy/3.mp3',
      '/stems/HITS DE TRAP LATINO/2 Jon Z - Si Me Gano Un Grammy/4.mp3'
    ]
  }
];

export const DJGame: React.FC = () => {
  const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null);
  const activeTrack = TRACKS.find(t => t.id === selectedTrackId);

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
    if (!activeTrack) {
      // If we go back to the menu, stop any playing audio
      if (sourceRef.current) {
        try { sourceRef.current.stop(); } catch(e) {}
      }
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      return;
    }

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
  }, [activeTrack?.stems]);

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

  const categories = Array.from(new Set(TRACKS.map(t => t.category)));

  // If no track is selected, render the full-screen selection menu
  if (selectedTrackId === null) {
    return (
      <div className="dj-game-container glass-brutalist track-selection-screen">
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

        <div className="selection-header">
          <Disc className="spinning-disc" size={48} color="#a855f7" />
          <h1 className="selection-title">¿PUEDES ADIVINAR LA CANCIÓN?</h1>
        </div>

        <div className="selection-content">
          {categories.map(category => (
            <div key={category} className="selection-category-section">
              <h2 className="selection-category-title">{category}</h2>
              <div className="selection-tracks-grid">
                {TRACKS.filter(t => t.category === category).map(track => (
                  <button
                    key={track.id}
                    className="track-square-card glass"
                    onClick={() => {
                      setIsResolved(false);
                      resolveClickedRef.current = false;
                      setCurrentLevel(null);
                      setUnlockedLevel(1);
                      setFinishedLevels([]);
                      setProgress(0);
                      setIsLoaded(false);
                      setSelectedTrackId(track.id);
                    }}
                  >
                    <div className="track-card-decor">
                      <Disc size={20} className="card-disc-icon" />
                    </div>
                    <span className="track-card-number">{track.name.replace('TRACK ', '')}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Logo */}
        <img src="/unklogo.png" alt="UNK Logo" className="footer-logo" />
      </div>
    );
  }

  // Active track must be defined if selectedTrackId is not null
  const currentActiveTrack = activeTrack!;

  return (
    <div className="dj-game-container glass-brutalist">
      {/* Back Button to Selection Screen */}
      <button 
        className="back-to-menu-btn glass" 
        onClick={() => setSelectedTrackId(null)}
        title="Volver a la selección de canciones"
      >
        <ArrowLeft size={24} color="#fff" />
      </button>

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
                      <div className="pad-song-title">{currentActiveTrack.title}</div>
                      <div className="pad-artist-name">
                        {currentActiveTrack.artist.split('\n').map((line, i) => (
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
