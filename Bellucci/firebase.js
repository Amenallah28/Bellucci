// firebase.js

import { initializeApp, getApps } from "firebase/app";
import { initializeAuth, getReactNativePersistence, getAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyC4nThxrCugNMglcrmdFwAIUkclr46pNkE",
  authDomain: "bellucci-1c6ee.firebaseapp.com",
  projectId: "bellucci-1c6ee",
  storageBucket: "bellucci-1c6ee.appspot.com",
  messagingSenderId: "217583982804",
  appId: "1:217583982804:web:7530d415cfb00971744341"
};

// Avoid re-initializing
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Make sure auth is only initialized once
let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (e) {
  auth = getAuth(app); // fallback if already initialized
}

export { auth };
