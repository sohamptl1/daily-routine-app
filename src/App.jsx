import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ProgressArc from './components/ProgressArc';
import Timeline from './components/Timeline';
import WeeklyGlance from './components/WeeklyGlance';
import AsNeeded from './components/AsNeeded';
import BackupAndReport from './components/BackupAndReport';
import QuoteOfTheDay from './components/QuoteOfTheDay';
import { ITEMS } from './data';

function storageKey(day) {
  return 'routine-checks-' + day;
}

function App() {
  const [selectedDay, setSelectedDay] = useState(new Date().getDay());
  const [checkedIds, setCheckedIds] = useState(new Set());

  // Load checks when day changes
  useEffect(() => {
    const key = storageKey(selectedDay);
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        setCheckedIds(new Set(JSON.parse(saved)));
      } catch (e) {
        setCheckedIds(new Set());
      }
    } else {
      setCheckedIds(new Set());
    }
  }, [selectedDay]);

  // Save checks when they change
  const saveChecks = (newSet) => {
    const key = storageKey(selectedDay);
    localStorage.setItem(key, JSON.stringify([...newSet]));
    setCheckedIds(newSet);
  };

  const toggleItem = (id) => {
    const newSet = new Set(checkedIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    saveChecks(newSet);
  };

  const handleReset = () => {
    saveChecks(new Set());
  };

  const applicableItems = ITEMS.filter(it => it.days.includes(selectedDay));
  const checkedCount = applicableItems.filter(it => checkedIds.has(it.id)).length;

  return (
    <div className="wrap">
      <Header selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
      
      <div className="dashboard-grid">
        <div className="sidebar">
          <QuoteOfTheDay />
          <ProgressArc 
            checkedCount={checkedCount} 
            totalCount={applicableItems.length} 
            onReset={handleReset} 
          />
          <WeeklyGlance items={ITEMS} checkedIds={checkedIds} />
          <AsNeeded />
          <BackupAndReport />
        </div>

        <div className="main-content">
          <Timeline 
            items={applicableItems} 
            checkedIds={checkedIds} 
            toggleItem={toggleItem} 
          />
        </div>
      </div>

      <footer>
        This is an organizational tool only, not medical advice. D3 sources rotate so no single day stacks more than one. Confirm total weekly doses — especially D3, Finasteride, and Curcumin — with your pharmacist or physician. Clarifying shampoo is weekly only — overuse strips natural scalp oils. Checks are saved per day on this device.
      </footer>
    </div>
  );
}

export default App;
