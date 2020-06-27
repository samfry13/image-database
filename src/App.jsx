import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import BackendClient from "./helpers/BackendClient";
import PropTypes from "prop-types";

import { withSnackbar } from "notistack";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: undefined,
            token: undefined,
        };
    }

    login(email, password) {
        const { enqueueSnackbar } = this.props;
        BackendClient.login(email, password).then(
            (result) => {
                this.setState({ user: result.user, token: result.token });
                enqueueSnackbar(result.msg, { variant: "success" });
            },
            (result) => {
                enqueueSnackbar(result.msg, { variant: "error" });
            }
        );
    }

    render() {
        const { user } = this.state;
        return (
            <div className="App">
                <Navbar
                    login={this.login.bind(this)}
                    authenticated={!!user}
                    user={user}
                />
                <Home />
            </div>
        );
    }
}

App.PropTypes = {
    enqueueSnackbar: PropTypes.func.isRequired,
};

export default withSnackbar(App);
