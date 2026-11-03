import { NextResponse } from 'next/server';
import { requireStaffSession } from '@/lib/auth/server-guard';
import { validateVcnClinicalSignOff } from '@/lib/editorial/pillars';
import { ARTICLES } from '@/data/articles';

export async function POST(request: Request) {
  const { errorResponse, staff } = await requireStaffSession(['super_admin', 'content_editor']);
  if (errorResponse) {
    return errorResponse;
  }

  try {
    const body = await request.json();
    const {
      articleSlug,
      targetStatus, // 'draft' | 'editorial_review' | 'veterinary_review' | 'published' | 'archived'
      reviewerName,
      credentials,
      vcnRegistration,
      declaration,
      amrComplianceVerified,
      dosageVerified,
      editorialNotes,
    } = body;

    if (!articleSlug || !targetStatus) {
      return NextResponse.json(
        { error: 'Article slug and target status are required.' },
        { status: 400 }
      );
    }

    const article = ARTICLES.find((a) => a.slug === articleSlug);
    if (!article) {
      return NextResponse.json(
        { error: `Article with slug "${articleSlug}" not found.` },
        { status: 404 }
      );
    }

    // If transitioning to published or veterinary_review, enforce VCN validation
    if (targetStatus === 'published' || targetStatus === 'veterinary_review') {
      const vcnCheck = validateVcnClinicalSignOff({
        reviewerName: reviewerName || article.clinicalReview?.reviewerName || '',
        credentials: credentials || article.clinicalReview?.credentials || '',
        vcnRegistration: vcnRegistration || article.clinicalReview?.vcnRegistration || '',
        declaration: declaration || article.clinicalReview?.declaration || '',
        amrComplianceVerified: amrComplianceVerified ?? true,
        dosageVerified: dosageVerified ?? true,
      });

      if (!vcnCheck.isValid) {
        return NextResponse.json(
          {
            error: 'Veterinary Council of Nigeria (VCN) clinical sign-off failed.',
            details: vcnCheck.errors,
          },
          { status: 422 }
        );
      }
    }

    return NextResponse.json({
      ok: true,
      articleSlug,
      previousStatus: 'editorial_review',
      newStatus: targetStatus,
      updatedBy: staff?.email ?? 'editorial_staff',
      editorialNotes: editorialNotes || 'Status transition logged.',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process editorial publishing transition.', details: String(error) },
      { status: 500 }
    );
  }
}
