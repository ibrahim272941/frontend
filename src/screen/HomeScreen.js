import React, { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { fetchStart } from '../redux/mainRedux/actions';
import { Col, Row } from 'react-bootstrap';
import Product from '../component/Product';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../component/LoadingBox';
import { onValue, query, ref } from 'firebase/database';
import { database } from '../firebase/firebaseConfig';

const HomeScreen = () => {
  const { products } = useSelector((state) => state.main);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [data, setData] = useState([]);

  // console.log(Object.keys(products).map((item) => item));
  console.log(Object.keys(products).length);
  useEffect(() => {
    dispatch(fetchStart());
    const useRef = ref(database, `PVEGcGLnQGaXlK1ISXPm2BOVBTy1`);
    onValue(query(useRef), (snapshot) => {
      setData({ ...snapshot.val() });
    });
  }, [dispatch]);

  return (
    <div>
      <Helmet>
        <title>Amazon Clone Website</title>
      </Helmet>
      <h1>Featured Products</h1>
      <div className="products">
        <Row>
          {products?.length !== 0 ? (
            Object.values(products).map((item, i) => (
              <Col key={i} sm={6} md={4} lg={3} className="mb-3">
                <Product product={item} id={Object.keys(products)[i]} />
              </Col>
            ))
          ) : (
            <LoadingBox />
          )}
        </Row>
        {/* <Row>
          {Object.values(products).map((item, i) => (
            <Col key={i} sm={6} md={4} lg={3} className="mb-3">
              <Product product={item} id={Object.keys(products)[i]} />
            </Col>
          ))}
        </Row> */}
      </div>
    </div>
  );
};

export default HomeScreen;
