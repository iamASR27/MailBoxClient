import React, { useEffect, useState } from "react";
import ComposeEmail from "../Mail/ComposeEmail";
import { Button, Badge, ListGroup } from "react-bootstrap";
// import useEmailService from "../Mail/useEmailService";
import styles from "./Navigation.module.css";
import { useSelector } from "react-redux";
// import { mailActions } from "../../store/mail-slice";

const NavigationSideBar = ({ onOptionClick, fetchInbox, fetchSentbox }) => {
  const initialActiveOption = localStorage.getItem("activeOption") || "Inbox";
  const [activeOption, setActiveOption] = useState(initialActiveOption);
  const [showComposeModal, setShowComposeModal] = useState(false);
  // const [emailCounts, setEmailCounts] = useState({
  //   inbox: 0,
  //   sent: 0,
  //   trash: 0,
  // });
  const emailCounts = useSelector((state) => state.mail.emailCounts);
  // const inbox = useSelector((state) => state.mail.inbox);
  // const inboxCount = Object.keys(inbox).length;

  // const sent = useSelector((state) => state.mail.sent);
  // const sentCount = Object.keys(sent).length;

  // const trash = useSelector((state) => state.mail.trash);
  // const trashCount = Object.keys(trash).length;

  // const dispatch = useDispatch();
  // dispatch(mailActions.updateMailCount({
  //   inboxCount: inboxCount,
  //   sentCount: sentCount,
  //   trashCount: trashCount,
  // }))

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
