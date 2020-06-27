import React, { Component } from "react";
import PropTypes from "prop-types";
import { withSnackbar } from "notistack";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button,
} from "@material-ui/core";

class LoginModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
        };
    }

    render() {
        const { open, onSubmit, onClose } = this.props;
        const { email, password } = this.state;

        return (
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>Login</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        id="email"
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) =>
                            this.setState({ email: e.target.value })
                        }
                    />
                    <br />
                    <TextField
                        id="password"
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) =>
                            this.setState({ password: e.target.value })
                        }
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button onClick={() => onSubmit(email, password)}>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

LoginModal.PropTypes = {
    open: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default withSnackbar(LoginModal);
