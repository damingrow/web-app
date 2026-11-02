import { z } from 'zod';

export const enquiryItemSchema = z.object({
  productId: z.string().uuid().optional(),
  name: z.string().min(2, 'Product name is required').max(200),
  quantity: z.number().int().positive('Quantity must be greater than zero'),
  packagingUnit: z.string().optional(),
  unitPriceNgn: z.number().nonnegative().optional(),
});

export const createEnquirySchema = z.object({
  enquiryType: z.enum([
    'whatsapp_order',
    'bulk_quote',
    'veterinary_consultation',
    'farm_setup_inquiry',
    'general',
  ]).default('whatsapp_order'),
  customerName: z.string().min(2, 'Name must be at least 2 characters').max(100),
  customerPhone: z
    .string()
    .min(10, 'Valid phone number is required')
    .max(20)
    .regex(/^(\+?234|0)[789][01]\d{8}$/, 'Must be a valid Nigerian phone number (e.g. 08139169402 or +2348139169402)'),
  customerEmail: z.string().email('Invalid email address').optional().or(z.literal('')),
  farmName: z.string().max(100).optional(),
  deliveryCity: z.string().min(2, 'Delivery city is required').max(100),
  deliveryState: z.string().min(2, 'Delivery state is required').max(50),
  deliveryCountry: z.string().default('Nigeria'),
  preferredDeliveryDate: z.string().optional(),
  items: z.array(enquiryItemSchema).min(1, 'At least one item is required in the enquiry'),
  estimatedSubtotalNgn: z.number().nonnegative().optional(),
  userNotes: z.string().max(1000).optional(),
  consentGiven: z.literal(true, {
    errorMap: () => ({ message: 'You must agree to the privacy policy to submit an enquiry.' }),
  }),
});

export type CreateEnquiryInput = z.infer<typeof createEnquirySchema>;
