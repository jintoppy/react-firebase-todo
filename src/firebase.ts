import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyCwMLbW23I_-RhbDq5TTOSw1DF7IJcVl8o',
    authDomain: 'react-firebase-todo-7d2ca.firebaseapp.com',
    projectId: 'react-firebase-todo-7d2ca',
    storageBucket: 'react-firebase-todo-7d2ca.appspot.com',
    messagingSenderId: '1082218568274',
    appId: '1:1082218568274:web:91ad577bd2f95f8f5ddd8b',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
