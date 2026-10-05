/**
 * Featured Articles Configuration
 * 
 * ═══════════════════════════════════════════════════════════════════════
 * HOW TO ADD A NEW ARTICLE (SIMPLE):
 * ═══════════════════════════════════════════════════════════════════════
 * 
 * Step 1: Copy this template:
 * {
 *   url: "YOUR_ARTICLE_URL_HERE",
 *   title: "Your Article Title",
 *   image: "IMAGE_URL_HERE",           // Optional but recommended
 *   description: "Short description"    // Optional
 * },
 * 
 * Step 2: Paste it into the articles array below and replace the values.
 * 
 * NOTE: For LinkedIn posts, right-click on the post image → "Copy image address"
 * and paste that URL in the image field. This ensures the real image shows up.
 * 
 * ═══════════════════════════════════════════════════════════════════════
 * EXAMPLES:
 * ═══════════════════════════════════════════════════════════════════════
 * 
 * LinkedIn post WITH image:
 * {
 *   url: "https://www.linkedin.com/posts/silence-ai_...",
 *   title: "New Cybersecurity Insights",
 *   image: "https://media.licdn.com/dms/image/.../1234/0/...",
 *   description: "Latest findings on cloud API security"
 * },
 * 
 * LinkedIn post WITHOUT image (will show gradient + LinkedIn icon):
 * {
 *   url: "https://www.linkedin.com/posts/silence-ai_...",
 *   title: "Security Update"
 * },
 * 
 * Medium article:
 * {
 *   url: "https://medium.com/@yourname/article-slug",
 *   title: "Building Secure Systems",
 *   image: "https://miro.medium.com/max/1200/...",
 * },
 * 
 */

export const articles = [
  {
    url: "https://www.linkedin.com/posts/silence-ai_abusing-trusted-cloud-apis-what-silence-activity-7416829033738575872--ZJp?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAD_lxEUBin8M9aLVMv9WVpiOwxXv5GbBRgs",
    title: "Be careful on what you trust",
    description: "Attackers can abuse trusted cloud APIs. See what our threat intelligence uncovered."
  },
  {
    url: "https://www.linkedin.com/posts/silence-ai_threatintelligence-threathunting-cybersecurity-activity-7416406312533557248-ijTu?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAD_lxEUBin8M9aLVMv9WVpiOwxXv5GbBRgs",
    title: "Silence AI's intelligence is ahead of VirusTotal, owned by Google",
    description: "A clean VirusTotal result does not guarantee safety. Our threat hunters investigated an active threat."
  },
  {
    url: "https://www.linkedin.com/posts/silence-ai_github-gokbakarerulesetrat-a-curated-activity-7416402278817013760-8na_?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAD_lxEUBin8M9aLVMv9WVpiOwxXv5GbBRgs",
    title: "Catching the RAT Before the Beacon: Builder-Level YARA Detection",
    description: "RuleSetRAT analysis and custom YARA rules help detect the threat even when the original sample is unavailable."
  },
];

/**
 * Configuration for the Featured Resources section
 */
export const featuredResourcesConfig = {
  // Number of articles to display on the homepage
  displayCount: 3,
  
  // Show "View all articles" link
  showViewAllLink: true,
  
  // External link to your Medium publication/profile
  mediumProfileUrl: "https://linkedin.com/company/silence-ai",
};

// Legacy exports for backward compatibility
export const articleUrls = articles.map(a => a.url);
export const mediumArticles = articles;