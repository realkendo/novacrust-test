import React, { useRef, useState } from "react";
import Image from "next/image";
import { Search, ChevronDown } from "lucide-react";
import { Item } from "./CustomSelect";

interface TokenSelectorProps {
  selected: Item;
  items: Item[];
  onSelect: (item: Item) => void;
}

export const TokenSelector = ({ selected, items, onSelect }: TokenSelectorProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const containerRef = useRef<HTMLDivElement>(null);
  
    // Handle click outside
    React.useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
          setSearchQuery("");
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredItems = items.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="relative" ref={containerRef}>
            <button 
                className="flex items-center bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-full px-3 py-1.5 transition-colors cursor-pointer shrink-0"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="w-5 h-5 relative mr-2">
                    {typeof selected.icon === "string" && (
                        <Image 
                            src={selected.icon} 
                            alt={selected.name} 
                            fill
                            className="object-contain"
                        />
                    )}
                </div>
                <span className="font-semibold text-gray-700 mr-2">{selected.name.split(" ")[0]}</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            {isOpen && (
              <div className="absolute top-[120%] right-0 w-[280px] sm:w-[300px] bg-white border border-gray-100 rounded-[20px] shadow-xl p-3 z-50 animate-in fade-in zoom-in-95 duration-200">
                 <div className="relative mb-2">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"/>
                    <input 
                      type="text" 
                      placeholder="Search" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-[12px] text-sm text-[#013941] focus:outline-none focus:border-[#013941] focus:ring-1 focus:ring-[#013941]"
                    />
                 </div>
                 <div className="flex flex-col gap-1 max-h-[300px] overflow-y-auto custom-scrollbar">
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
                            className="flex items-center p-2 rounded-[12px] hover:bg-gray-50 transition-colors text-left w-full"
                        >
                            <div className="w-6 h-6 relative mr-3 shrink-0">
                                {typeof item.icon === "string" && (
                                    <Image src={item.icon} alt={item.name} fill className="object-contain" />
                                )}
                            </div>
                            <span className="font-semibold text-gray-700 text-sm">{item.name}</span>
                        </button>
                        ))
                    ) : (
                        <div className="p-4 text-center text-sm text-gray-500">No results found</div>
                    )}
                 </div>
              </div>
            )}
        </div>
    )
}

interface CurrencyInputProps {
    label: string;
    amount: string;
    onAmountChange?: (val: string) => void;
    readOnly?: boolean;
    selector?: React.ReactNode;
    error?: string;
}

export const CurrencyInput = ({ label, amount, onAmountChange, readOnly, selector, error }: CurrencyInputProps) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        if (val === "" || /^\d*\.?\d*$/.test(val)) {
            onAmountChange?.(val);
        }
    }

    return (
        <div className="flex flex-col gap-1">
            <div
                className={`border rounded-[24px] p-4 transition-all duration-200 bg-white ${
                readOnly 
                    ? "border-gray-200"
                    : error
                        ? "border-red-500 focus-within:border-red-500 focus-within:ring-1 focus-within:ring-red-500"
                        : "border-gray-200 focus-within:border-[#013941] focus-within:ring-1 focus-within:ring-[#013941]" 
                }`}
            >
                <label className="block text-sm text-gray-500 mb-1 ml-1">{label}</label>
                <div className="flex items-center justify-between">
                <input
                    type="text"
                    value={amount}
                    onChange={handleChange}
                    readOnly={readOnly}
                    className={`text-2xl sm:text-3xl font-bold text-[#013941] bg-transparent border-none focus:ring-0 p-0 w-full placeholder-gray-300 outline-none ${readOnly ? "cursor-default" : ""}`}
                    placeholder="0.00"
                />
                {selector}
                </div>
            </div>
            {error && <span className="text-red-500 text-xs ml-1">{error}</span>}
        </div>
    );
};
