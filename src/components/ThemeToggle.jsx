import React, { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [light, setLight] = useState(() => localStorage.getItem('theme') === 'light');

  useEffect(() => {
    document.body.classList.toggle('light-mode', light);
    localStorage.setItem('theme', light ? 'light' : 'dark');
  }, [light]);

  return (
    <button className="theme-toggle" onClick={() => setLight(!light)} title="Toggle theme">
      {light ? '🌙' : '☀️'}
    </button>
  );
}
