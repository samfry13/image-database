import React, {Component} from "react";
import Image from "react-bootstrap/Image";
import defaultImage from "../../assets/default-image.jpg";

class ImageUploader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fileURL: null,
    }
  }

  handleChange(event) {
    event.preventDefault();

    const {onChange} = this.props;
    const file = event.target.files[0];
    onChange(file);


    const reader = new FileReader();
    reader.onloadend = () => {
      this.setState({fileURL: reader.result});
    };

    reader.readAsDataURL(file);
  }

  render() {
    const {fileURL} = this.state;

    return <div>
      <input type="file" onChange={e => this.handleChange(e)}/>
      <br/>
      <Image src={fileURL || defaultImage} rounded style={{maxHeight: "300px"}}/>
    </div>
  }
}

export default ImageUploader