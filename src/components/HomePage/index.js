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
      images: [],
      filteredImages: [],
      selectedImage: {
        title: "",
        description: "",
        filePath: "",
        createdAt: "",
        updatedAt: "",
        tags: "",
      },
      filteredTags: "",
      keyword: "",
      sortingOrder: "chronological_asc",
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
      this.setState({images: this.formatImagesFromFirebase(snapshot.val()), loading: false},
          () => this.filterImages());
    });

  }

  formatImagesFromFirebase(images) {
    return Object.keys(images).map(id => {
      let image = images[id];
      image.id = id;
      return image;
    });
  }

  filterImages() {
    const {filteredTags, keyword, sortingOrder, images} = this.state;

    this.setState({loading: true});
    let filteredImages = images.slice();

    if (keyword) {
      filteredImages = filteredImages.filter(image => image.title.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
          || image.description.toLowerCase().indexOf(keyword.toLowerCase()) !== -1);
    }

    if (filteredTags) {
      const tags = filteredTags.split(",");
      filteredImages = filteredImages.filter(image => {
        let toDelete = false;
        tags.forEach(tag => {
          if (image.tags.toLowerCase().indexOf(tag.toLowerCase()) === -1) {
            toDelete = true;
          }
        });
        return !toDelete;
      });
    }

    switch(sortingOrder) {
      case "alphabetical_asc":
        filteredImages.sort((image1, image2) => image1.title.toLowerCase() > image2.title.toLowerCase());
        break;
      case "alphabetical_des":
        filteredImages.sort((image1, image2) => image1.title.toLowerCase() < image2.title.toLowerCase());
        break;
      case "chronological_asc":
        filteredImages.sort((image1, image2) => new Date(image1.createdAt) < new Date(image2.createdAt));
        break;
      case "chronological_des":
        filteredImages.sort((image1, image2) => new Date(image1.createdAt) > new Date(image2.createdAt));
        break;
      default:
        break;
    }

    this.setState({filteredImages, loading: false});
  }

  render() {
    const {authUser, sidebarOpen, sidebarDocked, onSetOpen} = this.props;
    const {filteredImages, selectedImage, selectedImageId, showUploadModal, showDetailModal, loading} = this.state;

    return (
        <Sidebar
            sidebar={sidebarDocked && <SidebarContent docked={true}
                                                      setFilteredKeyword={(keyword) => this.setState({keyword}, () => this.filterImages())}
                                                      setFilteredTags={(tags) => this.setState({filteredTags: tags}, () => this.filterImages())}
                                                      setSortingOrder={(order) => this.setState({sortingOrder: order}, () => this.filterImages())}/>}
            open={sidebarOpen}
            docked={sidebarDocked}
            touch={false}
            onSetOpen={onSetOpen}>
          <div style={{height: "75px", width: "100%"}}/>
          {!sidebarDocked && <SidebarContent docked={false} setFilteredKeyword={(keyword) => this.setState({keyword}, () => this.filterImages())}
                                             setFilteredTags={(tags) => this.setState({filteredTags: tags}, () => this.filterImages())}/>}
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
                  {filteredImages.map((image, index) => {
                    return <Card key={index} onClick={() => this.setState({
                      selectedImage: image,
                      selectedImageId: image.id,
                    }, () => this.setState({showDetailModal: true}))}>
                      <Card.Img variant="top" src={image.filePath} loading="lazy"/>
                      <Card.Body>
                        <Card.Title>{image.title}</Card.Title>
                        <Card.Text>{image.description}</Card.Text>
                        <Tags readOnly tags={image.tags}/>
                      </Card.Body>
                    </Card>
                  })}
                </CardColumns></Container>}

            <UploadImageModal show={showUploadModal} onClose={() => {
              this.setState({showUploadModal: false});
              this.loadImages();
            }}/>

            <ImageDetailModal image={selectedImage}
                              id={selectedImageId}
                              show={showDetailModal}
                              onClose={() => this.setState({showDetailModal: false})}
                              onDelete={() => this.loadImages()}
            />
          </div>
        </Sidebar>
    );
  }
}

export default compose(withAuthUser, withFirebase)(HomePage);