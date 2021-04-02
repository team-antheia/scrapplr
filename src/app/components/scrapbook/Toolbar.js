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
  const { isEditing, setIsEditing } = props;

  const addPage = async (scrapbookId) => {
    await props.addPage(props.scrapbookId);
  };
  return (
    <Box direction="row" pad="small">
      <Button
        onClick={() => setIsEditing(!isEditing)}
        label={isEditing ? 'done' : 'edit page'}
      />
      <Button
        style={{ visibility: isEditing ? 'hidden' : 'visible' }}
        label="add new page"
        onClick={() => addPage(props.scrapbookId)}
      />
      {isEditing ? (
        <Box direction="row">
          <Button
            label="photo"
            onClick={() => (tool !== 'photo' ? setTool('photo') : setTool(''))}
          />
          <Box style={{ visibility: tool === 'photo' ? 'visible' : 'hidden' }}>
            <PhotoUpload
              scrapbookId={props.scrapbookId} /*layout={props.layout}*/
            />
          </Box>

          <Button
            onClick={() => (tool !== 'map' ? setTool('map') : setTool(''))}
            label="map"
          />
          <Box style={{ visibility: tool === 'map' ? 'visible' : 'hidden' }}>
            <LocationSearchInput
              scrapbookId={props.scrapbookId} /*layout={props.layout}*/
            />
          </Box>

          <Button
            onClick={() =>
              tool !== 'description' ? setTool('description') : setTool('')
            }
            label="description"
          />
          <Box
            style={{
              visibility: tool === 'description' ? 'visible' : 'hidden',
            }}
          >
            <DescriptionForm
              scrapbookId={props.scrapbookId} /*layout={props.layout}*/
            />
          </Box>
        </Box>
      ) : (
        ''
      )}
    </Box>
  );
};

export default Toolbar;
