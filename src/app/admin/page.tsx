"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!data.ok) {
        toast.error(data.error ?? "Senha incorreta.");
        return;
      }
      toast.success("Bem-vindo(a) de volta!");
      router.push("/admin/dashboard");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-xl dark:bg-[#1c1224]"
      >
        <div className="mb-6 flex flex-col items-center">
          <Image src="/images/logo.png" alt="Rei do Açaí" width={64} height={64} className="mb-3 h-16 w-16 rounded-full" />
          <h1 className="font-display text-xl font-bold">Painel Administrativo</h1>
          <p className="text-sm text-black/50 dark:text-white/50">Rei do Açaí</p>
        </div>

        <label className="mb-2 flex items-center gap-2 text-sm font-semibold">
          <Lock className="h-4 w-4" /> Senha de acesso
        </label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Digite a senha"
          required
        />

        <Button type="submit" size="lg" className="mt-6 w-full" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </Button>
      </form>
    </div>
  );
}
