import './App.css';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomeScreen from './screen/HomeScreen';
import ProductScreen from './screen/ProductScreen';
import { Badge, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import CartScreen from './screen/CartScreen';
import SigninScreen from './screen/SigninScreen';
import LoginScreen from './screen/LoginScreen';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebaseConfig';
import { persistUser } from './redux/authRedux/actions';

function App() {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.main);
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        dispatch(persistUser(authUser));
      } else {
        dispatch(persistUser(null));
      }
    });
  }, [dispatch, currentUser]);
  return (
    <Router>
      <div className="d-flex flex-column site-contianer">
        <header>
          <Navbar bg="dark" variant="dark">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>Amazon</Navbar.Brand>
              </LinkContainer>
              <Nav className="me-auto">
                <Link to="/cart" className="nav-link">
                  Cart
                  {cart.cartItems.length > 0 && (
                    <Badge className="mx-2 mb-1" pill bg="danger">
                      {cart.cartItems.reduce((a, b) => a + b.quantity, 0)}
                    </Badge>
                  )}
                </Link>
                {currentUser ? (
                  <NavDropdown
                    title={currentUser.displayName}
                    id="basic-nav-dropdown"
                  >
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>User Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/orderhistory">
                      <NavDropdown.Item>Order History</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <Link
                      className="dropdown-item"
                      to="#signout"
                      // onClick={signOutHandler}
                    >
                      Sign Out
                    </Link>
                  </NavDropdown>
                ) : (
                  <Link className="nav-link" to="/signin">
                    Sign In
                  </Link>
                )}
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/product/:id" element={<ProductScreen />} />
              <Route path="/" element={<HomeScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/signin" element={<SigninScreen />} />
              <Route path="/login" element={<LoginScreen />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">All rights deserved</div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
