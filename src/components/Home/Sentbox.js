import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../Spinner/Spinner";
import styles from "./Home.module.css";

const Sentbox = ({ emailContent, setSelectedEmail, fetchSentbox }) => {
  // const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchSentbox();
  }, [fetchSentbox])

  const handleEmailSubjectClick = (emailKey) => {
    const emailData = emailContent[emailKey];
    console.log(emailData);
    setSelectedEmail(emailData);
    // localStorage.setItem("selectedEmail", JSON.stringify(emailData));
    navigate(`/sent/${emailKey}`);
  };


  return (
    <Container fluid className={styles.container}>
      {emailContent ? (
        <div className={styles["email-subject"]}>
          {Object.keys(emailContent).map((emailKey) => (
            <div
              key={emailKey}
              onClick={() => handleEmailSubjectClick(emailKey)}
              className={styles["email-list"]}
            >
              <div className={styles["email-from"]}>
                to: {emailContent[emailKey].to}
              </div>
              <div className={styles["email-subject-text"]}>
                {emailContent[emailKey].subject}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <LoadingSpinner />
        </div>
      )}
    </Container>
  );
};

export default Sentbox;
