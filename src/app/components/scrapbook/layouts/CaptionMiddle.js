import React from "react";
import { Grid, Card } from "grommet";

export default function CaptionMiddle() {
  return (
    <Grid
      rows={["small", "small", "small"]}
      columns={["small", "small"]}
      gap="xsmall"
      areas={[
        { name: "media1", start: [0, 0], end: [0, 0] },
        { name: "media2", start: [1, 0], end: [1, 0] },
        { name: "caption", start: [0, 1], end: [1, 1] },
        { name: "media3", start: [0, 2], end: [0, 2] },
        { name: "media4", start: [1, 2], end: [1, 2] },
      ]}
    >
      <Card gridArea="media1" background="light-1" />
      <Card gridArea="media2" background="light-2" />
      <Card gridArea="caption" background="brand" />
      <Card gridArea="media3" background="light-3" />
      <Card gridArea="media4" background="light-4" />
    </Grid>
  );
}
