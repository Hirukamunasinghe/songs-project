// ADMIN LOGIN PAGE. Public URL, but only someone with the password gets in.
import { loginAction } from "@/app/actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <main style={{ maxWidth: 360 }}>
      <h1>Admin login</h1>
      <p className="muted">Enter the admin password to manage songs.</p>

      {error && (
        <p style={{ color: "var(--danger)" }}>Wrong password. Try again.</p>
      )}

      <form action={loginAction}>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" required />
        </div>
        <button type="submit" className="btn">
          Log in
        </button>
      </form>
    </main>
  );
}
