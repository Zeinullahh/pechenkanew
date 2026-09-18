import createNextIntlPlugin from 'next-intl/plugin';
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Static export for lightweight deployment (nginx/pm2 serve)
// Language detection happens client-side via LanguageContext
const nextConfig = {
  output: 'export', // Generate static HTML files in 'out' directory
  images: {
    unoptimized: true, // Required for static export
  },
  trailingSlash: true, // Generates /page/index.html instead of /page.html
  turbopack: {
    root: __dirname,
  },
  // Note: redirects don't work with static export - handle in nginx instead
};

const withNextIntl = createNextIntlPlugin('./src/i18n/request.js');

export default withNextIntl(nextConfig);
