'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import {
  BrooderExportData,
  getStandardBroodingSchedule,
  formatBrooderForWhatsApp,
} from '@/lib/calculators/export-utils';
import {
  Printer,
  Share2,
  Thermometer,
  Egg,
} from 'lucide-react';

interface PrintableBroodingChartProps {
  data: BrooderExportData;
}

export function PrintableBroodingChart({ data }: PrintableBroodingChartProps) {
  const [isOpen, setIsOpen] = useState(false);
  const schedule = getStandardBroodingSchedule();
  const whatsappUrl = formatBrooderForWhatsApp(data);

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsOpen(true)}
          className="rounded-2xl border-emerald-600 text-emerald-700 hover:bg-emerald-50 font-bold text-xs flex items-center space-x-2 py-3 px-4 shadow-sm"
        >
          <Printer className="h-4 w-4" />
          <span>Print / PDF Brooding Schedule</span>
        </Button>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 rounded-2xl bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-xs py-3 px-4 transition-all shadow-sm"
        >
          <Share2 className="h-4 w-4" />
          <span>Share Plan on WhatsApp</span>
        </a>
      </div>

      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Printable Brooding Management Chart"
          description={`Customized for ${data.flockSize.toLocaleString()} ${data.birdType === 'broiler' ? 'Broiler' : 'Layer'} Chicks`}
          maxWidth="xl"
        >
          <div className="space-y-6 text-xs text-slate-800 print:text-black">
            {/* Print Header */}
            <div className="p-5 bg-gradient-to-r from-[#050E08] to-emerald-950 rounded-2xl text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs uppercase tracking-widest mb-1">
                  <Egg className="h-4 w-4" />
                  <span>D-AminGrow Agro-Allied Services</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold font-heading text-white">
                  Commercial Flock Brooding Schedule & Target Chart
                </h3>
                <p className="text-slate-300 text-xs mt-0.5">
                  Flock: {data.flockSize.toLocaleString()} {data.birdType.toUpperCase()}S · Space: {data.floorAreaSqM} m² ({data.floorAreaSqFt} sq. ft)
                </p>
              </div>

              <div className="text-left sm:text-right shrink-0">
                <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider">
                  Technical Advisory Desk
                </span>
                <span className="font-mono text-xs font-bold text-emerald-400">
                  WhatsApp: +234 813 916 9402
                </span>
              </div>
            </div>

            {/* Equipment Sizing Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Heating Units</span>
                <span className="text-base font-extrabold text-slate-900 font-heading">
                  {data.gasBrooders} Gas Heaters
                </span>
                <span className="text-[10px] text-slate-400 block">Infrared LPG Canopy</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Feed Trays</span>
                <span className="text-base font-extrabold text-slate-900 font-heading">
                  {data.feedingTrays} Starter Trays
                </span>
                <span className="text-[10px] text-slate-400 block">~80 chicks / tray</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Drinkers</span>
                <span className="text-base font-extrabold text-slate-900 font-heading">
                  {data.drinkers} Drinkers
                </span>
                <span className="text-[10px] text-slate-400 block">Bell or Fount</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Starter Feed</span>
                <span className="text-base font-extrabold text-slate-900 font-heading">
                  ~{data.starterFeedKg} kg
                </span>
                <span className="text-[10px] text-slate-400 block">~{data.starterBags25kg} bags (25kg)</span>
              </div>
            </div>

            {/* Daily Schedule Table */}
            <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900 text-white text-[11px] uppercase font-bold">
                  <tr>
                    <th className="py-3 px-4">Period</th>
                    <th className="py-3 px-4">Brooder Temp</th>
                    <th className="py-3 px-4">Lighting</th>
                    <th className="py-3 px-4">Nutrition & Water</th>
                    <th className="py-3 px-4">Management Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {schedule.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/70'}>
                      <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap">{row.dayRange}</td>
                      <td className="py-3 px-4 font-semibold text-emerald-800 whitespace-nowrap">
                        {row.targetTempCenter}
                      </td>
                      <td className="py-3 px-4 text-slate-700 whitespace-nowrap">{row.lightingHours}</td>
                      <td className="py-3 px-4 text-slate-700">{row.nutritionAndWater}</td>
                      <td className="py-3 px-4 text-slate-600 text-[11px]">{row.managementNotes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pen Wall Notice */}
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start space-x-3 text-xs text-amber-900">
              <Thermometer className="h-5 w-5 text-amber-700 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong>Pen Brooder Wall Notice: </strong>
                Hang this chart on your brooder room entry door. Read the thermometer twice daily at chick head height (5–8 cm above litter). Adjust canopy height if chicks huddle under the heater (too cold) or crowd against the brooder guard ring (too hot).
              </p>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-200">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
                className="w-full sm:w-auto text-xs text-slate-600"
              >
                Close Preview
              </Button>

              <div className="flex items-center space-x-3 w-full sm:w-auto">
                <Button
                  type="button"
                  onClick={handlePrint}
                  className="flex-1 sm:flex-none bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2.5 px-5 rounded-xl shadow flex items-center justify-center space-x-2"
                >
                  <Printer className="h-4 w-4" />
                  <span>Print Chart / Save PDF</span>
                </Button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center space-x-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-xs py-2.5 px-5 rounded-xl shadow"
                >
                  <Share2 className="h-4 w-4" />
                  <span>WhatsApp Share</span>
                </a>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
