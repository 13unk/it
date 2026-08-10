import React, { useEffect, useState, useRef } from 'react';
import './StreamChat.css';

interface AlertMessage {
  id: string;
  title: string;
  message: string;
  theme: 'purple' | 'cyan' | 'gold' | 'red';
  sound: 'none' | 'bell' | 'retro' | 'laser';
  layout: 'top-right-banner' | 'full-bottom-banner' | 'top-left-alert';
  avatar: string;
}

export const StreamChatOverlay: React.FC = () => {
  const [currentAlert, setCurrentAlert] = useState<AlertMessage | null>(null);
  const [animationClass, setAnimationClass] = useState<string>('');
  
  const currentAlertRef = useRef<AlertMessage | null>(null);
  const timerRef = useRef<number | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Play synthetic sound using Web Audio API
  const playSynthSound = (soundType: AlertMessage['sound']) => {
    if (soundType === 'none') return;
    
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = audioCtxRef.current || new AudioContextClass();
      audioCtxRef.current = ctx;

      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const now = ctx.currentTime;

      if (soundType === 'bell') {
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(880, now);

        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(1320, now);

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
    const topic = 'unked-obs-chat-stream-alerts';
    const sseUrl = `https://ntfy.sh/${topic}/sse`;
    
    const eventSource = new EventSource(sseUrl);

    eventSource.onmessage = (event) => {
      try {
        const sseData = JSON.parse(event.data);
        if (sseData.event !== 'message') return;

        const payload = JSON.parse(sseData.message);

        // If it's a clear command
        if (payload.action === 'clear') {
          if (timerRef.current) window.clearTimeout(timerRef.current);
          
          const currentLayout = currentAlertRef.current?.layout || 'top-right-banner';
          setAnimationClass(`alert-animate-exit layout-${currentLayout}`);
          
          timerRef.current = window.setTimeout(() => {
            setCurrentAlert(null);
            currentAlertRef.current = null;
          }, 450); // matching slide exit animation duration
          return;
        }
        
        // Show new alert
        const newAlert: AlertMessage = {
          id: sseData.id || String(Date.now()),
          title: payload.title || 'AVISO',
          message: payload.message || '',
          theme: payload.theme || 'purple',
          sound: payload.sound || 'bell',
          layout: payload.layout || 'top-right-banner',
          avatar: payload.avatar || '/unklogo.png',
        };

        if (timerRef.current) window.clearTimeout(timerRef.current);

        // Play the alert sound
        playSynthSound(newAlert.sound);

        // Show the alert
        setCurrentAlert(newAlert);
        currentAlertRef.current = newAlert;
        setAnimationClass(`alert-animate-enter layout-${newAlert.layout}`);

      } catch (err) {
        console.error('Error receiving or parsing stream chat event:', err);
      }
    };

    return () => {
      eventSource.close();
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className="chroma-container">
      {currentAlert && (
        <div className={`stream-alert-card theme-${currentAlert.theme} layout-${currentAlert.layout} ${animationClass}`}>
          <div className="alert-header">
            <img 
              src={currentAlert.avatar} 
              alt="Avatar" 
              className="alert-avatar-img" 
              onError={(e) => { (e.target as HTMLImageElement).src = '/unklogo.png'; }}
            />
            <span className="alert-header-title">{currentAlert.title}</span>
          </div>
          <div className="alert-body">
            {currentAlert.message}
          </div>
        </div>
      )}
    </div>
  );
};
