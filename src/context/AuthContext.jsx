import { createContext, useContext, useEffect, useState } from "react";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore/lite";
import { db, loadAuth } from "../lib/firebase";

const AuthContext = createContext(null);

// Reads the user's profile, creating it with role "user" on first sign-in.
const fetchRole = async (firebaseUser) => {
  const profileRef = doc(db, "users", firebaseUser.uid);
  const snap = await getDoc(profileRef);
  if (snap.exists()) return snap.data().role ?? "user";

  await setDoc(profileRef, {
    email: firebaseUser.email,
    displayName: firebaseUser.displayName,
    photoURL: firebaseUser.photoURL,
    role: "user",
    createdAt: serverTimestamp(),
  });
  return "user";
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    let unsubscribe = () => {};

    loadAuth().then(({ auth, onAuthStateChanged }) => {
      if (cancelled) return;
      unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        setUser(firebaseUser);
        if (!firebaseUser) {
          setRole(null);
          setLoading(false);
          return;
        }
        try {
          setRole(await fetchRole(firebaseUser));
        } catch (err) {
          console.error("Failed to load profile", err);
          setRole("user");
        } finally {
          setLoading(false);
        }
      });
    });

    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, []);

  // Pick up role changes made in the console when the admin returns to the tab.
  useEffect(() => {
    if (!user) return;
    const refresh = () => {
      if (document.visibilityState !== "visible") return;
      fetchRole(user)
        .then(setRole)
        .catch(() => {});
    };
    document.addEventListener("visibilitychange", refresh);
    return () => document.removeEventListener("visibilitychange", refresh);
  }, [user]);

  const signInWithGoogle = async () => {
    const { auth, GoogleAuthProvider, signInWithPopup, signInWithRedirect } =
      await loadAuth();
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      if (err.code === "auth/popup-blocked") {
        await signInWithRedirect(auth, provider);
        return;
      }
      throw err;
    }
  };

  const signOut = async () => {
    const { auth, signOut: firebaseSignOut } = await loadAuth();
    await firebaseSignOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAdmin: role === "admin",
        loading,
        signInWithGoogle,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
