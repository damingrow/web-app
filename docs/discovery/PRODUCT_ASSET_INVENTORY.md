# D-AminGrow — Product Asset & Brand Identity Inventory
**Document Ref:** DAG-DISC-005  
**Version:** 1.0.0  
**Audit Date:** 2026-10-26  
**Auditor:** Principal Software Architect & Digital Asset Lead  
**Status:** Completed & Verified  

---

## 1. Executive Summary & Asset Health

A complete physical audit of the local repository `/Users/mac/Projects/Damingrow` was executed. The filesystem audit revealed 34 distinct image files:
- **2 Brand Identity assets** located in `./Brand identity/`
- **32 Product photograph assets** located across three subfolders in `./products/`:
  - `Acessories/` (22 items) — *Note: Directory is named `Acessories` (single 'c') in the filesystem.*
  - `Drugs/` (8 items)
  - `Chicks/` (2 items)
  - `Vaccines/` (0 items) — **CRITICAL GAP:** The Vaccines category is entirely missing from the asset directory despite being one of the four primary business lines.

### Key Audit Findings:
1. **Identical Duplicate Detected:**  
   `./products/Drugs/drug.jpeg` and `./products/Drugs/oxytet drug.jpeg` share the identical MD5 checksum (`fb04cc993405d429ccafd85265a2edd6`) and identical size (176,434 bytes). One of these is a redundant duplicate.
2. **Missing Essential Category:**  
   Zero assets exist for **Livestock Vaccines** (e.g., Newcastle, Gumboro/IBD, Marek's, Fowl Pox, Lasota).
3. **Low-Resolution / Extreme Aspect Ratio Assets:**
   - `./products/Acessories/breeder feeder.jpeg`: `471 x 274 px` (28.96 KB) — Sub-HD, inadequate for zoom or high-DPI retina display.
   - `./products/Acessories/Poultry transport cage.jpeg`: `558 x 433 px` (32.32 KB) — Low resolution.
   - `./products/Drugs/ecto-zap.jpeg`: `373 x 1080 px` (51.58 KB) — Extreme aspect ratio (`1:2.89`), vertical banner/cutout that will create severe layout distortion in standard `1:1` or `4:3` ecommerce product grids without white-padding.
4. **Special Characters in Filenames:**
   `./products/Acessories/egg crate rack:carrier.jpeg` contains a colon (`:`). Colons are reserved characters in POSIX/Windows file paths and cause URI encoding failures in web URLs (`egg%20crate%20rack%3Acarrier.jpeg`) and build failures on certain CI/CD environments.
5. **Brand Identity Evaluation:**
   The primary logo (`damingrow logo.png`) is a 500x500 RGBA PNG with alpha transparency (`alpha_range=(0, 255)`). It features brand colors `#7ED956` (Agri Green) and `#056782` (Deep Teal). However, there is no vector source (SVG), no horizontal header lockup, and no complete favicon pack (`favicon.ico`, `apple-touch-icon.png`, `192x192.png`, `512x512.png`).

---

## 2. Brand Identity Assets Audit

| Filename | Path | Format | Mode | Dimensions (WxH) | Size | MD5 Checksum | Transparency & Usability Assessment |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `damingrow logo.png` | `./Brand identity/` | PNG | RGBA | 500 x 500 | 94.17 KB | `441fc03a549b41bdd1d0d3c5a7501590` | **Verified Alpha Transparency.** Non-transparent bounding box: (48, 78, 454, 424). Good for square avatar / icon, but insufficient alone for desktop header navigation (needs horizontal lockup). Missing vector SVG. |
| `favicon-removebg-preview.png` | `./Brand identity/` | PNG | RGBA | 500 x 500 | 82.94 KB | `af56b9281164dbb6630d59fb18c9f54a` | **Verified Alpha Transparency.** Artifact from remove.bg automated cutout. Bounding box: (137, 58, 413, 442). Edges show slight alpha fringing typical of automated cutout tools. Requires SVG master redraw. |

### Color Palette Extracted from Master Assets:
- **Primary Brand Green:** `#7ED956` / `rgb(126, 217, 86)` — Symbolizes growth, agricultural vitality, and plant/animal health.
- **Secondary Brand Deep Teal / Navy:** `#056782` / `rgb(5, 103, 130)` — Symbolizes scientific veterinary authority, biosecurity, and corporate trust.
- **Accent Emerald:** `#00BF62` / `rgb(0, 191, 98)` — Accent highlight for high-conversion CTAs.

---

## 3. Product Asset Audit Inventory

### Category A: Drugs (`./products/Drugs/`)

| Filename | Dimensions | File Size | MD5 Checksum | Visual Content / Observable Identification | Recommended Normalised Product Name | Quality & Usage Recommendation |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `ascorbic acid vitamic c water soluble.jpeg` | 958 x 640 | 82.01 KB | `f8449f0fa4b694c0d6b7e0d34dd33a74` | Sachet/packaging of water-soluble Ascorbic Acid (Vitamin C) powder for livestock anti-stress. | Ascorbic Acid (Vitamin C) Water Soluble Powder | **Passable.** 1.5:1 aspect ratio. Needs standard white background centering. |
| `cipo zen drug.jpeg` | 960 x 1280 | 120.92 KB | `e668924dfcef75ff42ee81934308e7e8` | Veterinary packaging labelled "Cipo Zen" (Ciprofloxacin based broad-spectrum oral solution/powder). | Cipo-Zen Antibacterial Oral Solution | **Good.** High clarity, portrait format. Standardise to 1000x1000 square. |
| `cocci-ton drug.jpeg` | 960 x 1280 | 184.78 KB | `873e27d80cd83c9e1e29bc2b0e373d0e` | Veterinary packaging labelled "Cocci-Ton" (Anticoccidial preparation for poultry coccidiosis). | Cocci-Ton Anticoccidial Treatment | **Good.** High clarity. Prominent veterinary branding visible. |
| `drug.jpeg` | 960 x 1280 | 172.30 KB | `fb04cc993405d429ccafd85265a2edd6` | Bottle/sachet of Oxytetracycline veterinary antibiotic formulation. | Oxytetracycline (Generic) | **DUPLICATE.** 100% byte-for-byte identical to `oxytet drug.jpeg`. Archive `drug.jpeg` and retain `oxytet drug.jpeg`. |
| `oxytet drug.jpeg` | 960 x 1280 | 172.30 KB | `fb04cc993405d429ccafd85265a2edd6` | Bottle/sachet of Oxytetracycline veterinary antibiotic formulation. | Oxytetracycline HCl Broad Spectrum Antibiotic | **Primary Asset.** High clarity, portrait format. Retain over `drug.jpeg`. |
| `ecto-zap.jpeg` | 373 x 1080 | 51.58 KB | `c53419f5e7ff334821ba48bada8830c8` | Narrow vertical cutout/bottle labelled "Ecto-Zap" (Ectoparasiticide for mites, lice, and ticks). | Ecto-Zap Livestock Ectoparasiticide Pour-on/Spray | **Aspect Ratio Warning.** `373 x 1080` (ratio `1:2.89`). Must be padded onto a 1080x1080 canvas or reshot. |
| `methione.jpeg` | 720 x 1280 | 85.06 KB | `ec1df1ed88d70e9be068e08f4ea608b2` | Bag/packaging labelled DL-Methionine essential amino acid poultry feed supplement. | DL-Methionine Feed Grade Amino Acid Supplement | **Good.** Clear product label, portrait aspect ratio. |
| `norflogen drug.jpeg` | 960 x 1280 | 95.82 KB | `1fe5fcd3b34480ae34e534f5f7154dcb` | Veterinary packaging labelled "Norflogen" (Norfloxacin oral veterinary antimicrobial). | Norflogen Antibacterial Oral Solution | **Good.** High clarity, portrait format. |

---

### Category B: Accessories & Equipment (`./products/Acessories/`)

| Filename | Dimensions | File Size | MD5 Checksum | Observable Identification | Recommended Normalised Product Name | Quality Assessment & Remediation |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `Stringe needle.jpeg` | 810 x 1080 | 55.27 KB | `48cd2fbd3e9863b0c52139e18ccfb991` | Syringe needles box/blister pack for livestock vaccination. | Veterinary Vaccination Needles (Multi-Gauge) | Good clarity. Rename to remove typo ("Stringe" -> "Syringe"). |
| `automatic stringe.jpeg` | 756 x 1008 | 61.25 KB | `5691768cf25a9a8180a0e5ac97a48d7a` | Continuous automatic adjustable veterinary syringe with tubing for mass poultry vaccination. | Automatic Continuous Poultry Vaccinator Syringe | Good clarity. Professional equipment image. Rename to "Syringe". |
| `birds feeder.jpeg` | 810 x 1080 | 106.48 KB | `3e6d0a1463b4a7499d1c2dd68cd5dd8e` | Standard plastic conical poultry feeder with pan and anti-scratch grill. | Manual Conical Poultry Feeder (9kg - 12kg) | Good quality. Clean lighting. |
| `breeder feeder.jpeg` | 471 x 274 | 28.96 KB | `213cd363c0cd0eab105888b2efb65056` | Long trough feeder for breeder or adult flock feeding. | Heavy-Duty Breeder Pan / Trough Feeder | **LOW RESOLUTION WARNING.** `471 x 274 px` will blur on desktop retina monitors. Mark for reshoot or supplier replacement. |
| `breeder hanging feeder.jpeg` | 613 x 1014 | 48.80 KB | `53dee24d9d86b3ff572f670f16d9f709` | Commercial hanging pan feeder suspended from support wire. | Commercial Suspended Breeder Hanging Feeder | Acceptable resolution. Portrait orientation. |
| `chicks feeder.jpeg` | 810 x 1080 | 72.93 KB | `7e49584d826812206cca16c4f392ba43` | Shallow plastic circular chick feeding tray/pan for day-old chick brooding. | Day-Old Chick Brooding Feeding Tray | Good quality. Clean lighting and sharp contrast. |
| `poultry feeder.jpeg` | 810 x 1080 | 84.45 KB | `ca9b88295d1b0365963dd4bf5bc10f02` | Standard hanging hopper/tube poultry feeder with red pan and white cylinder. | Standard Poultry Hopper Tube Feeder | Good quality. Very clean, high-utility product shot. |
| `drinker.jpeg` | 810 x 1080 | 87.33 KB | `374849e20e94f490abc3533890960e80` | Manual bell-shaped invert poultry drinker (fount) with red base and translucent jar. | Manual Poultry Invert Drinker (4L - 5L) | Good quality. Clear depiction of product. |
| `poultry drinker.jpeg` | 810 x 1080 | 37.49 KB | `5f1d2df784426eefd119dcaf598061ff` | Commercial suspended automatic bell drinker (Plasson style) with ballast water chamber and hose. | Automatic Bell Drinker (Plasson Style) | Good quality. Clear depiction of suspension mechanism. |
| `automated drinker birds.jpeg` | 763 x 960 | 33.27 KB | `51dd548a5af9ab510c02f55dc849d12f` | Automatic bell drinker assembly with hanging line and water connection. | Commercial Automated Poultry Bell Drinker System | Acceptable quality. Near-duplicate in usage to `poultry drinker.jpeg`. |
| `nipple drinker.jpeg` | 720 x 1280 | 56.25 KB | `0142379bfeb23ad55e800d6f9022b664` | Stainless steel 360-degree poultry nipple drinker with plastic saddle/clamp attachment. | 360° Stainless Steel Poultry Nipple Drinker with Drip Cup | Good quality. Detail view of water valve. |
| `nipple drinker 2.jpeg` | 500 x 1080 | 23.60 KB | `0c4a4f7e5c8649160eebc5d423526836` | Nipple drinker variant with integrated single-arm drip catcher cup. | Poultry Nipple Drinker with Single-Arm Drip Cup | Acceptable quality. Portrait aspect ratio. |
| `poultry nipple drinker.jpeg` | 750 x 1080 | 36.87 KB | `1216005460d788dfc145e301216cc929` | Nipple drinker pipe mount section with water line connector. | Threaded Heavy-Duty Poultry Water Nipple | Good quality. Detail view. |
| `Gas brooder.jpeg` | 960 x 1280 | 104.65 KB | `0d8b4a147a52517eaf8370b9d54075c1` | Infrared gas brooder heater with ceramic disc and stainless mesh reflector for day-old chick warming. | Infrared Radiant Gas Brooder Heater (Canopy Type) | High quality. Critical equipment for chick brooding. |
| `gas brooder 2.jpeg` | 720 x 1280 | 102.52 KB | `777affe491253610476f25ce684b7edc` | Compact infrared gas brooder unit with regulator connection. | Compact Infrared Gas Brooder Unit | High quality. Variant view of gas brooder heating element. |
| `birds transfer cage.jpeg` | 810 x 1080 | 119.49 KB | `042d2c9c47c3aa08bf97636cd74d62b7` | High-density polyethylene (HDPE) perforated plastic crate for live adult poultry transport. | Heavy-Duty Live Poultry Transport Crate (HDPE) | High quality. Perspective view showing top sliding door. |
| `birds transfer cage diff view.jpeg` | 1080 x 810 | 98.20 KB | `5b61271d40810a405d7ca4261f53b532` | Top-down view showing latch and interlocking stacking ribs of poultry crate. | Heavy-Duty Live Poultry Transport Crate (Stacking View) | High quality. Landscape format. Complementary gallery image. |
| `Poultry transport cage.jpeg` | 558 x 433 | 32.32 KB | `bf9745357c4335661324ad9fe1903645` | Plastic poultry transport crate (white/yellow crate). | Portable Live Bird Handling Crate | **LOW RESOLUTION WARNING.** `558 x 433 px`. Substandard for main product image; usable only as secondary thumbnail. |
| `defeathering machine.jpeg` | 756 x 1060 | 104.80 KB | `eb04730af03f2a6930c9a047577c3853` | Stainless steel rotary drum poultry plucker (defeathering machine) with rubber plucker fingers and motor base. | Commercial Stainless Steel Poultry Defeathering Plucker Machine | High quality. Essential commercial processing equipment. |
| `automated battery cage.jpeg` | 810 x 1080 | 157.72 KB | `1987d9ec9569c79105db56954c9c2b9f` | Multi-tier galvanized A-frame layer battery cage system with egg collection troughs. | Commercial Galvanized A-Frame Layer Battery Cage (Tiered System) | High quality. High-ticket capital equipment item. |
| `egg crates.jpeg` | 960 x 1280 | 166.06 KB | `5a478ee6478da31e291c789aad2f8ddc` | Reusable plastic 30-egg holding trays (crates) in assorted colors. | Reusable Plastic 30-Egg Holding Trays (Assorted Colors) | High quality. High turnover consumable accessory. |
| `egg crate rack:carrier.jpeg` | 960 x 1280 | 132.86 KB | `4236b15acb5e0078c211466eb5231b04` | Metal welded wire carrier / handling basket for stacked egg crates. | Heavy-Duty Wire Egg Crate Carrier / Handling Rack | **FILENAME WARNING:** Contains colon character `:`. Must be renamed to `egg-crate-rack-carrier.jpeg` to avoid URI corruption. |

---

### Category C: Day-Old Chicks (`./products/Chicks/`)

| Filename | Dimensions | File Size | MD5 Checksum | Observable Identification | Recommended Normalised Product Name | Quality Assessment & Staging Recommendation |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `day old broiler.jpeg` | 810 x 1080 | 82.53 KB | `a41699c839952020bb1878677ba9b2ae` | Vibrant flock of day-old commercial white broiler chicks under brooding light. | Commercial Day-Old Broiler Chicks (Carton of 50/51) | High quality. Natural farm brooding environment. Highly appealing for poultry farmers. |
| `day old pullet.jpeg` | 960 x 1280 | 130.80 KB | `61ddef30774a22de88c51f0bd8bcb8c5` | Healthy day-old commercial egg-laying pullet chicks (brown/black strain) in brooding pen. | Commercial Day-Old Layer Pullet Chicks (Carton of 50/51) | High quality. Vibrant, clear feathering and vitality visible. Excellent lead PDP image. |

---

## 4. Missing Categories & Asset Acquisition Roadmap

### 1. Livestock Vaccines Category (Completely Missing)
To launch the 4 promised core categories, D-AminGrow must commission or source high-resolution imagery for core poultry vaccines:
- **Newcastle Disease Vaccines** (e.g., Hitchner B1, LaSota, Clone 30)
- **Infectious Bursal Disease (Gumboro) Vaccines** (e.g., Intermediate, Intermediate Plus)
- **Marek's Disease Vaccine** (HVT / freeze-dried with ampoule/diluent)
- **Fowl Pox Vaccine** (with wing-web applicator)
- **Fowl Typhoid / Salmonella Vaccines**
- **Vaccine Diluents and Dye Tablets**

### 2. High-Ticket Equipment Gallery Gaps
- `automated battery cage.jpeg` shows one angle of an A-frame cage. For high-ticket items (₦500,000 – ₦5,000,000+), farmers require:
  - Technical dimension drawing/spec sheet image
  - Detail shot of nipple line and pressure regulator
  - Detail shot of egg collection trough and manure scraper/tray
- `defeathering machine.jpeg`:
  - Detail shot of interior rubber fingers
  - Power motor specification plate

---

## 5. Technical Image Pipeline & Normalization Rules

Prior to uploading into Supabase Storage or serving through Cloudflare CDN, the following build-time normalization script must execute:

1. **Path Normalization:**
   - Directory rename: `Acessories/` $\rightarrow$ `accessories/`
   - Filename sanitization: Strip colons, spaces, and duplicate extensions:
     - `egg crate rack:carrier.jpeg` $\rightarrow$ `egg-crate-rack-carrier.jpg`
     - `ascorbic acid vitamic c water soluble.jpeg` $\rightarrow$ `ascorbic-acid-vitamin-c-water-soluble.jpg`
     - `Stringe needle.jpeg` $\rightarrow$ `veterinary-vaccination-needles.jpg`
     - `automatic stringe.jpeg` $\rightarrow$ `automatic-poultry-syringe.jpg`
2. **Aspect Ratio & Canvas Standardisation:**
   - Target format: **1:1 Square (1200 x 1200 px)**
   - Fill technique: High-resolution centring on neutral pure white (`#FFFFFF`) or off-white (`#F8FAFC`) with minimum 8% boundary padding.
   - For `ecto-zap.jpeg` (`373 x 1080`), avoid stretching; center the bottle cutout on a 1080x1080 white canvas.
3. **Format Transformation & Next-Gen Codecs:**
   - Source storage: Standardized progressive JPEG / WebP at quality 85.
   - Cloudflare CDN transformation: Dynamic content-negotiation serving **AVIF** to modern browsers and **WebP** fallback.
4. **Responsive Breakpoints:**
   - Thumbnail: `160 x 160 px` (cart / WhatsApp preview)
   - Catalog Card: `400 x 400 px` (grid listing)
   - Product Detail Hero: `800 x 800 px` (mobile PDP)
   - Zoom Lightbox: `1200 x 1200 px` (desktop deep inspection)

---

## 6. Proposed Product Image Manifest (JSON Schema)

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "DAminGrowProductAssetManifest",
  "type": "array",
  "items": {
    "type": "object",
    "properties": {
      "asset_id": { "type": "string" },
      "original_filename": { "type": "string" },
      "sanitized_slug": { "type": "string" },
      "category_slug": { "type": "string", "enum": ["accessories", "drugs", "vaccines", "day-old-chicks"] },
      "original_dimensions": {
        "type": "object",
        "properties": {
          "width": { "type": "integer" },
          "height": { "type": "integer" }
        }
      },
      "md5_hash": { "type": "string" },
      "status": { "type": "string", "enum": ["active", "duplicate_archived", "low_res_flagged", "missing_asset"] },
      "associated_product_slug": { "type": "string" },
      "is_primary": { "type": "boolean" },
      "display_order": { "type": "integer" }
    },
    "required": ["asset_id", "original_filename", "sanitized_slug", "category_slug", "md5_hash", "status"]
  }
}
```
