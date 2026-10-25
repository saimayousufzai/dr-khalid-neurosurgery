# Dr. Khalid Khan Zadran — Luxury Neurosurgery Portfolio

A premium, fully responsive React + Vite website for a consultant brain and spine surgeon in Kabul, Afghanistan.

## Included

- **Complete React source code** (`src/App.jsx`, `src/translations.js`, `src/styles.css`)
- **Three fully translated interfaces:** English (`en`), Dari (`fa`), and Pashto (`ps`)
- Automatic right-to-left (RTL) layout for Dari and Pashto
- **Persistent Light / Dark mode** (saved in the browser)
- **Local animated hero video**: `public/video/neural-atmosphere.mp4` (a custom, abstract neural-network animation, not actual surgical footage)
- All **five supplied doctor / surgical images**, optimized as `.webp` in `public/images/`
- Animated sections, luxury typography, mobile menu, specialty cards, professional history, credentials, clickable gallery / lightbox
- Call, Google Maps search, WhatsApp and WhatsApp appointment-request form
- Reduced-motion preference support, semantic headings, accessible navigation and video pause control

## Quick start (VS Code)

1. Install **Node.js 20.19+ or 22.12+** from https://nodejs.org/ if needed.
2. Extract this ZIP. Open the **dr-khalid-neurosurgery-react** folder in VS Code.
3. Open **Terminal → New Terminal**.
4. Run:

```bash
npm install
npm run dev
```

5. Open the localhost address shown in Terminal (usually `http://localhost:5173`).

### Make the production build

```bash
npm run build
npm run preview
```

`dist/` is the final static website. Push the **source code** to GitHub (not `node_modules` or `dist`); `.gitignore` is included.

### Publish

- **Vercel:** Import GitHub repository → framework Vite → Build command `npm run build` → Output directory `dist`.
- **Netlify:** Build command `npm run build`; publish directory `dist`.
- **GitHub Pages:** This project is configured with Vite `base: './'` for relative asset paths. A GitHub Actions Pages deployment is recommended.

## Customize

| What you want to change | Location |
|---|---|
| Text & translations | `src/translations.js` |
| Theme colors / layouts | `src/styles.css` (top CSS variables) |
| Images | `public/images/` + `docPhotos` array in `src/App.jsx` |
| Hero background video | `public/video/neural-atmosphere.mp4` |
| Contact number | Search for `93787654751` and `+93 78 765 4751` in `src/App.jsx` |
| Clinic map link | `googleMaps` constant in `src/App.jsx` |
| Site title & SEO | `index.html` |

## Important

**Clinical credentials and affiliations:** All biographical data was supplied by the project requester. Please confirm that the doctor, clinic, degrees, current memberships and phone number are accurate before public launch. This code does not independently verify professional credentials or claim treatment outcomes.

**Appointments:** This is a frontend-only website. The appointment form **opens a prefilled WhatsApp message** — it does not submit to a backend or store personal data on a server. The user must press Send inside WhatsApp. No patient medical record uploads are implemented.

**Photos:** The five original photos were supplied by the requester. Obtain the appropriate rights and any relevant patient/staff permissions before using them on a public clinical website, especially operating-room photos.

**Video:** The Hero includes a lightweight abstract animation generated specifically for this design. It is not real patient footage. If you choose to replace it with a third-party clip later, review that video's license.

**Connectivity:** Local images and video work offline once the React dependencies are installed. Google Fonts are requested online with system fallbacks. WhatsApp/Maps links require internet access.

**Medical safety:** The website includes an emergency-care disclaimer. The form should not be used to share sensitive clinical records or request emergency support.
