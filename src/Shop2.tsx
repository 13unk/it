import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Radio, 
  Terminal, 
  Volume2, 
  VolumeX, 
  Tv, 
  ArrowLeft, 
  ExternalLink, 
  AlertTriangle, 
  Box, 
  Zap, 
  ShieldCheck,
  PackageCheck
} from 'lucide-react';
import './Shop2.css';

interface CargoItem {
  id: string;
  tracking: string;
  destination: string;
  weight: string;
  stickers: string[];
  garmentName: string;
  brand: string;
  year: string;
  marketPrice: string;
  condition: string;
  image: string;
  seizedReason: string;
}

const CARGO_INVENTORY: CargoItem[] = [
  {
    id: 'box-01',
    tracking: 'TRK-8812-SEIZED-BCN',
    destination: 'BARCELONA // TERMINAL 4',
    weight: '1.45 KG',
    stickers: ['FRAGILE', 'SEIZED', 'CUSTOMS'],
    garmentName: 'Detroit Jacket J01 Workwear',
    brand: 'Carhartt Vintage',
    year: '1998',
    marketPrice: '380€',
    condition: 'Distressed Waxed Canvas / Natural Fading',
    image: '/blueprint_jacket.jpg',
    seizedReason: 'Retenido en aduana por contrabando textil no declarado'
  },
  {
    id: 'box-02',
    tracking: 'TRK-9941-CUSTOMS-MAD',
    destination: 'MADRID // MUELLE 12',
    weight: '0.82 KG',
    stickers: ['CUSTOMS', 'PRIORITY', 'INSPECTED'],
    garmentName: 'Alpha SV Gore-Tex Shell 3L',
    brand: "Arc'teryx Vintage",
    year: '1996',
    marketPrice: '520€',
    condition: 'Golden Era Golden Dragon Logo / Taped Seams',
    image: '/blueprint_tactical.jpg',
    seizedReason: 'Manifiesto de carga sospechoso // Inspección ZEBRA'
  },
  {
    id: 'box-03',
    tracking: 'TRK-1029-SEIZED-VLC',
    destination: 'VALENCIA // CARGA 02',
    weight: '2.10 KG',
    stickers: ['FRAGILE', 'SEIZED'],
    garmentName: 'Raso Gommato Bomber Jacket',
    brand: 'Stone Island Archivio',
    year: '1999',
    marketPrice: '640€',
    condition: 'Dutch Rope System / Original Green Badge',
    image: '/blueprint_jacket.jpg',
    seizedReason: 'Lote clasificado como archivo restringido'
  },
  {
    id: 'box-04',
    tracking: 'TRK-4482-INTERCEPT-BIO',
    destination: 'BILBAO // DÁRSENA 07',
    weight: '1.15 KG',
    stickers: ['CUSTOMS', 'FRAGILE', 'PRIORITY'],
    garmentName: 'Lineage Tactical Utility Vest',
    brand: 'Prada Sport Vintage',
    year: '2001',
    marketPrice: '340€',
    condition: 'Red Tab Iconic / Multi-Pockets Nylon',
    image: '/blueprint_tactical.jpg',
    seizedReason: 'Clandestinidad detectada en escaneo de rayos X'
  }
];

export function Shop2() {
  const navigate = useNavigate();

  // State
  const [quota, setQuota] = useState<number>(14);
  const [scanlines, setScanlines] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [selectedBox, setSelectedBox] = useState<CargoItem | null>(null);
  const [interceptedItem, setInterceptedItem] = useState<CargoItem | null>(null);
  const [logs, setLogs] = useState<string[]>([
    '22:40:02 [SYS] NODO CARGA #04 CONECTADO VIA PROTOCOLO GUERRILLA',
    '22:40:15 [ZEBRA] ETIQUETADORA TÉRMICA EN LÍNEA (BUFFER: 100%)',
    '22:40:32 [AUDITOR] LÁSER BARCODE 650nm CALIBRADO Y ACTIVO',
    '22:40:48 [CARGO] PAQUETE #TRK-8812 DETECTADO EN BANDA TRANSPORTADORA',
    '22:41:00 [ADUANA] BYPASS DE PUERTO EXITOSO // TOKEN 5€ REQUERIDO'
  ]);

  // Audio synthesizer via Web Audio API (zero external assets required)
  const playLaserSound = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(850, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.16);

      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.16);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.16);
    } catch {
      // AudioContext fallback
    }
  };

  const playSuccessChirp = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;

      // Two-tone beep
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'square';
      osc1.frequency.setValueAtTime(520, now);
      osc1.frequency.setValueAtTime(1040, now + 0.08);

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(1300, now + 0.08);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.28);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now + 0.08);
      osc1.stop(now + 0.28);
      osc2.stop(now + 0.28);
    } catch {
      // AudioContext fallback
    }
  };

  // Intercept Action Trigger
  const handleIntercept = (specificItem?: CargoItem) => {
    if (isScanning) return;

    playLaserSound();
    setIsScanning(true);

    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    const itemToIntercept = specificItem || CARGO_INVENTORY[Math.floor(Math.random() * CARGO_INVENTORY.length)];

    setLogs((prev) => [
      `${timeStr} [LÁSER] INTERCEPTANDO SEÑAL PAQUETE #${itemToIntercept.tracking}...`,
      `${timeStr} [ZEBRA] DECODIFICANDO MANIFIESTO DE CARGA...`,
      ...prev.slice(0, 5)
    ]);

    setTimeout(() => {
      playSuccessChirp();
      setIsScanning(false);
      setInterceptedItem(itemToIntercept);
      setQuota((prev) => Math.max(0, prev - 1));

      setLogs((prev) => [
        `${timeStr} [ÉXITO] PAQUETE INTERCEPTADO: ${itemToIntercept.garmentName} (${itemToIntercept.marketPrice})`,
        ...prev.slice(0, 5)
      ]);
    }, 1200);
  };

  // Add occasional background terminal chatter
  useEffect(() => {
    const interval = setInterval(() => {
      const randomTracks = ['TRK-8812', 'TRK-9941', 'TRK-1029', 'TRK-4482', 'TRK-0017'];
      const track = randomTracks[Math.floor(Math.random() * randomTracks.length)];
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];

      setLogs((prev) => [
        `${timeStr} [TELEMETRÍA] BANDA TRANSPORTADORA: VELOCIDAD 0.42 m/s // CARGA EN BANDA: #${track}`,
        ...prev.slice(0, 5)
      ]);
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="shop2-wrapper">
      {/* Background Photography & Gritty Textures */}
      <div className="shop2-bg-layer" />
      <div className="shop2-vignette" />
      {scanlines && <div className="shop2-scanlines" />}
      <div className="shop2-grain" />

      {/* Top Hazard Warning Stripe */}
      <div className="hazard-stripe-bar" />

      <div className="shop2-content">
        {/* Top Header & Terminal Controls */}
        <header className="shop2-header">
          <div className="shop2-header-brand">
            <div className="shop2-logo" onClick={() => navigate('/SHOP')}>
              <span>UNKED // GUERRILLA</span>
              <span className="shop2-logo-tag">TERMINAL #04</span>
            </div>
          </div>

          <div className="shop2-header-actions">
            <button 
              className={`shop2-btn-ghost ${soundEnabled ? 'active' : ''}`}
              onClick={() => setSoundEnabled(!soundEnabled)}
              title="Alternar Efectos de Audio"
            >
              {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
              <span>{soundEnabled ? 'SFX: ON' : 'SFX: OFF'}</span>
            </button>

            <button 
              className={`shop2-btn-ghost ${scanlines ? 'active' : ''}`}
              onClick={() => setScanlines(!scanlines)}
              title="Alternar Monitor CRT Scanlines"
            >
              <Tv size={14} />
              <span>{scanlines ? 'CRT: ON' : 'CRT: OFF'}</span>
            </button>

            <button 
              className="shop2-btn-ghost"
              onClick={() => navigate('/SHOP')}
            >
              <ArrowLeft size={14} />
              <span>TIENDA ESTÁNDAR</span>
            </button>
          </div>
        </header>

        {/* ====================================================================
            DIGITAL LED TICKER DISPLAY
            "[TERMINAL DE CARGA #04 - ACTIVO HASTA EL DOMINGO] // CUPO DE BÚSQUEDAS: 14/20"
            ==================================================================== */}
        <section className="shop2-ticker-container">
          <div className="shop2-ticker-indicator">
            <div className="blinking-led-dot" />
            <span className="ticker-label-status">EN VIVO</span>
          </div>

          <div className="shop2-ticker-marquee">
            <div className="shop2-ticker-text">
              [TERMINAL DE CARGA #04 - ACTIVO HASTA EL DOMINGO] // CUPO DE BÚSQUEDAS:{' '}
              <span className="ticker-highlight-quota">{quota}/20</span>
              {' '}/// [POP-UP STORE CLANDESTINO] // PROTOCOLO DE INTERCEPCIÓN HACKEADO // ETIQUETAS ZEBRA EN REGLA /// SISTEMA OPERATIVO UNK-CORE V4.1 /// [TERMINAL DE CARGA #04 - ACTIVO HASTA EL DOMINGO] // CUPO DE BÚSQUEDAS:{' '}
              <span className="ticker-highlight-quota">{quota}/20</span>
            </div>
          </div>
        </section>

        {/* Main Interactive Stage */}
        <main className="shop2-stage">
          {/* Telemetry Status Grid */}
          <div className="shop2-telemetry-grid">
            <div className="telemetry-card">
              <div className="telemetry-title">
                <span>TERMINAL LOCAL</span>
                <Radio size={12} color="#00ff66" />
              </div>
              <div className="telemetry-val">MUELLE #04 // NODO SUR</div>
            </div>

            <div className="telemetry-card">
              <div className="telemetry-title">
                <span>CUPO RESTANTE</span>
                <Terminal size={12} color="#ffcc00" />
              </div>
              <div className="telemetry-val accent-green">{quota} DE 20 TOKENS</div>
            </div>

            <div className="telemetry-card">
              <div className="telemetry-title">
                <span>ESTADO ESCÁNER</span>
                <Zap size={12} color="#ff3c00" />
              </div>
              <div className="telemetry-val accent-amber">
                {isScanning ? '>>> ESCANEANDO <<<' : 'ROBOCOP VISOR: ONLINE'}
              </div>
            </div>

            <div className="telemetry-card">
              <div className="telemetry-title">
                <span>COSTO INTERCEPCIÓN</span>
                <ShieldCheck size={12} color="#00ff66" />
              </div>
              <div className="telemetry-val">5.00€ // TOKEN ÚNICO</div>
            </div>
          </div>

          {/* ====================================================================
              CONVEYOR BELT INTERACTIVE DECK
              Rusted active conveyor horizontal carrying cardboard boxes with stickers
              ==================================================================== */}
          <div className="conveyor-deck">
            {/* Red Laser Emitter Beam Sweeping on the conveyor */}
            <div className="laser-emitter-bar">
              <div className="laser-emitter-point" />
            </div>

            <div className="deck-header">
              <div className="deck-title">
                <Box size={16} />
                <span>BANDA TRANSPORTADORA ACTIVA // INTERCEPTOR DE CARGA #04</span>
              </div>
              <div className="deck-tags">
                <span className="pill-tag seized">PAQUETES INCAUTADOS</span>
                <span className="pill-tag">ETIQUETAS ZEBRA</span>
                <span className="pill-tag">CÓDIGOS 39</span>
              </div>
            </div>

            {/* Horizontal Conveyor Track with moving cargo */}
            <div className="conveyor-track-container">
              <div className="conveyor-stream">
                {CARGO_INVENTORY.map((box) => (
                  <div
                    key={box.id}
                    className={`cargo-box ${selectedBox?.id === box.id ? 'intercepted-box' : ''}`}
                    onClick={() => {
                      setSelectedBox(box);
                      handleIntercept(box);
                    }}
                    title="Haz clic para apuntar el escáner láser a esta caja"
                  >
                    {/* Fragile & Seized Stamps */}
                    <div className="box-sticker-fragile">FRÁGIL / FRAGILE</div>
                    <div className="box-stamp-seized">SEIZED</div>
                    <div className="box-customs-tag">ADUANAS // OK</div>

                    {/* Zebra Thermal Shipping Label */}
                    <div className="box-thermal-label">
                      <div className="box-dest">{box.destination}</div>
                      <div className="box-weight">PESO: {box.weight}</div>
                      <div className="box-barcode">*UNK-{box.tracking.slice(4, 12)}*</div>
                      <div style={{ fontSize: '0.6rem', color: '#555', marginTop: '2px' }}>
                        ID: {box.tracking}
                      </div>
                    </div>

                    <div className="box-click-hint">
                      [ CLIC // INTERCEPTAR ]
                    </div>
                  </div>
                ))}
              </div>
              <div className="conveyor-rollers" />
            </div>
          </div>

          {/* ====================================================================
              WEATHERED TAPE CTA BUTTON (Primary prompt element)
              "[INTERCEPTAR PAQUETE // ACTIVAR ESCANEO (TOKEN 5€)]"
              ==================================================================== */}
          <div className="shop2-cta-dock">
            <button
              className="tape-cta-button"
              onClick={() => handleIntercept()}
              disabled={isScanning}
            >
              {isScanning 
                ? '>>> ESCANEANDO RAYO LÁSER... <<<' 
                : '[INTERCEPTAR PAQUETE // ACTIVAR ESCANEO (TOKEN 5€)]'
              }
            </button>
            <div className="tape-cta-caption">
              <span>ESTADO: AUDITOR GUERRILLA CONECTADO</span>
              <span>•</span>
              <span className="badge-token-price">TARIFA PLANA 5€ / BÚSQUEDA</span>
              <span>•</span>
              <span>RESTANTES: {quota} CUPOS</span>
            </div>
          </div>

          {/* ====================================================================
              SCATTERED BLUEPRINT & THERMAL ZEBRA GRAPHICS
              Vintage jackets with estimated market prices, tracking numbers, CAD arrows
              ==================================================================== */}
          <section className="shop2-blueprint-section">
            <div className="section-hacker-header">
              <div className="hacker-title-wrap">
                <h2>
                  <AlertTriangle size={20} color="#f59e0b" />
                  <span>MANIFIESTOS DE ESPECIFICACIÓN TÉCNICA // ZEBRA THERMAL</span>
                </h2>
                <p>
                  Archivos esquemáticos wireframe interceptados de piezas de archivo vintage. Valores estimados en mercado secundario.
                </p>
              </div>
            </div>

            <div className="blueprint-grid">
              {/* Item 1: Vintage Carhartt Detroit Jacket */}
              <div className="blueprint-card">
                <div className="blueprint-image-holder">
                  <img 
                    src="/blueprint_jacket.jpg" 
                    alt="Vintage Carhartt Detroit Jacket Technical Blueprint" 
                  />
                  <div className="blueprint-cad-badge">
                    DWG: CJ-01-VINTAGE-REV1 // CAD WIREFRAME
                  </div>
                </div>

                <div className="blueprint-zebra-ticket">
                  <div className="ticket-sawtooth-cut" />
                  <div className="zebra-header">
                    <span className="zebra-logo">ZEBRA ZPL-II INTERCEPT</span>
                    <span className="zebra-tracking">TRK-8812-SEIZED</span>
                  </div>

                  <h3 className="zebra-garment-title">
                    Vintage Carhartt Detroit Workwear J01
                  </h3>

                  <div className="zebra-specs-row">
                    <span>AÑO ESTIMADO: 1998</span>
                    <span>TALLA: L (OVERSIZED)</span>
                  </div>
                  <div className="zebra-specs-row">
                    <span>ACABADO: LONA ENCERADA NATURAL</span>
                    <span>CREMALLERA: #10 BRASS</span>
                  </div>

                  <div className="zebra-price-box">
                    <span className="zebra-est-label">VALOR DE MERCADO ESTIMADO:</span>
                    <span className="zebra-price-val">380,00 €</span>
                  </div>

                  <div className="zebra-barcode-strip">
                    *8812-CARHARTT-DETROIT*
                  </div>

                  <button 
                    className="ticket-claim-btn"
                    onClick={() => handleIntercept(CARGO_INVENTORY[0])}
                  >
                    <span>INTERCEPTAR ESTE LOTE (TOKEN 5€)</span>
                    <ExternalLink size={14} />
                  </button>
                </div>
              </div>

              {/* Item 2: Vintage Arc'teryx / Gore-Tex Tactical Shell */}
              <div className="blueprint-card">
                <div className="blueprint-image-holder">
                  <img 
                    src="/blueprint_tactical.jpg" 
                    alt="Vintage Arc'teryx Technical Shell Schematic Blueprint" 
                  />
                  <div className="blueprint-cad-badge">
                    DWG: ARC-AX-001/A // GORE-TEX 3L SCHEMATIC
                  </div>
                </div>

                <div className="blueprint-zebra-ticket">
                  <div className="ticket-sawtooth-cut" />
                  <div className="zebra-header">
                    <span className="zebra-logo">ZEBRA ZPL-II INTERCEPT</span>
                    <span className="zebra-tracking">TRK-9941-CUSTOMS</span>
                  </div>

                  <h3 className="zebra-garment-title">
                    Arc'teryx Alpha SV Gore-Tex Shell 90s
                  </h3>

                  <div className="zebra-specs-row">
                    <span>AÑO ESTIMADO: 1996</span>
                    <span>TALLA: M / M (TECHNICAL)</span>
                  </div>
                  <div className="zebra-specs-row">
                    <span>TEJIDO: GORE-TEX PRO 3L</span>
                    <span>COSTURAS: 13mm TAPED SEAMS</span>
                  </div>

                  <div className="zebra-price-box">
                    <span className="zebra-est-label">VALOR DE MERCADO ESTIMADO:</span>
                    <span className="zebra-price-val">520,00 €</span>
                  </div>

                  <div className="zebra-barcode-strip">
                    *9941-ARCTERYX-ALPHA-SV*
                  </div>

                  <button 
                    className="ticket-claim-btn"
                    onClick={() => handleIntercept(CARGO_INVENTORY[1])}
                  >
                    <span>INTERCEPTAR ESTE LOTE (TOKEN 5€)</span>
                    <ExternalLink size={14} />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* ====================================================================
              CLANDESTINE TERMINAL LOG FEED
              ==================================================================== */}
          <div className="shop2-terminal-feed">
            <div className="feed-header">
              <span>TERMINAL #04 // BUFFER DE CARGA Y LOGS EN TIEMPO REAL</span>
              <span>SYS_ENCRYPT: AES-256</span>
            </div>
            <div className="feed-stream">
              {logs.map((log, index) => (
                <div 
                  key={index} 
                  className={
                    index === 0 
                      ? 'line-highlight' 
                      : log.includes('INTERCEPT') || log.includes('ADUANA') 
                      ? 'line-alert' 
                      : ''
                  }
                >
                  &gt; {log}
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Bottom Hazard Warning Stripe */}
        <div className="hazard-stripe-bar" style={{ marginTop: '3rem' }} />

        {/* Footer */}
        <footer className="shop2-footer">
          <div className="shop2-footer-links">
            <span onClick={() => navigate('/SHOP')}>TIENDA OFICIAL BESTFITS</span>
            <span onClick={() => navigate('/SHOP/ALL')}>CATÁLOGO COMPLETO</span>
            <span onClick={() => navigate('/TRACKING')}>RASTREO DE ENVÍO</span>
            <span onClick={() => navigate('/root')}>SISTEMA UNK</span>
          </div>
          <p>© UNK // TERMINAL DE CARGA #04 - RED GUERRILLA CLANDESTINA. TODOS LOS DERECHOS RESERVADOS.</p>
        </footer>
      </div>

      {/* ====================================================================
          INTERCEPTED PACKAGE MODAL (Simulation result)
          ==================================================================== */}
      {interceptedItem && (
        <div className="intercept-modal-overlay" onClick={() => setInterceptedItem(null)}>
          <div className="intercept-modal-card" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close-x" 
              onClick={() => setInterceptedItem(null)}
            >
              ✕
            </button>

            <div className="modal-intercept-header">
              <span className="intercept-stage-tag">INTERCEPCIÓN SATISFACTORIA // TOKEN APLICADO</span>
              <h2 className="intercept-title">PAQUETE DESENCRIPTADO CON ÉXITO</h2>
            </div>

            <div className="intercept-content-grid">
              <img 
                src={interceptedItem.image} 
                alt={interceptedItem.garmentName} 
                className="intercept-preview-img" 
              />
              <div className="intercept-details">
                <p><strong>PRENDA:</strong> {interceptedItem.garmentName}</p>
                <p><strong>MARCA / ERA:</strong> {interceptedItem.brand} ({interceptedItem.year})</p>
                <p><strong>VALOR MERCADO:</strong> <span style={{ color: '#00ff66', fontWeight: 900 }}>{interceptedItem.marketPrice}</span></p>
                <p><strong>ESTADO:</strong> {interceptedItem.condition}</p>
                <p><strong>RASTREO:</strong> {interceptedItem.tracking}</p>
                <p><strong>NOTA ADUANERA:</strong> {interceptedItem.seizedReason}</p>
              </div>
            </div>

            <div className="intercept-actions">
              <button 
                className="btn-claim-package"
                onClick={() => {
                  alert(`¡Paquete ${interceptedItem.tracking} adjudicado mediante Token de 5€! Procediendo a preparar envío clandestino.`);
                  setInterceptedItem(null);
                }}
              >
                <PackageCheck size={18} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
                RECLAMAR PIEZA (TOKEN 5€ CANJEADO)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Shop2;
