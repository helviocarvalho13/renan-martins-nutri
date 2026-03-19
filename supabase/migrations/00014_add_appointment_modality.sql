DO $$ BEGIN
  CREATE TYPE appointment_modality AS ENUM ('ONLINE', 'PRESENCIAL');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

ALTER TABLE appointments
  ADD COLUMN IF NOT EXISTS modality appointment_modality NOT NULL DEFAULT 'PRESENCIAL';
