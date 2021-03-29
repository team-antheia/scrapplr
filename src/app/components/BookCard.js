import React from "react";
import { Card, CardFooter, CardBody, CardHeader, Image } from "grommet";
// import { cover } from "polished";

export default function BookCard({ coverImageUrl, title, email, type, scrapbookId,onSelect }) {
  return (
      <Card elevation="medium" height="small" width="medium" background="glass"
      onClick={(event)=>onSelect(event,scrapbookId)}

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

  );
}
