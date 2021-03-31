import React, {useEffect, useState} from "react";
import { Grid, Card, Text } from "grommet";

export default function CaptionTop(props) {
  const [page, setPage] = useState({});
  // const [cards, setCards] = useState([]);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    if(props.page){
      setPage(props.page)
      // setCards(page.cards)
    }

  },[props.page]);

  console.log('the props ', props)
  console.log('the page ', page)
  const cards = page.cards
  return (
    <Grid
      rows={["small", "small", "small"]}
      columns={["small", "small"]}
      gap="xsmall"
      areas={[
        { name: "caption", start: [0, 0], end: [1, 0] },
        { name: "media", start: [0, 1], end: [1, 2] },
      ]}
    >
      {/* <div>
      {cards.map(card=>{
        return(
          <div>
          {card.type=== "description" && <Card gridArea="caption" background="brand" >
            <Text>{card.body}</Text>
            </Card>
           }
          </div>
        )

      })}
      </div> */}
    </Grid>
  );
}
