import React from 'react';
import { ITEMS, DAY_SHORT } from '../data';

export default function WeeklyGlance() {
  const rotaItems = ITEMS.filter(it => !it.cond && it.freq !== 'Daily');

  return (
    <div className="section">
      <div className="section-head">
        <div className="section-title">Hafta glance</div>
        <div className="section-sub">— full rotation, so nothing is forgotten</div>
      </div>
      <div className="glance-wrap">
        <table className="glance">
          <thead>
            <tr>
              <th>Item</th>
              {DAY_SHORT.map(d => <th key={d}>{d}</th>)}
            </tr>
          </thead>
          <tbody>
            {rotaItems.map(it => (
              <tr key={it.id}>
                <td className="name">
                  {it.name}
                  <span className="freqtag">{it.freq}</span>
                </td>
                {Array.from({length: 7}).map((_, d) => {
                  const on = it.days.includes(d);
                  let dotClass = 'gdot';
                  if (on) {
                    dotClass += ' on';
                    if (it.freq === 'Weekly') dotClass += ' amber';
                  }
                  return (
                    <td key={d}>
                      <span className={dotClass}></span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="legend">
        <div className="legend-item"><span className="gdot on"></span> active that day</div>
        <div className="legend-item"><span className="gdot"></span> off that day</div>
      </div>
    </div>
  );
}
