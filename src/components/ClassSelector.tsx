import React from 'react';
import { ClassData } from '../types';
import { Sword } from 'lucide-react';

interface ClassSelectorProps {
  classes: ClassData[];
  selectedClass: string;
  onSelectClass: (classId: string) => void;
  isMobile: boolean;
}

export const ClassSelector: React.FC<ClassSelectorProps> = ({ 
  classes, 
  selectedClass, 
  onSelectClass,
  isMobile
}) => {
  if (isMobile) {
    return (
      <div className="mb-6">
        <div className="flex overflow-x-auto hide-scrollbar pb-2">
          {classes.map((classData) => (
            <button
              key={classData.id}
              onClick={() => onSelectClass(classData.id)}
              className={`px-4 py-3 rounded-md flex items-center justify-center whitespace-nowrap mr-2 flex-1 transition-colors ${
                selectedClass === classData.id
                  ? 'bg-purple-700 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
              aria-label={`Select ${classData.name}`}
            >
              <span>{classData.name}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-purple-300 mb-3">Character Classes</h2>
      <div className="flex flex-wrap gap-2">
        {classes.map((classData) => (
          <button
            key={classData.id}
            onClick={() => onSelectClass(classData.id)}
            className={`px-4 py-2 rounded-md flex items-center gap-2 transition-colors ${
              selectedClass === classData.id
                ? 'bg-purple-700 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
            aria-label={`Select ${classData.name}`}
          >
            <Sword size={16} />
            <span>{classData.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};