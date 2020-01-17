import React, {Component} from "react";
import Form from "react-bootstrap/Form";
import Tags from "../Tags";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      keyword: "",
      sortingOrder: "",
    }
  }

  render() {
    const {setFilteredKeyword, setFilteredTags, setSortingOrder, docked} = this.props;
    const {tags, keyword, sortingOrder} = this.state;

    return <div style={docked ? {
      width: "300px",
      height: "100%",
      padding: "0 10px",
      backgroundColor: "white"
    } : {padding: "0 30px"}}>
      {docked && <div style={{height: "75px", width: "100%"}}/>}
      <Form>
        <Form.Group>
          <Form.Label>Sort Order</Form.Label>
          <Form.Control as="select" value={sortingOrder} onChange={e => {
            this.setState({sortingOrder: e.target.value});
            setSortingOrder(e.target.value);
          }}>
            <option value="chronological_asc">Newest First</option>
            <option value="chronological_des">Oldest First</option>
            <option value="alphabetical_asc">Alphabetical Asc. (A-Z)</option>
            <option value="alphabetical_des">Alphabetical Des. (Z-A)</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formGroupKeyword">
          <Form.Label>Keyword Search</Form.Label>
          <Form.Control type="text" value={keyword} onChange={e => {
            this.setState({keyword: e.target.value});
            setFilteredKeyword(e.target.value);
          }}/>
        </Form.Group>
        <Form.Group controlId="formGroupTags">
          <Form.Label>Tags Filter</Form.Label>
          <Tags tags={tags} autocomplete onChange={(newTags) => {
            this.setState({tags: newTags});
            setFilteredTags(newTags);
          }}/>
        </Form.Group>
      </Form>
    </div>
  }
}

export default Sidebar;