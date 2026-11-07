import fs from 'node:fs';
import path from 'node:path';

/**
 * scripts/prepare-cloudflare-assets.mjs
 *
 * Essential Post-Build Optimization for Cloudflare Workers Free Tier:
 * 1. Copies .open-next/cache to .open-next/assets/cdn-cgi/_next_cache so that
 *    OpenNext's staticAssetsIncrementalCache and cache interception can serve
 *    prerendered RSC / cache files directly from the edge KV/Assets without invoking NextServer.
 * 2. Copies all prerendered HTML and RSC files from .next/server/app into .open-next/assets
 *    so Cloudflare's Workers Static Assets CDN serves every storefront page directly
 *    at the edge with 0 ms CPU time and 0 Worker requests billed (free & unlimited traffic).
 */

const rootDir = process.cwd();
const openNextAssetsDir = path.join(rootDir, '.open-next', 'assets');
const openNextCacheDir = path.join(rootDir, '.open-next', 'cache');
const nextServerAppDir = path.join(rootDir, '.next', 'server', 'app');

if (!fs.existsSync(openNextAssetsDir)) {
  console.error('Error: .open-next/assets does not exist. Run opennextjs-cloudflare build first.');
  process.exit(1);
}

// 1. Copy incremental cache to assets/cdn-cgi/_next_cache
if (fs.existsSync(openNextCacheDir)) {
  const targetCacheDir = path.join(openNextAssetsDir, 'cdn-cgi', '_next_cache');
  fs.mkdirSync(targetCacheDir, { recursive: true });
  fs.cpSync(openNextCacheDir, targetCacheDir, { recursive: true });
  console.log('✅ Successfully copied .open-next/cache to .open-next/assets/cdn-cgi/_next_cache');
} else {
  console.warn('⚠️ Warning: .open-next/cache not found.');
}

// 2. Helper to recursively find and copy prerendered files from .next/server/app
function walkAndCopy(dir, baseDir) {
  if (!fs.existsSync(dir)) return 0;
  let count = 0;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      count += walkAndCopy(fullPath, baseDir);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name);
      if (['.html', '.rsc', '.body'].includes(ext)) {
        // Calculate relative path from .next/server/app
        const relPath = path.relative(baseDir, fullPath);
        
        // Strip route groups like "(storefront)/" from the path
        const cleanRelPath = relPath.replace(/\([^)]+\)\//g, '');
        
        const targetPath = path.join(openNextAssetsDir, cleanRelPath);
        fs.mkdirSync(path.dirname(targetPath), { recursive: true });
        fs.copyFileSync(fullPath, targetPath);
        count++;

        // If it's an HTML file (e.g. day-old-chicks.html) and not index.html,
        // also write day-old-chicks/index.html to guarantee both /path and /path/ match
        if (ext === '.html' && !entry.name.endsWith('index.html')) {
          const folderIndexHtml = path.join(
            openNextAssetsDir,
            cleanRelPath.replace(/\.html$/, ''),
            'index.html'
          );
          fs.mkdirSync(path.dirname(folderIndexHtml), { recursive: true });
          fs.copyFileSync(fullPath, folderIndexHtml);
          count++;
        }
      }
    }
  }
  return count;
}

if (fs.existsSync(nextServerAppDir)) {
  const copiedCount = walkAndCopy(nextServerAppDir, nextServerAppDir);
  console.log(`✅ Successfully mirrored ${copiedCount} prerendered HTML/RSC files into .open-next/assets`);
} else {
  console.warn('⚠️ Warning: .next/server/app not found.');
}

// 3. Create or ensure _headers in .open-next/assets
const headersContent = `
# Long-term immutable caching for static assets
/_next/static/*
  Cache-Control: public, max-age=31536000, immutable

# Caching for product images and media
/products/*
  Cache-Control: public, max-age=604800, stale-while-revalidate=86400
/images/*
  Cache-Control: public, max-age=604800, stale-while-revalidate=86400
/Brand%20identity/*
  Cache-Control: public, max-age=604800, stale-while-revalidate=86400

# Edge HTML cache headers
/*.html
  Cache-Control: public, max-age=3600, stale-while-revalidate=86400
  X-Content-Type-Options: nosniff
  X-Frame-Options: SAMEORIGIN
  Referrer-Policy: strict-origin-when-cross-origin
`.trim();

fs.writeFileSync(path.join(openNextAssetsDir, '_headers'), headersContent + '\n', 'utf8');
console.log('✅ Generated .open-next/assets/_headers for Cloudflare Edge CDN caching');
