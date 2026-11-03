'use client';

import React, { useState } from 'react';
import { AdminSidebar } from './admin-sidebar';
import { AdminTopbar } from './admin-topbar';

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f4f6f5] flex flex-col md:flex-row font-body antialiased selection:bg-emerald-500 selection:text-white">
      {/* Interactive Obsidian Sidebar */}
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Area with Sticky Topbar */}
      <div className="flex-1 flex flex-col min-w-0 md:h-screen md:overflow-y-auto">
        <AdminTopbar onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />
        <main className="flex-1 p-4 sm:p-5 lg:p-6 max-w-[1400px] w-full mx-auto space-y-5">
          {children}
        </main>
      </div>
    </div>
  );
}
