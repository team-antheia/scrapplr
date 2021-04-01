import React, { useState } from 'react';
import firebase, { firestore } from '../../../index';
import {
  grommet,
  Box,
  Text,
  Button,
  FormField,
  Form,
  Heading,
  TextInput,
} from 'grommet';

const CaptionForm = (props) => {
  const [description, setDescription] = useState('');

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
  };

  return (
    <div>
      <Form>
        <Heading level={3}>Add a description</Heading>
        <FormField>
          <TextInput
            type="description"
            value={description}
            placeholder="description"
            onChange={(evt) => setDescription(evt.target.value)}
          />
        </FormField>
        <Button
          style={{ width: '40%' }}
          primary
          label="add card"
          onClick={updateDatabase}
        />
      </Form>
    </div>
  );
};

export default CaptionForm;
