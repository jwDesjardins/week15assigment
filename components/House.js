// src/components/House.js
import React from 'react';
import { ListGroupItem, Button, Row, Col } from 'react-bootstrap';

const House = ({ house, onEdit, onDelete }) => (
  <ListGroupItem>
    <Row>
      <Col>
        <h3>{house.address}</h3>
        <p>{house.city}, {house.state} - {house.zipCode}</p>
      </Col>
      <Col md="auto">
        <Button variant="primary" onClick={() => onEdit(house)}>Edit</Button>
        <Button variant="danger" onClick={() => onDelete(house.id)}>Delete</Button>
      </Col>
    </Row>
  </ListGroupItem>
);

export default House;
