import React, { Component } from 'react';
import FlipPage from 'react-flip-page';
import Page1 from './DemoPage1';
import Page2 from './DemoPage2';
import { Modal } from 'rsuite';
import { Box, Button, ResponsiveContext } from 'grommet';
import PhotoUpload from '../scrapbook/PhotoUpload';
import 'rsuite/dist/styles/rsuite-default.css';
import { Map } from '..';
import EditPage from '../scrapbook/EditPage';

export default class DemoScrapbook extends Component {
  constructor() {
    super();

    this.state = {
      edit: false,
      buttons: true,
      type: '',
    };
    this.selectType = this.selectType.bind(this);
    this.goBack = this.goBack.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
  }
  toggleEdit() {
    this.setState((prevState) => {
      return {
        edit: !prevState.edit,
      };
    });
  }

  selectType(event) {
    if (event.target.value === 'Upload Photo') {
      this.setState({
        type: 'Upload Photo',
      });
    } else if (event.target.value === '360') {
      this.setState({
        type: '360',
      });
    } else {
      this.setState({
        type: 'Description',
      });
    }
  }

  goBack() {
    this.setState({
      type: '',
    });
  }

  render() {
    return (
      <div>
        <Box justify='center' align='center'>
          <ResponsiveContext.Consumer>
            {(size) =>
              size === 'small' ? (
                <div>
                  <FlipPage width={400} height={525}>
                    <div>
                      <article style={{ padding: 8 }}>
                        <Page1 isStatic={true} />
                        <Button
                          primary
                          size='small'
                          onClick={this.toggleEdit}
                          label={this.state.edit ? 'done' : 'edit page'}
                          style={{ position: 'absolute', bottom: 3 }}
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
                  {/* <FlipPage width={800} height={525} */}
                  <FlipPage width={1500} height={900} orientation='horizontal'>
                    <div style={styles.twoPage}>
                      <div style={styles.singlePage}>
                        <article>
                          <Page1 isStatic={true} />
                          <Button
                            size='small'
                            onClick={this.toggleModal}
                            label='edit page'
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
          <Box justify='center' align='center'>
            <Modal
              style={{ maxWidth: '100vw' }}
              overflow={true}
              backdrop={true}
              show={this.state.show}
            >
              <Page1 />
              <EditPage type={this.state.type} />
              {/* <PhotoUpload /> */}
              <div>
                {!this.state.type ? (
                  <div>
                    {' '}
                    <Button
                      onClick={this.selectType}
                      label='Upload Photo'
                      value='Upload Photo'
                    />
                    <Button onClick={this.selectType} label='360' value='360' />
                    <Button
                      onClick={this.selectType}
                      label='Description'
                      value='Description'
                    />
                  </div>
                ) : (
                  <div>
                    <Button
                      onClick={this.goBack}
                      label='Go Back'
                      value='Go Back'
                    />
                  </div>
                )}
              </div>
              <br />
              <Button onClick={this.toggleModal} label='close' />
            </Modal>
          </Box>
        </Box>
      </div>
    );
  }
}

const styles = {
  twoPage: { display: 'flex', justifyContent: 'space-around', padding: 'auto' },
  container: {
    padding: 8,
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  singlePage: { width: 700, backgroundColor: '#FFF5EB', minHeight: 900 },
};
