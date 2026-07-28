import {
  boolean,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 80 }).notNull().unique(),
  name: varchar("name", { length: 120 }).notNull(),
  description: text("description").default(""),
  icon: varchar("icon", { length: 12 }).default("🍧"),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type SizeOption = {
  id: string;
  label: string;
  priceDelta: number; // in cents
};

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 140 }).notNull().unique(),
  categoryId: integer("category_id")
    .references(() => categories.id, { onDelete: "cascade" })
    .notNull(),
  name: varchar("name", { length: 160 }).notNull(),
  description: text("description").default(""),
  price: integer("price").notNull(), // cents
  imageUrl: varchar("image_url", { length: 500 }).default(""),
  active: boolean("active").default(true).notNull(),
  featured: boolean("featured").default(false).notNull(),
  isPromo: boolean("is_promo").default(false).notNull(),
  promoPrice: integer("promo_price"),
  isNew: boolean("is_new").default(false).notNull(),
  popular: boolean("popular").default(false).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  customizationType: varchar("customization_type", { length: 40 })
    .default("none")
    .notNull(), // none | flavors_toppings | size_flavors_toppings
  maxFlavors: integer("max_flavors").default(0).notNull(),
  maxToppings: integer("max_toppings").default(0).notNull(),
  flavorOptions: jsonb("flavor_options").$type<string[]>().default([]),
  sizeOptions: jsonb("size_options").$type<SizeOption[]>().default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const toppings = pgTable("toppings", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  group: varchar("group", { length: 60 }).default("Coberturas").notNull(),
  active: boolean("active").default(true).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
});
