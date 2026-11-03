import { defineCloudflareConfig } from '@opennextjs/cloudflare';

// OpenNext Cloudflare edge adapter configuration for D-AminGrow
// Optimised for edge-runtime caching and sub-50ms static delivery across Nigeria & West Africa
export default defineCloudflareConfig({
  enableCacheInterception: true,
});
