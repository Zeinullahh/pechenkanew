# Deploying to Production (Nginx + PM2 + Next.js)

This guide covers how to run the app behind Nginx on a domain, avoid EISDIR errors on refresh, and keep PM2/Next.js healthy.

## What is already done
- Next.js configured for server mode (no static export) in `next.config.mjs`.
- `npm install` run locally; `npm run build` (Turbopack) succeeds.
- Known warning: two lockfiles were detected. Prefer keeping only `package-lock.json` (remove any unrelated `pnpm-lock.yaml` in parent folders) or set `turbopack.root` to silence it.

## Prerequisites
- Node.js 18+ on the server, PM2 installed globally.
- Nginx installed and your domain pointing to the server.
- SSL certificate ready (via certbot or existing files).

## Server paths and ports
- App directory: adjust to your actual deploy path (e.g., `/var/www/silenceai` or `/home/ubuntu/pechenka`).
- App listens on Node port 3000 (change if needed).

## 1) Nginx server block (proxy to Next.js)
Replace `your-domain.com` and SSL paths as needed, then place this in `/etc/nginx/sites-available/your-domain` and symlink to `sites-enabled`.

```nginx
server {
    listen 80;
    listen 443 ssl http2;
    server_name your-domain.com www.your-domain.com;

    # ssl_certificate /etc/letsencrypt/live/your-domain/fullchain.pem;
    # ssl_certificate_key /etc/letsencrypt/live/your-domain/privkey.pem;

    location / {
        try_files $uri $uri/ @next;
    }

    location @next {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

After editing:
```
sudo nginx -t
sudo systemctl reload nginx
```

## 2) Build and restart the app with PM2
From the app directory on the server:
```
rm -rf .next
npm install          # optional if deps unchanged
npm run build
pm2 restart all
pm2 logs             # verify no runtime errors
```

## 3) Verify refresh and logs
- In a browser, refresh root and nested routes (`/affiliate`, `/ai-soc`, `/slnc-env`, `/policies/*`, `/secure-development`).
- Watch Nginx errors while refreshing:
```
sudo tail -f /var/log/nginx/error.log
```
- EISDIR should disappear once Nginx proxies correctly and Next.js serves the route.

## 4) Optional: silence Turbopack root warning
Either remove stray lockfiles (keep `package-lock.json`) or set in `next.config.mjs`:
```js
export default {
  turbopack: { root: __dirname },
  images: { unoptimized: true },
  trailingSlash: true
};
```

## Rollback
If a deploy goes wrong, you can:
- Restore the previous Nginx config, reload Nginx.
- Revert to the last working build by keeping the previous `.next` backup or re-running the prior commit with `npm run build`.

## Health checklist
- `npm run build` passes without errors.
- `pm2 logs` clean after restart.
- `sudo tail -f /var/log/nginx/error.log` shows no EISDIR.
- Browser refresh works on all routes.
