import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronDown, Search } from "lucide-react";

export interface Item {
  id: string;
  name: string;
  icon: string | React.ReactNode;
}

interface CustomSelectProps {
  label: string;
  selected: Item | null;
  items: Item[];
  onSelect: (item: Item) => void;
  placeholder?: string;
  className?: string;
  error?: string;
}

export const CustomSelect = ({ 
  label, 
  selected, 
  items, 
  onSelect, 
  placeholder = "Select an option",
  className,
  error
}: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery(""); // Reset search on close
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`flex flex-col gap-2 relative ${className}`} ref={containerRef}>
      <label className="text-[#003D2B] font-medium ml-1">{label}</label>
      <div 
         className="relative cursor-pointer"
         onClick={() => setIsOpen(!isOpen)}
      >
        <div
          className={`w-full bg-white border rounded-[20px] px-5 py-4 text-gray-700 flex items-center justify-between transition-colors ${
            error 
              ? "border-red-500 hover:border-red-600" 
              : "border-gray-200 hover:border-[#F2F2F2]"
          }`}
        >
          <span className={selected ? "text-gray-900 font-medium flex items-center w-full" : "text-gray-500"}>
            {selected ? (
               <div className="flex items-center w-full overflow-hidden">
                {typeof selected.icon === "string" ? (
                    <div className="w-6 h-6 relative mr-3 shrink-0">
                        <Image src={selected.icon} alt={selected.name} fill className="object-contain" />
                    </div>
                ) : (
                    <span className="mr-0 shrink-0 flex items-center">{selected.icon}</span>
                )}
                <span className="truncate text-[#013941]">{selected.name}</span>
               </div>
            ) : placeholder}
          </span>
          <ChevronDown className="w-5 h-5 text-gray-400 shrink-0 ml-2" />
        </div>

        {isOpen && (
          <div className="absolute top-[110%] left-0 w-full bg-white border border-gray-100 rounded-[24px] shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200 max-h-[350px] flex flex-col">
             
             {/* Search Input */}
             <div className="p-2 mb-1 sticky top-0 bg-white z-10">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"/>
                    <input 
                      type="text" 
                      placeholder="Search" 
                      value={searchQuery}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-[12px] text-sm text-[#013941] focus:outline-none focus:border-[#013941] focus:ring-1 focus:ring-[#013941]"
                    />
                </div>
             </div>

             <div className="flex flex-col gap-1 overflow-y-auto custom-scrollbar">
                {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                    <button 
                        key={item.id}
                        onClick={(e) => {
                            e.stopPropagation();
                            onSelect(item);
                            setIsOpen(false);
                            setSearchQuery("");
                        }}
                        className="flex items-center p-3 rounded-[16px] hover:bg-gray-50 transition-colors text-left group w-full"
                    >
                        {typeof item.icon === "string" ? (
                            <div className="w-6 h-6 relative mr-3 shrink-0">
                                <Image src={item.icon} alt={item.name} fill className="object-contain" />
                            </div>
                        ) : (
                            <span className="mr-0 shrink-0 flex items-center">{item.icon}</span>
                        )}
                        <span className="font-semibold text-gray-700 text-sm group-hover:text-gray-900 truncate">{item.name}</span>
                    </button>
                    ))
                ) : (
                    <div className="p-4 text-center text-sm text-gray-500">No results found</div>
                )}
             </div>
          </div>
        )}
      </div>
      {error && <span className="text-red-500 text-xs ml-1">{error}</span>}
    </div>
  );
};
