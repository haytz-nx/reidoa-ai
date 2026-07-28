export type SizeOption = {
  id: string;
  label: string;
  priceDelta: number;
};

export type Product = {
  id: number;
  slug: string;
  categoryId: number;
  categorySlug?: string;
  categoryName?: string;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  active: boolean;
  featured: boolean;
  isPromo: boolean;
  promoPrice: number | null;
  isNew: boolean;
  popular: boolean;
  sortOrder: number;
  customizationType: "none" | "flavors_toppings" | "size_flavors_toppings";
  maxFlavors: number;
  maxToppings: number;
  flavorOptions: string[];
  sizeOptions: SizeOption[];
};

export type Category = {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  icon: string | null;
  sortOrder: number;
};

export type Topping = {
  id: number;
  name: string;
  group: string;
  active: boolean;
  sortOrder: number;
};

export type CartItem = {
  cartId: string;
  productId: number;
  slug: string;
  name: string;
  imageUrl: string | null;
  basePrice: number;
  unitPrice: number;
  quantity: number;
  size: SizeOption | null;
  flavors: string[];
  toppings: string[];
  notes: string;
};

export type PaymentMethod = "pix" | "dinheiro" | "credito" | "debito";

export type DeliveryInfo = {
  name: string;
  phone: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  reference: string;
};
