import React from 'react';
import { AbilityScores as AbilityScoresType } from '../types';

interface AbilityScoresProps {
  scores: AbilityScoresType;
  isMobile: boolean;
}

export const AbilityScores: React.FC<AbilityScoresProps> = ({ scores, isMobile }) => {
  const getModifier = (score: number): string => {
    const modifier = Math.floor((score - 10) / 2);
    return modifier >= 0 ? `+${modifier}` : `${modifier}`;
  };

  const getScoreColor = (score: number): string => {
    if (score >= 16) return 'text-green-400';
    if (score >= 14) return 'text-blue-400';
    if (score >= 12) return 'text-gray-200';
    if (score >= 10) return 'text-gray-400';
    return 'text-red-400';
  };

  if (isMobile) {
    return (
      <div className="grid grid-cols-3 gap-2 mb-4">
        {Object.entries(scores).map(([ability, score]) => (
          <div key={ability} className="bg-gray-800 p-2 rounded-md text-center">
            <div className="text-xs uppercase text-gray-400 mb-1">
              {ability.substring(0, 3)}
            </div>
            <div className={`text-lg font-bold ${getScoreColor(score)}`}>
              {score}
            </div>
            <div className="text-xs text-gray-500">
              {getModifier(score)}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-6 gap-4 mb-6 bg-gray-800 p-4 rounded-lg border border-gray-700">
      {Object.entries(scores).map(([ability, score]) => (
        <div key={ability} className="text-center">
          <div className="text-sm uppercase text-gray-400 mb-1">
            {ability}
          </div>
          <div className={`text-2xl font-bold ${getScoreColor(score)}`}>
            {score}
          </div>
          <div className="text-sm text-gray-500">
            {getModifier(score)}
          </div>
        </div>
      ))}
    </div>
  );
};