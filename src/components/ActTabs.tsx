import React from 'react';
import { ClassData } from '../types';

interface ActTabsProps {
  classData: ClassData;
  selectedAct: string;
  onSelectAct: (actId: string) => void;
  isMobile: boolean;
}

export const ActTabs: React.FC<ActTabsProps> = ({ 
  classData, 
  selectedAct, 
  onSelectAct,
  isMobile
}) => {
  return (
    <div className="mb-6">
      <div className="border-b border-gray-700">
        <div className={`flex ${isMobile ? 'overflow-x-auto hide-scrollbar' : ''}`}>
          {classData.acts.map((act) => (
            <button
              key={act.id}
              onClick={() => onSelectAct(act.id)}
              className={`py-2 px-4 text-sm font-medium border-b-2 transition-colors ${
                isMobile ? 'whitespace-nowrap flex-1' : ''
              } ${
                selectedAct === act.id
                  ? 'border-purple-500 text-purple-300'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600'
              }`}
              aria-label={`Select ${act.name}`}
            >
              {act.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};