import React, { useState, useEffect, useRef } from 'react';

const MODES = [
  { label: 'Focus', duration: 25 * 60 },
  { label: 'Short Break', duration: 5 * 60 },
  { label: 'Long Break', duration: 15 * 60 },
];

export default function PomodoroTimer() {
  const [modeIdx, setModeIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(MODES[0].duration);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setRunning(false);
            // Play notification sound
            try {
              const ctx = new (window.AudioContext || window.webkitAudioContext)();
              const osc = ctx.createOscillator();
              const gain = ctx.createGain();
              osc.connect(gain);
              gain.connect(ctx.destination);
              osc.frequency.value = 880;
              gain.gain.value = 0.3;
              osc.start();
              gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
              osc.stop(ctx.currentTime + 0.8);
            } catch(e) {}
            // Send notification if permitted
            if (Notification.permission === 'granted') {
              new Notification('Timer Done!', { body: `${MODES[modeIdx].label} session complete.` });
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [running, modeIdx]);

  const switchMode = (idx) => {
    setRunning(false);
    setModeIdx(idx);
    setTimeLeft(MODES[idx].duration);
  };

  const toggleRun = () => {
    if (timeLeft === 0) {
      setTimeLeft(MODES[modeIdx].duration);
    }
    setRunning(!running);
  };

  const resetTimer = () => {
    setRunning(false);
    setTimeLeft(MODES[modeIdx].duration);
  };

  const mins = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const secs = (timeLeft % 60).toString().padStart(2, '0');

  const pct = ((MODES[modeIdx].duration - timeLeft) / MODES[modeIdx].duration) * 100;

  return (
    <div className="section pomo-section">
      <div className="section-head">
        <div className="section-title">Focus Timer</div>
        <div className="section-sub">— Pomodoro</div>
      </div>

      <div className="pomo-modes">
        {MODES.map((m, i) => (
          <button
            key={i}
            className={`pomo-mode-btn ${modeIdx === i ? 'active' : ''}`}
            onClick={() => switchMode(i)}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="pomo-display">
        <div className="pomo-ring">
          <svg viewBox="0 0 120 120">
            <circle className="pomo-track" cx="60" cy="60" r="52" />
            <circle
              className="pomo-fill"
              cx="60" cy="60" r="52"
              strokeDasharray={`${2 * Math.PI * 52}`}
              strokeDashoffset={`${2 * Math.PI * 52 * (1 - pct / 100)}`}
            />
          </svg>
          <div className="pomo-time">{mins}:{secs}</div>
        </div>
      </div>

      <div className="pomo-controls">
        <button className="br-btn" onClick={resetTimer}>Reset</button>
        <button className={`br-btn primary ${running ? 'running' : ''}`} onClick={toggleRun}>
          {running ? 'Pause' : (timeLeft === 0 ? 'Restart' : 'Start')}
        </button>
      </div>
    </div>
  );
}
