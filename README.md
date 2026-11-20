# Lalit Deshmane · Portfolio

A single-page React and TypeScript portfolio. Vite builds a static site with no backend or environment variables.

## Run locally

Use Node.js 22.12 or newer and npm. From the project directory, run:

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite.

## Review and deploy

```sh
npm run build
npm run preview
```

The build type-checks the TypeScript and writes the static site to `dist/`. Preview serves that exact build for local review. To deploy, upload the contents of `dist/` to a static host, or connect a repository and set the build command to `npm run build` and the output directory to `dist`. The site uses relative asset paths and hash-based section links, so it can also run from a repository subdirectory with no route rewrites.

## Update the content

- Edit `src/projects.ts` for project summaries, case studies, and links. Array order controls the display order. An optional `links` array of `{ label, url }` entries adds repository, documentation, or report links to a case study.
- Edit `src/profile.ts` for coursework, skills, achievements, and contact links.
- Replace `public/resume.pdf` to update both download buttons. It currently contains the supplied general CV. Review the PDF contact details before publishing.
- Edit `index.html` for SEO and sharing metadata.

