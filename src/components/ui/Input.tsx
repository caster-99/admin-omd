import { type ComponentProps, forwardRef } from "react"
import { cn } from "@/lib/utils"

interface InputProps extends ComponentProps<"input"> {

  errors?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, placeholder, errors, ...props }, ref) => {
    return (
      <div className={cn("w-fit", className)}>
        <div className="relative group">
          <input
            type={type}
            className={cn(
              "peer w-full bg-background text-foreground text-sm border border-input rounded-md px-3.5 py-2.5 transition-all duration-300 ease-in-out focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 hover:border-muted-foreground/30 shadow-sm file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
            placeholder=" "
            ref={ref}
            {...props}
          />
          <label
            htmlFor={props.id}
            className="absolute cursor-text bg-background px-1 left-2.5 top-2.5 text-muted-foreground text-sm transition-all duration-300 ease-in-out transform origin-left pointer-events-none
              peer-focus:-top-2 peer-focus:left-2 peer-focus:text-xs peer-focus:text-primary peer-focus:font-medium
              peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:left-2 peer-[:not(:placeholder-shown)]:text-xs"
          >
            {placeholder}
          </label>
          {errors && <p className="text-red-500 text-xs mt-1">{errors}</p>}
        </div>
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
