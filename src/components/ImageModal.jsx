import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

class ImageModal extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return <div></div>;
    }
}

ImageModal.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles({})(ImageModal);
