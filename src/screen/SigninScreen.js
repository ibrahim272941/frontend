import { Container, Form, Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const initialValue = {
  name: '',
  email: '',
  password: '',
};
const SigninScreen = () => {
  const { search } = useLocation();
  const redirectUrl = new URLSearchParams(search).get('redirect');
  const [userData, setUserData] = useState(initialValue);

  const { name, email, password } = userData;

  const redirect = redirectUrl ? redirectUrl : '/';
  const handleChange = (e) => {
    e.preventDefault();
    let { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));

    console.log(userData);
  };
  return (
    <Container className="small-container">
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <h3 className="my-3 text-center">Sign In</h3>
      <Form>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            onChange={handleChange}
            name="name"
            value={name}
            type="email"
            placeholder="Enter email"
            required
          />
        </Form.Group>
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
            Sign In
          </Button>
        </div>
        <div className="mb-3 text-center">
          New Costumer
          <Link to={`/signin?redirect=${redirect}`}> Create your account </Link>
        </div>
      </Form>
    </Container>
  );
};
export default SigninScreen;
