# Diwakar AI Research Portfolio

Premium single-page research portfolio built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, and Lucide React. The site is designed for postdoctoral applications in trustworthy AI for healthcare and keeps all editable content in one central data source.

## Stack

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- Netlify-compatible serverless functions for admin authentication

## Run locally

1. Install dependencies:

```bash
npm install
```

2. Set up admin authentication.

Option A: environment variables

```bash
cp .env.example .env.local
npm run admin:hash -- "YourStrongPassword"
```

Paste the generated hash into `ADMIN_PASSWORD_HASH` and add a long random value for `ADMIN_SESSION_SECRET`.

Option B: local development password file

```bash
npm run admin:set-dev-password -- "YourStrongPassword"
```

This creates `data/admin-auth.json`, which is ignored by git and only intended for local development.

3. Start the app:

```bash
npm run dev
```

4. Open the hidden admin trigger using:

```text
http://localhost:3000/?admin=1
```

The floating `Edit Portfolio` button only appears when the `admin=1` query parameter is present or a valid admin session already exists.

## Where to edit content

Primary source of truth:

- `data/profile.ts`

All public sections read from this file through a single `ProfileData` structure:

- `personalInfo`
- `hero`
- `about`
- `researchFocus`
- `skills`
- `publications`
- `projects`
- `achievements`
- `postdocInterests`
- `contact`
- `socialLinks`

If you prefer manual editing, update `data/profile.ts` directly and restart the dev server.

## Admin editing flow

What is implemented now:

- Secure password verification through Netlify-compatible serverless functions
- Short-lived `HttpOnly` session cookie for admin access
- Hidden floating edit trigger
- Password modal
- Admin drawer with editable portfolio fields
- Change password flow in local development

How saving works:

- In local development, saving writes `data/profile.override.json`
- The public page reads that override through `/.netlify/functions/profile-read`
- `data/profile.override.json` is gitignored and intended for local iteration only

Important production note:

- This starter does **not** persist live edits in production because a static Netlify deploy has no durable filesystem
- The UI, auth flow, and session model are production-ready foundations
- Persistent online editing still needs a backend or CMS

Recommended production upgrade paths:

1. Netlify Identity + a CMS workflow for protected editing
2. Supabase for storing the profile JSON and admin credentials
3. A Git-backed CMS approach that commits content changes through GitHub

## Change admin password

Local development:

- Open the admin drawer
- Use the `Change Password` section
- A new hash is written to `data/admin-auth.json`

Production:

- Generate a new hash with `npm run admin:hash -- "NewStrongPassword"`
- Replace `ADMIN_PASSWORD_HASH` in Netlify environment variables
- Redeploy

This limitation is intentional. Runtime password mutation in a static deployment is not durable without an external datastore.

## Deploy to Netlify

1. Push the repository to GitHub.
2. Create a new Netlify site from the repo.
3. Set these environment variables in Netlify:

```text
ADMIN_PASSWORD_HASH=your-generated-hash
ADMIN_SESSION_SECRET=your-long-random-secret
NEXT_PUBLIC_SHOW_ADMIN_TRIGGER=false
```

4. Build command:

```text
npm run build
```

5. Publish directory:

```text
.next
```

`netlify.toml` is already included and points Netlify to the local `netlify/functions` directory.

## Files worth knowing

- `data/profile.ts`: main content file
- `components/sections/*`: public sections
- `components/admin/*`: owner-only editing UI
- `netlify/functions/*`: authentication and local persistence handlers
- `styles/globals.css`: theme tokens and shared visual utilities
- `public/diwakar-cv.pdf`: placeholder CV file to replace before publishing

## Dummy vs production-ready

Production-ready in this starter:

- Responsive one-page site
- SEO metadata and structured data
- Netlify form markup
- Session-based admin authentication
- Hidden admin trigger pattern
- Local development editing and password rotation

Placeholder or upgrade-needed pieces:

- `public/diwakar-cv.pdf` is a placeholder
- `contact.scholarUrl` is a placeholder Google Scholar URL
- Publication DOI URLs use placeholders where exact links were not provided
- Production live editing requires persistent storage or a CMS

## Notes

- Avoid storing passwords in frontend code or browser storage
- The current implementation keeps secrets on the server side and uses an `HttpOnly` session cookie
- Client-side preview is convenient, but true production persistence should move to a real backend or identity-backed CMS