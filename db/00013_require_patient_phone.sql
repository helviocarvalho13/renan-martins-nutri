ALTER TABLE profiles ADD CONSTRAINT chk_patient_phone
  CHECK (role != 'PATIENT' OR phone IS NOT NULL AND phone != '');
