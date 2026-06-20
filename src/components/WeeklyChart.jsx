import React from 'react';
import { ITEMS, DAY_SHORT } from '../data';

export default function WeeklyChart() {
  const data = [];
  let bestDay = { idx: 0, pct: -1 };
  let worstDay = { idx: 0, pct: 101 };

  for (let i = 0; i < 7; i++) {
    const applicable = ITEMS.filter(it => it.days.includes(i));
    const key = `routine-checks-${i}`;
    const saved = localStorage.getItem(key);
    const checkedIds = new Set(saved ? JSON.parse(saved) : []);
    const completed = applicable.filter(it => checkedIds.has(it.id)).length;
    const pct = applicable.length > 0 ? Math.round((completed / applicable.length) * 100) : 0;
    data.push({ day: DAY_SHORT[i], pct });

    if (pct > bestDay.pct) bestDay = { idx: i, pct };
    if (pct < worstDay.pct) worstDay = { idx: i, pct };
  }

  return (
    <div className="section">
      <div className="section-head">
        <div className="section-title">Weekly Progress</div>
        <div className="section-sub">— completion by day</div>
      </div>
      <div className="chart-bars">
        {data.map((d, i) => (
          <div key={i} className="chart-col">
            <div className="chart-pct">{d.pct}%</div>
            <div className="chart-track">
              <div
                className={`chart-fill ${d.pct === 100 ? 'perfect' : ''}`}
                style={{ height: `${Math.max(d.pct, 3)}%` }}
              />
            </div>
            <div className="chart-day">{d.day}</div>
          </div>
        ))}
      </div>
      <div className="chart-insights">
        <span className="insight best">🏆 Best: {DAY_SHORT[bestDay.idx]} ({bestDay.pct}%)</span>
        <span className="insight worst">📉 Focus: {DAY_SHORT[worstDay.idx]} ({worstDay.pct}%)</span>
      </div>
    </div>
  );
}
