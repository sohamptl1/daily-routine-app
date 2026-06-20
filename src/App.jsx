import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ProgressArc from './components/ProgressArc';
import Timeline from './components/Timeline';
import WeeklyGlance from './components/WeeklyGlance';
import AsNeeded from './components/AsNeeded';
import { ITEMS } from './data';

function ymd(d) {
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}

function storageKey(d) {
  return 'routine-checks-' + ymd(d);
}

function App() {
  const [viewedDate, setViewedDate] = useState(new Date());
  const [checkedIds, setCheckedIds] = useState(new Set());

  // Load checks when date changes
  useEffect(() => {
    const key = storageKey(viewedDate);
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
  }, [viewedDate]);

  // Save checks when they change
  const saveChecks = (newSet) => {
    const key = storageKey(viewedDate);
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

  const dc = viewedDate.getDay();
  const applicableItems = ITEMS.filter(it => it.days.includes(dc));
  const checkedCount = applicableItems.filter(it => checkedIds.has(it.id)).length;

  return (
    <div className="wrap">
      <Header viewedDate={viewedDate} setViewedDate={setViewedDate} />
      
      <ProgressArc 
        checkedCount={checkedCount} 
        totalCount={applicableItems.length} 
        onReset={handleReset} 
      />

      <Timeline 
        items={applicableItems} 
        checkedIds={checkedIds} 
        toggleItem={toggleItem} 
      />

      <WeeklyGlance />
      
      <AsNeeded />

      <footer>
        This is an organizational tool only, not medical advice. D3 sources rotate so no single day stacks more than one. Confirm total weekly doses — especially D3, Finasteride, and Curcumin — with your pharmacist or physician. Clarifying shampoo is weekly only — overuse strips natural scalp oils. Checks are saved per day on this device.
      </footer>
    </div>
  );
}

export default App;
