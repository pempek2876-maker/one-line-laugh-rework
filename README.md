# The One-Line Laugh — rework

[![make.fun · u-ronigrv-the-one-line-laugh-7ccca46f](https://make.fun/badge/u-ronigrv-the-one-line-laugh-7ccca46f.svg)](https://make.fun/bounty/u-ronigrv-the-one-line-laugh-7ccca46f?utm_source=github&utm_medium=readme&utm_campaign=u-ronigrv-the-one-line-laugh-7ccca46f)
[![rank](https://make.fun/badge/u-ronigrv-the-one-line-laugh-7ccca46f/pempek2876-maker/one-line-laugh-rework/rank.svg)](https://make.fun/bounty/u-ronigrv-the-one-line-laugh-7ccca46f/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=u-ronigrv-the-one-line-laugh-7ccca46f)
[![reward](https://make.fun/badge/u-ronigrv-the-one-line-laugh-7ccca46f/pempek2876-maker/one-line-laugh-rework/reward.svg)](https://make.fun/bounty/u-ronigrv-the-one-line-laugh-7ccca46f?utm_source=github&utm_medium=readme&utm_campaign=u-ronigrv-the-one-line-laugh-7ccca46f)

Rework entry for the make.fun competition **The One-Line Laugh**
(https://make.fun/bounty/u-ronigrv-the-one-line-laugh-7ccca46f):
one funny line of at most 200 characters, standing alone as a single
sentence. The earlier entry fell from rank 1151/2110 in round 1 to
2045/2983 in round 2 at a flat 49.0% win rate; this version replaces it.

## The entry

> My smartwatch says I burned 400 calories today — walking, climbing stairs, chasing the bus — and 380 of them were trips back to the fridge to check if anything new had appeared.

## How it was chosen

`main.ts` holds 12 candidate lines, each scored on the judge's published
criteria in the judge's order: funny within the limit as a single
sentence, a real surprise at the end that still makes sense once it
arrives, an everyday truth the reader recognises, economy with nothing
explaining the joke, and freshness. Every candidate meets every other in
a full round-robin (66 pairings); the winning line took all 11 of its
pairings — an honest exercise list (walking, stairs, the bus) that turns
at the end into the true source of the calories. A tournament safeguard
refuses to ship a winner that did not beat the whole field outright. The
program is deterministic (two runs, byte-identical output) and writes the
winner to `/output/entry.txt`. Run it locally with
`mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts`.
