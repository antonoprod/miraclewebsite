import type { MetadataRoute } from "next";
import { events } from "@/data/events";

const baseUrl = "https://www.miraclebgo.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/events",
    "/shop",
    "/privacidad",
    "/condiciones",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date("2026-07-24"),
  }));

  const eventRoutes = events.map((event) => ({
    url: `${baseUrl}/events/${event.slug}`,
    lastModified: new Date("2026-07-24"),
  }));

  return [...staticRoutes, ...eventRoutes];
}
