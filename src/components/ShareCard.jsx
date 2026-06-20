import React, { useRef } from 'react';
import { ITEMS, DAY_SHORT, DAY_EN } from '../data';

export default function ShareCard() {
  const canvasRef = useRef(null);

  const generate = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const W = 600, H = 400;
    canvas.width = W;
    canvas.height = H;

    // Background gradient
    const bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, '#1a1025');
    bg.addColorStop(0.5, '#0d0f14');
    bg.addColorStop(1, '#301815');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // Title
    ctx.fillStyle = '#FFC97A';
    ctx.font = 'bold 22px sans-serif';
    ctx.fillText('Weekly Routine Report', 30, 45);

    // Date
    ctx.fillStyle = '#6C757D';
    ctx.font = '12px monospace';
    ctx.fillText(new Date().toLocaleDateString('en-IN', { dateStyle: 'long' }), 30, 68);

    // Bars
    const barTop = 95;
    const barHeight = 200;
    const barWidth = 55;
    const gap = 18;
    const startX = 30;

    for (let i = 0; i < 7; i++) {
      const applicable = ITEMS.filter(it => it.days.includes(i));
      const key = `routine-checks-${i}`;
      const saved = localStorage.getItem(key);
      const checkedIds = new Set(saved ? JSON.parse(saved) : []);
      const completed = applicable.filter(it => checkedIds.has(it.id)).length;
      const pct = applicable.length > 0 ? Math.round((completed / applicable.length) * 100) : 0;

      const x = startX + i * (barWidth + gap);

      // Track
      ctx.fillStyle = 'rgba(255,255,255,0.06)';
      ctx.beginPath();
      ctx.roundRect(x, barTop, barWidth, barHeight, 8);
      ctx.fill();

      // Fill
      const fillH = (pct / 100) * barHeight;
      const fillColor = pct === 100 ? '#00E5FF' : '#FFB347';
      ctx.fillStyle = fillColor;
      ctx.beginPath();
      ctx.roundRect(x, barTop + barHeight - fillH, barWidth, fillH, 8);
      ctx.fill();

      // Pct text
      ctx.fillStyle = '#F8F9FA';
      ctx.font = 'bold 13px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${pct}%`, x + barWidth / 2, barTop + barHeight - fillH - 8);

      // Day label
      ctx.fillStyle = '#ADB5BD';
      ctx.font = '11px monospace';
      ctx.fillText(DAY_SHORT[i], x + barWidth / 2, barTop + barHeight + 18);
    }
    ctx.textAlign = 'left';

    // Footer
    ctx.fillStyle = '#6C757D';
    ctx.font = '10px monospace';
    ctx.fillText('sohamdailyroutine.netlify.app', 30, H - 15);

    ctx.fillStyle = '#FFB347';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText('🔥 Soham\'s Daily Routine', W - 210, H - 15);

    // Show download
    canvas.style.display = 'block';
  };

  const download = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = `routine-report-${new Date().toISOString().split('T')[0]}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const share = async () => {
    const canvas = canvasRef.current;
    canvas.toBlob(async (blob) => {
      if (navigator.share) {
        try {
          const file = new File([blob], 'routine-report.png', { type: 'image/png' });
          await navigator.share({ files: [file], title: 'My Weekly Routine' });
        } catch (e) {
          download();
        }
      } else {
        download();
      }
    });
  };

  return (
    <div className="section">
      <div className="section-head">
        <div className="section-title">Share Progress</div>
        <div className="section-sub">— beautiful card</div>
      </div>
      <div className="br-buttons">
        <button className="br-btn primary" onClick={generate}>Generate Card</button>
        <button className="br-btn" onClick={share}>Save / Share</button>
      </div>
      <canvas ref={canvasRef} className="share-canvas" style={{ display: 'none' }} />
    </div>
  );
}
