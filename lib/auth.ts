// Admin authentication helpers (server-only).
// A single shared admin password. On login we set an httpOnly cookie
// holding a signed token; every protected page/action verifies it.
import { cookies } from "next/headers";
import crypto from "crypto";

const COOKIE = "admin_session";

// The valid token = HMAC(secret, password). Not reversible, and a user
// can't forge it without knowing AUTH_SECRET.
function expectedToken() {
  const password = process.env.ADMIN_PASSWORD ?? "";
  const secret = process.env.AUTH_SECRET ?? "";
  return crypto.createHmac("sha256", secret).update(password).digest("hex");
}

// Read-only check — safe to call from Server Components.
export async function isAuthed(): Promise<boolean> {
  const store = await cookies();
  return store.get(COOKIE)?.value === expectedToken();
}

// Sets the login cookie. Must be called from a Server Action.
export async function login(password: string): Promise<boolean> {
  if (!password || password !== process.env.ADMIN_PASSWORD) return false;
  const store = await cookies();
  store.set(COOKIE, expectedToken(), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });
  return true;
}

// Clears the login cookie. Must be called from a Server Action.
export async function logout(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE);
}
