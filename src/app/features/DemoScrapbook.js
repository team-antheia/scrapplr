import React, { Component } from "react";
import FlipPage from "react-flip-page";
import Page1 from "./demo/DemoPage1";
import { Button, Modal } from "rsuite";

export default class DemoScrapbook extends Component {
  constructor() {
    super();

    this.state = {
      show: false,
    };
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }
  open() {
    this.setState({ show: true });
  }
  close() {
    this.setState({ show: false });
  }

  render() {
    return (
      <div style={styles.container}>
        <FlipPage width={800} height={525} orientation="horizontal">
          <div style={styles.twoPage}>
            <div style={styles.singlePage}>
              <article>
                <Page1 isStatic={true} />
                <Button onClick={this.open}>edit page</Button>
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
        <Modal overflow={true} backdrop={true} show={this.state.show}>
          <Page1 />
          <Button onClick={this.close}>Close</Button>
        </Modal>
      </div>
    );
  }
}

const styles = {
  twoPage: { display: "flex", justifyContent: "space-around", padding: "auto" },
  container: {
    padding: 8,
    backgroundColor: "red",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  singlePage: { width: 390, backgroundColor: "green", minHeight: 500 },
};
