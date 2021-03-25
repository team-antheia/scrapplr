import React, { useState } from 'react';
import firebase, { storage, firestore, auth } from '../../index';
import { EXIF } from 'exif-js';
//npm install exif-js --save for installing exif js

function PhotoUpload() {
  //declares names in state, set to empty string
  const [imageAsFile, setImageAsFile] = useState('');

  //----- If image is need on page, use imageAsUrl to access from firebase storage --------
  const [imageAsUrl, setImageAsUrl] = useState('');

  const [latitude, setLat] = useState('');
  const [longitude, setLon] = useState('');

  const handleImageAsFile = (e) => {
    //When photo is uploaded, grab data and set to state
    setImageAsFile(e.target.files[0]);
  };

  const handleFirebaseUpload = (e) => {
    e.preventDefault();

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
      updateDatabase(latFinal, lonFinal);
    });

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

  async function updateDatabase(lat, lon) {
    // ------ Access signed in user -----
    // let userId = auth.currentUser.uid;

    console.log(lat, lon);

    //Reference to scrapbook -- will need to update with current scrapbook doc
    let scrapbookRef = await firestore
      .collection('Scrapbooks')
      .doc('XQkebrXC1teAOhImleg3');

    //Updates scrapbook map locations array with new geopoint
    await scrapbookRef.update({
      mapLocations: firebase.firestore.FieldValue.arrayUnion({
        coordinates: new firebase.firestore.GeoPoint(lat, lon),
        name: 'Location from Photo Upload',
      }),
    });
  }

  return (
    <div className='photo-upload'>
      <h1>Upload a photo</h1>
      <form onSubmit={handleFirebaseUpload}>
        <input
          type='file'
          onChange={handleImageAsFile}
          accept='image/png, image/jpeg, image/jpg'
        />
        <button>Upload</button>
      </form>
      {/* <img src={imageAsUrl} alt="" /> */}
    </div>
  );
}

export default PhotoUpload;
