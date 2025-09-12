// src/firebase/firebase.ts
import { initializeApp, FirebaseApp } from "firebase/app";
import { getMessaging, Messaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCg8bRfs4OlP0e_0HEM6YnxTWi31fzepsg",
  authDomain: "sfj-business-solutions.firebaseapp.com",
  projectId: "sfj-business-solutions",
  storageBucket: "sfj-business-solutions.firebasestorage.app",
  messagingSenderId: "208277903434",
  appId: "1:208277903434:web:695f8e08396d6b4f7faeb3",
  measurementId: "G-2ZWW0KW1DG",
};

let app: FirebaseApp | null = null;
let messaging: Messaging | null = null;

export const getFirebaseMessaging = (): Messaging | null => {
  if (typeof window === "undefined") return null; // SSR guard
  if (!app) app = initializeApp(firebaseConfig);
  if (!messaging) messaging = getMessaging(app);
  return messaging;
};
