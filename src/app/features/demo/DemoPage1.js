import React from 'react';
import GridLayout from 'react-grid-layout';
import { Card, CardBody, CardFooter, CardHeader, Text } from 'grommet';

export default function DemoPage1({ isStatic }) {
  const layout = [
    { i: '2', x: 1, y: 2, w: 7, h: 2, maxH: 5 },
    {
      i: '1',
      x: 1,
      y: 0,
      w: 4,
      h: 4,
      minW: 3,
      minH: 3,
      maxW: 6,
      maxH: 6,
    },
    { i: '3', x: 4, y: 0, w: 5, h: 4, maxH: 5 },
  ];
  const handles = ['sw'];
  function pointer(e) {
    e.target.style.cursor = 'pointer';
  }
  return (
    <div style={{ height: 450 }}>
      <h1>Page 1 heading</h1>
      <GridLayout
        responsive={true}
        className='layout'
        layout={layout}
        rowHeight={25}
        width={390}
        col={3}
        isDraggable={isStatic ? false : true}
        isDroppable={isStatic ? false : true}
        // isResizable={isStatic ? false : true}
        resizeHandle={
          isStatic ? (
            false
          ) : (
            <CardFooter onMouseOver={pointer} pad='8px' overflow='auto'>
              <Text color='primary' size='xxsmall'>
                resize
              </Text>
            </CardFooter>
          )
        }
        resizeHandles={handles}
        autoSize={false}
        verticalCompact={true}
        isBounded={true}
      >
        <Card overflow='auto' height='small' background='primary-dark' key='1'>
          <CardHeader pad='small' overflow='auto'>
            1
          </CardHeader>
          <CardBody pad='small' overflow='auto'>
            {isStatic ? (
              <p>We cannot be dragged. Press edit page </p>
            ) : (
              <p>We can be dragged and resized</p>
            )}
          </CardBody>
        </Card>
        <Card style={{ backgroundColor: '#92ABB3', color: 'white' }} key='2'>
          2
        </Card>
        <Card style={{ backgroundColor: '#92ABB3', color: 'white' }} key='3'>
          <img
            src='https://edit.co.uk/uploads/2016/12/Image-1-Alternatives-to-stock-photography-Thinkstock.jpg'
            alt='Girl in a jacket'
          />
        </Card>
      </GridLayout>
    </div>
  );
}
