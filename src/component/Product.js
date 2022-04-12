import axios from 'axios';
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { cartAddStart } from '../redux/mainRedux/actions';
import Rating from './Rating';
import { useState } from 'react';

const Product = ({ product, id }) => {
  const [buttonDisable, setButtonDisable] = useState(false);

  const {
    cart: { cartItems },
  } = useSelector((state) => state.main);
  // console.log(product);
  // // const state = useSelector((state) => state);
  // console.log(id);
  const dispatch = useDispatch();
  // const addToCartHandler = async (item) => {
  //   const { data } = await axios.get(`/api/products/${item._id}`);
  //   const existItem = cartItems.find((item) => item._id === data._id);
  //   const quantity = existItem ? existItem.quantity + 1 : 1;
  //   if (data.countInStock < quantity) {
  //     window.alert('This Product is out of stock');
  //     setButtonDisable(true);
  //     return;
  //   } else if (quantity < 0) {
  //     window.alert('Quantity cannot be 0');
  //     return;
  //   }
  //   dispatch(cartAddStart({ ...item, quantity }));
  // };

  return (
    <div>
      <Card className="product-card">
        <Link to={`/product/${id}`}>
          <img src={product.img} alt="" className="card-img-top" />
        </Link>
        <Card.Body>
          <Link to={`/product/${product.slug}`}>
            <Card.Title className="fs-6">{product.productTitle}</Card.Title>
          </Link>
          <Rating rating={product.rating} numReviews={product.numReviews} />
          <Card.Text>{product.price}€</Card.Text>
          {/* {buttonDisable ? (
            <Button variant="light" disabled>
              Out of Stock
            </Button>
          ) : (
            <Button
              onClick={() => addToCartHandler(product)}
              className="btn-warning button-add-to-cart"
            >
              Add Chart
            </Button>
          )} */}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Product;
