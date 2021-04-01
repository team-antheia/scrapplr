import React, {useEffect, useState} from "react";
import { Grid, Card, Text, Image, Anchor} from "grommet";

export default function CaptionTop(props) {

  console.log('the props ', props)

  const cards = props.page.cards
  return (
    <Grid
      rows={["flex", "flex", "flex"]}
      columns={["flex", "flex"]}
      gap="xsmall"
      areas={[
        { name: "caption", start: [0, 0], end: [1, 0] },
        { name: "media", start: [0, 1], end: [1, 2] },
      ]}
    >
      <div>
      {cards.map(card=>{
        return(
          <div>
          <div>
          {card.type=== "description" && <Card gridArea="caption" background="brand" >
            <Text>{card.body}</Text>
            </Card>
           }
           </div>
           <div>
           {card.type=== "image" && <Card gridArea="media" background="brand" >
           <Anchor href="#">
          <Image fit="cover" fill src="https://media.cntraveler.com/photos/53fc86a8a5a7650f3959d273/master/pass/travel-with-polaroid-camera.jpg" />
        </Anchor>
            </Card>
           }
          </div>
          </div>
        )

      })}
      </div>
    </Grid>
  );
}
