
import React from "react";
import { Card, CardBody, Grommet, grommet, Text, Box, Image } from "grommet";


const SinglePage = (props) => {
  const bookStyle = {
    position: "relative",
    alignItems: "stretch",
    display: "flex",

    height: "10%",
    width: "10%",
  };
  const cardStyle = {
    display: "flex",
    flex: true,
    pad: "medium",
    elevation: "medium",
    alignContent: "around",
    background: "light-1",
  };
  console.log("the props", props);
  const { cards } = props.page;
  return (
    <div>

      <article style={bookStyle}>
        <Grommet theme={grommet}>
          {cards.map((card) => {
            return (
              <Card style={cardStyle}>
                <CardBody>
                  {card.type === "description" && (
                    <Text color="accent-1">{card.body}</Text>
                  )}

                  {card.type === "image" && (
                      <Box height="small" width="small" border>
                      <Image src={card.body} fit="contain" />
                    </Box>
                  )}
                </CardBody>
              </Card>
            );
          })}
        </Grommet>
      </article>
    </div>
  );
};

export default SinglePage;
