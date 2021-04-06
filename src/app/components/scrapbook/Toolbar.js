import React, { useState } from 'react';
import {
  PhotoUpload,
  LocationSearchInput,
  DescriptionForm,
} from '../../components';
import { Box, Button } from 'grommet';

//Each component (or toolbar?) must make post request to db with new card info

const Toolbar = (props) => {
  const [tool, setTool] = useState('');
  const { isEditing, setIsEditing, currentPage } = props;

  const addPage = async (scrapbookId) => {
    await props.addPage(props.scrapbookId);
  };
  return (
    <Box style={{ zIndex: 1 }} height="xxsmall" direction="row" pad="xsmall">
      <Button
        onClick={() => setIsEditing(!isEditing)}
        label={isEditing ? 'done' : 'edit page'}
      />

      {props.addPage && (
        <Button
          style={{
            marginInline: '8px',
            visibility: isEditing ? 'hidden' : 'visible',
          }}
          label="add new page"
          onClick={() => addPage(props.scrapbookId)}
        />
      )}

      {isEditing ? (
        <Box direction="row">
          <Box direction="column">
            <Button
              label="photo"
              onClick={() =>
                tool !== 'photo' ? setTool('photo') : setTool('')
              }
            />
            <Box
              style={{
                width: '100vw',
                visibility: tool === 'photo' ? 'visible' : 'hidden',
              }}
            >
              <PhotoUpload
                scrapbookId={props.scrapbookId} /*layout={props.layout}*/
                currentPage={currentPage}
                setCards={props.setCards}
              />
            </Box>
          </Box>

          <Box direction="column">
            <Button
              onClick={() => (tool !== 'map' ? setTool('map') : setTool(''))}
              label="map"
            />
            <Box
              style={{
                width: '100vw',
                visibility: tool === 'map' ? 'visible' : 'hidden',
              }}
            >
              <LocationSearchInput
                setCards={props.setCards}
                scrapbookId={props.scrapbookId} /*layout={props.layout}*/
              />
            </Box>
          </Box>
          <Box direction="column">
            <Button
              onClick={() =>
                tool !== 'description' ? setTool('description') : setTool('')
              }
              label="description"
            />
            <Box
              style={{
                width: '100vw',
                alignItems: 'center',
                visibility: tool === 'description' ? 'visible' : 'hidden',
              }}
            >
              <DescriptionForm
                setCards={props.setCards}
                scrapbookId={props.scrapbookId} /*layout={props.layout}*/
                currentPage={props.currentPage}
              />
            </Box>
          </Box>
        </Box>
      ) : (
        ''
      )}
    </Box>
  );
};

export default Toolbar;
