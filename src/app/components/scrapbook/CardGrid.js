import React, { useContext } from 'react';
// import { Grid, Card, Text, Image, Anchor } from 'grommet';
import StreetView from '../map/360/StreetView';

import {
  grommet,
  Box,
  Card,
  Grid,
  Grommet,
  ResponsiveContext,
  Text,
  Anchor,
  Image
} from 'grommet';

// const cards = Array(6)
//   .fill()

//   .map((_, i) => <Text key={i}>{`Test ${i}`}</Text>);


const renderCard = (card) => {
    switch (card.type) {
      case "description":
        return (
            <Text  font-size="25.5vw">{card.body}</Text>
        );
      // case "panoramic":
      //   return (
      //       <StreetView lat={card.body._lat} long={card.body._long} />
      //   );
      case "image":
        return (
              <Image  src={card.body} />
        );
      default:
        return;
    }
  };
export const CardGrid = (props) => {
  const size = useContext(ResponsiveContext);
  const cards = props.cards;
  console.log('the props', props)

  return (
    <Grommet theme={grommet}>
      <Box  margin='small' pad="small">
        <Grid    columns={size !== 'small' ? 'small' : '100%'} gap="small">
          {cards.length && cards.map((card, index) => { return (
          <Card pad="large" key={index}>
              {renderCard(card)}
            </Card>)}
            )}

        </Grid>
      </Box>
    </Grommet>
  );
};