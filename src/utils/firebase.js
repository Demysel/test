import { initializeApp } from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.AIzaSyAU19mm6RDWy_fhoMo3SLWFuyvT4UDKKKk,
  authDomain: import.meta.env.calendrier-300cb.firebaseapp.com,
  projectId: import.meta.env.calendrier-300cb,
  storageBucket: import.meta.env.calendrier-300cb.firebasestorage.app
  messagingSenderId: import.meta.env.556904721649,
  appId: import.meta.env.1:556904721649:web:8d40a30990520e4ffbcd50
};

// Initialisation
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Création de la référence de collection
const eventsCollection = collection(db, 'events');

export { db, eventsCollection }; // Export nommé correct
