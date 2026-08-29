# Safari Dreams Studio

# MASTER ARCHITECTURAL SPECIFICATION: REMARKABLE DESTINATIONS

Build a complete, premium luxury African safari tourism web platform for "Remarkable Destinations" — a bespoke safari company based in Kigali, Rwanda. 

## 1. CORE TECH STACK & ENGINE

- Framework: Next.js 14 (App Router)

- Styling: Tailwind CSS

- Database/Auth: Supabase (PostgreSQL)

- Deployment: Vercel

- Icons: lucide-react

- Typography: Google Fonts — "Cormorant Garamond" (Display Headings) + "Inter" (Body text)

### DESIGN SYSTEM & DESIGN TOKENS

Apply these exact color tokens across the entire application interface:

- `--color-forest`:   #1B3A2D (Deep forest green — primary brand color)

- `--color-gold`:     #C8973A (Safari gold — premium accent color)

- `--color-sand`:     #E8D5B0 (Warm sand — subtle section backgrounds)

- `--color-ivory`:    #FAF7F2 (Ivory white — main page base background)

- `--color-sunset`:   #C4622D (Sunset orange — interactive/CTA highlights)

- `--color-dark`:     #0F1F16 (Near-black for ultra-readable high-contrast text)

- `--color-muted`:    #6B7C6E (Muted green-gray for secondary typography)

### TYPOGRAPHY SCALE RULES

- Display H1:  Cormorant Garamond, 72px / line-height 1.1 / font-weight 300 (italic)

- Heading H2:  Cormorant Garamond, 48px / line-height 1.2 / font-weight 400

- Subheading H3: Inter, 22px / font-weight 600 / letter-spacing -0.01em

- Body Text:   Inter, 16px / line-height 1.7 / font-weight 400

- Caption:     Inter, 13px / color: --color-muted

- Buttons:     Inter, 14px / font-weight 600 / letter-spacing 0.08em / UPPERCASE

---

## 2. RECONCILED DATABASE SCHEMA (SUPABASE SQL)

Generate and integrate the following database tables using Supabase. Enable Row Level Security (RLS) across all tables: allow public `INSERT` permissions on the `inquiries` table, but lock down all other data modifications (`SELECT`, `UPDATE`, `DELETE`) exclusively to authenticated admin dashboard sessions.

```sql

-- Form entry storage for incoming traveler inquiries

create table inquiries (

  id uuid default gen_random_uuid() primary key,

  name text not null,

  email text not null,

  phone text,

  interest text,

  travel_date date,

  travelers integer,

  message text,

  source text,

  status text default 'new', -- 'new' | 'contacted' | 'pending' | 'confirmed' | 'closed'

  created_at timestamp with time zone default now()

);

-- Tour itinerary package properties

create table packages (

  id uuid default gen_random_uuid() primary key,

  name text not null,

  slug text unique not null,

  duration_days integer,

  destinations text[], -- Array of matching destination strings

  activities text[],

  price_from numeric,

  price_currency text default 'USD',

  price_on_request boolean default false,

  image_url text,

  featured boolean default false,

  active boolean default true,

  created_at timestamp with time zone default now()

);

-- Geographic travel destination definitions

create table destinations (

  id uuid default gen_random_uuid() primary key,

  name text not null,

  slug text unique not null,

  country text not null,

  description text,

  image_url text,

  wildlife_highlights text[],

  best_months text[],

  active boolean default true,

  created_at timestamp with time zone default now()

);

-- Media gallery structural management

create table gallery_items (

  id uuid default gen_random_uuid() primary key,

  title text,

  category text not null, -- 'wildlife' | 'landscapes' | 'birding' | 'gorillas' | 'lodges'

  image_url text not null,

  alt_text text,

  sort_order integer default 0,

  active boolean default true,

  created_at timestamp with time zone default now()

);

-- Blog magazine content nodes

create table blog_posts (

  id uuid default gen_random_uuid() primary key,

  title text not null,

  slug text unique not null,

  excerpt text,

  content text, -- Markdown string payload

  category text,

  author_name text default 'Remarkable Destinations Team',

  author_avatar_url text,

  featured_image_url text,

  published boolean default false,

  published_at timestamp with time zone,

  seo_title text,

  seo_description text,

  created_at timestamp with time zone default now()

);

-- Traveler reviews and experience data

create table testimonials (

  id uuid default gen_random_uuid() primary key,

  traveler_name text not null,

  country text,

  country_flag text, -- Emoji flag string

  rating integer default 5,

  quote text not null,

  safari_type text,

  trip_date text,

  approved boolean default false,

  created_at timestamp with time zone default now()

);

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://remarkable-destinations.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/98a160f2-e361-47a6-8164-f0074358ed9f).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
