import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ProgressArc from './components/ProgressArc';
import Timeline from './components/Timeline';
import WeeklyGlance from './components/WeeklyGlance';
import AsNeeded from './components/AsNeeded';
import BackupAndReport from './components/BackupAndReport';
import QuoteOfTheDay from './components/QuoteOfTheDay';
import StreakCounter from './components/StreakCounter';
import Confetti from './components/Confetti';
import WeeklyChart from './components/WeeklyChart';
import PomodoroTimer from './components/PomodoroTimer';
import ShareCard from './components/ShareCard';
import ThemeToggle from './components/ThemeToggle';
import RoutineEditor from './components/RoutineEditor';
import Reminders from './components/Reminders';
import { ITEMS } from './data';

function storageKey(day) {
  return 'routine-checks-' + day;
}

function App() {
  const [selectedDay, setSelectedDay] = useState(new Date().getDay());
  const [checkedIds, setCheckedIds] = useState(new Set());
  const [confettiKey, setConfettiKey] = useState(0);
  const [customItems, setCustomItems] = useState(() => {
    const saved = localStorage.getItem('routine-custom-items');
    return saved ? JSON.parse(saved) : [];
  });

  const allItems = [...ITEMS, ...customItems];

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

    // Check for 100% → confetti
    const applicable = allItems.filter(it => it.days.includes(selectedDay));
    const willBeChecked = applicable.filter(it => newSet.has(it.id)).length;
    if (willBeChecked === applicable.length && applicable.length > 0) {
      setConfettiKey(prev => prev + 1);
    }
  };

  const handleReset = () => {
    saveChecks(new Set());
  };

  const applicableItems = allItems.filter(it => it.days.includes(selectedDay));
  const checkedCount = applicableItems.filter(it => checkedIds.has(it.id)).length;

  return (
    <div className="wrap">
      <Confetti trigger={confettiKey} />

      <div className="header-row">
        <Header selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
        <div className="header-actions">
          <StreakCounter />
          <ThemeToggle />
        </div>
      </div>
      
      <div className="dashboard-grid">
        <div className="sidebar">
          <QuoteOfTheDay />
          <ProgressArc 
            checkedCount={checkedCount} 
            totalCount={applicableItems.length} 
            onReset={handleReset} 
          />
          <WeeklyChart />
          <WeeklyGlance items={allItems} checkedIds={checkedIds} />
          <PomodoroTimer />
          <ShareCard />
          <AsNeeded />
          <RoutineEditor onSave={setCustomItems} />
          <Reminders />
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
