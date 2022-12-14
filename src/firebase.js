import { initializeApp } from "firebase/app";
import {getFirestore, collection, getDocs} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAFkCdk_LMyZEgJ3s63qgKm2ljXEBPljbE",
  authDomain: "todo-eaeca.firebaseapp.com",
  projectId: "todo-eaeca",
  storageBucket: "todo-eaeca.appspot.com",
  messagingSenderId: "746736162679",
  appId: "1:746736162679:web:ecbbf6d703dd6bf230f372"
};

const app = initializeApp(firebaseConfig);

export const database = getFirestore();
export async function getTodos(){
    const todosCollection = collection(database,'todos');
    const todosDoc = await getDocs(todosCollection);
    const todos = todosDoc.docs.map(doc=>doc.data());
    return todos;
}