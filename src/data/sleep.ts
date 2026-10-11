// Shared, general-guidance sleep data used across the /assets library.
// Ranges are typical averages for healthy, full-term children — every child differs.

export interface AgeBand {
  id: string;
  age: string;
  wakeWindow: string;
  naps: string;
  dayTotal: string;
  night: string;
  totalSleep: string;
  bedtime: string;
  tip: string;
}

export const AGE_BANDS: AgeBand[] = [
  { id: '0-3m', age: '0–3 months', wakeWindow: '45 min – 1.5 hr', naps: '4–6 (often short)', dayTotal: '4–6 hr', night: '8–10 hr (with feeds)', totalSleep: '14–17 hr', bedtime: 'Late & fluid — often 9–11pm', tip: 'No schedules yet. Follow sleepy cues, lots of daylight in the morning, dim evenings.' },
  { id: '4-5m', age: '4–5 months', wakeWindow: '1.5 – 2.5 hr', naps: '3–4', dayTotal: '3–4 hr', night: '10–12 hr', totalSleep: '12–16 hr', bedtime: '6:30 – 8:00pm', tip: 'Sleep architecture matures around 4 months — a great time to start a predictable bedtime routine.' },
  { id: '6-8m', age: '6–8 months', wakeWindow: '2 – 3 hr', naps: '3 → 2', dayTotal: '2.5–3.5 hr', night: '11–12 hr', totalSleep: '12–16 hr', bedtime: '6:30 – 7:30pm', tip: 'The 3-to-2 nap transition usually lands here. Drop the late catnap when it starts pushing bedtime.' },
  { id: '9-12m', age: '9–12 months', wakeWindow: '3 – 4 hr', naps: '2', dayTotal: '2–3 hr', night: '11–12 hr', totalSleep: '12–16 hr', bedtime: '6:30 – 7:30pm', tip: 'Standing, crawling and separation awareness can unsettle nights — practise new skills lots in the day.' },
  { id: '12-18m', age: '12–18 months', wakeWindow: '3.5 – 5.5 hr', naps: '2 → 1', dayTotal: '2–3 hr', night: '11–12 hr', totalSleep: '11–14 hr', bedtime: '6:45 – 7:45pm', tip: 'Most toddlers move to one midday nap between 14–18 months. Don’t rush it — a temporary earlier bedtime bridges the gap.' },
  { id: '18-36m', age: '18 months – 3 yrs', wakeWindow: '5 – 6.5 hr', naps: '1', dayTotal: '1–2.5 hr', night: '10.5–12 hr', totalSleep: '11–14 hr', bedtime: '7:00 – 8:00pm', tip: 'Boundary-testing peaks here. Clear, calm, repeated limits (and a toddler clock) beat negotiation every time.' },
  { id: '3-5y', age: '3–5 years', wakeWindow: '—', naps: '0–1 (quiet time)', dayTotal: '0–1.5 hr', night: '10–12 hr', totalSleep: '10–13 hr', bedtime: '7:00 – 8:00pm', tip: 'Dropped the nap? Keep 45–60 min of daily “quiet time” and move bedtime earlier for a few weeks.' },
];

export interface SampleDay { age: string; rows: [string, string][] }

export const SAMPLE_DAYS: SampleDay[] = [
  { age: '6–8 months (2 naps)', rows: [['7:00', 'Wake + milk feed'], ['8:00', 'Breakfast solids'], ['9:30', 'Nap 1 (60–90 min)'], ['11:00', 'Milk feed'], ['12:00', 'Lunch solids'], ['13:30', 'Nap 2 (60–90 min)'], ['15:30', 'Milk feed'], ['17:00', 'Dinner solids'], ['18:15', 'Bath, PJs, feed (lights on)'], ['18:40', 'Books, song, key phrase'], ['19:00', 'In crib awake · lights out']] },
  { age: '9–12 months (2 naps)', rows: [['7:00', 'Wake + milk feed'], ['8:00', 'Breakfast'], ['10:00', 'Nap 1 (60–90 min)'], ['12:00', 'Lunch'], ['14:30', 'Nap 2 (45–90 min)'], ['15:30', 'Snack + milk'], ['17:15', 'Dinner'], ['18:30', 'Bath, PJs, milk outside bedroom'], ['18:50', 'Books, song, key phrase'], ['19:00', 'In crib awake · lights out']] },
  { age: '15–24 months (1 nap)', rows: [['7:00', 'Wake · curtains open · breakfast'], ['9:30', 'Snack · outdoor play'], ['11:45', 'Lunch'], ['12:30', 'Nap (1.5–2.5 hr)'], ['15:00', 'Snack + milk'], ['17:30', 'Dinner'], ['18:45', 'Bath, PJs, teeth'], ['19:05', 'Books, song, key phrase'], ['19:15', 'In bed awake · lights out']] },
  { age: '2–3 years (1 nap)', rows: [['7:00', 'Toddler clock turns green · wake'], ['7:30', 'Breakfast'], ['12:00', 'Lunch'], ['13:00', 'Nap or quiet time (cap at ~2 hr)'], ['15:00', 'Snack'], ['17:30', 'Dinner'], ['18:50', 'Bath, PJs, teeth, routine chart'], ['19:15', 'Books, chat, key phrase'], ['19:30', 'Lights out']] },
];

export const KEY_PHRASES = [
  '“It’s sleepy time now. I love you very much. See you in the morning.”',
  '“Night night, my love. Time for sleep. I’ll see you when the sun comes up.”',
  '“You’re safe, you’re loved, and it’s time to rest. Goodnight.”',
];
