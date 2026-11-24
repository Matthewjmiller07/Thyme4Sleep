// Copy for the Thyme4Sleep social kit. Frames are rendered at /assets/social/frames
// and exported to PNG by scripts/assets/render.mjs.

export const CAROUSEL_REGRESSION = [
  { kind: 'cover', title: 'Is it a regression…', accent: 'or a habit?', sub: '5 signs to tell the difference', img: 'crib-awake' },
  { kind: 'point', n: '01', title: 'It started with a clear trigger', body: 'Illness, travel, a new tooth, a leap. Regressions have a reason — and an end, usually within 2–6 weeks.' },
  { kind: 'point', n: '02', title: 'It’s lasted longer than 6 weeks', body: 'If the “regression” has outlived the cold, the trip and the tooth, the pattern that crept in to cope is likely what’s left.' },
  { kind: 'point', n: '03', title: 'Wake-ups happen like clockwork', body: '11:40pm. 2:15am. 4:50am. Habit loops keep time. True disruption is messier.' },
  { kind: 'point', n: '04', title: 'Only one thing works, every time', body: 'The feed, the rock, your bed. When one exact support is the only way back to sleep, that’s an association — and it’s fixable.' },
  { kind: 'cta', title: 'Not sure which one you’re dealing with?', body: 'Take the free 2-minute Sleep Snapshot. Link in bio.', img: 'mother-hold' },
];

export const CAROUSEL_RESET = [
  // Follows Step 1 of the published Gentle Sleep Reset: stabilize for 3–5 days before changing anything
  { kind: 'cover', title: 'The 3–5 day', accent: 'Gentle Sleep Reset', sub: 'After illness, travel or a rough patch', img: 'lamp-sleep' },
  { kind: 'point', n: '01', title: 'Keep one bedtime window', body: 'Bedtime within the same 30 minutes, every night. Consistency calms the nervous system, and a regulated child settles more easily.' },
  { kind: 'point', n: '02', title: 'Keep the wind-down predictable', body: 'Same steps, same order, same calm energy. Slower is fine: calmer, not necessarily quicker.' },
  { kind: 'point', n: '03', title: 'Respond the same way overnight', body: 'One calm, familiar response to wake-ups, every time. No new strategies, no sudden changes. Predictable feels safe.' },
  { kind: 'cta', title: 'Hold steady for 3–5 days.', body: 'Get the full free guide — link in bio.', img: 'baby-feet' },
];

// Relaunch series after maternity leave: posts 2–4, following the Gentle Sleep Reset carousel.
// Images: a name means /assets/img/<name>.webp; a path with a folder is used as-is under /assets/img/.
export const CAROUSEL_BACK = [
  { kind: 'cover', title: 'I’m back,', accent: 'and so glad you’re here.', sub: 'After maternity leave', img: 'reset-to-rest/yawn.jpg' },
  { kind: 'point', n: '01', title: 'Free, whenever you need it', body: 'The Gentle Sleep Reset guide and my 2‑minute Sleep Snapshot quiz. A calm place to start after a rough patch.' },
  { kind: 'point', n: '02', title: 'Do it yourself, gently', body: 'From Reset to Rest, for fewer night wakings once sleep feels steady. The Calm Nights Method, for changing how your child falls asleep.' },
  { kind: 'point', n: '03', title: 'Want me beside you?', body: 'Book a free 15-minute sleep assessment call, or join my 1:1 waiting list to be the first to hear when spots open.' },
  { kind: 'cta', title: 'Ready when you are.', body: 'Book your free call — link in bio.', img: 'reset-to-rest/giggle.jpg' },
];

export const CAROUSEL_REST = [
  // Follows the four steps of the published From Reset to Rest guide
  { kind: 'cover', title: 'Calmer bedtimes,', accent: 'but still waking?', sub: 'From Reset to Rest', img: 'reset-to-rest/teddy.jpg' },
  { kind: 'point', n: '01', title: 'Confirm readiness', body: 'Reducing wake-ups works best once nights feel steady. Check your little one is ready before you change anything.' },
  { kind: 'point', n: '02', title: 'Identify the driver', body: 'A habit loop, a timing imbalance, or needing one specific support to get back to sleep. Each one needs a different step.' },
  { kind: 'point', n: '03', title: 'Choose your anchor', body: 'One calm, consistent overnight response, held for three nights. Predictable is what feels safe.' },
  { kind: 'point', n: '04', title: 'Reduce one thing, gently', body: 'A shorter feed, a little less rocking, a brief pause. Small, respectful changes, one at a time.' },
  { kind: 'cta', title: 'Fewer wake-ups, without cry-it-out.', body: 'Video walkthrough + printable guide — link in bio.', img: 'crib-awake' },
];

export const CAROUSEL_CALM = [
  // Matches the Calm Nights sales page and the 27-page Guide & Workbook
  { kind: 'cover', title: 'The Calm Nights', accent: 'Method', sub: 'A self-guided 14-night program', img: 'lamp-sleep' },
  { kind: 'point', n: '01', title: 'Is it for you?', body: 'Your child is healthy, 6 months to around 4, and needs a feed, rocking or you beside them to fall asleep.' },
  { kind: 'point', n: '02', title: 'Two gentle starting points', body: 'Stay Close, or Step Out & Check. You choose the one that fits your child, and you.' },
  { kind: 'point', n: '03', title: '14 nights, with checkpoints', body: 'Check-ins at nights 4, 7 and 14 tell you whether to keep going, adjust, or get personalized support.' },
  { kind: 'point', n: '04', title: 'A 27-page Guide & Workbook', body: 'Scripts, trackers and a hard-night plan to keep by the bed, whether you share nights or do this on your own.' },
  { kind: 'cta', title: 'No cry-it-out.', body: 'You stay present the whole way. Link in bio.', img: 'toddler-bed' },
];

export const QUOTES = [
  { q: 'Comfort is never removed.', a: 'Confusion is.', bg: 'char' },
  { q: 'Your child’s sleep isn’t broken.', a: 'And you haven’t failed them.', bg: 'cream' },
  { q: 'Sleep improves with clarity and consistency,', a: 'not effort.', bg: 'sage' },
  { q: 'Crying is communication,', a: 'not harm.', bg: 'peach' },
];

export const STORIES = [
  { eyebrow: 'Free quiz · 2 minutes', title: 'What’s really behind the 3am wake-ups?', cta: 'Take the Sleep Snapshot', img: 'crib-awake' },
  { eyebrow: 'Free guide', title: 'The Gentle Sleep Reset', cta: 'Grab it free', img: 'newborn' },
  { eyebrow: 'New · Self-guided program', title: 'The Calm Nights Method', cta: 'No cry-it-out. 14 nights.', img: 'mother-hold' },
];

export const CAPTIONS = [
  { for: 'Carousel · Regression or habit?', text: 'Is it a regression… or has it become a habit? 🌙\n\nRegressions are real — and they end. But when the cold has cleared, the tooth is through and the trip is over, the patterns we leaned on to get through it often stay behind.\n\nSwipe for the 5 signs, then take my free 2-minute Sleep Snapshot (link in bio) to find out what’s really driving your little one’s wake-ups. 💛\n\n#babysleep #sleepregression #gentlesleep #toddlersleep #pediatricsleepcoach #nocryitout #thyme4sleep' },
  { for: 'Carousel · 3–5 day reset', text: 'Sleep fell apart after a rough patch? Before you change everything, do less — more consistently. 🌿\n\nFor the next 3–5 days: keep bedtime within the same 30-minute window, keep the wind-down predictable, and respond to wake-ups the same calm way every time. That’s it.\n\nMy free Gentle Sleep Reset guide walks you through it step by step — link in bio.\n\n#gentlesleep #babysleeptips #sleeptraining #newmom #toddlermom #thyme4sleep' },
  { for: 'Quote card', text: 'Comfort is never removed. Confusion is. 🤍\n\nGentle sleep coaching isn’t about stepping away from your child. It’s about responding in a way that’s calm, clear and the same every time — so they always know what comes next.\n\n#gentleparenting #babysleep #nocryitout #thyme4sleep' },
  { for: 'Story · Calm Nights launch', text: 'It’s here 🌙 The Calm Nights Method — a structured, self-guided 14-night program for families ready to do it themselves. Six clear steps, two gentle starting points and check-ins at nights 4, 7 and 14. Tap the link to see if it’s right for you.' },
  { for: "Relaunch post 2 · Carousel · I’m back", text: "Hello again, friends. 🌿\n\nMy maternity leave is over, and I'm easing back into Thyme4Sleep with a full heart. Thank you for every kind message and for your patience while I was away.\n\nHere's how I can help right now:\n\n→ Free, whenever you need it: the Gentle Sleep Reset guide and my 2-minute Sleep Snapshot quiz.\n→ Do it yourself, gently: From Reset to Rest, for fewer night wakings once sleep feels steady, and the Calm Nights Method, for changing how your child falls asleep.\n→ Want me beside you? Book a free 15-minute sleep assessment call, or join my 1:1 waiting list to be the first to hear when spots open.\n\nSwipe through, then tell me in the comments: what's the hardest part of nights for you right now? 💛\n\nLink in bio.\n\n#gentlesleep #babysleep #toddlersleep #nocryitout #babysleeptips #pediatricsleepcoach #newmom #thyme4sleep" },
  { for: "Relaunch post 3 · Carousel · From Reset to Rest", text: "Bedtime feels calmer… so why is your little one still waking? 🌙\n\nOnce sleep has steadied, night wakings that hang on are usually kept going by one of three things: a habit loop, a timing imbalance, or needing one specific support (a feed, rocking, bouncing) to get back to sleep.\n\nFrom Reset to Rest is my gentle night-waking reduction protocol for exactly this stage. A video walkthrough and printable guide help you:\n\n1. Confirm your little one is ready\n2. Identify what's driving the wake-ups\n3. Choose one calm anchor response, held for three nights\n4. Reduce one thing at a time, gently\n\nNo cry-it-out, no rigid schedule. From $37 (shown in your currency on the site). Link in bio.\n\nNot steady yet? Start with my free Gentle Sleep Reset first. 🌿\n\n#gentlesleep #babysleep #toddlersleep #nocryitout #babysleeptips #pediatricsleepcoach #newmom #thyme4sleep #nightwaking" },
  { for: "Relaunch post 4 · Carousel · The Calm Nights Method", text: "If your little one needs a feed, rocking or you beside them to fall asleep, they'll often look for that same help at every wake-up. 🌙\n\nThe Calm Nights Method gently changes how your child falls asleep at bedtime, and nights often follow.\n\nInside:\n→ Two gentle starting points: Stay Close, or Step Out & Check\n→ 14 nights, with checkpoints at nights 4, 7 and 14\n→ A 27-page Guide & Workbook with scripts, trackers and a hard-night plan, whether you share nights with a partner or co-parent or do this on your own\n\nFor healthy children from 6 months to around 4. No cry-it-out: you stay present and responsive the whole way.\n\nFrom $97 (shown in your currency on the site). Link in bio.\n\nNot sure it's the right fit? Book a free 15-minute sleep assessment call, and I'll tell you honestly. 💛\n\n#gentlesleep #babysleep #toddlersleep #nocryitout #babysleeptips #pediatricsleepcoach #newmom #thyme4sleep #bedtimeroutine" },
];
