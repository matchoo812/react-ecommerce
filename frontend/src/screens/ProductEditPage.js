import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails, updateProduct } from '../actions/productActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

export default function ProductEditPage() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  // const productUpdate = useSelector((state) => state.productUpdate);
  // const {
  //   loading: updateLoading,
  //   error: updateError,
  //   success: updateSuccess,
  // } = productUpdate;

  const { id } = useParams();

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });

      navigate('/admin/productlist');
    } else {
      if (!product || !product.name || product._id !== id) {
        dispatch(listProductDetails(id));
      } else {
        setName(product.name);
        setPrice(product.price);
        setBrand(product.brand);
        setImage(product.image);
        setDescription(product.description);
        setCategory(product.category);
        setCountInStock(product.countInStock);
      }
    }
  }, [id, dispatch, navigate, product, successUpdate]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/upload', formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: id,
        name,
        price,
        brand,
        category,
        image,
        description,
        countInStock,
      })
    );
  };

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId='name' className='my-2'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='price' className='my-2'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='image' className='my-2'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}></Form.Control>
              <Form.Control
                type='file'
                id='image-file'
                label='Choose File'
                custom
                onChange={handleFileUpload}></Form.Control>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId='brand' className='my-2'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='category' className='my-2'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                value={category}
                onChange={(e) => setCategory(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock' className='my-2'>
              <Form.Label>Count in Stock</Form.Label>
              <Form.Control
                type='number'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='description' className='my-2'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                value={description}
                onChange={(e) => setDescription(e.target.value)}></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' className='my-2'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
}
