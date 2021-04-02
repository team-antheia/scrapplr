import React, { useState } from 'react';
import firebase, { storage, firestore } from '../../../index';
import { EXIF } from 'exif-js';
import { Button, FileInput, Heading } from 'grommet';

function PhotoUpload(props) {
  //declares names in state, set to empty string
  const [imageAsFile, setImageAsFile] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const [isLoading, setIsLoading] = useState();
  const [buttonMessage, setButtonMessage] = useState('uploaded!');

  //----- If image is need on page, use imageAsUrl to access from firebase storage --------
  const [imageAsUrl, setImageAsUrl] = useState('');

  const [latitude, setLat] = useState('');
  const [longitude, setLon] = useState('');

  const handleImageAsFile = (e) => {
    //When photo is uploaded, grab data and set to state
    setImageAsFile(e.target.files[0]);
  };

  const handleFirebaseUpload = async (e) => {
    e.preventDefault();
    if (!imageAsFile) {
      alert('Error: No image selected');
      return;
    }

    setIsLoading(true);

    //upload file to firebase storage
    const uploadTask = storage
      .ref(`/images/${imageAsFile.name}`)
      .put(imageAsFile);

    //initiates the firebase side uploading
    await uploadTask.on(
      'state_changed',
      null,
      (err) => {
        //catches the errors
        console.log(err);
      },
      async () => {
        // gets storage reference from image storage in firebase
        // gets the download url from firebase file path
        // sets the image from firebase as a URL onto local state
        await storage
          .ref('images')
          .child(imageAsFile.name)
          .getDownloadURL()
          .then((firebaseUrl) => {
            setImageAsFile(null);
            setImageAsUrl(firebaseUrl);
            updateDatabase(firebaseUrl);
          });
      }
    );

    //Coordinates conversion function
    function ConvertDMSToDD(degrees, minutes, seconds, direction) {
      var dd = degrees + minutes / 60 + seconds / 3600;

      if (direction === 'S' || direction === 'W') {
        dd = dd * -1;
      }

      return dd;
    }
    //Use EXIF to get metadata from photo
    EXIF.getData(imageAsFile, function () {
      if (!imageAsFile.exifdata || !imageAsFile.exifdata.GPSLatitude) {
        return;
      }
      // Calculate latitude decimal
      var latDegree = imageAsFile.exifdata.GPSLatitude[0].numerator;
      var latMinute = imageAsFile.exifdata.GPSLatitude[1].numerator;
      var latSecond = imageAsFile.exifdata.GPSLatitude[2].numerator;
      var latDirection = imageAsFile.exifdata.GPSLatitudeRef;

      var latFinal = ConvertDMSToDD(
        latDegree,
        latMinute,
        latSecond,
        latDirection
      );
      setLat(latFinal);

      // Calculate longitude decimal
      var lonDegree = imageAsFile.exifdata.GPSLongitude[0].numerator;
      var lonMinute = imageAsFile.exifdata.GPSLongitude[1].numerator;
      var lonSecond = imageAsFile.exifdata.GPSLongitude[2].numerator;
      var lonDirection = imageAsFile.exifdata.GPSLongitudeRef;

      var lonFinal = ConvertDMSToDD(
        lonDegree,
        lonMinute,
        lonSecond,
        lonDirection
      );
      setLon(lonFinal);

      //Stores coordinates in db
      updateCoordinates(latFinal, lonFinal);
    });
  };

  async function updateCoordinates(lat, lon) {
    //Reference to scrapbook -- will need to update with current scrapbook doc
    let scrapbookRef = await firestore
      .collection('Scrapbooks')
      .doc(props.scrapbookId);

    //Updates scrapbook map locations array with new geopoint
    await scrapbookRef.update({
      mapLocations: firebase.firestore.FieldValue.arrayUnion({
        coordinates: new firebase.firestore.GeoPoint(lat, lon),
        name: 'Location from Photo Upload',
      }),
    });
  }

  async function updateDatabase(url) {
    const pagesRef = firestore.collection('Pages');
    const singlePageRef = await pagesRef
      .where('scrapbookId', '==', props.scrapbookId)
      .get();
    //^^^ When we know what page the user is on, insert query here ^^^
    // .where('pageNum', '==', props.pageNum)

    if (singlePageRef.empty) {
      console.log('no matching documents');
      return;
    }

    singlePageRef.forEach(async (doc) => {
      const queryRef = await firestore.collection('Pages').doc(doc.id);

      if (doc.data().cards.length >= 4) {
        setButtonMessage('upload failed');
        window.alert('Too many cards on this page!');
      } else {
        queryRef.update({
          cards: firebase.firestore.FieldValue.arrayUnion({
            body: url,
            type: 'image',
            //layout: props.layout
          }),
        });
      }
    });
    setIsLoading(false);
    setIsClicked(true);
    props.setCards();
  }

  return (
    <div className="photo-upload">
      <Heading level={4}>Upload a Photo</Heading>
      <Button
        style={{ width: '30%' }}
        primary
        // label="upload"
        onClick={handleFirebaseUpload}
      >
        {isClicked ? buttonMessage : isLoading ? 'one moment...' : 'upload'}
      </Button>
      <form>
        <FileInput
          type="file"
          onChange={handleImageAsFile}
          accept="image/png, image/jpeg, image/jpg"
        />
      </form>
      {/* <img src={imageAsUrl} alt="" /> */}
    </div>
  );
}

export default PhotoUpload;
