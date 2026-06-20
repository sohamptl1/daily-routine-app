import React from 'react';
import { DAY_GUJ, DAY_EN } from '../data';

export default function Header({ viewedDate, setViewedDate }) {
  const dc = viewedDate.getDay();
  const dateStr = viewedDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

  const isSameDay = (a, b) => {
    return a.getFullYear() === b.getFullYear() && 
           a.getMonth() === b.getMonth() && 
           a.getDate() === b.getDate();
  };

  const today = new Date();
  const isToday = isSameDay(viewedDate, today);

  return (
    <>
      <div className="eyebrow">AAJ NU ROUTINE</div>
      <div className="daynames">
        {DAY_GUJ[dc]} <span className="en">{DAY_EN[dc]}</span>
      </div>
      <div className="datestr">{dateStr}</div>

      <div className="daynav">
        <button aria-label="Previous day" onClick={() => {
          const d = new Date(viewedDate);
          d.setDate(d.getDate() - 1);
          setViewedDate(d);
        }}>&#8592;</button>
        <button 
          className={`todaybtn ${isToday ? 'is-today' : ''}`} 
          onClick={() => setViewedDate(new Date())}
        >
          {isToday ? 'Today' : 'Jump to today'}
        </button>
        <button aria-label="Next day" onClick={() => {
          const d = new Date(viewedDate);
          d.setDate(d.getDate() + 1);
          setViewedDate(d);
        }}>&#8594;</button>
      </div>
    </>
  );
}
