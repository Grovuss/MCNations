import { useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, type User } from "firebase/auth";
import { auth, firebaseEnabled } from "./firebase";

export function useAdminAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, async (nextUser) => {
      setUser(nextUser);
      if (nextUser) {
        // Custom claim set once via scripts/set-admin-claim.mjs. Checking
        // this (rather than just "is signed in") means Firestore rules
        // and this dashboard agree on who counts as an admin.
        const token = await nextUser.getIdTokenResult();
        setIsAdmin(token.claims.admin === true);
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = (email: string, password: string) => {
    if (!auth) return Promise.reject(new Error("Firebase is not configured."));
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => (auth ? signOut(auth) : Promise.resolve());

  return { user, isAdmin, loading, login, logout, configured: firebaseEnabled };
}
