import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
    AppBar,
    Button,
    Toolbar,
    Typography,
    Menu,
    MenuItem,
} from "@material-ui/core";
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
            menuAnchor: null,
        };
    }

    render() {
        const { classes, login, logout, authenticated, user } = this.props;
        const { loginModalOpen, menuAnchor } = this.state;
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
                            <>
                                <Button
                                    color="inherit"
                                    onClick={(e) =>
                                        this.setState({
                                            menuAnchor: e.currentTarget,
                                        })
                                    }
                                >
                                    {user.name}
                                </Button>
                                <Menu
                                    anchorEl={menuAnchor}
                                    keepMounted
                                    open={!!menuAnchor}
                                    onClose={() =>
                                        this.setState({ menuAnchor: null })
                                    }
                                >
                                    <MenuItem
                                        onClick={() => {
                                            this.setState({ menuAnchor: null });
                                            logout();
                                        }}
                                    >
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </>
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
                    onSubmit={async (email, password) =>
                        await login(email, password)
                    }
                />
            </div>
        );
    }
}

Navbar.propTypes = {
    classes: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    authenticated: PropTypes.bool,
    user: PropTypes.object,
};

export default withStyles(styles)(Navbar);
