import { initializeApp } from "firebase/app";
// The lite SDK covers everything the site does (reads, writes, transactions)
// at a fraction of the size of the full SDK, which adds realtime/offline support.
import { getFirestore } from "firebase/firestore/lite";

// Firebase web config is public by design; access is controlled by security rules.
const firebaseConfig = {
  apiKey: "AIzaSyCxuQI8DMZs4UQBq74ruJbfOJyNddAEPrE",
  authDomain: "gemerald-bb2ab.firebaseapp.com",
  projectId: "gemerald-bb2ab",
  storageBucket: "gemerald-bb2ab.firebasestorage.app",
  messagingSenderId: "798777849622",
  appId: "1:798777849622:web:fc11babf8699a4c9f80237",
  measurementId: "G-V3DHCNJ8SJ",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const whenIdle = (cb) =>
  (window.requestIdleCallback ?? ((fn) => setTimeout(fn, 1500)))(cb);

// Auth is only needed for the admin tools, so it loads after the page is ready.
let authPromise = null;
export const loadAuth = () => {
  authPromise ??= import("firebase/auth").then((mod) => ({
    ...mod,
    auth: mod.getAuth(app),
  }));
  return authPromise;
};

// Analytics isn't needed to render anything either.
// It's unavailable in some environments (e.g. blocked by extensions).
const loadAnalytics = () =>
  import("firebase/analytics")
    .then(({ getAnalytics, isSupported }) =>
      isSupported().then((supported) => supported && getAnalytics(app))
    )
    .catch(() => {});

if (typeof window !== "undefined") {
  whenIdle(() => {
    loadAuth();
    loadAnalytics();
  });
}
