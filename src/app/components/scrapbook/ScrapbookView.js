import React, { Component, useEffect, useState } from "react";
import FlipPage from "react-flip-page";

import {
  Box,
  Button,
  ResponsiveContext,
  Grid,
  Card,
  Spinner,
  Text,
  Carousel,
} from 'grommet';

import 'rsuite/dist/styles/rsuite-default.css';
import { firestore } from '../../../index';
import { Toolbar } from '..';
import { Modal } from 'rsuite';


import Default from "./layouts/Default";

import CaptionTop from "./layouts/CaptionTop";
import CaptionBottom from "./layouts/CaptionBottom";
import { Route, withRouter } from "react-router-dom";
import { size } from "polished";


function ScrapbookView(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [pages, setPages] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [isModalShowing, setIsModalShowing] = useState(false);
  const [copyButtonClicked, setCopyButtonClicked] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState({});
  const [lastPage, setLastPage] = useState("");

  useEffect(() => {
    // let mounted = true;
    async function fetchPages() {
      if (props.params.scrapbookId) {
        const pagesRef = firestore.collection("Pages");
        const queryRef = await pagesRef
          .where("scrapbookId", "==", props.params.scrapbookId)
          .orderBy("pageNum")
          .get();

        if (queryRef.empty) {
          console.log("No matching docs");
          return;
        }

        const pageData = [];
        await queryRef.forEach((doc) => {
          const pageId = doc.id;
          pageData.push({ ...doc.data(), pageId });
        });
        setPages(pageData);
      }
    }
    fetchPages();
  }, [props.params.scrapbookId, pageNum]);


  const addPage = async (scrapbookId) => {
    const pagesRef = firestore.collection("Pages");

    const newPage = await pagesRef.add({
      cards: [
        { type: "text", body: "new page" },
        {
          type: "image",
          body: "https://static.thenounproject.com/png/558475-200.png",
        },
        { type: "text", body: "or text" },
        { type: "text", body: "or even a street view" },
      ],
      pageNum: pageNum + 1,
      pageTitle: "",
      scrapbookId: scrapbookId,
      layout: [
        { name: "top", start: [0, 0], end: [1, 0] },
        { name: "midLeft", start: [0, 1], end: [0, 1] },
        { name: "midRight", start: [1, 1], end: [1, 1] },
        { name: "bot", start: [0, 2], end: [1, 2] },
      ],
    });

    setPages([...pages, (await newPage.get()).data()]);
    // can't figure out how to actually get this number to incremenet
    setPageNum(pageNum + 1);
  };

  // const useCardStatus = (newCard) => {
  //   if (!cards.includes(newCard)) {
  //     setCards([...cards, newCard]);
  //   }
  // };

  const backHome = () => {
    const { history } = props;
    if (history) history.push("/home");
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
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
    console.log(currentPage);
  };

  return pages.length ? (
    <Box>
      <Box direction="row" max="500px">
        <Button
          type="button"
          className="backHome"
          label="back to home"
          onClick={backHome}
          primary
          margin="small"
        />
        <Button
          type="button"
          label="share with friends"
          onClick={toggleModal}
          primary
          margin="small"
        />
      </Box>
      <Box
        justify="center"
        align="center"
        height="large"
        width="90vw"
        style={{ maxWidth: "864px" }}
        background="glass2"
        round={true}
      >
        <ResponsiveContext.Consumer>
          {(size) => (
            <Carousel
              onChild={handleCurrentPage}
              controls={
                size === "small" && !isEditing ? "selectors" : !isEditing
              }
              fill
            >

              {pages.map((page, idx) => {
                if (idx === pages.length - 1) {
                  setLastPage(page);
                }
                return(
                  <div>
                   <Default key={idx} {...page} />
                  </div>
                )
              })}
            </Carousel>
          )}
        </ResponsiveContext.Consumer>
        <Box direction="row">
          {pages.indexOf(currentPage) !== 0 && (
            <Toolbar
              setIsEditing={setIsEditing}
              isEditing={isEditing}
              addPage={lastPage.pageId === currentPage ? addPage : false}
              scrapbookId={props.params.scrapbookId}
              currentPage={currentPage}
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
          <p id="link">{`scrapplr.web.app/scrapbooks/${props.params.scrapbookId}/share`}</p>
          <Button
            onClick={copyToClipboard}
            label={copyButtonClicked ? 'copied!' : 'copy'}
          />
          <Button onClick={toggleModal} label="close" />
        </Modal>
      </Box>
    </Box>
  ) : (
    <Spinner />
  );
}

export default withRouter(ScrapbookView);
