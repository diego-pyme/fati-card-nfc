# Fati Card NFC Deployment

## Production URL

Use this URL for the NFC card:

```text
https://card.fatiapp.cl
```

The root route `/` renders the compact no-scroll card. The longer reference version is available at:

```text
https://card.fatiapp.cl/full
```

## Cloudflare Pages

Create a Cloudflare Pages project connected to the GitHub repository for this folder.

Settings:

```text
Framework preset: Vite
Build command: corepack pnpm build
Deploy command: leave empty
Build output directory: dist
Root directory: /
```

Cloudflare Pages Git deployments should publish the `dist` folder automatically after the build. Do not add `npx wrangler pages deploy ...` as a deploy command in this flow.

If Cloudflare makes the deploy command mandatory, you are probably in the Workers deploy flow instead of the Pages static site flow. Go back and create/select a Pages project connected to GitHub.

If the build environment does not enable Corepack automatically, use:

```bash
corepack enable && corepack pnpm install && corepack pnpm build
```

## Custom Domain

Add this custom domain in Cloudflare Pages:

```text
card.fatiapp.cl
```

If `fatiapp.cl` is already managed by Cloudflare DNS, Cloudflare can create the DNS record for the Pages project. Otherwise, add the CNAME record wherever the domain DNS is managed.

## Local Checks

Before deploying:

```bash
corepack pnpm build
corepack pnpm lint
corepack pnpm export:png
```

The exported reference image is generated at:

```text
exports/fati-card-static.png
```

## NFC QA Checklist

- Open `https://card.fatiapp.cl` on iPhone Safari.
- Open `https://card.fatiapp.cl` on Android Chrome.
- Test WhatsApp opens `+56940017720`.
- Test Instagram opens `https://www.instagram.com/fatiapp_/`.
- Test Facebook opens `https://www.facebook.com/profile.php?id=61579667966882`.
- Confirm Descargar is visually disabled.
- Confirm HTTPS works without warnings.
