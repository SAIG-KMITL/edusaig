import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FilterOption {
  id: string;
  label: string;
  count: number;
  checked?: boolean;
}

interface FilterDropdownProps {
  title: string;
  options: FilterOption[];
  onFilterChange?: (selectedOptions: string[]) => void;
}

export function FilterDropdown({
  title,
  options,
  onFilterChange,
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedFilters, setSelectedFilters] = useState<Set<string>>(
    new Set()
  );

  const handleCheckboxChange = (optionId: string) => {
    const newSelected = new Set(selectedFilters);
    if (newSelected.has(optionId)) {
      newSelected.delete(optionId);
    } else {
      newSelected.add(optionId);
    }
    setSelectedFilters(newSelected);
    onFilterChange?.(Array.from(newSelected));
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {title}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 mt-2 w-56 p-3 bg-white rounded-lg shadow-lg z-50 border border-gray-200"
          >
            <h6 className="mb-3 text-sm font-medium text-gray-900">{title}</h6>
            <ul className="space-y-2 text-sm max-h-[300px] overflow-y-auto">
              {options.map((option) => (
                <li key={option.id} className="flex items-center">
                  <label className="flex items-center flex-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedFilters.has(option.id)}
                      onChange={() => handleCheckboxChange(option.id)}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-900">
                      {option.label}
                    </span>
                    <span className="ml-auto text-xs text-gray-500">
                      ({option.count})
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
