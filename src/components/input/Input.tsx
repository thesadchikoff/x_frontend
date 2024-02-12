import { forwardRef } from "react";

import { cn } from "@/utils/helpers";

export interface InputProps extends React.ComponentProps<"input"> {
  label?: string;
  helperText?: string;
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, helperText, error, className, type, ...props }, ref) => (
    <div>
      {label && <p className="mb-1.5 text-sm">{label}</p>}
      <input
        {...props}
        type={type}
        className={cn(
          "flex h-12 w-full rounded-lg border border-light bg-transparent p-3 text-base",
          "placeholder:text-tertiary",
          "hover:border-medium",
          "disabled:cursor-not-allowed disabled:border-light disabled:bg-disabled",
          "disabled:placeholder:text-tertiary",
          !error &&
            "focus:outline focus:outline-2 focus:-outline-offset-1 focus:outline-indicator-focused",
          error && "outline outline-2 outline-indicator-error",
          className
        )}
        ref={ref}
      />
      {helperText && (
        <p className={cn("mt-1 text-sm text-tertiary", error && "text-error")}>
          {helperText}
        </p>
      )}
    </div>
  )
);
