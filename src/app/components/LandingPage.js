import React from 'react';
import { Heading, Text, Image } from 'grommet';

export default function LandingPage() {
  return (
    <div>
      <Image height="180px" src="logo.png" />
      <Heading color="brand">scrapplr</Heading>
      <Text>a virtual travel diary</Text>
    </div>
  );
}
