/**
 * Firebase Client SDK — Puede usarse en Client y Server Components
 *
 * Este archivo usa variables NEXT_PUBLIC_ que son seguras de exponer al browser.
 * La seguridad de los datos la controlan las Firebase Security Rules en Firestore,
 * no la ocultación de estas credenciales.
 *
 * Úsalo para: Firebase Auth en el panel admin, Firebase Analytics.
 * NO lo uses para leer datos del portal público — usa firebase/admin.ts en su lugar.
 */
import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Singleton: evita múltiples inicializaciones en hot reload de desarrollo
let app: FirebaseApp;
let auth: Auth;

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

auth = getAuth(app);

export { app, auth };
