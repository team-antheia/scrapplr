import React from "react";
import { Grid, Card } from "grommet";

export default function CaptionTop() {
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
      <Card gridArea="caption" background="brand" />
      <Card gridArea="media" background="light-5" />
    </Grid>
  );
}
