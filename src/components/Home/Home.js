import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../Spinner/Spinner";
import styles from "./Home.module.css";

const Home = ({ emailContent, setSelectedEmail, fetchInbox }) => {
  // const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchInbox();
  }, []);


  const handleEmailSubjectClick = (emailKey) => {
    // console.log(emailKey)
    const emailData = emailContent[emailKey];
    console.log(emailData);
    setSelectedEmail(emailData);

    // const emailDataString = JSON.stringify(emailData);
    // const encodedEmailData = encodeURIComponent(emailDataString);
    // navigate(`/home/${emailKey}?emailData=${encodedEmailData}`);
    // emailData.emailKey = emailKey;
    navigate(`/home/${emailKey}`, { state: { emailData }});
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
                from: {emailContent[emailKey].from}
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

export default Home;
