import React, { useState } from 'react';
import ComposeEmail from "../Mail/ComposeEmail";
import { Button, Badge, ListGroup } from "react-bootstrap";
import styles from "./Navigation.module.css";

const NavigationSideBar = ({ onOptionClick }) => {
  const [showComposeModal, setShowComposeModal] = useState(false);

  const handleComposeClick = () => {
    setShowComposeModal(true);
  };

  const handleCloseComposeModal = () => {
    setShowComposeModal(false);
  };

  return (
    <div className={styles.navigation}>
      <Button variant="primary" className="mb-3" onClick={handleComposeClick}>
        Compose
      </Button>
      <ComposeEmail show={showComposeModal} onHide={handleCloseComposeModal} />
      <ListGroup>
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start"
          onClick={() => onOptionClick("Inbox")}
          active
        >
          <div className="ms-2 me-auto">
            <div className="fw-bold">Inbox</div>
          </div>
          <Badge bg="primary" pill>
            14
          </Badge>
        </ListGroup.Item>
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start"
          onClick={() => onOptionClick("Sent")}
        >
          <div className="ms-2 me-auto">
            <div className="fw-bold">Sent</div>
          </div>
          <Badge bg="primary" pill>
            14
          </Badge>
        </ListGroup.Item>
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start"
        >
          <div className="ms-2 me-auto">
            <div className="fw-bold">Trash</div>
          </div>
          <Badge bg="primary" pill>
            14
          </Badge>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}

export default NavigationSideBar;
