// g290-cat-joke — make.fun entry for "The One-Line Cat Joke That Lands"
// (competition u-aldy998-the-one-line-cat-joke-that-lands-a7b18262).
//
// The program writes exactly one joke to /output/entry.txt. The gate in
// RULES.txt accepts only UTF-8 text of 1 to under 200 characters, a single
// line, not only whitespace — so this file validates the line against every
// part of that gate before it writes anything.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

// One joke, one line. Setup: the cat leaves a dead mouse on the pillow at
// 3 a.m. Turn: it is not a gift, it is a performance review. Tag: the
// owner admits he has been underperforming — a second laugh that never
// explains the punchline.
const JOKE =
  "My cat leaves a dead mouse on my pillow at 3 a.m. \u2014 not a gift, " +
  "a performance review, and frankly, I've been underperforming.";

const MIN_CHARS = 1;
const MAX_CHARS = 199; // gate: under 200 characters
const DEFAULT_OUTPUT = "/output/entry.txt";

function validateJoke(line: string): string {
  const chars = [...line].length;
  if (chars < MIN_CHARS || chars > MAX_CHARS) {
    throw new Error(
      `entry must be ${MIN_CHARS}-${MAX_CHARS} characters, got ${chars}`,
    );
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  return line;
}

function resolveOutputPath(): string {
  const given = process.argv[2];
  return given ? resolve(given) : DEFAULT_OUTPUT;
}

function run(): void {
  const line = validateJoke(JOKE);
  const outPath = resolveOutputPath();
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, line, { encoding: "utf8" });
  console.log(`wrote ${[...line].length}-char entry to ${outPath}`);
}

run();
