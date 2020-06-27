import React, { Component } from "react";
import PropTypes from "prop-types";
import BackendClient from "../helpers/BackendClient";
import { withStyles } from "@material-ui/core/styles";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    FormControl,
} from "@material-ui/core";

const styles = (theme) => ({
    image: {
        width: "552px",
        height: "auto",
    },
});

class ImageModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.image.title,
            description: props.image.discription,
            filePath: props.image.filePath,
            updatedAt: props.image.updatedAt,
            tags: props.image.tags,
            readOnly: true,
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.image !== this.props.image) {
            const { image } = this.props;
            this.setState({
                title: image.title,
                description: image.description,
                filePath: image.filePath,
                updatedAt: image.updatedAt,
                tags: image.tags,
            });
        }
    }

    onDelete() {
        const { id, onDelete } = this.props;
    }

    onSubmitUpdate() {}

    onClose() {
        const { onClose } = this.props;
        this.setState({ readOnly: true });
        onClose();
    }

    render() {
        const { classes, show, authenticated, id } = this.props;
        const {
            title,
            description,
            filePath,
            updatedAt,
            tags,
            readOnly,
        } = this.state;

        return (
            <Dialog open={show} scroll="body" onClose={this.onClose.bind(this)}>
                <DialogTitle onClose={this.onClose.bind(this)}>
                    Image Details
                </DialogTitle>
                <DialogContent dividers={false}>
                    <img src={filePath} className={classes.image} />
                    <FormControl fullWidth>
                        <TextField
                            label="Title"
                            value={title}
                            onChange={(e) =>
                                this.setState({ title: e.target.value })
                            }
                            disabled={readOnly}
                        />
                    </FormControl>
                    <br />
                    <FormControl fullWidth>
                        <TextField
                            label="Description"
                            value={description}
                            onChange={(e) =>
                                this.setState({ title: e.target.value })
                            }
                            disabled={readOnly}
                        />
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button type="button" onClick={this.onClose.bind(this)}>
                        Close
                    </Button>
                    {authenticated && (
                        <Button
                            type="button"
                            color="secondary"
                            onClick={this.onDelete.bind(this)}
                        >
                            Delete
                        </Button>
                    )}
                    {authenticated && (
                        <Button
                            type="button"
                            color="primary"
                            onClick={
                                readOnly
                                    ? () => this.setState({ readOnly: false })
                                    : this.onSubmitUpdate.bind(this)
                            }
                        >
                            {readOnly ? "Edit" : "Save"}
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        );
    }
}

ImageModal.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    authenticated: PropTypes.bool,
    image: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
};

export default withStyles(styles)(ImageModal);
