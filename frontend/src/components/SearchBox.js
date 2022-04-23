import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function SearchBox() {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate('/');
    }
  };

  return (
    <Form onSubmit={handleSubmit} className='d-flex mt-sm-2'>
      <Form.Control
        type='text'
        name='query'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search Products...'
        className='mr-sm-2 ml-sm-5'></Form.Control>
      <Button type='submit' variant='outline-success' className='p-2 ml-sm-2'>
        Search
      </Button>
    </Form>
  );
}
