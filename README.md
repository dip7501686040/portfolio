# Dipankar Saha — Portfolio (Next.js)

A modern, freelance-client-facing portfolio built with Next.js 14 (App Router),
TypeScript, and Tailwind CSS. Content is pulled from the uploaded resume.

## What's included

- Dashboard-style hero with an "availability status" strip (a nod to the
  observability tooling listed on the resume)
- About, skills (grouped exactly as on the resume), and a work-experience
  timeline
- **Project catalog** — a card grid that opens a lightbox gallery supporting
  both images and video demo clips (`components/Projects.tsx` / `ProjectModal.tsx`)
- **Download resume** button (serves `/public/resume.pdf`, already copied in)
- **Click-to-call** and **WhatsApp chat** floating buttons
- **Google OAuth sign-in** ("Continue with Google") via NextAuth, used to
  pre-fill the contact form
- **Leave a message** contact form, posting to `/api/contact`

## 1. Install

```bash
npm install
```

## 2. Configure environment variables

```bash
cp .env.local.example .env.local
```

Then fill in:

- **`GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`** — from
  [Google Cloud Console → Credentials](https://console.cloud.google.com/apis/credentials).
  Create an OAuth 2.0 Client ID (type: Web application) and add:
  - Authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
    (and your production URL later, e.g. `https://yourdomain.com/api/auth/callback/google`)
- **`NEXTAUTH_SECRET`** — generate with `openssl rand -base64 32`
- **`NEXTAUTH_URL`** — `http://localhost:3000` locally; your live URL in production
- **`RESEND_API_KEY` / `CONTACT_TO_EMAIL`** — sign up free at
  [resend.com](https://resend.com), create an API key, and set the inbox you
  want messages delivered to. Until this is set, the contact form will return
  a clear error instead of silently losing messages (see `app/api/contact/route.ts`).

## 3. Run locally

```bash
npm run dev
```

Visit http://localhost:3000

## 4. Add your own project media

Placeholder diagrams live in `public/projects/*.svg` so the catalog never
looks broken. Replace them (and update `lib/data.ts`) with real assets:

- Images: drop `.jpg`/`.png`/`.webp` files in `public/projects/`
- Video demos: drop `.mp4` files in `public/projects/` and set
  `{ type: "video", src: "/projects/your-clip.mp4", poster: "/projects/your-poster.jpg" }`
  in the `media` array for that project in `lib/data.ts`

## 5. Update contact details

All phone/email/social links live in one place: `lib/data.ts` → `profile`.
The WhatsApp and click-to-call buttons both read `profile.phone`.

## 6. Deploy

The easiest path is [Vercel](https://vercel.com) (same company as Next.js):

1. Push this project to a GitHub repo
2. Import it in Vercel
3. Add the same environment variables from `.env.local` in the Vercel
   project's Settings → Environment Variables
4. Update the Google OAuth redirect URI and `NEXTAUTH_URL` to your production domain

## Project structure

```
app/
  page.tsx                     Home page assembling all sections
  layout.tsx                   Fonts, metadata, providers
  api/auth/[...nextauth]/      Google OAuth route
  api/contact/                 Contact form email route (Resend)
components/
  Hero.tsx, About.tsx, Skills.tsx, Experience.tsx
  Projects.tsx, ProjectModal.tsx   Catalog + lightbox
  Contact.tsx                      Google sign-in + message form
  FloatingActions.tsx              WhatsApp + click-to-call
  Footer.tsx, StatusBar.tsx, Providers.tsx
lib/
  data.ts     All resume-derived content (edit this to update copy)
  auth.ts     NextAuth configuration
public/
  resume.pdf         Your resume, served for the download button
  projects/*.svg     Placeholder project media — replace with real screenshots/video
```
