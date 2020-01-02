import React from 'react';
import {Link} from 'react-router-dom';

import * as ROUTES from '../../constants/routes';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import LogoutButton from "../Logout";
import {withAuthUser} from "../Session";

import logo from "../../assets/logo.png"

const Navigation = ({authUser}) => (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Navbar.Brand><img
          alt=""
          src={logo}
          style={{width: "32px", height: "32px"}}
          className="d-inline-block align-top mr-2"
      />Image Database</Navbar.Brand>
      <Nav className="ml-auto">
        {!authUser ? <Nav.Link as={Link} to={ROUTES.LOGIN}>Login</Nav.Link>
            : <LogoutButton/>}
      </Nav>
    </Navbar>
);

export default withAuthUser(Navigation);