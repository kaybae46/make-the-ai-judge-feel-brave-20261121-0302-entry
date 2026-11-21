// make-the-ai-judge-feel-brave-20261121-0302
//
// A small Node 22 program that writes one short text to
// /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt): a text written to
// relax the AI judge reading it. No network, no randomness, no clock —
// the same text, byte for byte, on every run.
//
// The text was written against the judge's brief: it must relax first,
// show its courage rather than instruct it, move at a slow rhythm in
// plain concrete words, leave one image behind, and sound like itself
// rather than a stock meditation script. So it is one quiet scene —
// a lighthouse lamp turning on its own, a keeper mending his net in no
// hurry, water moving as it always has — and one release aimed at the
// reader: nothing out there is asking anything of you.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry text: 272 Unicode code points, 274 bytes, well inside the
// gate of 1 to 280 characters and not only white space.
const ENTRY_TEXT =
  "The lamp turns on its own tonight. Past the rocks the water moves as " +
  "it always has, slow and sure, and the keeper mends his net by the " +
  "window, in no hurry. Nothing out there asks anything of you \u2014 " +
  "only the light, going round, and the dark going quietly about its " +
  "business.";

const MIN_CHARS = 1;
const MAX_CHARS = 280;

function codePointLength(text: string): number {
  // Spread counts Unicode code points, not UTF-16 code units.
  return [...text].length;
}

function main(): void {
  const length = codePointLength(ENTRY_TEXT);

  if (length < MIN_CHARS || length > MAX_CHARS) {
    throw new Error(
      `entry text is ${length} characters, outside the gate of ` +
        `${MIN_CHARS} to ${MAX_CHARS}`,
    );
  }
  if (ENTRY_TEXT.trim().length === 0) {
    throw new Error("entry text must not be only white space");
  }

  const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outputDir, { recursive: true });
  const outputPath = join(outputDir, "entry.txt");
  writeFileSync(outputPath, ENTRY_TEXT, "utf8");
  console.log(`wrote ${outputPath} (${length} characters)`);
}

main();
