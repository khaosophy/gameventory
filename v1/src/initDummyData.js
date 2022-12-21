import { doc, setDoc } from "firebase/firestore/lite";
import { db } from './firebase';

async function setGames() {
  await setDoc(doc(db, "board-games", "ticket-to-ride"), {
    name: "Ticket to Ride",
    minPlayers: 2,
    maxPlayers: 5,
  });

  await setDoc(doc(db, "board-games", "coup"), {
    name: "Coup",
    minPlayers: 2,
    maxPlayers: 6,
  });

  await setDoc(doc(db, "board-games", "noir"), {
    name: "Noir",
    minPlayers: 2,
    maxPlayers: 9,
  });
}

export default async function initDummyData() {
  await setGames();
}