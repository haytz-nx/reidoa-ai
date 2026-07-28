"use client";

import { useEffect, useState } from "react";
import { getStoreStatus, type StoreStatus } from "@/lib/store-hours";
import { cn } from "@/lib/utils";

export function useStoreStatus(): StoreStatus | null {
  const [status, setStatus] = useState<StoreStatus | null>(null);

  useEffect(() => {
    setStatus(getStoreStatus());
    const interval = setInterval(() => setStatus(getStoreStatus()), 30_000);
    return () => clearInterval(interval);
  }, []);

  return status;
}

export function StoreStatusBadge({ className }: { className?: string }) {
  const status = useStoreStatus();

  if (!status) {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-2 rounded-full bg-black/5 px-3 py-1.5 text-sm font-semibold dark:bg-white/10",
          className,
        )}
      >
        <span className="h-2 w-2 rounded-full bg-gray-400" />
        Verificando horário...
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold shadow-sm",
        status.isOpen
          ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
          : "bg-red-500/15 text-red-700 dark:text-red-400",
        className,
      )}
    >
      <span
        className={cn(
          "h-2 w-2 rounded-full",
          status.isOpen ? "bg-emerald-500 animate-pulse" : "bg-red-500",
        )}
      />
      {status.label} · {status.nextChangeLabel}
    </span>
  );
}
