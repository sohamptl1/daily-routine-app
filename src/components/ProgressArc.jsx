import React from 'react';
import { TIME_BLOCKS } from '../data';

export default function ProgressArc({ checkedCount, totalCount, onReset }) {
  const progress = totalCount === 0 ? 0 : checkedCount / totalCount;
  const n = TIME_BLOCKS.length;
  const path = 'M30,95 Q300,5 570,95';
  
  const pathLength = 587;
  const dash = (pathLength * progress) + ' ' + pathLength;

  const p0 = {x: 30, y: 95};
  const p1 = {x: 300, y: 5};
  const p2 = {x: 570, y: 95};
  const getPt = (t) => {
    const x = Math.pow(1-t, 2)*p0.x + 2*(1-t)*t*p1.x + Math.pow(t, 2)*p2.x;
    const y = Math.pow(1-t, 2)*p0.y + 2*(1-t)*t*p1.y + Math.pow(t, 2)*p2.y;
    return {x, y};
  };

  const dots = Array.from({length: n}).map((_, i) => {
    const t = i / (n - 1);
    const pt = getPt(t);
    const passed = t <= progress;
    return <circle key={i} cx={pt.x} cy={pt.y} r={3.2} className={`arc-dot ${passed ? 'passed' : ''}`} />;
  });

  const sunPt = getPt(progress);

  return (
    <>
      <div className="arcbox">
        <svg className="arc" viewBox="0 0 600 110">
          <path className="arc-track" d={path}></path>
          <path className="arc-fill" d={path} strokeDasharray={dash}></path>
          <g>{dots}</g>
          <circle className="arc-sun" r="5" cx={sunPt.x} cy={sunPt.y}></circle>
        </svg>
        <div className="progress-row">
          <div className="progress-num">
            <span>{checkedCount}</span><span> / </span><span>{totalCount}</span>
          </div>
          <div className="progress-label">items done today</div>
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <button className="resetbtn" onClick={onReset}>Reset this day's checks</button>
      </div>
    </>
  );
}
