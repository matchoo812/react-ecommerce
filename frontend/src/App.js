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
            <Route path='/product/:id' element={<ProductDetailPage />} />
            {/* use empty string in subpath to indicate an optional parameter */}
            <Route path='/cart'>
              <Route path=':id' element={<CartPage />} />
              <Route path='' element={<CartPage />} />
            </Route>
            <Route path='/' element={<HomePage />} exact />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}
