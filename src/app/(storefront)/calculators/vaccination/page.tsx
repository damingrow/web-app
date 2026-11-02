import { Metadata } from 'next';
import VaccinationCalculatorClient from './vaccination-calculator-client';

export const metadata: Metadata = {
  title: 'Poultry Vaccination Schedule Generator | D-AminGrow Nigeria',
  description:
    'Generate a customized day-by-day poultry vaccination calendar for your arrival date. Timetables for broilers and commercial layers against Newcastle, Gumboro, and Fowl Pox.',
  openGraph: {
    title: 'Poultry Vaccination Schedule Generator | D-AminGrow',
    description:
      'Veterinary-approved immunization timetable calibrated for Nigerian tropical poultry production.',
    type: 'website',
  },
};

export default function VaccinationCalendarPage() {
  return <VaccinationCalculatorClient />;
}
