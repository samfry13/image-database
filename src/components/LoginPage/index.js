import React, {Component} from 'react';
import {withRouter} from "react-router-dom"
import {withFirebase} from "../Firebase";
import * as ROUTES from "../../constants/routes";
import {compose} from "recompose";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";

const LoginPage = () => (
    <Container>
      <Row>
        <Col md={6} lg={4} className="justify-content-center mx-auto">
          <h1>Login</h1>
          <LoginForm/>
        </Col>
      </Row>
    </Container>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class LoginFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = {...INITIAL_STATE};
  }

  onSubmit = event => {
    event.preventDefault();
    const {email, password} = this.state;
    const {firebase, history} = this.props;

    firebase.doSignInWithEmailAndPassword(email, password)
    .then(() => {
      this.setState({...INITIAL_STATE});
      history.push(ROUTES.HOME);
    })
    .catch(error => {
      this.setState({error});
    })
  };

  onChange = event => {
    this.setState({[event.target.name]: event.target.value});
  };

  render() {
    const {email, password, error} = this.state;

    const isInvalid = password === '' || email === '';

    return (
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="email">
            <Form.Control
                name="email"
                value={email}
                onChange={this.onChange}
                type="text"
                placeholder="Email Address"
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Control
                name="password"
                value={password}
                onChange={this.onChange}
                type="password"
                placeholder="Password"
            />
          </Form.Group>
          {error && <Alert variant="danger" dismissible onClose={() => this.setState({error: null})}>
            <Alert.Heading>Oh No! There was an Error!</Alert.Heading>
            <hr/>
            <p>{error.message}</p>
          </Alert>}
          <Button disabled={isInvalid} type="submit">Login</Button>
        </Form>
    )
  }
}

const LoginForm = compose(
    withRouter,
    withFirebase,
)(LoginFormBase);

export default LoginPage;

export {LoginForm};