import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCszaxMo4oA3V7bS9aNFMjpWVbrZJovoYs',
  authDomain: 'student-dashboard-assignment.firebaseapp.com',
  projectId: 'student-dashboard-assignment',
  storageBucket: 'student-dashboard-assignment.firebasestorage.app',
  messagingSenderId: '1088540071739',
  appId: '1:1088540071739:web:7f4d0127e7408c67f1091e',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
const db = getFirestore(app);

export { app, auth, firestore, storage, db };
