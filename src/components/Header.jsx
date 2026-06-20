import React from 'react';
import { DAY_GUJ, DAY_EN, DAY_SHORT } from '../data';

export default function Header({ selectedDay, setSelectedDay }) {
  const isToday = selectedDay === new Date().getDay();

  return (
    <>
      <div className="eyebrow">AAJ NU ROUTINE</div>
      <div className="daynames">
        {DAY_GUJ[selectedDay]} <span className="en">{DAY_EN[selectedDay]}</span>
      </div>

      <div className="day-selector">
        {[0, 1, 2, 3, 4, 5, 6].map(day => (
          <button 
            key={day}
            className={`day-btn ${selectedDay === day ? 'active' : ''}`}
            onClick={() => setSelectedDay(day)}
          >
            {DAY_SHORT[day]}
          </button>
        ))}
      </div>

      <div className="daynav" style={{ marginTop: '14px' }}>
        <button 
          className={`todaybtn ${isToday ? 'is-today' : ''}`} 
          onClick={() => setSelectedDay(new Date().getDay())}
        >
          Today
        </button>
      </div>
    </>
  );
}
