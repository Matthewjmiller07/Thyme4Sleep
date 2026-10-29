// Shared config for the review-comment widget (components/ReviewComments.astro) and /assets/review.
// The publishable key is safe in the browser: RLS on the table only allows reading, inserting,
// and changing a comment's status (no edits or deletes). Override via PUBLIC_ env vars if the
// table ever moves to another Supabase project.

export const SUPABASE_URL: string = import.meta.env.PUBLIC_REVIEW_SUPABASE_URL || 'https://qukziojymwlvmrzapgyo.supabase.co';
export const SUPABASE_KEY: string = import.meta.env.PUBLIC_REVIEW_SUPABASE_KEY || 'sb_publishable__aLEcTprJpumgIBhcwE_BA_XVMDW9vQ';
export const COMMENTS_TABLE = 't4s_review_comments';

export type CommentKind = 'approve' | 'change' | 'question' | 'note';

export interface ReviewComment {
  id: string;
  created_at: string;
  page_path: string;
  page_title: string | null;
  target: string | null;
  author: string;
  kind: CommentKind;
  body: string;
  status: 'open' | 'done';
  resolved_at: string | null;
}

export const KIND_LABEL: Record<CommentKind, string> = {
  approve: '✓ Green light',
  change: '✎ Change',
  question: '? Question',
  note: '• Note',
};

/** One key per page: no trailing slash, lower-case, no query/hash. */
export const normalizePath = (p: string) => (p.replace(/\/+$/, '') || '/').toLowerCase();

/** Pages open for review, listed on /assets/review. */
export const REVIEW_PAGES: { group: string; pages: { path: string; title: string }[] }[] = [
  {
    group: 'Resource library',
    pages: [
      { path: '/assets', title: 'Resource library hub' },
      { path: '/assets/quiz', title: 'Sleep Snapshot quiz' },
      { path: '/assets/safe-sleep', title: 'Safe Sleep Checklist + wallpaper' },
      { path: '/assets/sleep-log', title: '7-Day Sleep Log' },
      { path: '/assets/bedtime-chart', title: 'Bedtime Routine Chart' },
      { path: '/free-checklist', title: 'Gentle Sleep Reset (free guide)' },
    ],
  },
  {
    group: 'Calm Nights Method',
    pages: [
      { path: '/assets/calm-nights', title: 'Sales page' },
      { path: '/assets/calm-nights/plan', title: 'Programme (gated)' },
      { path: '/assets/calm-nights/workbook', title: 'Workbook & tracker (gated)' },
      { path: '/assets/calm-nights/check-in', title: 'Check-in' },
      { path: '/assets/calm-nights/success', title: 'Purchase confirmation' },
    ],
  },
  {
    group: 'Content studio',
    pages: [
      { path: '/assets/social', title: 'Social media kit' },
      { path: '/assets/email-flow', title: 'Email flow' },
      { path: '/assets/emails', title: 'Email nurture sequences' },
      { path: '/assets/flywheel', title: 'Flywheel & launch plan' },
    ],
  },
  {
    group: 'Packages & paid products',
    pages: [
      { path: '/pricing', title: 'Pricing & packages' },
      { path: '/packages/starter', title: 'Starter package' },
      { path: '/packages/standard', title: 'Standard package' },
      { path: '/packages/sen', title: 'SEN package' },
      { path: '/reset-preview', title: 'From Reset to Rest ($37) preview' },
      { path: '/reset', title: 'From Reset to Rest (purchased)' },
    ],
  },
];
