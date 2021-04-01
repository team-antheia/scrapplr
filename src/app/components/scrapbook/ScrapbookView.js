import React, { Component, useEffect, useState } from 'react';
import FlipPage from 'react-flip-page';

import { Box, Button, ResponsiveContext, Grid, Card, Spinner } from 'grommet';
import 'rsuite/dist/styles/rsuite-default.css';
import { firestore } from '../../../index';
import { Toolbar } from '..';

import Default from './layouts/Default';

import CaptionTop from './layouts/CaptionTop';
import CaptionBottom from './layouts/CaptionBottom';
import { withRouter } from 'react-router-dom';

function ScrapbookView(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [pages, setPages] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function fetchPages() {
      if (props.params.scrapbookId) {
        const pagesRef = firestore.collection('Pages');
        const queryRef = await pagesRef
          .where('scrapbookId', '==', props.params.scrapbookId)
          .get();

        if (queryRef.empty) {
          console.log('No matching docs');
          return;
        }

        const pageData = [];
        queryRef.forEach((doc) => {
          pageData.push(doc.data());
        });
        console.log('data from db', pageData[0]);
        setPages(pageData);
        // console.log('state', pages);
        // setPages([...pages, ...pageData]);
      }
    }

    fetchPages();
  }, [props.params.scrapbookId]);

  const backHome = () => {
    const { history } = props;
    if (history) history.push('/home');
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // const { pages, pageNum } = this.state;
  // const mapLocations = [this.state.mapLocations];
  const bookStyle = {
    position: 'relative',
    alignItems: 'flex-end',
    display: 'flex',
    height: '100%',
    width: '100%',
  };

  return pages.length ? (
    <Box>
      <Button
        type="button"
        clasName="backHome"
        label="back to home"
        onClick={backHome}
        primary
        margin="small"
      />
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
                  disableSwipe={isEditing}
                  height={320}
                  responsive={true}
                  orientation="horizontal"
                  showSwipeHint={true}
                >
                  {pages.length >= 1 ? (
                    <div>
                      <CaptionTop page={pages[0]} />
                    </div>
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
        <Box direction="row">
          <Toolbar scrapbookId={props.params.scrapbookId} />
        </Box>
      </Box>
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
