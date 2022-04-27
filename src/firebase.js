import slugify from 'slugify';
import { initializeApp } from 'firebase/app';
import { 
  getFirestore,
  collection,
  getDocs,
  // query,
  // where,
  addDoc,
  doc,
  setDoc,
} from 'firebase/firestore/lite';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAZiIScZMjX_F21_9K8XiwMCB34Bdf1P74",
  authDomain: "caspers-gamebook.firebaseapp.com",
  databaseURL: "https://caspers-gamebook.firebaseio.com",
  projectId: "caspers-gamebook",
  storageBucket: "caspers-gamebook.appspot.com",
  messagingSenderId: "676964210545",
  appId: "1:676964210545:web:564e8522f7228f733e88d0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

function handleError(err) {
  console.error(err);
  alert(err.message);
}

export async function loginWithEmailAndPassword(email, password) {
  /* todo: check if user exists? how does pass validation work? */
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    handleError(err);
  }
}

export async function registerWithEmailAndPassword(name, email, password) {
  // todo: check if user already exists?
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, 'users'), {
      /* todo: what is authProvider? */
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
    });
  } catch (err) {
    handleError(err);
  }
}

export async function resetPasswordEmail(email) {
  try {
    await sendPasswordResetEmail(auth, email);
    alert('Password reset link sent.');
  } catch (err) {
    handleError(err);
  }
}

export function logout() {
  signOut(auth);
}

export async function getGames() {
  const gamesCol = collection(db, 'board-games');
  const gameSnapshot = await getDocs(gamesCol);
  const gameList = gameSnapshot.docs.map(doc => doc.data());
  // console.log(gameList);
  return gameList;
}

export async function addGame(game) {
  try {
    const gameId = slugify(game.name).toLowerCase();
    await setDoc(doc(db, "board-games", gameId), game);
    console.log(`${game.name} was successfully added to the database`);
  } catch (err) {
    handleError(err);
  }
}