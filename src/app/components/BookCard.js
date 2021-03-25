import React from "react";
import { Link } from "react-router-dom";
import { Card, CardFooter, CardBody, CardHeader, Image } from "grommet";
import { cover } from "polished";

export default function BookCard({ coverImageUrl, title, email, type }) {
  console.log("bookcard props", email);
  return (
    <Link to="/demo">
      <Card elevation="medium" height="small" width="medium" background="glass">
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
