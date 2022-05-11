import slugify from 'slugify';
import { initializeApp } from 'firebase/app';
import { 
  getFirestore,
  collection,
  getDocs,
  getDoc,
  // query,
  // where,
  doc,
  setDoc,
  updateDoc,
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
    await setDoc(doc(db, 'users', user.uid), {
      name,
      authProvider: 'local', // todo: what is auth provider?
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
  return gameList;
}

export async function getGame(id) {
  const gameSnap = await getDoc(doc(db, 'board-games', id));
  if(gameSnap.exists()) return gameSnap.data();
  return false; // todo: throw error?
}

export async function addGameToDb(game) {
  try {
    const gameId = slugify(game.name).toLowerCase(); // todo: remove colon?
    await setDoc(doc(db, "board-games", gameId), game);
    console.log(`${game.name} was successfully added to the database`);
  } catch (err) {
    handleError(err);
  }
}

export async function addGameToUser(gameId) {
  // todo: check if game is already in collection
  try {
    const userId = auth.currentUser.uid;
    
    // find user in database using uid
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    if(!userSnap.exists()) return false // todo: throw error
    const user = userSnap.data();

    // update game list for user
    let newGameList;
    if(user.games) {
      newGameList = [...user.games, gameId];
    } else {
      newGameList = [gameId];
    }

    await updateDoc(userRef, {
      games: newGameList,
    });
    console.log('game added to user\'s collection');
  } catch (err) {
    handleError(err);
  }
}