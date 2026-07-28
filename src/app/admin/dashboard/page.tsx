import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE_NAME, isValidToken } from "@/lib/admin-auth";
import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { getAllProducts, getAllToppings, getCategories } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  if (!isValidToken(token)) {
    redirect("/admin");
  }

  const [products, categories, toppings] = await Promise.all([
    getAllProducts(),
    getCategories(),
    getAllToppings(),
  ]);

  return (
    <AdminDashboard
      initialProducts={products}
      categories={categories}
      initialToppings={toppings}
    />
  );
}
