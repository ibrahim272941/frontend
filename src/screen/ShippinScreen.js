import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';

const initialValue = {
  fullName: '',
  address: '',
  city: '',
  postalCode: '',
  country: '',
};
const ShippinScreen = () => {
  const [userData, setUserData] = useState(initialValue);
  const { fullName, city, address, postalCode, country } = userData;
  const handleSubmit = () => {};
  const handleChange = (e) => {
    let { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div>
      <Helmet>
        <title>Shipping Screen</title>
      </Helmet>
      <h1 className="my-3">Shipping Screen</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="fullName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            name="fullName"
            value={fullName}
            onChange={handleChange}
            required
          />
          <Form.Label>Address</Form.Label>
          <Form.Control
            name="address"
            value={address}
            onChange={handleChange}
            required
          />
          <Form.Label>City</Form.Label>
          <Form.Control
            name="city"
            value={city}
            onChange={handleChange}
            required
          />
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            name="postalCode"
            value={postalCode}
            onChange={handleChange}
            required
          />
          <Form.Label>Country</Form.Label>
          <Form.Control
            name="country"
            value={country}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <div className="mb-3">
          <Button size="fullwidth" variant="warning" type="submit">
            Continue
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ShippinScreen;
