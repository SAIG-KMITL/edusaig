import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Loader } from "lucide-react";
import { forwardRef } from "react";
import { FieldError } from "react-hook-form";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: FieldError;
  isLoading?: boolean;
  labelClassName?: string;
  helper?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const TextareaTheme = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      isLoading,
      className = "",
      labelClassName = "",
      helper,
      leftIcon,
      rightIcon,
      ...props
    },
    ref
  ) => {
    return (
      <div className="space-y-2">
        {label && (
          <motion.label
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            htmlFor={props.id}
            className={`block text-sm font-medium text-white ${labelClassName}`}
          >
            {label}
          </motion.label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 text-silver">
              {leftIcon}
            </div>
          )}
          <textarea
            ref={ref}
            className={`
              resize-none -mb-2 w-full px-3 py-2.5
              ${leftIcon ? "pl-10" : "pl-4"}
              ${rightIcon || isLoading || error ? "pr-10" : "pr-4"}
              bg-steelGray/50
              text-white placeholder-silver/60
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
            {...props}
          />
          {isLoading && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <Loader className="w-5 h-5 text-electricViolet animate-spin" />
            </div>
          )}
          {error && !isLoading && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <AlertCircle className="w-5 h-5 text-red-500" />
            </div>
          )}
          {rightIcon && !isLoading && !error && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-silver">
              {rightIcon}
            </div>
          )}
        </div>
        <AnimatePresence>
          {(error || helper) && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`text-sm ${error ? "text-red-500" : "text-silver/80"}`}
            >
              {error ? error.message : helper}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

TextareaTheme.displayName = "TextareaTheme";

export default TextareaTheme;
