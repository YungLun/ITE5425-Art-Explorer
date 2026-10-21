# ITE5425 Art Explorer - Starter Shell

This is an intentionally **incomplete**, runnable Next.js **App Router** app. It starts with a navigation bar and placeholder pages. Your assignment is to implement the missing features yourself.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000 and test `/`, `/about`, `/artwork`, `/search`. **Do not create** `app/artwork/[id]/page.jsx` until the dynamic routing milestone.

## You own these TODOs
1. `ArtworkCard`: add artist/image props.
2. `ArtworkBrowser`: search → object IDs → details; add `artworks`, `loading`, `error` state, and triggered search behaviour.
3. `app/artwork/[id]/page.jsx`: create this folder/file yourself; call provided `getArtwork(id)` from a Server Component.
4. `SearchForm`: add RHF minLength and checkbox; send values to `/artwork` as URL parameters.
5. `ArtworkBrowser`: respond to submitted URL search parameters so the search page works.
6. Explain Pages Router equivalent, SSR/CSR and hydration in your reflection.

## API
Search: https://collectionapi.metmuseum.org/public/collection/v1.1/search?q=sunflowers&limit=6
Details: https://collectionapi.metmuseum.org/public/collection/v1/objects/436535
Documentation: https://metmuseum.github.io/

The museum API may occasionally be unavailable; handle failures gracefully. Keep concurrency low (e.g., at most 3 detail requests at once).
