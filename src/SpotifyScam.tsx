import React, { useEffect } from 'react';

export const SpotifyScam: React.FC = () => {
  useEffect(() => {
    document.title = "DESCARGAR ESPOTIFAI GRATIS PREMIUM";
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = "https://chat.whatsapp.com/HqKikl0hsBaKrPeKZe9jH0";
  };

  return (
    <div 
      onClick={handleClick}
      style={{
        minHeight: '100vh',
        width: '100vw',
        backgroundColor: '#00ff00',
        color: '#ff00ff',
        fontFamily: '"Comic Sans MS", "Comic Sans", cursive',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '2rem',
        cursor: 'pointer',
        boxSizing: 'border-box',
        overflow: 'hidden',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 999999
      }}
    >
      <h1 style={{ fontSize: '5rem', textShadow: '4px 4px #000', margin: 0, animation: 'blink 0.5s infinite' }}>
        !!! DESCARGAR ESPOTIFAI PREMIUN GRATIS !!!
      </h1>
      
      <p style={{ fontSize: '3rem', fontWeight: 'bold', background: 'yellow', color: 'red', padding: '10px', border: '5px dashed red', marginTop: '2rem' }}>
        ¡¡ HAZ CLIC AQUÍ PARA DESCARGAR LA APK 100% LIBRE DE VIRUS !!
      </p>

      <div style={{ fontSize: '10rem', marginTop: '2rem', animation: 'bounce 1s infinite' }}>
        👇👇👇
      </div>

      <button style={{
        fontSize: '4rem',
        padding: '2rem 4rem',
        backgroundColor: 'red',
        color: 'yellow',
        border: '10px solid blue',
        borderRadius: '50px',
        fontWeight: 'bold',
        cursor: 'pointer',
        marginTop: '2rem',
        boxShadow: '10px 10px 0px black'
      }}>
        DESCARGAR.EXE
      </button>

      <style>{`
        @keyframes blink {
          0% { opacity: 1; color: #ff00ff; }
          50% { opacity: 0; }
          100% { opacity: 1; color: yellow; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-50px); }
        }
      `}</style>
    </div>
  );
};
