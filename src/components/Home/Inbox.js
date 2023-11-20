import React, { useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../Spinner/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import styles from "./Inbox.module.css";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../../store/mail-slice";

const Inbox = ({ emailContent, fetchInbox, setEmailContent, loading }) => {
  // const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const emailCounts = useSelector((state) => state.mail.emailCounts) 

  useEffect(() => {
    const fetchInterval = setInterval(() => {
      fetchInbox();
    }, 10000);

    return () => clearInterval(fetchInterval);
  }, [fetchInbox]);

  const handleEmailSubjectClick = (emailKey) => {
    const emailData = emailContent[emailKey];
    console.log(emailData);
    // setSelectedEmail(emailData);

    // const emailDataString = JSON.stringify(emailData);
    // const encodedEmailData = encodeURIComponent(emailDataString);
    // navigate(`/home/${emailKey}?emailData=${encodedEmailData}`);
    // emailData.emailKey = emailKey;
    navigate(`/inbox/${emailKey}`, { state: { emailData } });
  };

  const handleDeleteEmail = async (emailKey, event) => {
    event.stopPropagation();
    console.log("Delete email with key:", emailKey);
    const emailData = emailContent[emailKey];
    const userEmail = localStorage.getItem("userEmail");
    let url = "https://mailbox-client-167c3-default-rtdb.firebaseio.com/users";

    if (userEmail) {
      const userId = userEmail.replace(/[@.]/g, "");

      try {
        const deleteResponse = await fetch(
          `${url}/${userId}/inbox/${emailKey}.json`,
          {
            method: "DELETE",
          }
        );

        if (!deleteResponse.ok) {
          throw new Error("Failed to delete email from inbox!");
        }

        // await fetchInbox();

        setEmailContent((prevEmailContent) => {
          const updatedEmailContent = { ...prevEmailContent };
          delete updatedEmailContent[emailKey];
          return updatedEmailContent;
        });

        dispatch(mailActions.updateMailCount({
          inboxCount: emailCounts.inboxCount - 1,
          sentCount: emailCounts.sentCount,  
          trashCount: emailCounts.trashCount + 1, 
        }));
    

        const response = await fetch(`${url}/${userId}/trash.json`, {
          method: "POST",
          body: JSON.stringify(emailData),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to send email to user's trash!");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Container fluid className={styles.container}>
      {loading ? (
        <div>
          <LoadingSpinner />
        </div>
      ) : emailContent ? (
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
              <div className={styles["delete-button"]}>
                <Button
                  variant=""
                  title="Delete"
                  onClick={(event) => handleDeleteEmail(emailKey, event)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>You don't have any emails</div>
      )}
    </Container>
  );
};

export default Inbox;
