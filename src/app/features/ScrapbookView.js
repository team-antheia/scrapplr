import React, { Component } from "react";
import FlipPage from "react-flip-page";
import Page2 from "./demo/DemoPage2";
import { Box, Button, ResponsiveContext } from "grommet";
import "rsuite/dist/styles/rsuite-default.css";
import { firestore } from "../../index";
import { SinglePage, Map } from "../components";
import MapContainer from "../components/MapContainer";
import { Modal } from "rsuite";

export default class ScrapbookView extends Component {
  constructor() {
    super();
    this.state = {
      edit: false,
      pages: [],
    };
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  async componentDidMount() {
    if (this.props.params.scrapbookId) {
      const pagesRef = firestore.collection("Pages");
      const queryRef = await pagesRef.where(
        "scrapbookId",
        "==",
        this.props.params.scrapbookId
      ).get()

      if (queryRef.empty) {
        console.log("No matching docs");
        return;
      }
      // else{
        queryRef.forEach((doc) => {
        this.setState((prevState) =>{
          return {
            pages:[...prevState.pages,doc.data()]
          }
        })
      });
      return;
    }

    //  }
  }

  toggleEdit() {
    this.setState((prevState) => {
      return {
        edit: !prevState.edit,
      };
    });
  }

  render() {
    console.log("pages view state", this.state.pages);

    const { pages } = this.state;
    const bookStyle = {
      position: "relative",
      alignItems: "flex-end",
      display: "flex",
      height: "100%",
      width: "100%",
    };

    return (
      <Box
        // width={{ min: "85vw" }}
        // height={{ min: "75vh" }}
        width="xlarge"
        height="xlarge"
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
                <FlipPage style={bookStyle} flipOnTouch={true}>
                  {/* <FlipPage width={400} height={525}> */}
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
                  style={bookStyle}
                  width={900}
                  height={700}
                  orientation="horizontal"
                  showSwipeHint={true}
                >
                  {pages.length
                    ?
                         <SinglePage {...this.state.pages} key={pages} />
                    : ""}
                  <div
                  // style={styles.twoPage}
                  >
                    <div
                    // style={styles.singlePage}
                    >
                      <article>
                        <Page2 editMode={this.state.edit} isStatic={true} />
                        <Button
                          primary
                          size="small"
                          onClick={this.toggleEdit}
                          label={this.state.edit ? "done" : "edit page"}
                          style={{ position: "absolute", bottom: 3 }}
                        />
                      </article>
                    </div>
                    <div
                    // style={styles.singlePage}
                    >
                      <article>
                        <h1>My wonderful second article</h1>
                        <p>My wonderful second content</p>
                      </article>
                    </div>
                  </div>

                  {/* <div style={styles.twoPage}>
                    <div style={styles.singlePage}>
                      <article>
                        <h1>My awesome third article</h1>
                        <p>My awesome third content</p>
                      </article>
                    </div>
                    <div style={styles.singlePage}>
                      <article>
                        <h1>My wonderful fourth article</h1>
                        <p>My wonderful fourth content</p>
                      </article>
                    </div>
                  </div> */}
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
