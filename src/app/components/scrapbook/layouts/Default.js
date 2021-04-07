import React, { useState, useEffect } from 'react';
import { Box, Grid, Card, Text, Image, ResponsiveContext } from 'grommet';

import StreetView from '../../map/360/StreetView';

export default function Default(props) {
  const [cards, setCards] = useState(props.cards);

  useEffect(() => {
    setCards(props.cards);
    return () => {};
  }, [props.cards]);

  const makeCardElements = (cards) => {
    // iterate over cards from props
    return cards.map((card, i) => {
      let cardBody;
      // check card type

      if (card.type === 'text' || card.type === 'description') {
        // create grommet element based on type
        cardBody = <Text key={i}>{card.body}</Text>;
      }

      if (card.type === 'image') {
        cardBody = <Image fit="contain" key={i} src={card.body} />;
      }

      if (card.type === 'panoramic') {
        cardBody = (
          <Box justify="end" align="center">
            <StreetView lat={card.body._lat} long={card.body._long} key={i} />
          </Box>
        );
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
            {cardBody}
          </Card>
        );
      }
    });
  };

  return (
    <ResponsiveContext.Consumer>
      {(size) => {
        const rows =
          size === 'large'
            ? ['31%', '31%', '31%']
            : ['small', 'small', 'small'];
        return (
          <Box fill pad={{ vertical: 'xsmall', horizontal: 'large' }}>
            <Grid
              rows={rows}
              columns={['50%', '50%']}
              gap="small"
              areas={props.layout}
              style={{ minHeight: '100%' }}
            >
              {
                cards.length ? (
                  makeCardElements(cards)
                ) : (
                  <Text>No cards yet!</Text>
                ) /*<Spinner />*/
              }
            </Grid>
          </Box>
        );
      }}
    </ResponsiveContext.Consumer>
  );
}
