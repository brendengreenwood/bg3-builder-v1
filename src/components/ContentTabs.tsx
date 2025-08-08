import React from "react";
import { TabType } from "../types";
import { Shield, Zap } from "lucide-react";

interface ContentTabsProps {
  selectedTab: TabType;
  onSelectTab: (tabId: TabType) => void;
  isMobile: boolean;
}

export const ContentTabs: React.FC<ContentTabsProps> = ({
  selectedTab,
  onSelectTab,
  isMobile,
}) => {
  const tabs = [
    {
      id: "armor" as TabType,
      name: "Equipment",
      icon: <Shield size={16} className="text-purple-400" />,
    },
    {
      id: "spells" as TabType,
      name: "Spells",
      icon: <Zap size={16} className="text-purple-400" />,
    },
  ];

  return (
    <div className="mb-6">
      <div className="border-b border-gray-700">
        <div
          className={`flex ${isMobile ? "overflow-x-auto hide-scrollbar" : ""}`}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`py-3 px-4 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
                isMobile ? "whitespace-nowrap flex-1" : ""
              } ${
                selectedTab === tab.id
                  ? "border-purple-500 text-purple-300"
                  : "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600"
              }`}
              aria-label={`Select ${tab.name}`}
            >
              {tab.icon}
              {tab.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
