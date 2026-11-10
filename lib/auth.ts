const ITERATIONS = 100000;
const KEY_LEN = 32;

function toBase64(buf: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(buf)));
}

function fromBase64(b64: string): Uint8Array {
  return Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
}

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", salt, iterations: ITERATIONS, hash: "SHA-256" }, key, KEY_LEN * 8);
  return `pbkdf2:${ITERATIONS}:${toBase64(salt)}:${toBase64(bits)}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const parts = stored.split(":");
  if (parts.length !== 4 || parts[0] !== "pbkdf2") return false;
  const iterations = parseInt(parts[1], 10);
  const salt = fromBase64(parts[2]);
  const expected = fromBase64(parts[3]);
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", salt, iterations, hash: "SHA-256" }, key, KEY_LEN * 8);
  const actual = new Uint8Array(bits);
  if (actual.length !== expected.length) return false;
  return actual.every((b, i) => b === expected[i]);
}

export function slaForSeverity(severity: string): number {
  switch (severity) {
    case "critical": return 120;
    case "serious": return 360;
    case "moderate": return 1440;
    case "minor": return 2880;
    default: return 1440;
  }
}
