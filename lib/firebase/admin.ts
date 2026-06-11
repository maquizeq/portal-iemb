/**
 * Firebase Admin SDK — Solo servidor
 *
 * REGLA: Este archivo NUNCA debe importarse desde un Client Component ('use client').
 * Solo puede usarse en: Server Components, Route Handlers, Server Actions.
 *
 * Por qué: firebase-admin usa credenciales de Service Account con acceso
 * completo a Firestore, sin las restricciones de Security Rules.
 * Si llegara al browser, cualquiera podría acceder a toda la base de datos.
 */
import { initializeApp, getApps, App, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import { getAuth } from "firebase-admin/auth";

function createAdminApp(): App {
  // getApps() evita reinicializar si ya existe una instancia (hot reload en dev)
  if (getApps().length > 0) {
    return getApps()[0];
  }

  return initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      // La private key viene del JSON de la Service Account
      // Los \n literales en la env var se reemplazan por saltos de línea reales
      privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    }),
  });
}

const adminApp = createAdminApp();

// Exportamos instancias individuales de cada servicio
// Los Server Components importan solo lo que necesitan
export const adminDb = getFirestore(adminApp);
export const adminStorage = getStorage(adminApp);
export const adminAuth = getAuth(adminApp);
