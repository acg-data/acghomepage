import { useEffect, useRef } from "react";

const STYLES = `
  .bm-scene {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  .bm-book-scale {
    transform-origin: center center;
  }

  .bm-book-wrap {
    perspective: 1600px;
    position: relative;
    z-index: 1;
    cursor: pointer;
  }

  .bm-book {
    position: relative;
    width: 340px;
    height: 460px;
    transform: rotateY(-28deg) rotateX(4deg);
    transform-style: preserve-3d;
    transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    filter: drop-shadow(-24px 40px 60px rgba(0,0,0,0.55));
  }

  .bm-book-wrap:hover .bm-book {
    transform: rotateY(-18deg) rotateX(3deg);
  }

  .bm-cover-front {
    position: absolute;
    inset: 0;
    border-radius: 2px 6px 6px 2px;
    overflow: hidden;
    background: #1B3D2C;
    backface-visibility: hidden;
  }

  .bm-topo-bg {
    position: absolute;
    inset: 0;
    opacity: 0.13;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='700' viewBox='0 0 600 700'%3E%3Cg fill='none' stroke='%23C9A96E' stroke-width='1'%3E%3Cellipse cx='300' cy='350' rx='280' ry='220'/%3E%3Cellipse cx='300' cy='350' rx='240' ry='185'/%3E%3Cellipse cx='300' cy='350' rx='200' ry='150'/%3E%3Cellipse cx='300' cy='350' rx='160' ry='115'/%3E%3Cellipse cx='300' cy='350' rx='120' ry='82'/%3E%3Cellipse cx='300' cy='350' rx='80' ry='52'/%3E%3Cellipse cx='300' cy='350' rx='40' ry='25'/%3E%3Cellipse cx='300' cy='350' rx='320' ry='255' opacity='0.5'/%3E%3Cellipse cx='120' cy='180' rx='180' ry='130' opacity='0.4'/%3E%3Cellipse cx='480' cy='520' rx='160' ry='110' opacity='0.4'/%3E%3C/g%3E%3C/svg%3E");
    background-size: cover;
    background-position: center;
  }

  .bm-cover-gradient {
    position: absolute;
    inset: 0;
    background: linear-gradient(160deg, rgba(255,255,255,0.04) 0%, transparent 35%, rgba(0,0,0,0.18) 100%);
  }

  .bm-cover-topbar {
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 5px;
    background: linear-gradient(90deg, #8A7048, #E8C98A, #8A7048);
  }

  .bm-cover-content {
    position: relative;
    z-index: 2;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 36px 30px 32px;
  }

  .bm-cover-eyebrow {
    font-size: 8.5px;
    font-weight: 500;
    letter-spacing: 3.5px;
    text-transform: uppercase;
    color: #C9A96E;
    margin-bottom: 16px;
    font-family: 'DM Sans', 'Inter', sans-serif;
  }

  .bm-cover-divider-top {
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, #C9A96E, rgba(201,169,110,0.2));
    margin-bottom: 22px;
  }

  .bm-cover-year {
    font-family: 'Playfair Display', serif;
    font-size: 52px;
    font-weight: 700;
    color: rgba(255,255,255,0.06);
    line-height: 1;
    letter-spacing: -1px;
    margin-bottom: -10px;
    user-select: none;
  }

  .bm-cover-title {
    font-family: 'Playfair Display', serif;
    font-size: 26px;
    font-weight: 600;
    line-height: 1.25;
    color: #F0EAD8;
    letter-spacing: -0.3px;
    margin-bottom: 10px;
  }

  .bm-cover-title em {
    font-style: italic;
    color: #E8C98A;
  }

  .bm-cover-subtitle {
    font-size: 9px;
    font-weight: 400;
    letter-spacing: 2.8px;
    text-transform: uppercase;
    color: rgba(201,169,110,0.7);
    font-family: 'DM Sans', 'Inter', sans-serif;
  }

  .bm-cover-spacer { flex: 1; }

  .bm-cover-landscape {
    width: calc(100% + 60px);
    margin-left: -30px;
    height: 90px;
    overflow: hidden;
    position: relative;
    margin-bottom: 22px;
    opacity: 0.85;
  }

  .bm-cover-landscape svg { width: 100%; height: 100%; }

  .bm-cover-divider-bot {
    width: 40px;
    height: 1px;
    background: #C9A96E;
    margin-bottom: 18px;
    opacity: 0.6;
  }

  .bm-cover-meta {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  .bm-cover-publisher { display: flex; flex-direction: column; gap: 3px; }

  .bm-cover-publisher-name {
    font-size: 8px;
    font-weight: 600;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: rgba(201,169,110,0.8);
    font-family: 'DM Sans', 'Inter', sans-serif;
  }

  .bm-cover-publisher-line {
    font-size: 7px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: rgba(255,255,255,0.25);
    font-family: 'DM Sans', 'Inter', sans-serif;
  }

  .bm-cover-badge {
    width: 46px; height: 46px;
    border-radius: 50%;
    border: 1px solid rgba(201,169,110,0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1px;
  }

  .bm-cover-badge-year {
    font-family: 'Playfair Display', serif;
    font-size: 12px;
    font-weight: 700;
    color: #C9A96E;
    line-height: 1;
  }

  .bm-cover-badge-label {
    font-size: 5.5px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: rgba(201,169,110,0.6);
    font-family: 'DM Sans', 'Inter', sans-serif;
  }

  .bm-cover-spine {
    position: absolute;
    left: 0; top: 0;
    width: 38px; height: 460px;
    background: linear-gradient(90deg, #0F2419 0%, #122d1f 30%, #1d4030 60%, #142a1e 100%);
    transform: rotateY(90deg) translateZ(-19px) translateX(19px);
    transform-origin: left center;
    backface-visibility: hidden;
    overflow: hidden;
    border-radius: 3px 0 0 3px;
  }

  .bm-spine-gold-top {
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 5px;
    background: linear-gradient(90deg, #7a5e30, #E8C98A, #7a5e30);
  }

  .bm-spine-gold-bot {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 5px;
    background: linear-gradient(90deg, #7a5e30, #E8C98A, #7a5e30);
  }

  .bm-spine-content {
    position: absolute;
    inset: 14px 6px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

  .bm-spine-title {
    font-family: 'Playfair Display', serif;
    font-size: 9.5px;
    font-weight: 600;
    color: #E8DECA;
    writing-mode: vertical-rl;
    transform: rotate(180deg);
    letter-spacing: 1.2px;
    line-height: 1.3;
    text-align: center;
  }

  .bm-spine-year {
    font-size: 8px;
    font-weight: 500;
    color: #C9A96E;
    letter-spacing: 1.5px;
    font-family: 'DM Sans', 'Inter', sans-serif;
  }

  .bm-page-edges {
    position: absolute;
    right: 0; top: 1px; bottom: 1px;
    width: 18px;
    transform: rotateY(90deg) translateZ(322px) translateX(-9px);
    transform-origin: right center;
    background: linear-gradient(90deg, #C8BC9E 0%, #EDE4CF 30%, #f0e9d5 60%, #C8BC9E 100%);
    backface-visibility: hidden;
    overflow: hidden;
  }

  .bm-page-edges::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(180,168,140,0.35) 3px, rgba(180,168,140,0.35) 4px);
  }

  .bm-cover-back {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #0e2018, #122a1e);
    border-radius: 2px 6px 6px 2px;
    transform: translateZ(-6px);
    backface-visibility: hidden;
  }

  .bm-book-shadow {
    position: absolute;
    bottom: -40px; left: 15px; right: -30px;
    height: 50px;
    background: radial-gradient(ellipse, rgba(0,0,0,0.5) 0%, transparent 70%);
    filter: blur(16px);
    transform: rotateX(80deg);
    pointer-events: none;
  }
`;

export default function BookMockup3D() {
  const scaleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let t = 0;
    let raf: number;
    function floatBook() {
      t += 0.012;
      if (scaleRef.current) {
        scaleRef.current.style.marginTop = `${Math.sin(t) * 8}px`;
      }
      raf = requestAnimationFrame(floatBook);
    }
    raf = requestAnimationFrame(floatBook);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div className="bm-scene">
        <div className="bm-book-scale" ref={scaleRef}>
          <div className="bm-book-wrap">
            <div className="bm-book">
              <div className="bm-cover-back" />
              <div className="bm-page-edges" />

              <div className="bm-cover-spine">
                <div className="bm-spine-gold-top" />
                <div className="bm-spine-gold-bot" />
                <div className="bm-spine-content">
                  <div className="bm-spine-title">US Landscaping Industry Market Report</div>
                  <div className="bm-spine-year">2026</div>
                </div>
              </div>

              <div className="bm-cover-front">
                <div className="bm-topo-bg" />
                <div className="bm-cover-gradient" />
                <div className="bm-cover-topbar" />

                <div className="bm-cover-content">
                  <div className="bm-cover-eyebrow">Industry Research &amp; Analysis</div>
                  <div className="bm-cover-divider-top" />
                  <div className="bm-cover-year">2026</div>
                  <div className="bm-cover-title">
                    US Landscaping<br />
                    Industry <em>Market</em><br />
                    Report
                  </div>
                  <div className="bm-cover-subtitle">Comprehensive Annual Overview</div>
                  <div className="bm-cover-spacer" />

                  <div className="bm-cover-landscape">
                    <svg viewBox="0 0 400 90" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="bmSkyGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#1B3D2C" stopOpacity="0" />
                          <stop offset="100%" stopColor="#0F2419" stopOpacity="0.6" />
                        </linearGradient>
                        <linearGradient id="bmHillGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#2d6b4a" />
                          <stop offset="100%" stopColor="#1a3d28" />
                        </linearGradient>
                        <linearGradient id="bmHill2Grad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#1e5038" />
                          <stop offset="100%" stopColor="#122a1e" />
                        </linearGradient>
                        <linearGradient id="bmGoldLine" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#C9A96E" stopOpacity="0" />
                          <stop offset="20%" stopColor="#C9A96E" stopOpacity="0.8" />
                          <stop offset="80%" stopColor="#C9A96E" stopOpacity="0.8" />
                          <stop offset="100%" stopColor="#C9A96E" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path d="M0,90 L0,55 Q40,20 80,45 Q120,68 160,35 Q200,8 240,38 Q280,62 320,30 Q360,5 400,32 L400,90 Z" fill="url(#bmHill2Grad)" opacity="0.8" />
                      <path d="M0,90 L0,68 Q50,38 100,58 Q150,75 200,50 Q250,28 300,55 Q350,72 400,52 L400,90 Z" fill="url(#bmHillGrad)" />
                      <rect x="28" y="38" width="4" height="18" fill="#0e2318" opacity="0.9" />
                      <polygon points="30,20 22,42 38,42" fill="#1a4028" opacity="0.9" />
                      <polygon points="30,28 20,44 40,44" fill="#163622" opacity="0.9" />
                      <rect x="50" y="44" width="3" height="14" fill="#0e2318" opacity="0.9" />
                      <polygon points="51.5,28 44,46 59,46" fill="#1e4a30" opacity="0.9" />
                      <rect x="178" y="32" width="4" height="20" fill="#0e2318" opacity="0.9" />
                      <polygon points="180,14 171,36 189,36" fill="#1a4028" opacity="0.9" />
                      <polygon points="180,22 169,38 191,38" fill="#163622" opacity="0.9" />
                      <rect x="200" y="36" width="3" height="16" fill="#0e2318" opacity="0.9" />
                      <polygon points="201.5,20 194,38 209,38" fill="#1e4a30" opacity="0.9" />
                      <rect x="162" y="40" width="3" height="14" fill="#0e2318" opacity="0.9" />
                      <polygon points="163.5,26 157,42 170,42" fill="#1a4028" opacity="0.9" />
                      <rect x="330" y="28" width="4" height="22" fill="#0e2318" opacity="0.9" />
                      <polygon points="332,10 322,32 342,32" fill="#1a4028" opacity="0.9" />
                      <polygon points="332,18 320,34 344,34" fill="#163622" opacity="0.9" />
                      <rect x="352" y="40" width="3" height="14" fill="#0e2318" opacity="0.9" />
                      <polygon points="353.5,24 346,42 361,42" fill="#1e4a30" opacity="0.9" />
                      <line x1="0" y1="68" x2="400" y2="68" stroke="url(#bmGoldLine)" strokeWidth="0.8" />
                      <rect x="0" y="0" width="400" height="90" fill="url(#bmSkyGrad)" />
                    </svg>
                  </div>

                  <div className="bm-cover-divider-bot" />
                  <div className="bm-cover-meta">
                    <div className="bm-cover-publisher">
                      <div className="bm-cover-publisher-name">Aryo Consulting Group</div>
                      <div className="bm-cover-publisher-line">Industry Intelligence Division</div>
                    </div>
                    <div className="bm-cover-badge">
                      <div className="bm-cover-badge-year">2026</div>
                      <div className="bm-cover-badge-label">Edition</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bm-book-shadow" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
