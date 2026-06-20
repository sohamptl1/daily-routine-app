import React from 'react';
import { TIME_BLOCKS, iconSvg } from '../data';

export default function Timeline({ items, checkedIds, toggleItem }) {
  const renderChip = (item) => {
    if (item.cond) return <span className="chip cond">{item.freq}</span>;
    if (item.freq === 'Daily') return <span className="chip daily">Daily</span>;
    if (item.freq === 'Weekly') return <span className="chip weekly">Weekly</span>;
    return <span className="chip rota">{item.freq}</span>;
  };

  return (
    <div className="timeline">
      {TIME_BLOCKS.map((blk, bi) => {
        const blkItems = items.filter(it => it.block === blk.id);
        if (blkItems.length === 0) return null;
        
        const isLast = bi === TIME_BLOCKS.length - 1;
        
        return (
          <div key={blk.id} className="block">
            <div className="block-spine">
              <div className="block-icon">
                {iconSvg(blk.icon)}
              </div>
              {!isLast && <div className="block-line"></div>}
            </div>
            <div className="block-body">
              <div className="block-head">
                <div className="block-title">{blk.label}</div>
                <div className="block-sub">{blk.sub}</div>
              </div>
              <div className="items-list">
                {blkItems.map(it => {
                  const checked = checkedIds.has(it.id);
                  return (
                    <div 
                      key={it.id} 
                      className={`item ${checked ? 'checked' : ''}`}
                      onClick={() => toggleItem(it.id)}
                    >
                      <div className="cb">
                        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="4 12 9 18 20 6"></polyline>
                        </svg>
                      </div>
                      <div className="item-main">
                        <div className="item-toprow">
                          <div className="item-name">{it.name}</div>
                          {renderChip(it)}
                        </div>
                        <div className="item-dose">{it.dose}</div>
                        {it.caution && <div className="item-caution">{it.caution}</div>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
