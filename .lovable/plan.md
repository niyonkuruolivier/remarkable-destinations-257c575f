
# Admin Dashboard Plan

A single source of truth: the public site (including the Home Page) reads from the same Supabase tables the admin edits. No duplicated content, no hardcoded copy, no image URLs — only uploaded files stored in Supabase Storage.

## 1. Auth & Access

- Reuse existing `user_roles` + `has_role('admin')` function.
- Add `/auth` page (email/password + Google) if not present, and an `_authenticated/` layout gated by the integration-managed guard.
- Add `_authenticated/admin/` subtree with a `beforeLoad` role check calling a `requireAdmin` server fn (uses `has_role`). Non-admins → `/` with toast.
- First admin: bootstrap server fn that grants `admin` role to the first signed-in user if no admins exist.

## 2. Storage

- Create a public `media` bucket via storage tool.
- RLS on `storage.objects`: public SELECT on `media`; INSERT/UPDATE/DELETE restricted to admins via `has_role`.
- All image fields in DB store the public URL of an uploaded object (existing `image_url` columns stay — the admin uploader replaces external URLs with uploaded-file URLs).

## 3. New table: `site_settings` (home page + global config)

Single-row key/value JSON store so the Home Page is fully editable without new schemas per section.

```
site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz
)
```

Grants: `SELECT` to `anon` + `authenticated`; write to admins only via RLS + `has_role`.

Seed keys (jsonb payloads):
- `home.hero` — eyebrow, title, subtitle, cta label/link, background image URL
- `home.sections` — ordered array: `[{ id, type: 'featured_packages'|'destinations'|'testimonials'|'gallery'|'stats'|'cta'|'faq'|'richtext', enabled, title, subtitle, itemIds?, order }]`
- `home.stats`, `home.faq`, `home.services`
- `site.contact` — phone, email, address, socials
- `site.branding` — logo, tagline

Public pages read via a `getSiteSetting(key)` server fn (publishable client, cached).

## 4. Admin routes (`src/routes/_authenticated/admin/`)

```
admin/route.tsx          → role gate + AdminLayout (sidebar)
admin/index.tsx          → overview (counts, recent inquiries)
admin/home.tsx           → Home Page editor (hero, sections drag-order, featured pickers, toggle enable)
admin/destinations.tsx   → list + create/edit/delete + image upload
admin/packages.tsx       → same + featured toggle
admin/testimonials.tsx   → same + approve toggle
admin/gallery.tsx        → grid + upload + sort_order drag
admin/blog.tsx           → list + rich editor (existing content field)
admin/inquiries.tsx      → read + status update
admin/media.tsx          → browse/replace/delete uploaded files
admin/settings.tsx       → contact, branding, socials
```

Sidebar uses shadcn `Sidebar`. Each list page: shadcn `Table` + dialog forms.

## 5. Media uploader component

`<ImageUploader value onChange />`:
- Accepts file from `<input type="file" accept="image/*">` only (no URL field anywhere).
- Uploads to `media` bucket via `supabase.storage.from('media').upload()` with admin session.
- Returns public URL, saved into the record's `image_url`.
- "Replace" and "Remove" actions delete the old object.

## 6. Server functions

All under `src/lib/admin.functions.ts` with `requireSupabaseAuth` + inline admin check via `context.supabase.rpc('has_role', { _user_id, _role: 'admin' })`.

- `listX / upsertX / deleteX` for destinations, packages, testimonials, gallery_items, blog_posts, inquiries
- `getSiteSetting(key)` — public, publishable client
- `updateSiteSetting(key, value)` — admin only
- `reorderSections(ids)` — updates `home.sections` order
- `bootstrapFirstAdmin()` — admin-role seed if none exist

## 7. Home Page rewrite

Refactor `src/routes/index.tsx` to a loader that fetches:
- `home.hero`, `home.sections`, and each referenced list (packages/destinations/testimonials/gallery) by IDs from settings
- Renders sections in stored order, skips `enabled: false`
- No hardcoded titles, images, or CTA text — all come from `site_settings` + related tables

Header/Footer read `site.branding` + `site.contact` from same settings.

## 8. Live sync

- After every admin mutation, invalidate the corresponding TanStack Query keys.
- Public routes use `queryClient.ensureQueryData` with short `staleTime` (e.g. 30s) so changes appear on next navigation/reload immediately.
- Optional: Supabase realtime subscription on `site_settings` + core tables to auto-refresh open public tabs.

## 9. Migrations (single migration)

1. `create table site_settings` + grants + RLS (public read, admin write via `has_role`).
2. Insert seed rows for `home.hero`, `home.sections`, `home.stats`, `home.faq`, `site.contact`, `site.branding` using current hardcoded values.
3. Storage bucket `media` + object policies (public read, admin write) — created via storage tool, not SQL.

## 10. Delivery order

1. Migration + storage bucket + first-admin bootstrap
2. Auth pages + admin layout + role guard
3. Media uploader + Media page
4. Site settings editor (Home hero + sections)
5. CRUD pages (destinations, packages, testimonials, gallery, blog, inquiries)
6. Refactor public Home Page + Header/Footer to read from `site_settings`
7. Wire live-sync invalidations

## Confirmations needed

- OK to add the `site_settings` table (the only new table; needed to store editable home-page copy/section order without hardcoded strings)?
- Preferred admin sign-in: email+password only, or also Google?
- OK to auto-grant admin to the first user who signs in (safest bootstrap on Lovable Cloud since we can't run SQL as you)?
