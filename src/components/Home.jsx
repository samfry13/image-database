import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { withSnackbar } from "notistack";
import ImageCard from "./ImageCard";
import BackendClient from "../helpers/BackendClient";
import {
    Grid,
    CircularProgress,
    Fab,
    TextField,
    Typography,
    Zoom,
} from "@material-ui/core";
import { Pagination, Autocomplete } from "@material-ui/lab";
import { Add } from "@material-ui/icons";
import ImageModal from "./ImageModal";

const styles = (theme) => ({
    root: {
        margin: "10px auto",
        maxWidth: "940px",
    },
    search: {
        margin: "10px 0",
    },
    fab: {
        position: "fixed",
        right: theme.spacing(2),
        bottom: theme.spacing(2),
    },
    pagination: {
        display: "flex",
        justifyContent: "center",
        padding: "10px 0",
    },
});

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageSize: 6,
            pageNum: 1,
            pageTotal: 1,
            search: "",
            tags: [],
            tagOptions: [],
            images: [],
            loading: false,
            selectedImage: {},
            selectedImageId: 0,
            showDetailModal: false,
        };
    }

    async componentDidMount() {
        await this.updatePage();
    }

    async setPage(pageNum) {
        this.setState({ pageNum }, () => this.updatePage());
    }

    async updateSearch(search) {
        this.setState({ pageNum: 1, search }, () => this.updatePage());
    }

    async updateTags(tags) {
        this.setState({ pageNum: 1, tags }, () => this.updatePage());
    }

    async updatePage() {
        const { enqueueSnackbar } = this.props;
        const { pageSize, pageNum, search, tags } = this.state;
        this.setState(
            {
                loading: true,
                images: await BackendClient.getAllImages(
                    pageSize,
                    pageNum,
                    search,
                    tags.map((tag) => tag.tag)
                ).catch((err) => {
                    console.error(err);
                    enqueueSnackbar(err.msg, { variant: "error" });
                    return [];
                }),
                pageTotal: await BackendClient.getImagePageNum(
                    pageSize,
                    search,
                    tags.map((tag) => tag.tag)
                ).catch((err) => {
                    console.error(err);
                    enqueueSnackbar(err.msg, { variant: "error" });
                    return 0;
                }),
            },
            () => this.setState({ loading: false })
        );
    }

    render() {
        const { classes, authenticated } = this.props;
        const {
            tagOptions,
            images,
            pageNum,
            pageTotal,
            loading,
            selectedImage,
            selectedImageId,
            showDetailModal,
        } = this.state;

        return (
            <div className={classes.root}>
                <Zoom in={authenticated}>
                    <Fab className={classes.fab} color="primary">
                        <Add />
                    </Fab>
                </Zoom>
                <div className={classes.search}>
                    <Typography variant="h5">Search</Typography>
                    <Grid container spacing={2} alignItems="flex-end">
                        <Grid item xs={4}>
                            <TextField
                                label="Query"
                                fullWidth
                                onChange={(e) =>
                                    this.updateSearch(e.target.value)
                                }
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <Autocomplete
                                multiple
                                autoComplete
                                autoHighlight
                                size="small"
                                id="tags-query"
                                options={tagOptions}
                                getOptionLabel={(option) => option.tag}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Tags"
                                        placeholder="Tag"
                                    />
                                )}
                                onChange={(_, v) => this.updateTags(v)}
                            />
                        </Grid>
                    </Grid>
                </div>
                <Grid container spacing={2} justify="center">
                    {loading ? (
                        <Grid item>
                            <CircularProgress />
                        </Grid>
                    ) : images.length ? (
                        images.map((image, i) => (
                            <Grid item key={i}>
                                <ImageCard
                                    image={image}
                                    onClick={() =>
                                        this.setState(
                                            {
                                                selectedImage: image,
                                                selectedImageId: image.id,
                                            },
                                            () =>
                                                this.setState({
                                                    showDetailModal: true,
                                                })
                                        )
                                    }
                                />
                            </Grid>
                        ))
                    ) : (
                        <Grid item>
                            <Typography>No Results</Typography>
                        </Grid>
                    )}
                </Grid>
                <Pagination
                    count={pageTotal}
                    className={classes.pagination}
                    page={pageNum}
                    onChange={(_, v) => this.setPage(v)}
                />
                <ImageModal
                    image={selectedImage}
                    id={selectedImageId}
                    show={showDetailModal}
                    onClose={() => this.setState({ showDetailModal: false })}
                    onDelete={() => this.updatePage()}
                    authenticated={authenticated}
                />
            </div>
        );
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
    enqueueSnackbar: PropTypes.func.isRequired,
    authenticated: PropTypes.bool,
    user: PropTypes.object,
};

export default withSnackbar(withStyles(styles)(Home));
