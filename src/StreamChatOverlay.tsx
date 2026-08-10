import React, { useEffect, useState, useRef } from 'react';
import { ShieldAlert } from 'lucide-react';
import './StreamChat.css';

interface AlertMessage {
  id: string;
  title: string;
  message: string;
  theme: 'purple' | 'cyan' | 'gold' | 'red';
  duration: number; // in milliseconds
  sound: 'none' | 'bell' | 'retro' | 'laser';
}

export const StreamChatOverlay: React.FC = () => {
  const [currentAlert, setCurrentAlert] = useState<AlertMessage | null>(null);
  const [animationClass, setAnimationClass] = useState<string>('');
  const [progressWidth, setProgressWidth] = useState<number>(100);
  
  const timerRef = useRef<number | null>(null);
  const progressIntervalRef = useRef<number | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Play synthetic sound using Web Audio API
  const playSynthSound = (soundType: AlertMessage['sound']) => {
    if (soundType === 'none') return;
    
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = audioCtxRef.current || new AudioContextClass();
      audioCtxRef.current = ctx;

      // Resume context if suspended
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const now = ctx.currentTime;

      if (soundType === 'bell') {
        // Bell chime: Dual sine wave oscillators with exponential decay
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(880, now); // A5

        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(1320, now); // E6 (harmonic)

        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.3, now + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

        osc1.connect(gainNode);
        osc2.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 1.3);
        osc2.stop(now + 1.3);
      } else if (soundType === 'retro') {
        // Retro Blip: Square wave with quick pitch sweep
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(1200, now + 0.15);

        gainNode.gain.setValueAtTime(0.15, now);
        gainNode.gain.linearRampToValueAtTime(0.15, now + 0.1);
        gainNode.gain.linearRampToValueAtTime(0.001, now + 0.2);

        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.22);
      } else if (soundType === 'laser') {
        // Laser Sweep: Sawtooth wave sweeping down in pitch
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(1500, now);
        osc.frequency.exponentialRampToValueAtTime(180, now + 0.35);

        gainNode.gain.setValueAtTime(0.15, now);
        gainNode.gain.linearRampToValueAtTime(0.1, now + 0.2);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.45);
      }
    } catch (e) {
      console.warn("Could not play synthesized alert sound", e);
    }
  };

  useEffect(() => {
    // Topic: unked-obs-chat-stream-alerts (using a highly unique pub-sub topic)
    const topic = 'unked-obs-chat-stream-alerts';
    const sseUrl = `https://ntfy.sh/${topic}/sse`;
    
    const eventSource = new EventSource(sseUrl);

    eventSource.onmessage = (event) => {
      try {
        const sseData = JSON.parse(event.data);
        if (sseData.event !== 'message') return;

        // Parse custom JSON payload from the ntfy message field
        const payload = JSON.parse(sseData.message);
        
        const newAlert: AlertMessage = {
          id: sseData.id || String(Date.now()),
          title: payload.title || 'AVISO',
          message: payload.message || '',
          theme: payload.theme || 'purple',
          duration: payload.duration || 5000,
          sound: payload.sound || 'bell',
        };

        // Clear existing timers
        if (timerRef.current) window.clearTimeout(timerRef.current);
        if (progressIntervalRef.current) window.clearInterval(progressIntervalRef.current);

        // Play the alert sound
        playSynthSound(newAlert.sound);

        // Show the alert
        setCurrentAlert(newAlert);
        setAnimationClass('alert-animate-enter');
        setProgressWidth(100);

        // Track remaining progress bar width
        const startTime = Date.now();
        const intervalMs = 50;
        
        progressIntervalRef.current = window.setInterval(() => {
          const elapsed = Date.now() - startTime;
          const remainingPercent = Math.max(0, 100 - (elapsed / newAlert.duration) * 100);
          setProgressWidth(remainingPercent);
          
          if (elapsed >= newAlert.duration) {
            if (progressIntervalRef.current) window.clearInterval(progressIntervalRef.current);
          }
        }, intervalMs);

        // Schedule exit animation
        timerRef.current = window.setTimeout(() => {
          setAnimationClass('alert-animate-exit');
          
          // Clear current alert from DOM once exit animation finishes
          timerRef.current = window.setTimeout(() => {
            setCurrentAlert(null);
          }, 450); // matching slideOutUp animation duration
        }, newAlert.duration);

      } catch (err) {
        console.error('Error receiving or parsing stream chat event:', err);
      }
    };

    return () => {
      eventSource.close();
      if (timerRef.current) window.clearTimeout(timerRef.current);
      if (progressIntervalRef.current) window.clearInterval(progressIntervalRef.current);
    };
  }, []);

  return (
    <div className="chroma-container">
      {currentAlert && (
        <div className={`stream-alert-card theme-${currentAlert.theme} ${animationClass}`}>
          <div className="alert-header">
            <ShieldAlert size={20} className="alert-header-icon" />
            <span className="alert-header-title">{currentAlert.title}</span>
          </div>
          <div className="alert-body">
            {currentAlert.message}
          </div>
          <div className="alert-progress-track">
            <div 
              className="alert-progress-fill" 
              style={{ width: `${progressWidth}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};
