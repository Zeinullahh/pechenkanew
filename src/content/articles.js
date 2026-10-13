// Editorial entries live here so the index and article pages share the same metadata.
export const articles = [
  {
    slug: "mikrotik-routeros-active-exploitation",
    category: "Threat intelligence",
    date: "2026-09-05",
    dateLabel: "05 September 2026",
    readingTime: "6 min read",
    title: "MikroTik RouterOS flaws are being actively exploited",
    dek: "A critical SSH vulnerability chain has been used to take control of internet-facing routers. Here is what administrators should check now.",
    source: "CERT Polska",
    sourceUrl: "https://cert.pl/en/posts/2026/09/vulnerabilities-in-mikrotik-routeros-actively-exploited/",
    tags: ["RouterOS", "Active exploitation", "Vulnerability"],
  },
];

export function getArticle(slug) {
  return articles.find((article) => article.slug === slug);
}
