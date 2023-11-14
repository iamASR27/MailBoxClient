import React, { useEffect, useState } from "react";
import ComposeEmail from "../Mail/ComposeEmail";
import { Button, Badge, ListGroup } from "react-bootstrap";
import styles from "./Navigation.module.css";

const NavigationSideBar = ({ onOptionClick, fetchInbox, fetchSentbox }) => {
  const initialActiveOption = localStorage.getItem("activeOption") || "Inbox";
  const [activeOption, setActiveOption] = useState(initialActiveOption);
  const [showComposeModal, setShowComposeModal] = useState(false);

  useEffect(() => {
    localStorage.setItem("activeOption", activeOption);
  }, [activeOption]);

  const handleComposeClick = () => {
    setShowComposeModal(true);
  };

  const handleCloseComposeModal = () => {
    setShowComposeModal(false);
  };

  const handleActiveOption = (activeOption) => {
    setActiveOption(activeOption);
  };

  return (
    <div className={styles.navigation}>
      <Button variant="primary" className="mb-3" onClick={handleComposeClick}>
        Compose
      </Button>
      <ComposeEmail
        show={showComposeModal}
        onHide={handleCloseComposeModal}
        fetchInbox={fetchInbox}
        fetchSentbox={fetchSentbox}
      />
      <ListGroup>
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start"
          onClick={() => {onOptionClick("Inbox"); handleActiveOption("Inbox")}}
          active={activeOption === "Inbox"}
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
          onClick={() => {onOptionClick("Sent"); handleActiveOption("Sent")}}
          active={activeOption === "Sent"}
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
          onClick={() => {onOptionClick("Trash"); handleActiveOption("Trash")}}
          active={activeOption === "Trash"}
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
};

export default NavigationSideBar;
