import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../Spinner/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../../store/mail-slice";
import styles from "./Inbox.module.css";

const Sentbox = ({ emailContent, fetchSentbox, setEmailContent, loading, setTrashEmailContent }) => {
  // const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const emailCounts = useSelector((state) => state.mail.emailCounts);

  const handleEmailSubjectClick = (emailKey) => {
    const emailData = emailContent[emailKey];
    navigate(`/sent/${emailKey}`, { state: { emailData } });
  };

  const handleDeleteSentEmail = async (emailKey, event) => {
    event.stopPropagation();
    console.log("Delete email with key:", emailKey);
    const emailData = emailContent[emailKey];
    // dispatch(sendEmailToTrash(emailData));
    const userEmail = localStorage.getItem("userEmail");
    let url = "https://mailbox-client-167c3-default-rtdb.firebaseio.com/users";

    if (userEmail) {
      const userId = userEmail.replace(/[@.]/g, "");

      try {
        const deleteResponse = await fetch(
          `${url}/${userId}/sentbox/${emailKey}.json`,
          {
            method: "DELETE",
          }
        );

        if (!deleteResponse.ok) {
          throw new Error("Failed to delete email from sentbox!");
        }

        // await fetchSentbox();
        setTrashEmailContent((prevTrashEmailContent) => ({
          ...prevTrashEmailContent,
          [emailKey]: emailData,
        }));

        setEmailContent((prevEmailContent) => {
          const updatedEmailContent = { ...prevEmailContent };
          delete updatedEmailContent[emailKey];
          return updatedEmailContent;
        });
        dispatch(mailActions.updateMailCount({
          inboxCount: emailCounts.inboxCount,
          sentCount: emailCounts.sentCount - 1,  
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
          {Object.keys(emailContent).reverse().map((emailKey) => (
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
              <div className={styles["delete-button"]}>
                <Button
                  variant=""
                  title="Delete"
                  onClick={(event) => handleDeleteSentEmail(emailKey, event)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>You don't have any sent emails</div>
      )}
    </Container>
  );
};

export default Sentbox;
