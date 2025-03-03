import React from 'react';
import { SpellRecommendation } from '../types';
import { Zap } from 'lucide-react';

interface SpellsTableProps {
  spells: SpellRecommendation[];
  isMobile: boolean;
}

export const SpellsTable: React.FC<SpellsTableProps> = ({ spells, isMobile }) => {
  // Group spells by level
  const spellsByLevel = spells.reduce((acc, spell) => {
    if (!acc[spell.level]) {
      acc[spell.level] = [];
    }
    acc[spell.level].push(spell);
    return acc;
  }, {} as Record<number, SpellRecommendation[]>);

  // Sort levels
  const sortedLevels = Object.keys(spellsByLevel)
    .map(Number)
    .sort((a, b) => a - b);

  // Get spell level name
  const getSpellLevelName = (level: number): string => {
    if (level === 0) return "Cantrips";
    if (level === 1) return "1st Level";
    if (level === 2) return "2nd Level";
    if (level === 3) return "3rd Level";
    return `${level}th Level`;
  };

  if (isMobile) {
    return (
      <div className="space-y-6">
        {sortedLevels.map(level => (
          <div key={level} className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
            <div className="bg-gray-750 px-4 py-3 border-b border-gray-700">
              <h3 className="text-lg font-medium text-purple-300">{getSpellLevelName(level)}</h3>
            </div>
            <div className="divide-y divide-gray-700">
              {spellsByLevel[level].map((spell, index) => (
                <div 
                  key={index} 
                  className={`p-4 ${spell.isHighlighted ? 'bg-purple-900 bg-opacity-20' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    {spell.isHighlighted && (
                      <Zap size={18} className="text-purple-400 mt-1 flex-shrink-0" />
                    )}
                    <div>
                      <h4 className={`font-medium ${spell.isHighlighted ? 'text-purple-300' : 'text-gray-200'}`}>
                        {spell.name}
                      </h4>
                      <p className="text-sm text-gray-400 mt-1">{spell.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {sortedLevels.map(level => (
        <div key={level} className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
          <div className="bg-gray-750 px-6 py-3 border-b border-gray-700">
            <h3 className="text-lg font-medium text-purple-300">{getSpellLevelName(level)}</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-800">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider w-1/4">
                    Spell Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider w-3/4">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {spellsByLevel[level].map((spell, index) => (
                  <tr 
                    key={index} 
                    className={`${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-750'} ${spell.isHighlighted ? 'bg-purple-900 bg-opacity-20' : ''}`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-200">
                      <div className="flex items-center gap-2">
                        {spell.isHighlighted && <Zap size={16} className="text-purple-400" />}
                        <span className={spell.isHighlighted ? 'text-purple-300' : ''}>{spell.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {spell.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};