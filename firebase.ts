import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAYxKNDNS2DzbHZ5g_aUIOWCeiO2GL0oAI",
  authDomain: "chatgpt-messenger-9c564.firebaseapp.com",
  projectId: "chatgpt-messenger-9c564",
  storageBucket: "chatgpt-messenger-9c564.appspot.com",
  messagingSenderId: "611956982480",
  appId: "1:611956982480:web:08f1b543f94a801fa4d4d5",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
