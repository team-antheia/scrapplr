import React, { useState } from 'react';
import firebase, { storage, firestore, auth } from '../../index';
import { EXIF } from 'exif-js';

function PhotoUpload() {
  //declares names in state, set to empty string
  const [imageAsFile, setImageAsFile] = useState('');
  const [imageAsUrl, setImageAsUrl] = useState('');
  const [latitude, setLat] = useState('');
  const [longitude, setLon] = useState('');

  //When photo is uploaded, grab data and set to state
  const handleImageAsFile = (e) => {
    // const image = e.target.files[0];
    setImageAsFile(e.target.files[0]);
    // console.log(e.target.files[0]);
    EXIF.getData(e.target.files[0], function () {
      console.log(e.target.files[0].exifdata);
    });
  };

  const handleFirebaseUpload = (e) => {
    function ConvertDMSToDD(degrees, minutes, seconds, direction) {
      var dd = degrees + minutes / 60 + seconds / 3600;

      if (direction === 'S' || direction === 'W') {
        dd = dd * -1;
      }

      return dd;
    }

    EXIF.getData(imageAsFile, function () {
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
      console.log(latFinal);

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
      console.log(lonFinal);
    });

    e.preventDefault();
    //upload file to firebase storage
    const uploadTask = storage
      .ref(`/images/${imageAsFile.name}`)
      .put(imageAsFile);

    //initiates the firebase side uploading
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        //takes a snap shot of the process as it is happening
        console.log(snapshot);
      },
      (err) => {
        //catches the errors
        console.log(err);
      },
      () => {
        // gets storage reference from image storage in firebase
        // gets the download url from firebase file path
        // sets the image from firebase as a URL onto local state
        storage
          .ref('images')
          .child(imageAsFile.name)
          .getDownloadURL()
          .then((firebaseUrl) => {
            setImageAsFile(null);
            setImageAsUrl(firebaseUrl);
          });
      }
    );
  };

  //separate into two functions;
  //find function for place I want to change
  //update function that takes in that place and makes update
  async function updateDatabase() {
    let userId = auth.currentUser.uid;

    let snapshot = await firestore
      .collection('Scrapbooks')
      .where('Owner', '==', userId)
      .get();
    //   // .collection('Map Points')
    if (snapshot.empty) {
      console.log('No matching documents.');
    }

    snapshot.forEach((scrapbook) => {
      // console.log('scrapbook', '=>', scrapbook.data().Owner);
      console.log(scrapbook.data());
      // if (scrapbook.data().Owner === userId) {
      //   console.log(scrapbook.data()['Map Points']);
      // }
    });

    // try {
    //   await firestore.runTransaction(async (t) => {
    //     const doc = await t.get(scrapbookRef)

    //     doc.data().
    //   })
    //   console.log('Success!')
    // } catch (e) {
    //   console.log('Failed', e)
    // }
  }

  return (
    <div className="photo-upload">
      <h1>Upload a photo</h1>
      <form onSubmit={handleFirebaseUpload}>
        <input
          type="file"
          onChange={handleImageAsFile}
          accept="image/png, image/jpeg, image/jpg"
        />
        <button>Upload</button>
      </form>
      {/* <img src={imageAsUrl} alt="" /> */}
      <button type="button" onClick={updateDatabase}>
        Update DB
      </button>
    </div>
  );
}

export default PhotoUpload;
