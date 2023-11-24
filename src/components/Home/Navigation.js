import React, { useEffect, useState } from "react";
import ComposeEmail from "../Mail/ComposeEmail";
import { Button, Badge, ListGroup } from "react-bootstrap";
// import useEmailService from "../Mail/useEmailService";
import styles from "./Navigation.module.css";
import { useSelector } from "react-redux";
// import { mailActions } from "../../store/mail-slice";

const NavigationSideBar = ({ onOptionClick, setSentEmailContent }) => {
  const initialActiveOption = localStorage.getItem("activeOption") || "Inbox";
  const [activeOption, setActiveOption] = useState(initialActiveOption);
  const [showComposeModal, setShowComposeModal] = useState(false);

  const emailCounts = useSelector((state) => state.mail.emailCounts);
  const inboxEmails = useSelector((state) => state.mail.inbox);
  const unreadEmails = Object.values(inboxEmails).filter(email => !email.isRead);
  // console.log(unreadEmails)
  const unreadEmailsTitle = unreadEmails.length === 1 ? 'email' : 'emails';

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
        setSentEmailContent={setSentEmailContent}
      />
      <ListGroup>
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start"
          onClick={() => {onOptionClick("Inbox"); handleActiveOption("Inbox")}}
          active={activeOption === "Inbox"}
          title={`${unreadEmails.length} unread ${unreadEmailsTitle}`}
        >
          <div className="ms-2 me-auto">
            <div className="fw-bold">Inbox</div>
          </div>
          <Badge bg="primary" pill>
          {emailCounts.inboxCount}
          {/* {inboxCount} */}
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
          {emailCounts.sentCount}
          {/* {sentCount} */}
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
          {emailCounts.trashCount}
          {/* {trashCount} */}
          </Badge>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default NavigationSideBar;
