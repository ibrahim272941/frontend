import { Container, Form, Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import {
  loginFunc,
  registerFunc,
  registerStart,
} from '../redux/authRedux/actions';
import { useDispatch } from 'react-redux';

const initialValue = {
  displayName: '',
  email: '',
  password: '',
};
const LoginScreen = () => {
  const { search } = useLocation();
  const redirectUrl = new URLSearchParams(search).get('redirect');
  const [userData, setUserData] = useState(initialValue);
  const dispatch = useDispatch();
  const { displayName, email, password } = userData;
  const navigate = useNavigate();

  const redirect = redirectUrl ? redirectUrl : '/';
  const handleChange = (e) => {
    e.preventDefault();
    let { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginFunc(userData));

    navigate(redirect || '/');
  };
  return (
    <Container className="small-container">
      <Helmet>
        <title>Login In</title>
      </Helmet>
      <h3 className="my-3 text-center">Login In</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            onChange={handleChange}
            name="email"
            value={email}
            type="email"
            placeholder="Enter email"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={handleChange}
            value={password}
            name="password"
            type="password"
            placeholder="Enter password"
            required
          />
        </Form.Group>
        <div className="mb-3 d-grid gap-2">
          <Button
            style={{
              backgroundColor: '#E09E10',
              border: '#0000',
            }}
            type="submit"
            size="lg"
          >
            Login In
          </Button>
        </div>
        <div className="mb-3 text-center">
          New Costumer
          <Link to={`/signin?redirect=${redirect}`}>Create your account</Link>
        </div>
      </Form>
    </Container>
  );
};
export default LoginScreen;
