import React, { useState, useEffect } from 'react';
import { TIME_BLOCKS, ALL } from '../data';

export default function RoutineEditor({ onSave }) {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('routine-custom-items');
    return saved ? JSON.parse(saved) : [];
  });
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', dose: '', block: 'wake', freq: 'Daily', days: [...ALL] });

  useEffect(() => {
    localStorage.setItem('routine-custom-items', JSON.stringify(items));
    if (onSave) onSave(items);
  }, [items]);

  const addItem = () => {
    if (!form.name.trim()) return;
    const newItem = {
      id: 'custom-' + Date.now(),
      block: form.block,
      name: form.name,
      dose: form.dose,
      freq: form.freq,
      days: form.days,
      custom: true,
    };
    setItems([...items, newItem]);
    setForm({ name: '', dose: '', block: 'wake', freq: 'Daily', days: [...ALL] });
  };

  const removeItem = (id) => {
    setItems(items.filter(it => it.id !== id));
  };

  const toggleDay = (d) => {
    setForm(prev => {
      const days = prev.days.includes(d)
        ? prev.days.filter(x => x !== d)
        : [...prev.days, d].sort();
      return { ...prev, days };
    });
  };

  const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <div className="section">
      <div className="section-head">
        <div className="section-title">Custom Habits</div>
        <div className="section-sub">— add your own</div>
        <button className="editor-toggle" onClick={() => setOpen(!open)}>
          {open ? '✕ Close' : '＋ Add'}
        </button>
      </div>

      {open && (
        <div className="editor-form">
          <input
            className="editor-input"
            placeholder="Habit name..."
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
          <input
            className="editor-input"
            placeholder="Dose / note..."
            value={form.dose}
            onChange={e => setForm({ ...form, dose: e.target.value })}
          />
          <div className="editor-row">
            <select
              className="editor-select"
              value={form.block}
              onChange={e => setForm({ ...form, block: e.target.value })}
            >
              {TIME_BLOCKS.map(b => (
                <option key={b.id} value={b.id}>{b.label} — {b.sub}</option>
              ))}
            </select>
            <select
              className="editor-select"
              value={form.freq}
              onChange={e => setForm({ ...form, freq: e.target.value })}
            >
              <option>Daily</option>
              <option>2x/week</option>
              <option>Weekly</option>
            </select>
          </div>
          <div className="editor-days">
            {dayLabels.map((l, i) => (
              <button
                key={i}
                className={`editor-day-btn ${form.days.includes(i) ? 'active' : ''}`}
                onClick={() => toggleDay(i)}
              >
                {l}
              </button>
            ))}
          </div>
          <button className="br-btn primary" onClick={addItem}>Add Habit</button>
        </div>
      )}

      {items.length > 0 && (
        <div className="editor-list">
          {items.map(it => (
            <div key={it.id} className="editor-item">
              <div>
                <div className="editor-item-name">{it.name}</div>
                <div className="editor-item-dose">{it.dose}</div>
              </div>
              <button className="reminder-del" onClick={() => removeItem(it.id)}>✕</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
