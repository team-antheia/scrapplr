import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

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
      <Box margin={{ bottom: 'medium' }} direction='row' max='500px'>
        <Button
          type='button'
          className='backHome'
          label='sign up with scrapplr'
          onClick={backHome}
          primary
          margin='small'
          style={{ height: '100%' }}
        />
      </Box>

      {/* <Heading margin="1px" textAlign="center">
        {props.location.state.title}
      </Heading> */}
      <Box
        justify='center'
        align='center'
        height='large'
        width='90vw'
        style={{ maxWidth: '864px' }}
        background='glass2'
        round={true}
        border='7px solid black'
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
    </Box>
  ) : (
    <Spinner />
  );
}

export default withRouter(ScrapbookView);
