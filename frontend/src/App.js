import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './screens/HomePage';
import ProductDetailPage from './screens/ProductDetailPage';
import CartPage from './screens/CartPage';
import LoginPage from './screens/LoginPage';
import RegisterPage from './screens/RegisterPage';
import ProfilePage from './screens/ProfilePage';
import ShippingPage from './screens/ShippingPage';
import PaymentMethodPage from './screens/PaymentMethodPage';
import PlaceOrderPage from './screens/PlaceOrderPage';
import OrderListPage from './screens/OrderListPage';
import ShowOrderPage from './screens/ShowOrderPage';
import UserListPage from './screens/UserListPage';
import UserEditPage from './screens/UserEditPage';
import ProductListPage from './screens/ProductListPage';
import ProductEditPage from './screens/ProductEditPage';

export default function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/shipping' element={<ShippingPage />} />
            <Route path='/payment' element={<PaymentMethodPage />} />
            <Route path='/placeorder' element={<PlaceOrderPage />} />
            <Route path='/order/:id' element={<ShowOrderPage />} />
            <Route path='/product/:id' element={<ProductDetailPage />} />
            {/* use empty string in subpath to indicate an optional parameter */}
            <Route path='/cart'>
              <Route path=':id' element={<CartPage />} />
              <Route path='' element={<CartPage />} />
            </Route>
            <Route path='/admin/userlist' element={<UserListPage />} />
            <Route path='/admin/user/:id/edit' element={<UserEditPage />} />
            <Route path='/admin/orderlist' element={<OrderListPage />} />
            <Route path='/admin/productlist' element={<ProductListPage />} exact />
            <Route
              path='/admin/productlist/:pageNumber'
              element={<ProductListPage />}
              exact
            />
            <Route path='/admin/product/:id/edit' element={<ProductEditPage />} />
            <Route path='/search/:keyword' element={<HomePage />} exact />
            <Route path='/page/:pageNumber' element={<HomePage />} exact />
            <Route
              path='/search/:keyword/page/:pageNumber'
              element={<HomePage />}
              exact
            />
            <Route path='/' element={<HomePage />} exact />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}
