import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import ImageCard from "./ImageCard";
import BackendClient from "../helpers/BackendClient";
import { Grid, CircularProgress, Fab } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { Add } from "@material-ui/icons";

const styles = (theme) => ({
    root: {
        margin: "10px auto",
        maxWidth: "940px",
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
            pageSize: 5,
            pageNum: 1,
            pageTotal: 1,
            images: [],
            loading: false
        };
    }

    async componentDidMount() {
        const {pageSize, pageNum} = this.state;
        this.setState({loading: true});
        this.setState({
            loading: true, 
            images: await BackendClient.getAllImages(pageSize, pageNum),
            pageTotal: await BackendClient.getImagePageNum(pageSize)
        });
        this.setState({loading: false});
    }

    async setPage(page) {
        const {pageSize} = this.state;
        this.setState({loading: true, pageNum: page, images: await BackendClient.getAllImages(pageSize, page)}, () => this.setState({loading: false}));
    }

    render() { 
        const {classes} = this.props;
        const {images, pageNum, pageTotal, loading} = this.state;
        return ( 
            <div className={classes.root}>
                <Fab className={classes.fab} color="primary"><Add/></Fab>
                <Pagination count={pageTotal} className={classes.pagination} page={pageNum} onChange={(e, v) => this.setPage(v)} /> 
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
 
export default withStyles(styles)(Home);