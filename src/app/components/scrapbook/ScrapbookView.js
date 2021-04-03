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
} from "grommet";
import "rsuite/dist/styles/rsuite-default.css";
import { firestore } from "../../../index";
import { Toolbar } from "..";

import Default from "./layouts/Default";

import CaptionTop from "./layouts/CaptionTop";
import CaptionBottom from "./layouts/CaptionBottom";
import { Route, withRouter } from "react-router-dom";
import { size } from "polished";

function ScrapbookView(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [pages, setPages] = useState([]);
  const [cards, setCards] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
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
          pageData.push(doc.data());
        });
        setPages(pageData);
        if (pageData[pageNum - 1]) {
          setCards(pageData[pageNum - 1].cards);
        }
      }
    }

    fetchPages();
  }, [props.params.scrapbookId]);

  const useCardStatus = () => {
    setCards([...cards]);
  };

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

  const backHome = () => {
    const { history } = props;
    if (history) history.push("/home");
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
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
              controls={
                size === "small" && !isEditing ? "selectors" : !isEditing
              }
              fill
            >
              {pages.map((page, idx) =>
                page.pageTitle === "firstPage" ? (
                  <CaptionBottom key={idx} {...page} />
                ) : (
                  <Default key={idx} {...page} />
                )
              )}
            </Carousel>
          )}
        </ResponsiveContext.Consumer>
        <Box direction="row">
          <Toolbar
            setCards={useCardStatus}
            setIsEditing={setIsEditing}
            isEditing={isEditing}
            addPage={addPage}
            scrapbookId={props.params.scrapbookId}
          />
        </Box>
      </Box>
    </Box>
  ) : (
    <Spinner />
  );
}

export default withRouter(ScrapbookView);
