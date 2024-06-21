// src/components/HouseList.js
import React from 'react';
import { Button, ListGroup } from 'react-bootstrap';

const HouseList = ({ houses, onEdit, onDelete }) => {
  return (
    <ListGroup>
      {houses.map(house => (
        <ListGroup.Item key={house.id} className="house">
          <h3>{house.address}</h3>
          <p>{house.city}, {house.state} {house.zipCode}</p>
          <Button
            variant="info"
            className="App-button"
            onClick={() => onEdit(house)}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            className="App-button"
            onClick={() => onDelete(house.id)}
          >
            Delete
          </Button>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default HouseList;
