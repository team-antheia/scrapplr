import React from 'react';
import { Grid, Card, Text, Image } from 'grommet';
import { Map } from '../..';
import MapContainer from '../../map/markerMap/MapContainer';
import StreetView from '../../map/360/StreetView';

export default function Default(props) {
  const { cards } = props;
  console.log('grid cards', cards);

  const makeCardElements = (cards) => {
    // iterate over cards from props
    return cards.map((card, i) => {
      let cardBody;
      // check card type
      if (card.type === 'text') {
        // create grommet element based on type
        cardBody = <Text key={i}>{card.body}</Text>;
      }

      if (card.type === 'image') {
        cardBody = <Image key={i} src={card.body} />;
      }

      if (card.type === 'panoramic') {
        cardBody = <StreetView key={i} />;
      }

      // add gridArea prop based on card index
      if (i === 0) {
        return (
          <Card gridArea="top" background="#92abb3">
            {cardBody}
          </Card>
        );
      }

      if (i === 1) {
        return (
          <Card gridArea="midLeft" background="light-5">
            {cardBody}
          </Card>
        );
      }
      if (i === 2) {
        return (
          <Card gridArea="midRight" background="light-2">
            {cardBody}{' '}
          </Card>
        );
      }

      if (i === 3) {
        return (
          <Card gridArea="bot" background="light-2">
            .{cardBody}
          </Card>
        );
      }
    });
  };

  return (
    <Grid
      pad="medium"
      fill
      rows={['small', 'small', 'small']}
      columns={['small', 'small']}
      gap="xsmall"
      areas={props.layout}
    >
      {makeCardElements(cards)}
    </Grid>
  );
}
