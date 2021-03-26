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
  // addToCollection(userKey, users);

  //----- Scrapbooks -----
  const scrapbookKey = 'Scrapbooks';
  const scrapbooks = [
    {
      title: 'My First Scrapbook',
      collaborators: ['user1', 'user2'],
      coverImageUrl:
        'https://media.cntraveler.com/photos/53fc86a8a5a7650f3959d273/master/pass/travel-with-polaroid-camera.jpg',
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
  // addToCollection(scrapbookKey, scrapbooks);

  //----- Pages -----
  const pagesKey = 'Pages';
  const pages = [
    {
      scrapbookId: 'XQkebrXC1teAOhImleg3',
      pageTitle: 'Test Page',
      layout: [
        { i: '2', x: 1, y: 2, w: 7, h: 2 },
        {
          i: '1',
          x: 1,
          y: 0,
          w: 4,
          h: 4,
        },
        { i: '3', x: 4, y: 0, w: 5, h: 4 },
      ],
      cards: [
        {
          title: 'Description 1',
          body: 'Nam vitae urna ut nisl eleifend pretium in eget sapien.',
        },
        {
          title: 'Description 2',
          body:
            'Vestibulum erat ipsum, laoreet nec elementum id, laoreet vel nisi.',
        },
        {
          title: 'Image 1',
          body:
            'https://firebasestorage.googleapis.com/v0/b/team-antheia-capstone.appspot.com/o/images%2FDSC_0196.jpg?alt=media&token=5185a351-f5c7-45a1-abc5-5ee1a54edf75',
        },
        {
          title: 'Image 2',
          body:
            'https://firebasestorage.googleapis.com/v0/b/team-antheia-capstone.appspot.com/o/images%2Fbrandon.png?alt=media&token=3b9c103c-044e-420b-b6da-d39577ff588e',
        },
      ],
    },
  ];
  // addToCollection(pagesKey, pages);
}
