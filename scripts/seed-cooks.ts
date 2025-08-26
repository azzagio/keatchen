import { db } from '../src/lib/firebase';
import { collection, addDoc, GeoPoint } from 'firebase/firestore';

const cooks = [
  {
    name: 'Antoine Dubois',
    dish: 'Ratatouille',
    location: new GeoPoint(43.9089, 4.0981) // Quissac
  },
  {
    name: 'Marie Leclerc',
    dish: 'Bouillabaisse',
    location: new GeoPoint(43.8566, 4.1042) // Vic-le-Fesq
  },
  {
    name: 'Julien Moreau',
    dish: 'Tarte Tatin',
    location: new GeoPoint(43.9183, 4.0444) // Sauve
  },
  {
    name: 'Camille Girard',
    dish: 'Coq au Vin',
    location: new GeoPoint(43.8769, 4.1428) // Orthoux-Sérignac-Quilhan
  },
  {
    name: 'Lucas Petit',
    dish: 'Crème brûlée',
    location: new GeoPoint(43.9486, 4.1322) // Cannes-et-Clairan
  }
];

const seedCooks = async () => {
  const cooksCollection = collection(db, 'cooks');
  for (const cook of cooks) {
    try {
      await addDoc(cooksCollection, cook);
      console.log(`Added cook: ${cook.name}`);
    } catch (error) {
      console.error(`Error adding cook: ${cook.name}`, error);
    }
  }
};

seedCooks().then(() => {
  console.log('Finished seeding cooks.');
  process.exit(0);
});
