import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './screens/HomePage';
import ProductDetailPage from './screens/ProductDetailPage';

export default function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/' element={<HomePage />} exact />
            <Route path='product/:id' element={<ProductDetailPage />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}
