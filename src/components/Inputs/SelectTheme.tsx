import { AnimatePresence, motion } from "framer-motion";
import React, { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { FieldError } from "react-hook-form";
import useOutSideClick from "@/hooks/useOutsideClick";

interface SelectOption {
  id: string;
  label: string;
}

interface SelectThemeProps {
  label?: string;
  error?: FieldError;
  isLoading?: boolean;
  className?: string;
  labelClassName?: string;
  helper?: string;
  placeholder: string;
  options: SelectOption[];
  leftIcon?: React.ReactNode;
  onChange?: (selectedOptionId: string) => void;
}

export function SelectTheme({
  label,
  error,
  isLoading,
  className = "",
  labelClassName = "",
  helper,
  placeholder,
  options,
  leftIcon,
  onChange,
}: SelectThemeProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popUpRef = useRef<HTMLDivElement>(null);

  useOutSideClick(buttonRef, popUpRef, setIsOpen);

  const handleButtonClicked = () => {
    if(isOpen) {
      buttonRef.current?.blur();
    }
    setIsOpen(!isOpen);
  }

  const handleChange = (optionId: string) => {
    setSelectedOptionId(optionId);
    onChange?.(optionId);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block">
      {label && (
        <motion.label
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`block mb-2 text-sm font-medium text-white ${labelClassName}`}
        >
          {label}
        </motion.label>
      )}
      <button
        onClick={handleButtonClicked}
        ref={buttonRef}
        className={`
          relative w-full px-3 py-2.5 flex items-center justify-between
          ${leftIcon ? "pl-10" : "pl-4"}
          bg-steelGray/50
          ${selectedOptionId ? "text-white" : "text-silver/60"}
          border border-royalPurple/30
          rounded-xl
          transition-all duration-200
          disabled:opacity-50
          disabled:cursor-not-allowed
          focus:outline-none
          focus:ring-2
          focus:ring-electricViolet/50
          focus:border-electricViolet
          hover:border-electricViolet/50
          ${error ? "border-red-500 focus:ring-red-500/50" : ""}
          ${className}
        `}
        disabled={isLoading}
      >
        {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-silver">
              {leftIcon}
            </div>
        )}
        {selectedOptionId ? 
          options.find((option) => option.id == selectedOptionId)?.label :
          placeholder
        }
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-silver/60" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={popUpRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            //className="absolute left-0 mt-2 w-56 p-3 bg-white rounded-lg shadow-lg z-50 border border-gray-200"
            className={`
              absolute z-[2] w-full overflow-hidden
              bg-steelGray
              text-white
              border border-royalPurple/30
              rounded-xl
              transition-all duration-200
              hover:border-electricViolet/50
            `}
          >
            <ul className="text-sm max-h-[300px] overflow-y-auto">
              {options.map((option) => (
                <li key={option.id} className="px-2 py-2 flex items-center hover:bg-white/20" onClick={() => handleChange(option.id)}>
                  <label className="flex items-center flex-1 cursor-pointer">
                    <span className="ml-2 text-sm text-white">
                      {option.label}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
          {(error || helper) && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`mt-2 text-sm ${error ? "text-red-500" : "text-silver/80"}`}
            >
              {error ? error.message : helper}
            </motion.p>
          )}
        </AnimatePresence>
    </div>
  );
}
