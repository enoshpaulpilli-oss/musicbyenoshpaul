// Music theory data — foundation used across the app.

export const NOTES = ["C", "G", "D", "A", "E", "B", "F#", "C#", "G#", "D#", "A#", "F"] as const;
export type Note = (typeof NOTES)[number];

export const KEY_SIGNATURES: Record<Note, string> = {
  C: "0 sharps / flats",
  G: "1 sharp (F#)",
  D: "2 sharps (F#, C#)",
  A: "3 sharps (F#, C#, G#)",
  E: "4 sharps (F#, C#, G#, D#)",
  B: "5 sharps",
  "F#": "6 sharps",
  "C#": "7 sharps",
  "G#": "6 flats (Ab)",
  "D#": "5 flats (Eb)",
  "A#": "4 flats (Bb)",
  F: "1 flat (Bb)",
};

export const RELATIVE_MINOR: Record<Note, string> = {
  C: "A minor",
  G: "E minor",
  D: "B minor",
  A: "F# minor",
  E: "C# minor",
  B: "G# minor",
  "F#": "D# minor",
  "C#": "A# minor",
  "G#": "F minor",
  "D#": "C minor",
  "A#": "G minor",
  F: "D minor",
};

export const ROMAN = ["I", "ii", "iii", "IV", "V", "vi", "vii°"] as const;

const CHROMATIC = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const MAJOR_INTERVALS = [0, 2, 4, 5, 7, 9, 11];
const QUALITIES = ["", "m", "m", "", "", "m", "°"];

export function diatonicChords(key: Note): string[] {
  const start = CHROMATIC.indexOf(key.replace("Db", "C#").replace("Eb", "D#").replace("Gb", "F#").replace("Ab", "G#").replace("Bb", "A#"));
  if (start < 0) return [];
  return MAJOR_INTERVALS.map((iv, i) => CHROMATIC[(start + iv) % 12] + QUALITIES[i]);
}

export type Chord = {
  name: string;
  notes: string[];
  formula: string;
  intervals: string;
  quality: "Major" | "Minor" | "Dominant" | "Diminished" | "Suspended";
  related: string[];
  scales: string[];
};

export const CHORDS: Chord[] = [
  { name: "C Major", notes: ["C", "E", "G"], formula: "1 - 3 - 5", intervals: "R, M3, P5", quality: "Major", related: ["Am", "F", "G"], scales: ["C Major", "C Lydian", "A Minor"] },
  { name: "A Minor", notes: ["A", "C", "E"], formula: "1 - ♭3 - 5", intervals: "R, m3, P5", quality: "Minor", related: ["C", "Dm", "Em"], scales: ["A Minor", "A Dorian", "C Major"] },
  { name: "G Major", notes: ["G", "B", "D"], formula: "1 - 3 - 5", intervals: "R, M3, P5", quality: "Major", related: ["Em", "C", "D"], scales: ["G Major", "G Lydian"] },
  { name: "D Minor", notes: ["D", "F", "A"], formula: "1 - ♭3 - 5", intervals: "R, m3, P5", quality: "Minor", related: ["F", "Gm", "Am"], scales: ["D Minor", "D Dorian", "F Major"] },
  { name: "F Major 7", notes: ["F", "A", "C", "E"], formula: "1 - 3 - 5 - 7", intervals: "R, M3, P5, M7", quality: "Major", related: ["Dm7", "Am7", "Cmaj7"], scales: ["F Major", "F Lydian"] },
  { name: "G7", notes: ["G", "B", "D", "F"], formula: "1 - 3 - 5 - ♭7", intervals: "R, M3, P5, m7", quality: "Dominant", related: ["C", "Cmaj7", "Dm7"], scales: ["G Mixolydian", "C Major"] },
  { name: "C Major 7", notes: ["C", "E", "G", "B"], formula: "1 - 3 - 5 - 7", intervals: "R, M3, P5, M7", quality: "Major", related: ["Am7", "Fmaj7", "Dm7"], scales: ["C Major", "C Lydian"] },
  { name: "E Minor 7", notes: ["E", "G", "B", "D"], formula: "1 - ♭3 - 5 - ♭7", intervals: "R, m3, P5, m7", quality: "Minor", related: ["G", "Am7", "Cmaj7"], scales: ["E Dorian", "E Aeolian"] },
  { name: "B Diminished", notes: ["B", "D", "F"], formula: "1 - ♭3 - ♭5", intervals: "R, m3, d5", quality: "Diminished", related: ["C", "G7"], scales: ["B Locrian"] },
  { name: "D Sus4", notes: ["D", "G", "A"], formula: "1 - 4 - 5", intervals: "R, P4, P5", quality: "Suspended", related: ["D", "G", "A"], scales: ["D Mixolydian"] },
  { name: "A Major 7", notes: ["A", "C#", "E", "G#"], formula: "1 - 3 - 5 - 7", intervals: "R, M3, P5, M7", quality: "Major", related: ["F#m7", "Dmaj7", "E7"], scales: ["A Major", "A Lydian"] },
  { name: "F# Minor", notes: ["F#", "A", "C#"], formula: "1 - ♭3 - 5", intervals: "R, m3, P5", quality: "Minor", related: ["A", "D", "E"], scales: ["F# Minor", "A Major"] },
];

export type Scale = {
  name: string;
  formula: string;
  intervals: string;
  mood: string;
  chords: string[];
  notes: string[];
};

export const SCALES: Scale[] = [
  { name: "Major", formula: "W-W-H-W-W-W-H", intervals: "1 2 3 4 5 6 7", mood: "Bright, resolved, classic", chords: ["I", "ii", "iii", "IV", "V", "vi", "vii°"], notes: ["C", "D", "E", "F", "G", "A", "B"] },
  { name: "Natural Minor", formula: "W-H-W-W-H-W-W", intervals: "1 2 ♭3 4 5 ♭6 ♭7", mood: "Melancholic, introspective", chords: ["i", "ii°", "III", "iv", "v", "VI", "VII"], notes: ["A", "B", "C", "D", "E", "F", "G"] },
  { name: "Pentatonic Major", formula: "W-W-m3-W-m3", intervals: "1 2 3 5 6", mood: "Open, folk, uplifting", chords: ["I", "IV", "V", "vi"], notes: ["C", "D", "E", "G", "A"] },
  { name: "Blues", formula: "m3-W-H-H-m3-W", intervals: "1 ♭3 4 ♭5 5 ♭7", mood: "Soulful, gritty, expressive", chords: ["I7", "IV7", "V7"], notes: ["C", "Eb", "F", "Gb", "G", "Bb"] },
  { name: "Harmonic Minor", formula: "W-H-W-W-H-m3-H", intervals: "1 2 ♭3 4 5 ♭6 7", mood: "Exotic, dramatic, cinematic", chords: ["i", "ii°", "III+", "iv", "V", "VI", "vii°"], notes: ["A", "B", "C", "D", "E", "F", "G#"] },
  { name: "Melodic Minor", formula: "W-H-W-W-W-W-H", intervals: "1 2 ♭3 4 5 6 7", mood: "Sophisticated, jazzy", chords: ["i", "ii", "III+", "IV", "V", "vi°", "vii°"], notes: ["A", "B", "C", "D", "E", "F#", "G#"] },
  { name: "Dorian", formula: "W-H-W-W-W-H-W", intervals: "1 2 ♭3 4 5 6 ♭7", mood: "Cool, jazzy, minor-with-hope", chords: ["i", "ii", "III", "IV", "v", "vi°", "VII"], notes: ["D", "E", "F", "G", "A", "B", "C"] },
  { name: "Phrygian", formula: "H-W-W-W-H-W-W", intervals: "1 ♭2 ♭3 4 5 ♭6 ♭7", mood: "Dark, Spanish, tense", chords: ["i", "II", "III", "iv", "v°", "VI", "vii"], notes: ["E", "F", "G", "A", "B", "C", "D"] },
  { name: "Lydian", formula: "W-W-W-H-W-W-H", intervals: "1 2 3 #4 5 6 7", mood: "Dreamy, floating, ethereal", chords: ["I", "II", "iii", "iv°", "V", "vi", "vii"], notes: ["F", "G", "A", "B", "C", "D", "E"] },
  { name: "Mixolydian", formula: "W-W-H-W-W-H-W", intervals: "1 2 3 4 5 6 ♭7", mood: "Bluesy, rock, groovy", chords: ["I", "ii", "iii°", "IV", "v", "vi", "VII"], notes: ["G", "A", "B", "C", "D", "E", "F"] },
  { name: "Locrian", formula: "H-W-W-H-W-W-W", intervals: "1 ♭2 ♭3 4 ♭5 ♭6 ♭7", mood: "Unstable, mysterious, unresolved", chords: ["i°", "II", "iii", "iv", "V", "VI", "vii"], notes: ["B", "C", "D", "E", "F", "G", "A"] },
];

export const PROGRESSIONS = [
  { name: "I – V – vi – IV", genre: "Pop", key: "C", chords: ["C", "G", "Am", "F"] },
  { name: "ii – V – I", genre: "Jazz", key: "C", chords: ["Dm7", "G7", "Cmaj7"] },
  { name: "I – vi – IV – V", genre: "50s Doo-Wop", key: "C", chords: ["C", "Am", "F", "G"] },
  { name: "vi – IV – I – V", genre: "Modern Pop", key: "C", chords: ["Am", "F", "C", "G"] },
  { name: "12-Bar Blues", genre: "Blues", key: "C", chords: ["C7", "F7", "C7", "G7"] },
  { name: "Andalusian Cadence", genre: "Flamenco", key: "Am", chords: ["Am", "G", "F", "E"] },
];

export const TIPS = [
  "Every major key has a relative minor a minor third below its tonic.",
  "The V chord almost always wants to resolve to the I chord.",
  "Modes are the same notes starting from a different degree.",
  "Practice slow, then speed up — the metronome doesn't lie.",
  "A ii-V-I is the DNA of jazz harmony.",
  "Chromatic passing tones add tension between diatonic notes.",
];
