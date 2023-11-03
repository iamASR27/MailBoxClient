import React from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import NavigationSideBar from "./Navigation";
// import Header from "../Header/Header";
// import { fetchInboxMails } from "../Mail/EmailService";
// import EmailDetails from "./EmailDetails";
import styles from "./Home.module.css";

const Home = ( { emailContent, setSelectedEmail }) => {
  const navigate = useNavigate();
  
  const handleEmailSubjectClick = (emailKey) => {
    const emailData = emailContent[emailKey];
    console.log(emailData);
    setSelectedEmail(emailData);
    navigate(`/home/${emailKey}`);
  };

  return (
      <Container fluid className={styles.container}>
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
      </Container>
  );
};

export default Home;
