import { describe, it, expect } from 'vitest';
import {
  generateWhatsAppOrderLink,
  generateConsultationWhatsAppLink,
  OFFICIAL_WHATSAPP_NUMBER,
} from '@/lib/whatsapp';

describe('WhatsApp Deep-Link Engine', () => {
  it('generates a valid WhatsApp URL with official business number', () => {
    const payload = {
      orderRef: 'DAG-20261026-TEST',
      customerName: 'Alhaji Musa',
      deliveryCity: 'Ibadan',
      deliveryState: 'Oyo',
      items: [
        {
          name: 'Day-Old Broiler Chicks',
          quantity: 2,
          packagingUnit: 'Carton of 50',
          unitPriceNgn: 45000,
        },
        {
          name: 'Infrared Gas Brooder Heater',
          quantity: 1,
          unitPriceNgn: 32000,
        },
      ],
      estimatedTotalNgn: 122000,
      userNotes: 'Please confirm Monday hatch batch.',
    };

    const link = generateWhatsAppOrderLink(payload);

    expect(link).toContain(`https://wa.me/${OFFICIAL_WHATSAPP_NUMBER}`);
    expect(link).toContain('DAG-20261026-TEST');
    expect(link).toContain('Alhaji%20Musa');
    expect(link).toContain('Ibadan');
    expect(link).toContain('Day-Old%20Broiler%20Chicks');
    expect(link).toContain('122%2C000');
    expect(link).toContain('Please%20confirm%20Monday%20hatch%20batch');
  });

  it('handles orders with variable prices gracefully', () => {
    const payload = {
      orderRef: 'DAG-CHICKS-VAR',
      customerName: 'Emeka',
      deliveryCity: 'Abeokuta',
      deliveryState: 'Ogun',
      items: [
        {
          name: 'Day-Old Layer Pullets',
          quantity: 4,
          packagingUnit: 'Carton of 50',
        },
      ],
    };

    const link = generateWhatsAppOrderLink(payload);
    expect(link).toContain('DAG-CHICKS-VAR');
    expect(link).toContain('confirm%20today\'s%20market%20rates');
  });

  it('generates consultation enquiry deep-link correctly', () => {
    const link = generateConsultationWhatsAppLink(
      'Turnkey Broiler Housing Construction',
      'Dr. Funke',
      '10,000 birds'
    );

    expect(link).toContain(`https://wa.me/${OFFICIAL_WHATSAPP_NUMBER}`);
    expect(link).toContain('Turnkey%20Broiler%20Housing%20Construction');
    expect(link).toContain('Dr.%20Funke');
    expect(link).toContain('10%2C000%20birds');
  });
});
