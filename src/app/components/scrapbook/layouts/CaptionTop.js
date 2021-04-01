import React from "react";
import { Grid, Card, Text, Image, Anchor } from "grommet";
import StreetView from "../../map/360/StreetView";

export default function CaptionTop(props) {
  console.log("the props ", props);

  const cards = props.page.cards;
  return (
    <Grid
      rows={["flex", "flex", "flex"]}
      columns={["flex", "flex"]}
      gap="xsmall"
      areas={[
        { name: "caption", start: [0, 0], end: [0, 0] },
        { name: "media", start: [0, 1], end: [0, 1] },
        { name: "media2", start: [0, 2], end: [1, 2] },
      ]}
    >
      <div>
        <Card background="brand" gridArea="header">
          {props.page.pageTitle}
        </Card>
        {cards.map((card) => {
          return (
            <div>
              <div>
                {card.type === "description" && (
                  <Card gridArea="caption" background="brand">
                    <Text>{card.body}</Text>
                  </Card>
                )}
              </div>
              {card.type === "panoramic" && (
                <Card gridArea="media" background="brand" flex>
                  <StreetView lat={card.body._lat} long={card.body._long} />
                </Card>
              )}
              <div>
                {card.type === "image" && (
                  <Card gridArea="media2" background="brand">
                    <Anchor href="#">
                      <Image
                        fill
                        src="https://media.cntraveler.com/photos/53fc86a8a5a7650f3959d273/master/pass/travel-with-polaroid-camera.jpg"
                      />
                    </Anchor>
                  </Card>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Grid>
  );
}
