ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedule_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocked_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE chatbot_sessions ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- Helper: check if current user is ADMIN
-- ============================================================
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'ADMIN'
  );
$$;

-- ============================================================
-- PROFILES
-- ============================================================
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Admin can view all profiles"
  ON profiles FOR SELECT
  USING (is_admin());

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Admin can update any profile"
  ON profiles FOR UPDATE
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admin can insert profiles"
  ON profiles FOR INSERT
  WITH CHECK (is_admin() OR auth.uid() = id);

-- ============================================================
-- APPOINTMENTS
-- ============================================================
CREATE POLICY "Patients can view own appointments"
  ON appointments FOR SELECT
  USING (auth.uid() = patient_id);

CREATE POLICY "Admin can view all appointments"
  ON appointments FOR SELECT
  USING (is_admin());

CREATE POLICY "Authenticated users can create appointments"
  ON appointments FOR INSERT
  WITH CHECK (auth.uid() = patient_id);

CREATE POLICY "Admin can update any appointment"
  ON appointments FOR UPDATE
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Patients can cancel own appointments"
  ON appointments FOR UPDATE
  USING (auth.uid() = patient_id AND status != 'CANCELLED')
  WITH CHECK (auth.uid() = patient_id AND status = 'CANCELLED');

CREATE POLICY "Admin can delete appointments"
  ON appointments FOR DELETE
  USING (is_admin());

-- ============================================================
-- SCHEDULE_CONFIG
-- ============================================================
CREATE POLICY "Authenticated users can view schedule config"
  ON schedule_config FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admin can view schedule config"
  ON schedule_config FOR SELECT
  USING (is_admin());

CREATE POLICY "Admin can insert schedule config"
  ON schedule_config FOR INSERT
  WITH CHECK (is_admin());

CREATE POLICY "Admin can update schedule config"
  ON schedule_config FOR UPDATE
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admin can delete schedule config"
  ON schedule_config FOR DELETE
  USING (is_admin());

-- ============================================================
-- BLOCKED_SLOTS
-- ============================================================
CREATE POLICY "Authenticated users can view blocked slots"
  ON blocked_slots FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admin can view blocked slots"
  ON blocked_slots FOR SELECT
  USING (is_admin());

CREATE POLICY "Admin can insert blocked slots"
  ON blocked_slots FOR INSERT
  WITH CHECK (is_admin());

CREATE POLICY "Admin can update blocked slots"
  ON blocked_slots FOR UPDATE
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admin can delete blocked slots"
  ON blocked_slots FOR DELETE
  USING (is_admin());

-- ============================================================
-- TESTIMONIALS
-- ============================================================
CREATE POLICY "Approved testimonials are public"
  ON testimonials FOR SELECT
  USING (is_approved = true);

CREATE POLICY "Admin can view all testimonials"
  ON testimonials FOR SELECT
  USING (is_admin());

CREATE POLICY "Authenticated users can create testimonials"
  ON testimonials FOR INSERT
  WITH CHECK (auth.uid() = patient_id);

CREATE POLICY "Admin can insert testimonials"
  ON testimonials FOR INSERT
  WITH CHECK (is_admin());

CREATE POLICY "Admin can update testimonials"
  ON testimonials FOR UPDATE
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admin can delete testimonials"
  ON testimonials FOR DELETE
  USING (is_admin());

-- ============================================================
-- SITE_CONTENT
-- ============================================================
CREATE POLICY "Active site content is public"
  ON site_content FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admin can view all site content"
  ON site_content FOR SELECT
  USING (is_admin());

CREATE POLICY "Admin can insert site content"
  ON site_content FOR INSERT
  WITH CHECK (is_admin());

CREATE POLICY "Admin can update site content"
  ON site_content FOR UPDATE
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admin can delete site content"
  ON site_content FOR DELETE
  USING (is_admin());

-- ============================================================
-- NOTIFICATIONS
-- ============================================================
CREATE POLICY "Users can view own notifications"
  ON notifications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admin can view all notifications"
  ON notifications FOR SELECT
  USING (is_admin());

CREATE POLICY "Admin can create notifications"
  ON notifications FOR INSERT
  WITH CHECK (is_admin());

CREATE POLICY "Users can update own notifications"
  ON notifications FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admin can update notifications"
  ON notifications FOR UPDATE
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admin can delete notifications"
  ON notifications FOR DELETE
  USING (is_admin());

-- ============================================================
-- CHATBOT_SESSIONS
-- ============================================================
CREATE POLICY "Users can view own chatbot sessions"
  ON chatbot_sessions FOR SELECT
  USING (auth.uid() IS NOT NULL AND auth.uid() = user_id);

CREATE POLICY "Anyone can create chatbot sessions"
  ON chatbot_sessions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update own chatbot sessions"
  ON chatbot_sessions FOR UPDATE
  USING (auth.uid() IS NOT NULL AND auth.uid() = user_id)
  WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = user_id);

CREATE POLICY "Admin can view all chatbot sessions"
  ON chatbot_sessions FOR SELECT
  USING (is_admin());

CREATE POLICY "Admin can update chatbot sessions"
  ON chatbot_sessions FOR UPDATE
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admin can delete chatbot sessions"
  ON chatbot_sessions FOR DELETE
  USING (is_admin());
