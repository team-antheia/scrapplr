import React, { useState } from "react";
import axios from "axios"
import { Button, Form, FormField, TextInput } from "grommet";


function Gif(){
  const [gif, setGif] = useState("");


  const getRandomArbitrary = (min, max) => {
    return Math.floor((Math.random() * (max - min) + min))
  }


 const fetchGif = async (event) => {
   console.log('in fetch dif')
   const randomNum = getRandomArbitrary(0, 50);
      try {
        const res = await axios.get(`https://api.giphy.com/v1/gifs/search?q=${event}&${process.env.REACT_APP_GIPHY_API_KEY}&rating=pg`);
        if(res){
          const availableGifs = res.data.data;
          const  gifs = availableGifs[randomNum];
          console.log("tin", gifs);
        }
      } catch (error) {

      }
  };



  return (
    <Form>
      <FormField>
        <TextInput
        placeholder="Gif"
        name="gif"
        onChange={(evt) => setGif(evt.target.value)}
        value={gif}
        type="text"
        >
        </TextInput>
      </FormField>
      <Button
          onSubmit={fetchGif}
          label="Find Gif"
           />
    </Form>
  );
}

export default Gif