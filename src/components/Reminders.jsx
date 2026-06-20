import React, { useState, useEffect } from 'react';

export default function Reminders() {
  const [reminders, setReminders] = useState(() => {
    const saved = localStorage.getItem('routine-reminders');
    return saved ? JSON.parse(saved) : [];
  });
  const [time, setTime] = useState('08:00');
  const [label, setLabel] = useState('Morning routine');
  const [permission, setPermission] = useState(Notification.permission);

  useEffect(() => {
    localStorage.setItem('routine-reminders', JSON.stringify(reminders));
  }, [reminders]);

  // Check reminders every minute
  useEffect(() => {
    const interval = setInterval(() => {
      if (Notification.permission !== 'granted') return;
      const now = new Date();
      const hhmm = `${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}`;
      reminders.forEach(r => {
        if (r.time === hhmm && r.enabled) {
          new Notification('⏰ Routine Reminder', { body: r.label });
        }
      });
    }, 60000);
    return () => clearInterval(interval);
  }, [reminders]);

  const requestPermission = async () => {
    const result = await Notification.requestPermission();
    setPermission(result);
  };

  const addReminder = () => {
    if (!time) return;
    setReminders([...reminders, { id: Date.now(), time, label, enabled: true }]);
    setLabel('');
  };

  const removeReminder = (id) => {
    setReminders(reminders.filter(r => r.id !== id));
  };

  const toggleReminder = (id) => {
    setReminders(reminders.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r));
  };

  return (
    <div className="section">
      <div className="section-head">
        <div className="section-title">Reminders</div>
        <div className="section-sub">— browser notifications</div>
      </div>

      {permission !== 'granted' && (
        <button className="br-btn primary" onClick={requestPermission} style={{ marginBottom: 12 }}>
          Enable Notifications
        </button>
      )}

      <div className="reminder-form">
        <input
          type="time"
          value={time}
          onChange={e => setTime(e.target.value)}
          className="reminder-input"
        />
        <input
          type="text"
          value={label}
          onChange={e => setLabel(e.target.value)}
          placeholder="Label..."
          className="reminder-input reminder-text"
        />
        <button className="br-btn" onClick={addReminder}>Add</button>
      </div>

      <div className="reminder-list">
        {reminders.map(r => (
          <div key={r.id} className={`reminder-item ${!r.enabled ? 'disabled' : ''}`}>
            <span className="reminder-time">{r.time}</span>
            <span className="reminder-label">{r.label}</span>
            <button className="reminder-toggle" onClick={() => toggleReminder(r.id)}>
              {r.enabled ? '🔔' : '🔕'}
            </button>
            <button className="reminder-del" onClick={() => removeReminder(r.id)}>✕</button>
          </div>
        ))}
      </div>
    </div>
  );
}
