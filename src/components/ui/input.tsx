import { cn } from "@/lib/utils";
import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-[15px] text-[#1A1A1A] placeholder:text-black/40 shadow-sm outline-none transition focus:border-[#6A1B9A] focus:ring-2 focus:ring-[#6A1B9A]/20 dark:bg-neutral-900 dark:text-white dark:border-white/10 dark:placeholder:text-white/40",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-[15px] text-[#1A1A1A] placeholder:text-black/40 shadow-sm outline-none transition focus:border-[#6A1B9A] focus:ring-2 focus:ring-[#6A1B9A]/20 dark:bg-neutral-900 dark:text-white dark:border-white/10 dark:placeholder:text-white/40",
      className,
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";
