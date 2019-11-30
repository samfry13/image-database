import React from "react";
import {withFirebase} from "../Firebase";
import Button from "react-bootstrap/Button";

const LogoutButton = ({firebase}) => (
    <Button type="button" onClick={firebase.doSignOut}>Logout</Button>
);

export default withFirebase(LogoutButton);