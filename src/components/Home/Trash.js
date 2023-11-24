import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../Spinner/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../../store/mail-slice";
import styles from "./Inbox.module.css";

const TrashBox = ({ emailContent, setEmailContent, loading }) => {
  // const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const emailCounts = useSelector((state) => state.mail.emailCounts);

  // useEffect(() => {
  //   if (loading) {
  //     fetchTrashBox();
  //     setLoading(false);
  //   }
  // }, [fetchTrashBox, loading]);

  const userEmail = localStorage.getItem("userEmail");

  const handleEmailSubjectClick = (emailKey) => {
    const emailData = emailContent[emailKey];
    console.log(emailData);
    // setSelectedEmail(emailData);

    navigate(`/trash/${emailKey}`, { state: { emailData } });
  };

  const handleDeleteTrashEmail = async (emailKey, event) => {
    event.stopPropagation();
    console.log("Delete email with key:", emailKey);
    const userEmail = localStorage.getItem("userEmail");
    let url = "https://mailbox-client-167c3-default-rtdb.firebaseio.com/users";

    if (userEmail) {
      const userId = userEmail.replace(/[@.]/g, "");

      try {
        const deleteResponse = await fetch(
          `${url}/${userId}/trash/${emailKey}.json`,
          {
            method: "DELETE",
          }
        );

        if (!deleteResponse.ok) {
          throw new Error("Failed to delete email from sentbox!");
        }

        // await fetchTrashBox();

        setEmailContent((prevEmailContent) => {
          const updatedEmailContent = { ...prevEmailContent };
          delete updatedEmailContent[emailKey];
          return updatedEmailContent;
        });

        dispatch(mailActions.updateMailCount({
          inboxCount: emailCounts.inboxCount,
          sentCount: emailCounts.sentCount,  
          trashCount: emailCounts.trashCount - 1, 
        }));
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
              {emailContent[emailKey].to &&
                emailContent[emailKey].to !== userEmail && (
                  <div className={styles["email-from"]}>
                    to: {emailContent[emailKey].to}
                  </div>
                )}
              {emailContent[emailKey].from &&
                emailContent[emailKey].from !== userEmail && (
                  <div className={styles["email-from"]}>
                    from: {emailContent[emailKey].from}
                  </div>
                )}
              <div className={styles["email-subject-text"]}>
                {emailContent[emailKey].subject}
              </div>
              <div className={styles["delete-button"]}>
                <Button
                  variant=""
                  title="Delete"
                  onClick={(event) => handleDeleteTrashEmail(emailKey, event)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>You don't have any emails in Trash</div>
      )}
    </Container>
  );
};

export default TrashBox;
