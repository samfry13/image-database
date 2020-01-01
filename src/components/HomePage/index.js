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
import SidebarContent from "../Sidebar";
import Sidebar from "react-sidebar";

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      images: {},
      filteredImages: {},
      selectedImage: {
        title: "",
        description: "",
        filePath: "",
        tags: "",
      },
      filteredTags: "",
      keyword: "",
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
      this.setState({images: snapshot.val(), loading: false}, () => this.filterImages());
    });
  }

  filterImages() {
    const {filteredTags, keyword, images} = this.state;

    this.setState({loading: true});
    let filteredImages = Object.assign({}, images);

    if (keyword) {
      Object.keys(filteredImages).forEach(id => {
        if (filteredImages[id].title.toLowerCase().indexOf(keyword) === -1 && filteredImages[id].description.toLowerCase().indexOf(keyword) === -1) {
          delete filteredImages[id];
        }
      })
    }

    if (filteredTags) {
      const tags = filteredTags.split(",");

      Object.keys(filteredImages).forEach(id => {
        let toDelete = true;

        tags.forEach(tag => {
          if (filteredImages[id].tags.toLowerCase().indexOf(tag) !== -1) {
            toDelete = false;
          }
        });

        toDelete && delete filteredImages[id];
      });
    }

    this.setState({filteredImages, loading: false});
  }

  render() {
    const {authUser, sidebarOpen, sidebarDocked, onSetOpen} = this.props;
    const {filteredImages: images, selectedImage, selectedImageId, showUploadModal, showDetailModal, loading} = this.state;

    return (
        <Sidebar
            sidebar={<SidebarContent setFilteredKeyword={(keyword) => this.setState({keyword}, () => this.filterImages())}
                                     setFilteredTags={(tags) => this.setState({filteredTags: tags}, () => this.filterImages())}/>}
            open={sidebarOpen}
            docked={sidebarDocked}
            onSetOpen={onSetOpen}>
          <div style={{height: "75px", width: "100%"}}/>
          <div>
            {authUser &&
            <Button variant="primary"
                    style={{
                      position: 'fixed',
                      right: '5px',
                      bottom: '5px',
                      zIndex: 1
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
        </Sidebar>
    );
  }
}

export default compose(withAuthUser, withFirebase)(HomePage);