import { NextResponse } from 'next/server';
import { requireStaffSession } from '@/lib/auth/server-guard';
import { createAdminClient } from '@/lib/supabase/server';
import { PRODUCTS } from '@/data/products';
import {
  validateNafdacNumber,
  screenBannedVeterinarySubstances,
} from '@/lib/compliance/nafdac-audit';

export async function POST(request: Request) {
  // 1. Authenticate staff member (Zero-Trust)
  const { errorResponse, staff } = await requireStaffSession(['super_admin', 'content_editor', 'sales_agent']);
  if (errorResponse) {
    return errorResponse;
  }

  try {
    const body = await request.json();
    const { productId, action, nafdacNumber, nafdacExpiry, reason } = body;

    if (!productId || !action) {
      return NextResponse.json(
        { error: 'Product ID and regulatory action are required.' },
        { status: 400 }
      );
    }

    // 2. Find product in catalog
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) {
      return NextResponse.json(
        { error: `Product with ID "${productId}" not found in catalog.` },
        { status: 404 }
      );
    }

    // 3. Process Regulatory Action
    if (action === 'verify') {
      // Safety Check A: Prohibited Substances Screening
      const textToScreen = `${product.name} ${product.description} ${product.compliance.activeIngredients || ''}`;
      const bannedCheck = screenBannedVeterinarySubstances(textToScreen);
      if (bannedCheck.flagged) {
        const bannedNames = bannedCheck.matchedSubstances.map((s) => s.name).join(', ');
        return NextResponse.json(
          {
            error: `CRITICAL NAFDAC VIOLATION: Product contains banned veterinary substance (${bannedNames}). Clearance strictly prohibited.`,
            bannedSubstances: bannedCheck.matchedSubstances,
          },
          { status: 422 }
        );
      }

      // Safety Check B: Regulated Pharmaceutical NAFDAC Number validation
      if (['drugs', 'vaccines'].includes(product.category)) {
        const regNumToCheck = nafdacNumber || product.compliance.nafdacNumber;
        const formatCheck = validateNafdacNumber(regNumToCheck);
        if (!formatCheck.valid) {
          return NextResponse.json(
            {
              error: `Regulatory validation failed: ${formatCheck.reason}`,
              code: 'INVALID_NAFDAC_FORMAT',
            },
            { status: 422 }
          );
        }
      }

      // Safety Check C: Vaccine Cold-Chain Protocol
      if (product.category === 'vaccines' && !product.compliance.coldChainRequired) {
        return NextResponse.json(
          {
            error: 'Regulatory violation: Avian vaccines must enforce 2°C–8°C cold-chain protocol.',
            code: 'COLD_CHAIN_REQUIRED',
          },
          { status: 422 }
        );
      }

      // Update in-memory product compliance for runtime
      product.compliance.verificationState = 'verified_for_sale';
      if (nafdacNumber) {
        product.compliance.nafdacNumber = nafdacNumber;
      }
      product.compliance.certificateVerified = true;
      product.compliance.bannedSubstancesChecked = true;
      product.compliance.restrictionReason = undefined;

      // Log in Supabase audit_logs if client available
      try {
        const supabase = createAdminClient();
        await supabase.from('audit_logs').insert({
          actor_id: staff?.userId || 'staff_regulatory_officer',
          actor_role: staff?.role || 'regulatory_officer',
          action: 'VERIFY_REGULATORY_CLEARANCE',
          resource_type: 'product',
          resource_id: productId,
          changes_json: {
            verification_state: 'verified_for_sale',
            nafdac_number: nafdacNumber || product.compliance.nafdacNumber,
            nafdac_expiry: nafdacExpiry || null,
            cleared_by: staff?.email || 'regulatory_officer',
            cleared_at: new Date().toISOString(),
          },
        });
      } catch (err) {
        console.warn('Could not persist regulatory audit log to Supabase:', err);
      }

      return NextResponse.json({
        success: true,
        productId,
        verificationState: 'verified_for_sale',
        message: `Product "${product.name}" has been cleared and verified for sale.`,
      });
    }

    if (action === 'restrict') {
      const restrictionReason = reason || 'Restricted from publication under NAFDAC regulatory compliance directive.';

      product.compliance.verificationState = 'restricted_from_publication';
      product.compliance.restrictionReason = restrictionReason;

      try {
        const supabase = createAdminClient();
        await supabase.from('audit_logs').insert({
          actor_id: staff?.userId || 'staff_regulatory_officer',
          actor_role: staff?.role || 'regulatory_officer',
          action: 'RESTRICT_FROM_PUBLICATION',
          resource_type: 'product',
          resource_id: productId,
          changes_json: {
            verification_state: 'restricted_from_publication',
            reason: restrictionReason,
            restricted_at: new Date().toISOString(),
          },
        });
      } catch (err) {
        console.warn('Could not persist regulatory restriction log to Supabase:', err);
      }

      return NextResponse.json({
        success: true,
        productId,
        verificationState: 'restricted_from_publication',
        message: `Product "${product.name}" has been restricted from public storefront.`,
      });
    }

    if (action === 'flag_incomplete') {
      const incompleteReason = reason || 'Documentation incomplete: pending NAFDAC dossier verification.';

      product.compliance.verificationState = 'documentation_incomplete';
      product.compliance.restrictionReason = incompleteReason;

      return NextResponse.json({
        success: true,
        productId,
        verificationState: 'documentation_incomplete',
        message: `Product "${product.name}" has been flagged as documentation incomplete.`,
      });
    }

    return NextResponse.json({ error: `Unknown action "${action}".` }, { status: 400 });
  } catch (error) {
    console.error('Regulatory verification API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal regulatory error.' },
      { status: 500 }
    );
  }
}
