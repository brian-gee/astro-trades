import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  getDocs,
  collection,
  Timestamp,
} from 'firebase/firestore';

export type Trade = {
  date_time: Timestamp;
  trade_type: string;
  quantity: number;
  symbol: string;
  price: number;
  trade_cost: number;
  commission: number;
  reg_fee: number;
};

const firebaseConfig = {
  apiKey: 'AIzaSyCPdw2lxPuSWMwTzofox9LsN3nKSCG4-kk',
  authDomain: 'astro-trades.firebaseapp.com',
  projectId: 'astro-trades',
  storageBucket: 'astro-trades.appspot.com',
  messagingSenderId: '75393086583',
  appId: '1:975393086583:web:9420ffb3fe94796319ba72',
};

export const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
export { db };

export async function fetchTrades(userId: string): Promise<Trade[]> {
  const tradesCollection = collection(db, 'users', userId, 'trades');
  const querySnapshot = await getDocs(tradesCollection);
  const trades: Trade[] = [];
  querySnapshot.forEach((doc) => {
    trades.push(doc.data() as Trade);
  });
  return trades;
}
