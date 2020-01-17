import React, {Component} from "react";
import {withFirebase} from "../Firebase";
import {withAuthUser} from "../Session";
import {compose} from "recompose";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Tags from "../Tags";


class ImageDetailModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.image.title,
      description: props.image.description,
      filePath: props.image.filePath,
      updatedAt: props.image.updatedAt,
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
        createdAt: image.createdAt,
        updatedAt: image.updatedAt,
        tags: image.tags,
      })
    }
  }

  onDelete() {
    const {firebase, id, onDelete} = this.props;

    if (window.confirm("Are you sure you want to delete this image permanently?")) {
      firebase.doDeleteImage(id);

      this.onClose();
      onDelete();
    }
  }

  onSubmitUpdate() {
    const {firebase, id} = this.props;
    const {title, description, tags, filePath, createdAt} = this.state;

    // Update Image
    firebase.doUpdateImage(id, title, description, tags, filePath, createdAt);

    // Update any new tags
    tags.split(",").forEach((tag) => {
      firebase.doAddTag(tag);
    });

    this.setState({readOnly: true});
  }

  onClose() {
    const {onClose} = this.props;
    this.setState({readOnly: true});
    onClose();
  }

  render() {
    const {show, authUser, id} = this.props;
    const {title, description, filePath, updatedAt, tags, readOnly} = this.state;

    return <Modal show={show} onHide={this.onClose.bind(this)}>
      <Modal.Header closeButton><Modal.Title>Image Details</Modal.Title></Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Image src={filePath} fluid/>
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
        <div className="mr-auto">
          <small>Last Updated: {new Date(updatedAt).toDateString()}</small>
          <br/>
          <small><sup>ID: {id}</sup></small>
        </div>
        <Button type="button"
                variant="secondary"
                onClick={this.onClose.bind(this)}
        >Close</Button>
        {authUser && <Button type="button"
                             variant="danger" onClick={() => this.onDelete()}
        >Delete</Button>}
        {authUser && <Button type="button"
                             variant="primary"
                             onClick={readOnly ? () => this.setState({readOnly: false})
                                 : this.onSubmitUpdate.bind(this)}
        >{readOnly ? "Edit" : "Save"}</Button>}
      </Modal.Footer>
    </Modal>
  }
}

export default compose(withAuthUser, withFirebase)(ImageDetailModal);