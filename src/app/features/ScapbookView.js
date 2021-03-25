import { Box, ResponsiveContext } from 'grommet'
import React from 'react';



export default function ScapbookView() {
    return (
        <Box justify="center" align="center">
        <ResponsiveContext.Consumer>
          {(size) =>
            size === "small" ? (
              <div>
                <FlipPage width={400} height={525}>
                  <div>
                    <article style={{ padding: 8 }}>
                      
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
                </FlipPage>
              </div>
            ) : (
              <div style={styles.container}>
                <FlipPage width={800} height={525} orientation="horizontal">
                  <div style={styles.twoPage}>
                    <div style={styles.singlePage}>
                      <article>

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
            
            <PhotoUpload />
            <Button onClick={this.toggleModal} label="close" />
          </Modal>
        </Box>
      </Box>
    )
}


// this is where we will make the firebase call for all pages in a scrapbook

// grab the Id for the scrapbook and save it to state

// pass this Id down to pages and check for it when calling for page content

