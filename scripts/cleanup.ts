import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, deleteDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDUOYXjtBu3BBy3L949acYMIoD3eBBZmXU",
  authDomain: "keatchenconnect.firebaseapp.com",
  databaseURL: "https://keatchenconnect-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "keatchenconnect",
  storageBucket: "keatchenconnect.firebasestorage.app",
  messagingSenderId: "613001657446",
  appId: "1:613001657446:web:d8d66ebeb549ec7f9681a7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function deleteAllData() {
  console.log("Deleting all data from Firestore...");

  const collectionsToDelete = ["cooks", "dishes"];

  for (const collectionName of collectionsToDelete) {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      console.log(`Found ${querySnapshot.size} documents in ${collectionName}`);
      for (const doc of querySnapshot.docs) {
        await deleteDoc(doc.ref);
        console.log(`Deleted document ${doc.id} from ${collectionName}`);
      }
    } catch (error) {
      console.error(`Error deleting data from ${collectionName}:`, error);
    }
  }

  console.log("All data deleted successfully.");
}

deleteAllData();
