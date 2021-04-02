import React, { useState } from 'react';
import firebase, { firestore } from '../../../index';
import { Button, FormField, Form, Heading, TextInput } from 'grommet';

const CaptionForm = (props) => {
  const [description, setDescription] = useState('');
  const [isClicked, setIsClicked] = useState(false);

  const updateDatabase = async () => {
    const pagesRef = firestore.collection('Pages');
    const singlePageRef = await pagesRef
      .where('scrapbookId', '==', props.scrapbookId)
      .get();

    if (singlePageRef.empty) {
      console.log('no matching documents');
      return;
    }

    singlePageRef.forEach(async (doc) => {
      // Grab page: console.log('page id', doc.id);
      await firestore
        .collection('Pages')
        .doc(doc.id)
        .update({
          cards: firebase.firestore.FieldValue.arrayUnion({
            body: description,
            type: 'description',
            //layout: props.layout
          }),
        });
    });
    setDescription('');
    setIsClicked(true);
  };

  return (
    <div>
      <Form>
        <Heading level={4}>Add a description</Heading>
        <Button style={{ width: '40%' }} primary onClick={updateDatabase}>
          {isClicked ? 'added!' : 'add'}
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
