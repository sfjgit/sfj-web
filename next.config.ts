import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/about-us",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/solutions/knowledge",
        destination: "/services/corporate-it-training-programs",
        permanent: true,
      },
      {
        source: "/solutions/talent",
        destination: "/services/it-staffing-company",
        permanent: true,
      },
      {
        source: "/career",
        destination: "/careers",
        permanent: true,
      },
    ];
  },
  /* config options here */
};

export default nextConfig;
