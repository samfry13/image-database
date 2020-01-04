import React, {Component} from "react";
import {WithContext as ReactTags} from "react-tag-input";
import {withFirebase} from "../Firebase";
import "./style.css";

class Tags extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: this.formatTags(props.tags),
    }
  }

  componentDidMount() {
    const {firebase} = this.props;
    firebase.tags().on('value', snapshot => {
      const suggestedTags = this.formatTags(snapshot.val());
      this.setState({suggestedTags}, () => this.filterSuggestedTags());
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.tags !== this.props.tags) {
      this.setState({tags: this.formatTags(this.props.tags)}, () => this.filterSuggestedTags())
    }
  }

  filterSuggestedTags() {
    const {suggestedTags, tags} = this.state;
    const filteredSuggestedTags = suggestedTags.filter((suggestedTag) => tags.map(tag => tag.text).indexOf(suggestedTag.text) === -1);
    this.setState({filteredSuggestedTags});
  }

  formatTags(tags) {
    return tags.length === 0 ? []
        : tags.split(",").map((tag, index) => {return {id: index.toString(), text: tag,}});
  }

  tagsToString(tags) {
    return tags.map(tag => tag.text).join(",");
  }

  handleDelete(i) {
    const {onChange} = this.props;
    const {tags} = this.state;
    const newTags = tags.filter((tag, index) => index !== i);
    this.setState({tags: newTags}, () => this.filterSuggestedTags());
    onChange && onChange(this.tagsToString(newTags));
  }

  handleAddition(newTag) {
    const {onChange} = this.props;
    const {tags} = this.state;
    const newTags = tags.map(tag => tag.text).indexOf(newTag.text) === -1 ? [...tags, newTag] : [...tags];
    this.setState({tags: newTags}, () => this.filterSuggestedTags());
    onChange && onChange(this.tagsToString(newTags));
  }

  render() {
    const {readOnly, autocomplete} = this.props;
    const {tags, filteredSuggestedTags} = this.state;

    return <ReactTags readOnly={readOnly}
                      tags={tags}
                      suggestions={filteredSuggestedTags}
                      autocomplete={autocomplete}
                      handleDelete={this.handleDelete.bind(this)}
                      handleAddition={this.handleAddition.bind(this)}
                      allowDragDrop={false}
                      allowDeleteFromEmptyInput={false}
                      minQueryLength={1}
                      classNames={{
                        tags: 'ReactTags__tags',
                        tagInput: 'ReactTags__tagInput',
                        tagInputField: 'ReactTags__tagInputField',
                        selected: 'ReactTags__selected',
                        tag: 'ReactTags__selected ReactTags__tag',
                        remove: 'ReactTags__selected ReactTags__remove',
                        suggestions: 'ReactTags__suggestions',
                        activeSuggestion: 'ReactTags__activeSuggestion'
                      }}
    />
  }
}

export default withFirebase(Tags);