import React from "react";
import FlipPage from "react-flip-page";

export default function DemoScrapbook() {
  return (
    <div style={styles.container}>
      <FlipPage width={800} height={525} orientation="horizontal">
        <div style={styles.twoPage}>
          <div style={styles.singlePage}>
            <article>
              <h1>My awesome first article</h1>
              <p>My awesome first content</p>
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
  );
}

const styles = {
  twoPage: { display: "flex", justifyContent: "space-around", padding: "auto" },
  container: { padding: 8, backgroundColor: "red" },
  singlePage: { width: 390, backgroundColor: "green", minHeight: 500 },
};
