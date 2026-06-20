import React from 'react';
import { ASNEEDED } from '../data';

export default function AsNeeded() {
  return (
    <div className="section">
      <div className="section-head">
        <div className="section-title">Sirf zarurat par</div>
        <div className="section-sub">— as-needed, not part of daily count</div>
      </div>
      <div>
        {ASNEEDED.map((a, i) => (
          <div key={i} className={`asneed-card ${a.caution ? 'caution' : ''}`}>
            <div className="asneed-name">{a.name}</div>
            <div className="asneed-trigger">{a.trigger}</div>
            {a.note && <div className="asneed-note">{a.note}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
