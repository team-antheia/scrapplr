import React from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import _ from "lodash";
import { Box, Button } from "grommet";
const ResponsiveReactGridLayout = WidthProvider(Responsive);

/**
 * This layout demonstrates how to use a grid with a dynamic number of elements.
 */
export default class AddRemoveLayout extends React.PureComponent {
  static defaultProps = {
    className: "layout",
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    rowHeight: 100,
  };

  constructor(props) {
    super(props);

    this.state = {
      items: [].map(function (i, key, list) {
        return {
          i: i.toString(),
          x: i * 2,
          y: 0,
          w: 1,
          h: 1,
          add: i === list.length - 1,
        };
      }),
      counter: 0,
      layout: [],
    };

    this.onAddItem = this.onAddItem.bind(this);
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
    this.onLayoutChange = this.onLayoutChange.bind(this);
  }

  createElement(el) {
    const removeStyle = {
      position: "absolute",
      right: "2px",
      top: 0,
      cursor: "pointer",
    };
    const i = el.add ? "+" : el.i;
    return (
      <div key={i} data-grid={el}>
        {el.add ? (
          <span
            className="add text"
            onClick={this.onAddItem}
            title="You can add an item by clicking here, too."
          >
            Add +
          </span>
        ) : (
          <span className="text">{i}</span>
        )}
        {this.props.editMode ? (
          <span
            className="remove"
            style={removeStyle}
            onClick={this.onRemoveItem.bind(this, i)}
          >
            x
          </span>
        ) : (
          ""
        )}
      </div>
    );
  }

  onAddItem() {
    /*eslint no-console: 0*/
    console.log("adding", "n" + this.state.counter);
    this.setState({
      // Add a new item. It must have a unique key!
      items: this.state.items.concat({
        i: String(this.state.counter),
        x: (this.state.items.length * 2) % (this.state.cols || 12),
        y: Infinity, // puts it at the bottom
        w: 2,
        h: 1,
      }),
      // Increment the counter to ensure key is always unique.
      counter: this.state.counter + 1,
    });
  }

  // We're using the cols coming back from this to calculate where to add new items.
  onBreakpointChange(breakpoint, cols) {
    this.setState({
      breakpoint: breakpoint,
      cols: cols,
    });
  }

  onLayoutChange(layout) {
    // this.props.onLayoutChange(layout);
    // this.setState({ layout: layout });
  }

  onRemoveItem(i) {
    console.log("removing", i);
    this.setState({ items: _.reject(this.state.items, { i: i }) });
  }

  render() {
    return (
      <Box justify="end" width="100%" height="100%">
        <ResponsiveReactGridLayout
          isDraggable={!this.props.isStatic}
          isResizable={!this.props.isStatic}
          onLayoutChange={this.onLayoutChange}
          onBreakpointChange={this.onBreakpointChange}
          autoSize={false}
          isBounded={true}
          {...this.props}
        >
          {_.map(this.state.items, (el) => this.createElement(el))}
        </ResponsiveReactGridLayout>
        <Box style={{ position: "absolute", bottom: 40 }}>
          {this.props.editMode ? (
            <Button size="xsmall" label="add item" onClick={this.onAddItem} />
          ) : (
            ""
          )}
        </Box>
      </Box>
    );
  }
}
