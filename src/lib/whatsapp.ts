/**
 * D-AminGrow — WhatsApp Order Deep-Link Generator
 * Encodes cart selections, customer metadata, and delivery city into an
 * accessible, URI-safe WhatsApp payload.
 */

export interface WhatsAppOrderItem {
  name: string;
  quantity: number;
  packagingUnit?: string;
  unitPriceNgn?: number;
}

export interface WhatsAppOrderPayload {
  orderRef: string;
  customerName: string;
  customerPhone?: string;
  farmName?: string;
  deliveryCity: string;
  deliveryState: string;
  preferredDeliveryDate?: string;
  items: WhatsAppOrderItem[];
  estimatedTotalNgn?: number;
  userNotes?: string;
}

export const OFFICIAL_WHATSAPP_NUMBER = '2348139169402'; // Clean digits without + for wa.me API

export function generateWhatsAppOrderLink(
  payload: WhatsAppOrderPayload,
  customPhoneNumber: string = OFFICIAL_WHATSAPP_NUMBER
): string {
  const cleanPhone = customPhoneNumber.replace(/\+/g, '').replace(/\s+/g, '');

  const lines: string[] = [
    `*NEW ORDER INQUIRY — D-AMINGROW*`,
    `*Ref:* ${payload.orderRef}`,
    `*Customer:* ${payload.customerName}${payload.farmName ? ` (${payload.farmName})` : ''}`,
    `*Delivery Destination:* ${payload.deliveryCity}, ${payload.deliveryState}`,
  ];

  if (payload.preferredDeliveryDate) {
    lines.push(`*Preferred Date:* ${payload.preferredDeliveryDate}`);
  }

  lines.push(``, `*ITEMS REQUESTED:*`);

  for (const item of payload.items) {
    const unitText = item.packagingUnit ? ` (${item.packagingUnit})` : '';
    const priceText = item.unitPriceNgn
      ? ` — ₦${(item.quantity * item.unitPriceNgn).toLocaleString()}`
      : ' — [Price to confirm]';
    lines.push(`• ${item.quantity}x ${item.name}${unitText}${priceText}`);
  }

  lines.push(``);

  if (payload.estimatedTotalNgn && payload.estimatedTotalNgn > 0) {
    lines.push(`*ESTIMATED SUBTOTAL:* ₦${payload.estimatedTotalNgn.toLocaleString()}`);
  } else {
    lines.push(`*PRICING:* Please confirm today's market rates for the batch.`);
  }

  if (payload.userNotes && payload.userNotes.trim().length > 0) {
    lines.push(``, `*Customer Notes:* ${payload.userNotes.trim()}`);
  }

  lines.push(
    ``,
    `_Please confirm product availability, current day-old chick rates, and delivery logistics._`
  );

  const fullMessage = lines.join('\n');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(fullMessage)}`;
}

export function generateConsultationWhatsAppLink(
  serviceName: string,
  customerName: string,
  flockSize?: string,
  customPhoneNumber: string = OFFICIAL_WHATSAPP_NUMBER
): string {
  const cleanPhone = customPhoneNumber.replace(/\+/g, '').replace(/\s+/g, '');
  const lines = [
    `*FARM CONSULTATION INQUIRY — D-AMINGROW*`,
    `*Service:* ${serviceName}`,
    `*Customer:* ${customerName}`,
  ];

  if (flockSize) {
    lines.push(`*Estimated Flock / Herd Size:* ${flockSize}`);
  }

  lines.push(
    ``,
    `Hello D-AminGrow Veterinary Team, I would like to request expert consultation for my farm operations.`
  );

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(lines.join('\n'))}`;
}
