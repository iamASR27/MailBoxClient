import React, { useState } from "react";
import MailBoxEditor from "./MailBoxEditor";
import { EditorState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import EmailForm from "./EmailForm";
// import Header from "../Header/Header";
import { Button, Modal } from "react-bootstrap";
import sendEmail from "../../store/email-actions";
import { useDispatch } from "react-redux";
import styles from "./ComposeEmail.module.css";
import { useLocation } from "react-router-dom";

const ComposeEmail = ({ onHide, show, fetchInbox, fetchSentbox }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [subject, setSubject] = useState("");
  const [recipient, setRecipient] = useState("");
  const [emailContent, setEmailContent] = useState("");

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [isFullScreen, setIsFullScreen] = useState(false);

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);

    const contentState = newEditorState.getCurrentContent();
    // const emailContent = JSON.stringify(convertToRaw(contentState));
    const emailContent = stateToHTML(contentState);
    // const emailContent = convertContentToHTML(emailContent)
    setEmailContent(emailContent);
  };

  const handleSendEmail = () => {
    const senderId = localStorage.getItem("userEmail");
    // console.log(senderId);

    console.log("Email Subject: " + subject);
    console.log("Recipient: " + recipient);
    console.log("Email Content: " + emailContent);

    dispatch(sendEmail(senderId, recipient, subject, emailContent));

    setSubject("");
    setRecipient("");
    setEmailContent("");
    setEditorState(() => EditorState.createEmpty());
    onHide();

    setTimeout(() => {
      if (location.pathname.includes("home")) {
        fetchInbox();
      } else {
        fetchSentbox();
        console.log("sent");
      }
    }, 1000);
  };

  const toggleFullScreen = () => {
    setIsFullScreen((prevFullScreen) => !prevFullScreen);
  };

  return (
    <Modal show={show} onHide={onHide} centered fullscreen={isFullScreen}>
      <Modal.Header closeButton>
        <Modal.Title>Compose Email</Modal.Title>
        <Button
          onClick={toggleFullScreen}
          className={
            isFullScreen ? `${styles.fullscreen}` : `${styles.smallscreen}`
          }
        >
          <span>[&nbsp;&nbsp;]</span>
        </Button>
      </Modal.Header>
      <Modal.Body>
        <EmailForm
          setSubject={setSubject}
          setRecipient={setRecipient}
          subject={subject}
          recipient={recipient}
        />
        <MailBoxEditor
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSendEmail}>
          Send Email
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ComposeEmail;

// return (
//   <div>
//     <Header />
//     <div className={styles.home}>
//       <EmailForm
//         setSubject={setSubject}
//         setRecipient={setRecipient}
//         subject={subject}
//         recipient={recipient}
//       />
//       <MailBoxEditor
//         editorState={editorState}
//         onEditorStateChange={onEditorStateChange}
//       />
//       <Button
//         type="submit"
//         variant="primary"
//         className="mt-3"
//         onClick={handleSendEmail}
//       >
//         Send Email
//       </Button>
//     </div>
//   </div>
// );
