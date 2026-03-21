CREATE TABLE IF NOT EXISTS chatbot_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  session_token text NOT NULL UNIQUE,
  current_state text NOT NULL DEFAULT 'WELCOME',
  context jsonb NOT NULL DEFAULT '{}',
  messages jsonb[] NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_chatbot_sessions_user ON chatbot_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_chatbot_sessions_token ON chatbot_sessions(session_token);

DROP TRIGGER IF EXISTS chatbot_sessions_updated_at ON chatbot_sessions;

CREATE TRIGGER chatbot_sessions_updated_at
  BEFORE UPDATE ON chatbot_sessions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
