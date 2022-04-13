import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoadingBox from '../component/LoadingBox';
import { saleStart } from '../redux/mainRedux/actions';

const initialValue = {
  fullName: '',
  address: '',
  city: '',
  postalCode: '',
  country: '',
  phoneNumber: '',
};
const ShippinScreen = () => {
  const dispatch = useDispatch();
  const {
    currentUser: { email },
  } = useSelector((state) => state.user);
  console.log(email);
  const {
    cart: { cartItems },
  } = useSelector((state) => state.main);
  console.log(cartItems);
  const [userData, setUserData] = useState(initialValue);
  const { fullName, city, address, postalCode, country, phoneNumber } =
    userData;
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    let costumerData = {
      fullName,
      email,
      phoneNumber,
      address,
      city,
      postalCode,
      country,
      cart: cartItems.map((item) => item),
      date: new Date().toLocaleString(),
    };

    dispatch(saleStart(costumerData));

    navigate('/');
  };
  const handleChange = (e) => {
    let { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <Helmet>
        <title>Shipping Screen</title>
      </Helmet>
      <div className="container small-container align-items-center">
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
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              name="phoneNumber"
              value={phoneNumber}
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
    </div>
  );
};

export default ShippinScreen;
