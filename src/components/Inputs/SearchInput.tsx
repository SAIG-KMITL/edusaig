"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useCallback, useEffect, useRef, useState } from "react";

interface SearchInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "size"
  > {
  onSearch: (value: string) => void;
  debounceMs?: number;
  placeholder?: string;
  isLoading?: boolean;
  showClear?: boolean;
  label?: string;
  containerClassName?: string;
  size?: "sm" | "md" | "lg";
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      onSearch,
      debounceMs = 300,
      placeholder = "Search...",
      isLoading = false,
      showClear = true,
      label,
      containerClassName = "",
      size = "md",
      className = "",
      ...props
    },
    ref
  ) => {
    const [value, setValue] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const debounceTimer = useRef<NodeJS.Timeout>();

    useEffect(() => {
      return () => {
        if (debounceTimer.current) {
          clearTimeout(debounceTimer.current);
        }
      };
    }, []);

    const handleChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setValue(newValue);

        if (debounceTimer.current) {
          clearTimeout(debounceTimer.current);
        }

        debounceTimer.current = setTimeout(() => {
          onSearch(newValue);
        }, debounceMs);
      },
      [debounceMs, onSearch]
    );

    const handleSubmit = useCallback(
      (event: React.FormEvent) => {
        event.preventDefault();
        onSearch(value);
      },
      [value, onSearch]
    );

    const handleClear = useCallback(() => {
      setValue("");
      onSearch("");
    }, [onSearch]);

    const sizeClasses = {
      sm: "h-8 text-sm",
      md: "h-10 text-base",
      lg: "h-12 text-lg",
    };

    return (
      <div className={`flex flex-col gap-2 ${containerClassName}`}>
        <AnimatePresence>
          {label && (
            <motion.label
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              htmlFor="search"
              className="text-sm font-medium text-steelGray"
            >
              {label}
            </motion.label>
          )}
        </AnimatePresence>
        <form
          onSubmit={handleSubmit}
          className="relative flex items-center w-full"
        >
          <div className="relative w-full">
            <motion.input
              ref={ref}
              type="text"
              id="search"
              value={value}
              onChange={handleChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              initial={{ scale: 0.98 }}
              animate={{
                scale: 1,
                boxShadow: isFocused
                  ? "0 0 0 2px rgba(88, 48, 145, 0.2)"
                  : "0 0 0 1px rgba(88, 48, 145, 0.1)",
              }}
              transition={{ duration: 0.2 }}
              className={`
                peer w-full rounded-lg border border-royalPurple/20 p-4
                placeholder:text-silver
                focus:border-royalPurple focus:outline-none
                disabled:cursor-not-allowed disabled:opacity-50
                transition-colors duration-200
                ${sizeClasses[size]}
                ${className}
              `}
              placeholder={placeholder}
              {...(props as any)}
            />
            <AnimatePresence>
              {showClear && value && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  type="button"
                  onClick={handleClear}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-silver hover:text-steelGray transition-colors duration-200"
                >
                  <span className="sr-only">Clear search</span>
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
          <AnimatePresence>
            {isLoading ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute right-3 flex items-center"
              >
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-royalPurple/30 border-t-royalPurple" />
              </motion.div>
            ) : (
              <motion.button
                type="submit"
                initial={{ opacity: 0.8, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="p-2.5 ml-2 text-sm font-medium text-white bg-royalPurple rounded-lg border border-royalPurple hover:bg-darkMagenta focus:ring-4 focus:outline-none focus:ring-royalPurple/30 transition-colors duration-200"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </motion.button>
            )}
          </AnimatePresence>
        </form>
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";

export default SearchInput;
