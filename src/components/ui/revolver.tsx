
import React from 'react';

export const Revolver: React.FC<{ aimed?: boolean; flipped?: boolean }> = ({ aimed = false, flipped = false }) => {
  const rotation = flipped ? 'rotate-180' : '';

  return (
    <div className={`relative w-full h-full ${rotation}`}>
      <svg width="100%" height="100%" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Revolver Barrel */}
        <rect x="165" y="92" width="120" height="18" rx="3" fill="#444444" />
        <rect x="165" y="92" width="120" height="18" rx="3" stroke="#333333" strokeWidth="2" />
        
        {/* Cylinder */}
        <circle cx="160" cy="100" r="30" fill="#555555" />
        <circle cx="160" cy="100" r="30" stroke="#333333" strokeWidth="2" />
        <circle cx="160" cy="100" r="20" fill="#444444" stroke="#333333" />
        
        {/* Cylinder chambers */}
        <circle cx="160" cy="70" r="6" fill="#111111" />
        <circle cx="180" cy="85" r="6" fill="#111111" />
        <circle cx="180" cy="115" r="6" fill="#111111" />
        <circle cx="160" cy="130" r="6" fill="#111111" />
        <circle cx="140" cy="115" r="6" fill="#111111" />
        <circle cx="140" cy="85" r="6" fill="#111111" />
        
        {/* Handle */}
        <path d="M120 100 L130 100 L130 140 C130 148 120 148 120 140 Z" fill="#5E3A22" />
        <path d="M120 100 L130 100 L130 140 C130 148 120 148 120 140 Z" stroke="#3A2A1A" strokeWidth="1" />
        
        {/* Trigger guard */}
        <path d="M130 100 Q130 110 140 115" stroke="#444444" strokeWidth="3" fill="none" />
        
        {/* Trigger */}
        <rect x="134" y="105" width="2" height="8" rx="1" fill="#333333" />
        
        {/* Hammer */}
        <path d="M130 90 L125 85 L125 82 L135 82 L135 85 Z" fill="#444444" stroke="#333333" />
        
        {/* Highlights */}
        <line x1="165" y1="96" x2="280" y2="96" stroke="#666666" strokeWidth="0.5" />
        <path d="M160 80 A20 20 0 0 1 180 100" stroke="#666666" strokeWidth="0.5" fill="none" />

        {/* Aimed sight line */}
        {aimed && (
          <line x1="285" y1="100" x2="295" y2="100" stroke="#ff0000" strokeWidth="1" />
        )}
      </svg>
    </div>
  );
};
