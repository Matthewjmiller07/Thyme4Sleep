// Thyme4Sleep email sequences, in Georgia's voice: gentle, honest, British in tone and spelling.
// Shared by /assets/emails (copy reference) and /assets/email-flow (visual flow + Brevo-ready HTML).
//
// Ground rules the copy follows (see the email review doc):
// - The Sleep Snapshot suggests a starting point; it never diagnoses.
// - The Gentle Sleep Reset (free) stabilises after disruption: 3–5 days, consistent bedtime window.
//   From Reset to Rest ($37) is the next step: a gentle night-waking reduction protocol for families
//   whose sleep has already stabilised. Calm Nights ($97) is a general self-guided framework.
//   1:1 coaching is a plan built around the child.
// - 1:1 booking is paused (Georgia's maternity leave): offers point to the waiting list, the free
//   15-minute assessment call and the standalone $99 troubleshooting call. When booking reopens,
//   swap the waiting-list lines for booking lines (the review doc has the open-booking wording).
// - Check-ins are automated; nothing implies Georgia is watching answers in real time.

// buttons: one-click answers or several destinations; each check-in link both lands on the
// check-in page and lets the email platform tag the subscriber. rule: the automation logic.
import { FREE_CALL_URL, WAITLIST_URL } from './calmNights';
export { FREE_CALL_URL, WAITLIST_URL };

export interface Email { day: string; subject: string; preview: string; body: string; cta: string; buttons?: [string, string][]; rule?: string }

const SITE = 'https://thyme4sleep.com';
export const CHECK = `${SITE}/assets/calm-nights/check-in`;
const TROUBLESHOOTING_URL = `${SITE}/pricing?from=email#troubleshooting`;

const checkIn = (n: number): [string, string][] => [
  ['Things are moving', `${CHECK}?n=${n}&s=on-track`],
  ['Some progress — stuck on something', `${CHECK}?n=${n}&s=adjust`],
  ['Little change, or something feels off', `${CHECK}?n=${n}&s=support`],
  ['I’d like some guidance', `${CHECK}?n=${n}&s=guidance`],
];

// Closing lines reused across emails.
const CALL_LINE = 'A quiz can only tell me so much. If you’d rather talk it through, book a free 15-minute sleep assessment call. You don’t need to buy anything first.';
const CN_FOOTER = 'Would you rather have someone guide you through it? Book a free 15-minute sleep assessment call. Calm Nights is a general framework; my 1:1 coaching is a plan built around your child’s age, temperament, development, sleep history and family.';
const WAITLIST_LINE = 'My 1:1 books are closed for now while I’m on maternity leave, but my waiting list is open. Reply “waitlist” and I’ll save your place and let you know as soon as I’m taking families again.';

export const welcome: Email[] = [
  { day: 'Day 0 · Instantly', subject: 'Your Gentle Sleep Reset is here 🌿', preview: 'Plus the one thing to do tonight.',
    body: `Hi {first_name},\n\nHere's your Gentle Sleep Reset. Save it somewhere you'll find it at 2am.\n\nBefore you read all of it, do just one thing tonight: choose a calm bedtime window, a 30-minute slot you'll aim for every night this week, and set a reminder for it. That's it.\n\nPredictability is the quiet anchor everything else hangs from. When bedtime happens at the same time and in the same calm way, your little one knows what's coming, and settling gets easier, even after illness, travel or a regression.\n\nI'm Georgia, a certified pediatric sleep coach and a mum of two who sleep trained my own littles, so I know how long these nights can feel. Over the next few days I'll send a few short notes to help you steady things.\n\nTomorrow: why sometimes, doing less is the best place to start.\n\nWith a spoonful of calm,\nGeorgia`,
    cta: 'Download the guide' },
  { day: 'Day 1', subject: 'Why sometimes, doing less is best', preview: 'The gentlest place to start after a rough patch.',
    body: `Hi {first_name},\n\nWhen sleep falls apart, our instinct is to change everything: a new bedtime, a new method, a new white-noise machine, all by Thursday.\n\nBut children settle through predictability. Every change, even a good one, is something new for them to figure out.\n\nSo for the next 3–5 days, the job is simply to stabilise:\n• One calm bedtime window (within 30 minutes)\n• A predictable, unhurried wind-down: same steps, same order, same energy\n• The same response to wake-ups, every time\n\nNo new strategies. No switching mid-night. Your child's sleep isn't broken, and you haven't failed them. It just needs steadying before it can improve.\n\nDoing less isn't always the answer. Sometimes a child needs more support, not less, and that's worth knowing too. But after a disruption, steadiness is usually the kindest place to begin.\n\nCurious what's really behind your little one's sleep? My 2-minute Sleep Snapshot can point you to a sensible starting point.\n\nGeorgia`,
    cta: 'Take the Sleep Snapshot' },
  { day: 'Day 2', subject: 'Understanding those middle-of-the-night wakes', preview: 'A pause isn’t ignoring them. Here’s the difference.',
    body: `Hi {first_name},\n\nNight wakes are one of the hardest parts of parenting, and one of the most misunderstood. Here's something that surprises many parents: plenty of the noises you hear overnight aren't full wake-ups. They're your little one moving between sleep cycles, something we all do every 45–90 minutes.\n\nSo before you go in, it can help to pause briefly and listen. This isn't about leaving your child to cry, and it never means ignoring a child who needs you. It's simply giving them a moment to resettle if they can, while you work out what they're telling you.\n\nIs it grizzling that rises and falls, or crying that's building? If you imagine a scale of 1–10, the lower end is often them working it out. If crying is building, or it sounds different, like something's wrong, go to them.\n\nWhen you do go in, respond in the same calm, familiar way each time. Predictable is what feels safe.\n\nEvery child is different, and what helps one family won't suit another. If you're unsure what your little one needs, that's exactly the kind of thing I can help with.\n\nGeorgia`,
    cta: 'Read the full reset guide' },
  { day: 'Day 3', subject: 'Calmer bedtimes, but still waking?', preview: 'When steady isn’t quite settled yet.',
    body: `Hi {first_name},\n\nBy now, a lot of families notice bedtime feels calmer. Fewer false starts. A little more confidence.\n\nBut the night wakes? Often still there.\n\nThat's normal, and it's because stabilising and reducing are two different steps. Once you've had 3–5 steady days, wake-ups that hang on are usually kept going by one of three things:\n\n1. A habit loop: waking at the same time, in the same way, every night\n2. A timing imbalance: short naps, long stretches awake before bed, or early rising\n3. A regulation dependency: needing one specific thing, such as feeding, rocking or bouncing, to get back to sleep\n\nFrom Reset to Rest is the gentle night-waking reduction protocol I created for exactly this stage: a video walkthrough plus a printable guide that helps you check your little one is ready, spot the driver and reduce wakings one small step at a time. No cry-it-out, no rigid schedule.\n\nIt's $37, and you can start whenever your nights feel steady.\n\n${CALL_LINE}\n\nGeorgia`,
    cta: 'See From Reset to Rest — $37',
    buttons: [['See From Reset to Rest — $37', `${SITE}/reset-preview`], ['Book a free assessment call', FREE_CALL_URL]],
    rule: 'Sent to SNAPSHOT = d. Skip for anyone who has already bought Reset to Rest or the bundle.' },
  { day: 'Day 5', subject: 'Finding the right support for your family', preview: 'An honest look at every option, including the free ones.',
    body: `Hi {first_name},\n\nOver the last few days you've steadied the foundations. Thank you for letting me be part of that.\n\nHere's an honest guide to what comes next. Every family is different, so think of these as options, not a ladder you have to climb:\n\n→ Nights feel steadier, but wake-ups remain: From Reset to Rest ($37), my gentle night-waking reduction protocol.\n→ Your child needs a feed, rocking or you beside them to fall asleep, and you'd like to work through a structured programme on your own: The Calm Nights Method ($97).\n→ You'd like me to look at your days and nights now: a 60-minute troubleshooting call ($99) gives you my eyes on what's happening and what to change first.\n→ You'd like a plan written for your child (naps and schedule included), there's a medical, developmental or sensory factor, or you have multiples: that's my 1:1 coaching. ${WAITLIST_LINE}\n→ You're not sure which of these fits: book a free 15-minute sleep assessment call. You don't need to buy anything to talk to me.\n\nWhatever you choose, or if you choose nothing at all, keep that calm bedtime window. It's the foundation of everything.\n\nYou're doing more right than you think.\n\nGeorgia`,
    cta: 'Find your next step',
    buttons: [['Find your next step', `${SITE}/assets/calm-nights#compare`], ['Book a free assessment call', FREE_CALL_URL]] },
];

export const ascend: Email[] = [
  { day: 'Purchase · Instantly', subject: 'You’re in — start here', preview: 'Four gentle steps for your first few days.',
    body: `Hi {first_name},\n\nThank you for trusting me with your family's sleep! Your video and guide are here: [link].\n\nFour steps for the next few days:\n1. Watch the video and read the guide through once, ideally with your partner.\n2. Start with the readiness check. If several boxes are unticked, give it a few more steady days first. That protects your progress.\n3. Spot the driver behind the wake-ups, then choose one anchor response and commit to it for three nights.\n4. Start the tracker tonight, even before you change anything.\n\nIf something in the guide is unclear, just reply and I'll point you to the right page.\n\nGeorgia`,
    cta: 'Open my plan' },
  { day: 'Purchase + 3 days', subject: 'Night 3 got harder? Read this.', preview: 'It’s more common than you’d think.',
    body: `Hi {first_name},\n\nIf the last night or two felt harder, you're not alone, and it doesn't mean it isn't working. Children commonly test whether a new pattern is "real" around night three.\n\nThe families who see the biggest change are the ones who hold steady to their night 4 check. Keep your anchor response the same, keep your bedtime window, and look at your tracker for the small wins: slightly shorter wakes, less intensity, a longer first stretch. Any progress, no matter how small, is a win.\n\nOn night 4, assess. Progress? Keep going. Crying escalating? Go back to the "identify the driver" step before changing anything else.\n\nGeorgia`,
    cta: 'Open my guide' },
  { day: 'Purchase + 7 days', subject: 'Is it bedtime, not the night?', preview: 'When reducing wake-ups isn’t enough.',
    body: `Hi {first_name},\n\nOne week in! Reset to Rest works on the night: reducing one support, gently, a step at a time.\n\nBut for some children the wake-ups are really about bedtime. If your little one still needs a feed, rocking or you beside them to fall asleep, they'll often look for that same help at every wake-up, and reducing it overnight only goes so far.\n\nThat's what the Calm Nights Method is for: a structured, self-guided 14-night programme that changes how your child falls asleep, then applies the same calm response overnight and in the early morning. It's a general framework rather than a plan written for your child, with checkpoints that tell you when personalised support would serve you better.\n\nIf your bedtime is already calm, stick with Reset to Rest. You don't need both.\n\nGeorgia`,
    cta: 'See if Calm Nights fits — $97',
    rule: 'Skip for anyone who has already bought Calm Nights or the bundle.' },
  { day: 'Purchase + 12 days', subject: 'How are nights looking?', preview: 'Hit reply and tell me. I’d love to know.',
    body: `Hi {first_name},\n\nI'd love to hear how things are going. Hit reply and tell me one win and one thing that still feels hard.\n\nIf you've had a breakthrough, would you share a sentence I could use as a review? It helps other exhausted parents find gentle support. (And if a friend could use help, my referral programme gives you both $100 off your next service.)\n\nGeorgia`,
    cta: 'Reply to Georgia' },
  { day: 'Purchase + 16 days', subject: 'When a plan isn’t enough', preview: 'Some children need a plan built around them.',
    body: `Hi {first_name},\n\nIf you've worked the framework for 7–10 nights and you're still seeing wake-ups every 45–90 minutes, split nights, early rising before 5:30am or crying that escalates, please hear this: it's not you. Some children, because of temperament, timing, a medical or developmental factor, or a family situation, need a plan built specifically around them.\n\nThat's what my 1:1 packages are for. ${WAITLIST_LINE}\n\nIf you'd like my eyes on things sooner, a 60-minute troubleshooting call ($99) is the quickest way to get them. Or, if you're not sure what you need, book a free 15-minute sleep assessment call.\n\nGeorgia`,
    cta: 'Join the waiting list',
    buttons: [['Join the waiting list', WAITLIST_URL], ['Book a troubleshooting call — $99', TROUBLESHOOTING_URL], ['Book a free assessment call', FREE_CALL_URL]] },
];

export const calm: Email[] = [
  { day: 'Purchase · Instantly', subject: 'You’re in — your Calm Nights path starts here', preview: 'Step 1, plus one quick question.',
    body: `Hi {first_name},\n\nThank you for trusting me with your family's sleep. As a mum of two, I know how much courage it takes to start something like this, and how much you want to get it right.\n\nYour programme is here: [link to /assets/calm-nights/plan].\n\nCalm Nights is a six-step path, and the order matters:\n1. Understand how sleep works\n2. Check fit & readiness\n3. Prepare (3–7 days)\n4. Choose a gentle starting point\n5. The 14 nights\n6. Review at nights 4, 7 and 14\n\nBefore night one, print your Calm Nights Guide & Workbook. It walks with you through every step, and it's where you'll see your progress.\n\nOne quick question first. Calm Nights is general guidance for healthy children from 6 months to around 4. It isn't the right tool if your baby is under 6 months; if there's reflux, allergies, snoring, pauses in breathing or a weight concern; if your child has additional or sensory needs; if you have twins; or if naps are the main problem.\n\nDoes any of that apply to you? Tap one below. It takes a second and takes you to the right next step.\n\n${CN_FOOTER}\n\nGeorgia`,
    cta: 'Open my programme',
    buttons: [['We’re a good fit — let’s begin', `${CHECK}?n=0&s=on-track`], ['Something on that list applies to us', `${CHECK}?n=0&s=support`]],
    rule: '“Something applies” click → tag cn-support, exit this sequence, start Sequence 4.' },
  { day: 'Purchase + 2 days', subject: 'The three prep changes that matter most', preview: 'And when to start night one.',
    body: `Hi {first_name},\n\nIf you do nothing else from step 3, do these three:\n\n• Move the bedtime milk to the start of the routine, lights on, outside the bedroom.\n• Fix a morning wake-up time and keep it, even after a rough night.\n• Choose one key phrase that every adult says, word for word.\n\nYour Guide & Workbook has a day-by-day prep planner on page 6, if you'd like to take it one small job at a time.\n\nThen pick your starting point (step 4: three questions, five minutes) and choose a night one when you'll have two weeks of mostly home bedtimes.\n\nTap below on the day you start, and your checkpoint emails will be timed from that night.\n\n${CN_FOOTER}\n\nGeorgia`,
    cta: 'Open step 3: Prepare',
    buttons: [['We’re starting tonight', `${CHECK}?n=0&s=on-track&started=1`]],
    rule: 'Click → tag cn-started and start the “nights” timer (emails 3–6). No click by day 7 → start the timer anyway.' },
  { day: 'Night 4 (started + 4 days)', subject: 'Night 4 checkpoint: how’s it going?', preview: 'Night 3 is often the hardest. Here’s what to look for.',
    body: `Hi {first_name},\n\nIf night 3 felt harder, you're not alone. Children commonly test whether a new pattern is "real" around now, and the families who see the biggest change are the ones who hold steady.\n\nGrab your tracker and look for any one of these:\n• Lay-down is a little calmer\n• Falling asleep takes less time than night 1\n• At least one wake-up was shorter or quieter\n\nAny progress, no matter how small, is a win.\n\nThen tap the answer that fits best. You'll go straight to the next step for that answer.\n\n${CN_FOOTER}\n\nGeorgia`,
    cta: 'Open step 6: Review', buttons: checkIn(4),
    rule: '“Little change” or “I’d like some guidance” → tag cn-support, start Sequence 4 (keep in this sequence). “Stuck” → tag cn-adjust.' },
  { day: 'Night 7 (started + 7 days)', subject: 'Night 7: is the skill landing?', preview: 'Your halfway checkpoint.',
    body: `Hi {first_name},\n\nOne week in. This is the most useful checkpoint of all.\n\nLook at your tracker:\n• Most bedtimes, do they fall asleep with your starting point rather than the old support?\n• Are wake-ups fewer, or shorter?\n• Do you feel clearer about what to do at 2am?\n\nIf you've followed the plan every time (3am included) and very little has changed, please hear this: it isn't you. It's information that your child may need a plan built around them.\n\nTap the answer that fits best.\n\n${CN_FOOTER}\n\nGeorgia`,
    cta: 'Open step 6: Review', buttons: checkIn(7),
    rule: '“Little change” or “I’d like some guidance” → tag cn-support, exit, start Sequence 4. “Stuck” when already tagged cn-adjust → also start Sequence 4. No click at all → send the nudge email below.' },
  { day: 'Night 7 + 1 day · only if no check-in click', subject: 'Quick one: how are nights?', preview: 'A gentle nudge, and two minutes with your tracker.',
    body: `Hi {first_name},\n\nI haven't seen a check-in from you, so here's a gentle nudge. Wherever you've landed, your tracker will tell you more than you think. Take two minutes with it, then tap the answer that fits best.\n\nAnd if a general programme isn't the right fit for your family, that's useful to know too. A free 15-minute assessment call is the easiest way to find out what is.\n\nGeorgia`,
    cta: 'Open step 6: Review', buttons: checkIn(7),
    rule: 'Same tags as the night 7 buttons. Georgia can still add cn-support by hand if a parent replies describing a support signal.' },
  { day: 'Night 14 (started + 14 days)', subject: 'Night 14: where have you landed?', preview: 'Your final checkpoint, and what comes next.',
    body: `Hi {first_name},\n\nTwo weeks! Whatever your tracker says, you've given your child something valuable: two weeks of calm, predictable, loving responses.\n\nCheck in with your final checkpoint:\n• Falling asleep on their own most nights?\n• Wake-ups resettling with a brief response, or not happening?\n• Mornings starting at 6am or later?\n\nTap the one that fits.\n\n${CN_FOOTER}\n\nGeorgia`,
    cta: 'Open “Keeping it going”', buttons: checkIn(14),
    rule: '“Little change”, “I’d like some guidance” or a second “stuck” → tag cn-support, start Sequence 4. “Moving” → tag cn-success.' },
  { day: 'Night 21 · tag cn-success only', subject: 'Would you share a sentence?', preview: 'It helps other tired parents find gentle support.',
    body: `Hi {first_name},\n\nI'm so glad nights are calmer. You've got this, and it shows!\n\nIf you have a moment, would you reply with a sentence or two about your experience? With your permission, I'd love to share it (first name and child's age only) so other exhausted parents can find gentle support. No pressure at all if now isn't the time.\n\nAnd if a friend could use help, send them to thyme4sleep.com.\n\nWobbles will come: a cold, a tooth, a holiday. When they do, steady things with the free Gentle Sleep Reset, then pick your starting point back up.\n\nGeorgia`,
    cta: 'Reply with a review',
    rule: 'Only for families who clicked “Things are moving” at night 14 (tag cn-success).' },
];

export const support: Email[] = [
  { day: 'Tag cn-support · Instantly', subject: 'It’s not you — here’s what a personalised plan adds', preview: 'The honest difference between Calm Nights and 1:1.',
    body: `Hi {first_name},\n\nThank you for telling me where you are. First, the most important thing: this isn't a failure. Calm Nights is a general framework, and some children, because of age, temperament, health, or a family situation, need a plan built around them.\n\nHere's the honest difference. Calm Nights gives you a general framework. My 1:1 coaching starts with your child: their age, temperament, development, sleep history and your family's circumstances, and builds a plan around them.\n\n• Starter (from $249): I review a detailed intake form and write a plan for your child, including naps, daily schedule and environment.\n• Standard (from $549): your personalised plan, a 60-minute consultation, and two weeks of email and text support while you put it into practice.\n• Specialised Sleep Support: for children with additional needs, neurodivergence or sensory considerations, with four weeks of support.\n\n${WAITLIST_LINE}\n\nIf you'd like to talk first, book a free 15-minute sleep assessment call. There's no obligation, and I'll tell you honestly what I think would help, including if that's nothing more than what you're already doing.\n\nGeorgia`,
    cta: 'Book a free assessment call', buttons: [['Book a free assessment call', FREE_CALL_URL], ['Join the waiting list', WAITLIST_URL]] },
  { day: 'Tag cn-support + 2 days', subject: 'What working together looks like', preview: 'And why you won’t be starting from scratch.',
    body: `Hi {first_name},\n\nIf you're weighing up 1:1, here's what it looks like:\n\n1. You complete an intake form about your child, your days and your nights.\n2. With Standard or Specialised, we have a 60-minute consultation to talk it all through.\n3. You receive a written plan for your child within 5 business days.\n4. With Standard, I'm on hand by email and text for two weeks while you follow it, with an optional 30-minute wrap-up call. Specialised includes four weeks.\n5. If you follow your plan consistently and haven't seen results within 14 days, I'll keep supporting you, free of charge, until you do.\n\nBring your Calm Nights tracker and checkpoint pages. I'll see exactly what you've tried, what moved and what didn't, so we build on your work rather than start over.\n\n${WAITLIST_LINE}\n\nGeorgia`,
    cta: 'Join the waiting list', buttons: [['Join the waiting list', WAITLIST_URL], ['Book a free assessment call', FREE_CALL_URL]] },
  { day: 'Tag cn-support + 5 days', subject: 'One last note from me', preview: 'No pressure. Just this.',
    body: `Hi {first_name},\n\nI won't keep landing in your inbox about this. Whatever you decide, keep the morning anchor and the same calm response to wake-ups. They're the foundation of everything.\n\nIf you'd like me in your corner, you know where I am. And if you just have a question, reply any time.\n\nGeorgia`,
    cta: 'Reply to Georgia' },
];

export const SEQUENCES: [string, string, string, Email[]][] = [
  ['welcome', 'Sequence 1 · Welcome & nurture', 'Trigger: Gentle Sleep Reset download or Sleep Snapshot opt-in. Goal: real help first, then a starting point that matches the Snapshot on day 3, and an honest overview of every option on day 5. No-quiz contacts get the general Day 3.', welcome],
  ['ascend', 'Sequence 2 · Reset to Rest buyers', 'Trigger: Reset to Rest purchase. Goal: support the night-waking reduction protocol, collect reviews and referrals, and point families whose real issue is bedtime to Calm Nights (skipped for Calm Nights or bundle buyers), or to personalised support.', ascend],
  ['calm', 'Sequence 3 · The Calm Nights pathway', 'Trigger: Calm Nights or bundle purchase (tag cn-buyer). Goal: walk families through the six steps with automated check-ins at nights 4, 7 and 14, and route anyone who asks for help or needs more to personalised support. Exit: any 1:1 purchase.', calm],
  ['support', 'Sequence 4 · Personalised support branch', 'Trigger: tag cn-support (a “Little change” or “I’d like some guidance” click, a second “stuck”, or added by Georgia). Goal: an honest, low-pressure route to the free assessment call and the 1:1 waiting list. Exit: any 1:1 purchase, or a reply saying no thanks.', support],
];

// ---------------------------------------------------------------------------
// Where each email's main button goes. Keyed by the CTA label used above.
export const CTA_LINKS: Record<string, string> = {
  'Download the guide': `${SITE}/essential-checklist.pdf`,
  'Take the Sleep Snapshot': `${SITE}/assets/quiz`,
  'Read the full reset guide': `${SITE}/essential-checklist.pdf`,
  'See From Reset to Rest — $37': `${SITE}/reset-preview`,
  'Find your next step': `${SITE}/assets/calm-nights#compare`,
  'Open my plan': `${SITE}/reset`,
  'Open my guide': `${SITE}/reset`,
  'See if Calm Nights fits — $97': `${SITE}/assets/calm-nights`,
  'Reply to Georgia': 'mailto:georgia@thyme4sleep.com',
  'Reply with a review': 'mailto:georgia@thyme4sleep.com?subject=My%20Calm%20Nights%20review',
  'See 1:1 packages': `${SITE}/pricing?from=email`,
  'Join the waiting list': WAITLIST_URL,
  'Book a free assessment call': FREE_CALL_URL,
  'Open my programme': `${SITE}/assets/calm-nights/plan`,
  'Open step 3: Prepare': `${SITE}/assets/calm-nights/plan#prep`,
  'Open step 6: Review': `${SITE}/assets/calm-nights/plan#review`,
  'Open “Keeping it going”': `${SITE}/assets/calm-nights/plan#next`,
  'See the Calm Nights Method — $97': `${SITE}/assets/calm-nights`,
  'Book a troubleshooting call — $99': TROUBLESHOOTING_URL,
};

// ---------------------------------------------------------------------------
// Day 3 of the welcome series, split by Sleep Snapshot result (Brevo contact
// attribute SNAPSHOT = d | a | t | c). Each result is a starting point, not a diagnosis.
// Contacts who never took the quiz get day3NoQuiz instead.
export const SNAPSHOT_LABELS: Record<string, string> = {
  d: 'The Disrupted Sleeper', a: 'The Connected Sleeper', t: 'The Out-of-Rhythm Sleeper', c: 'The Needs-a-Specialist Sleeper',
};

export const day3NoQuiz: Email = {
  day: 'Day 3 · no quiz', subject: 'What’s really behind your little one’s sleep?', preview: 'Two minutes, eight questions, a sensible starting point.',
  body: `Hi {first_name},\n\nBy now you've had a few days with the Gentle Sleep Reset. However it's gone, you've learned something useful about your little one.\n\nEvery child's sleep is shaped by a mix of things: how they fall asleep, the rhythm of their day, their temperament, and what's been going on lately. That's why I'm wary of one-size-fits-all advice.\n\nIf you'd like a clearer picture, my Sleep Snapshot takes two minutes. It asks eight questions about your days and nights, then points you to a sensible starting point. It's a starting point, not a diagnosis.\n\n${CALL_LINE}\n\nGeorgia`,
  cta: 'Take the Sleep Snapshot',
  buttons: [['Take the Sleep Snapshot', `${SITE}/assets/quiz`], ['Book a free assessment call', FREE_CALL_URL]],
  rule: 'Sent when SNAPSHOT is empty. Contacts who then take the quiz get their matching Day 3; everyone else moves on to Day 5.',
};

export const day3BySnapshot: Record<string, Email> = {
  d: { ...welcome[3], day: 'Day 3 · SNAPSHOT = d' },
  a: { day: 'Day 3 · SNAPSHOT = a', subject: 'Understanding why your little one wakes and looks for you', preview: 'It’s often about how they fell asleep.',
    body: `Hi {first_name},\n\nYour answers suggest your little one may be what I call a Connected Sleeper, so I want to share the one idea that helps so many families like yours.\n\nWe all surface between sleep cycles every 45–90 minutes. When a little one falls asleep feeding, rocking or with you beside them, they often wake and look for exactly that again. It isn't a bad habit, and it isn't something you've done wrong. It's simply how they've learned sleep works. (Hunger and comfort can play a part too, so it's always worth checking with your child's doctor about night feeds.)\n\nThe gentle change is in how they fall asleep at bedtime. Nights often follow.\n\nThat's what the Calm Nights Method walks you through: a structured, self-guided 14-night programme with two gentle starting points (Stay Close or Step Out & Check), a 27-page Guide & Workbook to keep by the bed, and checkpoints at nights 4, 7 and 14 so you always know whether to keep going, adjust, or get personalised support.\n\nNo cry-it-out. You stay present and responsive the whole way.\n\n${CALL_LINE}\n\nGeorgia`,
    cta: 'See the Calm Nights Method — $97',
    buttons: [['See the Calm Nights Method — $97', `${SITE}/assets/calm-nights`], ['Book a free assessment call', FREE_CALL_URL]],
    rule: 'Skip for anyone who has already bought Calm Nights or the bundle; send the general Day 3 instead.' },
  t: { day: 'Day 3 · SNAPSHOT = t', subject: 'Could your little one’s daily rhythm be affecting their sleep?', preview: 'Small timing shifts can make a big difference.',
    body: `Hi {first_name},\n\nYour answers suggest your little one's daily rhythm may be playing a part. That's often encouraging news: timing can be one of the gentler things to adjust.\n\nWake windows that are too short or too long can show up as bedtime battles, 30-minute naps and 5am starts, and they make every other sleep difficulty feel louder.\n\nStart small: keep the same morning wake-up time every day, and change one thing at a time by 15 minutes, holding it for three days.\n\nIf you'd like me to look at your actual day (naps, wake windows, bedtime) and talk through what to adjust first, a 60-minute troubleshooting call ($99) is a good fit. It's a one-off call rather than a full plan, because naps and schedules are something I build for each child individually.\n\n${CALL_LINE}\n\nGeorgia`,
    cta: 'Book a troubleshooting call — $99',
    buttons: [['Book a troubleshooting call — $99', TROUBLESHOOTING_URL], ['Book a free assessment call', FREE_CALL_URL]] },
  c: { day: 'Day 3 · SNAPSHOT = c', subject: 'When a more personalised approach makes all the difference', preview: 'Some children need a plan built around them.',
    body: `Hi {first_name},\n\nYour answers suggest something that's worth a closer look: your child's age, a medical, developmental or sensory factor, multiples, or the feeling that nothing quite sticks.\n\nWhen that's the case, a general programme is more likely to frustrate you than help. You deserve a plan built around your child, and someone to troubleshoot with while you follow it.\n\nThat's exactly what my 1:1 packages are for, including Specialised Sleep Support for children with additional needs. Every package starts with understanding your child, not a template.\n\n${WAITLIST_LINE}\n\nIn the meantime, a free 15-minute sleep assessment call is a gentle way to talk through where you are. There's no obligation.\n\nGeorgia`,
    cta: 'Book a free assessment call',
    buttons: [['Book a free assessment call', FREE_CALL_URL], ['Join the waiting list', WAITLIST_URL]] },
};

// A/B subject lines for the emails that carry an offer (Brevo lets you test two).
export const SUBJECT_TESTS: Record<string, string> = {
  'Calmer bedtimes, but still waking?': 'Still waking, even though bedtimes feel calmer?',
  'Understanding why your little one wakes and looks for you': 'Why some little ones wake looking for the same help',
  'Finding the right support for your family': 'Three ways forward (and how to choose yours)',
  'Night 7: is the skill landing?': 'Halfway: what your tracker is telling you',
};

// ---------------------------------------------------------------------------
// Brevo-ready HTML (inline styles, table layout). Paste into Brevo → Templates →
// “Code your own”. {first_name} becomes Brevo's contact merge tag.
const esc = (t: string) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function renderEmailHtml(e: Email, opts: { preview?: boolean } = {}): string {
  const name = opts.preview ? 'Sarah' : `{{ contact.FIRSTNAME | default : 'there' }}`;
  const unsub = opts.preview ? '#' : '{{ unsubscribe }}';
  const paras = esc(e.body).replace(/\{first_name\}/g, name).split(/\n\n+/)
    .map((p) => `<p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#3F3B38;">${p.replace(/\n/g, '<br>')}</p>`).join('');
  const btn = (label: string, href: string, dark: boolean) =>
    `<tr><td style="padding:6px 0;"><a href="${href}" style="display:inline-block;padding:14px 26px;border-radius:999px;font-family:Arial,sans-serif;font-size:14px;font-weight:bold;text-decoration:none;${dark ? 'background:#3F3B38;color:#F3EAE3;' : 'border:1.5px solid #3F3B38;color:#3F3B38;'}">${esc(label)}</a></td></tr>`;
  const buttons = e.buttons
    ? e.buttons.map(([l, h], i) => btn(l, h, i === 0)).join('')
    : btn(e.cta, CTA_LINKS[e.cta] || SITE, true);
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(e.subject)}</title></head>
<body style="margin:0;background:#F3EAE3;font-family:Georgia,'Times New Roman',serif;">
<span style="display:none;max-height:0;overflow:hidden;">${esc(e.preview)}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F3EAE3;"><tr><td align="center" style="padding:28px 12px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#FBF7F3;border-radius:18px;">
<tr><td align="center" style="padding:28px 28px 8px;"><img src="${opts.preview ? '' : SITE}/assets/img/logo.png" width="84" alt="Thyme4Sleep" style="display:block;border:0;"></td></tr>
<tr><td style="padding:16px 32px 8px;">${paras}<table role="presentation" cellpadding="0" cellspacing="0">${buttons}</table></td></tr>
<tr><td style="padding:24px 32px 28px;border-top:1px solid #E6DAD0;font-family:Arial,sans-serif;font-size:12px;line-height:1.5;color:#897E77;">
Thyme4Sleep LLC · Gentle pediatric sleep coaching by Georgia Miller<br>General education only, not medical advice.<br>
<a href="${unsub}" style="color:#897E77;">Unsubscribe</a></td></tr>
</table></td></tr></table></body></html>`;
}
