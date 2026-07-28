import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function Badge({
  className,
  variant = "default",
  ...props
}: HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "promo" | "new" | "popular" | "outline";
}) {
  const styles: Record<string, string> = {
    default: "bg-[#6A1B9A] text-white",
    promo: "bg-gradient-to-r from-orange-500 to-red-500 text-white",
    new: "bg-emerald-500 text-white",
    popular: "bg-amber-400 text-black",
    outline: "border border-current bg-transparent",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide shadow-sm",
        styles[variant],
        className,
      )}
      {...props}
    />
  );
}
