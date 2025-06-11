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
        destination: "/services/knowledge-as-service",
        permanent: true,
      },
      {
        source: "/solutions/talent",
        destination: "/services/talent-as-service",
        permanent: true,
      },
    ];
  },
  /* config options here */
};

export default nextConfig;
