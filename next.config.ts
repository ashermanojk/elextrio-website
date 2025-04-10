import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false, // Disable strict mode to be more lenient with hydration mismatches
  // Add this to suppress specific hydration warnings about fdprocessedid attributes
  compiler: {
    // This removes the fdprocessedid attributes that are causing the hydration mismatch
    reactRemoveProperties: { properties: ['^fdprocessedid$'] },
  },
  images: {
    domains: ['images.unsplash.com', 'enjdrxqdajlktcdgyjdi.supabase.co'],
  },
};

export default nextConfig;
