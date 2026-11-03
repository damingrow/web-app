import { defineCloudflareConfig } from '@opennextjs/cloudflare';

// OpenNext Cloudflare edge adapter configuration for D-AminGrow
// Optimised for edge-runtime caching and sub-50ms static delivery across Nigeria & West Africa
const config = defineCloudflareConfig({
  enableCacheInterception: true,
});

// Explicitly route OpenNext's internal Next.js build to 'npm run build:next'
// This guarantees that Cloudflare Git Builds (which run 'npm run build' by default)
// cleanly generate the .open-next bundle without needing manual dashboard changes.
config.buildCommand = 'npm run build:next';

export default config;
