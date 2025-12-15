import React from "react";
import { Tab } from "@/lib/data";

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (id: any) => void;
}

export const TabNavigation = ({ tabs, activeTab, onTabChange }: TabNavigationProps) => {
  return (
    <div className="mt-[40px] mb-8 bg-[#F2F2F2] rounded-[30px] flex items-center justify-between w-[90%] sm:w-full max-w-[392px] h-[34px] self-center mx-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex-1 h-full rounded-[30px] px-1 sm:px-[16px] py-[4px] sm:py-[8px] flex items-center justify-center text-[10px] sm:text-[14px] leading-none tracking-normal font-medium transition-all duration-200 whitespace-nowrap ${
            activeTab === tab.id
              ? "bg-[#013941] text-white shadow-sm"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
