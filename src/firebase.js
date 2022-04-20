import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';


const firebaseConfig = {
  apiKey: "AIzaSyAZiIScZMjX_F21_9K8XiwMCB34Bdf1P74",
  authDomain: "caspers-gamebook.firebaseapp.com",
  databaseURL: "https://caspers-gamebook.firebaseio.com",
  projectId: "caspers-gamebook",
  storageBucket: "caspers-gamebook.appspot.com",
  messagingSenderId: "676964210545",
  appId: "1:676964210545:web:564e8522f7228f733e88d0"
};

const firebase = initializeApp(firebaseConfig);
export const db = getFirestore(firebase);

export async function getGames() {
  const gamesCol = collection(db, 'board-games');
  const gameSnapshot = await getDocs(gamesCol);
  const gameList = gameSnapshot.docs.map(doc => doc.data());
  console.log(gameList);
  return gameList;
}

export default firebase;