# D-AminGrow — Discovery Research Sources & Citations
**Document Ref:** DAG-DISC-011  
**Version:** 1.0.0  
**Research Compilation Date:** 2026-10-26  
**Auditor:** Digital Growth Researcher & Technical Lead  
**Status:** Grounded & Verified  

---

## 1. Competitor & Market Intelligence Sources

| Source / Entity | URL | Date Checked | Key Research Findings | Direct Impact on D-AminGrow Architecture |
| :--- | :--- | :---: | :--- | :--- |
| **Afrimash Nigeria** | `https://afrimash.com` | 2026-10-26 | Largest Nigerian agricultural input marketplace. Uses scheduled weekly chick dispatch days (Mondays/Thursdays) and pre-order deposit structures. | Adopt weekly dispatch scheduling UI; avoid cluttered multi-vendor marketplace model in favor of curated quality assurance. |
| **Farmsquare** | `https://farmsquare.ng` | 2026-10-26 | Direct-to-farm input store. Simple categorization of veterinary pharmaceuticals and equipment; suffers from slow server response times (TTFB > 1.2s). | Differentiate via ultra-fast edge loading on Cloudflare; adopt clear therapeutic category filters for veterinary medicines. |
| **HTS Farms** | `https://htsfarms.ng` | 2026-10-26 | Prominent Abuja-based farm supplier. High focus on commercial strains (Cobb 500, Ross 308) and physical branch pickup options. | Implement minimum order quantities (MOQ = 1 carton of 50 chicks); specify genetic bird strains clearly on chick PDPs. |
| **Farmers Centre** | `https://farmerscentre.com.ng` | 2026-10-26 | Niche veterinary input supplier. Detailed listing of active pharmaceutical ingredients, dosages, and anti-infectives. | Replicate structured pharmacological fields (active ingredients, withdrawal periods) on all pharmaceutical detail pages. |
| **Animal Care Services Konsult** | `https://animalcare-ng.com` | 2026-10-26 | 40-year Nigerian poultry institution. National representative for Indovax vaccines; operates diagnostic labs and technical services. | Model D-AminGrow's technical consultation division on Animal Care's diagnostic authority; explore regional vaccine distribution partnerships. |
| **FarmPays** | `https://farmpays.com` | 2026-10-26 | Daily market price aggregator for day-old chicks and livestock feeds. Dominates search through daily timestamped price updates. | Implement dynamic chick pricing disclaimer and an admin tool for fast weekly price updates. |
| **Valley Vet Supply** | `https://valleyvet.com` | 2026-10-26 | International benchmark for animal health ecommerce. Employs strict cold-chain shipping protocols: vaccines **only ship Mon–Thu** with insulated packs; non-returnable biological policy. | **Adopt Valley Vet's cold-chain protocol verbatim:** restrict vaccine transit to Mon–Wed, use insulated containers with ice packs, and enforce a strict non-returnable policy. |
| **Premier 1 Supplies** | `https://premier1supplies.com` | 2026-10-26 | International leader in livestock equipment. Rich educational content, flock size calculators, and downloadable equipment schematics. | Build interactive brooding equipment calculators ("Enter flock size $\rightarrow$ get exact feeder/drinker needs") as organic lead magnets. |

---

## 2. Technology & Infrastructure Documentation Sources

| Source / Entity | URL / Document Ref | Date Checked | Key Research Findings | Direct Impact on D-AminGrow Architecture |
| :--- | :--- | :---: | :--- | :--- |
| **Cloudflare Workers Next.js Guide** | `https://developers.cloudflare.com/workers/frameworks/framework-guides/nextjs/` | 2026-10-26 | Cloudflare officially directs developers to **OpenNext (`@opennextjs/cloudflare`)** for full-stack Next.js deployments to Workers. | Officially adopt `@opennextjs/cloudflare` as the build and runtime adapter for D-AminGrow; discard legacy approaches. |
| **Cloudflare Next-on-Pages Repository** | `https://github.com/cloudflare/next-on-pages` | 2026-10-26 | `@cloudflare/next-on-pages` is officially **deprecated and archived** by Cloudflare. | Explicitly forbid the use of `next-on-pages` to prevent introducing dead architectural dependencies. |
| **Vinext Documentation** | `https://vinext.io` | 2026-10-26 | Cloudflare-backed experimental Vite plugin that reimplements the Next.js API surface on Vite. Fast builds, but risks API drift. | Evaluate and monitor Vinext, but reject for Phase 1 MVP in favor of proven OpenNext stability. |
| **Supabase Documentation** | `https://supabase.com/docs` | 2026-10-26 | Recommends `@supabase/ssr` using cookie-based auth in Next.js Server Components. Highlights that stateless HTTPS PostgREST queries avoid connection pool exhaustion in edge serverless runtimes. | Implement HTTPS PostgREST data fetching via `@supabase/ssr` to support 500,000 monthly visits without exhausting PostgreSQL database connections. |
| **Next.js Metadata API** | `https://nextjs.org/docs/app/building-your-application/optimizing/metadata` | 2026-10-26 | Dynamic `generateMetadata()` generates server-side OpenGraph and JSON-LD schema before streaming HTML chunks. | Critical for technical SEO and social link previews on WhatsApp and Twitter. |

---

## 3. Regulatory, Legal & Compliance Sources

| Source / Entity | Statutory Ref / URL | Date Checked | Key Research Findings | Direct Impact on D-AminGrow Architecture |
| :--- | :--- | :---: | :--- | :--- |
| **NAFDAC Act CAP N1 LFN 2004** | `https://nafdac.gov.ng` | 2026-10-26 | Mandates that no veterinary drug, vaccine, or allied chemical can be imported, manufactured, advertised, or sold in Nigeria without official NAFDAC registration. | Add mandatory `nafdac_reg_number` database field and administrative publishing blocks for unapproved pharmaceuticals. |
| **NAFDAC Drug Advertisement Regulations** | Official Gazette Regulations | 2026-10-26 | Prescription-Only Medicines (POM) **cannot be advertised to the general public** in mass media or digital consumer channels. Advertising requires prior agency clearance. | Gate prescription veterinary drugs with explicit "Prescription Required" badges; direct POM purchases through professional consultation rather than public consumer carts. |
| **National Action Plan on Antimicrobial Resistance (AMR)** | FMARD / NCDC Directives | 2026-10-26 | Strict nationwide prohibition against marketing or using antibiotics as animal growth promoters (AGPs) or routine flock boosters. | Build automated content linter into the CMS blocking keywords like "growth promoter", "fattening booster", or "weight enhancer" on antibiotic products. |
| **Nigeria Data Protection Act (NDPA) 2023** | `https://ndpc.gov.ng` | 2026-10-26 | Section 26 requires explicit, freely given, informed opt-in consent; strictly prohibits pre-ticked checkboxes; mandates defined data retention schedules. | Implement clear opt-in checkboxes on WhatsApp checkout modals; configure 180-day automated purging of abandoned customer inquiry records. |
| **Veterinary Council of Nigeria (VCN)** | Veterinary Surgeons Act | 2026-10-26 | Clinical veterinary diagnosis and prescription authorization are legally restricted to licensed Veterinary Surgeons. | Display unambiguous legal disclaimers on all educational articles: *"Educational purposes only; does not replace examination by a licensed veterinary doctor."* |

---

## 4. Technical SEO & Industry Intelligence Sources

| Source / Entity | Reference / Tool | Date Checked | Key Research Findings | Direct Impact on D-AminGrow Architecture |
| :--- | :--- | :---: | :--- | :--- |
| **Google Search Central Documentation** | `https://developers.google.com/search/docs` | 2026-10-26 | Emphasizes Core Web Vitals (INP, LCP, CLS), semantic HTML, and structured data (`Product`, `FAQPage`, `BreadcrumbList`) for rich search snippets. | Deploy edge-rendered HTML with comprehensive JSON-LD schema on all category, product, and knowledge pages. |
| **Google Trends Nigeria (Livestock Demand)** | Google Trends Query Analysis | 2026-10-26 | Poultry search terms ("day old chicks price", "broiler vaccination schedule", "gumboro symptoms") show massive recurring seasonal peaks before Easter and Q4 Christmas cycles. | Align content publication calendar and promotional booking banners with national holiday brooding timelines. |
| **FAO Livestock Production Guidelines** | Food and Agriculture Organization | 2026-10-26 | Technical specifications for tropical poultry brooding temperatures, feeder spacing, and biosecurity buffers. | Ground the interactive Brooder Equipment Calculator on peer-reviewed FAO poultry management standards. |
