import type { MetadataRoute } from "next";

const siteUrl = "https://reidoacai-cerquilho.example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/cardapio",
    "/promocoes",
    "/sobre",
    "/contato",
    "/politica-de-privacidade",
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}
