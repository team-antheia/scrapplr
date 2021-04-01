import React from "react";
import PhotoUpload from "./PhotoUpload";
import LocationSearchInput from "../map/360/LocationSearchInput";
import {
  grommet,
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Text,
  FormField,
} from "grommet";

class EditPage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const isUpload = this.props.type === "Upload Photo";
    const is360 = this.props.type === "360";
    const isDescription = this.props.type === "Description";

    return (
      <CardBody
        background="light-1"
        flex="true"
        pad="medium"
        elevation="medium"
        alignContent="around"
      >
        {isUpload && <PhotoUpload />}
        {is360 && <LocationSearchInput />}
        {isDescription && (
          <di>
            <FormField for="description">Description</FormField>
            <textarea
              id="description"
              name="description"
              rows="4"
              cols="50"
            ></textarea>
          </di>
        )}
      </CardBody>
    );
  }
}

export default EditPage;
