import React, { useState } from "react";
import firebase, { firestore } from "../../../index";
import { Button, FormField, Form, Heading, TextInput } from "grommet";

const CaptionForm = (props) => {
  const [description, setDescription] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [buttonMessage, setButtonMessage] = useState("added!");

  const updateDatabase = async () => {
    const pagesRef = firestore.collection("Pages");
    const singlePageRef = await pagesRef
      .where("scrapbookId", "==", props.scrapbookId)
      .where("pageNum", "==", props.currentPage)
      .get();

    if (singlePageRef.empty) {
      console.log("no matching documents");
      return;
    }

    const newCard = {
      body: description,
      type: 'description',
    };

    singlePageRef.forEach(async (doc) => {
      const queryRef = await firestore.collection('Pages').doc(doc.id);

      if (doc.data().cards.length >= 4) {
        setButtonMessage("try again");
        window.alert("Too many cards on this page!");
      } else {
        queryRef.update({
          cards: firebase.firestore.FieldValue.arrayUnion(newCard),
        });
      }
    });
    setDescription("");
    setIsClicked(true);
    props.setCards(newCard);
  };

  return (
    <div>
      <Form >
        <Heading margin="10px" level={4}>
          Add a description
        </Heading>
        <Button
        border="solid"
          margin="5px"
          style={{ width: "100%" }}
          primary
          label="add"
          onClick={updateDatabase}
        >
          {/* {isClicked ? buttonMessage : "add"} */}
        </Button>
        <FormField>
          <TextInput
            dropHeight="medium"
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
