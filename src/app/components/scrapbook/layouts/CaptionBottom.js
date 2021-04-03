import React from "react";
import { Grid, Card, Text, Box } from "grommet";
import MapContainer from "../../map/markerMap/MapContainer";
import { Map } from "../..";

export default function CaptionBottom({ cards, layout }) {
  const title = cards.filter((card) => card.type === "title").shift().body;
  return (
    <Box pad={{ vertical: "xsmall", horizontal: "large" }}>
      <Grid
        fill
        rows={["small", "small", "small"]}
        columns={["50%", "50%"]}
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
