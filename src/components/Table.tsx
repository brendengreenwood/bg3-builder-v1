import React from 'react';
import { EquipmentItem } from '../types';

interface TableProps {
  data: EquipmentItem[];
  isMobile: boolean;
}

export const Table: React.FC<TableProps> = ({ data, isMobile }) => {
  if (data.length === 0) {
    return (
      <div className="p-8 text-center text-gray-400">
        No equipment data available for this selection.
      </div>
    );
  }

  // Mobile view - card-based layout
  if (isMobile) {
    return (
      <div>
        {data.map((item, index) => (
          <div key={index} className="p-4 border-b border-gray-700 last:border-b-0">
            <h3 className="text-lg font-medium text-purple-300 mb-3">{item.slot}</h3>
            
            {item.bestInSlot && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-400 mb-1">Best in Slot</h4>
                <MobileItemDetails details={item.bestInSlot} />
              </div>
            )}
            
            {item.secondaryOption && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-400 mb-1">Secondary Option</h4>
                <MobileItemDetails details={item.secondaryOption} />
              </div>
            )}
            
            {item.tertiaryOption && (
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-1">Tertiary Option</h4>
                <MobileItemDetails details={item.tertiaryOption} />
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  // Desktop view - table layout
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-800">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">
              Slot
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">
              Best in Slot
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">
              Secondary Option
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">
              Tertiary Option
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-800 divide-y divide-gray-700">
          {data.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-750'}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-200 align-top">
                {item.slot}
              </td>
              <td className="px-6 py-4 text-sm text-gray-300 align-top">
                <ItemDetails details={item.bestInSlot} />
              </td>
              <td className="px-6 py-4 text-sm text-gray-300 align-top">
                <ItemDetails details={item.secondaryOption} />
              </td>
              <td className="px-6 py-4 text-sm text-gray-300 align-top">
                <ItemDetails details={item.tertiaryOption} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

interface ItemDetailsProps {
  details: string;
}

const ItemDetails: React.FC<ItemDetailsProps> = ({ details }) => {
  if (!details) return null;
  
  const lines = details.split('\n');
  const name = lines[0];
  const description = lines.slice(1, -1).join('\n');
  const location = lines[lines.length - 1].replace('**Where to Find:**', '');
  
  return (
    <div>
      <div className="font-medium text-purple-400">{name}</div>
      <div className="text-xs mt-1 text-gray-400">{description}</div>
      <div className="text-xs mt-1 italic text-gray-500">
        <span className="font-medium text-gray-400">Where to Find:</span>{location}
      </div>
    </div>
  );
};

const MobileItemDetails: React.FC<ItemDetailsProps> = ({ details }) => {
  if (!details) return null;
  
  const lines = details.split('\n');
  const name = lines[0];
  const description = lines.slice(1, -1).join('\n');
  const location = lines[lines.length - 1].replace('**Where to Find:**', '');
  
  // Determine location type for styling
  const getLocationType = (locationText: string): string => {
    const lowerLoc = locationText.toLowerCase();
    if (lowerLoc.includes('vendor') || lowerLoc.includes('sold') || lowerLoc.includes('purchased') || lowerLoc.includes('merchant')) {
      return 'vendor';
    } else if (lowerLoc.includes('quest') || lowerLoc.includes('reward') || lowerLoc.includes('completing')) {
      return 'quest';
    } else if (lowerLoc.includes('loot') || lowerLoc.includes('chest') || lowerLoc.includes('found') || lowerLoc.includes('strongbox')) {
      return 'loot';
    } else if (lowerLoc.includes('craft') || lowerLoc.includes('forge') || lowerLoc.includes('forged')) {
      return 'craft';
    } else if (lowerLoc.includes('boss') || lowerLoc.includes('defeat') || lowerLoc.includes('dropped') || lowerLoc.includes('looted from')) {
      return 'boss';
    }
    return 'other';
  };
  
  const locationType = getLocationType(location);
  
  // Get badge color based on location type
  const getBadgeColor = (type: string): string => {
    switch (type) {
      case 'vendor': return 'bg-blue-900 text-blue-200';
      case 'quest': return 'bg-green-900 text-green-200';
      case 'loot': return 'bg-yellow-900 text-yellow-200';
      case 'craft': return 'bg-orange-900 text-orange-200';
      case 'boss': return 'bg-red-900 text-red-200';
      default: return 'bg-gray-700 text-gray-300';
    }
  };
  
  return (
    <div className="bg-gray-750 p-3 rounded-md">
      <div className="font-medium text-purple-400 text-base">{name}</div>
      <div className="text-sm mt-1 text-gray-400">{description}</div>
      <div className="mt-2 flex items-center">
        <span className="text-xs font-medium text-gray-400 mr-2">Where to Find:</span>
        <span className={`text-xs px-2 py-0.5 rounded ${getBadgeColor(locationType)}`}>
          {locationType.charAt(0).toUpperCase() + locationType.slice(1)}
        </span>
      </div>
      <div className="text-xs mt-1 italic text-gray-500">{location.trim()}</div>
    </div>
  );
};