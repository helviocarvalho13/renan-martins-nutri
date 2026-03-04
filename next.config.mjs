/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
  allowedDevOrigins: ["*.replit.dev", "*.spock.replit.dev", "*.repl.co"],
  devIndicators: false,
};

export default nextConfig;
