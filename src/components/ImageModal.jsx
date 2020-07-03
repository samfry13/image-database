import React, { Component } from "react";
import PropTypes from "prop-types";
import BackendClient from "../helpers/BackendClient";
import { withStyles } from "@material-ui/core/styles";
import { withSnackbar } from "notistack";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    FormControl,
    Chip,
} from "@material-ui/core";

const styles = (theme) => ({
    paper: {
        minWidth: "400px"
    },
    content: {
        display: "grid",
    },
    image: {
        width: "auto",
        height: "400px",
        justifySelf: "center"
    },
    textField: {
        marginTop: "8px",
    },
    chipsContainer: {
        display: "default",
        marginTop: "8px"
    }
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
        const { id, onDelete, enqueueSnackbar } = this.props;

        if (window.confirm("Are you sure you want to delete this image permanently?")) {
            BackendClient.deleteImage(id).then(response => {
                enqueueSnackbar(response.msg, { variant: "success" });
                onDelete();
                this.onClose();
            }).catch(error => {
                enqueueSnackbar(error.msg, { variant: "error" });
            });
          }
    }

    onSubmitUpdate() {
        const { id } = this.props;
        const { title, description, filePath, updatedAt, tags } = this.state;
        BackendClient.updateImage({id, title, description, filePath, updatedAt, tags}).then(response => {
            enqueueSnackbar(response.msg, { variant: "success" });
            this.setState({ readOnly: false });
        }).catch(error => {
            enqueueSnackbar(error.msg, { variant: "error" });
        });
    }

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
            <Dialog 
                open={show} 
                scroll="body" 
                onClose={this.onClose.bind(this)}
                classes={{
                    paper: classes.paper
                }}
            >
                <DialogTitle onClose={this.onClose.bind(this)}>
                    Image Details
                </DialogTitle>
                <DialogContent 
                    dividers={false} 
                    classes={{root: classes.content}}
                >
                    <img src={filePath} className={classes.image} />
                    <FormControl fullWidth>
                        <TextField
                            label="Title"
                            value={title}
                            onChange={(e) =>
                                this.setState({ title: e.target.value })
                            }
                            disabled={readOnly}
                            classes={{
                                root: classes.textField
                            }}
                        />
                    </FormControl>
                    <br />
                    <FormControl fullWidth>
                        <TextField
                            multiline
                            rows={3}
                            label="Description"
                            value={description}
                            onChange={(e) =>
                                this.setState({ title: e.target.value })
                            }
                            disabled={readOnly}
                            classes={{
                                root: classes.textField
                            }}
                        />
                    </FormControl>
                    <div className={classes.chipsContainer}>
                        {tags && tags.map((tag, i) => (
                            <Chip key={i} label={tag}/>
                        ))}
                        <hr/>
                        <small>Last Updated: {new Date(updatedAt).toDateString()}</small>
                        <br/>
                        <small>ID: {id}</small>
                    </div>
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
    enqueueSnackbar: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    authenticated: PropTypes.bool,
    image: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
};

export default withSnackbar(withStyles(styles)(ImageModal));
