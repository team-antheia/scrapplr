import React, { useState } from 'react';
import firebase, { firestore } from '../../../index';
import { Button, FormField, Form, Heading, TextInput } from 'grommet';

const CaptionForm = (props) => {
  const [description, setDescription] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const [buttonMessage, setButtonMessage] = useState('added!');

  const updateDatabase = async () => {
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

    const newCard = {
      body: description,
      type: 'description',
      //layout: props.layout
    };

    singlePageRef.forEach(async (doc) => {
      // Grab page: console.log('page id', doc.id);
      const queryRef = await firestore.collection('Pages').doc(doc.id);

      if (doc.data().cards.length >= 4) {
        setButtonMessage('try again');
        window.alert('Too many cards on this page!');
      } else {
        queryRef.update({
          cards: firebase.firestore.FieldValue.arrayUnion(newCard),
        });
      }
    });
    setDescription('');
    setIsClicked(true);
    props.setCards(newCard);
  };

  return (
    <div>
      <Form>
        <Heading level={4}>Add a description</Heading>
        <Button style={{ width: '40%' }} primary onClick={updateDatabase}>
          {isClicked ? buttonMessage : 'add'}
        </Button>
        <FormField>
          <TextInput
            type="description"
            value={description}
            placeholder="description"
            onChange={(evt) => setDescription(evt.target.value)}
          />
        </FormField>
      </Form>
    </div>
  );
};

export default CaptionForm;
