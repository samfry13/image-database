import React from 'react';
import {withAuthUser} from "../Session";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import {compose} from "recompose";
import {withFirebase} from "../Firebase";
import UploadImageModal from "../ImageUploadModal";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import CardColumns from "react-bootstrap/CardColumns";
import Tags from "../Tags";
import ImageDetailModal from "../ImageDetailModal";

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      images: {},
      selectedImage: {
        title: "",
        description: "",
        filePath: "",
        tags: "",
      },
      tags: [],
      showUploadModal: false,
      showDetailModal: false,
      loading: false,
    }
  }

  componentDidMount() {
    this.loadImages();
  }

  loadImages() {
    const {firebase} = this.props;
    this.setState({loading: true});
    firebase.images().on('value', snapshot => {
      this.setState({images: snapshot.val(), loading: false});
    })
  }

  render() {
    const {authUser} = this.props;
    const {images, selectedImage, selectedImageId, showUploadModal, showDetailModal, loading} = this.state;

    return (
        <div>
          {authUser &&
          <Button variant="primary"
                  style={{
                    position: 'fixed',
                    right: '5px',
                    bottom: '5px'
                  }}
                  onClick={() => this.setState({showUploadModal: true})}
          >Upload Image</Button>}

          {loading ? <Container className="d-flex justify-content-center"><Spinner animation="border"
                                                                                   variant="primary"/></Container>
              : <Container><CardColumns className="mx-3" style={{columnCount: "4 !important"}}>
                  {Object.keys(images).map((id, index) => {
                      return <Card key={index} onClick={() => this.setState({
                        selectedImage: images[id],
                        selectedImageId: id,
                      }, () => this.setState({showDetailModal: true}))}>
                        <Card.Img variant="top" src={images[id].filePath} loading="lazy"/>
                        <Card.Body>
                          <Card.Title>{images[id].title}</Card.Title>
                          <Card.Text>{images[id].description}</Card.Text>
                          <Tags readOnly tags={images[id].tags}/>
                        </Card.Body>
                      </Card>
                  })}
              </CardColumns></Container>}

          <UploadImageModal show={showUploadModal} onClose={() => {
            this.setState({showUploadModal: false});
            this.loadImages();
          }}/>

          <ImageDetailModal image={selectedImage} id={selectedImageId} show={showDetailModal} onClose={() => {
            this.setState({showDetailModal: false});
          }}/>
        </div>
    );
  }
}

export default compose(withAuthUser, withFirebase)(HomePage);