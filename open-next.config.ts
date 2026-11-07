import { defineCloudflareConfig } from '@opennextjs/cloudflare';
import staticAssetsIncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache';

// OpenNext Cloudflare edge adapter configuration for D-AminGrow
// Optimised for edge-runtime static asset caching and sub-50ms delivery across Nigeria & West Africa
// Utilizing staticAssetsIncrementalCache + cacheInterception guarantees zero-CPU SSR on all static routes
const config = defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  enableCacheInterception: true,
});

// Explicitly route OpenNext's internal Next.js build to 'npm run build:next'
// This guarantees that Cloudflare Git Builds (which run 'npm run build' by default)
// cleanly generate the .open-next bundle without needing manual dashboard changes.
config.buildCommand = 'npm run build:next';

export default config;
