"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { forwardRef, type ButtonHTMLAttributes } from "react";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97]",
  {
    variants: {
      variant: {
        primary:
          "bg-[#6A1B9A] text-white shadow-lg shadow-purple-900/20 hover:bg-[#59148a] focus-visible:ring-[#6A1B9A]",
        secondary:
          "bg-[#8E24AA] text-white shadow-md hover:bg-[#7b1f95] focus-visible:ring-[#8E24AA]",
        outline:
          "border-2 border-[#6A1B9A] text-[#6A1B9A] bg-transparent hover:bg-[#6A1B9A]/10 dark:text-purple-300 dark:border-purple-300",
        ghost:
          "bg-transparent text-current hover:bg-black/5 dark:hover:bg-white/10",
        whatsapp:
          "bg-[#25D366] text-white shadow-lg shadow-green-900/20 hover:bg-[#20bd5a] focus-visible:ring-[#25D366]",
        danger: "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-sm",
        lg: "h-14 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button };
