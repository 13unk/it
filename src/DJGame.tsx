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
    title: 'Don't Stop The Music',
    artist: 'Rihanna',
    stems: [
      '/stems/HITS DE POP 2000S/1 Rihanna - Don't Stop The Music/1.mp3',
      '/stems/HITS DE POP 2000S/1 Rihanna - Don't Stop The Music/2.mp3',
      '/stems/HITS DE POP 2000S/1 Rihanna - Don't Stop The Music/3.mp3',
      '/stems/HITS DE POP 2000S/1 Rihanna - Don't Stop The Music/4.mp3'
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
    category: 'HITS DE RAP',
    name: 'TRACK 2',
    title: 'Hate It Or Love It',
    artist: 'The Game',
    stems: [
      '/stems/HITS DE RAP/2 The Game - Hate It Or Love It/1.mp3',
      '/stems/HITS DE RAP/2 The Game - Hate It Or Love It/2.mp3',
      '/stems/HITS DE RAP/2 The Game - Hate It Or Love It/3.mp3',
      '/stems/HITS DE RAP/2 The Game - Hate It Or Love It/4.mp3'
    ]
  },
  {
    id: 'track5',
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
    id: 'track6',
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
    id: 'track7',
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
    id: 'track8',
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
    id: 'track9',
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
    id: 'track10',
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
    id: 'track11',
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
    id: 'track12',
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
    id: 'track13',
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
    id: 'track14',
    category: 'HITS DE TRAP',
    name: 'TRACK 10',
    title: 'Hate Bein' Sober',
    artist: 'Chief Keef',
    stems: [
      '/stems/HITS DE TRAP/10 Chief Keef - Hate Bein' Sober/1.mp3',
      '/stems/HITS DE TRAP/10 Chief Keef - Hate Bein' Sober/2.mp3',
      '/stems/HITS DE TRAP/10 Chief Keef - Hate Bein' Sober/3.mp3',
      '/stems/HITS DE TRAP/10 Chief Keef - Hate Bein' Sober/4.mp3'
    ]
  },
  {
    id: 'track15',
    category: 'HITS DE TRAP',
    name: 'TRACK 11',
    title: 'I Don't Like',
    artist: 'Chief Keef',
    stems: [
      '/stems/HITS DE TRAP/11 Chief Keef - I Don't Like/1.mp3',
      '/stems/HITS DE TRAP/11 Chief Keef - I Don't Like/2.mp3',
      '/stems/HITS DE TRAP/11 Chief Keef - I Don't Like/3.mp3',
      '/stems/HITS DE TRAP/11 Chief Keef - I Don't Like/4.mp3'
    ]
  },
  {
    id: 'track16',
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
    id: 'track17',
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
    id: 'track18',
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
    id: 'track19',
    category: 'HITS DE TRAP',
    name: 'TRACK 15',
    title: 'Japan',
    artist: 'Famous Dex',
    stems: [
      '/stems/HITS DE TRAP/15 Famous Dex - Japan/1.mp3',
      '/stems/HITS DE TRAP/15 Famous Dex - Japan/2.mp3',
      '/stems/HITS DE TRAP/15 Famous Dex - Japan/3.mp3',
      '/stems/HITS DE TRAP/15 Famous Dex - Japan/4.mp3'
    ]
  },
  {
    id: 'track20',
    category: 'HITS DE TRAP',
    name: 'TRACK 16',
    title: 'Doja',
    artist: 'Central Cee',
    stems: [
      '/stems/HITS DE TRAP/16 Central Cee - Doja/1.mp3',
      '/stems/HITS DE TRAP/16 Central Cee - Doja/2.mp3',
      '/stems/HITS DE TRAP/16 Central Cee - Doja/3.mp3',
      '/stems/HITS DE TRAP/16 Central Cee - Doja/4.mp3'
    ]
  },
  {
    id: 'track21',
    category: 'HITS DE TRAP',
    name: 'TRACK 17',
    title: 'Ransom',
    artist: 'Lil Tecca',
    stems: [
      '/stems/HITS DE TRAP/17 Lil Tecca - Ransom/1.mp3',
      '/stems/HITS DE TRAP/17 Lil Tecca - Ransom/2.mp3',
      '/stems/HITS DE TRAP/17 Lil Tecca - Ransom/3.mp3',
      '/stems/HITS DE TRAP/17 Lil Tecca - Ransom/4.mp3'
    ]
  },
  {
    id: 'track22',
    category: 'HITS DE TRAP',
    name: 'TRACK 18',
    title: 'Sprinter',
    artist: 'Central Cee',
    stems: [
      '/stems/HITS DE TRAP/18 Central Cee - Sprinter/1.mp3',
      '/stems/HITS DE TRAP/18 Central Cee - Sprinter/2.mp3',
      '/stems/HITS DE TRAP/18 Central Cee - Sprinter/3.mp3',
      '/stems/HITS DE TRAP/18 Central Cee - Sprinter/4.mp3'
    ]
  },
  {
    id: 'track23',
    category: 'HITS DE TRAP',
    name: 'TRACK 19',
    title: 'Calling My Phone',
    artist: 'Lil Tjay',
    stems: [
      '/stems/HITS DE TRAP/19 Lil Tjay - Calling My Phone/1.mp3',
      '/stems/HITS DE TRAP/19 Lil Tjay - Calling My Phone/2.mp3',
      '/stems/HITS DE TRAP/19 Lil Tjay - Calling My Phone/3.mp3',
      '/stems/HITS DE TRAP/19 Lil Tjay - Calling My Phone/4.mp3'
    ]
  },
  {
    id: 'track24',
    category: 'HITS DE TRAP',
    name: 'TRACK 20',
    title: 'Ultimate',
    artist: 'Denzel Curry',
    stems: [
      '/stems/HITS DE TRAP/20 Denzel Curry - Ultimate/1.mp3',
      '/stems/HITS DE TRAP/20 Denzel Curry - Ultimate/2.mp3',
      '/stems/HITS DE TRAP/20 Denzel Curry - Ultimate/3.mp3',
      '/stems/HITS DE TRAP/20 Denzel Curry - Ultimate/4.mp3'
    ]
  },
  {
    id: 'track25',
    category: 'HITS DE TRAP',
    name: 'TRACK 21',
    title: 'The Race',
    artist: 'Tay-K',
    stems: [
      '/stems/HITS DE TRAP/21 Tay-K - The Race/1.mp3',
      '/stems/HITS DE TRAP/21 Tay-K - The Race/2.mp3',
      '/stems/HITS DE TRAP/21 Tay-K - The Race/3.mp3',
      '/stems/HITS DE TRAP/21 Tay-K - The Race/4.mp3'
    ]
  },
  {
    id: 'track26',
    category: 'HITS DE TRAP',
    name: 'TRACK 22',
    title: 'Opp Stoppa',
    artist: 'YBN Nahmir',
    stems: [
      '/stems/HITS DE TRAP/22 YBN Nahmir - Opp Stoppa/1.mp3',
      '/stems/HITS DE TRAP/22 YBN Nahmir - Opp Stoppa/2.mp3',
      '/stems/HITS DE TRAP/22 YBN Nahmir - Opp Stoppa/3.mp3',
      '/stems/HITS DE TRAP/22 YBN Nahmir - Opp Stoppa/4.mp3'
    ]
  },
  {
    id: 'track27',
    category: 'HITS DE TRAP',
    name: 'TRACK 23',
    title: 'Noticed',
    artist: 'Lil Mosey',
    stems: [
      '/stems/HITS DE TRAP/23 Lil Mosey - Noticed/1.mp3',
      '/stems/HITS DE TRAP/23 Lil Mosey - Noticed/2.mp3',
      '/stems/HITS DE TRAP/23 Lil Mosey - Noticed/3.mp3',
      '/stems/HITS DE TRAP/23 Lil Mosey - Noticed/4.mp3'
    ]
  },
  {
    id: 'track28',
    category: 'HITS DE TRAP',
    name: 'TRACK 24',
    title: 'New Freezer',
    artist: 'Rich The Kid',
    stems: [
      '/stems/HITS DE TRAP/24 Rich The Kid - New Freezer/1.mp3',
      '/stems/HITS DE TRAP/24 Rich The Kid - New Freezer/2.mp3',
      '/stems/HITS DE TRAP/24 Rich The Kid - New Freezer/3.mp3',
      '/stems/HITS DE TRAP/24 Rich The Kid - New Freezer/4.mp3'
    ]
  },
  {
    id: 'track29',
    category: 'HITS DE TRAP',
    name: 'TRACK 25',
    title: 'I',
    artist: 'Lil Skies',
    stems: [
      '/stems/HITS DE TRAP/25 Lil Skies - I/1.mp3',
      '/stems/HITS DE TRAP/25 Lil Skies - I/2.mp3',
      '/stems/HITS DE TRAP/25 Lil Skies - I/3.mp3',
      '/stems/HITS DE TRAP/25 Lil Skies - I/4.mp3'
    ]
  },
  {
    id: 'track30',
    category: 'HITS DE TRAP',
    name: 'TRACK 26',
    title: 'Murder On My Mind',
    artist: 'YNW Melly',
    stems: [
      '/stems/HITS DE TRAP/26 YNW Melly - Murder On My Mind/1.mp3',
      '/stems/HITS DE TRAP/26 YNW Melly - Murder On My Mind/2.mp3',
      '/stems/HITS DE TRAP/26 YNW Melly - Murder On My Mind/3.mp3',
      '/stems/HITS DE TRAP/26 YNW Melly - Murder On My Mind/4.mp3'
    ]
  },
  {
    id: 'track31',
    category: 'HITS DE TRAP',
    name: 'TRACK 27',
    title: 'Goosebumps',
    artist: 'Travis Scott',
    stems: [
      '/stems/HITS DE TRAP/27 Travis Scott - Goosebumps/1.mp3',
      '/stems/HITS DE TRAP/27 Travis Scott - Goosebumps/2.mp3',
      '/stems/HITS DE TRAP/27 Travis Scott - Goosebumps/3.mp3',
      '/stems/HITS DE TRAP/27 Travis Scott - Goosebumps/4.mp3'
    ]
  },
  {
    id: 'track32',
    category: 'HITS DE TRAP',
    name: 'TRACK 28',
    title: 'Blueberry Faygo',
    artist: 'Lil Mosey',
    stems: [
      '/stems/HITS DE TRAP/28 Lil Mosey - Blueberry Faygo/1.mp3',
      '/stems/HITS DE TRAP/28 Lil Mosey - Blueberry Faygo/2.mp3',
      '/stems/HITS DE TRAP/28 Lil Mosey - Blueberry Faygo/3.mp3',
      '/stems/HITS DE TRAP/28 Lil Mosey - Blueberry Faygo/4.mp3'
    ]
  },
  {
    id: 'track33',
    category: 'HITS DE TRAP',
    name: 'TRACK 29',
    title: 'Catch Me Outside',
    artist: 'Ski Mask The Slump God',
    stems: [
      '/stems/HITS DE TRAP/29 Ski Mask The Slump God - Catch Me Outside/1.mp3',
      '/stems/HITS DE TRAP/29 Ski Mask The Slump God - Catch Me Outside/2.mp3',
      '/stems/HITS DE TRAP/29 Ski Mask The Slump God - Catch Me Outside/3.mp3',
      '/stems/HITS DE TRAP/29 Ski Mask The Slump God - Catch Me Outside/4.mp3'
    ]
  },
  {
    id: 'track34',
    category: 'HITS DE TRAP',
    name: 'TRACK 30',
    title: 'Gut Genug',
    artist: 'KitschKrieg',
    stems: [
      '/stems/HITS DE TRAP/30 KitschKrieg - Gut Genug/1.mp3',
      '/stems/HITS DE TRAP/30 KitschKrieg - Gut Genug/2.mp3',
      '/stems/HITS DE TRAP/30 KitschKrieg - Gut Genug/3.mp3',
      '/stems/HITS DE TRAP/30 KitschKrieg - Gut Genug/4.mp3'
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
    category: 'HITS LATINOS',
    name: 'TRACK 1',
    title: 'QLOO',
    artist: 'Young Cister',
    stems: [
      '/stems/HITS LATINOS/1 Young Cister - QLOO/1.mp3',
      '/stems/HITS LATINOS/1 Young Cister - QLOO/2.mp3',
      '/stems/HITS LATINOS/1 Young Cister - QLOO/3.mp3',
      '/stems/HITS LATINOS/1 Young Cister - QLOO/4.mp3'
    ]
  },
  {
    id: 'track39',
    category: 'HITS LATINOS',
    name: 'TRACK 2',
    title: 'La Plena',
    artist: 'Beéle',
    stems: [
      '/stems/HITS LATINOS/2 Beéle - La Plena/1.mp3',
      '/stems/HITS LATINOS/2 Beéle - La Plena/2.mp3',
      '/stems/HITS LATINOS/2 Beéle - La Plena/3.mp3',
      '/stems/HITS LATINOS/2 Beéle - La Plena/4.mp3'
    ]
  },
  {
    id: 'track40',
    category: 'HITS LATINOS',
    name: 'TRACK 3',
    title: 'De Lejitos',
    artist: 'Jay Wheeler',
    stems: [
      '/stems/HITS LATINOS/3 Jay Wheeler - De Lejitos/1.mp3',
      '/stems/HITS LATINOS/3 Jay Wheeler - De Lejitos/2.mp3',
      '/stems/HITS LATINOS/3 Jay Wheeler - De Lejitos/3.mp3',
      '/stems/HITS LATINOS/3 Jay Wheeler - De Lejitos/4.mp3'
    ]
  },
  {
    id: 'track41',
    category: 'HITS LATINOS',
    name: 'TRACK 4',
    title: 'Amanece',
    artist: 'Anuel AA',
    stems: [
      '/stems/HITS LATINOS/4 Anuel AA - Amanece/1.mp3',
      '/stems/HITS LATINOS/4 Anuel AA - Amanece/2.mp3',
      '/stems/HITS LATINOS/4 Anuel AA - Amanece/3.mp3',
      '/stems/HITS LATINOS/4 Anuel AA - Amanece/4.mp3'
    ]
  },
  {
    id: 'track42',
    category: 'HITS LATINOS',
    name: 'TRACK 5',
    title: 'Adivino',
    artist: 'Myke Towers',
    stems: [
      '/stems/HITS LATINOS/5 Myke Towers - Adivino/1.mp3',
      '/stems/HITS LATINOS/5 Myke Towers - Adivino/2.mp3',
      '/stems/HITS LATINOS/5 Myke Towers - Adivino/3.mp3',
      '/stems/HITS LATINOS/5 Myke Towers - Adivino/4.mp3'
    ]
  },
  {
    id: 'track43',
    category: 'HITS LATINOS',
    name: 'TRACK 6',
    title: 'Ginza',
    artist: 'J Balvin',
    stems: [
      '/stems/HITS LATINOS/6 J Balvin - Ginza/1.mp3',
      '/stems/HITS LATINOS/6 J Balvin - Ginza/2.mp3',
      '/stems/HITS LATINOS/6 J Balvin - Ginza/3.mp3',
      '/stems/HITS LATINOS/6 J Balvin - Ginza/4.mp3'
    ]
  },
  {
    id: 'track44',
    category: 'HITS LATINOS',
    name: 'TRACK 7',
    title: 'Po' Encima',
    artist: 'Arcángel',
    stems: [
      '/stems/HITS LATINOS/7 Arcángel - Po' Encima/1.mp3',
      '/stems/HITS LATINOS/7 Arcángel - Po' Encima/2.mp3',
      '/stems/HITS LATINOS/7 Arcángel - Po' Encima/3.mp3',
      '/stems/HITS LATINOS/7 Arcángel - Po' Encima/4.mp3'
    ]
  },
  {
    id: 'track45',
    category: 'HITS LATINOS',
    name: 'TRACK 8',
    title: 'Cuando No Era Cantante',
    artist: 'El Bogueto',
    stems: [
      '/stems/HITS LATINOS/8 El Bogueto - Cuando No Era Cantante/1.mp3',
      '/stems/HITS LATINOS/8 El Bogueto - Cuando No Era Cantante/2.mp3',
      '/stems/HITS LATINOS/8 El Bogueto - Cuando No Era Cantante/3.mp3',
      '/stems/HITS LATINOS/8 El Bogueto - Cuando No Era Cantante/4.mp3'
    ]
  },
  {
    id: 'track46',
    category: 'HITS LATINOS',
    name: 'TRACK 9',
    title: 'Diavla',
    artist: 'Chris Viz',
    stems: [
      '/stems/HITS LATINOS/9 Chris Viz - Diavla/1.mp3',
      '/stems/HITS LATINOS/9 Chris Viz - Diavla/2.mp3',
      '/stems/HITS LATINOS/9 Chris Viz - Diavla/3.mp3',
      '/stems/HITS LATINOS/9 Chris Viz - Diavla/4.mp3'
    ]
  },
  {
    id: 'track47',
    category: 'HITS LATINOS',
    name: 'TRACK 10',
    title: 'Mirándote',
    artist: 'Rvfv',
    stems: [
      '/stems/HITS LATINOS/10 Rvfv - Mirándote/1.mp3',
      '/stems/HITS LATINOS/10 Rvfv - Mirándote/2.mp3',
      '/stems/HITS LATINOS/10 Rvfv - Mirándote/3.mp3',
      '/stems/HITS LATINOS/10 Rvfv - Mirándote/4.mp3'
    ]
  },
  {
    id: 'track48',
    category: 'HITS LATINOS',
    name: 'TRACK 11',
    title: 'Afrorue',
    artist: 'Afrojuice',
    stems: [
      '/stems/HITS LATINOS/11 Afrojuice - Afrorue/1.mp3',
      '/stems/HITS LATINOS/11 Afrojuice - Afrorue/2.mp3',
      '/stems/HITS LATINOS/11 Afrojuice - Afrorue/3.mp3',
      '/stems/HITS LATINOS/11 Afrojuice - Afrorue/4.mp3'
    ]
  },
  {
    id: 'track49',
    category: 'HITS LATINOS',
    name: 'TRACK 12',
    title: 'Virtual Diva',
    artist: 'Don Omar',
    stems: [
      '/stems/HITS LATINOS/12 Don Omar - Virtual Diva/1.mp3',
      '/stems/HITS LATINOS/12 Don Omar - Virtual Diva/2.mp3',
      '/stems/HITS LATINOS/12 Don Omar - Virtual Diva/3.mp3',
      '/stems/HITS LATINOS/12 Don Omar - Virtual Diva/4.mp3'
    ]
  },
  {
    id: 'track50',
    category: 'HITS LATINOS',
    name: 'TRACK 13',
    title: 'El Señor de la Noche',
    artist: 'Don Omar',
    stems: [
      '/stems/HITS LATINOS/13 Don Omar - El Señor de la Noche/1.mp3',
      '/stems/HITS LATINOS/13 Don Omar - El Señor de la Noche/2.mp3',
      '/stems/HITS LATINOS/13 Don Omar - El Señor de la Noche/3.mp3',
      '/stems/HITS LATINOS/13 Don Omar - El Señor de la Noche/4.mp3'
    ]
  },
  {
    id: 'track51',
    category: 'HITS LATINOS',
    name: 'TRACK 14',
    title: 'La Rubia Remix',
    artist: 'La Nueva Escuela',
    stems: [
      '/stems/HITS LATINOS/14 La Nueva Escuela - La Rubia Remix/1.mp3',
      '/stems/HITS LATINOS/14 La Nueva Escuela - La Rubia Remix/2.mp3',
      '/stems/HITS LATINOS/14 La Nueva Escuela - La Rubia Remix/3.mp3',
      '/stems/HITS LATINOS/14 La Nueva Escuela - La Rubia Remix/4.mp3'
    ]
  },
  {
    id: 'track52',
    category: 'HITS LATINOS',
    name: 'TRACK 15',
    title: 'Té De Campana',
    artist: 'Atomic Otro Way',
    stems: [
      '/stems/HITS LATINOS/15 Atomic Otro Way - Té De Campana/1.mp3',
      '/stems/HITS LATINOS/15 Atomic Otro Way - Té De Campana/2.mp3',
      '/stems/HITS LATINOS/15 Atomic Otro Way - Té De Campana/3.mp3',
      '/stems/HITS LATINOS/15 Atomic Otro Way - Té De Campana/4.mp3'
    ]
  },
  {
    id: 'track53',
    category: 'HITS LATINOS',
    name: 'TRACK 16',
    title: 'Superman Sin Capa',
    artist: 'El Super Nuevo',
    stems: [
      '/stems/HITS LATINOS/16 El Super Nuevo - Superman Sin Capa/1.mp3',
      '/stems/HITS LATINOS/16 El Super Nuevo - Superman Sin Capa/2.mp3',
      '/stems/HITS LATINOS/16 El Super Nuevo - Superman Sin Capa/3.mp3',
      '/stems/HITS LATINOS/16 El Super Nuevo - Superman Sin Capa/4.mp3'
    ]
  },
  {
    id: 'track54',
    category: 'HITS LATINOS',
    name: 'TRACK 17',
    title: 'Se Va Pal Club',
    artist: 'Hugo Castejón',
    stems: [
      '/stems/HITS LATINOS/17 Hugo Castejón - Se Va Pal Club/1.mp3',
      '/stems/HITS LATINOS/17 Hugo Castejón - Se Va Pal Club/2.mp3',
      '/stems/HITS LATINOS/17 Hugo Castejón - Se Va Pal Club/3.mp3',
      '/stems/HITS LATINOS/17 Hugo Castejón - Se Va Pal Club/4.mp3'
    ]
  },
  {
    id: 'track55',
    category: 'HITS LATINOS',
    name: 'TRACK 18',
    title: 'EoO',
    artist: 'Bad Bunny',
    stems: [
      '/stems/HITS LATINOS/18 Bad Bunny - EoO/1.mp3',
      '/stems/HITS LATINOS/18 Bad Bunny - EoO/2.mp3',
      '/stems/HITS LATINOS/18 Bad Bunny - EoO/3.mp3',
      '/stems/HITS LATINOS/18 Bad Bunny - EoO/4.mp3'
    ]
  },
  {
    id: 'track56',
    category: 'HITS LATINOS',
    name: 'TRACK 19',
    title: 'Escándalo',
    artist: 'Ñengo Flow',
    stems: [
      '/stems/HITS LATINOS/19 Ñengo Flow - Escándalo/1.mp3',
      '/stems/HITS LATINOS/19 Ñengo Flow - Escándalo/2.mp3',
      '/stems/HITS LATINOS/19 Ñengo Flow - Escándalo/3.mp3',
      '/stems/HITS LATINOS/19 Ñengo Flow - Escándalo/4.mp3'
    ]
  },
  {
    id: 'track57',
    category: 'HITS LATINOS',
    name: 'TRACK 20',
    title: 'Me Mareo',
    artist: 'Kidd Voodoo',
    stems: [
      '/stems/HITS LATINOS/20 Kidd Voodoo - Me Mareo/1.mp3',
      '/stems/HITS LATINOS/20 Kidd Voodoo - Me Mareo/2.mp3',
      '/stems/HITS LATINOS/20 Kidd Voodoo - Me Mareo/3.mp3',
      '/stems/HITS LATINOS/20 Kidd Voodoo - Me Mareo/4.mp3'
    ]
  },
  {
    id: 'track58',
    category: 'HITS LATINOS',
    name: 'TRACK 21',
    title: 'Estrellita De Madrugada',
    artist: 'Omega El Fuerte',
    stems: [
      '/stems/HITS LATINOS/21 Omega El Fuerte - Estrellita De Madrugada/1.mp3',
      '/stems/HITS LATINOS/21 Omega El Fuerte - Estrellita De Madrugada/2.mp3',
      '/stems/HITS LATINOS/21 Omega El Fuerte - Estrellita De Madrugada/3.mp3',
      '/stems/HITS LATINOS/21 Omega El Fuerte - Estrellita De Madrugada/4.mp3'
    ]
  },
  {
    id: 'track59',
    category: 'HITS LATINOS',
    name: 'TRACK 22',
    title: 'Bby WOW',
    artist: 'Karol G',
    stems: [
      '/stems/HITS LATINOS/22 Karol G - Bby WOW/1.mp3',
      '/stems/HITS LATINOS/22 Karol G - Bby WOW/2.mp3',
      '/stems/HITS LATINOS/22 Karol G - Bby WOW/3.mp3',
      '/stems/HITS LATINOS/22 Karol G - Bby WOW/4.mp3'
    ]
  },
  {
    id: 'track60',
    category: 'HITS LATINOS',
    name: 'TRACK 23',
    title: 'Lamine',
    artist: 'Morad',
    stems: [
      '/stems/HITS LATINOS/23 Morad - Lamine/1.mp3',
      '/stems/HITS LATINOS/23 Morad - Lamine/2.mp3',
      '/stems/HITS LATINOS/23 Morad - Lamine/3.mp3',
      '/stems/HITS LATINOS/23 Morad - Lamine/4.mp3'
    ]
  },
  {
    id: 'track61',
    category: 'HITS LATINOS',
    name: 'TRACK 24',
    title: 'Azul',
    artist: 'J Balvin',
    stems: [
      '/stems/HITS LATINOS/24 J Balvin - Azul/1.mp3',
      '/stems/HITS LATINOS/24 J Balvin - Azul/2.mp3',
      '/stems/HITS LATINOS/24 J Balvin - Azul/3.mp3',
      '/stems/HITS LATINOS/24 J Balvin - Azul/4.mp3'
    ]
  },
  {
    id: 'track62',
    category: 'HITS LATINOS',
    name: 'TRACK 25',
    title: 'Da Me',
    artist: 'Bad Gyal',
    stems: [
      '/stems/HITS LATINOS/25 Bad Gyal - Da Me/1.mp3',
      '/stems/HITS LATINOS/25 Bad Gyal - Da Me/2.mp3',
      '/stems/HITS LATINOS/25 Bad Gyal - Da Me/3.mp3',
      '/stems/HITS LATINOS/25 Bad Gyal - Da Me/4.mp3'
    ]
  },
  {
    id: 'track63',
    category: 'HITS LATINOS',
    name: 'TRACK 26',
    title: 'La Graciosa',
    artist: 'Quevedo',
    stems: [
      '/stems/HITS LATINOS/26 Quevedo - La Graciosa/1.mp3',
      '/stems/HITS LATINOS/26 Quevedo - La Graciosa/2.mp3',
      '/stems/HITS LATINOS/26 Quevedo - La Graciosa/3.mp3',
      '/stems/HITS LATINOS/26 Quevedo - La Graciosa/4.mp3'
    ]
  },
  {
    id: 'track64',
    category: 'HITS LATINOS',
    name: 'TRACK 27',
    title: 'VeLDÁ',
    artist: 'Bad Bunny',
    stems: [
      '/stems/HITS LATINOS/27 Bad Bunny - VeLDÁ/1.mp3',
      '/stems/HITS LATINOS/27 Bad Bunny - VeLDÁ/2.mp3',
      '/stems/HITS LATINOS/27 Bad Bunny - VeLDÁ/3.mp3',
      '/stems/HITS LATINOS/27 Bad Bunny - VeLDÁ/4.mp3'
    ]
  },
  {
    id: 'track65',
    category: 'HITS LATINOS',
    name: 'TRACK 28',
    title: 'Provenza',
    artist: 'Karol G',
    stems: [
      '/stems/HITS LATINOS/28 Karol G - Provenza/1.mp3',
      '/stems/HITS LATINOS/28 Karol G - Provenza/2.mp3',
      '/stems/HITS LATINOS/28 Karol G - Provenza/3.mp3',
      '/stems/HITS LATINOS/28 Karol G - Provenza/4.mp3'
    ]
  },
  {
    id: 'track66',
    category: 'HITS LATINOS',
    name: 'TRACK 29',
    title: 'Feliz Cumpleaños Ferxxo',
    artist: 'Feid',
    stems: [
      '/stems/HITS LATINOS/29 Feid - Feliz Cumpleaños Ferxxo/1.mp3',
      '/stems/HITS LATINOS/29 Feid - Feliz Cumpleaños Ferxxo/2.mp3',
      '/stems/HITS LATINOS/29 Feid - Feliz Cumpleaños Ferxxo/3.mp3',
      '/stems/HITS LATINOS/29 Feid - Feliz Cumpleaños Ferxxo/4.mp3'
    ]
  },
  {
    id: 'track67',
    category: 'HITS LATINOS',
    name: 'TRACK 30',
    title: 'Yandel 150',
    artist: 'Feid',
    stems: [
      '/stems/HITS LATINOS/30 Feid - Yandel 150/1.mp3',
      '/stems/HITS LATINOS/30 Feid - Yandel 150/2.mp3',
      '/stems/HITS LATINOS/30 Feid - Yandel 150/3.mp3',
      '/stems/HITS LATINOS/30 Feid - Yandel 150/4.mp3'
    ]
  },
  {
    id: 'track68',
    category: 'HITS LATINOS',
    name: 'TRACK 31',
    title: 'Las más bonitas son putas',
    artist: 'Anuel AA',
    stems: [
      '/stems/HITS LATINOS/31 Anuel AA - Las más bonitas son putas/1.mp3',
      '/stems/HITS LATINOS/31 Anuel AA - Las más bonitas son putas/2.mp3',
      '/stems/HITS LATINOS/31 Anuel AA - Las más bonitas son putas/3.mp3',
      '/stems/HITS LATINOS/31 Anuel AA - Las más bonitas son putas/4.mp3'
    ]
  },
  {
    id: 'track69',
    category: 'HITS LATINOS',
    name: 'TRACK 32',
    title: 'Muchacha',
    artist: 'Aissa',
    stems: [
      '/stems/HITS LATINOS/32 Aissa - Muchacha/1.mp3',
      '/stems/HITS LATINOS/32 Aissa - Muchacha/2.mp3',
      '/stems/HITS LATINOS/32 Aissa - Muchacha/3.mp3',
      '/stems/HITS LATINOS/32 Aissa - Muchacha/4.mp3'
    ]
  },
  {
    id: 'track70',
    category: 'HITS LATINOS',
    name: 'TRACK 33',
    title: 'Sigues Con Él',
    artist: 'Arcángel',
    stems: [
      '/stems/HITS LATINOS/33 Arcángel - Sigues Con Él/1.mp3',
      '/stems/HITS LATINOS/33 Arcángel - Sigues Con Él/2.mp3',
      '/stems/HITS LATINOS/33 Arcángel - Sigues Con Él/3.mp3',
      '/stems/HITS LATINOS/33 Arcángel - Sigues Con Él/4.mp3'
    ]
  },
  {
    id: 'track71',
    category: 'HITS LATINOS',
    name: 'TRACK 34',
    title: 'Se Me Olvida',
    artist: 'Feid',
    stems: [
      '/stems/HITS LATINOS/34 Feid - Se Me Olvida/1.mp3',
      '/stems/HITS LATINOS/34 Feid - Se Me Olvida/2.mp3',
      '/stems/HITS LATINOS/34 Feid - Se Me Olvida/3.mp3',
      '/stems/HITS LATINOS/34 Feid - Se Me Olvida/4.mp3'
    ]
  },
  {
    id: 'track72',
    category: 'HITS LATINOS',
    name: 'TRACK 35',
    title: 'Ba Ba Bad Remix',
    artist: 'Kybba',
    stems: [
      '/stems/HITS LATINOS/35 Kybba - Ba Ba Bad Remix/1.mp3',
      '/stems/HITS LATINOS/35 Kybba - Ba Ba Bad Remix/2.mp3',
      '/stems/HITS LATINOS/35 Kybba - Ba Ba Bad Remix/3.mp3',
      '/stems/HITS LATINOS/35 Kybba - Ba Ba Bad Remix/4.mp3'
    ]
  },
  {
    id: 'track73',
    category: 'HITS LATINOS',
    name: 'TRACK 36',
    title: 'Goteras',
    artist: 'Omar Montes',
    stems: [
      '/stems/HITS LATINOS/36 Omar Montes - Goteras/1.mp3',
      '/stems/HITS LATINOS/36 Omar Montes - Goteras/2.mp3',
      '/stems/HITS LATINOS/36 Omar Montes - Goteras/3.mp3',
      '/stems/HITS LATINOS/36 Omar Montes - Goteras/4.mp3'
    ]
  },
  {
    id: 'track74',
    category: 'HITS LATINOS',
    name: 'TRACK 37',
    title: 'Satisfacción',
    artist: 'Arcángel',
    stems: [
      '/stems/HITS LATINOS/37 Arcángel - Satisfacción/1.mp3',
      '/stems/HITS LATINOS/37 Arcángel - Satisfacción/2.mp3',
      '/stems/HITS LATINOS/37 Arcángel - Satisfacción/3.mp3',
      '/stems/HITS LATINOS/37 Arcángel - Satisfacción/4.mp3'
    ]
  },
  {
    id: 'track75',
    category: 'HITS LATINOS',
    name: 'TRACK 38',
    title: 'Shiny',
    artist: 'Easykid',
    stems: [
      '/stems/HITS LATINOS/38 Easykid - Shiny/1.mp3',
      '/stems/HITS LATINOS/38 Easykid - Shiny/2.mp3',
      '/stems/HITS LATINOS/38 Easykid - Shiny/3.mp3',
      '/stems/HITS LATINOS/38 Easykid - Shiny/4.mp3'
    ]
  },
  {
    id: 'track76',
    category: 'HITS LATINOS',
    name: 'TRACK 39',
    title: 'Me Mareo',
    artist: 'Kidd Voodoo',
    stems: [
      '/stems/HITS LATINOS/39 Kidd Voodoo - Me Mareo/1.mp3',
      '/stems/HITS LATINOS/39 Kidd Voodoo - Me Mareo/2.mp3',
      '/stems/HITS LATINOS/39 Kidd Voodoo - Me Mareo/3.mp3',
      '/stems/HITS LATINOS/39 Kidd Voodoo - Me Mareo/4.mp3'
    ]
  },
  {
    id: 'track77',
    category: 'HITS LATINOS',
    name: 'TRACK 40',
    title: 'After',
    artist: 'Conep',
    stems: [
      '/stems/HITS LATINOS/40 Conep - After/1.mp3',
      '/stems/HITS LATINOS/40 Conep - After/2.mp3',
      '/stems/HITS LATINOS/40 Conep - After/3.mp3',
      '/stems/HITS LATINOS/40 Conep - After/4.mp3'
    ]
  },
  {
    id: 'track78',
    category: 'HITS LATINOS',
    name: 'TRACK 41',
    title: 'Nena Sad',
    artist: 'Pablo Chill-E',
    stems: [
      '/stems/HITS LATINOS/41 Pablo Chill-E - Nena Sad/1.mp3',
      '/stems/HITS LATINOS/41 Pablo Chill-E - Nena Sad/2.mp3',
      '/stems/HITS LATINOS/41 Pablo Chill-E - Nena Sad/3.mp3',
      '/stems/HITS LATINOS/41 Pablo Chill-E - Nena Sad/4.mp3'
    ]
  },
  {
    id: 'track79',
    category: 'HITS LATINOS',
    name: 'TRACK 42',
    title: 'Goteo',
    artist: 'Duki',
    stems: [
      '/stems/HITS LATINOS/42 Duki - Goteo/1.mp3',
      '/stems/HITS LATINOS/42 Duki - Goteo/2.mp3',
      '/stems/HITS LATINOS/42 Duki - Goteo/3.mp3',
      '/stems/HITS LATINOS/42 Duki - Goteo/4.mp3'
    ]
  },
  {
    id: 'track80',
    category: 'HITS LATINOS',
    name: 'TRACK 43',
    title: 'Vitamina',
    artist: 'Jombriel',
    stems: [
      '/stems/HITS LATINOS/43 Jombriel - Vitamina/1.mp3',
      '/stems/HITS LATINOS/43 Jombriel - Vitamina/2.mp3',
      '/stems/HITS LATINOS/43 Jombriel - Vitamina/3.mp3',
      '/stems/HITS LATINOS/43 Jombriel - Vitamina/4.mp3'
    ]
  },
  {
    id: 'track81',
    category: 'HITS LATINOS',
    name: 'TRACK 44',
    title: 'Jordan',
    artist: 'Ryan Castro',
    stems: [
      '/stems/HITS LATINOS/44 Ryan Castro - Jordan/1.mp3',
      '/stems/HITS LATINOS/44 Ryan Castro - Jordan/2.mp3',
      '/stems/HITS LATINOS/44 Ryan Castro - Jordan/3.mp3',
      '/stems/HITS LATINOS/44 Ryan Castro - Jordan/4.mp3'
    ]
  },
  {
    id: 'track82',
    category: 'HITS LATINOS',
    name: 'TRACK 45',
    title: 'Normal',
    artist: 'Feid',
    stems: [
      '/stems/HITS LATINOS/45 Feid - Normal/1.mp3',
      '/stems/HITS LATINOS/45 Feid - Normal/2.mp3',
      '/stems/HITS LATINOS/45 Feid - Normal/3.mp3',
      '/stems/HITS LATINOS/45 Feid - Normal/4.mp3'
    ]
  },
  {
    id: 'track83',
    category: 'HITS LATINOS',
    name: 'TRACK 46',
    title: 'Rápido',
    artist: 'Dei V',
    stems: [
      '/stems/HITS LATINOS/46 Dei V - Rápido/1.mp3',
      '/stems/HITS LATINOS/46 Dei V - Rápido/2.mp3',
      '/stems/HITS LATINOS/46 Dei V - Rápido/3.mp3',
      '/stems/HITS LATINOS/46 Dei V - Rápido/4.mp3'
    ]
  },
  {
    id: 'track84',
    category: 'HITS LATINOS',
    name: 'TRACK 47',
    title: 'Una Noche En Medellín',
    artist: 'Cris MJ',
    stems: [
      '/stems/HITS LATINOS/47 Cris MJ - Una Noche En Medellín/1.mp3',
      '/stems/HITS LATINOS/47 Cris MJ - Una Noche En Medellín/2.mp3',
      '/stems/HITS LATINOS/47 Cris MJ - Una Noche En Medellín/3.mp3',
      '/stems/HITS LATINOS/47 Cris MJ - Una Noche En Medellín/4.mp3'
    ]
  },
  {
    id: 'track85',
    category: 'HITS LATINOS',
    name: 'TRACK 48',
    title: 'Gata Only',
    artist: 'FloyyMenor',
    stems: [
      '/stems/HITS LATINOS/48 FloyyMenor - Gata Only/1.mp3',
      '/stems/HITS LATINOS/48 FloyyMenor - Gata Only/2.mp3',
      '/stems/HITS LATINOS/48 FloyyMenor - Gata Only/3.mp3',
      '/stems/HITS LATINOS/48 FloyyMenor - Gata Only/4.mp3'
    ]
  },
  {
    id: 'track86',
    category: 'HITS LATINOS',
    name: 'TRACK 49',
    title: 'Gatita Gangster',
    artist: 'Karol G',
    stems: [
      '/stems/HITS LATINOS/49 Karol G - Gatita Gangster/1.mp3',
      '/stems/HITS LATINOS/49 Karol G - Gatita Gangster/2.mp3',
      '/stems/HITS LATINOS/49 Karol G - Gatita Gangster/3.mp3',
      '/stems/HITS LATINOS/49 Karol G - Gatita Gangster/4.mp3'
    ]
  },
  {
    id: 'track87',
    category: 'HITS LATINOS',
    name: 'TRACK 50',
    title: 'Ley Seca',
    artist: 'Jhayco',
    stems: [
      '/stems/HITS LATINOS/50 Jhayco - Ley Seca/1.mp3',
      '/stems/HITS LATINOS/50 Jhayco - Ley Seca/2.mp3',
      '/stems/HITS LATINOS/50 Jhayco - Ley Seca/3.mp3',
      '/stems/HITS LATINOS/50 Jhayco - Ley Seca/4.mp3'
    ]
  },
  {
    id: 'track88',
    category: 'HITS LATINOS',
    name: 'TRACK 51',
    title: 'Loca Remix',
    artist: 'Khea',
    stems: [
      '/stems/HITS LATINOS/51 Khea - Loca Remix/1.mp3',
      '/stems/HITS LATINOS/51 Khea - Loca Remix/2.mp3',
      '/stems/HITS LATINOS/51 Khea - Loca Remix/3.mp3',
      '/stems/HITS LATINOS/51 Khea - Loca Remix/4.mp3'
    ]
  },
  {
    id: 'track89',
    category: 'HITS LATINOS',
    name: 'TRACK 52',
    title: 'Remedio',
    artist: 'JC Reyes',
    stems: [
      '/stems/HITS LATINOS/52 JC Reyes - Remedio/1.mp3',
      '/stems/HITS LATINOS/52 JC Reyes - Remedio/2.mp3',
      '/stems/HITS LATINOS/52 JC Reyes - Remedio/3.mp3',
      '/stems/HITS LATINOS/52 JC Reyes - Remedio/4.mp3'
    ]
  },
  {
    id: 'track90',
    category: 'HITS LATINOS',
    name: 'TRACK 53',
    title: 'Real Gangsta Love',
    artist: 'Trueno',
    stems: [
      '/stems/HITS LATINOS/53 Trueno - Real Gangsta Love/1.mp3',
      '/stems/HITS LATINOS/53 Trueno - Real Gangsta Love/2.mp3',
      '/stems/HITS LATINOS/53 Trueno - Real Gangsta Love/3.mp3',
      '/stems/HITS LATINOS/53 Trueno - Real Gangsta Love/4.mp3'
    ]
  },
  {
    id: 'track91',
    category: 'HITS LATINOS',
    name: 'TRACK 54',
    title: 'Besos',
    artist: 'Bando Boyz',
    stems: [
      '/stems/HITS LATINOS/54 Bando Boyz - Besos/1.mp3',
      '/stems/HITS LATINOS/54 Bando Boyz - Besos/2.mp3',
      '/stems/HITS LATINOS/54 Bando Boyz - Besos/3.mp3',
      '/stems/HITS LATINOS/54 Bando Boyz - Besos/4.mp3'
    ]
  },
  {
    id: 'track92',
    category: 'HITS LATINOS',
    name: 'TRACK 55',
    title: 'Nueva York (Toto)',
    artist: 'Bad Gyal',
    stems: [
      '/stems/HITS LATINOS/55 Bad Gyal - Nueva York (Toto)/1.mp3',
      '/stems/HITS LATINOS/55 Bad Gyal - Nueva York (Toto)/2.mp3',
      '/stems/HITS LATINOS/55 Bad Gyal - Nueva York (Toto)/3.mp3',
      '/stems/HITS LATINOS/55 Bad Gyal - Nueva York (Toto)/4.mp3'
    ]
  },
  {
    id: 'track93',
    category: 'HITS LATINOS',
    name: 'TRACK 56',
    title: 'Mbappé',
    artist: 'Eladio Carrión',
    stems: [
      '/stems/HITS LATINOS/56 Eladio Carrión - Mbappé/1.mp3',
      '/stems/HITS LATINOS/56 Eladio Carrión - Mbappé/2.mp3',
      '/stems/HITS LATINOS/56 Eladio Carrión - Mbappé/3.mp3',
      '/stems/HITS LATINOS/56 Eladio Carrión - Mbappé/4.mp3'
    ]
  },
  {
    id: 'track94',
    category: 'HITS LATINOS',
    name: 'TRACK 57',
    title: 'BnB',
    artist: 'Young Miko',
    stems: [
      '/stems/HITS LATINOS/57 Young Miko - BnB/1.mp3',
      '/stems/HITS LATINOS/57 Young Miko - BnB/2.mp3',
      '/stems/HITS LATINOS/57 Young Miko - BnB/3.mp3',
      '/stems/HITS LATINOS/57 Young Miko - BnB/4.mp3'
    ]
  },
  {
    id: 'track95',
    category: 'HITS LATINOS',
    name: 'TRACK 58',
    title: 'Si Me Gano Un Grammy',
    artist: 'Jon Z',
    stems: [
      '/stems/HITS LATINOS/58 Jon Z - Si Me Gano Un Grammy/1.mp3',
      '/stems/HITS LATINOS/58 Jon Z - Si Me Gano Un Grammy/2.mp3',
      '/stems/HITS LATINOS/58 Jon Z - Si Me Gano Un Grammy/3.mp3',
      '/stems/HITS LATINOS/58 Jon Z - Si Me Gano Un Grammy/4.mp3'
    ]
  },
  {
    id: 'track96',
    category: 'HITS LATINOS',
    name: 'TRACK 59',
    title: 'Little Demon',
    artist: 'Anuel AA',
    stems: [
      '/stems/HITS LATINOS/59  Anuel AA - Little Demon/1.mp3',
      '/stems/HITS LATINOS/59  Anuel AA - Little Demon/2.mp3',
      '/stems/HITS LATINOS/59  Anuel AA - Little Demon/3.mp3',
      '/stems/HITS LATINOS/59  Anuel AA - Little Demon/4.mp3'
    ]
  },
  {
    id: 'track97',
    category: 'HITS LATINOS',
    name: 'TRACK 60',
    title: 'Soldado y Profeta',
    artist: 'Anuel AA',
    stems: [
      '/stems/HITS LATINOS/60 Anuel AA - Soldado y Profeta/1.mp3',
      '/stems/HITS LATINOS/60 Anuel AA - Soldado y Profeta/2.mp3',
      '/stems/HITS LATINOS/60 Anuel AA - Soldado y Profeta/3.mp3',
      '/stems/HITS LATINOS/60 Anuel AA - Soldado y Profeta/4.mp3'
    ]
  },
  {
    id: 'track98',
    category: 'HITS LATINOS',
    name: 'TRACK 61',
    title: 'Si me hiciera el de la lengua',
    artist: 'Fanta Rosario',
    stems: [
      '/stems/HITS LATINOS/61 Fanta Rosario - Si me hiciera el de la lengua/1.mp3',
      '/stems/HITS LATINOS/61 Fanta Rosario - Si me hiciera el de la lengua/2.mp3',
      '/stems/HITS LATINOS/61 Fanta Rosario - Si me hiciera el de la lengua/3.mp3',
      '/stems/HITS LATINOS/61 Fanta Rosario - Si me hiciera el de la lengua/4.mp3'
    ]
  },
  {
    id: 'track99',
    category: 'HITS LATINOS',
    name: 'TRACK 62',
    title: 'Soldado y Profeta',
    artist: 'Anuel AA',
    stems: [
      '/stems/HITS LATINOS/62 Anuel AA - Soldado y Profeta/1.mp3',
      '/stems/HITS LATINOS/62 Anuel AA - Soldado y Profeta/2.mp3',
      '/stems/HITS LATINOS/62 Anuel AA - Soldado y Profeta/3.mp3',
      '/stems/HITS LATINOS/62 Anuel AA - Soldado y Profeta/4.mp3'
    ]
  },
  {
    id: 'track100',
    category: 'HITS LATINOS',
    name: 'TRACK 63',
    title: 'Callaita',
    artist: 'Bad Bunny',
    stems: [
      '/stems/HITS LATINOS/63 Bad Bunny - Callaita/1.mp3',
      '/stems/HITS LATINOS/63 Bad Bunny - Callaita/2.mp3',
      '/stems/HITS LATINOS/63 Bad Bunny - Callaita/3.mp3',
      '/stems/HITS LATINOS/63 Bad Bunny - Callaita/4.mp3'
    ]
  },
  {
    id: 'track101',
    category: 'HITS LATINOS',
    name: 'TRACK 64',
    title: 'Pacto',
    artist: 'Jay Wheeler',
    stems: [
      '/stems/HITS LATINOS/64 Jay Wheeler - Pacto/1.mp3',
      '/stems/HITS LATINOS/64 Jay Wheeler - Pacto/2.mp3',
      '/stems/HITS LATINOS/64 Jay Wheeler - Pacto/3.mp3',
      '/stems/HITS LATINOS/64 Jay Wheeler - Pacto/4.mp3'
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
          <div className="selection-tracks-grid">
            {categories.map(category => (
              <React.Fragment key={category}>
                {/* Category Title Card */}
                <div className="track-square-card category-title-card">
                  <span className="category-card-title">{category}</span>
                </div>
                {/* Tracks inside this category */}
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
              </React.Fragment>
            ))}
          </div>
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
