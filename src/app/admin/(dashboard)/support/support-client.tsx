'use client';

import React, { useState, useMemo, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Modal } from '@/components/ui/modal';
import { DbBooking, DbEnquiry } from '@/lib/supabase/data-access';
import {
  HelpCircle,
  CheckCircle2,
  Check,
  Clock,
  Search,
  MessageCircle,
  AlertTriangle,
  Truck,
  Thermometer,
  ShieldAlert,
  FileText,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Building,
  Plus,
  BarChart3,
  Layers,
  MapPin,
} from 'lucide-react';

export type TicketCategory =
  | 'transit_mortality'
  | 'waybill_tracking'
  | 'dosage_query'
  | 'cold_chain_check'
  | 'deposit_escrow'
  | 'arrival_inspection'
  | 'general';

export type TicketPriority = 'High' | 'Medium' | 'Low';
export type TicketStatus = 'New' | 'In Progress' | 'Escalated' | 'Resolved';

export interface DisplaySupportTicket {
  id: string;
  ticketRef: string;
  customerName: string;
  customerPhone: string;
  farmName?: string;
  deliveryState?: string;
  deliveryCity?: string;
  avatar?: string;
  category: TicketCategory;
  categoryLabel: string;
  categoryIcon: 'mortality' | 'waybill' | 'dosage' | 'coldchain' | 'escrow' | 'arrival' | 'general';
  categoryBadgeClass: string;
  categoryIconColor: string;
  subject: string;
  description: string;
  priority: TicketPriority;
  status: TicketStatus;
  timeAgo: string;
  timestamp: string;
  linkedRef?: string;
  resolutionNote?: string;
  resolvedAt?: string;
  updatedAt?: string;
}

interface SupportClientProps {
  initialEnquiries?: DbEnquiry[];
  initialBookings?: DbBooking[];
}

// Benchmark reference support tickets matching enterprise poultry operations
const REFERENCE_TICKETS: DisplaySupportTicket[] = [
  {
    id: 'tkt-01',
    ticketRef: 'TCK-202611-001',
    customerName: 'Alhaji M. Ajila',
    customerPhone: '0803 912 3456',
    farmName: 'Ajila Farm',
    deliveryState: 'Oyo',
    deliveryCity: 'Bodija, Ibadan',
    avatar: '/images/avatar-1.jpg',
    category: 'waybill_tracking',
    categoryLabel: 'Waybill Tracking',
    categoryIcon: 'waybill',
    categoryBadgeClass: 'bg-[#fff7ed] text-[#c2410c] border border-orange-200/60',
    categoryIconColor: 'text-[#ea580c]',
    subject: 'Tuesday morning chick waybill arrival at Bodija Depot',
    description:
      'Customer requesting motor park driver phone number and bus registration number for pickup of 20 cartons Broiler chicks at Ibadan Central Terminal.',
    priority: 'High',
    status: 'In Progress',
    timeAgo: '4m ago',
    timestamp: '10:48 AM',
    linkedRef: 'WYB-IB-9021',
  },
  {
    id: 'tkt-02',
    ticketRef: 'TCK-202611-002',
    customerName: 'Dr. Austin',
    customerPhone: '0805 678 9012',
    farmName: 'Dr Austin Farm',
    deliveryState: 'Ogun',
    deliveryCity: 'Sagamu',
    avatar: '/images/avatar-2.jpg',
    category: 'dosage_query',
    categoryLabel: 'VCN Clinical / Dosage',
    categoryIcon: 'dosage',
    categoryBadgeClass: 'bg-[#faf5ff] text-[#7e22ce] border border-purple-200/60',
    categoryIconColor: 'text-[#7e22ce]',
    subject: 'Clarification on Gumboro IBD water withdrawal in 34°C weather',
    description:
      'Ambient shed temp exceeding 33°C. Farmer requested protocol on reducing thirsting duration from 2 hours to 90 minutes to prevent heat stress dehydration.',
    priority: 'High',
    status: 'Escalated',
    timeAgo: '12m ago',
    timestamp: '10:40 AM',
    linkedRef: 'VET-IBD-304',
  },
  {
    id: 'tkt-03',
    ticketRef: 'TCK-202611-003',
    customerName: 'Loveday Agro',
    customerPhone: '0802 345 6789',
    farmName: 'Loveday Farm',
    deliveryState: 'Rivers',
    deliveryCity: 'Port Harcourt',
    avatar: '/images/avatar-3.jpg',
    category: 'cold_chain_check',
    categoryLabel: 'Cold Chain Check',
    categoryIcon: 'coldchain',
    categoryBadgeClass: 'bg-[#f0fdfa] text-[#0f766e] border border-teal-200/60',
    categoryIconColor: 'text-[#0d9488]',
    subject: 'Ice pack temperature check on Newcastle LaSota delivery',
    description:
      'Thermal styrofoam box arrived at PH Hub. Farmer verified ice pack condition intact with thermometer at 4°C. Requesting certificate confirmation.',
    priority: 'Low',
    status: 'Resolved',
    timeAgo: '28m ago',
    timestamp: '10:24 AM',
    linkedRef: 'MED-COLD-102',
    resolutionNote: 'Cold chain verified via photo evidence of thermometer. Approved for immediate administration.',
  },
  {
    id: 'tkt-04',
    ticketRef: 'TCK-202611-004',
    customerName: 'Emeka Nwosu',
    customerPhone: '0812 345 6789',
    farmName: 'Nwosu Farmsteads',
    deliveryState: 'Enugu',
    deliveryCity: 'Enugu Urban',
    avatar: '/images/avatar-4.jpg',
    category: 'transit_mortality',
    categoryLabel: 'Transit Mortality',
    categoryIcon: 'mortality',
    categoryBadgeClass: 'bg-[#fff1f2] text-[#e11d48] border border-rose-200/60',
    categoryIconColor: 'text-[#e11d48]',
    subject: 'Mortality report: 3 DOA chicks in box #4 out of 10 cartons',
    description:
      'Farmer submitted unboxing video showing 3 deceased chicks upon carton opening at Holy Ghost Terminal. 50:1 buffer bird covered 2; requesting 1 replacement credit.',
    priority: 'High',
    status: 'New',
    timeAgo: '35m ago',
    timestamp: '10:17 AM',
    linkedRef: 'BK-EN-8841',
  },
  {
    id: 'tkt-05',
    ticketRef: 'TCK-202611-005',
    customerName: 'Chief Adebayo Grace',
    customerPhone: '0814 567 8901',
    farmName: 'Grace Farm',
    deliveryState: 'Lagos',
    deliveryCity: 'Epe Hub',
    avatar: '/images/avatar-5.jpg',
    category: 'deposit_escrow',
    categoryLabel: 'Zenith Escrow',
    categoryIcon: 'escrow',
    categoryBadgeClass: 'bg-[#eff6ff] text-[#2563eb] border border-blue-200/60',
    categoryIconColor: 'text-[#2563eb]',
    subject: 'Deposit payment confirmation on Zenith Bank 1017894562',
    description:
      'Transferred ₦450,000 for 50 cartons Cobb 500 reservation. Awaiting automated transaction ID reconciliation from commercial desk.',
    priority: 'Medium',
    status: 'Resolved',
    timeAgo: '1h ago',
    timestamp: '09:50 AM',
    linkedRef: 'ZEN-TXN-491',
    resolutionNote: 'Zenith Bank clearing reconciled. Deposit status marked VERIFIED in operations database.',
  },
  {
    id: 'tkt-06',
    ticketRef: 'TCK-202611-006',
    customerName: 'Anita Farm Limited',
    customerPhone: '0809 876 5432',
    farmName: 'Anita Farm',
    deliveryState: 'Osun',
    deliveryCity: 'Osogbo Depot',
    avatar: '/images/avatar-6.jpg',
    category: 'arrival_inspection',
    categoryLabel: 'Arrival Inspection',
    categoryIcon: 'arrival',
    categoryBadgeClass: 'bg-[#ecfdf5] text-[#059669] border border-emerald-200/60',
    categoryIconColor: 'text-[#059669]',
    subject: 'Venting and beak conformity validation on 15 boxes Chi Broiler',
    description:
      'Inspected day-old chicks on arrival at Olaiya Terminal. Average weight measured at 41g, navel healing clean. Confirming receipt handover signature.',
    priority: 'Low',
    status: 'Resolved',
    timeAgo: '2h ago',
    timestamp: '08:45 AM',
    linkedRef: 'BK-OS-2041',
    resolutionNote: 'Handover manifest signed by transit lead and farmer representative.',
  },
];

export default function SupportClient({ initialEnquiries = [], initialBookings = [] }: SupportClientProps) {
  // Merge live enquiries/bookings with benchmark tickets
  const initialTickets = useMemo<DisplaySupportTicket[]>(() => {
    const list: DisplaySupportTicket[] = [...REFERENCE_TICKETS];

    // Convert live enquiries with clinical or support intent into live tickets
    initialEnquiries.forEach((enq, idx) => {
      const isSupportRelated =
        enq.enquiry_type === 'clinical_support' ||
        enq.enquiry_type === 'general_inquiry' ||
        (enq.user_notes && /mortality|delay|waybill|vaccine|help|problem|dead|sick/i.test(enq.user_notes));

      if (isSupportRelated) {
        const id = `live-enq-${enq.id || idx}`;
        // Deduplicate
        if (!list.some((t) => t.id === id || t.ticketRef === enq.enquiry_ref)) {
          let category: TicketCategory = 'general';
          let categoryLabel = 'Client Support';
          let categoryIcon: DisplaySupportTicket['categoryIcon'] = 'general';
          let categoryBadgeClass = 'bg-[#f1f5f9] text-[#475569] border border-slate-200';
          let categoryIconColor = 'text-[#475569]';

          if (/mortality|dead|die|loss/i.test(enq.user_notes || '')) {
            category = 'transit_mortality';
            categoryLabel = 'Transit Mortality';
            categoryIcon = 'mortality';
            categoryBadgeClass = 'bg-[#fff1f2] text-[#e11d48] border border-rose-200/60';
            categoryIconColor = 'text-[#e11d48]';
          } else if (/waybill|bus|terminal|driver|delivery/i.test(enq.user_notes || '')) {
            category = 'waybill_tracking';
            categoryLabel = 'Waybill Tracking';
            categoryIcon = 'waybill';
            categoryBadgeClass = 'bg-[#fff7ed] text-[#c2410c] border border-orange-200/60';
            categoryIconColor = 'text-[#ea580c]';
          } else if (/vaccine|dose|gumboro|lasota|medication|vet/i.test(enq.user_notes || '')) {
            category = 'dosage_query';
            categoryLabel = 'VCN Clinical / Dosage';
            categoryIcon = 'dosage';
            categoryBadgeClass = 'bg-[#faf5ff] text-[#7e22ce] border border-purple-200/60';
            categoryIconColor = 'text-[#7e22ce]';
          }

          const status: TicketStatus =
            enq.status === 'fulfilled' || enq.status === 'resolved'
              ? 'Resolved'
              : enq.status === 'contacted'
              ? 'In Progress'
              : 'New';

          const priority: TicketPriority =
            enq.priority === 'urgent' || enq.priority === 'high' ? 'High' : enq.priority === 'low' ? 'Low' : 'Medium';

          list.unshift({
            id,
            ticketRef: `TCK-${enq.enquiry_ref.replace(/^ENQ-?/, '') || Math.floor(1000 + Math.random() * 9000)}`,
            customerName: enq.customer_name,
            customerPhone: enq.customer_phone,
            farmName: enq.farm_name || undefined,
            deliveryState: enq.delivery_state,
            deliveryCity: enq.delivery_city,
            avatar: `/images/avatar-${((idx % 6) + 1)}.jpg`,
            category,
            categoryLabel,
            categoryIcon,
            categoryBadgeClass,
            categoryIconColor,
            subject: enq.user_notes ? enq.user_notes.slice(0, 75) + '...' : `Live enquiry from ${enq.customer_name}`,
            description: enq.user_notes || 'Live incoming inquiry awaiting customer service triage.',
            priority,
            status,
            timeAgo: 'Just now',
            timestamp: new Date(enq.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            linkedRef: enq.enquiry_ref,
          });
        }
      }
    });

    // Also include live bookings that have waybills or active transit status
    initialBookings.forEach((b, bIdx) => {
      if (b.assigned_waybill_ref && !list.some((t) => t.linkedRef === b.assigned_waybill_ref)) {
        list.push({
          id: `live-bk-${b.id || bIdx}`,
          ticketRef: `TCK-WYB-${b.booking_ref.slice(-4)}`,
          customerName: b.customer_name,
          customerPhone: b.customer_phone,
          farmName: b.farm_name || undefined,
          deliveryState: b.delivery_state,
          deliveryCity: b.destination_hub,
          avatar: `/images/avatar-${((bIdx % 6) + 1)}.jpg`,
          category: 'waybill_tracking',
          categoryLabel: 'Waybill Tracking',
          categoryIcon: 'waybill',
          categoryBadgeClass: 'bg-[#fff7ed] text-[#c2410c] border border-orange-200/60',
          categoryIconColor: 'text-[#ea580c]',
          subject: `Interstate dispatch waybill: ${b.cartons_count} cartons to ${b.destination_hub}`,
          description: `Consignment booked with ${b.hatchery_name || 'Designated Hatchery'}. Assigned waybill reference ${b.assigned_waybill_ref}. Awaiting arrival confirmation from farmer.`,
          priority: 'Medium',
          status: b.booking_status === 'delivered' ? 'Resolved' : 'In Progress',
          timeAgo: 'Today',
          timestamp: new Date(b.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          linkedRef: b.assigned_waybill_ref,
        });
      }
    });

    return list;
  }, [initialEnquiries, initialBookings]);

  // State
  const [tickets, setTickets] = useState<DisplaySupportTicket[]>(initialTickets);
  const [activeTab, setActiveTab] = useState<'All' | 'New' | 'In Progress' | 'Escalated' | 'Resolved'>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTicket, setSelectedTicket] = useState<DisplaySupportTicket | null>(null);
  const [isNewTicketModalOpen, setIsNewTicketModalOpen] = useState(false);
  const [isProtocolModalOpen, setIsProtocolModalOpen] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [statusFeedback, setStatusFeedback] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [selectedTicketIds, setSelectedTicketIds] = useState<string[]>([]);
  const [staffNoteInput, setStaffNoteInput] = useState<string>('');

  // New ticket form state
  const [newTicketForm, setNewTicketForm] = useState({
    customerName: '',
    customerPhone: '',
    farmName: '',
    category: 'transit_mortality' as TicketCategory,
    priority: 'High' as TicketPriority,
    subject: '',
    description: '',
    linkedRef: '',
  });

  // Filtered tickets
  const filteredTickets = useMemo(() => {
    return tickets.filter((t) => {
      // Tab filter
      if (activeTab !== 'All' && t.status !== activeTab) {
        return false;
      }
      // Category filter
      if (selectedCategory !== 'all' && t.category !== selectedCategory) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          t.ticketRef.toLowerCase().includes(q) ||
          t.customerName.toLowerCase().includes(q) ||
          t.customerPhone.toLowerCase().includes(q) ||
          (t.farmName && t.farmName.toLowerCase().includes(q)) ||
          t.subject.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          (t.linkedRef && t.linkedRef.toLowerCase().includes(q));
        if (!matches) return false;
      }
      return true;
    });
  }, [tickets, activeTab, selectedCategory, searchQuery]);

  // Pagination
  const paginatedTickets = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredTickets.slice(startIndex, startIndex + pageSize);
  }, [filteredTickets, currentPage, pageSize]);

  // Statistics
  const stats = useMemo(() => {
    const total = tickets.length;
    const newCount = tickets.filter((t) => t.status === 'New').length;
    const inProgressCount = tickets.filter((t) => t.status === 'In Progress').length;
    const escalatedCount = tickets.filter((t) => t.status === 'Escalated').length;
    const resolvedCount = tickets.filter((t) => t.status === 'Resolved').length;
    const mortalityCount = tickets.filter((t) => t.category === 'transit_mortality').length;
    const resolutionRate = total > 0 ? Math.round((resolvedCount / total) * 100) : 94;

    return {
      total,
      newCount,
      inProgressCount,
      escalatedCount,
      resolvedCount,
      mortalityCount,
      resolutionRate,
    };
  }, [tickets]);

  // Handle status update
  const handleUpdateStatus = useCallback(
    async (ticketId: string, newStatus: TicketStatus, resolutionNote?: string) => {
      setIsUpdatingStatus(true);
      setStatusFeedback(null);

      // Optimistic update
      setTickets((prev) =>
        prev.map((t) => {
          if (t.id === ticketId) {
            return {
              ...t,
              status: newStatus,
              resolutionNote: resolutionNote || t.resolutionNote,
              resolvedAt: newStatus === 'Resolved' ? new Date().toISOString() : t.resolvedAt,
            };
          }
          return t;
        })
      );

      if (selectedTicket && selectedTicket.id === ticketId) {
        setSelectedTicket((prev) =>
          prev
            ? {
                ...prev,
                status: newStatus,
                resolutionNote: resolutionNote || prev.resolutionNote,
                resolvedAt: newStatus === 'Resolved' ? new Date().toISOString() : prev.resolvedAt,
              }
            : null
        );
      }

      try {
        const apiStatusMap: Record<TicketStatus, 'open' | 'investigating' | 'escalated' | 'resolved'> = {
          New: 'open',
          'In Progress': 'investigating',
          Escalated: 'escalated',
          Resolved: 'resolved',
        };

        const res = await fetch('/api/admin/support', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ticketId,
            newStatus: apiStatusMap[newStatus],
            staffNote: staffNoteInput.trim() || undefined,
            resolution: resolutionNote || undefined,
          }),
        });

        if (res.ok) {
          setStatusFeedback(`Ticket status updated to ${newStatus} successfully.`);
          setStaffNoteInput('');
        } else {
          setStatusFeedback(`Status updated locally.`);
        }
      } catch {
        setStatusFeedback(`Status updated in local session.`);
      } finally {
        setIsUpdatingStatus(false);
      }
    },
    [selectedTicket, staffNoteInput]
  );

  // Handle create new ticket
  const handleCreateTicket = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!newTicketForm.customerName || !newTicketForm.customerPhone || !newTicketForm.subject) {
        alert('Please fill in Customer Name, Phone, and Subject.');
        return;
      }

      const generatedRef = `TCK-${new Date().toISOString().slice(0, 7).replace('-', '')}-${Math.floor(
        Math.random() * 900 + 100
      )}`;

      let categoryBadgeClass = 'bg-[#f1f5f9] text-[#475569] border border-slate-200';
      let categoryIconColor = 'text-[#475569]';
      let categoryIcon: DisplaySupportTicket['categoryIcon'] = 'general';
      let categoryLabel = 'General Inquiries';

      switch (newTicketForm.category) {
        case 'transit_mortality':
          categoryLabel = 'Transit Mortality';
          categoryIcon = 'mortality';
          categoryBadgeClass = 'bg-[#fff1f2] text-[#e11d48] border border-rose-200/60';
          categoryIconColor = 'text-[#e11d48]';
          break;
        case 'waybill_tracking':
          categoryLabel = 'Waybill Tracking';
          categoryIcon = 'waybill';
          categoryBadgeClass = 'bg-[#fff7ed] text-[#c2410c] border border-orange-200/60';
          categoryIconColor = 'text-[#ea580c]';
          break;
        case 'dosage_query':
          categoryLabel = 'VCN Clinical / Dosage';
          categoryIcon = 'dosage';
          categoryBadgeClass = 'bg-[#faf5ff] text-[#7e22ce] border border-purple-200/60';
          categoryIconColor = 'text-[#7e22ce]';
          break;
        case 'cold_chain_check':
          categoryLabel = 'Cold Chain Check';
          categoryIcon = 'coldchain';
          categoryBadgeClass = 'bg-[#f0fdfa] text-[#0f766e] border border-teal-200/60';
          categoryIconColor = 'text-[#0d9488]';
          break;
        case 'deposit_escrow':
          categoryLabel = 'Zenith Escrow';
          categoryIcon = 'escrow';
          categoryBadgeClass = 'bg-[#eff6ff] text-[#2563eb] border border-blue-200/60';
          categoryIconColor = 'text-[#2563eb]';
          break;
        case 'arrival_inspection':
          categoryLabel = 'Arrival Inspection';
          categoryIcon = 'arrival';
          categoryBadgeClass = 'bg-[#ecfdf5] text-[#059669] border border-emerald-200/60';
          categoryIconColor = 'text-[#059669]';
          break;
      }

      const newTicket: DisplaySupportTicket = {
        id: `tkt-${Date.now()}`,
        ticketRef: generatedRef,
        customerName: newTicketForm.customerName,
        customerPhone: newTicketForm.customerPhone,
        farmName: newTicketForm.farmName || undefined,
        avatar: `/images/avatar-${Math.floor(Math.random() * 6 + 1)}.jpg`,
        category: newTicketForm.category,
        categoryLabel,
        categoryIcon,
        categoryBadgeClass,
        categoryIconColor,
        subject: newTicketForm.subject,
        description: newTicketForm.description || newTicketForm.subject,
        priority: newTicketForm.priority,
        status: 'New',
        timeAgo: 'Just now',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        linkedRef: newTicketForm.linkedRef || undefined,
      };

      // Prepend optimistic ticket
      setTickets((prev) => [newTicket, ...prev]);
      setIsNewTicketModalOpen(false);

      // Reset form
      setNewTicketForm({
        customerName: '',
        customerPhone: '',
        farmName: '',
        category: 'transit_mortality',
        priority: 'High',
        subject: '',
        description: '',
        linkedRef: '',
      });

      // Persist to backend API
      try {
        await fetch('/api/admin/support', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newTicketForm),
        });
      } catch (err) {
        console.warn('Network sync failed:', err);
      }
    },
    [newTicketForm]
  );

  // Handle Export CSV
  const handleExportCSV = useCallback(() => {
    const headers = [
      'Ticket Ref',
      'Customer Name',
      'Phone',
      'Farm Name',
      'Category',
      'Subject',
      'Priority',
      'Status',
      'Linked Ref',
      'Created Timestamp',
    ];

    const rows = filteredTickets.map((t) => [
      t.ticketRef,
      `"${t.customerName.replace(/"/g, '""')}"`,
      `"${t.customerPhone}"`,
      `"${(t.farmName || '').replace(/"/g, '""')}"`,
      t.categoryLabel,
      `"${t.subject.replace(/"/g, '""')}"`,
      t.priority,
      t.status,
      t.linkedRef || '',
      t.timestamp,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `D-AminGrow-Support-Tickets-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [filteredTickets]);

  // Render category icon
  const renderCategoryIcon = (icon: DisplaySupportTicket['categoryIcon']) => {
    switch (icon) {
      case 'mortality':
        return <ShieldAlert className="h-3 w-3 shrink-0" />;
      case 'waybill':
        return <Truck className="h-3 w-3 shrink-0" />;
      case 'dosage':
        return <AlertTriangle className="h-3 w-3 shrink-0" />;
      case 'coldchain':
        return <Thermometer className="h-3 w-3 shrink-0" />;
      case 'escrow':
        return <FileText className="h-3 w-3 shrink-0" />;
      case 'arrival':
        return <CheckCircle2 className="h-3 w-3 shrink-0" />;
      default:
        return <HelpCircle className="h-3 w-3 shrink-0" />;
    }
  };

  return (
    <div className="space-y-6 pb-12 font-body">
      {/* =========================================================================
          TOP BANNER: Agri-Commercial Operations Header matching attached designs
      ========================================================================== */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#062413] via-[#093d1f] to-[#041a0d] border border-emerald-500/20 shadow-xl">
        {/* Background farm hero banner layer */}
        <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none">
          <Image
            src="/images/enquiry-hero-banner.jpg"
            alt="Poultry Infrastructure"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        {/* Ambient lighting effect */}
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />
        <div className="absolute -left-24 -bottom-24 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 p-6 md:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            {/* Tag Badge */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/20 px-3 py-1 text-[11px] font-bold text-white/90 uppercase tracking-widest backdrop-blur-md">
                <HelpCircle className="h-3.5 w-3.5 text-[#2ee571]" />
                Customer Care · Module 09
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#00a854]/20 border border-[#00a854]/40 px-3 py-1 text-[11px] font-semibold text-[#2ee571]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2ee571] animate-pulse" />
                VCN Triage Live
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/20 px-3 py-1 text-[11px] font-semibold text-white/70">
                50:1 Buffer Enforced
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight font-heading">
              Customer Support &amp;{' '}
              <span className="text-[#2ee571]">Issue Resolution Desk</span>
            </h1>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              Track post-dispatch arrival inquiries, transit mortality escalations, waybill tracking, cold chain validation,
              and 24/7 veterinary clinical support across Nigeria.
            </p>
          </div>

          {/* Top Banner Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => setIsProtocolModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 px-4 py-2.5 text-xs font-bold text-white transition-all backdrop-blur-md hover:scale-[1.02] shadow-sm"
            >
              <BarChart3 className="h-4 w-4 text-[#2ee571]" />
              <span>Mortality Protocol</span>
            </button>

            <button
              onClick={() => setIsNewTicketModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#2ee571] to-[#00a854] hover:from-[#35f07a] hover:to-[#00bf5f] px-5 py-2.5 text-xs font-black text-[#062413] transition-all hover:scale-[1.02] shadow-lg shadow-emerald-950/40"
            >
              <Plus className="h-4 w-4 stroke-[3]" />
              <span>New Support Ticket</span>
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          4 BILLION-DOLLAR TOP KPI CARDS (Wave Graphic Backgrounds)
      ========================================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Support Tickets */}
        <div className="relative overflow-hidden rounded-3xl bg-white border border-slate-200/90 p-5 shadow-sm hover:shadow-md transition-shadow group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 font-heading">
              Total Tickets
            </span>
            <div className="h-9 w-9 rounded-2xl bg-emerald-50 text-[#00a854] flex items-center justify-center">
              <Layers className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 font-heading tracking-tight">
              {stats.total.toLocaleString()}
            </span>
            <span className="inline-flex items-center text-xs font-extrabold text-emerald-600">
              <span>↑ 12.5%</span>
            </span>
          </div>
          <p className="mt-1 text-[11px] text-slate-400 font-medium">vs last week · All logged interactions</p>

          {/* SVG Wave Graphic matching attached UI */}
          <div className="mt-2 h-7 w-full overflow-hidden opacity-30 group-hover:opacity-45 transition-opacity">
            <svg viewBox="0 0 120 28" className="w-full h-full text-emerald-500 fill-current" preserveAspectRatio="none">
              <path d="M0,20 C30,8 60,25 90,12 C105,6 115,18 120,15 L120,28 L0,28 Z" />
            </svg>
          </div>
        </div>

        {/* Card 2: Pending Response */}
        <div className="relative overflow-hidden rounded-3xl bg-white border border-amber-200/90 p-5 shadow-sm hover:shadow-md transition-shadow group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-amber-700 font-heading">
              Pending Response
            </span>
            <div className="h-9 w-9 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-amber-950 font-heading tracking-tight">
              {stats.newCount + stats.inProgressCount}
            </span>
            <span className="inline-flex items-center text-xs font-extrabold text-amber-600">
              <span>↑ 8.3%</span>
            </span>
          </div>
          <p className="mt-1 text-[11px] text-amber-700 font-medium">Awaiting staff reply &amp; driver dispatch</p>

          {/* Amber SVG Wave Graphic */}
          <div className="mt-2 h-7 w-full overflow-hidden opacity-35 group-hover:opacity-50 transition-opacity">
            <svg viewBox="0 0 120 28" className="w-full h-full text-amber-500 fill-current" preserveAspectRatio="none">
              <path d="M0,15 C25,24 55,10 85,22 C100,26 110,12 120,18 L120,28 L0,28 Z" />
            </svg>
          </div>
        </div>

        {/* Card 3: Resolved */}
        <div className="relative overflow-hidden rounded-3xl bg-white border border-cyan-200/90 p-5 shadow-sm hover:shadow-md transition-shadow group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-cyan-800 font-heading">
              Resolved This Month
            </span>
            <div className="h-9 w-9 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
              <CheckCircle2 className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-cyan-950 font-heading tracking-tight">
              {stats.resolvedCount}
            </span>
            <span className="inline-flex items-center text-xs font-extrabold text-cyan-700">
              <span>↑ 14.8%</span>
            </span>
          </div>
          <p className="mt-1 text-[11px] text-cyan-700 font-medium">{stats.resolutionRate}% satisfactory resolution</p>

          {/* Cyan SVG Wave Graphic */}
          <div className="mt-2 h-7 w-full overflow-hidden opacity-35 group-hover:opacity-50 transition-opacity">
            <svg viewBox="0 0 120 28" className="w-full h-full text-cyan-500 fill-current" preserveAspectRatio="none">
              <path d="M0,22 C20,10 50,26 80,14 C100,8 112,20 120,16 L120,28 L0,28 Z" />
            </svg>
          </div>
        </div>

        {/* Card 4: Transit Mortality Escalations */}
        <div className="relative overflow-hidden rounded-3xl bg-white border border-purple-200/90 p-5 shadow-sm hover:shadow-md transition-shadow group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-purple-800 font-heading">
              Transit Mortalities
            </span>
            <div className="h-9 w-9 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <ShieldAlert className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-purple-950 font-heading tracking-tight">
              {stats.mortalityCount}
            </span>
            <span className="inline-flex items-center text-xs font-extrabold text-purple-600">
              <span>↓ 2.1%</span>
            </span>
          </div>
          <p className="mt-1 text-[11px] text-purple-700 font-medium">Under VCN review &amp; insurance credit</p>

          {/* Purple SVG Wave Graphic */}
          <div className="mt-2 h-7 w-full overflow-hidden opacity-35 group-hover:opacity-50 transition-opacity">
            <svg viewBox="0 0 120 28" className="w-full h-full text-purple-500 fill-current" preserveAspectRatio="none">
              <path d="M0,18 C30,26 65,12 95,20 C108,24 114,14 120,16 L120,28 L0,28 Z" />
            </svg>
          </div>
        </div>
      </div>

      {/* =========================================================================
          FILTER TAB BAR & SEARCH ROW
      ========================================================================== */}
      <div className="flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-4">
        {/* Status Tab Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 xl:pb-0 scrollbar-none">
          {[
            { id: 'All', label: 'All Tickets', count: stats.total },
            { id: 'New', label: 'New / Open', count: stats.newCount },
            { id: 'In Progress', label: 'In Progress', count: stats.inProgressCount },
            { id: 'Escalated', label: 'Escalated to Vet', count: stats.escalatedCount },
            { id: 'Resolved', label: 'Resolved', count: stats.resolvedCount },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as typeof activeTab);
                  setCurrentPage(1);
                }}
                className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-xs font-extrabold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#062413] text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-black ${
                    isActive ? 'bg-[#00a854] text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search & Category Filter Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search Input */}
          <div className="relative flex-1 sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by ticket ref, customer, phone, farm..."
              className="w-full rounded-2xl border border-slate-200 bg-white pl-9 pr-4 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#00a854] focus:border-transparent transition-all"
            />
          </div>

          {/* Category Dropdown */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="appearance-none rounded-2xl border border-slate-200 bg-white pl-3.5 pr-8 py-2 text-xs font-extrabold text-slate-700 shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#00a854] cursor-pointer"
            >
              <option value="all">All Categories</option>
              <option value="transit_mortality">Transit Mortality</option>
              <option value="waybill_tracking">Waybill Tracking</option>
              <option value="dosage_query">VCN Clinical / Dosage</option>
              <option value="cold_chain_check">Cold Chain Check</option>
              <option value="deposit_escrow">Zenith Escrow</option>
              <option value="arrival_inspection">Arrival Inspection</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
          </div>

          {/* Export CSV button */}
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 px-3.5 py-2 text-xs font-bold text-slate-700 shadow-2xs transition-all"
          >
            <Download className="h-3.5 w-3.5 text-slate-500" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          MAIN LAYOUT: Left Table Column (8 cols) + Right 3 Widgets Column (4 cols)
      ========================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Comprehensive Support Ticket Queue Table */}
        <div className="lg:col-span-8 xl:col-span-9 rounded-3xl bg-white border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-[#fafcfb] text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                  <th className="py-3.5 pl-5 pr-2 w-10">
                    <input
                      type="checkbox"
                      checked={
                        paginatedTickets.length > 0 &&
                        paginatedTickets.every((t) => selectedTicketIds.includes(t.id))
                      }
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedTicketIds(paginatedTickets.map((t) => t.id));
                        } else {
                          setSelectedTicketIds([]);
                        }
                      }}
                      className="rounded border-slate-300 text-[#00a854] focus:ring-[#00a854] cursor-pointer"
                    />
                  </th>
                  <th className="py-3.5 px-3">Customer</th>
                  <th className="py-3.5 px-3">Issue &amp; Details</th>
                  <th className="py-3.5 px-3">Category</th>
                  <th className="py-3.5 px-3">Priority</th>
                  <th className="py-3.5 px-3">Status</th>
                  <th className="py-3.5 px-3">Time</th>
                  <th className="py-3.5 pr-5 pl-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/80">
                {paginatedTickets.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-16 text-center text-slate-400">
                      <div className="max-w-xs mx-auto space-y-2">
                        <HelpCircle className="h-8 w-8 text-slate-300 mx-auto" />
                        <p className="font-extrabold text-slate-700 text-sm">No support tickets found</p>
                        <p className="text-xs text-slate-400">Try adjusting your active filter or search keywords.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  paginatedTickets.map((t) => {
                    const isSelected = selectedTicketIds.includes(t.id);
                    return (
                      <tr
                        key={t.id}
                        className={`hover:bg-slate-50/70 transition-colors ${
                          isSelected ? 'bg-emerald-50/30' : ''
                        }`}
                      >
                        {/* Checkbox */}
                        <td className="py-3.5 pl-5 pr-2">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedTicketIds((prev) => [...prev, t.id]);
                              } else {
                                setSelectedTicketIds((prev) => prev.filter((id) => id !== t.id));
                              }
                            }}
                            className="rounded border-slate-300 text-[#00a854] focus:ring-[#00a854] cursor-pointer"
                          />
                        </td>

                        {/* Customer Info */}
                        <td className="py-3.5 px-3 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="relative h-9 w-9 rounded-full overflow-hidden bg-slate-100 ring-1 ring-slate-200 shrink-0">
                              {t.avatar ? (
                                <Image
                                  src={t.avatar}
                                  alt={t.customerName}
                                  fill
                                  className="object-cover"
                                />
                              ) : (
                                <div className="h-full w-full flex items-center justify-center font-bold text-slate-600 text-xs">
                                  {t.customerName.slice(0, 2).toUpperCase()}
                                </div>
                              )}
                            </div>
                            <div>
                              <div className="font-extrabold text-slate-900 text-xs leading-tight">
                                {t.customerName}
                              </div>
                              <div className="text-[11px] font-mono text-slate-400">{t.customerPhone}</div>
                              {t.farmName && (
                                <div className="text-[10px] text-emerald-700 font-semibold">{t.farmName}</div>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Issue Subject & Excerpt */}
                        <td className="py-3.5 px-3 max-w-xs">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <span className="font-mono text-[10px] font-extrabold text-slate-400">
                              {t.ticketRef}
                            </span>
                            {t.linkedRef && (
                              <span className="rounded bg-slate-100 text-slate-600 px-1.5 py-0.2 text-[9px] font-mono font-bold">
                                {t.linkedRef}
                              </span>
                            )}
                          </div>
                          <p className="font-bold text-slate-800 text-xs leading-snug line-clamp-1">{t.subject}</p>
                          <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{t.description}</p>
                        </td>

                        {/* Category Badge */}
                        <td className="py-3.5 px-3 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold ${t.categoryBadgeClass}`}
                          >
                            {renderCategoryIcon(t.categoryIcon)}
                            <span>{t.categoryLabel}</span>
                          </span>
                        </td>

                        {/* Priority Badge */}
                        <td className="py-3.5 px-3 whitespace-nowrap">
                          {t.priority === 'High' ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 border border-rose-200 px-2.5 py-1 text-[11px] font-extrabold text-rose-600">
                              <span>↑</span>
                              <span>High</span>
                            </span>
                          ) : t.priority === 'Medium' ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 border border-orange-200 px-2.5 py-1 text-[11px] font-extrabold text-orange-600">
                              <span>↑</span>
                              <span>Medium</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-[11px] font-extrabold text-emerald-600">
                              <span>↓</span>
                              <span>Low</span>
                            </span>
                          )}
                        </td>

                        {/* Status Badge */}
                        <td className="py-3.5 px-3 whitespace-nowrap">
                          {t.status === 'New' ? (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-200/80 px-2.5 py-1 text-[11px] font-bold text-blue-700">
                              <span className="h-2 w-2 rounded-full bg-blue-600 shrink-0" />
                              <span>New</span>
                            </span>
                          ) : t.status === 'In Progress' ? (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200/80 px-2.5 py-1 text-[11px] font-bold text-amber-700">
                              <span className="h-2 w-2 rounded-full bg-amber-500 shrink-0 animate-pulse" />
                              <span>In Progress</span>
                            </span>
                          ) : t.status === 'Escalated' ? (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-50 border border-purple-200/80 px-2.5 py-1 text-[11px] font-bold text-purple-700">
                              <ShieldAlert className="h-3 w-3 text-purple-600" />
                              <span>Escalated</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
                              <Check className="h-3 w-3 text-emerald-600 stroke-[3]" />
                              <span>Resolved</span>
                            </span>
                          )}
                        </td>

                        {/* Time */}
                        <td className="py-3.5 px-3 whitespace-nowrap">
                          <div className="font-extrabold text-slate-800 text-xs">{t.timeAgo}</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">{t.timestamp}</div>
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 pr-5 pl-3 text-right whitespace-nowrap">
                          <div className="inline-flex items-center gap-1.5">
                            <button
                              onClick={() => setSelectedTicket(t)}
                              className="inline-flex items-center gap-1 rounded-xl bg-[#062413] hover:bg-[#0a351d] text-white px-3 py-1.5 text-xs font-bold transition-all shadow-2xs hover:shadow-xs"
                            >
                              <span>View</span>
                              <ChevronDown className="h-3 w-3 text-slate-300" />
                            </button>

                            <a
                              href={`https://wa.me/${t.customerPhone.replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(
                                t.customerName
                              )},%20this%20is%20D-AminGrow%20Support%20regarding%20ticket%20${t.ticketRef}:%20${encodeURIComponent(
                                t.subject
                              )}.`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center h-7 w-7 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#128C7E] transition-colors"
                              title="Chat on WhatsApp"
                            >
                              <MessageCircle className="h-3.5 w-3.5" />
                            </a>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Table Pagination Bar */}
          <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 bg-[#fcfdfd]">
            <div>
              Showing <strong className="text-slate-800">{paginatedTickets.length > 0 ? (currentPage - 1) * pageSize + 1 : 0}–{Math.min(currentPage * pageSize, filteredTickets.length)}</strong> of{' '}
              <strong className="text-slate-800">{filteredTickets.length}</strong> tickets
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-40"
                aria-label="Previous page"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              {Array.from({ length: Math.ceil(filteredTickets.length / pageSize) || 1 })
                .slice(0, 5)
                .map((_, i) => {
                  const pNum = i + 1;
                  const isCurrent = currentPage === pNum;
                  return (
                    <button
                      key={pNum}
                      onClick={() => setCurrentPage(pNum)}
                      className={`h-8 w-8 rounded-full font-bold flex items-center justify-center text-xs transition-colors ${
                        isCurrent
                          ? 'bg-[#00a854] text-white shadow-xs'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {pNum}
                    </button>
                  );
                })}

              <button
                onClick={() =>
                  setCurrentPage((p) =>
                    p < Math.ceil(filteredTickets.length / pageSize) ? p + 1 : p
                  )
                }
                disabled={currentPage >= Math.ceil(filteredTickets.length / pageSize)}
                className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-40"
                aria-label="Next page"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Rows Per Page */}
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Rows:</span>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="rounded-xl border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 focus:outline-none"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>
          </div>
        </div>

        {/* =========================================================================
            RIGHT COLUMN: 3 Executive Widgets matching attached design language
        ========================================================================== */}
        <div className="lg:col-span-4 xl:col-span-3 space-y-4">
          {/* Widget 1: Support SLA & Resolution Insights */}
          <div className="rounded-3xl bg-white border border-slate-200/90 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-lg bg-[#dcfce7] flex items-center justify-center text-[#15803d]">
                  <BarChart3 className="h-4 w-4" />
                </div>
                <h3 className="font-black text-slate-900 text-sm font-heading">Support Insights</h3>
              </div>
              <div className="text-[11px] font-bold text-slate-500 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1">
                This Month
              </div>
            </div>

            {/* Circular Gauge */}
            <div className="flex items-center justify-between gap-4 pt-1">
              <div className="relative h-28 w-28 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke="#f1f5f9" strokeWidth="10" fill="none" />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#00a854"
                    strokeWidth="10"
                    strokeDasharray={`${2 * Math.PI * 40 * (stats.resolutionRate / 100)} ${
                      2 * Math.PI * 40 * (1 - stats.resolutionRate / 100)
                    }`}
                    strokeLinecap="round"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#f59e0b"
                    strokeWidth="10"
                    strokeDasharray={`${2 * Math.PI * 40 * 0.05} ${2 * Math.PI * 40 * 0.95}`}
                    strokeDashoffset={`-${2 * Math.PI * 40 * (stats.resolutionRate / 100)}`}
                    fill="none"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-xl font-extrabold text-slate-900 font-heading leading-none">
                    {stats.resolutionRate}%
                  </span>
                  <span className="text-[9px] font-semibold text-slate-400 mt-0.5">Resolved Rate</span>
                </div>
              </div>

              {/* Legend numbers */}
              <div className="space-y-2 text-xs flex-1">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[#00a854] shrink-0" />
                    <span className="font-semibold text-slate-600 text-[11px]">Resolved</span>
                  </div>
                  <span className="font-extrabold text-slate-900 text-xs font-mono">{stats.resolvedCount}</span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[#f59e0b] shrink-0" />
                    <span className="font-semibold text-slate-600 text-[11px]">Pending</span>
                  </div>
                  <span className="font-extrabold text-slate-900 text-xs font-mono">
                    {stats.newCount + stats.inProgressCount}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[#7e22ce] shrink-0" />
                    <span className="font-semibold text-slate-600 text-[11px]">VCN Review</span>
                  </div>
                  <span className="font-extrabold text-slate-900 text-xs font-mono">{stats.escalatedCount}</span>
                </div>
              </div>
            </div>

            {/* Daily Velocity Activity Bars (16 vertical green bars) */}
            <div className="pt-2 border-t border-slate-100">
              <div className="text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-wider flex items-center justify-between">
                <span>Daily Resolution Velocity</span>
                <span className="text-[#00a854]">Average &lt; 24 Mins</span>
              </div>
              <div className="flex items-end justify-between h-8 gap-1 px-1">
                {[4, 5, 7, 9, 6, 11, 8, 14, 12, 16, 13, 17, 15, 18, 16, 20].map((val, idx) => (
                  <div
                    key={idx}
                    className="flex-1 bg-[#00a854] rounded-t-sm hover:bg-[#008f47] transition-all"
                    style={{ height: `${(val / 20) * 100}%` }}
                    title={`Day ${idx + 1}: ${val * 5} resolved`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Widget 2: Quick Actions Desk */}
          <div className="rounded-3xl bg-white border border-slate-200/90 p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-amber-500">⚡</span>
              <h3 className="font-black text-slate-900 text-sm font-heading">Quick Actions</h3>
            </div>

            <div className="space-y-2">
              {/* Button 1: New Ticket */}
              <button
                onClick={() => setIsNewTicketModalOpen(true)}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#063319] to-[#0d592b] hover:from-[#084221] hover:to-[#116e37] text-white py-2.5 px-4 text-xs font-bold shadow-xs transition-all hover:shadow-md"
              >
                <Plus className="h-3.5 w-3.5 stroke-[3]" />
                <span>Log New Customer Ticket</span>
              </button>

              {/* Button 2: WhatsApp Desk */}
              <a
                href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%20VCN%20Support%20Desk,%20administrative%20escalation%20requested."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#128C7E] py-2.5 px-4 text-xs font-bold transition-all"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                <span>Live VCN Desk (+2348139169402)</span>
              </a>

              {/* Button 3: Interstate Dispatch Queue */}
              <Link
                href="/admin/bookings"
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#dcfce7] hover:bg-[#bbf7d0] text-[#14532d] py-2.5 px-4 text-xs font-bold transition-all"
              >
                <Truck className="h-3.5 w-3.5" />
                <span>Interstate Dispatch Queue</span>
              </Link>
            </div>
          </div>

          {/* Widget 3: Institutional Guarantee Card */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#052814] via-[#094220] to-[#052814] border border-emerald-500/20 p-5 text-white shadow-md">
            <div className="absolute right-1 bottom-1 h-28 w-24 overflow-hidden pointer-events-none opacity-90">
              <Image
                src="/images/enquiry-chicken.jpg"
                alt="Poultry Guarantee"
                width={96}
                height={112}
                className="object-contain"
              />
            </div>

            <div className="relative z-10 max-w-[65%] space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 block">
                50:1 Policy
              </span>
              <h4 className="text-sm font-extrabold leading-tight font-heading">
                Turn Mortalities into Loyal Clients
              </h4>
              <p className="text-[11px] text-emerald-100/70 leading-relaxed">
                Free buffer birds included with institutional partner hatcheries.
              </p>
              <button
                onClick={() => setIsProtocolModalOpen(true)}
                className="mt-2 inline-flex items-center gap-1 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 px-3 py-1.5 text-[10px] font-bold text-white transition-all backdrop-blur-sm"
              >
                <span>Read Protocol</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          MODAL 1: TICKET DETAIL & ACTION DESK MODAL
      ========================================================================== */}
      {selectedTicket && (
        <Modal
          isOpen={!!selectedTicket}
          onClose={() => {
            setSelectedTicket(null);
            setStatusFeedback(null);
          }}
          title={`Ticket ${selectedTicket.ticketRef}`}
          description={`Customer: ${selectedTicket.customerName} · Logged ${selectedTicket.timeAgo}`}
          maxWidth="lg"
        >
          <div className="space-y-5 pt-1 text-slate-800">
            {/* Status Alert Banner */}
            {statusFeedback && (
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 flex items-center justify-between">
                <span>{statusFeedback}</span>
                <button onClick={() => setStatusFeedback(null)} className="text-emerald-600 font-bold">
                  ✕
                </button>
              </div>
            )}

            {/* Customer & Ticket Overview Card */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 rounded-full overflow-hidden bg-slate-200 shrink-0">
                    {selectedTicket.avatar ? (
                      <Image
                        src={selectedTicket.avatar}
                        alt={selectedTicket.customerName}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center font-bold text-slate-700">
                        {selectedTicket.customerName.slice(0, 2)}
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900">{selectedTicket.customerName}</h4>
                    <p className="text-xs font-mono text-slate-500">{selectedTicket.customerPhone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${selectedTicket.categoryBadgeClass}`}>
                    {renderCategoryIcon(selectedTicket.categoryIcon)}
                    <span>{selectedTicket.categoryLabel}</span>
                  </span>
                  <span className="rounded-full bg-slate-200 px-2.5 py-1 text-xs font-bold text-slate-700">
                    {selectedTicket.priority} Priority
                  </span>
                </div>
              </div>

              {/* Farm & Location badges */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200/60 text-xs text-slate-600">
                {selectedTicket.farmName && (
                  <span className="inline-flex items-center gap-1 font-semibold text-emerald-800">
                    <Building className="h-3.5 w-3.5 text-emerald-600" />
                    {selectedTicket.farmName}
                  </span>
                )}
                {(selectedTicket.deliveryCity || selectedTicket.deliveryState) && (
                  <span className="inline-flex items-center gap-1 text-slate-500">
                    <MapPin className="h-3.5 w-3.5 text-slate-400" />
                    {selectedTicket.deliveryCity ? `${selectedTicket.deliveryCity}, ` : ''}
                    {selectedTicket.deliveryState}
                  </span>
                )}
                {selectedTicket.linkedRef && (
                  <span className="inline-flex items-center gap-1 font-mono text-slate-700 bg-white border border-slate-200 px-2 py-0.5 rounded-lg">
                    Linked: {selectedTicket.linkedRef}
                  </span>
                )}
              </div>
            </div>

            {/* Issue Description */}
            <div className="space-y-1.5">
              <h5 className="font-extrabold text-xs uppercase tracking-wider text-slate-400">
                Subject &amp; Customer Statement
              </h5>
              <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
                <h4 className="font-bold text-sm text-slate-900">{selectedTicket.subject}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{selectedTicket.description}</p>
                {selectedTicket.resolutionNote && (
                  <div className="mt-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 space-y-1">
                    <span className="font-extrabold flex items-center gap-1 text-emerald-900">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                      Resolution Note:
                    </span>
                    <p>{selectedTicket.resolutionNote}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Real-time Status Changer */}
            <div className="space-y-2">
              <h5 className="font-extrabold text-xs uppercase tracking-wider text-slate-400">
                Change Ticket Status
              </h5>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['New', 'In Progress', 'Escalated', 'Resolved'] as TicketStatus[]).map((st) => {
                  const isCurrent = selectedTicket.status === st;
                  return (
                    <button
                      key={st}
                      disabled={isUpdatingStatus || isCurrent}
                      onClick={() => handleUpdateStatus(selectedTicket.id, st)}
                      className={`p-2.5 rounded-2xl text-xs font-extrabold transition-all border flex items-center justify-center gap-1.5 ${
                        isCurrent
                          ? 'bg-[#062413] text-white border-[#062413] shadow-xs'
                          : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      {st === 'Resolved' && <Check className="h-3 w-3 text-emerald-400 stroke-[3]" />}
                      {st === 'Escalated' && <ShieldAlert className="h-3 w-3 text-purple-400" />}
                      <span>{st}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Staff Internal Note & Action Field */}
            <div className="space-y-2">
              <h5 className="font-extrabold text-xs uppercase tracking-wider text-slate-400">
                Internal Staff Resolution / Audit Note
              </h5>
              <textarea
                value={staffNoteInput}
                onChange={(e) => setStaffNoteInput(e.target.value)}
                placeholder="Log internal action taken, driver name, replacement booking ref, or veterinarian advice..."
                className="w-full rounded-2xl border border-slate-200 p-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00a854] resize-none h-20"
              />
            </div>

            {/* Action Buttons Row */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
              <a
                href={`https://wa.me/${selectedTicket.customerPhone.replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(
                  selectedTicket.customerName
                )},%20this%20is%20D-AminGrow%20Support%20Desk%20following%20up%20on%20ticket%20${selectedTicket.ticketRef}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl bg-[#25D366] hover:bg-[#1ebd59] text-white font-black px-4 py-2.5 text-xs transition-all shadow-sm"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Reply via WhatsApp</span>
              </a>

              <div className="flex items-center gap-2">
                {selectedTicket.status !== 'Resolved' && (
                  <button
                    onClick={() =>
                      handleUpdateStatus(
                        selectedTicket.id,
                        'Resolved',
                        staffNoteInput.trim() || 'Issue closed satisfactorily by customer operations desk.'
                      )
                    }
                    disabled={isUpdatingStatus}
                    className="inline-flex items-center gap-1.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-4 py-2.5 text-xs transition-all shadow-sm"
                  >
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                    <span>Mark as Resolved</span>
                  </button>
                )}
                <button
                  onClick={() => setSelectedTicket(null)}
                  className="rounded-2xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* =========================================================================
          MODAL 2: LOG NEW SUPPORT TICKET MODAL
      ========================================================================== */}
      {isNewTicketModalOpen && (
        <Modal
          isOpen={isNewTicketModalOpen}
          onClose={() => setIsNewTicketModalOpen(false)}
          title="Log New Customer Support Ticket"
          description="Create a tracked customer service ticket with priority level and category assignment."
          maxWidth="lg"
        >
          <form onSubmit={handleCreateTicket} className="space-y-4 pt-1 text-slate-800">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-500 mb-1">
                  Customer Name *
                </label>
                <input
                  type="text"
                  required
                  value={newTicketForm.customerName}
                  onChange={(e) => setNewTicketForm({ ...newTicketForm, customerName: e.target.value })}
                  placeholder="e.g. Alhaji M. Ajila"
                  className="w-full rounded-2xl border border-slate-200 px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00a854]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-500 mb-1">
                  Customer Phone *
                </label>
                <input
                  type="text"
                  required
                  value={newTicketForm.customerPhone}
                  onChange={(e) => setNewTicketForm({ ...newTicketForm, customerPhone: e.target.value })}
                  placeholder="e.g. 0803 123 4567"
                  className="w-full rounded-2xl border border-slate-200 px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00a854]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-500 mb-1">
                  Farm Name
                </label>
                <input
                  type="text"
                  value={newTicketForm.farmName}
                  onChange={(e) => setNewTicketForm({ ...newTicketForm, farmName: e.target.value })}
                  placeholder="e.g. Ajila Farm Ltd"
                  className="w-full rounded-2xl border border-slate-200 px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00a854]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-500 mb-1">
                  Category *
                </label>
                <select
                  value={newTicketForm.category}
                  onChange={(e) =>
                    setNewTicketForm({ ...newTicketForm, category: e.target.value as TicketCategory })
                  }
                  className="w-full rounded-2xl border border-slate-200 px-3.5 py-2 text-xs text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-[#00a854]"
                >
                  <option value="transit_mortality">Transit Mortality</option>
                  <option value="waybill_tracking">Waybill Tracking</option>
                  <option value="dosage_query">VCN Clinical / Dosage</option>
                  <option value="cold_chain_check">Cold Chain Check</option>
                  <option value="deposit_escrow">Zenith Escrow</option>
                  <option value="arrival_inspection">Arrival Inspection</option>
                  <option value="general">General Support</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-500 mb-1">
                  Priority
                </label>
                <select
                  value={newTicketForm.priority}
                  onChange={(e) =>
                    setNewTicketForm({ ...newTicketForm, priority: e.target.value as TicketPriority })
                  }
                  className="w-full rounded-2xl border border-slate-200 px-3.5 py-2 text-xs text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-[#00a854]"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-500 mb-1">
                Linked Ref (Booking or Waybill Ref)
              </label>
              <input
                type="text"
                value={newTicketForm.linkedRef}
                onChange={(e) => setNewTicketForm({ ...newTicketForm, linkedRef: e.target.value })}
                placeholder="e.g. BK-IB-9021 or WYB-501"
                className="w-full rounded-2xl border border-slate-200 px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00a854]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-500 mb-1">
                Subject Summary *
              </label>
              <input
                type="text"
                required
                value={newTicketForm.subject}
                onChange={(e) => setNewTicketForm({ ...newTicketForm, subject: e.target.value })}
                placeholder="Brief summary of the issue or inquiry"
                className="w-full rounded-2xl border border-slate-200 px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00a854]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-500 mb-1">
                Detailed Description &amp; Farmer Notes
              </label>
              <textarea
                value={newTicketForm.description}
                onChange={(e) => setNewTicketForm({ ...newTicketForm, description: e.target.value })}
                placeholder="Provide full details on carton condition, terminal name, driver contact, or clinical symptoms..."
                className="w-full rounded-2xl border border-slate-200 p-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00a854] resize-none h-24"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsNewTicketModalOpen(false)}
                className="rounded-2xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-2xl bg-gradient-to-r from-[#2ee571] to-[#00a854] hover:from-[#35f07a] hover:to-[#00bf5f] px-5 py-2 text-xs font-black text-[#062413] shadow-md"
              >
                Create Ticket
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* =========================================================================
          MODAL 3: VCN BIOSECURITY & MORTALITY CLAIMS PROTOCOL MODAL
      ========================================================================== */}
      {isProtocolModalOpen && (
        <Modal
          isOpen={isProtocolModalOpen}
          onClose={() => setIsProtocolModalOpen(false)}
          title="VCN Standards & Transit Mortality Protocol"
          description="Institutional standards governing live day-old chick shipments across Nigeria."
          maxWidth="lg"
        >
          <div className="space-y-4 pt-1 text-xs text-slate-700 leading-relaxed">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
              <div className="flex items-center gap-2 font-black text-emerald-900 text-sm">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>50:1 Buffer Chick Rule</span>
              </div>
              <p>
                Every accredited institutional hatchery partner (Chi, Amo, Zartech, Supreme, Agrited) packages 51 chicks
                per half-carton compartment. The extra bird functions as a pre-funded buffer for transit stress.
              </p>
            </div>

            <div className="space-y-2">
              <h5 className="font-extrabold text-xs uppercase tracking-wider text-slate-800">
                Mortality Claim Verification Checklist
              </h5>
              <ul className="space-y-1.5 list-disc list-inside text-slate-600">
                <li>
                  <strong>Video Proof:</strong> Farmer must record a clear 360° unboxing video at the motor park depot
                  before leaving terminal premises.
                </li>
                <li>
                  <strong>Threshold:</strong> Claims are eligible when dead-on-arrival (DOA) birds exceed the 2% buffer
                  allowance.
                </li>
                <li>
                  <strong>Direct Credit:</strong> Validated mortalities receive direct account credit or replacement
                  allocation on the subsequent Tuesday/Thursday dispatch run.
                </li>
                <li>
                  <strong>Cold Chain Vaccines:</strong> Newcastle and Gumboro vials must register between 2°C and 8°C upon
                  handover.
                </li>
              </ul>
            </div>

            <div className="p-3 rounded-2xl bg-slate-100 text-slate-600 text-[11px]">
              For emergency clinical outbreaks, immediate triage is escalated directly to the Veterinary Council of Nigeria
              licensed consultant on duty at <strong>+234 813 916 9402</strong>.
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setIsProtocolModalOpen(false)}
                className="rounded-2xl bg-[#062413] px-5 py-2 text-xs font-bold text-white hover:bg-[#0a351d]"
              >
                Close Protocol
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
