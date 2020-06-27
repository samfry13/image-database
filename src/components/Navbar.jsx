import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import LoginModal from "./LoginModal";

const styles = (theme) => ({
    root: {
        flexGrow: 1,
    },
    stickyAppBar: {
        top: "5px",
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
});

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginModalOpen: false,
        };
    }

    render() {
        const { classes, login, authenticated, user } = this.props;
        const { loginModalOpen } = this.state;
        return (
            <div className={classes.root}>
                <AppBar
                    classes={{ positionSticky: classes.stickyAppBar }}
                    position="sticky"
                >
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            Costume Database
                        </Typography>
                        {authenticated ? (
                            <Typography>{user.name}</Typography>
                        ) : (
                            <Button
                                color="inherit"
                                onClick={() =>
                                    this.setState({ loginModalOpen: true })
                                }
                            >
                                Login
                            </Button>
                        )}
                    </Toolbar>
                </AppBar>
                <LoginModal
                    open={loginModalOpen}
                    onClose={() => this.setState({ loginModalOpen: false })}
                    onSubmit={(email, password) => login(email, password)}
                />
            </div>
        );
    }
}

Navbar.propTypes = {
    classes: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    authenticated: PropTypes.bool,
    user: PropTypes.object,
};

export default withStyles(styles)(Navbar);
