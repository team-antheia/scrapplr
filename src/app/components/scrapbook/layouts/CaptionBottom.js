import React from 'react';
import { Grid, Card, Text, Box } from 'grommet';
import { Map } from '../..';

export default function CaptionBottom({ cards, layout }) {
  const title = cards.filter((card) => card.type === 'title').shift().body;
  return (
    <Box height="50%" pad={{ vertical: 'xsmall', horizontal: 'large' }}>
      <Grid
        fill
        rows={['60%', '60%', '60%']}
        columns={['50%', '50%']}
        gap="small"
        areas={layout}
      >
        <Card gridArea="caption" background="brand">
          <Text>{title}</Text>
        </Card>
        <Card gridArea="media" background="light-5" align="center">
          <Map />
        </Card>
      </Grid>
    </Box>
  );
}
