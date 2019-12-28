import React, {Component} from "react";
import {withFirebase} from "../Firebase";
import Modal from "react-bootstrap/Modal";
import ProgressBar from "react-bootstrap/ProgressBar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ImageUploader from "../ImageUploader";
import Alert from "react-bootstrap/Alert";
import Tags from "../Tags";

class ImageUploadModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      imageFile: null,
      tags: "",
      uploading: false,
      uploadProgress: 0,
    }
  }

  onSubmit = event => {
    event.preventDefault();
    const {firebase} = this.props;
    const {title, description, tags, imageFile} = this.state;
    this.setState({uploading: true});

    // Upload Image
    firebase.doUploadImage(title, description, tags, imageFile,
        value => this.setState({uploadProgress: value}),
        this.onClose.bind(this),
        error => this.setState({error}));

    // Update Tags
    tags.split(",").forEach((tag) => {
      firebase.doAddTag(tag);
    });
  };

  onClose = () => {
    const {onClose} = this.props;
    this.setState({
      title: "",
      description: "",
      imageFile: null,
      tags: "",
      uploading: false,
      uploadProgress: 0,
    }, onClose);
  };

  render() {
    const {show} = this.props;
    const {title, description, tags, uploading, uploadProgress, error} = this.state;
    return <Modal show={show} onHide={this.onClose.bind(this)}>
      <Modal.Header closeButton><Modal.Title>Image Upload</Modal.Title></Modal.Header>
      <Modal.Body>
        {uploading ? <ProgressBar variant={uploadProgress === 100 ? "success" : "info"} now={uploadProgress} srOnly/>
        : <Form>
              <Form.Group>
                <ImageUploader onChange={file => this.setState({imageFile: file})}/>
              </Form.Group>
              <Form.Group>
                <Form.Label column={false}>Title</Form.Label>
                <Form.Control type="text" value={title} onChange={(event) => this.setState({title: event.target.value})}/>
              </Form.Group>
              <Form.Group>
                <Form.Label column={false}>Description</Form.Label>
                <Form.Control as="textarea" rows="3" value={description} onChange={(event) => this.setState({description: event.target.value})}/>
              </Form.Group>
              <Form.Group>
                <Form.Label column={false}>Tags</Form.Label>
                <Tags tags={tags}
                      onChange={(newTags) => this.setState({tags: newTags})}
                />
              </Form.Group>
              {error && <Alert variant="danger" dismissible onClose={() => this.setState({error: null})}>
                <Alert.Heading>Oh No! There was an Error!</Alert.Heading><hr/>
                <p>{error}</p>
              </Alert>}
            </Form>}
      </Modal.Body>
      <Modal.Footer>
        {!uploading && <Button type="button" variant="primary" onClick={this.onSubmit}>Upload</Button>}
      </Modal.Footer>
    </Modal>
  }
}

export default withFirebase(ImageUploadModal);