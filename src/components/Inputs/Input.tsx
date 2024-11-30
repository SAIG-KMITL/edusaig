import { forwardRef } from "react";
import { FieldError } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: FieldError;
  isLoading?: boolean;
  labelClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, isLoading, className = "", labelClassName = "", ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={props.id}
            className={`block text-sm font-medium text-gray-700 ${labelClassName}`}
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            className={`
              text-slate-600
              w-full px-3 py-2 
              border rounded-md 
              transition-colors
              disabled:opacity-50
              disabled:cursor-not-allowed
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              ${error ? "border-red-500" : "border-gray-300"}
              ${className}
            `}
            disabled={isLoading}
            {...props}
          />
        </div>
        {error && <p className="text-sm text-red-500">{error.message}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
