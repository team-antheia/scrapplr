import React, { useEffect, useState } from 'react';
<<<<<<< HEAD
//import FlipPage from 'react-flip-page';
=======
import { withRouter } from 'react-router-dom';
>>>>>>> master

import {
  Box,
  Button,
  ResponsiveContext,
  Heading,
  Spinner,
  Text,
  Carousel,
} from 'grommet';

import 'rsuite/dist/styles/rsuite-default.css';
import { firestore } from '../../../index';
import { Toolbar } from '..';
import { Modal } from 'rsuite';

import Default from './layouts/Default';
function ScrapbookView(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [pages, setPages] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [isModalShowing, setIsModalShowing] = useState(false);
  const [copyButtonClicked, setCopyButtonClicked] = useState(false);
  const [currentPage, setCurrentPage] = useState({});
  const [currentPageIdx, setCurrentPageIdx] = useState(0);
  const [lastPage, setLastPage] = useState('');

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
          const pageId = doc.id;
          pageData.push({ ...doc.data(), pageId });
        });
        setPages(pageData);
        setPageNum(pageData.length);
      }
    }
    fetchPages();

    return () => {};
  }, [props.params.scrapbookId, currentPageIdx]);

  const backHome = () => {
    const { history } = props;
    if (history) history.push('/signup');
  };

  const handleCurrentPage = (activeIdx) => {
    setCurrentPage(pages[activeIdx].pageId);

    setCurrentPageIdx(activeIdx + 1);
  };

  return pages.length ? (
    <Box>
      <Box margin={{ bottom: 'medium' }} direction="row" max="500px">
        <Button
          type="button"
          className="backHome"
          label="sign up with scrapplr"
          onClick={backHome}
          primary
          margin="small"
          style={{ height: '100%' }}
        />
      </Box>

      {/* <Heading margin="1px" textAlign="center">
        {props.location.state.title}
      </Heading> */}
      <Box
<<<<<<< HEAD
        width={{ min: '85vw' }}
        height={{ min: '75vh' }}
        justify='center'
        align='center'
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
                  gap='xsmall'
                  areas={[
                    { name: 'card1', start: [0, 0], end: [1, 0] },
                    { name: 'nav', start: [0, 1], end: [0, 1] },
                    { name: 'main', start: [1, 1], end: [1, 1] },
                    { name: 'sub', start: [0, 2], end: [1, 2] },
                  ]}
                >
                  <Card gridArea='card1' background='brand' />
                  <Card gridArea='nav' background='light-5' />
                  <Card gridArea='main' background='light-2' />
                  <Card gridArea='sub' background='light-2' />
                </Grid>
                <Grid
                  rows={['small', 'small', 'small']}
                  columns={['small', 'small']}
                  gap='xsmall'
                  areas={[
                    { name: 'card1', start: [0, 0], end: [1, 0] },
                    { name: 'nav', start: [0, 1], end: [0, 1] },
                    { name: 'main', start: [1, 1], end: [1, 1] },
                    { name: 'sub', start: [0, 2], end: [1, 2] },
                  ]}
                >
                  <Card gridArea='card1' background='brand' />
                  <Card gridArea='nav' background='light-5' />
                  <Card gridArea='main' background='light-2' />
                  <Card gridArea='sub' background='light-2' />
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
                  disableSwipe={true}
                  height={320}
                  responsive={true}
                  orientation='horizontal'
                >
                  {pages.length >= 1 ? (
                    pages.map((page) => {
                      return (
                        <div>
                          {/* <CaptionTop page={pages[pageNum - 1]} /> */}

                          <Text>{page.pageNum}</Text>
                          <Card background='brand' gridArea='header'>
                            {page.pageTitle}
                          </Card>
                          <CaptionTop cards={cards} />
                        </div>
                      );
                    })
                  ) : (
                    <div>
                      <Box pad='xxsmall'>
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
        type='button'
        label='join scrapplr'
        onClick={backToSignUp}
        primary
        margin='small'
      />
=======
        justify="center"
        align="center"
        height="large"
        width="90vw"
        style={{ maxWidth: '864px' }}
        background="glass2"
        round={true}
        border="7px solid black"
      >
        <ResponsiveContext.Consumer>
          {(size) => (
            <Carousel
              onChild={handleCurrentPage}
              controls={
                size === 'small' && !isEditing ? 'selectors' : !isEditing
              }
              fill
            >
              {pages.map((page, idx) => {
                if (idx === pages.length - 1) {
                  setLastPage(page);
                }
                return <Default key={idx} {...page} />;
              })}
            </Carousel>
          )}
        </ResponsiveContext.Consumer>
      </Box>
>>>>>>> master
    </Box>
  ) : (
    <Spinner />
  );
}

export default withRouter(ScrapbookView);
