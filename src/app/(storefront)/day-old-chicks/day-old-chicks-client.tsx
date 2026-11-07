'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Building2,
  MessageCircle,
  Truck,
  Phone,
  Feather,
  ChevronRight,
  Clock,
  Thermometer,
  XCircle,
  Copy,
  Check,
  TrendingUp,
  Scale,
  AlertTriangle,
  ChevronDown,
  Syringe,
  DollarSign,
} from 'lucide-react';
import { CLIENT_FARMS } from '@/data/partners-and-clients';

export interface DayOldChicksClientProps {
  nextMonday: string;
  nextThursday: string;
}

interface BreedPriceItem {
  id: string;
  name: string;
  strain: string;
  category: string;
  pricePerCartonEstimated: string;
  pricePerBirdEstimated: string;
  cartonCount: string;
  harvestMetric: string;
  fcrOrYield: string;
  hatcheries: string[];
  image: string;
  href: string;
  badge: string;
  bestFor: string;
}

const BREED_PRICE_DIRECTORY: BreedPriceItem[] = [
  {
    id: 'broilers',
    name: 'Commercial Day-Old Broilers',
    strain: 'Ross 308, Cobb 500, Arbor Acres Plus',
    category: 'Rapid Meat Production',
    pricePerCartonEstimated: '₦95,000 – ₦115,000',
    pricePerBirdEstimated: '₦1,900 – ₦2,300',
    cartonCount: '50 + 1 bonus chick (51 total)',
    harvestMetric: '2.2kg – 2.8kg at 42–49 days',
    fcrOrYield: '1.60 – 1.75 FCR',
    hatcheries: ['CHI Farms', 'Amo Farms', 'Zartech', 'Supreme'],
    image: '/products/Chicks/day old broiler.jpeg',
    href: '/day-old-chicks/broilers',
    badge: 'Fastest 6-Week Harvest',
    bestFor: 'Commercial broiler farms targeting quick cash turnover and maximum breast meat ratio.',
  },
  {
    id: 'pullets',
    name: 'Commercial Layer Pullets',
    strain: 'ISA Brown, Hy-Line Brown, Zartech Black Shaver',
    category: 'Commercial Egg Production',
    pricePerCartonEstimated: '₦170,000 – ₦185,000',
    pricePerBirdEstimated: '₦3,400 – ₦3,700',
    cartonCount: '50 + 1 bonus chick (51 total)',
    harvestMetric: '310 – 325 brown eggs / hen / cycle',
    fcrOrYield: '94% – 96% peak egg lay',
    hatcheries: ['Zartech', 'CHI Farms', 'Amo Farms'],
    image: '/products/Chicks/Pullet day old.jpeg',
    href: '/day-old-chicks/pullets',
    badge: '72-Week Persistent Lay',
    bestFor: 'Table egg producers looking for calm pen demeanor, low feed consumption, and solid brown shells.',
  },
  {
    id: 'turkeys',
    name: 'Foreign Hybrid & Local Turkeys',
    strain: 'Nicholas White, Hybrid Converter, Local Foreign',
    category: 'Heavy Festive Meat',
    pricePerCartonEstimated: '₦160,000 – ₦175,000',
    pricePerBirdEstimated: '₦5,300 – ₦5,800',
    cartonCount: '30 vigorous poults per carton',
    harvestMetric: '12kg – 18kg toms at 18–22 weeks',
    fcrOrYield: '2.40 – 2.70 FCR',
    hatcheries: ['Accredited Primary Turkey Breeders'],
    image: '/products/Chicks/Day old Turkey.jpeg',
    href: '/day-old-chicks/turkeys',
    badge: 'Top Festive ROI',
    bestFor: 'Festive season market producers targeting corporate hampers, hotels, and premium meat cuts.',
  },
  {
    id: 'noilers',
    name: 'Dual-Purpose Noiler Chicks',
    strain: 'AMO Noiler Original Line',
    category: 'Hardy Rural & Semi-Intensive',
    pricePerCartonEstimated: '₦48,000 – ₦58,000',
    pricePerBirdEstimated: '₦960 – ₦1,160',
    cartonCount: '50 + 1 bonus chick (51 total)',
    harvestMetric: '2.5kg meat or 180–200 rustic eggs',
    fcrOrYield: 'Extreme tropical disease resilience',
    hatcheries: ['Amo Farm Sieberer Ltd'],
    image: '/products/Chicks/day-old-duck.jpeg',
    href: '/chicks',
    badge: 'Free-Range Champion',
    bestFor: 'Smallholders and commercial farmers seeking low mortality under variable rural environmental conditions.',
  },
  {
    id: 'cockerels',
    name: 'Commercial Grower Cockerels',
    strain: 'White Layer Cockerels & Heavy Strains',
    category: 'Budget-Friendly Grower Meat',
    pricePerCartonEstimated: '₦10,000 – ₦15,000',
    pricePerBirdEstimated: '₦200 – ₦300',
    cartonCount: '50 + 1 bonus chick (51 total)',
    harvestMetric: '1.8kg – 2.2kg at 16–20 weeks',
    fcrOrYield: 'Low initial capital entry',
    hatcheries: ['Primary Commercial Layer Hatcheries'],
    image: '/products/Chicks/day old pullet.jpeg',
    href: '/day-old-chicks/cockerels',
    badge: 'Low Capital Entry',
    bestFor: 'Farmers wanting hardy, low-cost backyard birds that thrive on lower-protein farm grain rations.',
  },
];

const FAQS = [
  {
    q: 'How much is a carton of day-old chicks in Nigeria today?',
    a: 'In Nigeria, day-old chick prices are determined every week by primary hatcheries based on parent stock feed costs and seasonal demand. Currently, commercial broiler cartons (50+1 chicks) range between ₦95,000 and ₦115,000 depending on the breed (Ross 308, Cobb 500, Arbor Acres). Layer pullets (ISA Brown, Hy-Line) average ₦170,000 to ₦185,000 per carton of 51 chicks. Foreign turkey cartons (30 poults) range between ₦160,000 and ₦175,000. Real-time rates are confirmed twice weekly via our live WhatsApp desk.',
  },
  {
    q: 'Why do day-old chick prices fluctuate between Monday and Thursday dispatches?',
    a: 'Commercial breeding operations set incubation eggs 21 days in advance. Hatcheries typically run two major pull cycles each week: Monday and Thursday. When weekend demand surges from farmers restocking after slaughter, Monday prices may rise slightly. Conversely, Thursday runs often feature steady pricing. Furthermore, exchange rate shifts impacting imported parent stock vitamins and feed ingredients directly affect weekly hatchery gate prices.',
  },
  {
    q: 'What is the 50+1 packaging rule and why does it matter?',
    a: 'Under genuine certified hatchery guidelines, every commercial carton of broilers, pullets, or cockerels contains 50 invoiced birds plus 1 extra chick (51 chicks total). This additional chick serves as an automatic livability buffer to offset minor transit stress. Unlicensed middlemen frequently open cartons before delivery, remove the bonus chick or replace vigorous chicks with undersized runts. D-AminGrow guarantees factory-sealed cartons with intact hatchery tamper tape.',
  },
  {
    q: 'How does the 50% commitment deposit protect my flock allocation?',
    a: 'Primary hatcheries (CHI, Zartech, Amo, Supreme) operate strict bio-secure reservation queues. Because live chicks cannot be stored on shelves after hatching, hatcheries only pull and allocate boxes to verified pre-orders. A 50% commitment deposit transferred to our corporate Zenith Bank account (1017894562, D-AminGrow Agric Ltd) guarantees your slot on the hatch pull list. The remaining balance clears on dispatch morning before vehicle departure.',
  },
  {
    q: 'What are the order cut-off deadlines for Monday and Thursday nationwide dispatches?',
    a: 'To allow adequate time for veterinary crating and interstate logistics manifest coordination: Monday dispatch bookings and deposits close on Saturday at 12:00 PM (noon). Thursday dispatch bookings close on Tuesday at 5:00 PM. Bookings received after these cut-off deadlines automatically roll over to the next hatch day.',
  },
  {
    q: 'How are the chicks transported safely to my state or town?',
    a: 'Chicks depart early in the morning from primary hatchery hubs in Ibadan or Ogun State in specialized, ventilated boxes loaded into dedicated commercial motor park transit vehicles. Our logistics desk provides prompt dispatch notifications containing the driver’s contact, vehicle registration number, and motor park waybill receipt so you can track arrival and collect within two hours.',
  },
  {
    q: 'Are the day-old chicks pre-vaccinated against Marek’s Disease?',
    a: 'Yes. All day-old broiler and layer pullet chicks allocated through D-AminGrow receive subcutaneous Marek’s Disease vaccine (HVT strain, 0.2ml per bird) administered via automated hatchery vaccination equipment immediately post-hatch. You will receive an official veterinary calendar detailing subsequent Newcastle Disease (ND) and Gumboro (IBD) drinking water administrations.',
  },
  {
    q: 'What is the procedure if I notice mortality upon unboxing at the motor park depot?',
    a: 'Every carton includes 1 extra chick to absorb normal transit vibration. If mortality exceeds this buffer due to transit mechanical delays, you must record an unbroken, 360-degree unboxing video at the motor park depot within 2 hours of bus arrival showing unbroken carton seals and dead birds. Transmit this video immediately to our WhatsApp desk for verification and compensatory credit.',
  },
];

export default function DayOldChicksClient({ nextMonday, nextThursday }: DayOldChicksClientProps) {
  const [copiedBank, setCopiedBank] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedBreed, setSelectedBreed] = useState('broilers');
  const [cartonQuantity, setCartonQuantity] = useState<number>(2);

  const handleCopyBank = () => {
    navigator.clipboard.writeText('1017894562');
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2500);
  };

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  // Quick estimator numbers
  const activeBreed = BREED_PRICE_DIRECTORY.find((b) => b.id === selectedBreed) ?? BREED_PRICE_DIRECTORY[0]!;
  const estimatedCost = selectedBreed === 'broilers' ? cartonQuantity * 105000 :
    selectedBreed === 'pullets' ? cartonQuantity * 175000 :
    selectedBreed === 'turkeys' ? cartonQuantity * 165000 :
    selectedBreed === 'noilers' ? cartonQuantity * 52000 :
    cartonQuantity * 12000;
  const depositRequired = estimatedCost * 0.5;

  return (
    <div className="font-body text-slate-800">
      {/* ====================================================================
          1. HERO SECTION (HOMEPAGE 2-GRID 12-COLUMN ARCHITECTURE: 7 + 5)
          ==================================================================== */}
      <section className="relative hero-mesh overflow-hidden py-16 sm:py-24 bg-gradient-to-b from-slate-950 via-[#05130b] to-slate-900 border-b border-emerald-950/40">
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/3 left-1/4 w-[500px] h-[350px] bg-amber-500/8 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400 mb-8 sm:mb-12">
            <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
            <span className="text-emerald-400 font-medium">Day-Old Chicks Price in Nigeria</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column (7 Cols): Conversion-focused value proposition */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-7">
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-4 py-1.5 rounded-full">
                  <Feather className="h-3.5 w-3.5 text-emerald-400" />
                  Genuine Genetic Parent Stock
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-500/15 border border-amber-500/30 px-3.5 py-1.5 rounded-full">
                  <Truck className="h-3.5 w-3.5 text-amber-400" />
                  Monday &amp; Thursday Nationwide Waybill
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-white tracking-tight leading-[1.12]">
                Current Day-Old Chicks Price in Nigeria &amp;{' '}
                <span className="text-gradient-green">Live Hatchery Booking Hub</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                Get confirmed commercial hatchery price lists for broiler chicks, ISA Brown pullets, and foreign turkey poults directly from certified Nigerian breeding hubs. Avoid middleman markups and tampered boxes with our verified <strong className="text-white font-semibold">50+1 carton rule</strong>, direct <strong className="text-white font-semibold">50% commitment deposit</strong> protection, and prompt <strong className="text-white font-semibold">nationwide chick delivery</strong> every Monday and Thursday.
              </p>

              {/* Value Signal Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                {[
                  { label: "Marek's Pre-Vaccinated", sub: "Automated HVT injection" },
                  { label: '50+1 Packaging Rule', sub: 'Zero transit mortality loss' },
                  { label: '36 States & FCT', sub: 'Climate-ventilated waybill' },
                  { label: 'Factory-Sealed Boxes', sub: 'CHI, Amo, Zartech, Supreme' },
                ].map((item, idx) => (
                  <div key={idx} className="rounded-xl bg-white/5 border border-white/10 p-2.5 sm:p-3 text-left">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                      <span>{item.label}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{item.sub}</div>
                  </div>
                ))}
              </div>

              {/* CTA Group */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <a
                  href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20want%20to%20confirm%20today%27s%20Day-Old%20Chicks%20prices%20and%20reserve%20cartons%20for%20the%20upcoming%20dispatch."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-7 py-4 rounded-xl text-base shadow-xl shadow-[#25D366]/20 hover:-translate-y-0.5 transition-all"
                >
                  <MessageCircle className="h-5 w-5 shrink-0" />
                  <span>Check Today&apos;s Live Rate</span>
                </a>
                <a
                  href="#price-directory"
                  className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-6 py-4 rounded-xl border border-white/15 hover:-translate-y-0.5 transition-all text-sm"
                >
                  <span>Explore Hatchery Price List</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              {/* Slogan */}
              <p className="text-xs text-slate-400 italic">
                &ldquo;Your satisfaction is our priority&rdquo; &mdash; D-AminGrow Agro-Allied Solution Center
              </p>
            </div>

            {/* Right Column (5 Cols): Live Dispatch & Reservation Status */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-3xl bg-slate-900/90 border border-emerald-500/30 p-6 sm:p-7 shadow-2xl backdrop-blur-md relative overflow-hidden">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                      Live Hatch Schedule &amp; Cutoffs
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                    Active Cycle
                  </span>
                </div>

                <div className="space-y-4 my-5">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-slate-400 font-medium">Monday Dispatch Run</div>
                      <div className="text-base font-extrabold text-white font-heading mt-0.5">
                        {nextMonday || 'Upcoming Monday Hatch'}
                      </div>
                      <div className="text-[11px] text-amber-400 mt-0.5">Deposit cutoff: Saturday 12:00 PM</div>
                    </div>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl">
                      Booking
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-slate-400 font-medium">Thursday Dispatch Run</div>
                      <div className="text-base font-extrabold text-white font-heading mt-0.5">
                        {nextThursday || 'Upcoming Thursday Hatch'}
                      </div>
                      <div className="text-[11px] text-amber-400 mt-0.5">Deposit cutoff: Tuesday 5:00 PM</div>
                    </div>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl">
                      Open
                    </span>
                  </div>
                </div>

                {/* Bank Account Quick Reference */}
                <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/20 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-medium">Official Corporate Allotment Account:</span>
                    <span className="font-bold text-emerald-400">Zenith Bank Plc</span>
                  </div>
                  <div className="flex items-center justify-between bg-black/40 px-3 py-2 rounded-xl border border-white/5">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Account Number</span>
                      <span className="font-mono text-base font-extrabold text-emerald-300">1017894562</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyBank}
                      className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 px-3 py-1.5 rounded-lg border border-emerald-500/30 transition-all"
                    >
                      {copiedBank ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                      <span>{copiedBank ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Account Name: <strong className="text-slate-200">D-AminGrow Agric Ltd</strong>
                  </div>
                </div>
              </div>

              {/* Partner Badges Strip */}
              <div className="rounded-2xl bg-white/5 border border-white/8 p-4 flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold text-slate-300">Primary Grandparent Partners:</span>
                <span className="text-emerald-400 font-medium">CHI &bull; Amo ByNG &bull; Zartech &bull; Supreme</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          2. EMOTIONALLY COMPELLING HOOK & LIVE MARKET PRICE PULSE
          ==================================================================== */}
      <section className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-200 px-3.5 py-1 rounded-full">
                  Market Pulse
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 mt-2">
                  Why Chick Price Is Only 20% of Your Total Brooding Equation
                </h2>
              </div>
              <div className="text-xs sm:text-sm text-slate-500 md:text-right">
                <span>Updated weekly for </span>
                <strong className="text-slate-900 font-bold">Nigeria Commercial Corridor</strong>
              </div>
            </div>

            <p className="text-base text-slate-700 leading-relaxed max-w-4xl">
              Many farmers search tirelessly for the cheapest carton price, only to watch 15% of their birds die in the first seven days from dehydration and poor hatchery hygiene. A ₦5,000 difference per carton translates to barely ₦100 per bird. Yet, receiving genuine first-generation parent stock with a clean Marek&apos;s vaccination and 50+1 packaging buffer protects over ₦3,500 in harvest value per bird.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-xs text-slate-500 font-medium block">Average Broiler Day-Old Weight</span>
                <strong className="text-xl font-bold font-heading text-slate-900 mt-1 block">38g – 44g</strong>
                <span className="text-[11px] text-emerald-700">Healthy yolk absorption benchmark</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-xs text-slate-500 font-medium block">Target 6-Week Broiler Harvest</span>
                <strong className="text-xl font-bold font-heading text-slate-900 mt-1 block">2.3kg – 2.8kg</strong>
                <span className="text-[11px] text-emerald-700">1.60 to 1.75 Feed Conversion</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-xs text-slate-500 font-medium block">Layer Pullet 72-Week Output</span>
                <strong className="text-xl font-bold font-heading text-slate-900 mt-1 block">310 – 325 Eggs</strong>
                <span className="text-[11px] text-emerald-700">94%+ peak lay persistence</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          3. PROBLEM EXPLANATION: UNREGULATED MIDDLEMEN & CARTON TAMPERING
          ==================================================================== */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-800 bg-rose-100 px-4 py-1.5 rounded-full">
              The Industry Trap
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              How Farmers Lose Thousands Through Deceptive Chick Sourcing
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              When sourcing day-old chicks in Nigeria, the open market presents hidden traps that erase farm margins before birds even reach week two.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-rose-50/50 border border-rose-200/80 space-y-3">
              <div className="h-10 w-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold font-heading text-slate-900">
                Carton Skimming &amp; Stolen Bonus Chicks
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Hatcheries box 51 chicks (50 + 1 extra). Unscrupulous middlemen slit cartons open at motor parks, pull out the bonus chicks across hundreds of boxes to create illicit extra cartons, and re-tape the boxes. You pay full price for stressed, under-counted chicks.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-rose-50/50 border border-rose-200/80 space-y-3">
              <div className="h-10 w-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
                <XCircle className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold font-heading text-slate-900">
                Cull Substitution &amp; Fake Hatchery Stamps
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Unregistered brokers buy cheap rejected runts (chicks under 32g or with unhealed navels) from hatcheries and pack them into printed counterfeit cartons of top brands like CHI, Zartech, or Amo. Mortality surges above 20% by day five.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-rose-50/50 border border-rose-200/80 space-y-3">
              <div className="h-10 w-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
                <Thermometer className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold font-heading text-slate-900">
                Transit Hypothermia in Car Trunks
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Packing live chicks into airless car boots or overloading vehicle roofs under direct tropical sun induces severe dehydration and heat prostration. The surviving birds suffer permanent gut villi damage, stunting future growth forever.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          4. WHY MOST POULTRY BUSINESSES FAIL
          ==================================================================== */}
      <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white border border-slate-200 p-8 sm:p-12 shadow-sm space-y-8">
            <div className="max-w-3xl space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-700 bg-slate-100 px-4 py-1.5 rounded-full">
                Root Cause Analysis
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 tracking-tight">
                The Practical Reason 68% of Nigerian Poultry Batches Miss Profit Targets
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Our farm audits across Oyo, Ogun, Osun, Lagos, and Abuja reveal that financial failure rarely stems from expensive feed alone. It begins with compromises made during the first 72 hours.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-slate-900 font-bold font-heading text-base">
                  <span className="h-2 w-2 rounded-full bg-rose-500"></span>
                  Failure Factor 1: Speculative Last-Minute Sourcing
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Waiting until hatch morning to buy chicks forces farmers to purchase whatever unsold leftovers or cancelled orders remain at depots. You receive older, dehydrated birds whose yolk reserves have depleted.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-slate-900 font-bold font-heading text-base">
                  <span className="h-2 w-2 rounded-full bg-rose-500"></span>
                  Failure Factor 2: Cold Brooding Pens
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Placing chicks into a pen heated after their arrival causes immediate chilling. If brooding temperatures fall below 32°C, chicks huddle, stop drinking, and fail to absorb the maternal yolk sac, causing early bacterial omphalitis.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-slate-900 font-bold font-heading text-base">
                  <span className="h-2 w-2 rounded-full bg-rose-500"></span>
                  Failure Factor 3: Solid Feed Before Rehydration
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Feeding starter crumbles immediately upon unboxing blocks digestion. Dehydrated chicks need 60 to 90 minutes of warm glucose/electrolyte water first to activate gut motility and dilute thick uric acid.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-slate-900 font-bold font-heading text-base">
                  <span className="h-2 w-2 rounded-full bg-rose-500"></span>
                  Failure Factor 4: Skipping Marek&apos;s Certification
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Uncertified backyard hatcheries skip the ₦50/chick Marek&apos;s vaccination. By weeks 10 to 16, pullets begin developing leg paralysis, asymmetric pupil dilation, and tumors, wiping out entire pens.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          5. THE D-AMINGROW FRAMEWORK & APPROACH
          ==================================================================== */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-4 py-1.5 rounded-full">
              The D-AminGrow Guarantee
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Direct Primary Hatchery Allotments With Absolute Bio-Security
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              We operate as your dedicated allocation desk directly linked to Nigeria&apos;s licensed grandparent breeding conglomerates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                icon: ShieldCheck,
                title: 'Tamper-Evident Tape',
                desc: 'Every carton leaves the hatchery sealed with certified factory tape. You receive undisturbed boxes with full 50+1 counts.',
              },
              {
                icon: Building2,
                title: 'Direct Gate Pickup',
                desc: 'No roadside middleman storage. Chicks are collected directly from climate-controlled hatchery pull rooms into dispatch vehicles.',
              },
              {
                icon: Syringe,
                title: 'HVT Marek’s Included',
                desc: 'All broiler and layer pullet batches are pre-vaccinated at hatch with certified subcutaneous Marek’s HVT injections.',
              },
              {
                icon: Truck,
                title: 'Scheduled Park Waybill',
                desc: 'Coordinated motor park dispatch departures every Monday and Thursday morning with SMS driver details and receipt manifests.',
              },
            ].map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="rounded-3xl bg-slate-50 border border-slate-200 p-6 space-y-4 hover:shadow-lg transition-all hover:-translate-y-1 group"
                >
                  <div className="h-12 w-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 font-heading">{pillar.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{pillar.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          6. SERVICE DELIVERABLES & LIVE BREED PRICE CATALOG
          ==================================================================== */}
      <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200" id="price-directory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-4 py-1.5 rounded-full">
                Commercial Hatchery Price List
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
                Current Estimated Day-Old Chicks Price in Nigeria
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Review current pricing estimates and commercial production specifications across all primary poultry strains. Rates are updated every Sunday and Wednesday.
              </p>
            </div>
            <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-2xl px-5 py-3 shadow-sm shrink-0">
              <Clock className="h-4 w-4 text-emerald-700" />
              <span className="text-xs sm:text-sm font-semibold text-slate-800">
                Monday &amp; Thursday Dispatch Cycles
              </span>
            </div>
          </div>

          {/* Independent Multi-Hatchery Distribution Policy */}
          <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-4 sm:p-5 mb-8 text-left flex items-start gap-3.5">
            <ShieldCheck className="h-5 w-5 text-emerald-700 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              <strong className="text-slate-900 font-bold block mb-0.5">Independent Multi-Hatchery Distribution Policy:</strong>
              D-AminGrow distributes all certified commercial parent-stock lineages in Nigeria—broilers, pullets, cockerels, turkeys, and noilers. We do not operate our own proprietary strain, nor do we prioritize one commercial lineage over another. Every breed has distinct production benefits engineered by international geneticists; our role is to objectively supply genuine first-generation allocations directly from Nigeria’s tier-1 accredited primary hatcheries (Zartech, Amo, Chi, Supreme, Sayed) matched to your farm’s climate and production target.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BREED_PRICE_DIRECTORY.map((breed) => (
              <div
                key={breed.id}
                className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-7 space-y-5 flex flex-col justify-between hover:shadow-xl hover:border-emerald-300 transition-all group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                      {breed.category}
                    </span>
                    <span className="text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
                      {breed.badge}
                    </span>
                  </div>

                  <div className="w-full h-44 relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                    <Image
                      src={breed.image}
                      alt={`${breed.name} price in nigeria`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold font-heading text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {breed.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      Strains: <span className="text-slate-800">{breed.strain}</span>
                    </p>
                  </div>

                  {/* Price Block */}
                  <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-1">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-emerald-900 font-semibold">Estimated Carton Rate:</span>
                      <strong className="text-base sm:text-lg font-extrabold text-emerald-900 font-heading">
                        {breed.pricePerCartonEstimated}
                      </strong>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-600 pt-1 border-t border-emerald-200/50">
                      <span>Rate Per Bird:</span>
                      <span className="font-semibold text-slate-800">{breed.pricePerBirdEstimated}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 pt-0.5">
                      Packaging: <strong className="text-slate-700">{breed.cartonCount}</strong>
                    </div>
                  </div>

                  {/* Production Metrics */}
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Target Harvest/Yield:</span>
                      <strong className="text-slate-900 font-semibold">{breed.harvestMetric}</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Feed Efficiency:</span>
                      <strong className="text-slate-900 font-semibold">{breed.fcrOrYield}</strong>
                    </div>
                    <div className="pt-1">
                      <span className="text-[11px] text-slate-400 block mb-1">Partner Hatcheries:</span>
                      <div className="flex flex-wrap gap-1">
                        {breed.hatcheries.map((h, hIdx) => (
                          <span key={hIdx} className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-2.5">
                  <Link
                    href={breed.href}
                    className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white text-xs font-bold py-3 px-4 rounded-xl shadow-md transition-all"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Inquire Current Hatch Rate</span>
                  </Link>
                  <Link
                    href={breed.href}
                    className="w-full flex items-center justify-center gap-1.5 text-xs font-bold text-slate-700 hover:text-emerald-700 py-1 transition-colors"
                  >
                    <span>View Full Breed Details</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Quick Estimate Card */}
          <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold font-heading text-slate-900">
                  Quick Batch Cost &amp; 50% Deposit Calculator
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Estimate your flock allocation cost and required reservation deposit to lock your cartons.
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full w-fit">
                Zenith Bank 1017894562
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="breed-select" className="text-xs font-bold text-slate-700 block mb-2">Select Poultry Breed</label>
                <select
                  id="breed-select"
                  value={selectedBreed}
                  onChange={(e) => setSelectedBreed(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-3 text-sm text-slate-900 bg-slate-50 focus:border-emerald-500 focus:bg-white transition-all"
                >
                  <option value="broilers">Commercial Broilers (Ross 308 / Cobb 500)</option>
                  <option value="pullets">Commercial Layer Pullets (ISA Brown / Hy-Line)</option>
                  <option value="turkeys">Foreign Hybrid Turkey Poults</option>
                  <option value="noilers">Dual-Purpose AMO Noiler</option>
                  <option value="cockerels">Commercial Layer Cockerels</option>
                </select>
              </div>

              <div>
                <label htmlFor="carton-count" className="text-xs font-bold text-slate-700 block mb-2">Number of Cartons</label>
                <input
                  id="carton-count"
                  type="number"
                  min="1"
                  max="100"
                  value={cartonQuantity}
                  onChange={(e) => setCartonQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full rounded-xl border border-slate-300 p-3 text-sm text-slate-900 bg-slate-50 focus:border-emerald-500 focus:bg-white transition-all"
                />
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Total Birds: {selectedBreed === 'turkeys' ? cartonQuantity * 30 : cartonQuantity * 51} chicks (with buffer)
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 text-white flex flex-col justify-between">
                <div>
                  <span className="text-xs text-slate-400 block">50% Commitment Deposit</span>
                  <strong className="text-xl sm:text-2xl font-extrabold text-emerald-400 font-heading">
                    ₦{depositRequired.toLocaleString()}
                  </strong>
                </div>
                <div className="text-[11px] text-slate-400 mt-2 flex justify-between">
                  <span>Est. Total: ₦{estimatedCost.toLocaleString()}</span>
                  <a
                    href={`https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20want%20to%20book%20${cartonQuantity}%20cartons%20of%20${activeBreed.name}.%20Estimated%20total%20is%20NGN%20${estimatedCost.toLocaleString()}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 font-bold hover:underline"
                  >
                    Lock Slot &rarr;
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          7. PROCESS BREAKDOWN: 5-STEP BOOKING & DISPATCH TIMELINE
          ==================================================================== */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-4 py-1.5 rounded-full">
              Seamless Logistics Flow
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              The 5-Step Hatchery Reservation &amp; Interstate Waybill Timeline
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Experience transparent commercial booking from initial breed inquiry to motor park depot handover.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              {
                num: '01',
                title: 'Live Rate Confirmation',
                desc: 'Contact our sales desk to confirm current hatch prices and open crate slots across CHI, Amo, Zartech, and Supreme.',
                icon: MessageCircle,
              },
              {
                num: '02',
                title: '50% Commitment Deposit',
                desc: 'Transfer 50% reservation deposit to Zenith Bank (1017894562, D-AminGrow Agric Ltd) before Saturday 12PM or Tuesday 5PM cutoffs.',
                icon: DollarSign,
              },
              {
                num: '03',
                title: 'Incubation & Pull Check',
                desc: 'Chicks hatch in Petersime bio-secure incubators, undergo 98%+ vent sexing, automated Marek’s injection, and 50+1 packaging.',
                icon: Feather,
              },
              {
                num: '04',
                title: 'Prompt Waybill Alert',
                desc: 'Receive your driver contact number, vehicle plate number, and official motor park waybill receipt via WhatsApp on dispatch morning.',
                icon: Truck,
              },
              {
                num: '05',
                title: 'Depot Reception & Brooding',
                desc: 'Collect cartons within 2 hours of arrival, conduct a 360-degree unboxing video check, and transfer chicks into 32°C–35°C pens.',
                icon: Thermometer,
              },
            ].map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="rounded-3xl bg-slate-50 border border-slate-200 p-6 space-y-4 hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-extrabold font-heading text-emerald-700/80">
                        {step.num}
                      </span>
                      <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 font-heading">{step.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          8. 3 UNIQUE INFORMATION GAIN SECTIONS
          ==================================================================== */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-[#041008] text-white border-b border-emerald-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-4 py-1.5 rounded-full">
              Field Intelligence
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
              3 Information Gain Insights Competitors Do Not Disclose
            </h2>
            <p className="text-base text-slate-300 leading-relaxed">
              Real poultry profitability is won on operational details, not glossy brochure claims.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Info Gain 1 */}
            <div className="rounded-3xl bg-white/5 border border-white/10 p-7 space-y-4 hover:border-emerald-500/40 transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Scale className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold font-heading text-white">
                  The True Landed Cost Per Bird Formula
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Never evaluate chick prices solely by hatchery gate quotes. A carton bought from an uncertified broker at ₦95,000 that arrives with 6 mortalities and 5 runts yields only 39 harvestable birds—putting your actual cost at ₦2,435 per bird. In contrast, a certified 50+1 carton at ₦105,000 delivering 50 thriving birds places your real cost at ₦2,100 per bird with higher FCR efficiency.
                </p>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-emerald-300">
                <strong>Formula:</strong> True Cost = (Invoice Total + Interstate Waybill) / Survived Week-1 Birds.
              </div>
            </div>

            {/* Info Gain 2 */}
            <div className="rounded-3xl bg-white/5 border border-white/10 p-7 space-y-4 hover:border-emerald-500/40 transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold font-heading text-white">
                  Counterfeit Box Detection &amp; Seal Audit
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Authentic factory cartons from CHI, Zartech, and Amo utilize custom-branded fiber tape with embedded security fibers, not generic brown packaging tape. Furthermore, genuine chicks exhibit dry, completely closed navels without protruding black scabs, clean pink hocks, and rapid 3-second upright righting reflexes when placed on their backs.
                </p>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-amber-300">
                <strong>Inspection Rule:</strong> Never accept a carton with double tape layers or punctured side air vents.
              </div>
            </div>

            {/* Info Gain 3 */}
            <div className="rounded-3xl bg-white/5 border border-white/10 p-7 space-y-4 hover:border-emerald-500/40 transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-2xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold font-heading text-white">
                  Monday vs Thursday Pricing Dynamics
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Hatcheries set eggs based on 21-day advance projections. Monday dispatches experience the highest national order volumes from weekend buyers, creating tighter allocations. Thursday runs frequently provide smoother transit conditions at interstate motor park terminals, lower ambient roadway heat, and faster vehicle dispatch departures.
                </p>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-blue-300">
                <strong>Strategic Advice:</strong> If brooding in northern states with long transit times, Thursday dispatches minimize weekend transit congestion.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          9. "WE MAY NOT BE RIGHT FOR YOU IF..." (HONEST QUALIFICATION)
          ==================================================================== */}
      <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white border border-slate-200 p-8 sm:p-12 shadow-sm space-y-8">
            <div className="max-w-3xl space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-800 bg-rose-100 px-4 py-1.5 rounded-full">
                Expectation Setting
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 tracking-tight">
                When D-AminGrow May Not Be the Right Solution for Your Farm
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                To maintain genuine biosecurity, factory carton seals, and live cargo guarantees, we enforce commercial rules that may not align with every buyer&apos;s preference.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'If You Need Retail Quantities Below 1 Full Carton',
                  desc: 'We do not sell 10, 20, or loose chicks. Opening factory-sealed cartons to split birds introduces fatal pathogens and breaks the 50+1 livability guarantee.',
                },
                {
                  title: 'If You Insist on Pay-on-Delivery (POD)',
                  desc: 'Hatcheries do not pull live day-old chicks from incubators without secured bank commitments. Live biological goods cannot be returned if a buyer is unreachable.',
                },
                {
                  title: 'If You Cannot Collect Within 2 Hours of Depot Arrival',
                  desc: 'Leaving chicks in crowded motor park baggage rooms leads to severe dehydration and hypothermia. Fast pickup is an essential condition for transit claims.',
                },
                {
                  title: 'If You Seek Cheap Undocumented Backyard Crosses',
                  desc: 'We supply only certified grandparent and parent-stock lineages with traceable pedigree certificates. We do not stock unvetted backyard mixtures.',
                },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 p-5 rounded-2xl bg-rose-50/50 border border-rose-200/70">
                  <XCircle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-slate-900 font-heading">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          10. CASE STUDY & VERIFIED COMMERCIAL RESULTS
          ==================================================================== */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-4 py-1.5 rounded-full">
              Commercial Verification
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Verified Production Records From Nigerian Poultry Operators
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Read documented performance data and multi-year supply reliability reports from commercial operations across Nigeria.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CLIENT_FARMS.map((farm) => {
              const flockBadge = (farm.flockType ?? '').split('&')[0]?.trim() ?? farm.flockType;
              return (
                <div
                  key={farm.id}
                  className="rounded-3xl bg-slate-50 border border-slate-200 p-6 flex flex-col justify-between hover:border-emerald-300 hover:bg-white transition-all group hover:shadow-lg"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
                        {flockBadge}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">{farm.relationshipYears}</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 font-heading group-hover:text-emerald-700 transition-colors">
                      {farm.name}
                    </h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                      <span>{farm.location}</span>
                    </p>
                    <p className="text-xs text-slate-600 italic leading-relaxed pt-2 border-t border-slate-200">
                      &ldquo;{farm.testimonialSnippet}&rdquo;
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                    <span>Flock Capacity</span>
                    <strong className="text-slate-800 font-bold">{farm.flockCapacity}</strong>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/reviews"
              className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
            >
              <span>Explore detailed farmer case studies and harvest logs</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ====================================================================
          11. FAQ ACCORDION (SCHEMA SYNCHRONIZED)
          ==================================================================== */}
      <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200" id="faqs">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-4 py-1.5 rounded-full">
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Common Questions About Day-Old Chicks Price in Nigeria
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Transparent answers regarding weekly price setting, bank deposits, and nationwide waybill dispatch.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isOpen ? 'border-emerald-500 bg-emerald-50/20 shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base sm:text-lg font-bold text-slate-900 font-heading">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 text-emerald-700 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          12. SOFT CLOSING CTA & CORPORATE BANK ALLOTMENT CARD
          ==================================================================== */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-slate-900 via-[#06170d] to-slate-950 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-4 py-1.5 rounded-full">
                Locked Monday &amp; Thursday Allotment
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight leading-tight">
                Reserve Your Batch Allocation &amp; Lock Today&apos;s Hatchery Rates
              </h2>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                Connect directly with our commercial livestock desk. We confirm today&apos;s active rates across CHI, Amo, Zartech, and Supreme, verify available crates, and coordinate your motor park arrival.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <a
                  href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20am%20ready%20to%20lock%20my%20Day-Old%20Chicks%20booking%20and%20transfer%20my%2050%25%20commitment%20deposit."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-7 py-4 rounded-xl text-base shadow-xl shadow-[#25D366]/20 hover:-translate-y-0.5 transition-all"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>WhatsApp Booking Desk</span>
                </a>
                <a
                  href="tel:+2348139169402"
                  className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-6 py-4 rounded-xl border border-white/15 hover:-translate-y-0.5 transition-all text-sm"
                >
                  <Phone className="h-4 w-4" />
                  <span>Call +234 813 916 9402</span>
                </a>
              </div>
            </div>

            {/* Corporate Bank Card */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl bg-white/10 border border-white/15 p-6 sm:p-8 space-y-4 backdrop-blur-md">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    Official Corporate Account
                  </span>
                  <span className="text-xs text-slate-300 font-semibold">Zenith Bank Plc</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">Account Number</span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-mono text-2xl sm:text-3xl font-extrabold text-white tracking-wider">
                      1017894562
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyBank}
                      className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/20 hover:bg-emerald-500/30 px-3 py-1.5 rounded-lg border border-emerald-500/40 transition-all"
                    >
                      {copiedBank ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                      <span>{copiedBank ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>
                <div className="text-xs text-slate-300 pt-2 border-t border-white/10 space-y-1">
                  <div>Account Name: <strong className="text-white">D-AminGrow Agric Ltd</strong></div>
                  <div>Branch: <span className="text-slate-300">Commercial Agribusiness Division</span></div>
                  <div className="text-amber-300 text-[11px] pt-1">
                    * Please include your farm name or phone number in payment narration.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          13. INTERNAL LINKING & TECHNICAL RESOURCES HUB
          ==================================================================== */}
      <section className="py-12 bg-slate-100 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1">
              <h3 className="text-base font-bold font-heading text-slate-900">
                Explore Essential Poultry Tools &amp; Calculators
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Access calibrated brooding guides, pen space planners, and flock vaccination schedules.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/day-old-chicks/broilers"
                className="text-xs font-semibold text-slate-700 bg-white hover:text-emerald-700 hover:border-emerald-300 border border-slate-300 px-4 py-2.5 rounded-xl transition-all"
              >
                Broiler Strains &amp; FCR
              </Link>
              <Link
                href="/day-old-chicks/pullets"
                className="text-xs font-semibold text-slate-700 bg-white hover:text-emerald-700 hover:border-emerald-300 border border-slate-300 px-4 py-2.5 rounded-xl transition-all"
              >
                Layer Pullet Records
              </Link>
              <Link
                href="/day-old-chicks/turkeys"
                className="text-xs font-semibold text-slate-700 bg-white hover:text-emerald-700 hover:border-emerald-300 border border-slate-300 px-4 py-2.5 rounded-xl transition-all"
              >
                Turkey Poults Guide
              </Link>
              <Link
                href="/vaccination-program"
                className="text-xs font-semibold text-slate-700 bg-white hover:text-emerald-700 hover:border-emerald-300 border border-slate-300 px-4 py-2.5 rounded-xl transition-all"
              >
                Vaccination Calendar
              </Link>
              <Link
                href="/calculators/brooder"
                className="text-xs font-semibold text-emerald-800 bg-emerald-100/80 hover:bg-emerald-200 border border-emerald-300 px-4 py-2.5 rounded-xl transition-all"
              >
                Brooder Heat Calculator
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
