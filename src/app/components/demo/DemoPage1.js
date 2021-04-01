import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";

import { Card } from "grommet";
import ReactGridLayout from "react-grid-layout";

import React, { Component } from "react";

export default class DemoPage1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      layout: [
        { i: "2", x: 1, y: 2, w: 7, h: 2 },
        {
          i: "1",
          x: 1,
          y: 0,
          w: 4,
          h: 4,
        },
        { i: "3", x: 4, y: 0, w: 5, h: 4 },
      ],
    };
  }

  pointer(e) {
    e.target.style.cursor = "pointer";
  }

  onLayoutChange = (layout) => {
    this.setState({ layout });
  };

  render() {
    const { isStatic } = this.props;
    return (
      <div style={{ height: 450 }}>
        <h1>Page 1 heading</h1>
        <ReactGridLayout
          responsive={true}
          className="layout"
          layout={this.state.layout}
          rowHeight={25}
          width={390}
          col={3}
          isDraggable={isStatic ? false : true}
          isDroppable={isStatic ? false : true}
          isResizable={false}
          autoSize={false}
          verticalCompact={true}
          isBounded={true}
          onLayoutChange={this.onLayoutChange}
        >
          <Card key="1" style={{ backgroundColor: "#92ABB3", color: "white" }}>
            {isStatic ? (
              <p>We cannot be dragged. Press edit page</p>
            ) : (
              ` We can be dragged and resized`
            )}
          </Card>
          <Card style={{ backgroundColor: "#92ABB3", color: "white" }} key="2">
            2
          </Card>
          <Card style={{ backgroundColor: "#92ABB3", color: "white" }} key="3">
            3
          </Card>
        </ReactGridLayout>
      </div>
    );
  }
}
