import type { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-[#F5F5F5] dark:bg-[#120a19]">{children}</div>;
}
