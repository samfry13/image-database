import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { red } from "@material-ui/core/colors";
import { Card, CardHeader, Chip, IconButton, CardContent, CardMedia, Typography, CardActions, Collapse } from "@material-ui/core";
import { MoreVert, Create, ExpandMore } from "@material-ui/icons";

const styles = (theme) => ({
    root: {
        width: 300
    },
    media: {
        height: 250,
        objectFit: "scale-down"
    },
    expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: "rotate(180deg)",
    },
    avatar: {
        backgroundColor: red[500],
    }
});

class ImageCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
        };
    }

    render() { 
        const {classes, image} = this.props;
        const {expanded} = this.state;
        return ( 
            <Card className={classes.root}>
                <CardHeader
                    title={image.title}
                />
                <CardMedia 
                    className={classes.media}
                    component="img"
                    image={image.filePath}
                    title={image.title}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {image.description}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton><Create/></IconButton>
                    <IconButton 
                        className={clsx(classes.expand, {[classes.expandOpen]: expanded})}
                        onClick={() => this.setState({expanded: !expanded})}
                    >
                        <ExpandMore/>
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        {image.tags.map((tag, i) => <Chip key={i} label={tag}/>)}
                    </CardContent>
                </Collapse>
            </Card>
        );
    }
}
 
export default withStyles(styles)(ImageCard);