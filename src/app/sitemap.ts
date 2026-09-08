import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const agora = new Date();
  return [
    { url: site.url, lastModified: agora, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/quem-somos`, lastModified: agora, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/produtos`, lastModified: agora, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/artigos`, lastModified: agora, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/galeria`, lastModified: agora, changeFrequency: "monthly", priority: 0.7 },
  ];
}
