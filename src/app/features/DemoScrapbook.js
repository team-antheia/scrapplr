import React, { Component } from "react";
import FlipPage from "react-flip-page";
import Page1 from "./demo/DemoPage1";
// import Page2 from "./demo/Demo2";
import { Modal } from "rsuite";
import { Box, Button, ResponsiveContext } from "grommet";
import PhotoUpload from "./PhotoUpload";
import "rsuite/dist/styles/rsuite-default.css";
import { Map } from "../components";

export default class DemoScrapbook extends Component {
  constructor() {
    super();

    this.state = {
      show: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
  }
  toggleModal() {
    this.setState((prevState) => {
      return {
        show: !prevState.show,
      };
    });
  }

  render() {
    return (
      <Box justify="center" align="center">
        <ResponsiveContext.Consumer>
          {(size) =>
            size === "small" ? (
              <div>
                <FlipPage width={400} height={525}>
                  <div>
                    <article style={{ padding: 8 }}>
                      <Page1 isStatic={true} />
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
              <div style={styles.container}>
                <FlipPage width={800} height={525} orientation="horizontal">
                  <div style={styles.twoPage}>
                    <div style={styles.singlePage}>
                      <article>
                        <Page1 isStatic={true} />
                        <Button
                          size="small"
                          onClick={this.toggleModal}
                          label="edit page"
                        />
                      </article>
                    </div>
                    <div style={styles.singlePage}>
                      <article>
                        <h1>My wonderful second article</h1>
                        <p>My wonderful second content</p>
                      </article>
                    </div>
                  </div>

                  <div style={styles.twoPage}>
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
                  </div>
                </FlipPage>
              </div>
            )
          }
        </ResponsiveContext.Consumer>
        <Box
          width={{ min: null, max: "100vw" }}
          justify="center"
          align="center"
        >
          <Modal
            style={{ maxWidth: "100vw" }}
            overflow={true}
            backdrop={true}
            show={this.state.show}
          >
            <Page1 />
            <PhotoUpload />
            <Button onClick={this.toggleModal} label="close" />
          </Modal>
        </Box>
      </Box>
    );
  }
}

const styles = {
  twoPage: { display: "flex", justifyContent: "space-around", padding: "auto" },
  container: {
    padding: 8,
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  singlePage: { width: 390, backgroundColor: "#FFF5EB", minHeight: 500 },
};
