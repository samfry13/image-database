import React, {Component} from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Tags from "../Tags";
import {withFirebase} from "../Firebase";


class ImageDetailModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.image.title,
      description: props.image.description,
      filePath: props.image.filePath,
      tags: props.image.tags,
      readOnly: true,
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.image !== this.props.image) {
      const {image} = this.props;
      this.setState({
        title: image.title,
        description: image.description,
        filePath: image.filePath,
        tags: image.tags,
      })
    }
  }

  toggleEdit() {
    const {readOnly} = this.state;
    this.setState({readOnly: !readOnly});
  }

  onSubmitUpdate() {
    const {firebase, id} = this.props;
    const {title, description, tags, filePath} = this.state;

    // Update Image
    firebase.doUpdateImage(id, title, description, tags, filePath);

    // Update any new tags
    tags.split(",").forEach((tag) => {
      firebase.doAddTag(tag);
    });

    this.onClose();
  }

  onClose() {
    const {onClose} = this.props;
    this.toggleEdit();
    onClose();
  }

  render() {
    const {show} = this.props;
    const {title, description, filePath, tags, readOnly} = this.state;

    return <Modal show={show} onHide={this.onClose.bind(this)}>
      <Modal.Header closeButton><Modal.Title>Image Details</Modal.Title></Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Image src={filePath} fluid />
          </Form.Group>
          <Form.Group>
            <Form.Label column={false}>Title</Form.Label>
            <Form.Control type="text" value={title} readOnly={readOnly}
                          onChange={(event) => this.setState({title: event.target.value})}/>
          </Form.Group>
          <Form.Group>
            <Form.Label column={false}>Description</Form.Label>
            <Form.Control as="textarea" rows="3" value={description} readOnly={readOnly}
                          onChange={(event) => this.setState({description: event.target.value})}/>
          </Form.Group>
          <Form.Group>
            <Form.Label column={false}>Tags</Form.Label>
            <Tags tags={tags} readOnly={readOnly}
                  onChange={(newTags) => this.setState({tags: newTags})}/>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button type="button"
                variant="secondary"
                onClick={this.onClose.bind(this)}
        >Cancel</Button>
        <Button type="button"
                variant="primary"
                onClick={readOnly ? this.toggleEdit.bind(this)
                    : this.onSubmitUpdate.bind(this)}
        >{readOnly ? "Edit" : "Save"}</Button>
      </Modal.Footer>
    </Modal>
  }
}

export default withFirebase(ImageDetailModal);