import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ImageCard from "./ImageCard";
import BackendClient from "../helpers/BackendClient";
import { Grid, CircularProgress, Fab, TextField, Typography } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { Add } from "@material-ui/icons";

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
        bottom: theme.spacing(2)
    },
    pagination: {
        display: "flex",
        justifyContent: "center",
        padding: "10px 0"
    }
});

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageSize: 6,
            pageNum: 1,
            pageTotal: 1,
            search: "",
            images: [],
            loading: false
        };
    }

    async componentDidMount() {
        const {pageSize, pageNum, search} = this.state;
        this.setState({loading: true});
        this.setState({
            loading: true, 
            images: await BackendClient.getAllImages(pageSize, pageNum, search),
            pageTotal: await BackendClient.getImagePageNum(pageSize, search)
        });
        this.setState({loading: false});
    }

    async setPage(page) {
        this.setState({pageNum: page}, () => this.updatePage());
    }

    async updateSearch(search) {
        this.setState({pageNum: 1, search}, () => this.updatePage());
    }

    async updatePage() {
        const {pageSize, pageNum, search} = this.state;
        this.setState({loading: true, images: await BackendClient.getAllImages(pageSize, pageNum, search), pageTotal: await BackendClient.getImagePageNum(pageSize, search)}, () => this.setState({loading: false}));
    }

    render() { 
        const {classes} = this.props;
        const {images, pageNum, pageTotal, loading} = this.state;
        return ( 
            <div className={classes.root}>
                <Fab className={classes.fab} color="primary"><Add/></Fab>
                <div className={classes.search}>
                    <Typography variant="h5">Search</Typography>
                    <TextField label="Query" onChange={e => this.updateSearch(e.target.value)}/>
                </div>
                <Grid container spacing={2}>
                    {loading ? <Grid item><CircularProgress/></Grid> : images.map((image, i) => 
                        <Grid item key={i}>
                            <ImageCard image={image}/>
                        </Grid>
                    )}
                </Grid>
                <Pagination count={pageTotal} className={classes.pagination} page={pageNum} onChange={(e, v) => this.setPage(v)} /> 
            </div>
        );
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
