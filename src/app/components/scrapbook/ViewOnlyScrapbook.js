import React, { useEffect, useState } from 'react';
import FlipPage from 'react-flip-page';

import {
  Box,
  Button,
  ResponsiveContext,
  Grid,
  Card,
  Spinner,
  Text,
} from 'grommet';
import 'rsuite/dist/styles/rsuite-default.css';
import { firestore } from '../../../index';

import Default from './layouts/Default';

import CaptionTop from './layouts/CaptionTop';
import CaptionBottom from './layouts/CaptionBottom';
import { withRouter } from 'react-router-dom';

function ScrapbookView(props) {
  const [pages, setPages] = useState([]);
  const [cards, setCards] = useState([]);
  const [pageNum, setPageNum] = useState(1);

  useEffect(() => {
    async function fetchPages() {
      if (props.params.scrapbookId) {
        const pagesRef = firestore.collection('Pages');
        const queryRef = await pagesRef
          .where('scrapbookId', '==', props.params.scrapbookId)
          .orderBy('pageNum')
          .get();

        if (queryRef.empty) {
          console.log('No matching docs');
          return;
        }

        const pageData = [];
        await queryRef.forEach((doc) => {
          pageData.push(doc.data());
        });
        setPages(pageData);
        if (pageData[pageNum - 1]) {
          setCards(pageData[pageNum - 1].cards);
        }
      }
    }
    fetchPages();
  }, [props.params.scrapbookId, pageNum]);

  const backToSignUp = () => {
    const { history } = props;
    if (history) history.push('/signup');
  };

  const bookStyle = {
    position: 'relative',
    alignItems: 'flex-end',
    display: 'flex',
    height: '100%',
    width: '100%',
  };

  return pages.length ? (
    <Box>
      <Box
        width={{ min: '85vw' }}
        height={{ min: '75vh' }}
        justify="center"
        align="center"
        background={{
          color: 'neutral-1',
          opacity: true,
          position: 'bottom',
          repeat: 'no-repeat',
          size: 'cover',
        }}
        border={{
          color: 'border',
          size: 'large',
          style: 'groove',
          side: 'all',
        }}
      >
        <ResponsiveContext.Consumer>
          {/* mobile view */}
          {(size) =>
            size === 'small' ? (
              <FlipPage
                disableSwipe={true}
                flipOnTouch={true}
                responsive={true}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '24x',
                }}
              >
                <Grid
                  rows={['small', 'small', 'small']}
                  columns={['small', 'small']}
                  gap="xsmall"
                  areas={[
                    { name: 'card1', start: [0, 0], end: [1, 0] },
                    { name: 'nav', start: [0, 1], end: [0, 1] },
                    { name: 'main', start: [1, 1], end: [1, 1] },
                    { name: 'sub', start: [0, 2], end: [1, 2] },
                  ]}
                >
                  <Card gridArea="card1" background="brand" />
                  <Card gridArea="nav" background="light-5" />
                  <Card gridArea="main" background="light-2" />
                  <Card gridArea="sub" background="light-2" />
                </Grid>
                <Grid
                  rows={['small', 'small', 'small']}
                  columns={['small', 'small']}
                  gap="xsmall"
                  areas={[
                    { name: 'card1', start: [0, 0], end: [1, 0] },
                    { name: 'nav', start: [0, 1], end: [0, 1] },
                    { name: 'main', start: [1, 1], end: [1, 1] },
                    { name: 'sub', start: [0, 2], end: [1, 2] },
                  ]}
                >
                  <Card gridArea="card1" background="brand" />
                  <Card gridArea="nav" background="light-5" />
                  <Card gridArea="main" background="light-2" />
                  <Card gridArea="sub" background="light-2" />
                </Grid>
              </FlipPage>
            ) : (
              // Webpage
              <div
                style={{
                  display: 'flex',
                  width: '100%',
                  height: '100%',
                }}
              >
                <FlipPage
                  // trying to get the page to stop swiping but it won't.
                  // if this stops anyone from swiping, change it to 'isEditing'
                  disableSwipe={true}
                  height={320}
                  responsive={true}
                  orientation="horizontal"
                  // showSwipeHint={true}
                >
                  {pages.length >= 1 ? (
                    pages.map((page) => {
                      return (
                        <div>
                          {/* <CaptionTop page={pages[pageNum - 1]} /> */}

                          <Text>{page.pageNum}</Text>
                          <Card background="brand" gridArea="header">
                            {page.pageTitle}
                          </Card>
                          <CaptionTop cards={cards} />
                        </div>
                      );
                    })
                  ) : (
                    <div>
                      <Box pad="xxsmall">
                        <Default />
                      </Box>
                      <Box>{/* <CaptionMiddle /> */}</Box>
                      <Box>{/* <CaptionTop /> */}</Box>
                      <Box>
                        <CaptionBottom />
                      </Box>
                    </div>
                  )}
                  <div></div>
                  <div></div>
                </FlipPage>
              </div>
            )
          }
        </ResponsiveContext.Consumer>
      </Box>
      <Button
        type="button"
        label="join scrapplr"
        onClick={backToSignUp}
        primary
        margin="small"
      />
    </Box>
  ) : (
    <Spinner />
  );
}

export default withRouter(ScrapbookView);

const styles = {
  twoPage: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    padding: 'auto',
    background: 'rgba(255,255,255, 0.1)',
  },
  container: {
    padding: 8,
    background:
      'linear-gradient(to top right, rgba(255,255,255,0.7), rgba(255,255,255,0.3))',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '75vh',
    minWidth: '95vw',
    borderRadius: '11px',
  },
  singlePage: { width: 390, height: '100%', minHeight: 500 },
};
