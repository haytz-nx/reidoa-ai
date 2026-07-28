"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  LogOut,
  Plus,
  Pencil,
  Trash2,
  ImagePlus,
  Star,
  Flame,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { formatCurrencyBRL, cn, slugify } from "@/lib/utils";
import { getProductImage } from "@/lib/category-images";
import type { Category, Product, Topping } from "@/lib/types";

type Tab = "produtos" | "categorias" | "acompanhamentos";

const EMPTY_PRODUCT: Partial<Product> = {
  name: "",
  slug: "",
  description: "",
  price: 0,
  imageUrl: "",
  active: true,
  featured: false,
  isPromo: false,
  promoPrice: null,
  isNew: false,
  popular: false,
  customizationType: "none",
  maxFlavors: 0,
  maxToppings: 0,
  flavorOptions: [],
  sizeOptions: [],
};

export function AdminDashboard({
  initialProducts,
  categories,
  initialToppings,
}: {
  initialProducts: Product[];
  categories: Category[];
  initialToppings: Topping[];
}) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("produtos");
  const [products, setProducts] = useState(initialProducts);
  const [toppings, setToppings] = useState(initialToppings);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [editing, setEditing] = useState<Partial<Product> | null>(null);
  const [showToppingForm, setShowToppingForm] = useState(false);
  const [newTopping, setNewTopping] = useState({ name: "", group: "Coberturas" });

  const filteredProducts = useMemo(() => {
    if (categoryFilter === "all") return products;
    return products.filter((p) => p.categorySlug === categoryFilter);
  }, [products, categoryFilter]);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
  }

  async function refreshProducts() {
    const res = await fetch("/api/products");
    const data = await res.json();
    if (data.ok) setProducts(data.products);
  }

  async function toggleField(product: Product, field: keyof Product) {
    const res = await fetch(`/api/products/${product.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [field]: !product[field] }),
    });
    if (res.ok) {
      await refreshProducts();
    } else {
      toast.error("Erro ao atualizar produto.");
    }
  }

  async function handleDeleteProduct(id: number) {
    if (!confirm("Tem certeza que deseja excluir este produto?")) return;
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Produto excluído.");
      await refreshProducts();
    }
  }

  async function handleSaveProduct(product: Partial<Product>) {
    const payload = {
      ...product,
      slug: product.slug || slugify(product.name ?? ""),
    };
    const isEdit = Boolean(product.id);
    const res = await fetch(isEdit ? `/api/products/${product.id}` : "/api/products", {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (data.ok) {
      toast.success(isEdit ? "Produto atualizado!" : "Produto criado!");
      setEditing(null);
      await refreshProducts();
    } else {
      toast.error(data.error ?? "Erro ao salvar produto.");
    }
  }

  async function handleAddTopping() {
    if (!newTopping.name.trim()) return;
    const res = await fetch("/api/toppings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTopping),
    });
    const data = await res.json();
    if (data.ok) {
      setToppings((prev) => [...prev, data.topping]);
      setNewTopping({ name: "", group: "Coberturas" });
      setShowToppingForm(false);
      toast.success("Acompanhamento adicionado!");
    }
  }

  async function handleToggleTopping(topping: Topping) {
    const res = await fetch(`/api/toppings/${topping.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...topping, active: !topping.active }),
    });
    const data = await res.json();
    if (data.ok) {
      setToppings((prev) => prev.map((t) => (t.id === topping.id ? data.topping : t)));
    }
  }

  async function handleDeleteTopping(id: number) {
    if (!confirm("Excluir este acompanhamento?")) return;
    const res = await fetch(`/api/toppings/${id}`, { method: "DELETE" });
    if (res.ok) {
      setToppings((prev) => prev.filter((t) => t.id !== id));
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-[#8E24AA]">Admin</p>
          <h1 className="font-display text-2xl font-extrabold sm:text-3xl">Painel Rei do Açaí</h1>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="h-4 w-4" /> Sair
        </Button>
      </div>

      <div className="mb-6 flex gap-2 overflow-x-auto">
        {[
          { id: "produtos", label: "🍧 Produtos" },
          { id: "categorias", label: "🗂️ Categorias" },
          { id: "acompanhamentos", label: "🍫 Acompanhamentos" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as Tab)}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition",
              tab === t.id
                ? "border-[#6A1B9A] bg-[#6A1B9A] text-white"
                : "border-black/10 bg-white dark:border-white/10 dark:bg-[#1c1224]",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "produtos" && (
        <div>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="h-11 rounded-xl border border-black/10 bg-white px-3 text-sm dark:border-white/10 dark:bg-[#1c1224]"
            >
              <option value="all">Todas as categorias</option>
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.icon} {c.name}
                </option>
              ))}
            </select>
            <Button onClick={() => setEditing({ ...EMPTY_PRODUCT, categoryId: categories[0]?.id })}>
              <Plus className="h-4 w-4" /> Novo Produto
            </Button>
          </div>

          <div className="overflow-hidden rounded-2xl border border-black/5 bg-white dark:border-white/10 dark:bg-[#1c1224]">
            <table className="w-full text-left text-sm">
              <thead className="bg-black/5 text-xs uppercase tracking-wide text-black/50 dark:bg-white/5 dark:text-white/50">
                <tr>
                  <th className="px-4 py-3">Produto</th>
                  <th className="px-4 py-3">Categoria</th>
                  <th className="px-4 py-3">Preço</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Destaques</th>
                  <th className="px-4 py-3 text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-t border-black/5 dark:border-white/10">
                    <td className="flex items-center gap-3 px-4 py-3">
                      <div className="relative h-10 w-10 overflow-hidden rounded-lg">
                        <Image
                          src={getProductImage(product.imageUrl, product.categorySlug)}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="font-semibold">{product.name}</span>
                    </td>
                    <td className="px-4 py-3 text-black/60 dark:text-white/60">
                      {product.categoryName}
                    </td>
                    <td className="px-4 py-3 font-semibold">{formatCurrencyBRL(product.price)}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toggleField(product, "active")}
                        className={cn(
                          "rounded-full px-3 py-1 text-xs font-bold",
                          product.active
                            ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
                            : "bg-red-500/15 text-red-700 dark:text-red-400",
                        )}
                      >
                        {product.active ? "Ativo" : "Inativo"}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1.5">
                        <button
                          title="Promoção"
                          onClick={() => toggleField(product, "isPromo")}
                          className={cn(
                            "flex h-7 w-7 items-center justify-center rounded-full",
                            product.isPromo ? "bg-orange-500 text-white" : "bg-black/5 text-black/30 dark:bg-white/10",
                          )}
                        >
                          <Flame className="h-3.5 w-3.5" />
                        </button>
                        <button
                          title="Destaque"
                          onClick={() => toggleField(product, "featured")}
                          className={cn(
                            "flex h-7 w-7 items-center justify-center rounded-full",
                            product.featured ? "bg-[#6A1B9A] text-white" : "bg-black/5 text-black/30 dark:bg-white/10",
                          )}
                        >
                          <Star className="h-3.5 w-3.5" />
                        </button>
                        <button
                          title="Novo"
                          onClick={() => toggleField(product, "isNew")}
                          className={cn(
                            "flex h-7 w-7 items-center justify-center rounded-full",
                            product.isNew ? "bg-emerald-500 text-white" : "bg-black/5 text-black/30 dark:bg-white/10",
                          )}
                        >
                          <Sparkles className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setEditing(product)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-black/5 hover:bg-black/10 dark:bg-white/10"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10 text-red-600 hover:bg-red-500/20"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "categorias" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <div key={c.id} className="rounded-2xl bg-white p-4 shadow-sm dark:bg-[#1c1224]">
              <p className="text-2xl">{c.icon}</p>
              <p className="mt-2 font-display font-bold">{c.name}</p>
              <p className="text-xs text-black/50 dark:text-white/50">{c.description}</p>
              <p className="mt-2 text-xs font-semibold text-[#6A1B9A] dark:text-purple-300">
                {products.filter((p) => p.categorySlug === c.slug).length} produtos
              </p>
            </div>
          ))}
        </div>
      )}

      {tab === "acompanhamentos" && (
        <div>
          <div className="mb-4 flex justify-end">
            <Button onClick={() => setShowToppingForm((v) => !v)}>
              <Plus className="h-4 w-4" /> Novo Acompanhamento
            </Button>
          </div>

          {showToppingForm && (
            <div className="mb-4 flex flex-wrap items-end gap-3 rounded-2xl bg-white p-4 shadow-sm dark:bg-[#1c1224]">
              <div className="flex-1">
                <label className="mb-1 block text-xs font-semibold">Nome</label>
                <Input
                  value={newTopping.name}
                  onChange={(e) => setNewTopping((p) => ({ ...p, name: e.target.value }))}
                  placeholder="Ex: Kiwi"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold">Grupo</label>
                <select
                  value={newTopping.group}
                  onChange={(e) => setNewTopping((p) => ({ ...p, group: e.target.value }))}
                  className="h-12 rounded-2xl border border-black/10 bg-white px-3 text-sm dark:border-white/10 dark:bg-[#1c1224]"
                >
                  <option>Cremes e Doces</option>
                  <option>Frutas</option>
                  <option>Crocantes</option>
                  <option>Caldas</option>
                </select>
              </div>
              <Button onClick={handleAddTopping}>Adicionar</Button>
            </div>
          )}

          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {toppings.map((t) => (
              <div
                key={t.id}
                className="flex items-center justify-between rounded-xl bg-white px-4 py-3 shadow-sm dark:bg-[#1c1224]"
              >
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-black/40 dark:text-white/40">{t.group}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleTopping(t)}
                    className={cn(
                      "rounded-full px-2.5 py-1 text-[11px] font-bold",
                      t.active
                        ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
                        : "bg-red-500/15 text-red-700 dark:text-red-400",
                    )}
                  >
                    {t.active ? "Ativo" : "Inativo"}
                  </button>
                  <button
                    onClick={() => handleDeleteTopping(t.id)}
                    className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-500/10 text-red-600 hover:bg-red-500/20"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {editing && (
        <ProductFormModal
          product={editing}
          categories={categories}
          onClose={() => setEditing(null)}
          onSave={handleSaveProduct}
        />
      )}
    </div>
  );
}

function ProductFormModal({
  product,
  categories,
  onClose,
  onSave,
}: {
  product: Partial<Product>;
  categories: Category[];
  onClose: () => void;
  onSave: (product: Partial<Product>) => void;
}) {
  const [form, setForm] = useState<Partial<Product>>(product);
  const [uploading, setUploading] = useState(false);

  function set<K extends keyof Product>(key: K, value: Product[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleUpload(file: File) {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
    const data = await res.json();
    setUploading(false);
    if (data.ok) {
      set("imageUrl", data.url);
      toast.success("Imagem enviada!");
    } else {
      toast.error(data.error ?? "Erro ao enviar imagem.");
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl dark:bg-[#1c1224]">
        <h2 className="mb-4 font-display text-xl font-bold">
          {form.id ? "Editar Produto" : "Novo Produto"}
        </h2>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs font-semibold">Nome</label>
            <Input value={form.name ?? ""} onChange={(e) => set("name", e.target.value)} />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs font-semibold">Descrição</label>
            <Textarea
              rows={2}
              value={form.description ?? ""}
              onChange={(e) => set("description", e.target.value)}
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold">Categoria</label>
            <select
              value={form.categoryId ?? ""}
              onChange={(e) => set("categoryId", Number(e.target.value))}
              className="h-12 w-full rounded-2xl border border-black/10 bg-white px-3 text-sm dark:border-white/10 dark:bg-[#1c1224]"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.icon} {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold">Preço (R$)</label>
            <Input
              type="number"
              step="0.01"
              value={form.price ? (form.price / 100).toFixed(2) : ""}
              onChange={(e) => set("price", Math.round(Number(e.target.value) * 100))}
            />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs font-semibold">Imagem</label>
            <div className="flex items-center gap-3">
              {form.imageUrl && (
                <div className="relative h-16 w-16 overflow-hidden rounded-xl">
                  <Image src={form.imageUrl} alt="preview" fill className="object-cover" />
                </div>
              )}
              <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-black/20 px-4 py-2 text-sm dark:border-white/20">
                <ImagePlus className="h-4 w-4" />
                {uploading ? "Enviando..." : "Escolher imagem"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
                />
              </label>
            </div>
          </div>

          <div className="sm:col-span-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {[
              { key: "active", label: "Ativo" },
              { key: "featured", label: "Destaque" },
              { key: "isPromo", label: "Promoção" },
              { key: "isNew", label: "Novo" },
              { key: "popular", label: "Popular" },
            ].map((flag) => (
              <label key={flag.key} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={Boolean(form[flag.key as keyof Product])}
                  onChange={(e) => set(flag.key as keyof Product, e.target.checked as never)}
                />
                {flag.label}
              </label>
            ))}
          </div>

          {form.isPromo && (
            <div>
              <label className="mb-1 block text-xs font-semibold">Preço promocional (R$)</label>
              <Input
                type="number"
                step="0.01"
                value={form.promoPrice ? (form.promoPrice / 100).toFixed(2) : ""}
                onChange={(e) => set("promoPrice", Math.round(Number(e.target.value) * 100))}
              />
            </div>
          )}

          <div>
            <label className="mb-1 block text-xs font-semibold">Personalização</label>
            <select
              value={form.customizationType ?? "none"}
              onChange={(e) => set("customizationType", e.target.value as Product["customizationType"])}
              className="h-12 w-full rounded-2xl border border-black/10 bg-white px-3 text-sm dark:border-white/10 dark:bg-[#1c1224]"
            >
              <option value="none">Nenhuma</option>
              <option value="flavors_toppings">Sabores + Acompanhamentos</option>
              <option value="size_flavors_toppings">Tamanho + Sabores + Acompanhamentos</option>
            </select>
          </div>

          {form.customizationType !== "none" && (
            <>
              <div>
                <label className="mb-1 block text-xs font-semibold">Máx. sabores</label>
                <Input
                  type="number"
                  value={form.maxFlavors ?? 0}
                  onChange={(e) => set("maxFlavors", Number(e.target.value))}
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold">Máx. acompanhamentos</label>
                <Input
                  type="number"
                  value={form.maxToppings ?? 0}
                  onChange={(e) => set("maxToppings", Number(e.target.value))}
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-xs font-semibold">
                  Sabores disponíveis (separados por vírgula)
                </label>
                <Textarea
                  rows={2}
                  value={(form.flavorOptions ?? []).join(", ")}
                  onChange={(e) =>
                    set(
                      "flavorOptions",
                      e.target.value.split(",").map((v) => v.trim()).filter(Boolean),
                    )
                  }
                />
              </div>
            </>
          )}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={() => onSave(form)}>Salvar</Button>
        </div>
      </div>
    </div>
  );
}
