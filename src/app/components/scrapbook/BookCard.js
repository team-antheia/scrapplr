import React from "react";
import { Link } from "react-router-dom";
import { Card, CardFooter, CardBody, CardHeader, Image } from "grommet";

export default function BookCard({
  coverImageUrl,
  title,
  email,
  type,
  scrapbookId,
  onSelect,
  mapLocations
}) {
  console.log("mapLocations", mapLocations);
  return (
    <Link
      to={{
        pathname: `/scrapbooks/${scrapbookId}`,
        state: {
          mapLocations: [...mapLocations],
        },
      }}
    >
      <Card
        elevation="medium"
        height="small"
        width="medium"
        background="glass"
        onClick={(event) => onSelect(event, scrapbookId)}
      >
        <CardHeader style={{ color: "black" }} pad="small">
          {title}
        </CardHeader>
        <CardBody background="glass" pad="small">
          <Image fit="cover" src={coverImageUrl} />
        </CardBody>
        <CardFooter background="background-contrast" pad="small">
          by {email}
        </CardFooter>
      </Card>
    </Link>
  );
}