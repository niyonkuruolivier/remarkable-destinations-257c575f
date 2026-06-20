
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;

DROP POLICY IF EXISTS "Anyone can submit an inquiry" ON public.inquiries;
CREATE POLICY "Anyone can submit an inquiry" ON public.inquiries
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    length(trim(name)) > 0
    AND length(trim(email)) BETWEEN 3 AND 255
    AND email LIKE '%_@_%.__%'
    AND (message IS NULL OR length(message) <= 5000)
  );
