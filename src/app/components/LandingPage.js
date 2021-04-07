import React from "react";
import {
  Heading,
  Text,
  Image,
  Box,
  Footer,
  Main,

} from "grommet";
import data from "../../data";

const FooterContent = () =>
  data.map((item) => (
    <Box gap="xsmall" key={item[0]}>
      <Text weight="bold" size="small">
        {item.name}
      </Text>
      <a href={item.linkedIn}>linkedIn</a>
      <a href={item.github}>github</a>
    </Box>
  ));

export const LandingPage = () => (
  <Box width="large">
    <Main background pad="xxsmall" width="large">
      <Box align="center">
        <Image height="180px" width="180" src="logo.png" />
        <Heading color="brand">scrapplr</Heading>
        <Text>a virtual travel diary</Text>
      </Box>
    </Main>

    <Footer background pad={{ horizontal: "large", vertical: "medium" }}>
      Built By
      <FooterContent />
    </Footer>
    <Footer
      background
      pad={{ horizontal: "xlarge", vertical: "large" }}
    ></Footer>
  </Box>
);

export default LandingPage;
