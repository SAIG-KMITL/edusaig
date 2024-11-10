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
        {label && (
          <label htmlFor="search" className="text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <form
          onSubmit={handleSubmit}
          className="relative flex items-center w-full"
        >
          <div className="relative w-full">
            <input
              ref={ref}
              type="text"
              id="search"
              value={value}
              onChange={handleChange}
              className={`
                peer w-full rounded-lg border border-gray-300 bg-white p-4
                placeholder:text-gray-400
                focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500
                disabled:cursor-not-allowed disabled:opacity-50
                ${sizeClasses[size]}
                ${className}
              `}
              placeholder={placeholder}
              {...props}
            />
            {showClear && value && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
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
              </button>
            )}
          </div>
          {isLoading && (
            <div className="absolute right-3 flex items-center">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
            </div>
          )}
          <button
            type="submit"
            className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </button>
        </form>
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";

export default SearchInput;
