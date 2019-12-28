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
      <Navbar.Toggle/>
      <Navbar.Collapse>
        <Nav>
          <Nav.Link as={Link} to={ROUTES.HOME}>Home</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <Navbar.Collapse className="justify-content-end">
        <Nav>
          {!authUser ? <Nav.Link as={Link} to={ROUTES.LOGIN}>Login</Nav.Link>
              : <LogoutButton/>}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
);

export default withAuthUser(Navigation);