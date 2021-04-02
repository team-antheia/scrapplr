import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardFooter, CardBody, CardHeader, Image } from 'grommet';

export default function BookCard({
  coverImageUrl,
  title,
  email,
  name,
  type,
  scrapbookId,
  onSelect,
  mapLocations,
}) {
  return (
    <Link
      to={{
        pathname: `/scrapbooks/${scrapbookId}`,
        state: {
          mapLocations: [...mapLocations],
        },
      }}
      style={{ height: 'max-content', padding: '12px' }}
    >
      <Card
        elevation="medium"
        height="small"
        width="medium"
        background="glass"
        onClick={(event) => onSelect(event, scrapbookId)}
      >
        <CardHeader style={{ color: 'black' }} pad="small">
          {title}
        </CardHeader>
        <CardBody background="glass" pad="small">
          <Image fit="cover" src={coverImageUrl} />
        </CardBody>
        <CardFooter background="background-contrast" pad="small">
          by {name}
        </CardFooter>
      </Card>
    </Link>
  );
}
