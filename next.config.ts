import type { NextConfig } from "next";

// Set by the GitHub Pages workflow to "/<repo-name>" for project-page hosting
// (https://<user>.github.io/<repo-name>/). Leave unset for local dev / a custom domain.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: basePath || undefined,
  assetPrefix: basePath ? `${basePath}/` : undefined,
};

export default nextConfig;
