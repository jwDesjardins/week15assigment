import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HouseList from './components/HouseList';
import HouseForm from './components/HouseForm';
import './index.css';

const API_URL = 'https://66748e7d75872d0e0a96da09.mockapi.io/houses';

const App = () => {
  const [houses, setHouses] = useState([]);
  const [editingHouse, setEditingHouse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const response = await axios.get(API_URL);
        setHouses(response.data);
      } catch (error) {
        console.error('There was an error fetching the houses!', error);
        setError('There was an error fetching the houses!');
      } finally {
        setLoading(false);
      }
    };

    fetchHouses();
  }, []);

  const createHouse = (house) => {
    axios.post(API_URL, house)
      .then(response => {
        setHouses([...houses, response.data]);
        toast.success("House created successfully!");
      })
      .catch(error => {
        console.error('There was an error creating the house!', error);
        toast.error("Error creating house!");
      });
  };

  const updateHouse = (house) => {
    axios.put(`${API_URL}/${house.id}`, house)
      .then(response => {
        setHouses(houses.map(h => h.id === house.id ? response.data : h));
        toast.success("House updated successfully!");
      })
      .catch(error => {
        console.error('There was an error updating the house!', error);
        toast.error("Error updating house!");
      });
  };

  const deleteHouse = (houseId) => {
    axios.delete(`${API_URL}/${houseId}`)
      .then(response => {
        setHouses(houses.filter(house => house.id !== houseId));
        toast.success("House deleted successfully!");
      })
      .catch(error => {
        console.error('There was an error deleting the house!', error);
        toast.error("Error deleting house!");
      });
  };

  const handleEdit = (house) => {
    setEditingHouse(house);
  };

  const handleDelete = (houseId) => {
    deleteHouse(houseId);
  };

  const handleSubmit = (house) => {
    if (house.id) {
      updateHouse(house);
    } else {
      createHouse(house);
    }
    setEditingHouse(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">House Management Wilkens</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/another-page">Another Page</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="mt-4">
        <Routes>
          <Route path="/" element={
            <>
              <HouseForm onSubmit={handleSubmit} house={editingHouse} />
              <HouseList houses={houses} onEdit={handleEdit} onDelete={handleDelete} />
            </>
          } />
          <Route path="/another-page" element={<div>Another Page</div>} />
        </Routes>
      </Container>
      <ToastContainer />
    </Router>
  );
};

export default App;
