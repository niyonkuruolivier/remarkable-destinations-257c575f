## Objective
Reduce the vertical empty space in the hero section on every page except the home page by modifying the shared `PageHero` component.

## Current state
- `src/components/site/PageHero.tsx` is used by About, Destinations, Experiences, Gallery, Conservation, Blog, and Testimonials.
- It currently renders a hero container of `h-[78svh] min-h-[560px]` with content bottom-aligned (`justify-end`).
- The home page (`src/routes/index.tsx`) has its own `Hero` component and will not be touched.

## Changes
1. **Tighten the hero container** in `PageHero.tsx`:
   - Reduce from `h-[78svh] min-h-[560px]` to a shorter height (e.g., `h-[58svh] min-h-[420px]` on mobile, scaling up slightly on larger screens).
   - Reduce bottom padding (`pb-24 md:pb-32`) to bring content closer to the page body.
   - Keep the wave SVG and gradient overlay intact so the visual transition to the lavender page background remains smooth.

2. **Preserve home page hero** — no edits to `src/routes/index.tsx`.

3. **Verify** — run a build/typecheck to ensure no regressions.

## Outcome
All non-home page heroes will feel more compact, with less empty space above the headline, while the home page keeps its full cinematic height.