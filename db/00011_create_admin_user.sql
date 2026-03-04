-- V011: Create admin user (Renan Martins)
-- Email: admin@admin.com | Password: 123456
-- Run this AFTER all previous migrations
-- This script uses Supabase's auth.users table to create the admin user

-- Note: This script must be run via Supabase Dashboard SQL Editor
-- The password is hashed using Supabase's crypt function

-- First, create the auth user if not exists
DO $$
DECLARE
  new_user_id uuid;
BEGIN
  -- Check if user already exists
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'admin@admin.com') THEN
    -- Insert into auth.users
    INSERT INTO auth.users (
      id,
      instance_id,
      email,
      encrypted_password,
      email_confirmed_at,
      raw_user_meta_data,
      raw_app_meta_data,
      aud,
      role,
      created_at,
      updated_at,
      confirmation_token,
      recovery_token
    ) VALUES (
      gen_random_uuid(),
      '00000000-0000-0000-0000-000000000000',
      'admin@admin.com',
      crypt('123456', gen_salt('bf')),
      NOW(),
      jsonb_build_object('role', 'ADMIN', 'full_name', 'Renan Martins'),
      jsonb_build_object('provider', 'email', 'providers', ARRAY['email']),
      'authenticated',
      'authenticated',
      NOW(),
      NOW(),
      '',
      ''
    )
    RETURNING id INTO new_user_id;

    -- Insert into auth.identities
    INSERT INTO auth.identities (
      id,
      user_id,
      provider_id,
      provider,
      identity_data,
      last_sign_in_at,
      created_at,
      updated_at
    ) VALUES (
      gen_random_uuid(),
      new_user_id,
      new_user_id::text,
      'email',
      jsonb_build_object('sub', new_user_id::text, 'email', 'admin@admin.com'),
      NOW(),
      NOW(),
      NOW()
    );

    -- The profiles trigger (handle_new_user) should auto-create the profile
    -- But let's ensure the role is ADMIN
    UPDATE profiles SET role = 'ADMIN' WHERE id = new_user_id;

    RAISE NOTICE 'Admin user created: admin@admin.com / 123456';
  ELSE
    -- User exists, ensure role is ADMIN
    UPDATE profiles SET role = 'ADMIN'
    WHERE id = (SELECT id FROM auth.users WHERE email = 'admin@admin.com');

    RAISE NOTICE 'Admin user already exists, role updated to ADMIN';
  END IF;
END $$;
