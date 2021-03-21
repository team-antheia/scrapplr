import React from "react";
import GridLayout from "react-grid-layout";

export default function DemoPage1({ isStatic }) {
  const layout = [
    { i: "2", x: 1, y: 2, w: 7, h: 2, maxH: 5 },
    {
      i: "1",
      x: 1,
      y: 0,
      w: 5,
      h: 5,
      minW: 2,
      maxW: 4,
      maxH: 5,
    },
    { i: "3", x: 4, y: 0, w: 5, h: 4, maxH: 5 },
  ];
  const handles = ["E"];
  function pointer(e) {
    e.target.style.cursor = "pointer";
  }
  return (
    <div style={{ height: 450 }}>
      <h1>Page 1 heading</h1>
      <GridLayout
        responsive={true}
        className="layout"
        layout={layout}
        rowHeight={25}
        width={390}
        col={3}
        isDraggable={isStatic ? false : true}
        isDroppable={isStatic ? false : true}
        // isResizable={isStatic ? false : true}
        resizeHandle={isStatic ? false : <p onMouseOver={pointer}>^</p>}
        resizeHandles={handles}
        autoSize={false}
        verticalCompact={true}
        isBounded={true}
      >
        <div style={{ backgroundColor: "black", color: "white" }} key="1">
          1{" "}
          {isStatic ? (
            <p>We cannot be dragged. Press edit page </p>
          ) : (
            <p>We can be dragged and resized</p>
          )}
        </div>
        <div style={{ backgroundColor: "black", color: "white" }} key="2">
          2
        </div>
        <div style={{ backgroundColor: "black", color: "white" }} key="3">
          3
        </div>
      </GridLayout>
    </div>
  );
}
