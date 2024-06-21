// src/components/HouseForm.js
import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import './styles.css'; //

const HouseForm = ({ onSubmit, house }) => {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');

  useEffect(() => {
    if (house) {
      setAddress(house.address);
      setCity(house.city);
      setState(house.state);
      setZipCode(house.zipCode);
    } else {
      setAddress('');
      setCity('');
      setState('');
      setZipCode('');
    }
  }, [house]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!address || !city || !state || !zipCode) {
      toast.error("All fields are required!");
      return;
    }
    onSubmit({ address, city, state, zipCode, id: house?.id });
    // Reset form fields
    setAddress('');
    setCity('');
    setState('');
    setZipCode('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formAddress">
        <Form.Label>Address</Form.Label>
        <Form.Control
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formCity">
        <Form.Label>City</Form.Label>
        <Form.Control
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formState">
        <Form.Label>State</Form.Label>
        <Form.Control
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formZipCode">
        <Form.Label>Zip Code</Form.Label>
        <Form.Control
          type="text"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="App-button mt-2">
        Submit
      </Button>
    </Form>
  );
};

export default HouseForm;
