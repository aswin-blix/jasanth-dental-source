# Deploy through GitHub to Vercel

## 1. Create the GitHub repository

Extract `jasanth-dental-source.zip` into a new folder outside the portfolio repository.
Create an empty GitHub repository, for example `jasanth-dental`.
Upload the **extracted files and folders**, not the ZIP file. `package.json`,
`package-lock.json`, `vercel.json`, `app/`, and `public/` should be at the repository root.
Include `.gitignore`.

Alternatively, from the extracted folder:

```sh
git init
git add .
git commit -m "Add Jasanth Dental Hospital website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/jasanth-dental.git
git push -u origin main
```

Replace `YOUR_USERNAME` and the repository name with your actual GitHub repository.

## 2. Import into Vercel

1. In Vercel, choose **Add New → Project** and import the GitHub repository.
2. Use **Next.js** as the Framework Preset.
3. Root Directory: `./` when the extracted contents are at repository root.
   If you uploaded a containing `jasanth-dental` folder instead, select that folder.
4. Node.js version: **24.x** (the version used for local validation).
5. Install command: `npm ci`.
6. Build command: `npm run build`.
7. Leave the Output Directory at the **Next.js framework default**; do not set it to `public`.
8. No environment variables are required for this demo.
9. Click **Deploy**.

The included `vercel.json` sets the framework and install/build commands.
The existing Next.js configuration uses `output: "export"` and `trailingSlash: true`.
Do not replace it or run the removed legacy `next export` command.
Vercel's Next.js integration handles the static-export project.

## 3. Check the deployed site

- Open the homepage and `/contact/`.
- Open a care page directly, for example `/care/checkups/`, and refresh it.
- Check mobile navigation and images.
- Try **Book an appointment → Use sample details → Preview appointment request**.
- Confirm the result is explicitly marked as a demo, with no real appointment reserved.

Future pushes to the connected production branch trigger Vercel deployments.

## Included and excluded

Included: complete application source, generated images and original hospital photo,
dependency lockfile, unit tests, export checks, configuration, and documentation.

Excluded: `node_modules`, `.next`, `out`, local browser QA artifacts, Git history,
environment files, and the original portfolio project.

## Current demo boundaries

The booking form is browser-only: no appointment request is sent and no backend,
email provider, WhatsApp integration, or patient database is configured.
Contact information and actual clinic service availability still need confirmation.
Search indexing remains disabled in `app/layout.jsx` until the site is approved for launch.

Local validation is not proof of a successful Vercel deployment; inspect the Vercel
build result and test the deployed URL after importing.

Official references:

- [Next.js on Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs)
- [Vercel build configuration](https://vercel.com/docs/builds/configure-a-build)
- [Supported Node.js versions](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions)
