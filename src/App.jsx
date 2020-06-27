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
        };
    }

    async componentDidMount() {
        await this.refreshSession();
    }

    async refreshSession() {
        const { enqueueSnackbar } = this.props;
        const result = await BackendClient.refreshSession().catch((err) => {
            console.error(err);
            localStorage.removeItem("token");
            enqueueSnackbar(err.msg, { variant: "error" });
        });

        if (!!result) {
            localStorage.setItem("token", result.token);
            this.setState({ user: result.user });
        }
    }

    async login(email, password) {
        const { enqueueSnackbar } = this.props;
        return new Promise((resolve) => {
            BackendClient.login(email, password)
                .then((result) => {
                    localStorage.setItem("token", result.token);
                    this.setState({ user: result.user });
                    enqueueSnackbar(result.msg, { variant: "success" });
                    resolve(!!result);
                })
                .catch((err) => {
                    console.error(err);
                    enqueueSnackbar(err.msg, { variant: "error" });
                    throw err;
                });
        });
    }

    async logout() {
        localStorage.removeItem("token");
        this.setState({ user: undefined });
    }

    render() {
        const { user } = this.state;
        return (
            <div className="App">
                <Navbar
                    login={this.login.bind(this)}
                    logout={this.logout.bind(this)}
                    authenticated={!!user}
                    user={user}
                />
                <Home authenticated={!!user} user={user} />
            </div>
        );
    }
}

App.PropTypes = {
    enqueueSnackbar: PropTypes.func.isRequired,
};

export default withSnackbar(App);
