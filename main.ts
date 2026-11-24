// The One-Line Laugh — rework entry selector and writer.
// The v2 entry fell from rank 1151/2110 (round 1) to 2045/2983 (round 2) at
// a flat 49.0% judge win rate; this rework replaces it. Holds the 12
// candidate lines from the local tournament (see CANDIDATES.md), scores
// each on the judge's published criteria in the judge's order (funny within
// 200 characters as a single sentence, a real surprise at the end, an
// everyday truth the reader recognises, economical with nothing explaining
// the joke, and fresh), runs a full round-robin, and writes the winner to
// /output/entry.txt. Deterministic: same input, same winner, every run.
import { mkdirSync, writeFileSync } from "node:fs";

type Candidate = {
  text: string;
  // Feature scores from the local round-robin tournament (CANDIDATES.md):
  funny: number; // funny on first read, inside the limit, one sentence
  surprise: number; // a real turn at the end that still makes sense
  truth: number; // an everyday truth the reader nods at
  tight: number; // every word earns its place, nothing explains the joke
  fresh: number; // not a line heard many times before
};

const CANDIDATES: Candidate[] = [
  { text: `I can fall asleep anywhere — planes, meetings, my own wedding — but the second my head hits my own pillow, my brain screens a documentary about a mistake I made in 2009.`, funny: 5, surprise: 4, truth: 5, tight: 4, fresh: 4 },
  { text: `My phone battery lasts all day now that nobody calls me — through work, through dinner, through my birthday, and, most efficiently, through Father's Day.`, funny: 4, surprise: 4, truth: 4, tight: 4, fresh: 4 },
  { text: `I've kept the same plant alive for three years — through droughts, through holidays, through a house move — which is two years longer than any of its predecessors managed.`, funny: 3, surprise: 3, truth: 4, tight: 4, fresh: 3 },
  { text: `I remember everything my wife tells me — every date, every name, every story — except, for reasons science cannot explain, anything she says while holding a shopping bag.`, funny: 4, surprise: 4, truth: 5, tight: 4, fresh: 3 },
  { text: `My smartwatch says I burned 400 calories today — walking, climbing stairs, chasing the bus — and 380 of them were trips back to the fridge to check if anything new had appeared.`, funny: 5, surprise: 5, truth: 5, tight: 4, fresh: 4 },
  { text: `I finally organized my entire photo library — ten years, sorted by year, by trip, by person — and every single folder is just screenshots of things I meant to buy.`, funny: 5, surprise: 4, truth: 5, tight: 5, fresh: 4 },
  { text: `Grandpa refuses to wear his hearing aid at dinner because, he says, he heard the first sixty years of this family and the sequel isn't getting better reviews.`, funny: 5, surprise: 5, truth: 4, tight: 4, fresh: 5 },
  { text: `My toddler has learned to say "five more minutes" — at bedtime, at bath time, when I ask for my phone back — and honestly, she negotiates better than my union rep.`, funny: 4, surprise: 4, truth: 5, tight: 4, fresh: 4 },
  { text: `I bought a standing desk, a posture chair and a foam roller to fix my back, and now I slouch in a much more expensive position.`, funny: 5, surprise: 4, truth: 5, tight: 5, fresh: 3 },
  { text: `The gym trainer said I'd feel the workout tomorrow — in my shoulders, in my legs, in muscles I don't use — and he was right: I currently feel it most in my wallet.`, funny: 4, surprise: 3, truth: 4, tight: 4, fresh: 3 },
  { text: `My dog has learned twenty words — walk, treat, car, vet — and uses this education exclusively to leave the room at "bath."`, funny: 5, surprise: 4, truth: 4, tight: 5, fresh: 4 },
  { text: `I water the plants, feed the cat and lock up every night at nine — the house runs like a Swiss watch, which is impressive, because I am the only moving part that complains.`, funny: 3, surprise: 3, truth: 4, tight: 3, fresh: 3 },
];

// Weighted in the judge's published order: funny first, then the surprise
// at the end, then the everyday truth, then economy, then freshness.
const score = (c: Candidate): number =>
  c.funny * 5 + c.surprise * 4 + c.truth * 3 + c.tight * 2 + c.fresh * 2;

// Full round-robin: every candidate meets every other; the higher weighted
// score takes the pairing.
let winner = CANDIDATES[0];
let wins = 0;
let runnerUpScore = -1;
for (const c of CANDIDATES) {
  let w = 0;
  for (const other of CANDIDATES) {
    if (other !== c && score(c) > score(other)) w++;
  }
  if (w > wins || (w === wins && score(c) > score(winner))) {
    winner = c;
    wins = w;
  }
}
for (const c of CANDIDATES) {
  if (c !== winner) runnerUpScore = Math.max(runnerUpScore, score(c));
}

const ENTRY = winner.text;

// Tournament safeguard: never ship a winner that did not beat the whole field
// outright, or whose weighted score does not clear the runner-up.
if (wins !== CANDIDATES.length - 1 || score(winner) <= runnerUpScore) {
  console.error(`tournament inconclusive: wins=${wins}, margin=${score(winner) - runnerUpScore}`);
  process.exit(1);
}

// Sealed-gate self-check: UTF-8 text, 1-200 chars, not only whitespace.
if (ENTRY.length < 1 || ENTRY.length > 200 || ENTRY.trim().length === 0) {
  console.error(`entry invalid: ${ENTRY.length} chars`);
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, ENTRY, "utf8");
console.log(`winner won ${wins}/${CANDIDATES.length - 1} pairings; wrote ${ENTRY.length} chars to ${outDir}/entry.txt`);
