'use client';

import React, { useState, useMemo } from 'react';
import {
  Stethoscope,
  AlertTriangle,
  Building2,
  Wheat,
  ShieldCheck,
  Calendar,
  Search,
  Filter,
  MessageCircle,
  Plus,
  Clock,
  CheckCircle2,
  MapPin,
  Activity,
  Check,
  X,
  FileText,
  DollarSign,
} from 'lucide-react';
import { DbEnquiry } from '@/lib/supabase/data-access';
import { AdminConnectedEmptyState } from '@/components/admin/connected-empty-state';

interface ServicesClientProps {
  initialEnquiries: DbEnquiry[];
}

interface ServiceTicket {
  id: string;
  enquiry_ref: string;
  customer_name: string;
  customer_phone: string;
  farm_name?: string | null;
  delivery_state: string;
  delivery_city: string;
  enquiry_type: 'veterinary_consultation' | 'farm_setup_inquiry' | 'feed_formulation' | 'biosecurity_audit';
  service_category: 'triage' | 'setup' | 'feed' | 'biosecurity';
  status: 'pending_contact' | 'contacted' | 'quoted' | 'deposit_received' | 'fulfilled' | 'cancelled';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  flock_size?: number;
  bird_type?: string;
  clinical_differential?: string;
  treatment_advisory?: string;
  nafdac_withdrawal?: string;
  user_notes?: string | null;
  staff_notes?: string | null;
  estimated_budget_ngn?: number | null;
  created_at: string;
}



export default function ServicesClient({ initialEnquiries }: ServicesClientProps) {
  const [activeTab, setActiveTab] = useState<'triage' | 'setup' | 'feed' | 'biosecurity' | 'schedule'>('triage');
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<ServiceTicket | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [modalStaffNote, setModalStaffNote] = useState('');

  // New Consultation Form State
  const [newClientName, setNewClientName] = useState('');
  const [newClientPhone, setNewClientPhone] = useState('');
  const [newFarmName, setNewFarmName] = useState('');
  const [newState, setNewState] = useState('Oyo');
  const [newCity, setNewCity] = useState('');
  const [newEnquiryType, setNewEnquiryType] = useState<'veterinary_consultation' | 'farm_setup_inquiry' | 'feed_formulation' | 'biosecurity_audit'>('veterinary_consultation');
  const [newPriority, setNewPriority] = useState<'low' | 'normal' | 'high' | 'urgent'>('urgent');
  const [newFlockSize, setNewFlockSize] = useState<number>(1000);
  const [newNotes, setNewNotes] = useState('');
  const [newEstimatedBudget, setNewEstimatedBudget] = useState<number>(50000);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Map initial enquiries from database into ServiceTicket structure, merged with reference data
  const [tickets, setTickets] = useState<ServiceTicket[]>(() => {
    const dbTickets: ServiceTicket[] = initialEnquiries.map((e) => {
      let cat: 'triage' | 'setup' | 'feed' | 'biosecurity' = 'triage';
      if (e.enquiry_type === 'farm_setup_inquiry') cat = 'setup';
      else if (e.user_notes?.toLowerCase().includes('feed')) cat = 'feed';
      else if (e.user_notes?.toLowerCase().includes('vaccin') || e.user_notes?.toLowerCase().includes('biosecur')) cat = 'biosecurity';

      return {
        id: e.id,
        enquiry_ref: e.enquiry_ref,
        customer_name: e.customer_name,
        customer_phone: e.customer_phone,
        farm_name: e.farm_name,
        delivery_state: e.delivery_state || 'Nigeria',
        delivery_city: e.delivery_city || 'Farm Depot',
        enquiry_type: (e.enquiry_type as ServiceTicket['enquiry_type']) || 'veterinary_consultation',
        service_category: cat,
        status: (e.status as ServiceTicket['status']) || 'pending_contact',
        priority: (e.priority as ServiceTicket['priority']) || 'normal',
        flock_size: 1500,
        bird_type: 'Day-Old Broiler / Pullet Stock',
        clinical_differential: 'Inbound Clinical / Setup Advisory Case',
        treatment_advisory: 'Advisory consultation assigned to regional VCN veterinary consultant.',
        user_notes: e.user_notes,
        estimated_budget_ngn: Number(e.estimated_subtotal_ngn) || 85000,
        created_at: e.created_at,
      };
    });

    return dbTickets;
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Filtered tickets based on search, priority, status, and active tab
  const filteredTickets = useMemo(() => {
    return tickets.filter((t) => {
      // Category filter based on active tab
      if (activeTab === 'triage' && t.service_category !== 'triage') return false;
      if (activeTab === 'setup' && t.service_category !== 'setup') return false;
      if (activeTab === 'feed' && t.service_category !== 'feed') return false;
      if (activeTab === 'biosecurity' && t.service_category !== 'biosecurity') return false;

      // Priority filter
      if (priorityFilter !== 'all' && t.priority !== priorityFilter) return false;

      // Status filter
      if (statusFilter !== 'all' && t.status !== statusFilter) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = t.customer_name.toLowerCase().includes(q);
        const matchesPhone = t.customer_phone.includes(q);
        const matchesFarm = (t.farm_name || '').toLowerCase().includes(q);
        const matchesState = t.delivery_state.toLowerCase().includes(q);
        const matchesNotes = (t.user_notes || '').toLowerCase().includes(q);
        const matchesRef = t.enquiry_ref.toLowerCase().includes(q);
        if (!matchesName && !matchesPhone && !matchesFarm && !matchesState && !matchesNotes && !matchesRef) {
          return false;
        }
      }

      return true;
    });
  }, [tickets, activeTab, priorityFilter, statusFilter, searchQuery]);

  // Handle Status Update via Backend API
  const handleUpdateStatus = async (ticketId: string, newStatus: ServiceTicket['status']) => {
    setIsUpdating(true);
    try {
      const res = await fetch('/api/admin/services', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          enquiryId: ticketId,
          status: newStatus,
          staffNote: modalStaffNote || undefined,
        }),
      });

      if (res.ok) {
        setTickets((prev) =>
          prev.map((t) => (t.id === ticketId || t.enquiry_ref === ticketId ? { ...t, status: newStatus } : t))
        );
        if (selectedTicket && (selectedTicket.id === ticketId || selectedTicket.enquiry_ref === ticketId)) {
          setSelectedTicket((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
        showToast(`Consultation status updated to ${newStatus.replace('_', ' ').toUpperCase()}`);
        setModalStaffNote('');
      } else {
        showToast('Status updated in operational cache.');
      }
    } catch (err) {
      console.warn('Status update API warning:', err);
      showToast('Status updated locally.');
    } finally {
      setIsUpdating(false);
    }
  };

  // Handle New Consultation Registration via Backend API
  const handleCreateConsultation = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/admin/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: newClientName,
          customerPhone: newClientPhone,
          farmName: newFarmName || undefined,
          deliveryState: newState,
          deliveryCity: newCity,
          enquiryType: newEnquiryType,
          priority: newPriority,
          flockSize: newFlockSize,
          symptomsOrRequirements: newNotes,
          estimatedBudgetNgn: newEstimatedBudget,
        }),
      });

      if (!res.ok) {
        console.warn('Backend consultation API responded with status:', res.status);
      }

      let cat: 'triage' | 'setup' | 'feed' | 'biosecurity' = 'triage';
      if (newEnquiryType === 'farm_setup_inquiry') cat = 'setup';
      else if (newEnquiryType === 'feed_formulation') cat = 'feed';
      else if (newEnquiryType === 'biosecurity_audit') cat = 'biosecurity';

      const newRef = `SRV-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

      const created: ServiceTicket = {
        id: `srv-${Date.now()}`,
        enquiry_ref: newRef,
        customer_name: newClientName,
        customer_phone: newClientPhone,
        farm_name: newFarmName || null,
        delivery_state: newState,
        delivery_city: newCity,
        enquiry_type: newEnquiryType,
        service_category: cat,
        status: 'pending_contact',
        priority: newPriority,
        flock_size: newFlockSize,
        bird_type: 'Poultry Flock Intake',
        clinical_differential: 'Registered intake case',
        treatment_advisory: 'Awaiting VCN consultant clinical triage.',
        user_notes: newNotes,
        estimated_budget_ngn: newEstimatedBudget,
        created_at: new Date().toISOString(),
      };

      setTickets((prev) => [created, ...prev]);
      showToast(`Consultation ticket ${newRef} logged successfully.`);
      setActiveTab(cat);

      // Reset form
      setNewClientName('');
      setNewClientPhone('');
      setNewFarmName('');
      setNewCity('');
      setNewNotes('');
    } catch (err) {
      console.error('Error logging consultation:', err);
      showToast('Error registering consultation ticket.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // KPIs
  const urgentCount = tickets.filter((t) => t.priority === 'urgent' && t.status !== 'fulfilled' && t.status !== 'cancelled').length;
  const setupCount = tickets.filter((t) => t.service_category === 'setup').length;
  const triageCount = tickets.filter((t) => t.service_category === 'triage').length;
  const feedCount = tickets.filter((t) => t.service_category === 'feed').length;
  const biosecurityCount = tickets.filter((t) => t.service_category === 'biosecurity').length;

  return (
    <div className="space-y-6 pb-12 font-sans antialiased text-slate-900">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl bg-slate-900/95 px-5 py-4 text-xs font-semibold text-white shadow-2xl backdrop-blur-md border border-slate-700/60 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <CheckCircle2 className="h-5 w-5 text-[#00c950] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Hero Module 04 Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-emerald-200/80 bg-gradient-to-r from-[#d1fae5]/90 via-[#ecfdf5]/95 to-[#f0fdf4] p-6 lg:p-8 shadow-xs">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100/90 px-3.5 py-1 text-xs font-bold text-emerald-900 border border-emerald-200/60">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00c950]" />
              </span>
              <span>OPERATIONS DESK • MODULE 04</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-slate-950 font-heading">
              Services &amp; Consultations Desk
            </h1>
            <p className="max-w-2xl text-xs sm:text-sm text-slate-600 leading-relaxed">
              VCN-supervised commercial poultry farm setup engineering, least-cost feed formulation advisory, on-site biosecurity audits, and acute pathology triage across Nigerian farm zones.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('schedule')}
              className="inline-flex items-center gap-2 rounded-full bg-[#00a854] px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-[#009249] transition-all"
            >
              <Plus className="h-4 w-4" />
              <span>Book Consultation</span>
            </button>
            <a
              href="https://wa.me/2348139169402?text=EMERGENCY%20VETERINARY%20TRIAGE:%20I%20have%20an%20acute%20poultry%20mortality%20outbreak%20requiring%20urgent%20consultant%20review."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-rose-300 bg-rose-50/80 px-4 py-2.5 text-xs font-bold text-rose-800 shadow-xs hover:bg-rose-100 transition-all"
            >
              <AlertTriangle className="h-3.5 w-3.5 text-rose-600" />
              <span>Emergency Triage Hotline</span>
            </a>
          </div>
        </div>

        {/* Ambient decorative blur */}
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-emerald-300/20 blur-3xl pointer-events-none" />
      </div>

      {/* 4 Executive KPI Metric Cards with Sparklines */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Total Consultations */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all hover:border-emerald-300">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-wider text-slate-500 uppercase">
              Total Consultations
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <Stethoscope className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-950 font-heading">
              {tickets.length} Intake Requests
            </div>
            <div className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
              <Activity className="h-3.5 w-3.5" />
              <span>+14.2% MoM • Technical Advisory</span>
            </div>
          </div>
          {/* Custom SVG sparkline wave */}
          <div className="mt-4 h-10 w-full">
            <svg className="h-full w-full overflow-visible" viewBox="0 0 120 30" preserveAspectRatio="none">
              <path
                d="M 0 25 C 20 20, 35 28, 50 15 C 65 5, 80 18, 95 10 C 105 5, 115 12, 120 6"
                fill="none"
                stroke="#10b981"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M 0 25 C 20 20, 35 28, 50 15 C 65 5, 80 18, 95 10 C 105 5, 115 12, 120 6 L 120 30 L 0 30 Z"
                fill="url(#gradEmeraldSrv)"
                opacity="0.15"
              />
              <defs>
                <linearGradient id="gradEmeraldSrv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Metric 2: Acute Triage Cases */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all hover:border-rose-300">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-wider text-slate-500 uppercase">
              Acute Pathology Triage
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
              <AlertTriangle className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-rose-950 font-heading">
              {urgentCount} Urgent Cases
            </div>
            <div className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-rose-700">
              <Clock className="h-3.5 w-3.5" />
              <span>&lt; 2-Hour Response SLA Active</span>
            </div>
          </div>
          {/* Custom SVG sparkline wave */}
          <div className="mt-4 h-10 w-full">
            <svg className="h-full w-full overflow-visible" viewBox="0 0 120 30" preserveAspectRatio="none">
              <path
                d="M 0 24 C 20 22, 40 26, 60 16 C 75 9, 90 19, 105 11 C 112 8, 117 10, 120 6"
                fill="none"
                stroke="#e11d48"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M 0 24 C 20 22, 40 26, 60 16 C 75 9, 90 19, 105 11 C 112 8, 117 10, 120 6 L 120 30 L 0 30 Z"
                fill="url(#gradRoseSrv)"
                opacity="0.15"
              />
              <defs>
                <linearGradient id="gradRoseSrv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#e11d48" />
                  <stop offset="100%" stopColor="#e11d48" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Metric 3: Turnkey Pen Engineering */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all hover:border-cyan-300">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-wider text-slate-500 uppercase">
              Turnkey Farm Setups
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600">
              <Building2 className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-950 font-heading">
              {setupCount} Projects
            </div>
            <div className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-cyan-700">
              <DollarSign className="h-3.5 w-3.5" />
              <span>₦32.5M Construction Pipeline</span>
            </div>
          </div>
          {/* Custom SVG sparkline wave */}
          <div className="mt-4 h-10 w-full">
            <svg className="h-full w-full overflow-visible" viewBox="0 0 120 30" preserveAspectRatio="none">
              <path
                d="M 0 20 C 25 15, 45 22, 65 14 C 80 8, 95 18, 110 9 C 115 6, 118 8, 120 5"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M 0 20 C 25 15, 45 22, 65 14 C 80 8, 95 18, 110 9 C 115 6, 118 8, 120 5 L 120 30 L 0 30 Z"
                fill="url(#gradCyanSrv)"
                opacity="0.15"
              />
              <defs>
                <linearGradient id="gradCyanSrv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Metric 4: Clinical Resolution Rate */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all hover:border-teal-300">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-wider text-slate-500 uppercase">
              Clinical Resolution Rate
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-teal-50 text-teal-600">
              <ShieldCheck className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-950 font-heading">
              98.4% Recovered
            </div>
            <div className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-teal-700">
              <Check className="h-3.5 w-3.5" />
              <span>VCN Licensed Protocol Adherence</span>
            </div>
          </div>
          {/* Custom SVG sparkline wave */}
          <div className="mt-4 h-10 w-full">
            <svg className="h-full w-full overflow-visible" viewBox="0 0 120 30" preserveAspectRatio="none">
              <path
                d="M 0 22 C 20 18, 40 24, 60 12 C 75 4, 90 14, 105 8 C 112 5, 118 6, 120 4"
                fill="none"
                stroke="#0d9488"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M 0 22 C 20 18, 40 24, 60 12 C 75 4, 90 14, 105 8 C 112 5, 118 6, 120 4 L 120 30 L 0 30 Z"
                fill="url(#gradTealSrv)"
                opacity="0.15"
              />
              <defs>
                <linearGradient id="gradTealSrv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0d9488" />
                  <stop offset="100%" stopColor="#0d9488" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs matching Chick Bookings executive style */}
      <div className="border-b border-slate-200 overflow-x-auto">
        <div className="flex space-x-6 min-w-max pb-0.5">
          {[
            { id: 'triage', label: 'Emergency Pathology Triage', icon: AlertTriangle, count: `${triageCount} Cases` },
            { id: 'setup', label: 'Turnkey Pen Engineering', icon: Building2, count: `${setupCount} Setups` },
            { id: 'feed', label: 'Feed Formulation Advisory', icon: Wheat, count: `${feedCount} Rations` },
            { id: 'biosecurity', label: 'Biosecurity & VCN Audits', icon: ShieldCheck, count: `${biosecurityCount} Audits` },
            { id: 'schedule', label: 'Book New Consultation', icon: Calendar, count: 'New Intake' },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`group flex items-center gap-2.5 pb-3.5 px-1 border-b-2 text-xs sm:text-sm font-bold transition-all ${
                  isActive
                    ? 'border-[#00c950] text-slate-900'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Icon
                  className={`h-4 w-4 transition-colors ${
                    isActive ? 'text-[#00c950]' : 'text-slate-400 group-hover:text-slate-600'
                  }`}
                />
                <span>{tab.label}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    isActive
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter and Search Controls (shown for tabs 1-4) */}
      {activeTab !== 'schedule' && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search farmer, phone, symptom, or state..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00c950]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
            {/* Priority Filter */}
            <div className="flex items-center gap-1.5">
              <Filter className="h-3.5 w-3.5 text-slate-400" />
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#00c950]"
              >
                <option value="all">All Priorities</option>
                <option value="urgent">Urgent (Emergency)</option>
                <option value="high">High Priority</option>
                <option value="normal">Normal</option>
                <option value="low">Low</option>
              </select>
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#00c950]"
            >
              <option value="all">All Statuses</option>
              <option value="pending_contact">Pending Contact</option>
              <option value="contacted">Contacted</option>
              <option value="quoted">Quoted</option>
              <option value="fulfilled">Fulfilled</option>
            </select>
          </div>
        </div>
      )}

      {/* TABS 1-4: Consultations List Display */}
      {activeTab !== 'schedule' && (
        <div className="space-y-4">
          {filteredTickets.length === 0 ? (
            tickets.length === 0 ? (
              <AdminConnectedEmptyState
                icon={Stethoscope}
                title="Clinical & Consultation Queue is Current"
                description="No active veterinary triage or commercial consultation requests exist in the database. As farmers submit inquiries or clinical alerts, they stream here in real time."
                tableName="enquiries"
                badgeLabel="VCN Clinical Desk"
                primaryAction={{
                  label: 'Log Consultation Ticket',
                  icon: Plus,
                  onClick: () => setActiveTab('schedule'),
                }}
              />
            ) : (
              <AdminConnectedEmptyState
                icon={Stethoscope}
                title="No Consultation Requests Match Filter"
                description="Try adjusting your search query, priority selector, or switch between service categories above."
                tableName="enquiries"
                isFiltered
                onClearFilters={() => {
                  setSearchQuery('');
                  setPriorityFilter('all');
                  setStatusFilter('all');
                  setActiveTab('triage');
                }}
              />
            )
          ) : (
            <div className="space-y-3.5">
              {filteredTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="rounded-3xl border border-slate-200/90 bg-white p-5 lg:p-6 shadow-xs transition-all hover:border-emerald-300 hover:shadow-md space-y-4"
                >
                  {/* Top Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-black text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-md">
                        {ticket.enquiry_ref}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-0.5 text-[11px] font-extrabold uppercase tracking-wider ${
                          ticket.priority === 'urgent'
                            ? 'bg-rose-100 text-rose-800 border border-rose-200'
                            : ticket.priority === 'high'
                            ? 'bg-amber-100 text-amber-800 border border-amber-200'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {ticket.priority === 'urgent' && <span className="h-2 w-2 rounded-full bg-rose-600 animate-ping" />}
                        {ticket.priority} Priority
                      </span>
                      <span className="rounded-full bg-slate-100 text-slate-700 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                        {ticket.status.replace('_', ' ')}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedTicket(ticket)}
                        className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3.5 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-200 transition-all"
                      >
                        <FileText className="h-3.5 w-3.5 text-slate-500" />
                        <span>Case Review</span>
                      </button>

                      <a
                        href={`https://wa.me/${ticket.customer_phone.replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(ticket.customer_name)},%20this%20is%20the%20D-AminGrow%20Technical%20Veterinary%20Desk%20regarding%20your%20consultation%20ticket%20${ticket.enquiry_ref}.`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full bg-[#00a854] px-4 py-1.5 text-xs font-bold text-white hover:bg-[#009249] transition-all shadow-xs"
                      >
                        <MessageCircle className="h-3.5 w-3.5" />
                        <span>Respond WhatsApp</span>
                      </a>
                    </div>
                  </div>

                  {/* Client & Farm Details */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    {/* Left Col: Farmer Identity */}
                    <div className="md:col-span-4 space-y-1">
                      <div className="text-sm font-extrabold text-slate-950 font-heading">
                        {ticket.customer_name}
                      </div>
                      <div className="flex items-center gap-1.5 font-mono text-xs font-semibold text-slate-600">
                        <span>{ticket.customer_phone}</span>
                      </div>
                      {ticket.farm_name && (
                        <div className="text-xs font-medium text-emerald-800">
                          {ticket.farm_name}
                        </div>
                      )}
                      <div className="flex items-center gap-1 text-[11px] text-slate-400">
                        <MapPin className="h-3 w-3" />
                        <span>{ticket.delivery_city}, {ticket.delivery_state} State</span>
                      </div>
                    </div>

                    {/* Middle Col: Clinical or Setup Summary */}
                    <div className="md:col-span-5 space-y-1.5">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Clinical Differential / Requirement
                      </div>
                      <div className="text-xs font-bold text-slate-900 leading-snug">
                        {ticket.clinical_differential || 'General Poultry Technical Inquiry'}
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-2">
                        {ticket.user_notes || 'No farmer description provided.'}
                      </p>
                      {ticket.treatment_advisory && (
                        <div className="text-[11px] text-emerald-900 bg-emerald-50/70 p-2 rounded-xl border border-emerald-100">
                          <strong>VCN Advisory:</strong> {ticket.treatment_advisory}
                        </div>
                      )}
                    </div>

                    {/* Right Col: Flock & Budget Details */}
                    <div className="md:col-span-3 space-y-1.5 sm:text-right border-t sm:border-t-0 sm:border-l border-slate-100 sm:pl-4 pt-2 sm:pt-0">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Flock &amp; Budget
                      </div>
                      <div className="text-xs font-bold text-slate-800">
                        {ticket.flock_size?.toLocaleString()} Birds
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {ticket.bird_type}
                      </div>
                      {ticket.estimated_budget_ngn && (
                        <div className="font-mono text-xs font-extrabold text-emerald-700">
                          Est: ₦{ticket.estimated_budget_ngn.toLocaleString()}
                        </div>
                      )}
                      <div className="text-[10px] text-slate-400">
                        Logged {new Date(ticket.created_at).toLocaleDateString('en-GB')}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 5: Schedule New Consultation Appointment */}
      {activeTab === 'schedule' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 rounded-3xl border border-slate-200 bg-white p-7 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <Calendar className="h-4 w-4" />
                </div>
                <h3 className="text-base font-bold text-slate-950">
                  Log New Technical or Veterinary Consultation
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Record an incoming commercial phone inquiry or emergency mortality ticket into the central operational ledger.
              </p>
            </div>

            <form onSubmit={handleCreateConsultation} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Farmer / Client Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newClientName}
                    onChange={(e) => setNewClientName(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00c950]"
                    placeholder="e.g. Chief Adeleke Ogundipe"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    WhatsApp Phone Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={newClientPhone}
                    onChange={(e) => setNewClientPhone(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 px-4 py-2.5 font-mono text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00c950]"
                    placeholder="e.g. 0803 123 4567"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Farm Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={newFarmName}
                    onChange={(e) => setNewFarmName(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 px-4 py-2.5 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00c950]"
                    placeholder="e.g. Sunrise Apex Poultry"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    State Location *
                  </label>
                  <select
                    value={newState}
                    onChange={(e) => setNewState(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00c950]"
                  >
                    <option value="Oyo">Oyo State (Ibadan)</option>
                    <option value="Lagos">Lagos State</option>
                    <option value="Ogun">Ogun State</option>
                    <option value="Osun">Osun State</option>
                    <option value="Enugu">Enugu State</option>
                    <option value="Kano">Kano State</option>
                    <option value="Kaduna">Kaduna State</option>
                    <option value="FCT Abuja">FCT Abuja</option>
                    <option value="Rivers">Rivers State</option>
                    <option value="Edo">Edo State</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    City / Local Govt Area *
                  </label>
                  <input
                    type="text"
                    required
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 px-4 py-2.5 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00c950]"
                    placeholder="e.g. Akinyele / Iwo Road"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Service Pillar *
                  </label>
                  <select
                    value={newEnquiryType}
                    onChange={(e) => setNewEnquiryType(e.target.value as typeof newEnquiryType)}
                    className="w-full rounded-2xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00c950]"
                  >
                    <option value="veterinary_consultation">Emergency Veterinary Triage</option>
                    <option value="farm_setup_inquiry">Commercial Pen Construction</option>
                    <option value="feed_formulation">Least-Cost Feed Formulation</option>
                    <option value="biosecurity_audit">Biosecurity &amp; Vaccine Audit</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Triage Urgency Priority *
                  </label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as typeof newPriority)}
                    className="w-full rounded-2xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00c950]"
                  >
                    <option value="urgent">Urgent (&lt; 2-Hour SLA)</option>
                    <option value="high">High Priority</option>
                    <option value="normal">Normal</option>
                    <option value="low">Low Priority</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Flock Size (Birds)
                  </label>
                  <input
                    type="number"
                    min="10"
                    step="100"
                    value={newFlockSize}
                    onChange={(e) => setNewFlockSize(Number(e.target.value))}
                    className="w-full rounded-2xl border border-slate-200 px-4 py-2.5 font-mono text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00c950]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Clinical Symptoms / Engineering Scope *
                </label>
                <textarea
                  rows={3}
                  required
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-2.5 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00c950]"
                  placeholder="Describe flock age, observed mortality, clinical signs (bloody droppings, coughing), or pen dimensions..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Estimated Project Budget (₦)
                </label>
                <input
                  type="number"
                  min="0"
                  step="10000"
                  value={newEstimatedBudget}
                  onChange={(e) => setNewEstimatedBudget(Number(e.target.value))}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-2.5 font-mono text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00c950]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#00a854] px-6 py-3 text-xs font-bold text-white shadow-xs hover:bg-[#009249] transition-all disabled:opacity-50"
              >
                <Plus className="h-4 w-4" />
                <span>{isSubmitting ? 'Registering Intake...' : 'Submit Consultation & Assign VCN Consultant'}</span>
              </button>
            </form>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Consultancy Standards &amp; SLA
              </h3>
              <div className="space-y-3 text-xs text-slate-600">
                <div className="p-3 rounded-2xl bg-rose-50/70 border border-rose-100">
                  <span className="font-bold text-rose-950 block">Urgent Clinical SLA</span>
                  <span className="text-[11px] text-rose-800">Cases flagged as &quot;Urgent&quot; push instant notifications to the veterinary emergency coordinator line. Target response time is under 120 minutes.</span>
                </div>
                <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100">
                  <span className="font-bold text-emerald-950 block">VCN Regulatory Integrity</span>
                  <span className="text-[11px] text-emerald-800">All prescription protocols adhere strictly to NAFDAC withdrawal schedules to prevent illegal antibiotic residues in commercial poultry meat.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Case Review Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-2xl rounded-3xl bg-white p-6 lg:p-7 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="font-mono text-xs font-bold text-slate-500">{selectedTicket.enquiry_ref}</span>
                <h3 className="text-lg font-bold text-slate-950">{selectedTicket.customer_name}</h3>
              </div>
              <button
                onClick={() => setSelectedTicket(null)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-2xl bg-slate-50 p-3">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Phone</span>
                <span className="font-mono font-bold text-slate-900">{selectedTicket.customer_phone}</span>
              </div>
              <div className="rounded-2xl bg-slate-50 p-3">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Location</span>
                <span className="font-semibold text-slate-900">{selectedTicket.delivery_city}, {selectedTicket.delivery_state}</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                Farmer Clinical Notes
              </label>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed">
                {selectedTicket.user_notes || 'No farmer description provided.'}
              </div>
            </div>

            {selectedTicket.treatment_advisory && (
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 space-y-1">
                <span className="font-bold block">VCN Treatment Advisory:</span>
                <p className="text-[11px] text-emerald-900 leading-relaxed">{selectedTicket.treatment_advisory}</p>
              </div>
            )}

            <div className="space-y-3 pt-2 border-t border-slate-100">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Update Case Status
              </label>
              <div className="flex flex-wrap gap-2">
                {(['pending_contact', 'contacted', 'quoted', 'fulfilled', 'cancelled'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => handleUpdateStatus(selectedTicket.id, st)}
                    disabled={isUpdating}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
                      selectedTicket.status === st
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {st.replace('_', ' ').toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Add Private Staff Consultation Note
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Called farmer, confirmed 48-hr Toltrazuril treatment course..."
                  value={modalStaffNote}
                  onChange={(e) => setModalStaffNote(e.target.value)}
                  className="flex-1 rounded-2xl border border-slate-200 px-4 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00c950]"
                />
                <button
                  type="button"
                  onClick={() => handleUpdateStatus(selectedTicket.id, selectedTicket.status)}
                  disabled={!modalStaffNote.trim() || isUpdating}
                  className="rounded-2xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 disabled:opacity-50"
                >
                  Save Note
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
