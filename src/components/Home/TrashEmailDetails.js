import React from "react";
import { Button, Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import styles from "./EmailDetails.module.css";

const TrashEmailDetails = ({ onClick }) => {
  const location = useLocation();
  const emailData = location.state.emailData;
  const userEmail = localStorage.getItem("userEmail");

  return (
    <Container fluid>
      <div className={styles.emailDetails}>
        <Button
          onClick={onClick}
          variant=""
          title="go back"
          className={`mt-1 ${styles.backButton}`}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </Button>
        <div className="mt-1">
          <h3>{emailData.subject}</h3>
        </div>
        {emailData.from && emailData.from !== userEmail && (
          <div>
            <p>from: {emailData.from}</p>
          </div>
        )}
        {emailData.to && emailData.to !== userEmail && (
          <div>
            <p>to: {emailData.to}</p>
          </div>
        )}
        <div className={styles.timestamp}>
          {new Date(emailData.timestamp).toLocaleString()}
        </div>
        <div
          className={styles.emailContent}
          dangerouslySetInnerHTML={{ __html: emailData.content }}
        />
      </div>
    </Container>
  );
};

export default TrashEmailDetails;
