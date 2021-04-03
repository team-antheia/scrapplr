import React, { Component, useEffect, useState, useContext } from "react";
import FlipPage from "react-flip-page";

import {
  Box,
  Button,
  ResponsiveContext,
  Grid,
  Card,
  Spinner,
  Text,
} from "grommet";
import "rsuite/dist/styles/rsuite-default.css";
import { firestore } from "../../../index";
import { Toolbar } from "..";

import Default from "./layouts/Default";

import CaptionTop from "./layouts/CaptionTop";
import CaptionBottom from "./layouts/CaptionBottom";
import { CardGrid } from "./CardGrid";
import { withRouter } from "react-router-dom";
import StreetView from "../map/360/StreetView";
import MapContainer from "../map/markerMap/MapContainer";

function ScrapbookView(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [cards, setCards] = useState([]);
  const [pages, setPages] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function fetchPages() {
      if (props.params.scrapbookId) {
        const pagesRef = firestore.collection("Pages");
        const queryRef = await pagesRef
          .where("scrapbookId", "==", props.params.scrapbookId)
          .orderBy("pageNum", "desc")
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

  const addPage = async (scrapbookId) => {
    const pagesRef = firestore.collection("Pages");

    const newPage = await pagesRef.add({
      cards: [],
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

  // const { pages, pageNum } = this.state;
  // const mapLocations = [this.state.mapLocations];
  const bookStyle = {
    position: "relative",
    alignItems: "flex-end",
    display: "flex",
    height: "100%",
    width: "100%",
  };
  console.log("the pages", pages);
  const mapLocations = props.location.state.mapLocations;
  return pages.length ? (
    pages.length >= 1 && (
      <div>
        {pages.length >= 1 && (
          <div>
            <FlipPage
              // disableSwipe={true}
              height={600}
              width={900}
              // responsive={true}
              orientation="horizontal"
            >
              {/* <MapContainer mapLocations={mapLocations}/> */}

              {pages.map((page) => {
                return (
                  <Box border height="xlarge" width="xlarge">
                    <CardGrid cards={page.cards} />
                  </Box>
                );
              })}
            </FlipPage>

            <Box direction="row">
              <Toolbar
                setIsEditing={setIsEditing}
                isEditing={isEditing}
                addPage={addPage}
                scrapbookId={props.params.scrapbookId}
              />
            </Box>
          </div>
        )}
      </div>
    )
  ) : (
    <Spinner />
  );
}

export default withRouter(ScrapbookView);

const styles = {
  twoPage: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "space-around",
    padding: "auto",
    background: "rgba(255,255,255, 0.1)",
  },
  container: {
    padding: 8,
    background:
      "linear-gradient(to top right, rgba(255,255,255,0.7), rgba(255,255,255,0.3))",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "75vh",
    minWidth: "95vw",
    borderRadius: "11px",
  },
  singlePage: { width: 390, height: "100%", minHeight: 500 },
};
