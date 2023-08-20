import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyCPdw2lxPuSWMwTzofox9LsN3nKSCG4-kk',
  authDomain: 'astro-trades.firebaseapp.com',
  projectId: 'astro-trades',
  storageBucket: 'astro-trades.appspot.com',
  messagingSenderId: '75393086583',
  appId: '1:975393086583:web:9420ffb3fe94796319ba72',
};

export const app = initializeApp(firebaseConfig);
