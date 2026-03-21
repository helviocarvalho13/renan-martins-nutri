CREATE TABLE IF NOT EXISTS schedule_config (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  day_of_week integer NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
  start_time time NOT NULL,
  end_time time NOT NULL,
  slot_duration_min integer NOT NULL DEFAULT 50,
  break_duration_min integer NOT NULL DEFAULT 10,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT unique_admin_day UNIQUE (admin_id, day_of_week)
);

DROP TRIGGER IF EXISTS schedule_config_updated_at ON schedule_config;

CREATE TRIGGER schedule_config_updated_at
  BEFORE UPDATE ON schedule_config
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
