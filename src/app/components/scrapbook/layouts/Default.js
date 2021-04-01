import React from "react";
import { Grid, Card } from "grommet";

export default function Default() {
  return (
    <Grid
      rows={["small", "small", "small"]}
      columns={["small", "small"]}
      gap="xsmall"
      areas={[
        { name: "card1", start: [0, 0], end: [1, 0] },
        { name: "nav", start: [0, 1], end: [0, 1] },
        { name: "main", start: [1, 1], end: [1, 1] },
        { name: "sub", start: [0, 2], end: [1, 2] },
      ]}
    >
      <Card gridArea="card1" background="brand" />
      <Card gridArea="nav" background="light-5" />
      <Card gridArea="main" background="light-2" />
      <Card gridArea="sub" background="light-2" />
    </Grid>
  );
}
