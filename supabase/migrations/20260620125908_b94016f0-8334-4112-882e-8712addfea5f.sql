
-- INQUIRIES
CREATE TABLE public.inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  interest text,
  travel_date date,
  travelers integer,
  message text,
  source text,
  status text DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.inquiries TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.inquiries TO authenticated;
GRANT ALL ON public.inquiries TO service_role;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit an inquiry" ON public.inquiries FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can view inquiries" ON public.inquiries FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can update inquiries" ON public.inquiries FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete inquiries" ON public.inquiries FOR DELETE TO authenticated USING (true);

-- PACKAGES
CREATE TABLE public.packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  duration_days integer,
  destinations text[],
  activities text[],
  price_from numeric,
  price_currency text DEFAULT 'USD',
  price_on_request boolean DEFAULT false,
  image_url text,
  featured boolean DEFAULT false,
  active boolean DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.packages TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.packages TO authenticated;
GRANT ALL ON public.packages TO service_role;
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Active packages are public" ON public.packages FOR SELECT TO anon, authenticated USING (active = true);
CREATE POLICY "Authenticated manage packages" ON public.packages FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- DESTINATIONS
CREATE TABLE public.destinations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  country text NOT NULL,
  description text,
  image_url text,
  wildlife_highlights text[],
  best_months text[],
  active boolean DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.destinations TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.destinations TO authenticated;
GRANT ALL ON public.destinations TO service_role;
ALTER TABLE public.destinations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Active destinations are public" ON public.destinations FOR SELECT TO anon, authenticated USING (active = true);
CREATE POLICY "Authenticated manage destinations" ON public.destinations FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- GALLERY
CREATE TABLE public.gallery_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text,
  category text NOT NULL,
  image_url text NOT NULL,
  alt_text text,
  sort_order integer DEFAULT 0,
  active boolean DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.gallery_items TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.gallery_items TO authenticated;
GRANT ALL ON public.gallery_items TO service_role;
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Active gallery items are public" ON public.gallery_items FOR SELECT TO anon, authenticated USING (active = true);
CREATE POLICY "Authenticated manage gallery" ON public.gallery_items FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- BLOG
CREATE TABLE public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text,
  content text,
  category text,
  author_name text DEFAULT 'Remarkable Destinations Team',
  author_avatar_url text,
  featured_image_url text,
  published boolean DEFAULT false,
  published_at timestamptz,
  seo_title text,
  seo_description text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.blog_posts TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.blog_posts TO authenticated;
GRANT ALL ON public.blog_posts TO service_role;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published posts are public" ON public.blog_posts FOR SELECT TO anon, authenticated USING (published = true);
CREATE POLICY "Authenticated manage blog" ON public.blog_posts FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- TESTIMONIALS
CREATE TABLE public.testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  traveler_name text NOT NULL,
  country text,
  country_flag text,
  rating integer DEFAULT 5,
  quote text NOT NULL,
  safari_type text,
  trip_date text,
  approved boolean DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.testimonials TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.testimonials TO authenticated;
GRANT ALL ON public.testimonials TO service_role;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Approved testimonials are public" ON public.testimonials FOR SELECT TO anon, authenticated USING (approved = true);
CREATE POLICY "Authenticated manage testimonials" ON public.testimonials FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Seed testimonials and destinations
INSERT INTO public.testimonials (traveler_name, country, country_flag, rating, quote, safari_type, trip_date, approved) VALUES
('Eleanor & James Whitfield', 'United Kingdom', '🇬🇧', 5, 'An extraordinary journey crafted with surgical precision. From the moment we landed in Kigali to our last sundowner on the Mara, every detail was anticipated. We felt held by the land — and by Remarkable Destinations.', 'Gorilla Trek & Migration', 'September 2025', true),
('Hiroshi Tanaka', 'Japan', '🇯🇵', 5, 'The silence of the Serengeti at dawn. The weight of a silverback''s gaze in Volcanoes National Park. Some experiences cannot be photographed — they must be lived. This was such a journey.', 'Private Photographic Safari', 'July 2025', true),
('The Hartley Family', 'Australia', '🇦🇺', 5, 'Three generations, one safari. Our guide Patrick made the children fall in love with the bush and the elders feel ten years younger. Faultless logistics, soulful storytelling.', 'Multi-Generational Safari', 'August 2025', true);

INSERT INTO public.destinations (name, slug, country, description, wildlife_highlights, best_months, active) VALUES
('Volcanoes National Park', 'volcanoes-rwanda', 'Rwanda', 'Misty volcanic slopes that cradle the world''s last mountain gorillas, trekked at altitude through bamboo cathedrals.', ARRAY['Mountain gorillas','Golden monkeys','Forest elephants'], ARRAY['June','July','August','September'], true),
('Masai Mara', 'masai-mara-kenya', 'Kenya', 'The theatre of the Great Migration — golden plains where lion prides and a million wildebeest stage Africa''s oldest drama.', ARRAY['The Big Five','Cheetah','Wildebeest migration'], ARRAY['July','August','September','October'], true),
('Serengeti', 'serengeti-tanzania', 'Tanzania', 'Endless horizons and acacia silhouettes — the cradle of the safari, still as wild and operatic as ever.', ARRAY['Big cats','Elephant herds','Hot-air balloon vistas'], ARRAY['January','February','June','July','August'], true);
