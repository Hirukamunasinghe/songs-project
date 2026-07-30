// Generates a unique, deterministic cover-art gradient for each song.
// Same song id → same cover every time. Acts as the song's "album art"
// without needing uploaded images.
const PALETTES: [string, string, string][] = [
  ["#bcd3f5", "#3f6fd8", "#1e2f66"], // sky → indigo
  ["#b9e0dd", "#3fa79b", "#184a45"], // teal
  ["#c2cdf0", "#4a63c4", "#20264f"], // royal blue
  ["#bfe3f2", "#4aa3cf", "#1c4a63"], // cyan
  ["#cbd5e6", "#647ba0", "#2c3852"], // slate
  ["#d0cdf2", "#6f6bc4", "#312a63"], // violet-blue
  ["#c4d7e3", "#5a86b3", "#233f5d"], // steel
  ["#b9c6e0", "#41568f", "#1a2340"], // midnight
];

function hash(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (h * 31 + input.charCodeAt(i)) >>> 0;
  }
  return h;
}

export function coverStyle(seed: string | number): string {
  const [a, b, c] = PALETTES[hash(String(seed)) % PALETTES.length];
  return (
    `radial-gradient(circle at 22% 18%, ${a} 0%, transparent 55%), ` +
    `radial-gradient(circle at 82% 26%, ${b} 0%, transparent 52%), ` +
    `linear-gradient(155deg, ${b}, ${c})`
  );
}
