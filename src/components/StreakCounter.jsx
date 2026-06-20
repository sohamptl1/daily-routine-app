import React from 'react';
import { ITEMS } from '../data';

export default function StreakCounter() {
  const getStreak = () => {
    const today = new Date().getDay();
    let streak = 0;

    for (let offset = 0; offset < 7; offset++) {
      const dayIdx = (today - offset + 7) % 7;
      const key = `routine-checks-${dayIdx}`;
      const saved = localStorage.getItem(key);
      const checkedIds = new Set(saved ? JSON.parse(saved) : []);
      const applicable = ITEMS.filter(it => it.days.includes(dayIdx));
      if (applicable.length === 0) continue;
      const pct = checkedIds.size / applicable.length;
      if (pct >= 0.8) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  const streak = getStreak();

  if (streak === 0) return null;

  return (
    <div className="streak-box">
      <span className="streak-fire">🔥</span>
      <span className="streak-num">{streak}</span>
      <span className="streak-label">day streak</span>
    </div>
  );
}
