import { useEffect } from "react";
import { Link } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import Logo from "../components/Logo";
import LoginForm from "../components/admin/LoginForm";
import MonthlyCreatorEditor from "../components/admin/MonthlyCreatorEditor";
import ReferralManager from "../components/admin/ReferralManager";
import { useAdminAuth } from "../lib/useAdminAuth";

/** Keeps this page out of search results — it isn't linked from nav
 * anywhere, but a noindex tag is cheap insurance. */
function useNoIndex() {
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);
}

export default function AdminPage() {
  useNoIndex();
  const { user, isAdmin, loading, logout, configured } = useAdminAuth();

  return (
    <div className="min-h-screen bg-ink-950 bg-noise text-parchment-100">
      <PageTitle title="Admin" description="MCNations admin dashboard." />

      <div className="border-b border-ink-700">
        <div className="container-page flex h-16 items-center justify-between">
          <Link to="/" aria-label="Back to MCNations">
            <Logo />
          </Link>
          <span className="text-sm text-parchment-300/70">Admin</span>
        </div>
      </div>

      <section>
        <div className="container-page py-16 sm:py-20">
          {!configured ? (
            <NotConfigured />
          ) : loading ? (
            <p className="text-sm text-parchment-300">Loading…</p>
          ) : !user ? (
            <LoginForm />
          ) : !isAdmin ? (
            <div className="max-w-md">
              <h1 className="text-3xl">Not authorized</h1>
              <p className="mt-3 text-parchment-300">
                This account isn't set up as an admin. Sign out and sign in with the admin
                account instead.
              </p>
              <button
                onClick={logout}
                className="mt-6 rounded-sm border border-ink-600 px-5 py-2.5 text-sm text-parchment-100 hover:bg-white/5"
              >
                Sign out
              </button>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between">
                <h1 className="text-4xl">Admin</h1>
                <button
                  onClick={logout}
                  className="text-sm text-parchment-300 hover:text-parchment-100"
                >
                  Sign out
                </button>
              </div>

              <div className="mt-14 flex flex-col gap-16">
                <MonthlyCreatorEditor />
                <ReferralManager />
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function NotConfigured() {
  return (
    <div className="max-w-lg">
      <h1 className="text-3xl">Admin dashboard not configured</h1>
      <p className="mt-3 text-parchment-300 leading-relaxed">
        Firebase environment variables haven't been set for this deployment yet. Add the{" "}
        <code className="text-bronze-400">VITE_FIREBASE_*</code> variables described in the
        README, then redeploy.
      </p>
    </div>
  );
}
