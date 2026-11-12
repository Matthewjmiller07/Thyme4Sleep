// Shared content for the Calm Nights Method programme: the pathway, scope, checkpoints
// and the signals that a family needs personalised support rather than a self-guided plan.
// Used by the sales page, the plan, the workbook and the email check-in page so they never drift apart.

export const PRICE = '$97';

// The six-step pathway every family follows, in order.
export const PATHWAY = [
  { n: '1', id: 'understand', title: 'Understand', sub: 'How sleep works', body: 'The general education behind the programme: sleep pressure, sleep cycles, why wake-ups happen and what crying is telling you.' },
  { n: '2', id: 'ready', title: 'Check fit & readiness', sub: 'Is this right for us, right now?', body: 'Who Calm Nights is for, who it isn’t for, and the boxes to tick before night one.' },
  { n: '3', id: 'prep', title: 'Prepare', sub: '3–7 days', body: 'Room, feed, routine, key phrase and team plan — the quiet changes that make night one easier.' },
  { n: '4', id: 'start', title: 'Choose a gentle starting point', sub: 'Two options, three questions', body: 'Pick “Stay Close” or “Step Out & Check” in a few minutes, then commit to it for 14 nights.' },
  { n: '5', id: 'nights', title: 'Implement', sub: '14 nights', body: 'The bedtime routine, your starting point night by night, and the same calm response for wake-ups and early mornings.' },
  { n: '6', id: 'review', title: 'Review & troubleshoot', sub: 'Nights 4, 7 and 14', body: 'Three short checkpoints tell you whether to keep going, adjust, or bring in personalised support.' },
];

// What the programme does and doesn't include. Shown on the sales page and inside the plan.
export const INCLUDED = [
  'General education on how sleep, sleep pressure and sleep cycles work',
  'A readiness and fit check before you begin',
  'A 3–7 day preparation guide',
  'Two gentle starting points and a simple way to choose between them',
  'A 14-night implementation framework for bedtime, night wakings and early rising',
  'Three review checkpoints with clear “keep going / adjust / get support” decisions',
  'A general troubleshooting library',
  'The printable Calm Nights Guide & Workbook: prep checklist, plan at a glance, script card and 14-night tracker — plus a baseline log, night-by-night journal and a review page for each checkpoint',
];

export const NOT_INCLUDED = [
  'A plan written for your individual child — Georgia does not review your child’s details',
  'Nap plans or daily schedules by age',
  'Calls, messaging or check-ins with Georgia',
  'Guidance for babies under 6 months, medical needs, additional needs or multiples',
];

// The product ladder, so customers can see why each option exists.
export const COMPARE = {
  cols: ['From Reset to Rest', 'Calm Nights Method', 'Starter 1:1', 'Standard 1:1'],
  prices: ['$37', '$97', '$249', '$549'],
  rows: [
    ['Best for', 'Bedtime is fine; you want fewer night wakings without changing how your child falls asleep', 'Your child needs a feed, rocking or you to fall asleep, and you’re ready to change that over two weeks', 'You want a plan written for your child, and you’re confident following it yourself', 'You want a plan for your child plus Georgia beside you while you follow it'],
    ['What it changes', 'One night-time support, reduced gradually', 'How your child falls asleep — at bedtime, then overnight and early morning', 'Whatever your child’s plan needs, including naps and schedule', 'Whatever your child’s plan needs, including naps and schedule'],
    ['Format', 'Video + workbook', 'Structured self-guided programme + workbook', 'Written personalised plan from your intake form', 'Personalised plan + 60-minute consult + 2 weeks of support'],
    ['Personalised to your child', '—', '—', '✓', '✓'],
    ['Naps & daily schedule', '—', '—', '✓', '✓'],
    ['Georgia’s support while you implement', '—', '—', '—', '✓ Email/text, 2 weeks'],
  ],
};

// The three review checkpoints, in the plan, the workbook and the email check-ins.
export interface Checkpoint {
  night: number;
  title: string;
  lookFor: string[];
  onTrack: string;
  adjust: string;
  support: string;
}

export const CHECKPOINTS: Checkpoint[] = [
  {
    night: 4,
    title: 'Night 4 · Is it moving?',
    lookFor: ['Lay-down is a little calmer', 'Falling asleep takes less time than night 1', 'At least one wake-up was shorter or quieter'],
    onTrack: 'Any one of these is progress. Keep going exactly as you are — no changes.',
    adjust: 'None yet, or night 3 felt worse? That’s common. Run the “Check the basics” list in Troubleshooting, change nothing else, and hold steady to night 7.',
    support: 'Crying is escalating to distress (8–10) for long stretches every night, or your child seems unwell: pause, speak to your pediatrician, and consider personalised support.',
  },
  {
    night: 7,
    title: 'Night 7 · Is the skill landing?',
    lookFor: ['Most bedtimes, they fall asleep with your starting point, not the old support', 'Fewer wake-ups, or shorter ones', 'You feel clearer about what to do at 2am'],
    onTrack: 'Keep going to night 14. If you’re on Stay Close, keep moving on schedule.',
    adjust: 'Bedtime is better but nights aren’t: check every wake-up gets the same response as bedtime. Use the Troubleshooting library for the specific sticking point.',
    support: 'Little or no change despite following the plan every time (including 3am)? That’s not a failure — it’s information that your child needs a plan built around them.',
  },
  {
    night: 14,
    title: 'Night 14 · Where have we landed?',
    lookFor: ['They fall asleep on their own most nights', 'Wake-ups resettle with a brief, calm response — or don’t happen', 'Mornings start at 6am or later'],
    onTrack: 'Wonderful. Move to “Keeping it going” in the plan.',
    adjust: 'Mostly there? Hold the same plan for another 7 nights before changing anything. Progress often finishes quietly.',
    support: 'Still waking frequently, splitting nights, early rising before 5:30am, or nap problems undoing nights? This is where personalised assessment adds what a general plan can’t.',
  },
];

// Stay Close: where the parent sits, night by night. [nights, position, what to do]
export const STAY_CLOSE: [string, string, string][] = [
  ['Nights 1–3', 'Beside the crib', 'Sit or kneel right next to the crib. Offer touch — a hand on the tummy, stroking the back or head — and soft shushing. Reduce touch as they calm; stop before they’re asleep if you can. No picking up.'],
  ['Nights 4–6', 'Beside the crib, voice only', 'Same spot, but hands off. Comfort with your voice and presence. If crying builds past a 6 out of 10, a brief touch is fine — then back to voice.'],
  ['Nights 7–9', 'Halfway to the door', 'Move your chair halfway across the room. Calm, low, repetitive reassurance (your key phrase, a gentle “shhh”). Keep eye contact soft and minimal.'],
  ['Nights 10–12', 'In the doorway', 'Sit in the open doorway where they can see or hear you. Reassure with your key phrase at intervals rather than constantly.'],
  ['Nights 13–14', 'Just outside the door', 'Out of sight, within earshot. Offer your key phrase from outside if needed.'],
];

// The general troubleshooting library. [sticking point, answer]
export const TROUBLESHOOTING: [string, string][] = [
  ['Check the basics (do this first)', 'Is the milk feed truly at the start of the routine, with books or bath after it? Is bedtime well-timed (not overtired)? Is the morning wake-up time consistent? Is every adult using the same starting point and key phrase — including at 3am? Most stalls come from one of these.'],
  ['“Night 3 got worse!”', 'Very common, and usually a sign your child is testing whether the new pattern is real. Hold steady to your night 4 checkpoint. Families who change course here start again from zero.'],
  ['Illness or teething', 'Pause, comfort as much as they need, and follow medical advice. Keep the routine and wake-up time. When they’re well (usually 2–3 days after symptoms ease), restart at the stage you’d reached — it comes back quickly.'],
  ['They stand up and won’t lie down', 'Practise “up and down” lots during the day. At night, lay them down once, then leave them to it — they will lie down when tired. Repeatedly laying them down becomes a game.'],
  ['Vomiting from crying', 'Clean up calmly and quickly with low light and little interaction, change the sheet, then continue your starting point. If it happens repeatedly, pause and speak to your pediatrician.'],
  ['Early rising (before 6am)', 'Treat it as night: same pause, same response. Then look at the day: is bedtime too late? Is the room light at dawn? Is there an early-morning feed still being offered?'],
  ['Travel & time zones', 'Bring the routine, sleep sack, white noise and key phrase. Shift to local time straight away with daylight and mealtimes. Expect a few unsettled nights, then return to your starting point.'],
  ['The toddler negotiator', 'Use the bedtime chart and Bedtime Pass cards. Offer choices before bed (“blue PJs or stars?”), not after. Once in bed: key phrase, same response, no new debates.'],
  ['We disagree as parents', 'Agree the starting point and the hard-night plan before night one. If one parent finds settling harder, they take a different role (bath and books) while the other leads. Unity matters more than which starting point you chose.'],
  ['Our checkpoint says “get support”', 'Then that’s the right next step, not a failure. See “Keeping it going” below — Georgia will build on what you’ve already done.'],
];

// Signals that a family should get personalised support instead of, or alongside, the programme.
export const SUPPORT_SIGNALS = {
  before: [
    'Your baby is under 6 months (or under 6 months adjusted age if born early)',
    'Reflux, allergies, snoring, pauses in breathing, weight concerns or ongoing pain',
    'Neurodivergence, additional needs or developmental delay',
    'Twins or multiples, or siblings sharing a room',
    'Naps and the daily schedule are the main problem',
  ],
  during: [
    'No meaningful change by night 7, despite following the plan every time',
    'Crying escalates night after night instead of easing',
    'Still waking frequently, splitting nights or rising before 5:30am at night 14',
    'You and your partner can’t agree on or sustain an approach',
  ],
};

// Where coaching links point. The query string lets GA4 show which enquiries came from Calm Nights.
export const COACHING_URL = '/pricing?from=calm-nights';
export const SPECIALISED_URL = '/packages/sen?from=calm-nights';

// 1:1 booking is paused while Georgia is on maternity leave. Set to true when intake reopens,
// and swap the waiting-list lines in src/data/emails.ts for booking lines.
export const ONE_TO_ONE_OPEN = false;
export const FREE_CALL_URL = 'https://thyme4sleep.neetocal.com/free-15-minute-assessment-call';
export const WAITLIST_URL = 'mailto:georgia@thyme4sleep.com?subject=1%3A1%20waiting%20list';
