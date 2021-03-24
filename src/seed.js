import firebase, { firestore } from './index';
import faker from 'faker';

//------ Batch commit? -------
const addToCollection = async (collectionKey, arrayOfObjectsToAdd) => {
  console.log('seeding...');
  //Find collection and start batch
  const collectionRef = firestore.collection(collectionKey);
  const batch = firestore.batch();

  //For each object in the array, add a new doc with that object
  arrayOfObjectsToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  //Commit all
  return await batch.commit();
};

export async function seed() {
  //----- Users -----
  const userKey = 'Users';
  const userTemplate = new Array(1).fill();
  const users = userTemplate.map(() => ({
    email: faker.internet.email(),
  }));
  addToCollection(userKey, users);

  //----- Scrapbooks -----
  const scrapbookKey = 'Scrapbooks';
  const scrapbooks = [
    {
      title: 'My First Scrapbook',
      collaborators: ['user1', 'user2'],
      mapLocations: [
        {
          coordinates: new firebase.firestore.GeoPoint(48.8584, 2.2945),
          name: '',
        },
      ],
      owner: 'Becca',
      pages: ['t07ifAd5BvIDB9mQ84dT'],
    },
  ];
  addToCollection(scrapbookKey, scrapbooks);
}
