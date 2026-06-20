import React, { useState, useRef } from 'react';
import { ITEMS, DAY_EN } from '../data';

export default function BackupAndReport() {
  const [report, setReport] = useState(null);
  const fileInputRef = useRef(null);

  const handleExport = () => {
    const data = {};
    for (let i = 0; i < 7; i++) {
      const key = `routine-checks-${i}`;
      const saved = localStorage.getItem(key);
      if (saved) {
        data[key] = JSON.parse(saved);
      }
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `routine-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        for (const [key, value] of Object.entries(data)) {
          if (key.startsWith('routine-checks-')) {
            localStorage.setItem(key, JSON.stringify(value));
          }
        }
        alert('Data imported successfully! The page will reload.');
        window.location.reload();
      } catch (err) {
        alert('Error importing data. Invalid file format.');
      }
    };
    reader.readAsText(file);
    e.target.value = ''; // reset
  };

  const generateReport = () => {
    let reportText = "Weekly Routine Report\n=====================\n\n";
    for (let i = 0; i < 7; i++) {
      const dayName = DAY_EN[i];
      const applicableItems = ITEMS.filter(it => it.days.includes(i));
      
      const key = `routine-checks-${i}`;
      const saved = localStorage.getItem(key);
      const checkedIds = new Set(saved ? JSON.parse(saved) : []);

      const completedCount = applicableItems.filter(it => checkedIds.has(it.id)).length;
      reportText += `${dayName}: ${completedCount} / ${applicableItems.length} completed\n`;
      
      const missed = applicableItems.filter(it => !checkedIds.has(it.id));
      if (missed.length > 0 && missed.length < applicableItems.length) {
        reportText += `  Missed: ${missed.map(m => m.name).join(', ')}\n`;
      }
      reportText += '\n';
    }
    setReport(reportText);
  };

  const copyReport = () => {
    navigator.clipboard.writeText(report).then(() => {
      alert('Report copied to clipboard!');
    });
  };

  return (
    <div className="section">
      <div className="section-head">
        <div className="section-title">Data & Reports</div>
        <div className="section-sub">— Backup your data or view progress</div>
      </div>
      <div className="br-buttons">
        <button className="br-btn primary" onClick={generateReport}>Generate Report</button>
        <button className="br-btn" onClick={handleExport}>Export Data</button>
        <button className="br-btn" onClick={handleImportClick}>Import Data</button>
        <input 
          type="file" 
          accept=".json" 
          style={{ display: 'none' }} 
          ref={fileInputRef} 
          onChange={handleFileChange}
        />
      </div>

      {report && (
        <div className="report-box">
          <pre>{report}</pre>
          <button className="br-btn secondary" onClick={copyReport}>Copy to Clipboard</button>
        </div>
      )}
    </div>
  );
}
