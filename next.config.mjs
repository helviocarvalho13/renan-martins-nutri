/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
  allowedDevOrigins: ["*.replit.dev", "*.spock.replit.dev", "*.repl.co", "127.0.0.1"],
  devIndicators: false,
};

export default nextConfig;
