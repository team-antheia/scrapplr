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

  const addPage = async (scrapbookId) => {
    const newPageNum = pageNum + 1;

    const pagesRef = firestore.collection('Pages');

    const newPage = await pagesRef.add({
      cards: [],
      pageNum: newPageNum,
      pageTitle: '',
      scrapbookId: scrapbookId,
      layout: [
        { name: 'top', start: [0, 0], end: [1, 0] },
        { name: 'midLeft', start: [0, 1], end: [0, 1] },
        { name: 'midRight', start: [1, 1], end: [1, 1] },
        { name: 'bot', start: [0, 2], end: [1, 2] },
      ],
    });

    setPages([...pages, (await newPage.get()).data()]);
    setPageNum(newPageNum);
  };

  const useCardStatus = (newCard) => {
    pages[currentPageIdx - 1].cards = [
      ...pages[currentPageIdx - 1].cards,
      newCard,
    ];
    const newPages = [...pages];

    setPages(newPages);

    return () => {
      console.log('updated page', pages);
    };
  };

  const backHome = () => {
    const { history } = props;
    if (history) history.push('/home');
  };

  const toggleModal = () => {
    setIsModalShowing(!isModalShowing);
    setCopyButtonClicked(false);
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(
      `scrapplr.web.app/scrapbooks/${props.params.scrapbookId}/share`
    );
    setCopyButtonClicked(true);
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
          label='back to home'
          onClick={backHome}
          primary
          margin='small'
          style={{ height: '100%' }}
        />
        <Button
          type='button'
          label='share with friends'
          onClick={toggleModal}
          primary
          margin='small'
          style={{ height: '100%' }}
        />
      </Box>
      <Heading margin='1px' textAlign='center'>
        {props.location.state.title}
      </Heading>
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
        <Box direction='row'>
          {pages.indexOf(currentPage) !== 0 && (
            <Toolbar
              setIsEditing={setIsEditing}
              isEditing={isEditing}
              addPage={lastPage.pageId === currentPage ? addPage : false}
              scrapbookId={props.params.scrapbookId}
              currentPage={currentPageIdx}
              setCards={useCardStatus}
            />
          )}
        </Box>
        <Modal
          style={{ maxWidth: '100vw' }}
          overflow={true}
          backdrop={true}
          show={isModalShowing}
        >
          <Text>Share this link:</Text>
          <p id='link'>{`scrapplr.web.app/scrapbooks/${props.params.scrapbookId}/share`}</p>
          <Button
            onClick={copyToClipboard}
            label={copyButtonClicked ? 'copied!' : 'copy'}
          />
          <Button onClick={toggleModal} label='close' />
        </Modal>
      </Box>
    </Box>
  ) : (
    <Spinner />
  );
}

export default withRouter(ScrapbookView);
