
-- Roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "Users view own roles" ON public.user_roles
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

-- Inquiries: admin-only read/update/delete
DROP POLICY IF EXISTS "Authenticated users can view inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Authenticated users can update inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Authenticated users can delete inquiries" ON public.inquiries;

CREATE POLICY "Admins view inquiries" ON public.inquiries
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update inquiries" ON public.inquiries
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete inquiries" ON public.inquiries
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Packages
DROP POLICY IF EXISTS "Authenticated manage packages" ON public.packages;
CREATE POLICY "Admins manage packages" ON public.packages
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Destinations
DROP POLICY IF EXISTS "Authenticated manage destinations" ON public.destinations;
CREATE POLICY "Admins manage destinations" ON public.destinations
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Gallery
DROP POLICY IF EXISTS "Authenticated manage gallery" ON public.gallery_items;
CREATE POLICY "Admins manage gallery" ON public.gallery_items
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Blog
DROP POLICY IF EXISTS "Authenticated manage blog" ON public.blog_posts;
CREATE POLICY "Admins manage blog" ON public.blog_posts
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Testimonials: admins fully manage; anyone may submit but forced approved=false
DROP POLICY IF EXISTS "Authenticated manage testimonials" ON public.testimonials;
CREATE POLICY "Admins manage testimonials" ON public.testimonials
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Anyone can submit unapproved testimonial" ON public.testimonials
  FOR INSERT TO anon, authenticated
  WITH CHECK (approved = false);
