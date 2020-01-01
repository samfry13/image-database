import React, {Component} from "react";
import Form from "react-bootstrap/Form";
import Tags from "../Tags";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      keyword: "",
    }
  }

  render() {
    const {setFilteredKeyword, setFilteredTags} = this.props;
    const {tags, keyword} = this.state;

    return <div style={{
      width: "300px",
      height: "100%",
      padding: "0 10px",
      backgroundColor: "white"
    }}>
      <div style={{height: "75px", width: "100%"}}/>
      <Form>
        <Form.Group controlId="formGroupKeyword">
          <Form.Label>Keyword Search</Form.Label>
          <Form.Control type="text" value={keyword} onChange={e => {
            this.setState({keyword: e.target.value});
            setFilteredKeyword(e.target.value);
          }}/>
        </Form.Group>
        <Form.Group controlId="formGroupTags">
          <Form.Label>Tags Filter</Form.Label>
          <Tags tags={tags} onChange={(newTags) => {
            this.setState({tags: newTags});
            setFilteredTags(newTags);
          }}/>
        </Form.Group>
      </Form>
    </div>
  }
}

export default Sidebar;