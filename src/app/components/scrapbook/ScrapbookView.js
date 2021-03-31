import React, { Component } from "react";
import FlipPage from "react-flip-page";
import Page2 from "../demo/DemoPage2";
import { Box, Button, ResponsiveContext } from "grommet";
import "rsuite/dist/styles/rsuite-default.css";
import { firestore } from "../../../index";
import SinglePage from "./SinglePage";
import CardTemp from "./CardTemp";
import MapContainer from "../map/markerMap/MapContainer";
import { Modal } from "rsuite";
import Default from "./layouts/Default";
import CaptionMiddle from "./layouts/CaptionMiddle";
import CaptionTop from "./layouts/CaptionTop";
import CaptionBottom from "./layouts/CaptionBottom";


export default class ScrapbookView extends Component {
  constructor() {
    super();
    this.state = {
      edit: false,
      pages: [],
      pageNum: 1,
    };
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  async componentDidMount() {
    console.log('props with maplocations', this.props.location)
    if (this.props.params.scrapbookId) {
      const pagesRef = firestore.collection("Pages");
      const queryRef = await pagesRef
        .where("scrapbookId", "==", this.props.params.scrapbookId)
        .get();

      if (queryRef.empty) {
        console.log("No matching docs");
        return;
      }

      const pageData = [];
      queryRef.forEach((doc) => {
        pageData.push(doc.data());
      });

      this.setState(() => {
        return {
          pages: [...pageData],
        };
      });

      return;
    }
  }

  toggleEdit() {
    this.setState((prevState) => {
      return {
        edit: !prevState.edit,
      };
    });
  }

  render() {
    const { pages, pageNum } = this.state;
    const mapLocations = [...this.props.location.state.mapLocations]
    const bookStyle = {
      position: "relative",
      alignItems: "flex-end",
      display: "flex",
      height: "100%",
      width: "100%",
    };
    return (
      <Box
        width={{ min: "85vw" }}
        height={{ min: "75vh" }}
        justify="center"
        align="center"
        background={{
          color: "neutral-1",
          opacity: true,
          position: "bottom",
          repeat: "no-repeat",
          size: "cover",
        }}
        border={{
          color: "border",
          size: "large",
          style: "groove",
          side: "all",
        }}
      >
        <ResponsiveContext.Consumer>
          {/* mobile view */}
          {(size) =>
            size === "small" ? (
              <div>
                <FlipPage
                  style={bookStyle}
                  flipOnTouch={true}
                  width={400}
                  height={525}
                >
                  <div>
                    <article style={{ padding: 8 }}>
                      <Page2 isStatic={true} />
                      <Button
                        size="small"
                        onClick={this.toggleModal}
                        label="edit page"
                      />
                    </article>
                  </div>
                  <div>
                    <article>hello2</article>
                  </div>
                  <div>
                    <article>hello3</article>
                  </div>
                  <div>
                    <article>hello4</article>
                  </div>
                </FlipPage>
              </div>
            ) : (
              // Webpage
              <div>
                <FlipPage
                  disableSwipe={this.state.edit}
                  flipOnTouch={this.state.edit}
                  flipOnTouchZone={0}
                  width={400}
                  height={525}
                  style={{
                    minWidth: "75vw",
                    minHeight: "100%",
                  }}
                  orientation="horizontal"
                  showSwipeHint={true}
                >
                  {pages.length ? (
                    <SinglePage {...this.state.pages} key={pages} />
                  ) : (
                    ""
                  )}
                  <Box pad="xxsmall">
                    <Default />
                  </Box>
                  <Box>
                    <CaptionMiddle />
                  </Box>
                  <Box>
                    <CaptionTop />
                  </Box>
                  <Box>
                    <CaptionBottom />
                  </Box>
                </FlipPage>
              </div>
            )
          }
        </ResponsiveContext.Consumer>
      </Box>
    );
  }
}

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
