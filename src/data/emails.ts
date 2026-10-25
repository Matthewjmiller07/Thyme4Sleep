// Thyme4Sleep email sequences, in Georgia's voice. Shared by /assets/emails (copy reference)
// and /assets/email-flow (visual flow + Brevo-ready HTML).

// buttons: one-click answers; each link both lands on the check-in page and lets the
// email platform tag the subscriber. rule: the automation logic to set up for that email.
export interface Email { day: string; subject: string; preview: string; body: string; cta: string; buttons?: [string, string][]; rule?: string }

export const CHECK = 'https://thyme4sleep.com/assets/calm-nights/check-in';
const checkIn = (n: number): [string, string][] => [
  ['Things are moving', `${CHECK}?n=${n}&s=on-track`],
  ['Some progress — stuck on something', `${CHECK}?n=${n}&s=adjust`],
  ['Little change, or something feels off', `${CHECK}?n=${n}&s=support`],
];

export const welcome: Email[] = [
  { day: 'Day 0 · Instantly', subject: 'Your Gentle Sleep Reset is here 🌿', preview: 'Plus the one thing to do tonight.',
    body: `Hi {first_name},\n\nYour guide is attached — and here it is again in case it hides: [The Gentle Sleep Reset].\n\nBefore you read all of it, do just one thing tonight: decide what time your little one will wake up tomorrow, and set an alarm for it. That's it.\n\nA consistent morning wake-up is the quiet anchor everything else hangs from. It rebuilds sleep pressure and nudges the body clock back on track — even after a terrible night.\n\nTomorrow I'll share why "doing less" is the fastest way back to calmer nights.\n\nWarmly,\nGeorgia\nThyme4Sleep`,
    cta: 'Download the guide' },
  { day: 'Day 1', subject: 'Why doing less fixes sleep faster', preview: 'The mistake almost every tired parent makes.',
    body: `Hi {first_name},\n\nWhen sleep falls apart, our instinct is to change everything: a new bedtime, a new method, a new white-noise machine, all by Thursday.\n\nBut children settle through predictability. Every change — even a good one — is something new for them to figure out.\n\nSo for the next 72 hours, the job is simply to stabilise:\n• Same wake-up time (within 30 minutes)\n• One calm bedtime window\n• One consistent response to wake-ups\n\nNo new strategies. No switching mid-night. Your child's sleep isn't broken, and you haven't failed them. It just needs steadying before it can improve.\n\nNot sure what's really driving the wake-ups? My 2-minute Sleep Snapshot will tell you.\n\nGeorgia`,
    cta: 'Take the Sleep Snapshot' },
  { day: 'Day 2', subject: 'The 3am question: go in, or wait?', preview: 'Pause before you problem-solve.',
    body: `Hi {first_name},\n\nHere's something that surprises most parents: many of the noises you hear overnight aren't full wake-ups. They're your child moving between sleep cycles — something we all do every 45–90 minutes.\n\nIf we rush in at the first sound, we can accidentally turn a two-minute stir into a 45-minute wake-up.\n\nTonight, try a short pause before you respond. Listen. Is it grizzling that rises and falls, or crying that's building? On a scale of 1–10, under 5 is often them working it out.\n\nWhen you do go in, use the same calm response every time. Predictable is what feels safe.\n\nTomorrow: the real reason some children wake at the same time every night.\n\nGeorgia`,
    cta: 'Read the full reset guide' },
  { day: 'Day 3', subject: 'Calmer bedtimes… but still waking?', preview: 'This is where most families get stuck.',
    body: `Hi {first_name},\n\nBy now, a lot of families notice bedtime feels calmer. Fewer false starts. A little more confidence.\n\nBut the night wakings? Often still there.\n\nThat's normal — and it's because stabilising and reducing are two different steps. Once calm is back, wake-ups that persist are usually maintained by one of three things:\n\n1. A habit loop (waking like clockwork)\n2. A timing imbalance (short naps, long wake windows, early rising)\n3. A sleep association (only one exact thing gets them back to sleep)\n\nFrom Reset to Rest is the gentle protocol I created for exactly this moment — a video walkthrough plus a workbook that helps you identify the driver and reduce wakings one small step at a time. No cry-it-out, no rigid schedule.\n\nIt's $37, and you can start tonight.\n\nGeorgia`,
    cta: 'See From Reset to Rest — $37' },
  { day: 'Day 5', subject: 'Which kind of support do you need?', preview: 'An honest guide to your next step.',
    body: `Hi {first_name},\n\nOver the last few days you've steadied the foundations. Thank you for letting me be part of that.\n\nHere's an honest guide to what comes next:\n\n→ Bedtime is calm, but night wakings remain: From Reset to Rest ($37) — gently reduce one night-time support, step by step.\n→ Your child needs a feed, rocking or you to fall asleep, and you're ready to follow a structured programme on your own: The Calm Nights Method ($97).\n→ You'd like a plan written for your child (naps and schedule included), there's a medical or developmental factor, you have multiples, or you simply want me in your corner: 1:1 coaching, from $249, with a 14-day satisfaction guarantee.\n\nWhatever you choose, keep the morning anchor. It's the single most powerful habit in all of this.\n\nYou're doing more right than you think.\n\nGeorgia`,
    cta: 'Find your next step' },
];

export const ascend: Email[] = [
  { day: 'Purchase · Instantly', subject: 'You’re in — start here', preview: 'How to get the most from your plan in the first 48 hours.',
    body: `Hi {first_name},\n\nThank you for trusting me with your family's sleep. Your access link: [link].\n\nThree things for the next 48 hours:\n1. Read it all the way through once, ideally with your partner.\n2. Choose one approach and commit to it.\n3. Start the tracker tonight — even before you change anything.\n\nAny question at all, just reply. I read every email.\n\nGeorgia`,
    cta: 'Open my plan' },
  { day: 'Purchase + 3 days', subject: 'Night 3 got harder? Read this.', preview: 'It usually means it’s working.',
    body: `Hi {first_name},\n\nIf the last night or two felt harder, you're not alone — and it's often a good sign. Children commonly test whether new patterns are "real" around night three.\n\nThe families who see the biggest change are the ones who hold steady for two more nights. Keep your response the same, keep the morning anchor, and look at your tracker for the small wins (shorter wake-ups count!).\n\nGeorgia`,
    cta: 'Revisit the troubleshooting chapter' },
  { day: 'Purchase + 7 days', subject: 'Is it bedtime, not the night?', preview: 'When reducing wake-ups isn’t enough.',
    body: `Hi {first_name},\n\nOne week in! Reset to Rest works on the night: reducing one support, gently, a step at a time.\n\nBut for some children the wake-ups are really about bedtime. If your little one still needs a feed, rocking or you beside them to fall asleep, they'll often look for that same help at every wake-up — and reducing it overnight only goes so far.\n\nThat's what the Calm Nights Method is for: a structured, self-guided 14-night programme that changes how your child falls asleep, then applies the same calm response overnight and in the early morning. It's general guidance rather than a plan written for your child, with checkpoints that tell you when personalised support would serve you better.\n\nIf your bedtime is already calm, stick with Reset to Rest — you don't need both.\n\nGeorgia`,
    cta: 'See if Calm Nights fits — $97' },
  { day: 'Purchase + 12 days', subject: 'How are nights looking?', preview: 'Hit reply and tell me — I’d love to know.',
    body: `Hi {first_name},\n\nI'd love to hear how things are going. Hit reply and tell me one win and one thing that still feels hard.\n\nIf you've had a breakthrough, would you share a sentence I could use as a review? It helps other exhausted parents find gentle support. (And if a friend could use help, my referral programme gives you both $100 off a 1:1 package.)\n\nGeorgia`,
    cta: 'Reply to Georgia' },
  { day: 'Purchase + 16 days', subject: 'When a plan isn’t enough', preview: 'Some children need a plan built around them.',
    body: `Hi {first_name},\n\nIf things are still not shifting, please hear this: it's not you. Some children — because of temperament, a medical or developmental factor, or a family situation — need a plan built specifically around them, and someone to troubleshoot with day by day.\n\nThat's exactly what my 1:1 packages are for: a personalised plan, a consultation call and daily support while you put it into practice, with a 14-day results guarantee.\n\nMention your guide when you book and I'll know exactly where you're starting from.\n\nGeorgia`,
    cta: 'See 1:1 packages' },
];

export const calm: Email[] = [
  { day: 'Purchase · Instantly', subject: 'You’re in — your Calm Nights path starts here', preview: 'Step 1, plus one quick question.',
    body: `Hi {first_name},\n\nThank you for trusting me with your family's sleep. Your programme is here: [link to /assets/calm-nights/plan].\n\nCalm Nights is a six-step path, and the order matters:\n1. Understand how sleep works\n2. Check fit & readiness\n3. Prepare (3–7 days)\n4. Choose a gentle starting point\n5. The 14 nights\n6. Review at nights 4, 7 and 14\n\nBefore anything else, one quick question. Calm Nights is general guidance for healthy children from 6 months to around 4. It isn't the right tool if your baby is under 6 months; if there's reflux, allergies, snoring or a weight concern; if your child has additional needs; if you have twins; or if naps are the main problem.\n\nDoes any of that apply to you? Tap one below — it takes a second, and it means I can point you in the right direction.\n\nGeorgia`,
    cta: 'Open my programme',
    buttons: [['We’re a good fit — let’s begin', `${CHECK}?n=0&s=on-track`], ['Something on that list applies to us', `${CHECK}?n=0&s=support`]],
    rule: '“Something applies” click → tag cn-support, exit this sequence, start Sequence 4.' },
  { day: 'Purchase + 2 days', subject: 'The three prep changes that matter most', preview: 'And when to start night one.',
    body: `Hi {first_name},\n\nIf you do nothing else from step 3, do these three:\n\n• Move the bedtime milk to the start of the routine, lights on, outside the bedroom.\n• Fix a morning wake-up time and keep it — even after a rough night.\n• Choose one key phrase that every adult says, word for word.\n\nThen pick your starting point (step 4 — three questions, five minutes) and choose a night one when you'll have two weeks of mostly home bedtimes.\n\nTap below on the day you start. I'll time your checkpoint emails from that night.\n\nGeorgia`,
    cta: 'Open step 3: Prepare',
    buttons: [['We’re starting tonight', `${CHECK}?n=0&s=on-track&started=1`]],
    rule: 'Click → tag cn-started and start the “nights” timer (emails 3–6). No click by day 7 → start the timer anyway.' },
  { day: 'Night 4 (started + 4 days)', subject: 'Night 4 checkpoint: how’s it going?', preview: 'Night 3 is often the hardest. Here’s what to look for.',
    body: `Hi {first_name},\n\nIf night 3 felt harder, you're not alone. Children commonly test whether a new pattern is "real" around now — and the families who see the biggest change are the ones who hold steady.\n\nGrab your tracker and look for any one of these:\n• Lay-down is a little calmer\n• Falling asleep takes less time than night 1\n• At least one wake-up was shorter or quieter\n\nThen tap the answer that fits best. I'll show you exactly what to do next.\n\nGeorgia`,
    cta: 'Open step 6: Review', buttons: checkIn(4),
    rule: '“Little change” → tag cn-support, start Sequence 4 (keep in this sequence). “Stuck” → tag cn-adjust.' },
  { day: 'Night 7 (started + 7 days)', subject: 'Night 7: is the skill landing?', preview: 'Your halfway checkpoint.',
    body: `Hi {first_name},\n\nOne week in. This is the most useful checkpoint of all.\n\nLook at your tracker:\n• Most bedtimes, do they fall asleep with your starting point rather than the old support?\n• Are wake-ups fewer, or shorter?\n• Do you feel clearer about what to do at 2am?\n\nIf you've followed the plan every time (3am included) and very little has changed, please hear this: it isn't you. It's information that your child needs a plan built around them.\n\nGeorgia`,
    cta: 'Open step 6: Review', buttons: checkIn(7),
    rule: '“Little change” → tag cn-support, exit, start Sequence 4. “Stuck” when already tagged cn-adjust → also start Sequence 4. No click at all → send the one-line reply email below.' },
  { day: 'Night 7 + 1 day · only if no check-in click', subject: 'Quick one: how are nights?', preview: 'One line is plenty.',
    body: `Hi {first_name},\n\nI haven't heard how things are going, so I just wanted to check in. Hit reply with one line: what's better, and what still feels hard?\n\nI read every reply, and if a general plan isn't the right fit for your family, I'll tell you honestly.\n\nGeorgia`,
    cta: 'Reply to Georgia',
    rule: 'Georgia replies personally; if the reply describes a support signal, add tag cn-support by hand.' },
  { day: 'Night 14 (started + 14 days)', subject: 'Night 14: where have you landed?', preview: 'Your final checkpoint — and what comes next.',
    body: `Hi {first_name},\n\nTwo weeks! Whatever your tracker says, you've given your child something valuable: two weeks of calm, predictable, loving responses.\n\nCheck in with your final checkpoint:\n• Falling asleep on their own most nights?\n• Wake-ups resettling with a brief response — or not happening?\n• Mornings starting at 6am or later?\n\nTap the one that fits.\n\nGeorgia`,
    cta: 'Open “Keeping it going”', buttons: checkIn(14),
    rule: '“Little change” or a second “stuck” → tag cn-support, start Sequence 4. “Moving” → tag cn-success.' },
  { day: 'Night 21 · tag cn-success only', subject: 'Would you share a sentence?', preview: 'It helps other tired parents find gentle support.',
    body: `Hi {first_name},\n\nI'm so glad nights are calmer. If you have a moment, would you reply with a sentence or two about your experience? With your permission, I'd love to share it (first name and child's age only) so other exhausted parents can find gentle support.\n\nAnd if a friend could use help, send them to thyme4sleep.com.\n\nWobbles will come — a cold, a tooth, a holiday. When they do, steady things with the free Gentle Sleep Reset, then pick your starting point back up.\n\nGeorgia`,
    cta: 'Reply with a review' },
];

export const support: Email[] = [
  { day: 'Tag cn-support · Instantly', subject: 'It’s not you — here’s what a personalised plan adds', preview: 'The honest difference between Calm Nights and 1:1.',
    body: `Hi {first_name},\n\nThank you for telling me where you are. First, the most important thing: this isn't a failure. Calm Nights is a general framework, and some children — because of age, temperament, health, or a family situation — need a plan built around them.\n\nHere's what changes with 1:1:\n\n• Starter (from $249): I review a detailed intake form and write a plan for your child, including naps, daily schedule and environment.\n• Standard (from $549): your personalised plan, a 60-minute call, and two weeks of email and text support while you put it into practice.\n• Specialised Sleep Support: for children with additional needs or neurodivergence.\n\nNot sure which? Reply with one line about where you're stuck and I'll tell you honestly which fits — including if you don't need either.\n\nGeorgia`,
    cta: 'See 1:1 packages', buttons: [['See 1:1 packages', 'https://thyme4sleep.com/pricing?from=calm-nights'], ['Ask Georgia which fits', 'mailto:georgia@thyme4sleep.com?subject=Calm%20Nights%20%E2%80%94%20which%20package%3F']] },
  { day: 'Tag cn-support + 2 days', subject: 'What happens when you book', preview: 'And why you won’t be starting from scratch.',
    body: `Hi {first_name},\n\nIf you're weighing up 1:1, here's what it looks like:\n\n1. You complete an intake form about your child, your days and your nights.\n2. For Standard, we have a 60-minute call to talk it all through.\n3. You receive a plan written for your child within 5 business days.\n4. With Standard, I'm on hand by email and text for two weeks while you follow it.\n\nBring your Calm Nights tracker and checkpoint page. I'll see exactly what you've tried, what moved and what didn't — so we build on your work rather than start over.\n\nGeorgia`,
    cta: 'See 1:1 packages' },
  { day: 'Tag cn-support + 5 days', subject: 'One last note from me', preview: 'No pressure — just this.',
    body: `Hi {first_name},\n\nI won't keep landing in your inbox about this. Whatever you decide, keep the morning anchor and the same calm response to wake-ups — they're the foundation of everything.\n\nIf you'd like me in your corner, you know where I am. And if you just have a question, reply any time.\n\nGeorgia`,
    cta: 'Reply to Georgia' },
];

export const SEQUENCES: [string, string, string, Email[]][] = [
  ['welcome', 'Sequence 1 · Free → $37', 'Trigger: Gentle Sleep Reset download or Sleep Snapshot opt-in. Goal: deliver real value, build trust, then offer Reset to Rest on day 3.', welcome],
  ['ascend', 'Sequence 2 · Reset to Rest buyers', 'Trigger: Reset to Rest purchase (skip email 3 for Calm Nights buyers). Goal: drive results, collect reviews and referrals, and point families whose real issue is bedtime to Calm Nights — or to 1:1.', ascend],
  ['calm', 'Sequence 3 · The Calm Nights pathway', 'Trigger: Calm Nights or bundle purchase (tag cn-buyer). Goal: walk families through the six steps, check in at nights 4, 7 and 14, and route anyone who needs it to personalised coaching automatically. Exit: any 1:1 purchase.', calm],
  ['support', 'Sequence 4 · Personalised support branch', 'Trigger: tag cn-support (added by a check-in click or by Georgia). Goal: an honest, low-pressure route from Calm Nights to the right 1:1 package. Exit: any 1:1 purchase, or a reply saying no thanks.', support],
];

// ---------------------------------------------------------------------------
// Where each email's main button goes. Keyed by the CTA label used above.
const SITE = 'https://thyme4sleep.com';
export const CTA_LINKS: Record<string, string> = {
  'Download the guide': `${SITE}/essential-checklist.pdf`,
  'Take the Sleep Snapshot': `${SITE}/assets/quiz`,
  'Read the full reset guide': `${SITE}/essential-checklist.pdf`,
  'See From Reset to Rest — $37': `${SITE}/reset-preview`,
  'Find your next step': `${SITE}/assets/calm-nights#compare`,
  'Open my plan': `${SITE}/reset`,
  'Revisit the troubleshooting chapter': `${SITE}/reset`,
  'See if Calm Nights fits — $97': `${SITE}/assets/calm-nights`,
  'Reply to Georgia': 'mailto:georgia@thyme4sleep.com',
  'Reply with a review': 'mailto:georgia@thyme4sleep.com?subject=My%20Calm%20Nights%20review',
  'See 1:1 packages': `${SITE}/pricing?from=email`,
  'Open my programme': `${SITE}/assets/calm-nights/plan`,
  'Open step 3: Prepare': `${SITE}/assets/calm-nights/plan#prep`,
  'Open step 6: Review': `${SITE}/assets/calm-nights/plan#review`,
  'Open “Keeping it going”': `${SITE}/assets/calm-nights/plan#next`,
  'See the Calm Nights Method — $97': `${SITE}/assets/calm-nights`,
  'Book a troubleshooting call — $99': `${SITE}/pricing?from=email#troubleshooting`,
};

// ---------------------------------------------------------------------------
// Day 3 of the welcome series, split by Sleep Snapshot result (Brevo contact
// attribute SNAPSHOT = d | a | t | c). Contacts who never took the quiz get the
// default Day 3 above (Reset to Rest).
export const SNAPSHOT_LABELS: Record<string, string> = {
  d: 'The Disrupted Sleeper', a: 'The Connected Sleeper', t: 'The Out-of-Rhythm Sleeper', c: 'The Needs-a-Specialist Sleeper',
};

export const day3BySnapshot: Record<string, Email> = {
  d: welcome[3],
  a: { day: 'Day 3 · SNAPSHOT = a', subject: 'Why they wake looking for the feed (or you)', preview: 'It’s not hunger. It’s how they fell asleep.',
    body: `Hi {first_name},\n\nYour Sleep Snapshot came back as The Connected Sleeper — so I want to share the one idea that changes everything for families like yours.\n\nWe all surface between sleep cycles every 45–90 minutes. When your little one fell asleep feeding, rocking or with you beside them, they wake up and look for exactly that again. It isn't hunger, and it isn't a bad habit. It's just how they learned sleep works.\n\nThe gentle fix is changing how they fall asleep at bedtime. Nights follow.\n\nThat's what the Calm Nights Method walks you through: a structured, self-guided 14-night programme with two gentle starting points (Stay Close or Step Out & Check), a printable tracker, and checkpoints at nights 4, 7 and 14 so you always know whether to keep going, adjust, or get personalised support.\n\nNo cry-it-out. You stay present and responsive the whole way.\n\nGeorgia`,
    cta: 'See the Calm Nights Method — $97' },
  t: { day: 'Day 3 · SNAPSHOT = t', subject: 'Is it the schedule, not the sleep?', preview: 'Small timing shifts, big difference.',
    body: `Hi {first_name},\n\nYour Sleep Snapshot came back as The Out-of-Rhythm Sleeper. That's honestly good news: timing is often the quickest thing to improve.\n\nToo-short or too-long wake windows show up as bedtime battles, 30-minute naps and 5am starts — and they make every other sleep problem louder.\n\nStart small: keep the same morning wake-up time every day, and change one thing at a time by 15 minutes, holding it for three days.\n\nIf you'd like me to look at your actual day — naps, wake windows, bedtime — and tell you exactly what to move, a 60-minute troubleshooting call is the fastest route. Naps and schedules are something I build for each child individually, so this is where I can help most.\n\nGeorgia`,
    cta: 'Book a troubleshooting call — $99' },
  c: { day: 'Day 3 · SNAPSHOT = c', subject: 'You don’t need a generic plan', preview: 'Some children need one built around them.',
    body: `Hi {first_name},\n\nYour Sleep Snapshot flagged something important: your child's age, a medical or developmental factor, multiples, or the feeling that nothing sticks.\n\nWhen that's the case, a general programme is more likely to frustrate you than help. You deserve a plan built around your child — and someone to troubleshoot with while you follow it.\n\nThat's exactly what my 1:1 packages are for, including Specialised Sleep Support for children with additional needs. Every package starts with understanding your child, not a template.\n\nNot sure which fits? Reply with one line about what's hardest right now and I'll tell you honestly.\n\nGeorgia`,
    cta: 'See 1:1 packages' },
};

// A/B subject lines for the emails that carry an offer (Brevo lets you test two).
export const SUBJECT_TESTS: Record<string, string> = {
  'Calmer bedtimes… but still waking?': 'The real reason they still wake at 2am',
  'Why they wake looking for the feed (or you)': 'Is this the real reason they wake every night?',
  'Which kind of support do you need?': '3 ways forward (and how to pick yours)',
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
