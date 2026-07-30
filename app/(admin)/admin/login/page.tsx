// ADMIN LOGIN — a centered card. Submits to the loginAction Server Action.
import { loginAction } from "@/app/actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="login-wrap">
      <div className="card login-card">
        <span className="brand-mark lg">✦</span>
        <h1 className="page-title">Admin login</h1>
        <p className="muted">Enter the password to manage songs.</p>

        {error && <p className="error">Wrong password. Try again.</p>}

        <form action={loginAction} className="form">
          <div className="field">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" required />
          </div>
          <button type="submit" className="btn full">
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}
