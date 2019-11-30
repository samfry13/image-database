import React from 'react';
import {withAuthUser} from "../Session";

import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import {compose} from "recompose";
import {withFirebase} from "../Firebase";
import UploadImageModal from "../UploadImageModal";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import CardColumns from "react-bootstrap/CardColumns";

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      images: {},
      showModal: false,
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
    const {images, showModal, loading} = this.state;

    return (
        <div style={{marginTop: "75px"}}>
          {authUser &&
          <Button variant="primary"
                  style={{
                    position: 'fixed',
                    right: '5px',
                    bottom: '5px'
                  }}
                  onClick={() => this.setState({showModal: true})}
          >Upload Image</Button>}

          {loading ? <Container className="d-flex justify-content-center"><Spinner animation="border"
                                                                                   variant="primary"/></Container>
              : <Container><CardColumns className="mx-3" style={{"column-count": "4 !important"}}>
                  {Object.keys(images).map((id) => {
                      return <Card>
                        <Card.Img variant="top" src={images[id].filePath} loading="lazy"/>
                        <Card.Body>
                          <Card.Title>{images[id].title}</Card.Title>
                          <Card.Text>{images[id].description}</Card.Text>
                          <Card.Text>Tags: {images[id].tags}</Card.Text>
                        </Card.Body>
                      </Card>
                  })}
              </CardColumns></Container>}

          <UploadImageModal show={showModal} onClose={() => {
            this.setState({showModal: false});
            this.loadImages();
          }}/>
        </div>
    );
  }
}

export default compose(withAuthUser, withFirebase)(HomePage);